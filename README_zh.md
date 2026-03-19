# Claude Code Python 中文说明

这是一个使用 Python 实现的轻量级 Claude Code 风格智能体运行时。

这个项目重点关注 coding agent 的运行时能力，而不是界面复刻。它提供了一套紧凑但完整的能力组合，包括：

- 多步 agent loop
- 工具调用
- 通过 `task` 进行 subagent 委派
- 并行执行
- 可扩展的 Python 工具架构

英文说明见 [README.md](/Users/sansan/Desktop/Claude_code_space/claude_python/README.md)。

## 功能特性

- 多步 agent loop 与工具调用
- 多个工具调用可以并行执行
- `task` 工具可以拉起一个或多个 subagent
- 支持通过 `OPENAI_BASE_URL` 对接 OpenAI 兼容接口
- 提供单次运行和交互式 chat CLI
- 提供类似 Claude Code 的默认文件、搜索、shell、todo 工具
- 提供工作区范围内的文件安全限制

## 架构说明

### Runtime

- [runtime.py](/Users/sansan/Desktop/Claude_code_space/claude_python/src/claude_code_python/runtime.py) 负责 agent loop、模型响应、工具分发和工具结果回填

### Model Layer

- [model.py](/Users/sansan/Desktop/Claude_code_space/claude_python/src/claude_code_python/model.py) 封装 OpenAI 兼容的 chat completion 后端

### Tools

- [tools/base.py](/Users/sansan/Desktop/Claude_code_space/claude_python/src/claude_code_python/tools/base.py) 定义工具抽象和注册机制
- [tools/task.py](/Users/sansan/Desktop/Claude_code_space/claude_python/src/claude_code_python/tools/task.py) 实现 subagent 委派、超时控制和递归深度限制
- [tools/filesystem.py](/Users/sansan/Desktop/Claude_code_space/claude_python/src/claude_code_python/tools/filesystem.py) 提供工作区安全的文件操作
- [tools/bash.py](/Users/sansan/Desktop/Claude_code_space/claude_python/src/claude_code_python/tools/bash.py) 提供 shell 命令执行

## 安装

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -e .
```

## 模型配置

设置环境变量：

```bash
export OPENAI_API_KEY='your_key'
export OPENAI_BASE_URL='https://your-openai-compatible-endpoint/v1'
export CCPY_MODEL='your-model-name'
```

常见示例：

- OpenAI 官方接口：设置 `OPENAI_API_KEY`
- Moonshot / Kimi：同时设置 `OPENAI_API_KEY`、`OPENAI_BASE_URL`、`CCPY_MODEL`

## CLI 用法

单次运行：

```bash
ccpy run "Inspect this repo and summarize the Python entry points."
```

交互式 chat：

```bash
ccpy chat
```

也可以用模块方式运行：

```bash
.venv/bin/python -m claude_code_python.cli run "Inspect this repo and summarize the Python entry points." --workdir .
```

## Demo

主要示例是一个由真实模型参与的 live subagent demo。

这个 demo 会要求根代理：

- 调用内置 `task` 工具
- 拉起两个 subagent
- 分别检查两份文件
- 最后把结果合并成一个简短运营简报

### Demo 文件

- [run_subagent_demo_live.py](/Users/sansan/Desktop/Claude_code_space/claude_python/examples/run_subagent_demo_live.py)
- [subagent_demo_live_prompt.txt](/Users/sansan/Desktop/Claude_code_space/claude_python/examples/subagent_demo_live_prompt.txt)
- [subagent_demo_live_prompt_zh.txt](/Users/sansan/Desktop/Claude_code_space/claude_python/examples/subagent_demo_live_prompt_zh.txt)
- [task_demo_prompt.txt](/Users/sansan/Desktop/Claude_code_space/claude_python/examples/task_demo_prompt.txt)
- [task_demo_prompt_zh.txt](/Users/sansan/Desktop/Claude_code_space/claude_python/examples/task_demo_prompt_zh.txt)

### Demo 运行命令

```bash
cd /Users/sansan/Desktop/Claude_code_space/claude_python
source ~/.ccpy_env
PYTHONPATH=src .venv/bin/python examples/run_subagent_demo_live.py
```

## 默认工具

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

## 项目结构

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

## 说明

- 这个项目重点是 runtime capability，而不是 UI 复刻
- 模型质量和延迟取决于你配置的 provider
- 当前 demo 刻意保持小而清晰，便于理解和检查
- 还没有内置 TerminalBench 风格评测
