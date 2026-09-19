# AI 开源趋势日报 2026-09-19

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-09-19 01:58 UTC

---

# AI 开源趋势日报 · 2026-09-19

---

## 一、今日速览

1. **Agent Skills 生态全面爆发**：今日 Trending 前 17 中有 7 个与 AI Agent 技能、Agent 运行环境（harness）直接相关，Cloudflare 安全审计 Skill 单日狂揽 3000+ stars，Agent Skills 已成为开发者生态的新“插件标准”。
2. **中国大厂密集出手**：阿里、腾讯系项目（open-code-review、BrowserSkill、Octop、zvec）集中上榜，大厂正以开源抢滩 Agent 工具链。
3. **Agent 记忆与上下文压缩成为新战场**：supermemory、claude-mem、mem0、headroom 等项目从不同角度解决同一问题——Agent 的长期记忆与 token 成本。
4. **无向量检索路线抬头**：Graphify（代码库知识图谱）与 PageIndex（推理式 RAG）代表“去向量库”的 RAG 新范式，累计 stars 增长迅猛。

---

## 二、Trending 榜单 AI 相关性过滤

**排除项（非 AI 项目）**：
- `rustfs/rustfs`（对象存储，S3 兼容，非 AI）
- `supabase/supabase`（Postgres 开发平台，通用后端，仅“可构建 AI 应用”）
- `coder/coder`（开发者环境管理，仅“为 agent 提供环境”，边缘弱相关，排除）
- `asciimoo/hister`（自建搜索引擎，无 AI 特征）
- `ankitects/anki`（间隔重复记忆卡，非 AI）
- `gitdiagram`（仓库可视化，未明确 AI 驱动，排除）

**保留项**：其余 11 个均与 AI Agent/LLM 明确相关。

---

## 三、各维度热门项目

### 🔧 AI 基础工具（框架、SDK、CLI、开发工具）

| 项目 | Stars | 说明 |
|---|---|---|
| [anthropics/claude-code](https://github.com/anthropics/claude-code) | +444 today | Anthropic 官方终端 Agent 编码工具，整个 Skills 生态的事实载体 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | ⭐152.5k | 本地/多后端 AI 界面标杆，兼容 Ollama、OpenAI API |
| [ollama/ollama](https://github.com/ollama/ollama) | ⭐181.2k | 本地推理引擎事实标准，已覆盖 Kimi、GLM、MiniMax、gpt-oss、Qwen 等国产/开源模型 |
| [Fission-AI/OpenSpec](https://github.com/Fission-AI/OpenSpec) | +296 today | 面向 AI 编码助手的规格驱动开发（SDD）工具，“先写 Spec 再生成”流程标准化的代表 |
| [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) | ⭐106.6k | 病毒式传播的 token 压缩 Skill/代理，以“原始人语气”砍掉 65% token，成本优化黑色幽默 |
| [Mirrowel/LLM-API-Key-Proxy](https://github.com/Mirrowel/LLM-API-Key-Proxy) | ⭐554 | 统一 LLM 网关，多厂商翻译 + 智能负载均衡，小而美的网关方案 |

### 🤖 AI 智能体/工作流

| 项目 | Stars | 说明 |
|---|---|---|
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | ⭐262k，+958 today | “Agent harness 性能优化系统”——Skills、本能、记忆、安全一体化，总榜第一且今日仍在爆发 |
| [cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill) | +3006 today | 今日单日 stars 冠军，Cloudflare 出品的编码 Agent 多阶段安全审计 Skill，机器可读结果 |
| [Tencent/BrowserSkill](https://github.com/Tencent/BrowserSkill) | +1306 today | 让 Agent 复用真实登录态浏览器而不打断用户工作，浏览器自动化 Skill 化的代表 |
| [alibaba/open-code-review](https://github.com/alibaba/open-code-review) | +2704 today | 阿里规模验证的混合架构代码审查：确定性规则管线 + LLM Agent，行级精准评论 |
| [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | +675 today | Google Chrome 团队 Addy Osmani 出品的“生产级工程 Skill 合集” |
| [TencentCloud/Octop](https://github.com/TencentCloud/Octop) | +569 today | 自托管多用户多 Agent AI 助手，开箱即用的私有化方案 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | ⭐115.2k | 浏览器 Agent 头部框架，与 BrowserSkill 形成互补竞合 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | ⭐246.9k | “随你成长的 Agent”，个人 Agent 长期演进方向的头部项目 |

### 📦 AI 应用（垂直场景）

| 项目 | Stars | 说明 |
|---|---|---|
| [tradesdontlie/tradingview-mcp](https://github.com/tradesdontlie/tradingview-mcp) | +79 today | Claude Code 连接 TradingView 桌面端，个人量化工作流 MCP 化 |
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | ⭐107.5k | 多 Agent LLM 金融交易框架，学术+实战双热门 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | ⭐65.3k | LLM 多市场股票分析 + 自动推送，零成本定时运行的散户级方案 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | ⭐55.2k | 文档/主题转原生 PowerPoint，国内办公场景 Agent 应用标杆 |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | ⭐72.1k | 本地运行的 AI 求职 Agent：扫描岗位、评分、定制简历，本地化隐私卖点 |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | ⭐52k | 300+ 助手的 AI 生产力工作室，统一接入主流大模型 |

### 🧠 大模型/训练

| 项目 | Stars | 说明 |
|---|---|---|
| [huggingface/transformers](https://github.com/huggingface/transformers) | ⭐166.3k | 模型定义框架基石，多模态训练+推理一体 |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | ⭐105.2k | PyTorch 从零实现 ChatGPT 级 LLM，教育类第一 |
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | ⭐61.6k | 2 小时从零训练 64M 参数 LLM，国产教学爆款 |
| [bojieli/ai-agent-book](https://github.com/bojieli/ai-agent-book) | ⭐48.5k | 李博杰《深入理解 AI Agent》开源全书+代码 |
| [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) | ⭐61.8k | YOLO 系列已迭代至 YOLO27，CV 检测持续演进 |
| [thinkwee/AgentsMeetRL](https://github.com/thinkwee/AgentsMeetRL) | ⭐1.8k | Agentic RL Awesome List，学术前沿方向聚合 |

### 🔍 RAG/知识库

| 项目 | Stars | 说明 |
|---|---|---|
| [supermemoryai/supermemory](https://github.com/supermemoryai/supermemory) | +140 today | 可全本地运行的 AI 记忆引擎 + Memory API，今日上榜 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | ⭐119.4k | 代码库+文档转知识图谱，AST 确定性解析、**无向量库**，去向量 RAG 旗手 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | ⭐94.2k | 跨会话持久上下文，AI 压缩+注入，覆盖全部主流编码 Agent |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | ⭐65.6k | Agent 记忆层基础设施，生产级标准件 |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | ⭐91k | RAG 引擎 + Agent 融合的国产头部方案 |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | ⭐35.7k | Vectorless、基于推理的文档索引，与 Graphify 同属“无向量”路线 |
| [alibaba/zvec](https://github.com/alibaba/zvec) | ⭐16k | 轻量进程内超快向量库，嵌入式检索新选择 |
| [topoteretes/cognee](https://github.com/topoteretes/cognee) | ⭐30.8k | 知识图谱驱动的 Agent 长期记忆平台 |

---

## 四、趋势信号分析

**① Agent Skills 成为新“App Store”。** 今日热榜 11 个 AI 项目中有 6 个是 Skill 或 Skill 合集（安全审计、浏览器、代码审查、求职、工程 Skill、ECC harness），且均来自 Cloudflare、阿里、腾讯、Addy Osmani 等有背书主体——Skill 正从“Prompt 技巧”升级为可审计、机器可读的工程化交付物，围绕 Claude Code 等编码 Agent 的生态位争夺已白热化。

**② Agent 基础设施分三条赛道收敛**：记忆（supermemory / claude-mem / mem0）、上下文压缩（headroom / caveman）、检索（Graphify / PageIndex 的去向量路线 vs 传统向量库）。其中“确定性 AST + 知识图谱、无向量库”是明确的新兴技术栈信号。

**③ 大厂卡位**：阿里（open-code-review、zvec）+ 腾讯（BrowserSkill、Octop）同日上榜 4 项，指向企业级 Agent 落地（代码审查、安全审计）是中国大厂开源的主攻方向，与 Ollama 列表中国产模型（Kimi/GLM/MiniMax/DeepSeek/Qwen）的扩张相互印证——国产模型出海正在拉动国产 Agent 工具链出海。

**④ 金融 + 编码是 Agent 最热两个垂直场**：量化（TradingAgents、daily_stock_analysis、Vibe-Trading、tradingview-mcp）与开发工具几乎各占半壁江山。

---

## 五、社区关注热点

- **[cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill)**（+3006/日）：单日 stars 之冠。"Skill + 可验证机器可读结果"定义了企业级 Agent Skill 的形态，无论做安全还是做 Agent 生态都值得精读。
- **[affaan-m/ECC](https://github.com/affaan-m/ECC)**（⭐262k）：总榜第一的 Agent harness 优化系统，"Skills/本能/记忆/安全"四件套是当前 Agent 工程化的最完整拼图。
- **[alibaba/open-code-review](https://github.com/alibaba/open-code-review)**（+2704/日）：“确定性规则 + LLM Agent”混合架构在阿里规模验证，是传统静态分析与 LLM 融合的最佳参考实现，直接可上生产。
- **[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)**（⭐119k）：去向量库、AST 确定性知识图谱路线增长最快，代表 RAG 范式的可能转折点。
- **[Tencent/BrowserSkill](https://github.com/Tencent/BrowserSkill)**（+1306/日）：解决“Agent 使用真实登录态浏览器”这一浏览器自动化最大痛点，与 browser-use 形成路线对照，值得并行跟踪。

---
*数据来源：GitHub Trending（2026-09-19）+ GitHub Search API 主题搜索；stars 总量为当日快照，今日新增仅 Trending 榜单项目可信。*

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*