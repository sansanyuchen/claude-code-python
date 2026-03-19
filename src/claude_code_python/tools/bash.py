from __future__ import annotations

import asyncio
from pathlib import Path
from typing import Any

from .base import Tool, ToolContext


class BashTool(Tool):
    name = "bash"
    description = "Run a shell command inside the workspace and capture stdout, stderr, and exit code."
    input_schema = {
        "type": "object",
        "properties": {
            "command": {"type": "string"},
            "timeout_seconds": {"type": "integer", "default": 30},
        },
        "required": ["command"],
        "additionalProperties": False,
    }

    async def run(self, arguments: dict[str, Any], context: ToolContext) -> str:
        command = arguments["command"]
        timeout = int(arguments.get("timeout_seconds", 30))
        process = await asyncio.create_subprocess_shell(
            command,
            cwd=str(Path(context.workdir)),
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
        )
        try:
            stdout, stderr = await asyncio.wait_for(process.communicate(), timeout=timeout)
        except TimeoutError:
            process.kill()
            await process.communicate()
            return f"exit_code: -1\nstdout:\n\nstderr:\nCommand timed out after {timeout} seconds."
        return (
            f"exit_code: {process.returncode}\n"
            f"stdout:\n{stdout.decode('utf-8', errors='replace')}\n"
            f"stderr:\n{stderr.decode('utf-8', errors='replace')}"
        )
