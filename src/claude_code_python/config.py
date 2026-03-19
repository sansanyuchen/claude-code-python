from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path


@dataclass
class Settings:
    api_key: str
    base_url: str | None
    model: str
    workdir: Path
    max_steps: int = 12
    max_tool_output_chars: int = 12_000
    max_task_depth: int = 2

    @classmethod
    def from_env(cls, workdir: str | None = None) -> "Settings":
        api_key = os.environ.get("OPENAI_API_KEY", "")
        base_url = os.environ.get("OPENAI_BASE_URL")
        model = os.environ.get("CCPY_MODEL", "gpt-4.1-mini")
        resolved_workdir = Path(workdir or os.getcwd()).resolve()
        return cls(
            api_key=api_key,
            base_url=base_url,
            model=model,
            workdir=resolved_workdir,
        )
