# AI 开源趋势日报 2026-09-21

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-09-20 22:25 UTC

---

# 📰 AI 开源趋势日报 · 2026-09-21

---

## 一、今日速览

1. **"Agent Harness / Agent Skills" 生态成为今日绝对主角**：[affaan-m/ECC](https://github.com/affaan-m/ECC) 以 +837 今日新增登顶 AI 热榜，[cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill) 以 +2,375 爆发式增长，coding agent 的"外挂能力层"正在标准化。
2. **Agent 记忆与上下文管理持续升温**：claude-mem（94k stars）、cognee、mem0 等记忆基础设施项目在 RAG/知识库赛道占据主导。
3. **Computer-Use 2.0 落地加速**：[trycua/cua](https://github.com/trycua/cua)（+1,012 today）提供跨 OS 的计算机操作驱动与评测基准，标志 agent 操作真实系统进入工程化阶段。
4. **Token 成本优化成为新战场**：caveman（107k）、headroom（73k）等项目靠"压缩 token"获得惊人增长，反映 coding agent 的规模化成本焦虑。
5. **垂直行业 AI 方案增多**：Anthropic 官方推出 financial-services 行业模板，配合金融量化/交易类 agent 项目密集上榜。

---

## 二、各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具）

| 项目 | Stars | 说明 |
|---|---|---|
| [ollama/ollama](https://github.com/ollama/ollama) | 181,327 | 本地大模型运行事实标准，支持 Kimi、GLM、DeepSeek、gpt-oss、Qwen 等主流开源模型 |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | 263,668（+837 today）| Agent harness 性能优化系统，为 Claude Code/Codex/Cursor 提供 skills、记忆与安全能力，今日热榜第一 |
| [cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill) | +2,375 today | Cloudflare 官方出品的多阶段安全审计 coding-agent skill，机器可读、可独立验证，今日增长最猛 |
| [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | +729 today | Google Chrome 团队 Addy Osmani 出品的"生产级"工程化 agent skills 合集 |
| [anthropics/claude-code](https://github.com/anthropics/claude-code) | +415 today | 终端 agentic coding 工具标杆，其 skills 生态正成为整个赛道的扩展标准 |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | 8,683 | Rust 生态构建模块化 LLM 应用的主力框架 |
| [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) | 106,965 | 病毒式传播的 token 压缩 skill + proxy，为 coding agent 省 65% token |
| [Mirrowel/LLM-API-Key-Proxy](https://github.com/Mirrowel/LLM-API-Key-Proxy) | 554 | 通用 LLM 网关，一个 API 对接全部模型商 |

### 🤖 AI 智能体/工作流

| 项目 | Stars | 说明 |
|---|---|---|
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | 247,456 | "与你一起成长的 agent"，当前 stars 最高的 agent 项目之一 |
| [trycua/cua](https://github.com/trycua/cua) | +1,012 today | 开源 Computer-Use 2.0：跨 OS 设备集群、驱动与训练/评测基准 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | 115,544 | 让 agent 操控浏览器的事实标准库 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | 146,749 | 自我定位升级为 "agent engineering platform" |
| [HKUDS/nanobot](https://github.com/HKUDS/nanobot) | 48,415 | 港大 DKP 组超轻量自托管个人 agent 框架，WebUI + MCP + 多智能体 |
| [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent) | 47,056 | 原 chatgpt-on-wechat 升级为"超级助手 + Agent Harness"，带自我进化记忆 |
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | 107,788 | 多智能体 LLM 金融交易框架，学术与工业界双热 |
| [esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix) | 35,649 | DeepSeek 原生终端 coding agent，主打 prefix-cache 稳定性 |

### 📦 AI 应用

| 项目 | Stars | 说明 |
|---|---|---|
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | 152,634 | 最流行的本地 AI 聊天界面，支持 Ollama/OpenAI 等全协议 |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | 52,027 | AI 生产力工作站，300+ 助手统一接入主流模型 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | 55,558 | 文档/主题 → 原生 PowerPoint（含图表、动画、语音旁白），国内爆款 |
| [anthropics/financial-services](https://github.com/anthropics/financial-services) | +236 today | Anthropic 官方金融服务行业 agent 方案，值得关注的厂商垂直化信号 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | 65,382 | LLM 多市场股票分析 + 自动推送，可零成本定时运行 |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | 72,259 | 本地运行的 AI 求职全流程 agent（扫描职位、评分、定制简历） |
| [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) | 83,821 | 给 agent 装上"眼睛"：一个 CLI 读取 Twitter/Reddit/YouTube/小红书等全网内容 |

### 🧠 大模型/训练

| 项目 | Stars | 说明 |
|---|---|---|
| [higgsfield-ai/higgsfield](https://github.com/higgsfield-ai/higgsfield) | +461 today | 容错、高扩展 GPU 编排 + 十亿到万亿参数训练框架，今日上榜 |
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | 61,835 | 2 小时从零训练 64M 参数 LLM，最好的中文 LLM 教学项目 |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | 105,300 | PyTorch 手写 ChatGPT 级 LLM 的经典教程 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | 166,453 | 模型定义框架基座，稳居生态核心 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | 4,581 | 面向系统工程师：Apple Silicon 上手写 mini vLLM，推理系统学习佳作 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | 7,460 | 覆盖 200+ 数据集的 LLM 评测平台 |

### 🔍 RAG/知识库

| 项目 | Stars | 说明 |
|---|---|---|
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | 119,874 | 把任意代码库/文档转成可查询知识图谱的 agent skill，"无向量库 RAG"新范式 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | 94,336 | 跨会话持久记忆方案，兼容 Claude Code/Codex/Gemini 等全部主流 agent |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | 91,066 | 深度文档理解的 RAG 引擎 + Agent 能力 |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | 35,775 | "无向量、推理式 RAG"文档索引，RAG 范式创新的代表 |
| [topoteretes/cognee](https://github.com/topoteretes/cognee) | 30,864 | 自托管知识图谱引擎，为 agent 提供长期记忆 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | 65,717 | agent 记忆层基础设施，生产级 drop-in |
| [StarTrail-org/LEANN](https://github.com/StarTrail-org/LEANN) | 12,944 | MLSys 2026 最佳论文：个人设备上省 97% 存储的本地 RAG |
| [alibaba/zvec](https://github.com/alibaba/zvec) | 15,976 | 阿里开源轻量级进程内向量数据库，主打极致速度 |

---

## 三、趋势信号分析

**① Agent Skills / Harness 层爆发。** 今日热榜前三（Cloudflare security-audit-skill +2375、ECC +837、agent-skills +729）全部属于"给 coding agent 加装技能与行为规范"的赛道。Cloudflare、Google 工程负责人（Addy Osmani）等大厂/大咖亲自下场发布 skills，说明该生态正从社区玩具走向企业级标准，预计会围绕 skill 打包格式、安全审计、可验证产出形成新的规范竞争。

**② Computer-Use 与 Agent 记忆成为下一波基础设施。** cua（+1012）代表的"操作真实计算机"与 claude-mem/cognee/mem0 代表的"持久记忆"共同指向同一判断：agent 从"聊天"走向"长期驻留、操作系统级执行"。

**③ 成本优化成为显学。** caveman（107k）与 headroom（73k）靠 token 压缩获得百万级增长，说明 agent 规模化落地后，推理成本已成为第一痛点。

**④ 垂直行业化启动。** Anthropic 官方发布 financial-services 仓库，加上 TradingAgents、Vibe-Trading、qlib、daily_stock_analysis 等金融 agent 密集活跃，金融是当前 agent 落地最快的垂直领域。

---

## 四、社区关注热点

- **[cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill)** — 今日 +2375 增长冠军，大厂背书的 agent skill 范本，值得研究其"多阶段 + 机器可读 + 独立验证"设计。
- **[affaan-m/ECC](https://github.com/affaan-m/ECC)** — 总量 263k 且今日仍 +837，agent harness 赛道头部项目，"instincts/memory/security" 分层设计是 harness 工程化的参考架构。
- **[trycua/cua](https://github.com/trycua/cua)** — Computer-Use 2.0 基础设施 + 评测基准，agent 操作系统的先行者。
- **[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)** 与 **[PageIndex](https://github.com/VectifyAI/PageIndex)** — "无向量、推理式/图结构 RAG"正在挑战传统 embedding 检索范式。
- **[caveman](https://github.com/JuliusBrussee/caveman)** + **[headroom](https://github.com/headroomlabs-ai/headroom)** — token 成本优化组合拳，自部署 coding agent 的团队可直接受益。

---
*数据来源：GitHub Trending（2026-09-21）及 Topic Search API；stars 总量为快照值，今日新增为 Trending 实时数据。*

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*