from __future__ import annotations

import asyncio
import json
from dataclasses import dataclass
from typing import Any

from .config import Settings
from .model import OpenAICompatibleModel
from .tools import (
    BashTool,
    EditFileTool,
    GlobTool,
    GrepTool,
    LsTool,
    MkdirTool,
    MultiEditTool,
    PwdTool,
    ReadFileTool,
    TaskTool,
    TodoReadTool,
    TodoWriteTool,
    WriteFileTool,
)
from .tools.base import ToolContext, ToolRegistry


SYSTEM_PROMPT = """You are Claude-Code-Python, a coding assistant that works through tool use.

Rules:
- Prefer tools over guessing.
- Use the task tool when work can be decomposed into parallel subtasks.
- Keep answers concise but complete.
- Stay inside the workspace.
"""


@dataclass
class AgentResult:
    output_text: str
    steps: int


class AgentRuntime:
    def __init__(self, settings: Settings) -> None:
        self.settings = settings
        self.model = OpenAICompatibleModel(
            api_key=settings.api_key,
            base_url=settings.base_url,
            model=settings.model,
        )
        self.registry = ToolRegistry(
            [
                BashTool(),
                TaskTool(),
                ReadFileTool(),
                WriteFileTool(),
                EditFileTool(),
                MultiEditTool(),
                LsTool(),
                GlobTool(),
                GrepTool(),
                PwdTool(),
                MkdirTool(),
                TodoReadTool(),
                TodoWriteTool(),
            ]
        )

    async def run(
        self,
        prompt: str,
        max_steps: int | None = None,
        tool_names: list[str] | None = None,
        depth: int = 0,
    ) -> AgentResult:
        steps = max_steps or self.settings.max_steps
        messages: list[dict[str, Any]] = [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt},
        ]
        registry = self.registry.subset(tool_names)
        context = ToolContext(
            workdir=self.settings.workdir,
            runtime=self,
            max_output_chars=self.settings.max_tool_output_chars,
            agent_depth=depth,
        )

        for step in range(1, steps + 1):
            response = self.model.complete(messages=messages, tools=registry.specs())
            assistant_message: dict[str, Any] = {"role": "assistant", "content": response.content}
            if response.reasoning_content:
                assistant_message["reasoning_content"] = response.reasoning_content
            if response.tool_calls:
                assistant_message["tool_calls"] = [
                    {
                        "id": tool_call["id"],
                        "type": "function",
                        "function": {
                            "name": tool_call["name"],
                            "arguments": json.dumps(tool_call["arguments"]),
                        },
                    }
                    for tool_call in response.tool_calls
                ]
            messages.append(assistant_message)

            if not response.tool_calls:
                return AgentResult(output_text=response.content, steps=step)

            tool_results = await asyncio.gather(
                *(
                    registry.execute(tool_call["name"], tool_call["arguments"], context)
                    for tool_call in response.tool_calls
                ),
                return_exceptions=True,
            )

            for tool_call, tool_result in zip(response.tool_calls, tool_results):
                if isinstance(tool_result, Exception):
                    content = f"Tool {tool_call['name']} failed: {tool_result}"
                else:
                    content = tool_result
                messages.append(
                    {
                        "role": "tool",
                        "tool_call_id": tool_call["id"],
                        "content": content,
                    }
                )

        return AgentResult(output_text="Stopped after reaching max steps.", steps=steps)

    async def run_subagent(
        self,
        prompt: str,
        tool_names: list[str] | None,
        max_steps: int,
        name: str,
        depth: int,
    ) -> str:
        result = await self.run(
            prompt=f"Sub-agent name: {name}\n\nTask:\n{prompt}",
            max_steps=max_steps,
            tool_names=tool_names,
            depth=depth,
        )
        return result.output_text
