from __future__ import annotations

import asyncio
import json
from typing import Any

from .base import Tool, ToolContext


class TaskTool(Tool):
    name = "task"
    description = (
        "Spawn one or more sub-agents to work in parallel. "
        "Use this for decomposition, parallel research, or independent coding subtasks."
    )
    input_schema = {
        "type": "object",
        "properties": {
            "description": {"type": "string"},
            "tasks": {
                "type": "array",
                "items": {"type": "string"},
            },
            "tools": {
                "type": "array",
                "items": {"type": "string"},
                "description": "Optional allowlist of tool names for the sub-agent(s).",
            },
            "max_steps": {"type": "integer", "default": 8},
            "timeout_seconds": {
                "type": "integer",
                "default": 45,
                "description": "Maximum runtime per sub-agent before timing out.",
            },
        },
        "additionalProperties": False,
    }

    async def run(self, arguments: dict[str, Any], context: ToolContext) -> str:
        if context.agent_depth >= context.runtime.settings.max_task_depth:
            raise ValueError("Maximum task depth reached.")
        task_list = arguments.get("tasks") or []
        description = arguments.get("description")
        if description:
            task_list = [description] + task_list
        if not task_list:
            raise ValueError("Provide `description`, `tasks`, or both.")

        tools = arguments.get("tools")
        if not tools:
            # Prevent recursive task fan-out by default.
            tools = [
                "bash",
                "read_file",
                "ls",
                "glob",
                "grep",
                "pwd",
                "todo_read",
            ]
        max_steps = int(arguments.get("max_steps", 8))
        timeout_seconds = int(arguments.get("timeout_seconds", 45))

        async def run_subagent(index: int, prompt: str) -> dict[str, Any]:
            try:
                result = await asyncio.wait_for(
                    context.runtime.run_subagent(
                        prompt=prompt,
                        tool_names=tools,
                        max_steps=max_steps,
                        name=f"subagent-{index}",
                        depth=context.agent_depth + 1,
                    ),
                    timeout=timeout_seconds,
                )
                return {"task": prompt, "status": "completed", "result": result}
            except TimeoutError:
                return {
                    "task": prompt,
                    "status": "timed_out",
                    "result": f"Sub-agent timed out after {timeout_seconds} seconds.",
                }
            except Exception as exc:
                return {
                    "task": prompt,
                    "status": "failed",
                    "result": f"{type(exc).__name__}: {exc}",
                }

        results = await asyncio.gather(*(run_subagent(i + 1, prompt) for i, prompt in enumerate(task_list)))
        return json.dumps(results, indent=2, ensure_ascii=False)
