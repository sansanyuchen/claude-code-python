const translations = {
  en: {
    "hero.eyebrow": "Python agent runtime",
    "hero.title": "A compact Claude Code style runtime focused on tools and sub-agents.",
    "hero.summary":
      "This project implements the functional core of a coding agent: a multi-step runtime, tool calling, the `task` tool for delegation, and a live demo that shows how work can be split across sub-agents.",
    "hero.primary": "See Architecture",
    "hero.secondary": "See Demo",
    "hero.panelLabel": "At a glance",
    "hero.panel1": "Multi-step runtime loop",
    "hero.panel2": "OpenAI-compatible model layer",
    "hero.panel3": "Parallel tool execution",
    "hero.panel4": "`task`-based sub-agent delegation",

    "capabilities.kicker": "Core capabilities",
    "capabilities.title": "The three ideas this project is built around",
    "capabilities.card1.title": "Runtime loop",
    "capabilities.card1.body":
      "The root agent keeps cycling through model output, tool execution, and tool-result feedback until the task is complete.",
    "capabilities.card2.title": "Tool calling",
    "capabilities.card2.body":
      "Filesystem, search, shell, and todo tools are exposed through a consistent registry and run within a workspace boundary.",
    "capabilities.card3.title": "Sub-agent delegation",
    "capabilities.card3.body":
      "The `task` tool can fan work out into sub-agents, run them in parallel, and gather their results back into the root flow.",

    "architecture.kicker": "Architecture",
    "architecture.title": "How one request moves through the system",
    "architecture.step1.title": "Prompt enters runtime",
    "architecture.step1.body":
      "The root agent starts with system prompt, user prompt, tool specs, and workdir context.",
    "architecture.step2.title": "Model chooses next action",
    "architecture.step2.body":
      "It can answer directly or emit tool calls, including a `task` call for delegation.",
    "architecture.step3.title": "Tools execute and return results",
    "architecture.step3.body":
      "Tool calls run, their outputs are captured, and the conversation continues from there.",
    "architecture.step4.title": "Sub-agents branch and merge",
    "architecture.step4.body":
      "If `task` is used, sub-agents run through the same runtime and return compact results to the root agent.",
    "architecture.module1": "Owns the loop and orchestration.",
    "architecture.module2": "Handles delegation, timeout, and depth control.",
    "architecture.module3": "Provides workspace-safe tools.",

    "demo.kicker": "Demo",
    "demo.title": "A simple live flow that exposes the core design",
    "demo.commandLabel": "Run command",
    "demo.summaryLabel": "What the prompt asks for",
    "demo.summaryBody":
      "The root agent must call `task`, launch two sub-agents, inspect inventory and staffing files, and merge the outputs into one brief.",
    "demo.step1": "Root agent receives a short operational brief task.",
    "demo.step2": "The model is expected to call `task` instead of reading everything directly.",
    "demo.step3": "Two sub-agents inspect different files and return focused summaries.",
    "demo.step4": "The root agent merges the outputs into one final brief and traceable run.",

    "footer.kicker": "Links",
    "footer.title": "Project files worth opening next",
    "footer.repo": "Open GitHub repository",
  },
  zh: {
    "hero.eyebrow": "Python agent runtime",
    "hero.title": "一个紧凑的 Claude Code 风格运行时，重点展示工具调用与 sub-agent。",
    "hero.summary":
      "这个项目实现了 coding agent 的功能核心：多步 runtime、工具调用、通过 `task` 进行委派，以及一条展示 sub-agent 如何分工的 live demo。",
    "hero.primary": "查看架构",
    "hero.secondary": "查看 Demo",
    "hero.panelLabel": "快速概览",
    "hero.panel1": "多步 runtime 循环",
    "hero.panel2": "OpenAI 兼容模型层",
    "hero.panel3": "并行工具执行",
    "hero.panel4": "基于 `task` 的 sub-agent 委派",

    "capabilities.kicker": "核心能力",
    "capabilities.title": "这个项目围绕的三个核心想法",
    "capabilities.card1.title": "Runtime loop",
    "capabilities.card1.body":
      "根代理持续在模型输出、工具执行和结果回填之间循环，直到任务完成。",
    "capabilities.card2.title": "工具调用",
    "capabilities.card2.body":
      "文件、搜索、shell 和 todo 工具通过统一注册表暴露，并受工作区边界约束。",
    "capabilities.card3.title": "Sub-agent 委派",
    "capabilities.card3.body":
      "`task` 工具可以把工作拆给多个子代理，并行运行后再把结果收回根代理流程。",

    "architecture.kicker": "架构",
    "architecture.title": "一个请求如何流经整个系统",
    "architecture.step1.title": "Prompt 进入 runtime",
    "architecture.step1.body":
      "根代理启动时带上 system prompt、user prompt、工具规格和 workdir 上下文。",
    "architecture.step2.title": "模型决定下一步",
    "architecture.step2.body":
      "模型可以直接回答，也可以发出工具调用，其中包括委派用的 `task`。",
    "architecture.step3.title": "工具执行并返回结果",
    "architecture.step3.body":
      "工具被执行，输出被捕获，然后对话从这些结果继续推进。",
    "architecture.step4.title": "Sub-agent 分支与合并",
    "architecture.step4.body":
      "一旦使用 `task`，子代理会通过同一套 runtime 运行，再把结果返回给根代理。",
    "architecture.module1": "负责主循环和整体编排。",
    "architecture.module2": "负责委派、超时和深度控制。",
    "architecture.module3": "提供工作区安全工具。",

    "demo.kicker": "Demo",
    "demo.title": "一条简单的 live 流程，直接展示核心设计",
    "demo.commandLabel": "运行命令",
    "demo.summaryLabel": "这个 prompt 要求什么",
    "demo.summaryBody":
      "根代理必须调用 `task`，启动两个子代理，分别检查库存和排班文件，并把结果合并成一份简报。",
    "demo.step1": "根代理接收一个简短的运营简报任务。",
    "demo.step2": "模型应该调用 `task`，而不是自己直接读完所有内容。",
    "demo.step3": "两个子代理分别检查不同文件，并返回聚焦后的摘要。",
    "demo.step4": "根代理把结果合并成最终简报，并保留可追踪的运行记录。",

    "footer.kicker": "链接",
    "footer.title": "下一步值得打开的项目文件",
    "footer.repo": "打开 GitHub 仓库",
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
