from __future__ import annotations

import argparse
import asyncio
import json
import os
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Any

from claude_code_python.config import Settings
from claude_code_python.model import OpenAICompatibleModel
from claude_code_python.runtime import SYSTEM_PROMPT
from claude_code_python.tools import (
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
from claude_code_python.tools.base import ToolContext, ToolRegistry


ROOT = Path(__file__).resolve().parent.parent
EXAMPLES_DIR = ROOT / "examples"
WORKSPACE_DIR = EXAMPLES_DIR / "subagent_demo_workspace"
PROMPT_PATH = EXAMPLES_DIR / "subagent_demo_live_prompt.txt"
TRACE_PATH = EXAMPLES_DIR / "subagent_demo_live_trace.json"
RECORD_PATH = EXAMPLES_DIR / "subagent_demo_live_run_record.md"


@dataclass
class TraceEvent:
    index: int
    agent: str
    depth: int
    phase: str
    details: dict[str, Any]


class TracingAgentRuntime:
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
        self.trace: list[TraceEvent] = []
        self._next_event_index = 1

    def _log(self, agent: str, depth: int, phase: str, **details: Any) -> None:
        self.trace.append(
            TraceEvent(
                index=self._next_event_index,
                agent=agent,
                depth=depth,
                phase=phase,
                details=details,
            )
        )
        self._next_event_index += 1

    async def run(
        self,
        prompt: str,
        max_steps: int | None = None,
        tool_names: list[str] | None = None,
        depth: int = 0,
        agent_name: str = "root",
    ) -> str:
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
        self._log(agent_name, depth, "run_started", prompt=prompt, tools=tool_names or "default")

        for step in range(1, steps + 1):
            response = self.model.complete(messages=messages, tools=registry.specs())
            self._log(
                agent_name,
                depth,
                "model_response",
                step=step,
                content=response.content,
                reasoning_content=response.reasoning_content,
                tool_calls=response.tool_calls,
            )
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
                self._log(agent_name, depth, "run_completed", step=step, output=response.content)
                return response.content

            tool_results = await asyncio.gather(
                *(
                    self._execute_tool(tool_call, registry, context, agent_name=agent_name, depth=depth, step=step)
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

        final = "Stopped after reaching max steps."
        self._log(agent_name, depth, "run_completed", step=steps, output=final)
        return final

    async def _execute_tool(
        self,
        tool_call: dict[str, Any],
        registry: ToolRegistry,
        context: ToolContext,
        agent_name: str,
        depth: int,
        step: int,
    ) -> str:
        self._log(
            agent_name,
            depth,
            "tool_call_started",
            step=step,
            tool_name=tool_call["name"],
            arguments=tool_call["arguments"],
        )
        try:
            result = await registry.execute(tool_call["name"], tool_call["arguments"], context)
        except Exception as exc:
            result = f"Tool {tool_call['name']} failed: {exc}"
        self._log(
            agent_name,
            depth,
            "tool_call_completed",
            step=step,
            tool_name=tool_call["name"],
            result=result,
        )
        return result

    async def run_subagent(
        self,
        prompt: str,
        tool_names: list[str] | None,
        max_steps: int,
        name: str,
        depth: int,
    ) -> str:
        self._log(name, depth, "subagent_started", prompt=prompt, tools=tool_names or "default")
        result = await self.run(
            prompt=f"Sub-agent name: {name}\n\nTask:\n{prompt}",
            max_steps=max_steps,
            tool_names=tool_names,
            depth=depth,
            agent_name=name,
        )
        self._log(name, depth, "subagent_completed", output=result)
        return result


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Run the live subagent demo with a real model.")
    parser.add_argument("--workdir", default=str(WORKSPACE_DIR), help="Workspace for the demo files.")
    parser.add_argument("--prompt-path", default=str(PROMPT_PATH), help="Prompt file path.")
    parser.add_argument("--trace-path", default=str(TRACE_PATH), help="Where to save the JSON trace.")
    parser.add_argument("--record-path", default=str(RECORD_PATH), help="Where to save the Markdown record.")
    parser.add_argument("--model", default=None, help="Override CCPY_MODEL.")
    parser.add_argument("--max-steps", type=int, default=8, help="Maximum root-agent steps.")
    return parser


def format_record(
    *,
    final_output: str,
    trace: list[TraceEvent],
    prompt_path: Path,
    workdir: Path,
    trace_path: Path,
    settings: Settings,
) -> str:
    prompt_text = prompt_path.read_text("utf-8").strip()
    inventory_text = (workdir / "inventory.txt").read_text("utf-8").strip()
    staffing_text = (workdir / "staffing.txt").read_text("utf-8").strip()
    trace_json = json.dumps([asdict(event) for event in trace], indent=2, ensure_ascii=False)
    base_url = settings.base_url or "default OpenAI endpoint"

    lines = [
        "# Live Subagent Demo Run Record",
        "",
        "This record preserves a real-model run of the subagent demo.",
        "",
        "## Environment",
        "",
        f"- Workspace: `{workdir}`",
        f"- Model: `{settings.model}`",
        f"- Base URL: `{base_url}`",
        "",
        "## Exact Reproduction Command",
        "",
        "```bash",
        "export OPENAI_API_KEY='your_key'",
        "export OPENAI_BASE_URL='your_openai_compatible_endpoint'",
        f"export CCPY_MODEL='{settings.model}'",
        "PYTHONPATH=src python3 examples/run_subagent_demo_live.py",
        "```",
        "",
        "## Demo Prompt",
        "",
        f"Source file: [{prompt_path.name}]({prompt_path})",
        "",
        "```text",
        prompt_text,
        "```",
        "",
        "## Demo Workspace Files",
        "",
        f"- [inventory.txt]({workdir / 'inventory.txt'})",
        f"- [staffing.txt]({workdir / 'staffing.txt'})",
        "",
        "### inventory.txt",
        "",
        "```text",
        inventory_text,
        "```",
        "",
        "### staffing.txt",
        "",
        "```text",
        staffing_text,
        "```",
        "",
        "## Final Output",
        "",
        "```text",
        final_output,
        "```",
        "",
        "## Full Call Trace",
        "",
        f"Source file: [{trace_path.name}]({trace_path})",
        "",
        "```json",
        trace_json,
        "```",
    ]
    return "\n".join(lines) + "\n"


async def main() -> None:
    parser = build_parser()
    args = parser.parse_args()

    if not os.environ.get("OPENAI_API_KEY"):
        raise SystemExit("OPENAI_API_KEY is required for the live demo.")

    workdir = Path(args.workdir).resolve()
    prompt_path = Path(args.prompt_path).resolve()
    trace_path = Path(args.trace_path).resolve()
    record_path = Path(args.record_path).resolve()

    settings = Settings.from_env(workdir=str(workdir))
    if args.model:
        settings.model = args.model
    settings.max_steps = args.max_steps

    runtime = TracingAgentRuntime(settings)
    prompt = prompt_path.read_text("utf-8")
    final_output = await runtime.run(prompt=prompt, max_steps=args.max_steps, agent_name="root")

    trace_path.write_text(
        json.dumps([asdict(event) for event in runtime.trace], indent=2, ensure_ascii=False) + "\n",
        "utf-8",
    )
    record_path.write_text(
        format_record(
            final_output=final_output,
            trace=runtime.trace,
            prompt_path=prompt_path,
            workdir=workdir,
            trace_path=trace_path,
            settings=settings,
        ),
        "utf-8",
    )

    print(final_output)
    print()
    print(f"Saved trace to {trace_path}")
    print(f"Saved record to {record_path}")


if __name__ == "__main__":
    asyncio.run(main())
