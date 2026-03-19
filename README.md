# Claude Code Python

A lightweight Claude Code style agent runtime built in Python.

This project focuses on the runtime side of a coding agent rather than UI parity. It provides a compact but functional implementation of:

- multi-step agent loops,
- tool calling,
- sub-agent delegation through `task`,
- parallel execution,
- and an extensible Python tool architecture.

For Chinese documentation, see [README_zh.md](README_zh.md).

Project showcase page:
[https://sansanyuchen.github.io/claude-code-python/](https://sansanyuchen.github.io/claude-code-python/)

## Features

- Multi-step agent loop with tool calling
- Parallel execution for multiple tool calls
- `task` tool for spawning one or more sub-agents
- OpenAI-compatible model integration through `OPENAI_BASE_URL`
- CLI for one-shot runs and interactive chat
- Claude Code style default tools for files, search, shell, and todos
- Workspace-scoped file safety for agent tools

## Architecture

### Runtime

- [runtime.py](src/claude_code_python/runtime.py) manages the agent loop, model responses, tool dispatch, and tool-result feedback

### Model Layer

- [model.py](src/claude_code_python/model.py) wraps an OpenAI-compatible chat completion backend

### Tools

- [tools/base.py](src/claude_code_python/tools/base.py) defines the tool abstraction and registry
- [tools/task.py](src/claude_code_python/tools/task.py) implements sub-agent delegation, timeout control, and bounded recursion
- [tools/filesystem.py](src/claude_code_python/tools/filesystem.py) provides workspace-safe file operations
- [tools/bash.py](src/claude_code_python/tools/bash.py) provides shell command execution

## Installation

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -e .
```

## Model Configuration

Set environment variables:

```bash
export OPENAI_API_KEY='your_key'
export OPENAI_BASE_URL='https://your-openai-compatible-endpoint/v1'
export CCPY_MODEL='your-model-name'
```

Examples:

- OpenAI: set `OPENAI_API_KEY`
- Moonshot / Kimi: set `OPENAI_API_KEY`, `OPENAI_BASE_URL`, and `CCPY_MODEL`

## CLI Usage

Run one-shot:

```bash
ccpy run "Inspect this repo and summarize the Python entry points."
```

Run interactive chat:

```bash
ccpy chat
```

You can also use the module form:

```bash
.venv/bin/python -m claude_code_python.cli run "Inspect this repo and summarize the Python entry points." --workdir .
```

## Demo

The main example is a live sub-agent demo driven by a real model.

It asks the root agent to:

- call the built-in `task` tool,
- launch two sub-agents,
- inspect two separate files,
- and merge the results into one short operational brief.

### Demo Files

- [run_subagent_demo_live.py](examples/run_subagent_demo_live.py)
- [subagent_demo_live_prompt.txt](examples/subagent_demo_live_prompt.txt)
- [subagent_demo_live_prompt_zh.txt](examples/subagent_demo_live_prompt_zh.txt)
- [task_demo_prompt.txt](examples/task_demo_prompt.txt)
- [task_demo_prompt_zh.txt](examples/task_demo_prompt_zh.txt)

### Demo Command

```bash
cd /Users/sansan/Desktop/Claude_code_space/claude_python
source ~/.ccpy_env
PYTHONPATH=src .venv/bin/python examples/run_subagent_demo_live.py
```

## Default Tools

- `bash`
- `task`
- `read_file`
- `write_file`
- `edit_file`
- `multi_edit`
- `ls`
- `glob`
- `grep`
- `pwd`
- `mkdir`
- `todo_read`
- `todo_write`

## Project Layout

```text
claude_python/
├── README.md
├── README_zh.md
├── examples/
│   ├── run_subagent_demo_live.py
│   ├── subagent_demo_live_prompt.txt
│   ├── subagent_demo_live_prompt_zh.txt
│   ├── subagent_demo_workspace/
│   ├── task_demo_prompt.txt
│   └── task_demo_prompt_zh.txt
├── pyproject.toml
└── src/
    └── claude_code_python/
        ├── cli.py
        ├── config.py
        ├── model.py
        ├── runtime.py
        └── tools/
```

## Notes

- This project focuses on runtime capability rather than UI recreation
- Model quality and latency depend on the configured provider
- The included demo is intentionally small and easy to inspect
- TerminalBench-style evaluation is not bundled yet
