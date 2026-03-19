const translations = {
  en: {
    "hero.eyebrow": "Runtime-first coding agent",
    "hero.title": "A compact Claude Code style runtime with real sub-agent delegation.",
    "hero.summary":
      "This project focuses on the functional core of a coding agent: multi-step reasoning, tool calling, the `task` tool for sub-agents, and a clean Python runtime that can be inspected quickly.",
    "hero.primary": "See Demo Flow",
    "hero.secondary": "Open Repository",
    "heroCard.label": "Core stack",
    "heroCard.item1": "Python runtime",
    "heroCard.item2": "OpenAI-compatible model layer",
    "heroCard.item3": "Parallel tool execution",
    "heroCard.item4": "`task`-driven sub-agents",

    "overview.kicker": "Overview",
    "overview.title": "What this project is built to show",
    "overview.card1.title": "Agent loop",
    "overview.card1.body":
      "A multi-step runtime that keeps feeding model outputs back into tool execution until the task is finished.",
    "overview.card2.title": "Sub-agents",
    "overview.card2.body":
      "A `task` tool that fans work out into multiple sub-agents and gathers their results back into the root run.",
    "overview.card3.title": "Tooling surface",
    "overview.card3.body":
      "File, shell, search, and todo tools with workspace boundaries and a registry-based design.",
    "overview.card4.title": "Inspectable design",
    "overview.card4.body":
      "The repository stays intentionally compact so the runtime and tool flow are easy to read and explain.",

    "architecture.kicker": "Architecture",
    "architecture.title": "How a request moves through the system",
    "architecture.step1.title": "Prompt enters runtime",
    "architecture.step1.body":
      "The root agent starts in `runtime.py` with the system prompt, user prompt, tool specs, and workdir context.",
    "architecture.step2.title": "Model decides next action",
    "architecture.step2.body":
      "The model can answer directly or emit one or more tool calls, including a `task` call.",
    "architecture.step3.title": "Tools execute in parallel",
    "architecture.step3.body":
      "Tool calls are dispatched concurrently with `asyncio.gather`, then their outputs are appended back into the conversation.",
    "architecture.step4.title": "Sub-agents can branch out",
    "architecture.step4.body":
      "When the `task` tool is used, sub-agents run through the same runtime with depth control and bounded tools.",
    "architecture.module1.title": "Root orchestration",
    "architecture.module1.body":
      "Owns the loop, conversation state, tool selection, and response handoff.",
    "architecture.module2.title": "Delegation layer",
    "architecture.module2.body":
      "Launches sub-agents in parallel, applies timeouts, and prevents uncontrolled nesting.",
    "architecture.module3.title": "Workspace-safe tools",
    "architecture.module3.body":
      "Keeps reads and writes inside the configured workdir while exposing useful file primitives.",

    "demo.kicker": "Live demo",
    "demo.title": "The showcase flow: root agent, `task`, then two sub-agents",
    "demo.commandTitle": "Demo command",
    "demo.promptLabel": "Prompt design",
    "demo.promptBody":
      "The live prompt explicitly asks the model to call `task` first, then create exactly two sub-agents to inspect separate files and merge the results.",
    "demo.item1.title": "Root agent receives the brief",
    "demo.item1.body":
      "The task is framed as a short operational brief built from two files in the demo workspace.",
    "demo.item2.title": "`task` fans work out",
    "demo.item2.body":
      "The model is expected to call the `task` tool rather than reading everything directly in the root run.",
    "demo.item3.title": "Two sub-agents inspect different files",
    "demo.item3.body":
      "One sub-agent handles inventory, the other handles staffing, each returning a compact result.",
    "demo.item4.title": "Root agent merges outputs",
    "demo.item4.body":
      "The final answer becomes a small operational brief with inventory status, staffing status, and immediate actions.",

    "trace.title": "Example trace checkpoints",
    "trace.body":
      "The live demo writes a trace file so the execution path can be inspected after the run.",
    "trace.card1.title": "Model response",
    "trace.card1.body": "The root agent decides whether to call `task` and how to split the work.",
    "trace.card2.title": "Inventory branch",
    "trace.card2.body":
      "The first sub-agent inspects inventory notes and returns risk and restock priorities.",
    "trace.card3.title": "Staffing branch",
    "trace.card3.body":
      "The second sub-agent inspects staffing notes and returns coverage gaps and immediate actions.",

    "highlights.kicker": "Highlights",
    "highlights.title": "Why the design stays intentionally compact",
    "highlights.item1.title": "Readable core loop",
    "highlights.item1.body":
      "The runtime is small enough to inspect quickly, but complete enough to show real agent behavior.",
    "highlights.item2.title": "Real delegation, not mocked branching",
    "highlights.item2.body":
      "Sub-agents run through the same runtime and tool system as the root agent.",
    "highlights.item3.title": "OpenAI-compatible backend",
    "highlights.item3.body":
      "The model layer can target standard or compatible endpoints with the same interface.",
  },
  zh: {
    "hero.eyebrow": "以 runtime 为核心的 coding agent",
    "hero.title": "一个紧凑的 Claude Code 风格运行时，具备真实的 sub-agent 委派能力。",
    "hero.summary":
      "这个项目重点展示 coding agent 的功能核心：多步推理、工具调用、通过 `task` 启动 sub-agent，以及一个便于阅读和解释的 Python runtime。",
    "hero.primary": "查看 Demo 流程",
    "hero.secondary": "打开仓库",
    "heroCard.label": "核心组成",
    "heroCard.item1": "Python runtime",
    "heroCard.item2": "OpenAI 兼容模型层",
    "heroCard.item3": "并行工具执行",
    "heroCard.item4": "由 `task` 驱动的 sub-agent",

    "overview.kicker": "概览",
    "overview.title": "这个项目主要想展示什么",
    "overview.card1.title": "Agent loop",
    "overview.card1.body": "一个多步 runtime，会不断把模型输出接回到工具执行中，直到任务完成。",
    "overview.card2.title": "Sub-agent",
    "overview.card2.body":
      "通过 `task` 工具把工作拆给多个子代理，再把结果合并回根代理执行流程。",
    "overview.card3.title": "工具面",
    "overview.card3.body": "提供文件、shell、搜索和 todo 工具，并带有工作区边界和注册机制。",
    "overview.card4.title": "便于审查的设计",
    "overview.card4.body": "仓库刻意保持紧凑，让 runtime 和工具调用链路更容易理解和讲解。",

    "architecture.kicker": "架构",
    "architecture.title": "一个请求如何流经整个系统",
    "architecture.step1.title": "Prompt 进入 runtime",
    "architecture.step1.body":
      "根代理在 `runtime.py` 中启动，携带 system prompt、user prompt、工具规格和 workdir 上下文。",
    "architecture.step2.title": "模型决定下一步",
    "architecture.step2.body":
      "模型可以直接回答，也可以发出一个或多个工具调用，其中包括 `task`。",
    "architecture.step3.title": "工具并行执行",
    "architecture.step3.body":
      "工具调用通过 `asyncio.gather` 并发执行，然后它们的输出会重新追加回对话。",
    "architecture.step4.title": "Sub-agent 向外分支",
    "architecture.step4.body":
      "一旦调用 `task`，子代理会通过同一套 runtime 运行，并受到深度和工具范围约束。",
    "architecture.module1.title": "根编排层",
    "architecture.module1.body": "负责循环、对话状态、工具选择和结果回填。",
    "architecture.module2.title": "委派层",
    "architecture.module2.body": "并行启动子代理、应用超时控制，并避免无限嵌套。",
    "architecture.module3.title": "工作区安全工具",
    "architecture.module3.body": "保证读写留在 workdir 内，同时提供常用的文件操作能力。",

    "demo.kicker": "Live demo",
    "demo.title": "展示流程：根代理、`task`、然后两个 sub-agent",
    "demo.commandTitle": "演示命令",
    "demo.promptLabel": "Prompt 设计",
    "demo.promptBody":
      "live prompt 会明确要求模型先调用 `task`，再创建两个子代理去检查不同文件，最后合并结果。",
    "demo.item1.title": "根代理接收任务",
    "demo.item1.body": "任务被设计成一份简短运营简报，需要从 demo 工作区中的两份文件提取信息。",
    "demo.item2.title": "`task` 开始拆分工作",
    "demo.item2.body": "模型应该优先调用 `task`，而不是在根代理里自己直接读完所有内容。",
    "demo.item3.title": "两个子代理分别检查文件",
    "demo.item3.body": "一个子代理处理库存，另一个处理排班，各自返回精简结果。",
    "demo.item4.title": "根代理合并输出",
    "demo.item4.body": "最终输出是一份小型运营简报，包含库存状态、排班状态和立即行动项。",

    "trace.title": "示例 trace 检查点",
    "trace.body": "live demo 会写出 trace 文件，方便在运行后检查完整执行路径。",
    "trace.card1.title": "模型响应",
    "trace.card1.body": "根代理决定是否调用 `task`，以及如何拆分工作。",
    "trace.card2.title": "库存分支",
    "trace.card2.body": "第一个子代理检查库存说明，并返回风险和补货优先级。",
    "trace.card3.title": "排班分支",
    "trace.card3.body": "第二个子代理检查排班说明，并返回人员缺口和立即行动项。",

    "highlights.kicker": "亮点",
    "highlights.title": "为什么这个设计刻意保持紧凑",
    "highlights.item1.title": "核心循环足够清晰",
    "highlights.item1.body": "runtime 足够小，便于快速阅读，但又完整到能展示真实 agent 行为。",
    "highlights.item2.title": "是真实委派，不是伪分支",
    "highlights.item2.body": "sub-agent 与根代理共用同一套 runtime 和工具系统。",
    "highlights.item3.title": "OpenAI 兼容后端",
    "highlights.item3.body": "模型层可以用同一个接口接标准或兼容端点。",
  },
};

const toggle = document.getElementById("language-toggle");
let currentLanguage = "en";

function applyLanguage(language) {
  document.documentElement.lang = language;
  currentLanguage = language;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (translations[language][key]) {
      element.textContent = translations[language][key];
    }
  });
  toggle.textContent = language === "en" ? "中文" : "EN";
}

toggle.addEventListener("click", () => {
  applyLanguage(currentLanguage === "en" ? "zh" : "en");
});

applyLanguage("en");
