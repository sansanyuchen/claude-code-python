from __future__ import annotations

import difflib
import fnmatch
import os
from pathlib import Path
from typing import Any

from .base import Tool, ToolContext, run_blocking


def _resolve_path(workdir: Path, raw_path: str) -> Path:
    candidate = (workdir / raw_path).resolve() if not Path(raw_path).is_absolute() else Path(raw_path).resolve()
    if workdir not in candidate.parents and candidate != workdir:
        raise ValueError(f"Path escapes workspace: {raw_path}")
    return candidate


class PwdTool(Tool):
    name = "pwd"
    description = "Return the current workspace directory."
    input_schema = {"type": "object", "properties": {}, "additionalProperties": False}

    async def run(self, arguments: dict[str, Any], context: ToolContext) -> str:
        return str(context.workdir)


class LsTool(Tool):
    name = "ls"
    description = "List files or directories inside a workspace path."
    input_schema = {
        "type": "object",
        "properties": {
            "path": {"type": "string", "default": "."},
        },
        "additionalProperties": False,
    }

    async def run(self, arguments: dict[str, Any], context: ToolContext) -> str:
        target = _resolve_path(context.workdir, arguments.get("path", "."))
        entries = []
        for child in sorted(target.iterdir(), key=lambda p: (p.is_file(), p.name.lower())):
            suffix = "/" if child.is_dir() else ""
            entries.append(child.relative_to(context.workdir).as_posix() + suffix)
        return "\n".join(entries) or "(empty)"


class GlobTool(Tool):
    name = "glob"
    description = "Find files matching a glob pattern."
    input_schema = {
        "type": "object",
        "properties": {
            "pattern": {"type": "string"},
        },
        "required": ["pattern"],
        "additionalProperties": False,
    }

    async def run(self, arguments: dict[str, Any], context: ToolContext) -> str:
        pattern = arguments["pattern"]
        matches = []
        for root, _, files in os.walk(context.workdir):
            root_path = Path(root)
            for name in files:
                candidate = (root_path / name).relative_to(context.workdir).as_posix()
                if fnmatch.fnmatch(candidate, pattern):
                    matches.append(candidate)
        return "\n".join(sorted(matches)) or "(no matches)"


class GrepTool(Tool):
    name = "grep"
    description = "Search text across workspace files."
    input_schema = {
        "type": "object",
        "properties": {
            "pattern": {"type": "string"},
            "path": {"type": "string", "default": "."},
        },
        "required": ["pattern"],
        "additionalProperties": False,
    }

    async def run(self, arguments: dict[str, Any], context: ToolContext) -> str:
        pattern = arguments["pattern"]
        root = _resolve_path(context.workdir, arguments.get("path", "."))
        matches: list[str] = []
        for file_path in root.rglob("*"):
            if not file_path.is_file():
                continue
            try:
                text = await run_blocking(file_path.read_text, "utf-8")
            except (UnicodeDecodeError, OSError):
                continue
            for index, line in enumerate(text.splitlines(), start=1):
                if pattern in line:
                    rel = file_path.relative_to(context.workdir).as_posix()
                    matches.append(f"{rel}:{index}: {line}")
        return "\n".join(matches) or "(no matches)"


class ReadFileTool(Tool):
    name = "read_file"
    description = "Read a text file from the workspace."
    input_schema = {
        "type": "object",
        "properties": {
            "path": {"type": "string"},
        },
        "required": ["path"],
        "additionalProperties": False,
    }

    async def run(self, arguments: dict[str, Any], context: ToolContext) -> str:
        target = _resolve_path(context.workdir, arguments["path"])
        return await run_blocking(target.read_text, "utf-8")


class WriteFileTool(Tool):
    name = "write_file"
    description = "Write a text file in the workspace, creating parent directories if needed."
    input_schema = {
        "type": "object",
        "properties": {
            "path": {"type": "string"},
            "content": {"type": "string"},
        },
        "required": ["path", "content"],
        "additionalProperties": False,
    }

    async def run(self, arguments: dict[str, Any], context: ToolContext) -> str:
        target = _resolve_path(context.workdir, arguments["path"])
        target.parent.mkdir(parents=True, exist_ok=True)
        await run_blocking(target.write_text, arguments["content"], "utf-8")
        return f"Wrote {target.relative_to(context.workdir).as_posix()}"


class EditFileTool(Tool):
    name = "edit_file"
    description = "Replace one string with another inside a text file."
    input_schema = {
        "type": "object",
        "properties": {
            "path": {"type": "string"},
            "old_text": {"type": "string"},
            "new_text": {"type": "string"},
        },
        "required": ["path", "old_text", "new_text"],
        "additionalProperties": False,
    }

    async def run(self, arguments: dict[str, Any], context: ToolContext) -> str:
        target = _resolve_path(context.workdir, arguments["path"])
        original = await run_blocking(target.read_text, "utf-8")
        old_text = arguments["old_text"]
        if old_text not in original:
            raise ValueError("old_text was not found in file.")
        updated = original.replace(old_text, arguments["new_text"], 1)
        await run_blocking(target.write_text, updated, "utf-8")
        diff = "\n".join(
            difflib.unified_diff(
                original.splitlines(),
                updated.splitlines(),
                fromfile="before",
                tofile="after",
                lineterm="",
            )
        )
        return diff or "File updated."


class MultiEditTool(Tool):
    name = "multi_edit"
    description = "Apply multiple exact string replacements to a text file."
    input_schema = {
        "type": "object",
        "properties": {
            "path": {"type": "string"},
            "edits": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "old_text": {"type": "string"},
                        "new_text": {"type": "string"},
                    },
                    "required": ["old_text", "new_text"],
                    "additionalProperties": False,
                },
            },
        },
        "required": ["path", "edits"],
        "additionalProperties": False,
    }

    async def run(self, arguments: dict[str, Any], context: ToolContext) -> str:
        target = _resolve_path(context.workdir, arguments["path"])
        original = await run_blocking(target.read_text, "utf-8")
        updated = original
        for edit in arguments["edits"]:
            old_text = edit["old_text"]
            if old_text not in updated:
                raise ValueError(f"old_text not found: {old_text[:80]}")
            updated = updated.replace(old_text, edit["new_text"], 1)
        await run_blocking(target.write_text, updated, "utf-8")
        return f"Applied {len(arguments['edits'])} edits to {target.relative_to(context.workdir).as_posix()}"


class MkdirTool(Tool):
    name = "mkdir"
    description = "Create a directory inside the workspace."
    input_schema = {
        "type": "object",
        "properties": {
            "path": {"type": "string"},
        },
        "required": ["path"],
        "additionalProperties": False,
    }

    async def run(self, arguments: dict[str, Any], context: ToolContext) -> str:
        target = _resolve_path(context.workdir, arguments["path"])
        target.mkdir(parents=True, exist_ok=True)
        return f"Created {target.relative_to(context.workdir).as_posix()}/"
