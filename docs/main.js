const translations = {
    en: {
        github: "GitHub",
        eyebrow: "PYTHON AGENT RUNTIME",
        hero_title: "A compact Claude Code style runtime focused on tools, loops, and sub-agents.",
        subtitle: "A lightweight Claude Code style agent runtime built in Python, designed around multi-step loops, tool use, and sub-agent delegation.",
        arch: "Architecture",
        demo: "Demo flow",
        stat_runtime: "multi-step agent loop",
        stat_task: "sub-agent delegation",
        stat_tools: "workspace-safe tools",

        features_tag: "Core capabilities",
        features_title: "Three capabilities define the project.",
        feat_loop_title: "Runtime loop",
        feat_loop_desc: "The root agent stays inside one compact loop of model output, tool execution, and result feedback.",
        feat_task_title: "Task Tool & Sub-agents",
        feat_task_desc: "The `task` tool can spawn one or more sub-agents, let them work in parallel, and gather results back into the root flow.",
        feat_tools_title: "Default tool surface",
        feat_tools_desc: "Built-in shell, filesystem, search, and todo tools are exposed through one consistent registry.",

        arch_tag: "Architecture",
        arch_title: "A request moves through four clear stages.",
        flow_1_title: "Prompt enters runtime",
        flow_1_desc: "The root agent starts with a system prompt, a user task, registered tools, and workdir context.",
        flow_2_title: "Model chooses next action",
        flow_2_desc: "It can answer directly or emit tool calls such as `read_file`, `bash`, or `task`.",
        flow_3_title: "Tools execute",
        flow_3_desc: "Tool calls are dispatched, and their outputs are appended back into the conversation loop.",
        flow_4_title: "Sub-agents return focused outputs",
        flow_4_desc: "If `task` is used, sub-agents run through the same runtime with bounded depth and tool scope.",
        module_runtime: "Owns the root loop, tool orchestration, and message progression.",
        module_model: "Wraps an OpenAI-compatible chat completion backend for flexible model integration.",
        module_task: "Handles delegation, timeout control, parallel sub-agent execution, and bounded recursion.",

        demo_tag: "Live demo",
        demo_title: "A simple demo is enough to expose the core design.",
        command_label: "Run command",
        demo_note1_title: "Prompt constraint",
        demo_note1_desc: "The root agent is asked to call `task` before directly analyzing the files by itself.",
        demo_note2_title: "Task split",
        demo_note2_desc: "Two sub-agents inspect different inputs: one handles inventory and one handles staffing.",
        demo_note3_title: "Final merge",
        demo_note3_desc: "The root agent merges both focused outputs into one short operational brief with immediate actions.",

        links_tag: "Key files",
        links_title: "Open the code paths that matter most.",
        link_1: "Core agent loop",
        link_2: "Sub-agent delegation",
        link_3: "Live demo entry",
        link_4_path: "repository",
        link_4: "Open full project on GitHub",

        footer: "Focused on runtime capability rather than UI recreation, with a compact codebase that remains easy to inspect."
    },
    zh: {
        github: "GitHub 代码库",
        eyebrow: "PYTHON AGENT RUNTIME",
        hero_title: "一个聚焦工具、循环与 sub-agent 的紧凑 Claude Code 风格运行时。",
        subtitle: "一个用 Python 实现的轻量级 Claude Code 风格智能体运行时，重点展示多步循环、工具调用与 sub-agent 委派。",
        arch: "核心架构",
        demo: "演示流程",
        stat_runtime: "多步 agent loop",
        stat_task: "sub-agent 委派",
        stat_tools: "工作区安全工具",

        features_tag: "核心能力",
        features_title: "这个项目主要由三项能力组成。",
        feat_loop_title: "Runtime loop",
        feat_loop_desc: "根代理在模型输出、工具执行和结果回填之间维持一个紧凑循环。",
        feat_task_title: "Task Tool 与子智能体",
        feat_task_desc: "通过 `task` 工具可以生成一个或多个子代理，并行执行后再把结果收回根代理流程。",
        feat_tools_title: "默认工具面",
        feat_tools_desc: "内置 shell、文件系统、搜索和 todo 工具，并通过统一注册机制暴露。",

        arch_tag: "架构",
        arch_title: "一个请求会经过四个清晰阶段。",
        flow_1_title: "Prompt 进入 runtime",
        flow_1_desc: "根代理从 system prompt、user task、工具注册表和 workdir 上下文开始。",
        flow_2_title: "模型决定下一步",
        flow_2_desc: "模型既可以直接回答，也可以发出 `read_file`、`bash`、`task` 等工具调用。",
        flow_3_title: "工具执行",
        flow_3_desc: "工具调用被执行后，其结果会重新写回对话循环中。",
        flow_4_title: "Sub-agent 返回聚焦结果",
        flow_4_desc: "一旦调用 `task`，子代理会在同一套 runtime 中运行，并受深度和工具范围限制。",
        module_runtime: "负责根循环、工具编排和消息推进。",
        module_model: "封装 OpenAI 兼容 chat completion 后端，便于灵活切换模型。",
        module_task: "负责委派、超时控制、并行子代理执行以及递归边界。",

        demo_tag: "Live demo",
        demo_title: "一个简单 demo 就足以展示核心设计。",
        command_label: "运行命令",
        demo_note1_title: "Prompt 约束",
        demo_note1_desc: "根代理被要求先调用 `task`，而不是自己直接分析全部文件。",
        demo_note2_title: "任务拆分",
        demo_note2_desc: "两个子代理分别检查不同输入，一个处理库存，一个处理排班。",
        demo_note3_title: "最终合并",
        demo_note3_desc: "根代理把两个聚焦输出合并成一份简短运营简报，并给出立即行动项。",

        links_tag: "关键文件",
        links_title: "打开最值得看的代码路径。",
        link_1: "核心 agent loop",
        link_2: "sub-agent 委派",
        link_3: "live demo 入口",
        link_4_path: "仓库",
        link_4: "在 GitHub 查看完整项目",

        footer: "这个项目专注于 runtime capability 而不是 UI 复刻，并尽量保持代码紧凑、便于阅读。"
    }
};

let currentLang = 'zh';

function setLanguage(lang) {
    currentLang = lang;
    const langBtn = document.getElementById('lang-toggle');
    langBtn.innerText = lang === 'en' ? '🇨🇳 中文' : '🇺🇸 EN';
    document.body.className = `lang-${lang}`;
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    localStorage.setItem('ccpy-lang', lang);
}

document.getElementById('lang-toggle').addEventListener('click', () => {
    setLanguage(currentLang === 'en' ? 'zh' : 'en');
});

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('ccpy-lang') || 'zh';
    setLanguage(savedLang);

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
