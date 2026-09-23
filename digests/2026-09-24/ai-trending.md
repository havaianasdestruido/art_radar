# AI 开源趋势日报 2026-09-24

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-09-23 22:56 UTC

---

# 📰 AI 开源趋势日报 · 2026-09-24

---

## 一、今日速览

今日 GitHub Trending 被 **Agent 基础设施与“Agent Harness”生态** 强势占据：Google 开源 agentic 编排运行时 [google/ax](https://github.com/google/ax) 以 +1542 stars 登顶，加上 Anthropic 的金融行业方案、AWS harness-sdk、BuilderIO agent-native，大厂正密集卡位 Agent 运行时层。同时，“让一切软件 Agent-Native”（CLI-Anything、video-use、univer）与 **Agent 上下文/记忆/Token 压缩**（codebase-memory-mcp、claude-mem、headroom）成为两条清晰的主线。中文开发者社区活跃度显著，多款国产 Agent 应用与知识库项目上榜。

---

## 二、各维度热门项目

### 🔧 AI 基础工具（框架 / SDK / 开发工具 / CLI）

| 项目 | Stars | 说明 |
|---|---|---|
| [google/ax](https://github.com/google/ax) | +1542 today | Google 官方开源 agentic 编排运行时，今日榜首，标志大厂正式入场 Agent 运行时层 |
| [dream-num/univer](https://github.com/dream-num/univer) | +1140 today | “AI Agent 的 Office Harness”，表格/文档/幻灯/PDF 统一运行时，为 Agent 操作办公文档提供底座 |
| [davila7/claude-code-templates](https://github.com/davila7/claude-code-templates) | +393 today | Claude Code 配置与监控 CLI，反映 AI 编码工具周边运维生态的爆发 |
| [DeusData/codebase-memory-mcp](https://github.com/DeusData/codebase-memory-mcp) | +266 today | 高性能代码智能 MCP 服务器，代码库索引为知识图谱，主打省 Token，直击 Agent 成本痛点 |
| [ollama/ollama](https://github.com/ollama/ollama) | ⭐181.5k | 本地模型运行事实标准，持续稳定活跃 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | ⭐166.6k | 模型定义框架，生态基石 |
| [Hmbown/Codewhale](https://github.com/Hmbown/Codewhale) | ⭐41.0k | Rust 终端编码 Agent，社区驱动迭代活跃 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | ⭐152.9k | 最流行的自托管 AI 界面，支持 Ollama/OpenAI 等 |

### 🤖 AI 智能体 / 工作流

| 项目 | Stars | 说明 |
|---|---|---|
| [agent-substrate/substrate](https://github.com/agent-substrate/substrate) | +560 today | Agent 核心系统，今日新上榜，“Agent 底座”赛道的又一竞争者 |
| [strands-agents/harness-sdk](https://github.com/strands-agents/harness-sdk) | +96 today | AWS 系开源 SDK，端到端构建生产级 Agent Harness，任意模型任意云 |
| [superdesigndev/treg](https://github.com/superdesigndev/treg) | +502 today | "Agent 工具的 OpenRouter"，工具调用路由层的新叙事，今日热度陡增 |
| [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) | +41 today | 港大 DKU 实验室新作：“让所有软件 Agent-Native”，与 heat 度极高的 Agent-Native 浪潮呼应 |
| [obra/superpowers](https://github.com/obra/superpowers) | +485 today | Agent 技能框架 + 软件开发方法论，"skills" 已成 Agent 能力组织的关键词 |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | ⭐266.2k | Agent Harness 性能优化系统：技能、本能、记忆、安全一体化，总量惊人 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | ⭐248.4k | “与你共同成长的 Agent”，开源个人 Agent 头部项目 |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | ⭐42.2k | 构建弹性 Agent 图工作流的主流框架 |

### 📦 AI 应用（垂直场景产品）

| 项目 | Stars | 说明 |
|---|---|---|
| [anthropics/financial-services](https://github.com/anthropics/financial-services) | +665 today | Anthropic 官方金融服务行业方案，大模型厂商“行业落地模板”打法升级 |
| [browser-use/video-use](https://github.com/browser-use/video-use) | +745 today | browser-use 团队新作：用编码 Agent 剪辑视频，Agent 操作对象从网页扩展到视频 |
| [TNT-Likely/PanWatch](https://github.com/TNT-Likely/PanWatch) | +142 today | 中文自托管 AI 盯盘助手，集成 TradingAgents 多 Agent 决策，A股/港股/美股监控 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | ⭐65.5k | LLM 驱动多市场股票分析，零成本定时运行，国内爆火 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | ⭐56.1k | 文档/主题一键生成原生 PPT，办公场景 Agent 应用标杆 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | ⭐125.4k | AI 短视频自动生成流水线，内容生产经典项目 |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | ⭐52.1k | AI 生产力工作站，300+ 助手统一接入主流模型 |

### 🧠 大模型 / 训练

| 项目 | Stars | 说明 |
|---|---|---|
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | ⭐62.3k | 2 小时从零训练 64M 参数 LLM，中文社区教学训练标杆 |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | ⭐105.5k | PyTorch 从零实现 ChatGPT 式 LLM，全球经典教材项目 |
| [rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch) | ⭐55.8k | AI 工程全栈入门，“学-建-交付”体系化路径 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | ⭐7.5k | 覆盖 100+ 数据集的 LLM 评测平台，模型迭代风向标 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | ⭐4.7k | Apple Silicon 上手写 mini vLLM + Qwen，推理系统学习利器 |

### 🔍 RAG / 知识库（向量库 / 检索增强 / 记忆）

| 项目 | Stars | 说明 |
|---|---|---|
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | ⭐120.9k | 代码库一键转可查询知识图谱（Claude Code/Cursor 技能），“无向量库 RAG”路线代表 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | ⭐94.6k | 跨会话 Agent 持久记忆，AI 压缩 + 上下文注入，兼容主流 CLI Agent |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | ⭐91.2k | RAG + Agent 融合引擎，国内 RAG 头部方案 |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | ⭐73.6k | 工具输出/RAG 分块送入 LLM 前压缩，省 20%~95% Token，直击成本痛点 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | ⭐65.9k | Agent 记忆层基础设施的事实标准 |
| [topoteretes/cognee](https://github.com/topoteretes/cognee) | ⭐30.9k | 自托管知识图谱式 Agent 长期记忆 |
| [StarTrail-org/LEANN](https://github.com/StarTrail-org/LEANN) | ⭐13.0k | MLSys2026 最佳论文，省 97% 存储的个人设备 RAG |

*（mvt-project/mvt 为移动取证安全工具、OpenStock 为普通行情应用、spirula-studio 为 3D 高斯泼溅训练工具、Julia/netdata 等为通用项目，与 AI 主线弱相关，已略去或降权处理。）*

---

## 三、趋势信号分析

1. **Agent Harness 成为大厂主战场**：Google ax、AWS strands harness-sdk、BuilderIO agent-native 同日上榜，加上 ECC（26.6 万星）的超高存量，说明竞争焦点已从“Agent 框架”下沉到“Agent 运行时/harness”这一基础设施层——即如何让 Agent 在生产环境可控、可观测、可复用技能。

2. **“Agent-Native 化一切”是新叙事**：CLI-Anything（让所有软件具备 Agent 接口）、univer（Agent 的 Office 运行时）、video-use（Agent 剪视频）、treg（工具调用的统一路由）共同指向：存量软件与工具正被系统性改造为 Agent 可操作的对象，"OpenRouter for tools"式中间层开始出现。

3. **Token 成本与上下文管理是刚需**：headroom（输出压缩）、claude-mem（记忆压缩）、codebase-memory-mcp（99% 省 Token）、caveman（65% 省 Token）集体走红，说明 Agent 规模化落地后，上下文经济学成为第一优先级。

4. **厂商行业化打法与中文社区崛起**：Anthropic 直接开源金融行业方案（配合 TradingAgents、PanWatch、daily_stock_analysis 等金融 AI 应用集群），金融量化是当前 Agent 落地最热的垂直场景；同时中文项目在榜单占比明显上升。

---

## 四、社区关注热点

- **[google/ax](https://github.com/google/ax)** — 今日榜首。Google 正式开源 agentic 编排运行时，与 AWS/Anthropic 同日对垒，是观察 Agent 基础设施标准之争的最佳窗口。
- **[anthropics/financial-services](https://github.com/anthropics/financial-services)** — 模型厂商从“给 API”转向“给行业落地方案模板”，对做金融 AI 应用的团队极具参考价值。
- **[treg](https://github.com/superdesigndev/treg)** — “Agent 工具的 OpenRouter”，若工具路由层成立，将改变 MCP/Function Calling 生态格局，今日 +502 增速罕见。
- **[codebase-memory-mcp](https://github.com/DeusData/codebase-memory-mcp) + [headroom](https://github.com/headroomlabs-ai/headroom)** — 代码知识图谱与 Token 压缩组合，是当前降本增效方向最值得跟踪的两个项目。
- **[CLI-Anything](https://github.com/HKUDS/CLI-Anything)** — “让所有软件 Agent-Native”的理念型项目，港大团队背书，可能定义下一轮软件改造浪潮的话语框架。

---
*数据来源：GitHub Trending（2026-09-24）及 Topic Search API；stars 总量为存量数据，今日新增以 Trending 为准。*

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*