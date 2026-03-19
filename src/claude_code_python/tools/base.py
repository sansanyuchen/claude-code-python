from __future__ import annotations

import asyncio
from dataclasses import dataclass
from pathlib import Path
from typing import Any


@dataclass
class ToolContext:
    workdir: Path
    runtime: Any
    max_output_chars: int
    agent_depth: int


class Tool:
    name: str
    description: str
    input_schema: dict[str, Any]

    def spec(self) -> dict[str, Any]:
        return {
            "type": "function",
            "function": {
                "name": self.name,
                "description": self.description,
                "parameters": self.input_schema,
            },
        }

    async def run(self, arguments: dict[str, Any], context: ToolContext) -> str:
        raise NotImplementedError


class ToolRegistry:
    def __init__(self, tools: list[Tool]) -> None:
        self._tools = {tool.name: tool for tool in tools}

    def specs(self) -> list[dict[str, Any]]:
        return [tool.spec() for tool in self._tools.values()]

    def get(self, name: str) -> Tool:
        return self._tools[name]

    def subset(self, names: list[str] | None) -> "ToolRegistry":
        if not names:
            return self
        return ToolRegistry([self._tools[name] for name in names if name in self._tools])

    async def execute(self, name: str, arguments: dict[str, Any], context: ToolContext) -> str:
        tool = self.get(name)
        result = await tool.run(arguments, context)
        if len(result) > context.max_output_chars:
            return result[: context.max_output_chars] + "\n...<truncated>"
        return result


async def run_blocking(func: Any, *args: Any) -> Any:
    return await asyncio.to_thread(func, *args)
