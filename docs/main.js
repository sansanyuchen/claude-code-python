const translations = {
    en: {
        github: "GitHub",
        eyebrow: "PYTHON AGENT RUNTIME",
        hero_title: "A compact Claude Code style runtime focused on tools, loops, and sub-agents.",
        subtitle: "A lightweight Claude Code style agent runtime built in Python, designed around multi-step loops, tool execution, and parallel sub-agent delegation. It prioritizes core functionality and extensibility without complex UI components.",
        arch: "Architecture",
        demo: "Demo Flow",
        stat_runtime: "multi-step agent loop",
        stat_task: "sub-agent delegation",
        stat_tools: "workspace-safe tools",

        features_tag: "Core capabilities",
        features_title: "Three capabilities define the project.",
        feat_loop_title: "Runtime loop",
        feat_loop_desc: "The root agent stays inside a compact continuous loop of model reasoning, tool execution, and result feedback.",
        feat_task_title: "Task Tool & Sub-agents",
        feat_task_desc: "The `task` tool spawns independent sub-agents to execute isolated tasks in parallel, synthesizing their results back into the main workflow.",
        feat_tools_title: "Default tool surface",
        feat_tools_desc: "Built-in shell, filesystem operations, search, and todo tools are exposed securely through a consistent plugin registry.",

        arch_tag: "Architecture",
        arch_title: "A request moves through four distinct stages.",
        flow_1_title: "Prompt initialization",
        flow_1_desc: "The root agent starts with a system prompt, the user's task, registered tools, and current workspace context.",
        flow_2_title: "Model intent prediction",
        flow_2_desc: "The model parses the context to either answer directly or emit parallel tool calls such as `read_file`, `bash`, or `task`.",
        flow_3_title: "Tool execution",
        flow_3_desc: "Tool calls are dispatched and executed locally, appending standard outputs or error traces directly back into the conversation loop.",
        flow_4_title: "Sub-agent synthesis",
        flow_4_desc: "When `task` is invoked, isolated sub-agents execute within the same runtime using bounded depth constraints to prevent infinite recursion.",
        module_runtime: "Manages the execution loop, orchestrates tools, and controls message state progression.",
        module_model: "Wraps an OpenAI-compatible chat completion backend, allowing flexible model swapping.",
        module_task: "Provides task delegation, parallel sub-agent execution, timeout controls, and defined recursion boundaries.",

        demo_tag: "Live Demo",
        demo_title: "Understanding the design through a practical demo.",
        demo_prompt_label: "Prompt Input",
        demo_prompt_text: "Prepare a one-page weekend market operations brief from the files in the current workspace.\n\nThis is a subagent capability demo. You must call the `task` tool before doing any direct file analysis yourself.\n\nUse the `task` tool to launch exactly two parallel sub-agents:\n1. One sub-agent should inspect `inventory.txt`...\n2. One sub-agent should inspect `staffing.txt`...\n\nAfter both finish, merge their results into one final brief.",
        command_label: "Run command",
        demo_note1_title: "Prompt Constraint",
        demo_note1_desc: "The primary agent is given an explicit rule to delegate work via the `task` tool rather than independently analyzing local files.",
        demo_note2_title: "Parallel Execution",
        demo_note2_desc: "The root agent triggers two isolated sub-agents concurrently: one audits inventory records, while the other reviews scheduling data.",
        demo_note3_title: "Final Synthesis",
        demo_note3_desc: "Once the sub-agents return their focused findings, the root agent synthesizes the context into a cohesive, actionable operational brief.",

        links_tag: "Key files",
        links_title: "Open the code paths that matter most.",
        link_1: "Core agent loop",
        link_2: "Sub-agent delegation",
        link_3: "Live demo entry",
        link_4_path: "repository",
        link_4: "Open full project on GitHub",

        footer: "Focused entirely on building a robust runtime capability. Maintained as a minimal, highly introspectable codebase."
    },
    zh: {
        github: "GitHub",
        eyebrow: "PYTHON AGENT RUNTIME",
        hero_title: " Claude Code Python ",
        subtitle: "基于 Python 构建的轻量级智能体 Runtime，深度还原多步推理循环、原生工具调用以及高并发的 Sub-agent 委派机制，专注于底层稳定性而非庞杂的 UI 复刻。",
        arch: "核心架构",
        demo: "演示流程",
        stat_runtime: "多步推理环节",
        stat_task: "并行任务拆解",
        stat_tools: "工作区安全控制",

        features_tag: "核心能力",
        features_title: "底层架构主要由三项能力构成。",
        feat_loop_title: "Runtime 执行循环",
        feat_loop_desc: "主智能体在模型推理、工具调度与结果反馈之间，维持着高效且可预测的闭环运行逻辑。",
        feat_task_title: "Task Tool 与子智能体",
        feat_task_desc: "通过内置的 `task` 工具实时生成下级智能体，支持复杂任务的并行拆解，并将输出结果无缝汇总至主流程。",
        feat_tools_title: "原生的内置工具箱",
        feat_tools_desc: "系统全面内置 Shell 终端、文件读写及全局搜索等基础能力，并提供统一的接入注册规范。",

        arch_tag: "系统架构",
        arch_title: "系统处理请求的四个标准化阶段。",
        flow_1_title: "上下文初始化加载",
        flow_1_desc: "主智能体优先装载大语言模型系统提示词、用户指令集、可用工具群以及工作区绝对路径信息。",
        flow_2_title: "模型运行决策",
        flow_2_desc: "模型解析当前的对话上下文，决定是直接输出结果内容，还是并行唤起 `read_file`、`task` 等工具调用。",
        flow_3_title: "工具本地调度与执行",
        flow_3_desc: "系统拦截流并执行并行工具调用，将标准输出流或异常报错结果实施捕获并回传给大语言模型。",
        flow_4_title: "子智能体结果收敛",
        flow_4_desc: "触发委派时，子智能体将在安全隔离的 Runtime 环境内执行逻辑思考，受严格的迭代深度控制，防止发生死循环。",
        module_runtime: "负责主执行队列控制、工具链路分发处理以及全局历史消息的状态递推。",
        module_model: "抽象出兼容原生 OpenAI 标准的 Chat Completion 后端协议网关，实现不同大模型的无缝接入。",
        module_task: "提供任务分发模型、子进程并行隔离执行调度机制以及防止无限递归的安全限制边界。",

        demo_tag: "实战演示",
        demo_title: "基于完整的系统 Prompt 与流程演示去理解核心设计。",
        demo_prompt_label: "Prompt 初始指令",
        demo_prompt_text: "请基于当前工作区中的文件，准备一份一页纸的周末集市运营简报。\n\n这是一个 subagent 能力演示。你必须先调用 `task` 工具，然后才能自己做任何直接文件分析。\n\n请并行启动且仅启动两个子代理：\n1. 检查 `inventory.txt`，返回库存摘要...\n2. 检查 `staffing.txt`，返回排班摘要...\n\n完成后，将结果合并为一个最终简报。",
        command_label: "执行命令",
        demo_note1_title: "系统指令强制约束",
        demo_note1_desc: "Prompt 中明确规定主智能体必须通过调用 `task` 工具委派任务，禁止其直接越过工具层调取和分析文件。",
        demo_note2_title: "任务动态拆解与并行",
        demo_note2_desc: "主智能体触发两个逻辑隔离的节点并发执行：一组负责清点并校验库存状态，另一组分析人员调度与排班。",
        demo_note3_title: "信息降维与融合总结",
        demo_note3_desc: "主控节点高效提取各子系统输出的报告进行降维融合，生成一份包含明确 Action Items（行动项）的业务简报。",

        links_tag: "关键源代码",
        links_title: "深入研读系统底层的核心模块源码。",
        link_1: "Agent Loop 构建逻辑",
        link_2: "Sub-agent 任务调度器",
        link_3: "Demo 流程脚本主入口",
        link_4_path: "代码仓库",
        link_4: "赴 GitHub 审阅全局工程源码",

        footer: "本项目纯粹专注于底层 Runtime 构建，不追求应用层的重度 UI 复刻，代码高度去耦且易于直接审计。"
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
