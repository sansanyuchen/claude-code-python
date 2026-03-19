const translations = {
  en: {
    "hero.tag": "PYTHON AGENT RUNTIME",
    "hero.title": "A clean Claude Code style runtime built around tools, loops, and sub-agents.",
    "hero.text":
      "This project focuses on the functional core of a coding agent: a multi-step runtime, tool calling, the `task` tool for delegation, and a simple live demo that makes the sub-agent flow easy to inspect.",
    "hero.metric1": "multi-step loop",
    "hero.metric2": "sub-agent delegation",
    "hero.metric3": "workspace-safe actions",

    "overview.label": "Overview",
    "overview.title": "Three core ideas define the project.",
    "overview.card1.title": "Agent loop",
    "overview.card1.body":
      "The runtime keeps model output, tool execution, and tool-result feedback inside one compact loop.",
    "overview.card2.title": "Tool system",
    "overview.card2.body":
      "Filesystem, shell, search, and todo tools are registered through one consistent interface.",
    "overview.card3.title": "Sub-agents",
    "overview.card3.body":
      "The `task` tool can split work into parallel sub-agents and merge their outputs back into the root run.",

    "architecture.label": "Architecture",
    "architecture.title": "A request passes through four clear stages.",
    "architecture.step1.title": "Root runtime starts",
    "architecture.step1.body":
      "The agent begins with the system prompt, user prompt, tool specs, and workdir context.",
    "architecture.step2.title": "Model chooses action",
    "architecture.step2.body":
      "It can answer directly or emit tool calls, including a `task` call.",
    "architecture.step3.title": "Tools execute",
    "architecture.step3.body":
      "Tool results are collected and written back into the conversation state.",
    "architecture.step4.title": "Sub-agents merge back",
    "architecture.step4.body":
      "If `task` is used, sub-agents run through the same runtime and return focused outputs.",
    "architecture.module1": "Owns the loop, tool orchestration, and response handoff.",
    "architecture.module2": "Handles delegation, timeout control, and bounded depth.",
    "architecture.module3": "Provides workspace-safe file operations for the agent.",

    "demo.label": "Demo",
    "demo.title": "The live demo is small on purpose, so the delegation path is easy to understand.",
    "demo.commandLabel": "Run command",
    "demo.note1.title": "Prompt constraint",
    "demo.note1.body":
      "The root agent is explicitly asked to call `task` before doing direct analysis itself.",
    "demo.note2.title": "Task split",
    "demo.note2.body":
      "Two sub-agents inspect different files: one for inventory, one for staffing.",
    "demo.note3.title": "Final result",
    "demo.note3.body":
      "The root agent merges both outputs into one short operational brief with immediate actions.",

    "links.label": "Links",
    "links.title": "Open the code paths that matter most.",
    "links.card1": "Core agent loop",
    "links.card2": "Sub-agent delegation",
    "links.card3": "Live demo entry",
    "links.card4path": "Repository",
    "links.card4": "Full project on GitHub",
  },
  zh: {
    "hero.tag": "PYTHON AGENT RUNTIME",
    "hero.title": "一个围绕工具、循环与 sub-agent 构建的干净 Claude Code 风格运行时。",
    "hero.text":
      "这个项目关注 coding agent 的功能核心：多步 runtime、工具调用、通过 `task` 进行委派，以及一条便于观察 sub-agent 流程的 live demo。",
    "hero.metric1": "多步循环",
    "hero.metric2": "sub-agent 委派",
    "hero.metric3": "工作区安全操作",

    "overview.label": "概览",
    "overview.title": "这个项目由三个核心想法组成。",
    "overview.card1.title": "Agent loop",
    "overview.card1.body": "runtime 把模型输出、工具执行和结果回填组织在一个紧凑循环里。",
    "overview.card2.title": "工具系统",
    "overview.card2.body": "文件、shell、搜索和 todo 工具通过统一接口注册和调用。",
    "overview.card3.title": "Sub-agent",
    "overview.card3.body": "`task` 工具可以把工作拆给并行子代理，再把结果合并回根代理流程。",

    "architecture.label": "架构",
    "architecture.title": "一个请求会经过四个清晰阶段。",
    "architecture.step1.title": "根 runtime 启动",
    "architecture.step1.body": "代理从 system prompt、user prompt、工具规格和 workdir 上下文开始。",
    "architecture.step2.title": "模型决定动作",
    "architecture.step2.body": "模型可以直接回答，也可以发出工具调用，其中包括 `task`。",
    "architecture.step3.title": "工具执行",
    "architecture.step3.body": "工具结果被收集后重新写回对话状态，驱动下一步。",
    "architecture.step4.title": "Sub-agent 合并返回",
    "architecture.step4.body": "一旦使用 `task`，子代理通过同一套 runtime 运行，并返回聚焦结果。",
    "architecture.module1": "负责循环、工具编排和响应交接。",
    "architecture.module2": "负责委派、超时控制和深度限制。",
    "architecture.module3": "提供工作区安全的文件操作能力。",

    "demo.label": "Demo",
    "demo.title": "live demo 刻意保持简单，这样委派路径会更容易理解。",
    "demo.commandLabel": "运行命令",
    "demo.note1.title": "Prompt 约束",
    "demo.note1.body": "根代理被明确要求先调用 `task`，而不是自己直接分析全部内容。",
    "demo.note2.title": "任务拆分",
    "demo.note2.body": "两个子代理分别检查不同文件：一个看库存，一个看排班。",
    "demo.note3.title": "最终结果",
    "demo.note3.body": "根代理把两个输出合并成一份简短运营简报，并附带可追踪流程。",

    "links.label": "链接",
    "links.title": "打开最值得看的代码路径。",
    "links.card1": "核心 agent loop",
    "links.card2": "sub-agent 委派",
    "links.card3": "live demo 入口",
    "links.card4path": "仓库",
    "links.card4": "GitHub 完整项目",
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
