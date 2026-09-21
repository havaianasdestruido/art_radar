# AI 开源趋势日报 2026-09-22

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-09-21 23:15 UTC

---

# 📰 AI 开源趋势日报 · 2026-09-22

---

## 1️⃣ 今日速览

今日 GitHub Trending 被 **Agent 基础设施** 全面占据：BuilderIO 的 agentic 应用框架、cua 的 computer-use 2.0 训练/评测平台、AI 长期记忆方案 ai-memory 同日登榜，标志社区焦点从“做 Agent 应用”转向“建 Agent 底座”。特别值得注意的是 **agent 记忆与跨供应商上下文交接**（ai-memory、claude-mem、mem0）已成为独立赛道。同时，Anthropic 官方下场发布金融行业解决方案，OpenStock 以开源挑战商业行情平台，垂直领域 AI 应用持续升温。国内项目表现活跃，视频高光剪辑、Codex 管理工具等均有上榜。

---

## 2️⃣ 各维度热门项目

### 🔧 AI 基础工具（框架 / SDK / 推理引擎 / 开发工具）

| 项目 | Stars | 说明 |
|---|---|---|
| [ollama/ollama](https://github.com/ollama/ollama) | ⭐181k | 本地大模型运行事实标准，支持 Kimi、GLM、DeepSeek、Qwen 等国产模型 |
| [BuilderIO/agent-native](https://github.com/BuilderIO/agent-native) | +607 today | Agentic 应用开发框架，今日新上榜，BuilderIO 前端 Agent 化布局的关键落子 |
| [Coder/coder](https://github.com/coder/coder) | +461 today | 定位"为开发者及其 Agent 提供安全环境”，远程开发平台全面转向 Agent 供给 |
| [yynxxxxx/Codex-X](https://github.com/yynxxxxx/Codex-X) | +79 today | Codex 桌面端可视化管理工具，Provider 切换 + MCP/Skills 管理，反映开发者对多 CLI 管控的刚需 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | ⭐153k | 最流行的自托管 AI 界面，Ollama 生态核心组件 |
| [Mirrowel/LLM-API-Key-Proxy](https://github.com/Mirrowel/LLM-API-Key-Proxy) | ⭐555 | 统一 LLM 网关，多供应商负载均衡，解决多 Agent 时代的 API 管理问题 |

### 🤖 AI 智能体 / 工作流

| 项目 | Stars | 说明 |
|---|---|---|
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | ⭐265k | Agent harness 性能优化系统（Skills/本能/记忆/安全），横跨 Claude Code、Codex、Cursor |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | ⭐248k | “与你共同成长的 Agent”，开源社区 Agent 顶流 |
| [trycua/cua](https://github.com/trycua/cua) | +609 today | Computer-use 2.0：跨 OS 设备集群 + 训练/评测基准，GUI Agent 的基础设施层 |
| [akitaonrails/ai-memory](https://github.com/akitaonrails/ai-memory) | +217 today | Agent 编码 CLI 的长期记忆 + 跨厂商上下文交接方案，今日爆点 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | ⭐116k | 浏览器操作 Agent 标准库，与 cua 同属 GUI 自动化赛道 |
| [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent) | ⭐47k | chatgpt-on-wechat 后继者，开源超级助手 + Agent Harness，一行安装 |

### 📦 AI 应用（垂直场景）

| 项目 | Stars | 说明 |
|---|---|---|
| [anthropics/financial-services](https://github.com/anthropics/financial-services) | +425 today | Anthropic 官方金融行业方案，模型厂商加速行业落地的信号 |
| [Open-Dev-Society/OpenStock](https://github.com/Open-Dev-Society/OpenStock) | +843 today | 今日最高增量，开源行情追踪 + 个性化告警，对标昂贵商业终端 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | ⭐65k | LLM 多市场股票分析，与 OpenStock 共同印证 AI × 投资的社区热度 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | ⭐56k | 文档/主题生成原生 PPT，办公自动化爆款 |
| [zhouxiaoka/autoclip](https://github.com/zhouxiaoka/autoclip) | +266 today | AI 视频高光提取二创工具，内容创作垂直场景 |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | ⭐72k | 本地运行的 AI 求职全流程工具（扫描职位→评分→定制简历） |

### 🧠 大模型 / 训练

| 项目 | Stars | 说明 |
|---|---|---|
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | ⭐62k | 2 小时从零训练 64M 参数 LLM，中文社区最火的教学训练项目 |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | ⭐105k | PyTorch 手搓 ChatGPT 级 LLM，经典学习资源 |
| [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) | ⭐62k | YOLO 系列目标检测，CV 训练侧长青树 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | ⭐7k | LLM 评测平台，支持 100+ 数据集，模型选型刚需 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | ⭐5k | Apple Silicon 上的 LLM 推理系统教学，构建 tiny vLLM |

### 🔍 RAG / 知识库 / 记忆

| 项目 | Stars | 说明 |
|---|---|---|
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | ⭐120k | 代码库→可查询知识图谱，"无向量库”确定性 RAG 新范式，增长极快 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | ⭐94k | 跨会话持久上下文，兼容所有主流 Agent CLI，记忆赛道头部 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | ⭐66k | 生产级 Agent 记忆层基础设施 |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | ⭐91k | RAG + Agent 深度融合的开源引擎 |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | ⭐73k | 上下文压缩：JSON 省 60-95% token，直接降低 Agent 成本 |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | ⭐36k | 无向量、推理式 RAG 文档索引，与 graphify 同属反向量数据库思潮 |

---

## 3️⃣ 趋势信号分析

**① Agent 记忆与上下文工程成为最热增量赛道。** 今日 Trending 上 ai-memory、coder（Agent 安全环境）、agent-native 同日爆发，主题搜索中 claude-mem（94k）、mem0、headroom（上下文压缩）、graphify（120k）均高速增长——社区正从“调模型”转向“管上下文”，跨 CLI、跨厂商的记忆可迁移性是核心痛点。

**② Token 成本优化进入工程化阶段。** caveman（107k，“原始人语气”省 65% token）以戏谑方式爆红，headroom 做严肃版压缩代理，反映 Agent 大规模落地后推理成本已成第一约束。

**③ “反向量库”RAG 新范式抬头。** Graphify（AST 确定性解析）与 PageIndex（推理式检索）代表社区对 embedding 黑盒的反思，知识图谱 + 结构化解析路线获资本与 star 双重验证。

**④ 行业与事件关联。** Anthropic 官方发布 financial-services，配合 OpenStock、TradingAgents、qlib 等 AI 金融项目的持续热度，与华尔街加速采用 LLM 的行业周期共振；ollama 描述中突出 Kimi/GLM/DeepSeek/Qwen，国产模型海外本地化渗透率显著提升。

---

## 4️⃣ 社区关注热点

- **[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)** — 确定性知识图谱 RAG + 作为 Claude Code/Cursor Skill 分发，是“RAG 即 Agent 技能”的新物种，增长曲线陡峭
- **[trycua/cua](https://github.com/trycua/cua)** — GUI/computer-use Agent 的训练数据与评测基础设施，稀缺卡位，今日 +609
- **[headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom)** — 上下文压缩库/代理/MCP 三形态交付，Agent 成本优化的最直接方案
- **[anthropics/financial-services](https://github.com/anthropics/financial-services)** — 头部模型厂商的垂直行业官方模板，值得作为行业落地方案参考范本
- **方向提醒：Agent 记忆标准化** — ai-memory + claude-mem + mem0 同期活跃，跨厂商记忆格式未来可能出现事实标准，建议持续跟踪

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*