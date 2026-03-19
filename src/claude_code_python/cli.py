from __future__ import annotations

import argparse
import asyncio
import sys
from pathlib import Path

from .config import Settings
from .runtime import AgentRuntime


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Claude Code Python")
    subparsers = parser.add_subparsers(dest="command", required=True)

    run_parser = subparsers.add_parser("run", help="Run a one-shot prompt.")
    run_parser.add_argument("prompt", help="User prompt to execute.")
    run_parser.add_argument("--workdir", default=".", help="Workspace directory.")
    run_parser.add_argument("--model", default=None, help="Override CCPY_MODEL.")
    run_parser.add_argument("--max-steps", type=int, default=None, help="Maximum agent steps.")

    chat_parser = subparsers.add_parser("chat", help="Start a simple interactive chat session.")
    chat_parser.add_argument("--workdir", default=".", help="Workspace directory.")
    chat_parser.add_argument("--model", default=None, help="Override CCPY_MODEL.")
    chat_parser.add_argument("--max-steps", type=int, default=None, help="Maximum agent steps.")
    return parser


async def run_once(prompt: str, workdir: str, model: str | None, max_steps: int | None) -> int:
    settings = Settings.from_env(workdir=workdir)
    if model:
        settings.model = model
    runtime = AgentRuntime(settings)
    result = await runtime.run(prompt=prompt, max_steps=max_steps)
    print(result.output_text)
    return 0


def _build_prompt_session() -> object | None:
    try:
        from prompt_toolkit import PromptSession
        from prompt_toolkit.history import FileHistory
    except ImportError:
        return None

    history_path = Path.home() / ".ccpy_history"
    return PromptSession(history=FileHistory(str(history_path)))


async def _read_prompt(session: object | None) -> str:
    if session is None:
        return input("\n> ")
    return await session.prompt_async("\n> ")


async def chat_loop(workdir: str, model: str | None, max_steps: int | None) -> int:
    settings = Settings.from_env(workdir=workdir)
    if model:
        settings.model = model
    runtime = AgentRuntime(settings)
    session = _build_prompt_session()
    print("Claude-Code-Python interactive mode. Type 'exit' to quit.")
    while True:
        try:
            prompt = (await _read_prompt(session)).strip()
        except EOFError:
            print()
            return 0
        except KeyboardInterrupt:
            print("^C")
            continue
        if prompt.lower() in {"exit", "quit"}:
            return 0
        if not prompt:
            continue
        result = await runtime.run(prompt=prompt, max_steps=max_steps)
        print(result.output_text)


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()
    if args.command == "run":
        raise SystemExit(asyncio.run(run_once(args.prompt, args.workdir, args.model, args.max_steps)))
    if args.command == "chat":
        raise SystemExit(asyncio.run(chat_loop(args.workdir, args.model, args.max_steps)))
    raise SystemExit(parser.format_help())


if __name__ == "__main__":
    main()
