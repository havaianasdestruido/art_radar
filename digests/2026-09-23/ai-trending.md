# AI 开源趋势日报 2026-09-23

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-09-22 22:55 UTC

---

# AI 开源趋势日报 · 2026-09-23

---

## 一、今日速览

今日热榜被 **Agent 基础设施** 强势占领：Google 开源通用智能体编排运行时 [google/ax](https://github.com/google/ax) 以 +2,324 stars 一骑绝尘，成为当日最大黑马。Agent 底层抽象（substrate、treg、univer）集中登榜，标志着社区焦点从“做 Agent 应用”转向“造 Agent 底座”。工具层出现明显的**成本/上下文优化**浪潮（headroom、claude-mem、caveman、ECC），Agent Harness 工程化成为新的竞争赛道。此外，多个头部项目呈现惊人的短期爆发力（ECC 26.5 万、hermes-agent 24.8 万 stars），AI 开源马太效应加剧。

---

## 二、各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、CLI）

| 项目 | Stars | 说明 |
|---|---|---|
| [google/ax](https://github.com/google/ax) | +2,324 today | Google 官方开源的通用智能体编排运行时，今日爆发式登榜，是 Agent 基础设施层的重磅新入场者 |
| [agent-substrate/substrate](https://github.com/agent-substrate/substrate) | +301 today | Agent 核心系统底座，Go 实现，代表“Agent 操作系统”方向的新探索 |
| [davila7/claude-code-templates](https://github.com/davila7/claude-code-templates) | +113 today | Claude Code 配置与监控 CLI，体现 Claude Code 生态工具链的持续繁荣 |
| [ollama/ollama](https://github.com/ollama/ollama) | ⭐181,491 | 本地推理事实标准，支持 Kimi、GLM、DeepSeek、Qwen 等国产模型 |
| [Hmbown/Codewhale](https://github.com/Hmbown/Codewhale) | ⭐41,031 | Rust 构建的开源终端编程 Agent，对标闭源 CLI 工具 |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | ⭐8,699 | Rust 生态的模块化 LLM 应用框架 |
| [Mirrowel/LLM-API-Key-Proxy](https://github.com/Mirrowel/LLM-API-Key-Proxy) | ⭐555 | 统一 LLM 网关，多厂商翻译 + 智能负载均衡 |

### 🤖 AI 智能体/工作流

| 项目 | Stars | 说明 |
|---|---|---|
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | ⭐248,100 | "与你共同成长的 Agent"，stars 增速异常迅猛，为个人 Agent 赛道头部项目 |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | ⭐265,396 | Agent Harness 性能优化系统（技能/本能/记忆/安全），Claude Code 生态增强方案的代表 |
| [browser-use/video-use](https://github.com/browser-use/video-use) | +155 today | 用编程 Agent 剪辑视频，browser-use 团队将 Agent 能力延伸至多媒体生产场景 |
| [superdesigndev/treg](https://github.com/superdesigndev/treg) | +197 today | 自称“Agent 工具的 OpenRouter”，尝试统一工具调用路由层，概念新颖 |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | ⭐187,501 | 自主 Agent 鼻祖级项目，仍是该赛道 stars 标杆 |
| [HKUDS/nanobot](https://github.com/HKUDS/nanobot) | ⭐48,492 | 港大团队的超轻量自托管个人 Agent 框架 |
| [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent) | ⭐47,086 | chatgpt-on-wechat 作者新作，自我进化的超级助手与 Agent Harness |

### 📦 AI 应用

| 项目 | Stars | 说明 |
|---|---|---|
| [dream-num/univer](https://github.com/dream-num/univer) | +202 today | 定位“AI Agent 的 Office 运行时”，将表格/文档/幻灯/PDF 打包为 Agent 可操作的单一运行时，是 Agent 落地办公场景的关键拼图 |
| [anthropics/financial-services](https://github.com/anthropics/financial-services) | +436 today | Anthropic 官方金融服务行业解决方案库，反映大厂加码垂直行业落地 |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | ⭐52,081 | 300+ 助手的 AI 生产力工作站，统一接入主流大模型 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | ⭐55,977 | 文档/主题 → 原生 PPT 生成，含图表、动画与语音旁白 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | ⭐125,148 | AI 一键生成短视频，内容生产自动化代表 |
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | ⭐108,126 | 多智能体金融交易框架 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | ⭐65,505 | LLM 驱动的多市场股票分析系统，零成本定时运行 |

### 🧠 大模型/训练

| 项目 | Stars | 说明 |
|---|---|---|
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | ⭐105,403 | 从零用 PyTorch 实现 ChatGPT 级 LLM，AI 教育第一标杆 |
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | ⭐62,186 | 2 小时从零训练 64M 参数 LLM，中文社区模型教学代表作 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | ⭐7,468 | 支持百大模型、100+ 数据集的评测平台 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | ⭐4,677 | Apple Silicon 上构建 tiny vLLM 的推理系统教程 |
| [thinkwee/AwesomeOPD](https://github.com/thinkwee/AwesomeOPD) | ⭐868 | On-Policy Distillation 精选列表，蒸馏方向新资源 |

### 🔍 RAG/知识库

| 项目 | Stars | 说明 |
|---|---|---|
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | ⭐120,550 | 代码库+文档 → 可查询知识图谱，本地 AST 解析、零向量库，"vectorless RAG" 崛起信号 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | ⭐94,480 | 跨会话持久记忆层，AI 压缩会话并注入未来上下文，兼容全部主流编码 Agent |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | ⭐91,173 | RAG + Agent 融合引擎，国产 RAG 头部方案 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | ⭐65,841 | Agent 记忆基础设施，生产级持久上下文层 |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | ⭐73,532 | LLM 输入压缩器：JSON 省 60-95% token，答案不变，成本优化刚需 |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | ⭐35,807 | 无向量化、基于推理的文档索引 RAG，挑战传统向量检索范式 |
| [topoteretes/cognee](https://github.com/topoteretes/cognee) | ⭐30,918 | 自托管知识图谱 Agent 记忆平台 |
| [StarTrail-org/LEANN](https://github.com/StarTrail-org/LEANN) | ⭐12,955 | MLSys2026 最佳论文，存储省 97% 的端侧私有 RAG |

---

## 三、趋势信号分析

1. **Agent 基础设施成为爆发点**：今日热榜 8 席中 7 席与 AI 相关，其中 google/ax（+2,324）、substrate、treg 集中出现，且都在解决“Agent 底座”问题（编排运行时、核心系统、工具路由）。这与去年 Agent 框架百花齐放后的收敛趋势一致——社区在寻找标准化抽象层，Google 官方入场将加速洗牌。

2. **"Agent Harness 工程”成为新兴方向**：ECC、claude-mem、caveman、headroom 等项目共同指向一个新赛道：不造新 Agent，而是优化现有编码 Agent 的技能、记忆、安全和 token 成本。caveman 用“原始人语气”砍掉 65% token 是典型样本。

3. **Vectorless / 推理式 RAG 挑战向量库**：graphify（12 万 stars）、PageIndex、LEANN 均主打“无向量、轻量、本地”路线，叠加知识图谱记忆（cognee），传统向量数据库叙事正被分流。

4. **应用层向“Agent 可操作环境”演进**：univer 把 Office 套件做成 Agent 运行时、video-use 让 Agent 剪视频，配合 Anthropic 金融行业库，显示落地重心从“聊天”转向“Agent 操作真实工具与文档”。

---

## 四、社区关注热点

- **[google/ax](https://github.com/google/ax)** — 今日最强新秀，Google 背书的 Agent 编排运行时，可能成为 Agent 领域的 "Kubernetes 时刻"，值得第一时间跟踪其 API 设计。
- **[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)** — 短时间冲到 12 万 stars，"代码库→知识图谱 + 无向量检索"路线若被验证，将冲击整个 RAG 技术栈。
- **[headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom)** — LLM 输入压缩在 token 成本高企背景下是刚需，库/代理/MCP 三形态接入，工程价值直接。
- **[dream-num/univer](https://github.com/dream-num/univer)** — “Agent 的 Office 运行时”定位独特，是 Agent 进入企业办公场景的关键基础设施。
- **方向提醒：Agent Harness / Skill 工程**（ECC、claude-code-templates、claude-mem）— 围绕 Claude Code 等编码 Agent 的外围增强生态正在快速货币化与开源化，是当前个人开发者切入成本最低、增速最快的赛道。

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*