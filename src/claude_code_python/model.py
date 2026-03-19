from __future__ import annotations

import json
from dataclasses import dataclass
from typing import Any


@dataclass
class AssistantResponse:
    content: str
    tool_calls: list[dict[str, Any]]
    reasoning_content: str | None = None


class OpenAICompatibleModel:
    def __init__(self, api_key: str, model: str, base_url: str | None = None) -> None:
        if not api_key:
            raise ValueError("OPENAI_API_KEY is required.")
        try:
            from openai import OpenAI
        except ImportError as exc:
            raise RuntimeError("The `openai` package is required. Install with `pip install -e .`.") from exc
        self._client = OpenAI(api_key=api_key, base_url=base_url)
        self._model = model

    def complete(self, messages: list[dict[str, Any]], tools: list[dict[str, Any]]) -> AssistantResponse:
        response = self._client.chat.completions.create(
            model=self._model,
            messages=messages,
            tools=tools or None,
            tool_choice="auto" if tools else None,
        )
        message = response.choices[0].message
        text = message.content or ""
        reasoning_content = None
        if getattr(message, "model_extra", None):
            reasoning_content = message.model_extra.get("reasoning_content")
        tool_calls: list[dict[str, Any]] = []
        for tool_call in message.tool_calls or []:
            arguments = tool_call.function.arguments
            parsed = json.loads(arguments) if arguments else {}
            tool_calls.append(
                {
                    "id": tool_call.id,
                    "name": tool_call.function.name,
                    "arguments": parsed,
                }
            )
        return AssistantResponse(
            content=text,
            tool_calls=tool_calls,
            reasoning_content=reasoning_content,
        )
