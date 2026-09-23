# OpenClaw 生态日报 2026-09-24

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-09-23 22:56 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-09-24

## 1. 今日速览

OpenClaw 今日保持极高活跃度：过去 24 小时 Issue 更新 500 条（新开/活跃 458，关闭 42），PR 更新 500 条（待合并 419，合并/关闭 81），无新版本发布。核心贡献者 @steipete 持续高频输出，单日提交多个 XL 级重构与修复 PR，工程节奏密集。社区反馈聚焦于三大主题：**网关稳定性（内存泄漏、OOM、启动挂起）、自动更新失败链、以及 2026.9.5 版本引入的回归**。Issue 关闭/新增比偏低（42/458 ≈ 9%），待修复积压持续增长，是当前项目健康度的主要隐忧。

## 2. 版本发布

今日无新 Release。值得注意的是，围绕 2026.9.x 更新失败的报告仍在持续涌入（#146394、#145510、#147160 等），且 #152804 报告 2026.9.5 存在 minimax-portal 模型目录丢失回归——下一个补丁版本的需求已较为迫切。

## 3. 项目进展

今日合并/关闭 81 个 PR，重点方向：

- **原子更新与回滚安全**：[#144005](https://github.com/openclaw/openclaw/pull/144005)（迁移前备份状态、回滚时恢复）与拆分出的 [#145169](https://github.com/openclaw/openclaw/pull/145169)（回滚失败时保留较新数据）持续推进，均为 P0、涉及兼容性/会话状态/安全边界，直接回应近期大量更新失败报告。配套的 [#156757](https://github.com/openclaw/openclaw/pull/156757) 降低重复所有权检查的 CPU 消耗、[#156825](https://github.com/openclaw/openclaw/pull/156825) 准备恢复包验证。
- **渠道传输层去重（deslop）系列**：[#156752](https://github.com/openclaw/openclaw/pull/156752)（Telegram/WhatsApp）、[#156832](https://github.com/openclaw/openclaw/pull/156832)（Feishu），维护者主导的 XL 级清理，无行为变更但显著降低维护成本。
- **模型/Agent 修复**：[#156758](https://github.com/openclaw/openclaw/pull/156758)（Codex 大文档上传后本地文件工具可读完整内容，P1）、[#134425](https://github.com/openclaw/openclaw/pull/134425)（HTTP 续传中非规范 tool-call id 的重塑与还原）、[#148334](https://github.com/openclaw/openclaw/pull/148334)（私有 GitHub 项目会话使用选定的 GitHub 身份）。
- **内存与插件**：[#138544](https://github.com/openclaw/openclaw/pull/138544) 修复 Tool Search 目录模式下 memory_search/memory_get 被折叠导致 Active Memory 自禁用的问题——直接对应热点 Issue #128140。
- **性能**：[#156784](https://github.com/openclaw/openclaw/pull/156784) 在多客户端间共享模型鉴权状态准备（报告负载下 5,098 次调用/小时降至共享缓存）。
- **工具链**：[#156829](https://github.com/openclaw/openclaw/pull/156829) 摆脱 TypeScript 6 依赖；[#156812](https://github.com/openclaw/openclaw/pull/156812) 重构发布验证流水线以加快稳定版发布。

整体看，项目正集中火力攻坚**更新可靠性**与**基础设施清理**两大方向，为下一个稳定版蓄力。

## 4. 社区热点

1. **[#91588](https://github.com/openclaw/openclaw/issues/91588)（39 评论，P0）网关内存泄漏**：RSS 从 350MB 涨至 15.5GB，2-3 天即触发 OOM 与 launchd 反复重启。自 6 月 open 至今 39 条评论仍无修复 PR，是社区最大的不满来源。
2. **[#126360](https://github.com/openclaw/openclaw/issues/126360)（19 评论，P1）**：显式多 Agent 所有模式下 `AgentSelectionRequiredError` 刷爆日志，logbook 插件、Control UI 全局 RPC 与系统 Agent 回合均缺 agentId，需要产品层面决策。
3. **[#80319](https://github.com/openclaw/openclaw/issues/80319)（17 评论）**：QA 工具默认套件将 Codex 原生工具与 OpenClaw 动态工具对等性混为一谈——测试框架自身的准确性问题。
4. **[#97616](https://github.com/openclaw/openclaw/issues/97616)（16 评论，P1）**：hook/工具子进程未被 reap，僵尸进程累积导致运行时退化，与 #91588 同属长期资源泄漏类问题。
5. **[#85030](https://github.com/openclaw/openclaw/issues/85030)（15 评论、6 👍，已关闭）**：MCP 工具未注入 sessions_spawn 子会话，多重 allowlist 均被忽略，并涉及安全审查——今日关闭是积极信号。

## 5. Bug 与稳定性（按严重度）

**P0：**
- [#91588](https://github.com/openclaw/openclaw/issues/91588) 网关内存泄漏致 OOM 循环 — **无修复 PR**
- [#152981](https://github.com/openclaw/openclaw/issues/152981) 2026.9.5 网关启动在 `sidecars.model-runtime` 挂起约 17 分钟后超时（Windows，回归）— **无修复 PR**
- [#152804](https://github.com/openclaw/openclaw/issues/152804) 2026.9.5 升级后 minimax-portal 丢失模型目录（回归，手动处理标记）— **无修复 PR**
- [#156712](https://github.com/openclaw/openclaw/issues/156712) `openclaw triage` 修复子进程不退出、持有 gateway-lifecycle 锁，阻塞应用重启（今日新报）— **无修复 PR**
- [#146860](https://github.com/openclaw/openclaw/issues/146860) Windows 计划任务 InteractiveToken 模式下托管更新激活停滞直至 abandoned — **无修复 PR**
- [#70903](https://github.com/openclaw/openclaw/issues/70903) 计费恢复后文件级 provider 冷却仍封锁用户数小时 — **无修复 PR**
- [#71689](https://github.com/openclaw/openclaw/issues/71689) tasks 注册表在 SQLite 损坏时恢复失败（数据丢失）— **无修复 PR**

**P1（节选）：**
- [#110190](https://github.com/openclaw/openclaw/issues/110190) 运行时上下文载体置于用户消息之后，导致模型混淆与推理 token 浪费 — 无修复 PR
- [#121617](https://github.com/openclaw/openclaw/issues/121617) 二次压缩被 "Already compacted" 守卫误判为终态失败 — 无修复 PR
- [#128140](https://github.com/openclaw/openclaw/issues/128140) memory_search 工具 15s 超时而 CLI 正常 — 相关 PR [#138544](https://github.com/openclaw/openclaw/pull/138544)、[#156483](https://github.com/openclaw/openclaw/pull/156483) 进行中
- [#138272](https://github.com/openclaw/openclaw/issues/138272) Android Talk 语音在任务回合报 "no live response owner"（跨 3 个版本）— 无修复 PR
- [#147040](https://github.com/openclaw/openclaw/issues/147040) "malformed JSON arguments" 在 2026.9.4 上仍复现（前两个修复未根治）
- [#139215](https://github.com/openclaw/openclaw/issues/139215) 2026.9.1 起 cron 调度静默吞掉部分触发

## 6. 功能请求与路线图信号

- **A2A 单向派发模式**（[#44309](https://github.com/openclaw/openclaw/issues/44309)）：补齐 sessions_send 的 fire-and-forget 语义，与 #137488（派发完成通知应跟随请求方投递上下文）构成同一 agent 间通信改进方向。
- **会话记忆钩子扩展**（[#51572](https://github.com/openclaw/openclaw/issues/51572)）：reset/prune 时也触发 session-memory hook；与今日多个 memory 相关 PR（#138544、#148340）方向一致，纳入概率较高。
- **放宽 CLI 3 分钟无输出看门狗**（[#40982](https://github.com/openclaw/openclaw/issues/40982)）：已有 linked PR open。
- **流式重复输出熔断（Halt & Confirm）**（[#44965](https://github.com/openclaw/openclaw/issues/44965)）：针对循环刷屏，保护渠道不被灌爆。
- **单网关多 Teams bot**（[#71058](https://github.com/openclaw/openclaw/issues/71058)）与 **Linux aarch64 官方构建**（[#138279](https://github.com/openclaw/openclaw/issues/138279)）：企业用户与 ARM 用户的明确诉求。

## 7. 用户反馈摘要

- **长会话可靠性是最大痛点**：多个月的 Issue（#53408 长对话后工具参数静默丢失、#151962 13 天/310k token 会话出现“幽灵用户消息”、#140129 Anthropic 缓存指纹失效致每轮全量重写）表明重度用户（微信桥接、Telegram 常驻、cron 密集型部署）遭遇的问题集中在持久化与上下文管理。
- **Windows 体验明显弱于 macOS**：计划任务无人值守运行（#143757）、睡眠唤醒后重连失败（#140010）、更新失败（#146860）扎堆出现。
- **更新机制信任受损**：#146394、#145510、#147160 等自动生成的更新失败报告持续出现，多个用户被迫手动 `npm install -g`（#152804）。
- **正面信号**：Issue 报告质量普遍很高（含精确版本、commit、复现步骤），说明核心用户群体专业度高、参与意愿强；#85030 等长期问题的关闭也获得社区认可（6 👍）。

## 8. 待处理积压（建议维护者关注）

| Issue | 年龄 | 状态 | 关注点 |
|---|---|---|---|
| [#91588](https://github.com/openclaw/openclaw/issues/91588) 内存泄漏 | ~3.5 个月 | P0、需维护者审查 | 39 评论、影响生产部署，最高优先级 |
| [#70903](https://github.com/openclaw/openclaw/issues/70903) provider 冷却封锁 | ~5 个月 | 标记 stale | 用户充值后仍被锁数小时，体验极差 |
| [#53408](https://github.com/openclaw/openclaw/issues/53408) 工具参数静默丢失 | ~6 个月 | 需补充信息 | 长会话核心可靠性 |
| [#84983](https://github.com/openclaw/openclaw/issues/84983) cron 饱和事件循环 | ~4 个月 | 需维护者审查 | 单任务可致全部渠道无响应数分钟 |
| [#40982](https://github.com/openclaw/openclaw/issues/40982) CLI 看门狗 | ~6.5 个月 | 已有 linked PR open | 推进合并即可关闭 |
| [#44134](https://github.com/openclaw/openclaw/issues/44134) 工具 schema 频繁重载触发封号 | ~6 个月 | 需现场复现 | 涉及用户账号安全，敏感度高 |

此外，多个高优先级 Issue 带 `clawsweeper-recovery-stuck` 标签（#121617、#128067、#137488 等），表明自动分诊流程本身陷入停滞，建议人工介入重置分诊队列。

---
*数据来源：GitHub API（过去 24 小时窗口）。本报告基于评论数 Top 50 Issues 与 Top 30 PRs 抽样，全量数据可能包含更多未展示条目。*

---

## 横向生态对比

# 个人 AI 助手开源生态横向对比分析报告
**数据日期：2026-09-24**

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态已进入**高活跃度、深水区攻坚**阶段：头部项目日均 Issue/PR 事件均达 500 条量级，说明用户基数与贡献者规模均已跨过临界点。生态竞争焦点正从“功能堆叠”转向**可靠性工程**——长会话状态管理、更新机制可信度、资源泄漏成为共同的核心战场。同时，**多 Agent 协作与远程部署（SSH fleet、A2A）**正在形成下一代功能竞争的制高点。本地模型用户（Ollama/vLLM）作为不可忽视的群体，其兼容性诉求正在倒逼项目方重新审视 provider 抽象层的架构假设。

---

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新（24h） | 500（新开/活跃 458，关闭 42） | 500（活跃 277，关闭 223） |
| **Issue 关闭率** | **~9%** ⚠️ | **~45%** ✅ |
| PR 更新（24h） | 500（待合并 419，合并/关闭 81） | 500（待合并 310，合并/关闭 190） |
| PR 合并/关闭量 | 81 | 190 |
| Release | 无（2026.9.5 回归待补丁） | 无（v0.21.4 酝酿中） |
| 当前版本节奏 | 2026.9.x，补丁需求迫切 | v0.21.x，小步快跑 |
| **健康度评估** | 中低：吞吐尚可但积压失控，关闭比恶化，多个 P0 长期无修复 PR，自动分诊停滞 | 中高：修复吞吐强劲，风险域（session-state）系统性收口，但存在 P1 级信任问题（state.db） |

**核心差异**：两者原始活跃度相当，但 Hermes 的“处理能力/流入比”约为 OpenClaw 的 5 倍。OpenClaw 呈现典型的**流入 > 消化**失衡，是健康度的主要红灯。

---

## 3. OpenClaw 在生态中的定位

**优势：**
- **渠道生态最广**：Telegram/WhatsApp/Feishu/Teams/微信桥接多渠道传输层成熟，且正在做 deslop 级深度清理，维护投入显示这是长期战略资产
- **更新可靠性工程最深入**：#144005/#145169 原子更新 + 回滚 + 备份状态恢复系列 PR 属于生态内最完整的更新安全设计
- **核心贡献者驱动力强**：@steipete 单日多个 XL 级 PR，工程节奏罕见
- **用户报告质量高**：精确版本/commit/复现步骤，核心用户群专业度突出

**劣势：**
- P0 内存泄漏（#91588，3.5 个月、39 评论无修复 PR）与 OOM/僵尸进程（#97616）构成长期资源泄漏债务，直接影响生产部署信任
- Issue 关闭率 9%，`clawsweeper-recovery-stuck` 标签堆积，自动分诊体系自身故障
- 2026.9.5 引入回归且补丁未出，更新链路信任受损（用户被迫手动 npm install）

**技术路线差异**：OpenClaw 走“常驻网关 + 多渠道桥接 + 大而全工具生态”路线，重度常驻部署（cron 密集、Telegram 常驻）是其典型场景；Hermes 走“Desktop 优先 + 单机 gateway + 渐进式架构重构（Electron 拆分 14 步旅程）”路线，工程节奏更克制、分阶段容量门控。

**社区规模对比**：两者日均事件量同级（均触 500 上限），但 OpenClaw 的未消化反馈池明显更大；Hermes 的结构化标注体系（sweeper:risk-*）显示其社区运营更精细。

---

## 4. 共同关注的技术方向

| 技术方向 | OpenClaw | Hermes Agent | 具体诉求 |
|---|---|---|---|
| **会话状态/持久化可靠性** | #53408 长会话参数丢失、#151962 幽灵消息、#140129 缓存指纹失效 | session-state 系列修复、#100896 state.db 损坏、#120634 watermark | 长会话是两项目最大共同痛点，DB 层并发/损坏治理是共同课题 |
| **Cron/任务调度可靠性** | #139215 静默吞触发、#84983 事件循环饱和 | #113343 per-job 超时、#109765 快照丢失 provider 身份 | 后台自动化调度在两项目均未达生产级 |
| **更新机制可信度** | 原子更新/回滚系列 PR + 大量更新失败报告 | Desktop 更新耗时 ~10 分钟（#43837） | 用户对“更新即事故”零容忍 |
| **Provider 兼容与本地模型** | minimax-portal 回归、#70903 provider 冷却封锁 | #56004 vLLM thinking 丢失、#100437 模型 pin 失效 | 自托管/本地模型用户被系统性边缘化 |
| **远程/多 Agent 协作** | A2A 单向派发（#44309）、多 Teams bot（#71058） | 跨网关 Bot 协作（#97681）、SSH fleet（已完成 14/14）、#18715 远程 Agent | 下一代功能制高点，Hermes 落地更快 |
| **Windows 体验** | 更新/计划任务/唤醒问题扎堆 | Windows 长消息截断 | 两项目 Windows 均为二等公民 |

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 多渠道消息网关、MCP 工具生态、内存系统（Active Memory/memory_search） | Desktop 体验、SSH 受管部署、Kanban 任务编排、多 Bot 群聊协作 |
| 目标用户 | 重度常驻部署用户：微信/Telegram 桥接、cron 密集型、企业 Teams | 桌面个人用户 → 正向企业级远程部署扩展 |
| 架构关键点 | 单网关多客户端、模型鉴权共享缓存、原子更新引擎 | Electron 分层重构、gateway 权威日志、插件按需实例化 |
| 工程方法论 | 核心贡献者高强度集中攻坚 + 自动分诊（已停滞） | 分步容量门控（journey N/14 模式）、结构化风险标签 |
| 治理风格 | 功能广度优先，债务后置 | 质量收口优先（批量关闭渲染簇、风险域治理） |

---

## 6. 社区热度与成熟度

- **热度分层**：两项目日均事件量同级且均触顶（500），属生态第一梯队；OpenClaw 评论热度最高的单 Issue（#91588，39 评论）反映**不满驱动**的参与，Hermes 最高热度（#88584，136 评论）为基础设施围观，性质不同。
- **快速迭代阶段**：OpenClaw——功能与重构 PR 密集产出，但回归与积压同步增长，呈“高速但不稳”特征。
- **质量巩固阶段**：Hermes——批量关闭 session-state 缺陷簇、系统性架构重构（Electron 1/14）、修复吞吐 190 PR/日，正从功能扩张转向质量沉淀。
- **成熟度信号**：OpenClaw 的企业诉求（多 Teams bot、aarch64 构建）表明已有生产级用户；Hermes 的 SSH fleet 14/14 完成与学术测试提案（#80921 crash/resume 一致性）显示工程严谨度上升。

---

## 7. 值得关注的趋势信号

1. **“长会话可靠性”是智能体落地的真正瓶颈**：两项目最深的痛点均非模型能力，而是持久化、上下文压缩、会话恢复的正确性。对开发者的启示：投资 crash/resume 一致性测试（如 arXiv:2608.03836 提出的 SIGKILL/double-resume 套件）将成为基础设施级竞争力。

2. **更新机制即信任**：用户对自动更新的容错为零，“原子更新 + 回滚 + 备份验证”应作为智能体框架的标配设计，而非事后补丁。

3. **SQLite/多写者并发是自托管智能体的阿喀琉斯之踵**：Hermes state.db 5 周 4 次损坏、OpenClaw tasks 注册表损坏恢复失败——单机嵌入式存储的并发写入治理值得架构级前置设计。

4. **多 Agent 跨网关协作是下一个功能高地**：OpenClaw 的 A2A 派发与 Hermes 的跨网关 Bot 协作/SSH fleet 在同一方向收敛，且 Hermes 已率先完成部署侧基建，窗口期竞争明显。

5. **本地模型用户是被低估的战略群体**：vLLM/Ollama 兼容性抱怨在两项目均持续存在，provider 抽象层若默认假设云 API 行为（thinking 剥离、pin、context gate），将系统性流失自托管社区。

6. **自动分诊/自动化的自动化会反噬**：OpenClaw 的 clawsweeper 停滞与 Hermes 的 cron/jobs.py 冲突（136 评论）共同说明——CI/分诊基础设施债务会直接放大产品问题的处理延迟，需专人治理。

**对 OpenClaw 的优先建议**：立即排期 #91588 内存泄漏与 2026.9.6 补丁版本，人工重置分诊队列，将 Issue 关闭率拉回 30%+ 以止住信任流失。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报
**日期：2026-09-24** | 数据来源：github.com/NousResearch/hermes-agent

---

## 1. 今日速览

- 项目持续保持**极高活跃度**：过去 24 小时 Issues 更新 500 条（新开/活跃 277，关闭 223），PR 更新 500 条（待合并 310，已合并/关闭 190），Issue 关闭率约 45%，维护响应能力强劲。
- 今日**无新版本发布**（当前主线上介于 v0.21.3 与 v0.21.4 之间，参见 PR #119541 快照说明）。
- 讨论焦点集中在 **Desktop 会话状态/渲染层（session-state）系列缺陷**——大量“消息重复渲染/消失/乱序”类 Bug 集中关闭，显示维护者正在系统性收口这一风险域。
- 功能侧主线清晰：**多网关 Bot 协作、SSH 受管部署、Kanban 调度健壮性、Provider 兼容性**是当前演进方向。

---

## 2. 版本发布

今日无新 Release。v0.21.4 尚在酝酿中。

---

## 3. 项目进展

今日无 Release 事件，但 PR 侧 190 条合并/关闭，从高价值 PR 可看出推进主线：

**桌面端架构重构（进行中）**
- [PR #120683](https://github.com/NousResearch/hermes-agent/pull/120683) — Electron 入口拆分重构（1/14）：将窗口/shell 基础设施从单体启动作用域中剥离，为后续 Desktop 稳定性打地基。
- [PR #120719](https://github.com/NousResearch/hermes-agent/pull/120719) — 受管 SSH fleet journey（14/14）落地，Desktop 管理远程 SSH 安装的完整旅程已在测量容量门控后合入主线路径，呼应 [#118029](https://github.com/NousResearch/hermes-agent/issues/118029)。

**会话/压缩稳定性（P1 修复）**
- [PR #120634](https://github.com/NousResearch/hermes-agent/pull/120634) — 修复主动 prune / micro-compaction 因无 watermark 导致其他 surface 新增 turn 被误归档的 P1 缺陷，直接对应多条“消息消失”类 Issue。

**Provider 与工具链**
- [PR #120727](https://github.com/NousResearch/hermes-agent/pull/120727) — Anthropic 兼容代理可选开启 signed thinking replay，默认仍剥离，安全模型未削弱。
- [PR #101943](https://github.com/NousResearch/hermes-agent/pull/101943) — MCP 配置中未设置的 `${VAR}` 不再原样传给子进程，改进可诊断性。
- [PR #120731](https://github.com/NousResearch/hermes-agent/pull/120731) — 性能优化：gateway 配置加载按需实例化插件，省 ~0.6s import 开销，利好 CLI/dashboard 探针。

**杂项质量提升**：会话搜索 ISO 时间戳统一格式（[#120722](https://github.com/NousResearch/hermes-agent/pull/120722)、[#120725](https://github.com/NousResearch/hermes-agent/pull/120725)）、1Password 会话隔离（[#120732](https://github.com/NousResearch/hermes-agent/pull/120732)）、远程 owner 图片上传修复（[#120733](https://github.com/NousResearch/hermes-agent/pull/120733)）。

---

## 4. 社区热点

**🔥 评论最多：[#88584](https://github.com/NousResearch/hermes-agent/issues/88584)（136 评论）**
`cron/jobs.py` 上游合并冲突阻塞 Nous 自动集成，标记为 invalid/P3。136 条评论说明自动化流水线问题牵动大量贡献者围观，属工程基础设施噪音而非产品缺陷。

**跨网关 Bot 协作（社区最想要的方向）**
- [#97681](https://github.com/NousResearch/hermes-agent/issues/97681)（30 评论，👍2）— 不同 gateway 上的 Bot 在群聊中协作，且不依赖 Desktop 常开。
- [#95163](https://github.com/NousResearch/hermes-agent/issues/95163)（16 评论）— 后端托管群聊房间：将 round-robin 编排从 renderer localStorage 迁到 gateway 权威日志。
- 两条 Issue 相互呼应，构成“多 Bot 多设备协作”的完整诉求图景，是社区投票热度最高的功能簇。

**远程 Agent + 本地工具执行：[#18715](https://github.com/NousResearch/hermes-agent/issues/18715)（👍34，P2, needs-decision）** — 长期高票需求，5 月至今仍待核心决策，与 SSH fleet 系列工作存在架构关联。

**学术驱动测试套件：[#80921](https://github.com/NousResearch/hermes-agent/issues/80921)** — 基于 arXiv:2608.03836 提出机器可检查的 crash/resume 一致性测试（SIGKILL、double-resume、consume-once），与项目当前 session-state 痛点高度契合，值得关注维护者采纳。

---

## 5. Bug 与稳定性

按严重程度排列（今日关闭较多，说明修复动作密集）：

| 级别 | Issue | 状态 | 说明 | Fix |
|---|---|---|---|---|
| P1 | [#100896](https://github.com/NousResearch/hermes-agent/issues/100896) | CLOSED | state.db 5 周 4 次损坏（gateway+dashboard 多写者 WAL），"5 live SessionDB handles" 警告早于发病 7 分钟，已做 journal_mode=delete 遏制 | 相关缓解已入 |
| P1 | [#117867](https://github.com/NousResearch/hermes-agent/issues/117867) | CLOSED | warm-resume transcript gate 持有时，最新一轮对话完成瞬间消失 | 渲染层修复推进中 |
| P1 | [#71733](https://github.com/NousResearch/hermes-agent/issues/71733) | CLOSED | 用户气泡不可见（曾标 P0） | 已关闭 |
| P1 | [#68927](https://github.com/NousResearch/hermes-agent/issues/68927) | CLOSED | 长任务后 Enter 提交但 UI 未完成渲染 | 已关闭 |
| P1 | [#72046](https://github.com/NousResearch/hermes-agent/issues/72046) | CLOSED | state.db 损坏时静默显示空会话，需要显式降级状态与引导恢复 | 已关闭 |
| **P2（新开，未修）** | [#119003](https://github.com/NousResearch/hermes-agent/issues/119003) | **OPEN** | ⚠️ 多路复用 gateway 下 kanban dispatch/reconcile **静默破坏真实任务行**，替换为畸形 `t_running` 占位符——数据丢失类，今日新报，尚无 fix PR | ❌ 无 |
| P2 | [#118482](https://github.com/NousResearch/hermes-agent/issues/118482) | OPEN | 流式输出期间 transcript 滚动漂移后回弹 | ❌ 无 |
| P2 | [#56004](https://github.com/NousResearch/hermes-agent/issues/56004) | OPEN | Qwen3.6/vLLM 多轮 thinking 上下文在回放时被剥离 | ❌ 无 |
| P2 | [#109765](https://github.com/NousResearch/hermes-agent/issues/109765) | OPEN | Cron 创建快照丢失自定义 provider 身份，回放退化为 OpenRouter | ❌ 无 |

**渲染重复/乱序簇集中关闭**：[#118670](https://github.com/NousResearch/hermes-agent/issues/118670)、[#118671](https://github.com/NousResearch/hermes-agent/issues/118671)、[#119540](https://github.com/NousResearch/hermes-agent/issues/119540)、[#70108](https://github.com/NousResearch/hermes-agent/issues/70108)、[#118693](https://github.com/NousResearch/hermes-agent/issues/118693) 均为 renderer 层重复渲染（DB 数据验证干净），今日批量关闭，配合 [#120634](https://github.com/NousResearch/hermes-agent/pull/120634) 与窗口重构 PR，session-state 风险域正被系统性治理。

---

## 6. 功能请求与路线图信号

**下一版本（推测 v0.21.4）可能纳入：**
- **Desktop 自定义模型按 slug 添加**：[#120693](https://github.com/NousResearch/hermes-agent/pull/120693)（新鲜 PR）+ 已关闭的 [#41487](https://github.com/NousResearch/hermes-agent/pull/41487)，多方推动，成熟度高。
- **Cron per-job 超时覆盖**：[PR #113343](https://github.com/NousResearch/hermes-agent/pull/113343)，配合已暴露的 cron 可靠性问题（#109765、#100437），cron 子系统是明确治理重点。
- **Kanban 健壮性系列**：[#97351](https://github.com/NousResearch/hermes-agent/pull/97351)、[#120724](https://github.com/NousResearch/hermes-agent/pull/120724)、[#97344](https://github.com/NousResearch/hermes-agent/pull/97344) 持续打磨，但新 Bug #119003 说明该区域尚未稳定。

**中期路线图信号：**
- SSH 受管部署控制平面（#118029 + PR #120719 已至 14/14）→ 企业级部署能力接近完整。
- HTML 邮件网关（[#11941](https://github.com/NousResearch/hermes-agent/issues/11941)，needs-decision）与 HA 事件路由（[#35060](https://github.com/NousResearch/hermes-agent/issues/35060)）仍待决策。
- 多后端终端（[#1855](https://github.com/NousResearch/hermes-agent/issues/1855)，👍16）长期高票未动，或与远程执行架构（#18715）统筹。

---

## 7. 用户反馈摘要

**痛点集中区：**
1. **Desktop 会话渲染不可信是最大信任杀手**——多条 Issue 用户均自行查 `state.db` 验证“数据还在、只是 UI 错了”，说明高级用户愿意排查但耐心有限；重复渲染、消息消失、乱序三类症状反复出现。
2. **state.db 损坏类问题动摇生产部署信心**（#100896 用户在生产单机 gateway 上 5 周遇 4 次），多写者并发是根因方向。
3. **Windows/Linux 桌面体验次优**：更新耗时 ~10 分钟（[#43837](https://github.com/NousResearch/hermes-agent/issues/43837)）、Linux SIGTRAP 崩溃（[#100573](https://github.com/NousResearch/hermes-agent/issues/100573)）、Windows 长消息截断（[#46606](https://github.com/NousResearch/hermes-agent/issues/46606)）。
4. **本地模型用户（Ollama/vLLM）被边缘感**：模型 pin 失效（#100437）、thinking 丢失（#56004）、64K context gate 误伤，是自托管社区的核心抱怨。

**满意点：**Issue 关闭速度快（277 活跃 vs 223 关闭）；维护者对复现细节的标注体系（sweeper:risk-* 标签）让用户报告被结构化处理；多设备/多 Bot 协作愿景吸引高质量功能提案（#97681 附带原型截图）。

---

## 8. 待处理积压

| 项目 | 积压时长 | 建议动作 |
|---|---|---|
| [#18715](https://github.com/NousResearch/hermes-agent/issues/18715) 远程 Agent + 本地工具执行（👍34，P2） | ~5 个月，needs-decision | SSH fleet 已至 14/14，建议就此做出架构决策 |
| [#11941](https://github.com/NousResearch/hermes-agent/issues/11941) HTML 邮件支持 | ~5 个月，needs-decision | 社区需求明确，实现路径清晰（multipart/alternative） |
| [#1855](https://github.com/NousResearch/hermes-agent/issues/1855) 多后端终端（👍16） | ~6 个月 | 高票长期搁置，需明确接受/搁置表态 |
| [#56004](https://github.com/NousResearch/hermes-agent/issues/56004) vLLM thinking 回放丢失 | ~3 个月 | 报告质量高（作者主动分析根因），值得优先 |
| [#119003](https://github.com/NousResearch/hermes-agent/issues/119003) kanban 静默毁坏任务行 | 今日新开 | **数据丢失类，建议立即排期**，与 PR #120724 同区域可一并修 |
| [#88584](https://github.com/NousResearch/hermes-agent/issues/88584) 自动集成流水线冲突 | ~1 个月，136 评论 | infra 债务，建议专人清理 cron/jobs.py 冲突 |

---

**健康度小结：** 活跃度顶级（日均 500 Issue/PR 事件），修复吞吐良好，session-state 风险域治理初见成效；主要隐忧是 state.db 多写者损坏（P1 级信任问题）、kanban 新数据丢失 Bug，以及多个高票 needs-decision 功能的决策积压。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*