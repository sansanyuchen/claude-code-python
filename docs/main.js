const translations = {
    en: {
        github: "GitHub",
        eyebrow: "PYTHON AGENT RUNTIME",
        hero_title: "A compact Claude Code style runtime focused on tools, loops, and sub-agents.",
        subtitle: "A lightweight Claude Code style agent runtime built in Python, designed around multi-step loops, unified tool execution, and parallel sub-agent delegation.",
        arch: "Architecture",
        demo: "Demo flow",
        stat_runtime: "multi-step agent loop",
        stat_task: "sub-agent delegation",
        stat_tools: "workspace-safe tools",

        features_tag: "Core capabilities",
        features_title: "Three core capabilities define this project.",
        feat_loop_title: "Runtime loop",
        feat_loop_desc: "The root agent operates within a streamlined loop of model generation, tool execution, and exact result integration.",
        feat_task_title: "Task Tool & Sub-agents",
        feat_task_desc: "The `task` tool spawns independent sub-agents to execute tasks in parallel, synthesizing their results back into the main workflow.",
        feat_tools_title: "Built-in tool ecosystem",
        feat_tools_desc: "Native shell, filesystem, search, and task management tools are exposed via a unified, extensible registry.",

        arch_tag: "Architecture",
        arch_title: "Requests are processed through four distinct workflow stages.",
        flow_1_title: "Prompt enters runtime",
        flow_1_desc: "The root agent initializes with a system prompt, user objective, registered tools, and workspace context.",
        flow_2_title: "Model explores possibilities",
        flow_2_desc: "The model evaluates the context to either answer directly or emit parallel tool calls like `read_file`, `bash`, or `task`.",
        flow_3_title: "Tools execute",
        flow_3_desc: "Tool calls are safely dispatched, and their standard outputs are appended iteratively back into the conversation trace.",
        flow_4_title: "Sub-agents yield results",
        flow_4_desc: "When `task` is invoked, isolated sub-agents execute within the same runtime using bounded depth and restricted tool scopes.",
        module_runtime: "Manages the execution loop, tool orchestration, and historical message state.",
        module_model: "Wraps an OpenAI-compatible chat completion backend for flexible model integration.",
        module_task: "Handles task delegation, timeout contingencies, parallel execution, and stringent recursion limits.",

        demo_tag: "Live demo",
        demo_title: "A live demonstration of the architecture in action.",
        command_label: "Run command",
        demo_note1_title: "Prompt constraints",
        demo_note1_desc: "The primary agent is instructed to delegate work via the `task` tool rather than analyzing raw files directly.",
        demo_note2_title: "Task isolation",
        demo_note2_desc: "Isolated sub-agents concurrently inspect disparate data sources—such as inventory logs and staffing records.",
        demo_note3_title: "Final synthesis",
        demo_note3_desc: "The root agent synthesizes the sub-agents' findings into a cohesive operational brief packed with actionable insights.",

        links_tag: "Key files",
        links_title: "Open the code paths that matter most.",
        link_1: "Core agent loop",
        link_2: "Sub-agent delegation",
        link_3: "Live demo entry",
        link_4_path: "repository",
        link_4: "Open full project on GitHub",

        footer: "Focused on core runtime execution rather than UI replication. Maintained as a minimal, highly introspectable codebase."
    },
    zh: {
        github: "GitHub",
        eyebrow: "PYTHON AGENT RUNTIME",
        hero_title: "聚焦工具调用、执行循环与子智能体委派的 Claude 代码风运行时。",
        subtitle: "基于 Python 构建的轻量级智能体 Runtime，深度还原多步推理循环、原生工具编排以及高并发的 Sub-agent 委派机制。",
        arch: "核心架构",
        demo: "演示流程",
        stat_runtime: "多步推理环节",
        stat_task: "任务动态拆解",
        stat_tools: "沙盒安全操作",

        features_tag: "核心能力",
        features_title: "三大核心能力构筑底层骨架。",
        feat_loop_title: "极简 Runtime 循环",
        feat_loop_desc: "主智能体在模型推理、工具调度与结果回填之间，维持着高效紧凑的执行闭环。",
        feat_task_title: "Task Tool 与子智能体",
        feat_task_desc: "利用 `task` 工具即时生成下级智能体，支持复杂并行任务池，并无缝汇总结果至主流程。",
        feat_tools_title: "开箱即用的工具生态",
        feat_tools_desc: "全面内置 Shell、文件读写、全局搜索等基础能力，通过统一的注册表规范对外暴露接口。",

        arch_tag: "底层架构",
        arch_title: "从输入到输出的四个标准化生命周期。",
        flow_1_title: "上下文初始化加载",
        flow_1_desc: "主智能体装载大语言模型系统提示词、用户指令集、可用工具群以及工作区绝对路径。",
        flow_2_title: "模型意图预测与决策",
        flow_2_desc: "解析当前对话追踪链，决定是输出文字终端分析结果还是发起 `read_file`、`task` 等工具调用。",
        flow_3_title: "工具链调度与执行",
        flow_3_desc: "系统级拦截并并行执行工具列队，将底层标准流或异常报错结果实时打包回传给对话模型。",
        flow_4_title: "子智能体结果收敛",
        flow_4_desc: "触发委派时，子智能体在安全隔离的同态 Runtime 内进行逻辑思考，并在深度限制内返回聚焦报告。",
        module_runtime: "绝对掌控主控执行队列、工具链路并发捕获以及全局历史状态递推。",
        module_model: "抽象兼容原生 OpenAI 标准的 Chat Completion 后端协议网关，实现大模型的无缝热插拔。",
        module_task: "提供任务分发模型调度、隔离子进程防死锁熔断以及防止无限死循环的安全限制边界。",

        demo_tag: "Live Demo",
        demo_title: "通过直观的交互演示，快速沉浸于核心工作流体验。",
        command_label: "执行命令",
        demo_note1_title: "系统 Prompt 强制约束",
        demo_note1_desc: "强约束主节点必须通过 `task` 中枢委派职能，禁止其越俎代庖直接读取核心源文件验证权限。",
        demo_note2_title: "智能动态任务拓扑分布",
        demo_note2_desc: "生成两套彼此隔离验证环境的子智能体并发跑通闭环：一组负责库存清点校验，一组对接调度排班。",
        demo_note3_title: "信息降维与融合总结",
        demo_note3_desc: "主控智能体高效捕获各个分形代理节点输出报告，智能降维融合出带有立刻闭环动作的最终业务简报。",

        links_tag: "关键源码",
        links_title: "深入研读系统最底层的流转逻辑。",
        link_1: "核心 Agent Loop 构建",
        link_2: "Sub-agent 任务委派器",
        link_3: "Live Demo 脚本主入口",
        link_4_path: "代码仓库",
        link_4: "在 GitHub 上审阅整体架构代码",

        footer: "本项目旨在探索代码智能体的底层 Runtime 时序流转模型，摒弃复杂的前端 UI 复刻，以极简与高可读性的标准沉淀为标杆源码。"
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
