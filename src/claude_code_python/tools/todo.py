from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from .base import Tool, ToolContext, run_blocking


TODO_FILE = ".ccpy_todos.json"


class TodoReadTool(Tool):
    name = "todo_read"
    description = "Read the shared todo list for the current workspace."
    input_schema = {"type": "object", "properties": {}, "additionalProperties": False}

    async def run(self, arguments: dict[str, Any], context: ToolContext) -> str:
        target = context.workdir / TODO_FILE
        if not target.exists():
            return "[]"
        return await run_blocking(target.read_text, "utf-8")


class TodoWriteTool(Tool):
    name = "todo_write"
    description = "Replace the shared todo list for the current workspace."
    input_schema = {
        "type": "object",
        "properties": {
            "items": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "content": {"type": "string"},
                        "status": {"type": "string", "enum": ["pending", "in_progress", "done"]},
                    },
                    "required": ["content", "status"],
                    "additionalProperties": False,
                },
            },
        },
        "required": ["items"],
        "additionalProperties": False,
    }

    async def run(self, arguments: dict[str, Any], context: ToolContext) -> str:
        target = Path(context.workdir) / TODO_FILE
        payload = json.dumps(arguments["items"], indent=2)
        await run_blocking(target.write_text, payload, "utf-8")
        return payload
