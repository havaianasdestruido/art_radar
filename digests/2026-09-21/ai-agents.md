# OpenClaw 生态日报 2026-09-21

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-09-20 22:25 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-09-21

## 1. 今日速览

OpenClaw 今日保持高度活跃：过去 24 小时内 Issues 更新 500 条（新开/活跃 308，关闭 192），PR 更新 500 条（待合并 289，已合并/关闭 211），无新版本发布。社区讨论焦点高度集中在 **2026.9.4 → 2026.9.5 升级路径的失败**（doctor-failed、死锁、迁移中止）以及 **Gateway 稳定性**（内存泄漏、事件循环阻塞、MCP 子进程管理）。PR 侧维护者（@steipete、@RomneyDa 等）产出密集，多个安全敏感和兼容性相关的修复/重构已进入 maintainer review 阶段，整体研发节奏健康，但升级链路的稳定性仍是当前最大的用户信任风险点。

## 2. 版本发布

过去 24 小时无新版本发布。值得注意的是，大量 Issue 反馈指向刚发布的 **2026.9.5**（更新失败、启动挂起等），社区普遍期待一个修复版本尽快落地。

## 3. 项目进展

今日 PR 活动以修复与重构为主，以下为重要的 open/近期关闭的 PR：

- **[#153764](https://github.com/openclaw/openclaw/pull/153764) fix: preserve failed validation across update activation and recovery**（steipete，XL）— 修复更新激活与恢复过程中失败验证丢失的问题。**注意：该 PR 处于 landing hold**，native 验证发现真实的 post-core 兼容性失败（候选版本回更到正式 2026.9.5 时报 Unknown 错误），直接解释了多个 update-deadlock Issue。
- **[#154084](https://github.com/openclaw/openclaw/pull/154084) fix(search): native search 误用无关 provider 凭据**（steipete，L）— 修复安全相关的凭据串用问题，待作者补充。
- **[#153895](https://github.com/openclaw/openclaw/pull/153895) fix(memory): dreaming 保留 clamped diary context**（Alix-007，XS）— 对应已关闭的 [#153682](https://github.com/openclaw/openclaw/issues/153682)，修复闭环。
- **[#153992](https://github.com/openclaw/openclaw/pull/153992) fix(auth): 凭据变更后加入替换 config generation**（RomneyDa）— 修复 logout 后偶发回合失败，fail-closed 设计。
- **[#153683](https://github.com/openclaw/openclaw/pull/153683) refactor: 压缩 agent 存储与全文索引维护**（steipete，XL）— 针对大 agent 存储性能，与 [#153067](https://github.com/openclaw/openclaw/issues/153067)（稳态每 5 秒全量重拷状态 DB）等问题方向一致。
- **[#154001](https://github.com/openclaw/openclaw/pull/154001) refactor(code-mode): Code Mode 改为纯 JavaScript 执行**，移除 TypeScript 编译器依赖，降低执行开销。
- **[#153885](https://github.com/openclaw/openclaw/pull/153885) feat: agent 可在会话中请求用户注意**（roboclaw-bot，XL，含截图证明）— 新协作能力，ready for maintainer look。
- **[#154035](https://github.com/openclaw/openclaw/pull/154035) fix(update): 流式 git history inventory + 原子 runtime/schema handoff**（printbyme，P1）— 由真实 2026.8.2→9.5 升级失败驱动，直击升级链路痛点，需补充 proof。
- **[#151176](https://github.com/openclaw/openclaw/pull/151176) / [#152181](https://github.com/openclaw/openclaw/pull/152181)** — OpenAI Agents API MVP harness 及共享外部 harness 会话机制，为新的原生后端铺路。

另有多个 CI/测试效率优化（[#154100](https://github.com/openclaw/openclaw/pull/154100)、[#154110](https://github.com/openclaw/openclaw/pull/154110)、[#154117](https://github.com/openclaw/openclaw/pull/154117)、[#154121](https://github.com/openclaw/openclaw/pull/154121)、[#154122](https://github.com/openclaw/openclaw/pull/154122)）已合入或待审，反映团队在系统性缩短验证周期。

**整体评估**：今日进展集中在①升级/恢复链路修复 ②存储与事件循环性能 ③安全边界加固，是针对近期用户反馈最痛的三个方向的定向投入。

## 4. 社区热点

**讨论最热烈的 Issues：**

1. **[#143524](https://github.com/openclaw/openclaw/issues/143524)**（34 评论，P0）— Agent SQLite WAL 无限增长至 1.4–2.8 GB，`wal_autocheckpoint=1000` 失效，阻塞 Gateway 启动（Windows）。已开一个月仍无 fix PR，用户持续跟进。
2. **[#97616](https://github.com/openclaw/openclaw/issues/97616)**（31 评论，P1）— hook/tool 子进程未回收形成僵尸进程堆积，与多个子进程泄漏 Issue 同源。
3. **[#144911](https://github.com/openclaw/openclaw/issues/144911)**（31 评论，P1）— stdio MCP server 初始化超时导致 Gateway 整体崩溃（未处理的 promise rejection），已标记 queueable-fix。
4. **[#91588](https://github.com/openclaw/openclaw/issues/91588)**（29 评论，P1）— Gateway RSS 从 350MB 涨至 15.5GB 后被 OOM kill，三个月未决的核心内存泄漏。
5. **[#149538](https://github.com/openclaw/openclaw/issues/149538)**（20 评论，P0）— main 分支 632-agent 集群上 Gateway ready 后事件循环饿死、/health 全部超时。
6. **[#152759](https://github.com/openclaw/openclaw/issues/152759)**（20 评论，已关闭）— `openclaw update` 9.4→9.5 报 `doctor-failed` 静默失败，自动回滚成功但升级无任何可操作信息。

**背后诉求**：大规模/长期运行用户（集群、多 agent、7×24 部署）最关心**资源治理（内存/进程/磁盘）**与**可升级性**；小团队用户则被升级死锁与回滚失败直接劝退（见 #153257 用户称“后悔升级”）。

## 5. Bug 与稳定性

**P0（按严重程度）：**

| Issue | 问题 | Fix PR 状态 |
|---|---|---|
| [#152759](https://github.com/openclaw/openclaw/issues/152759)（已关闭） | 9.4→9.5 更新 doctor-failed，静默失败 | 相关：[#153764](https://github.com/openclaw/openclaw/pull/153764)（landing hold） |
| [#153882](https://github.com/openclaw/openclaw/issues/153882)（已关闭） | 插件状态迁移因父进程持有 install-records lease 死锁，Doctor 中止 | 待关联 |
| [#152884](https://github.com/openclaw/openclaw/issues/152884) | 更新过程 SQLite 迁移死锁 | [#154035](https://github.com/openclaw/openclaw/pull/154035) 进行中 |
| [#153704](https://github.com/openclaw/openclaw/issues/153704)（已关闭） | candidate doctor 在 ~299s 固定卡死于 pre-migration 完整性检查 | 需 live-repro |
| [#152981](https://github.com/openclaw/openclaw/issues/152981) | 9.5 Gateway 启动挂起 ~17 分钟后 model-runtime publication 超时 | 无 |
| [#151467](https://github.com/openclaw/openclaw/issues/151467) | v6.33→v9.4 自升级死锁 + 回滚 cron 失败 | 无 |
| [#153257](https://github.com/openclaw/openclaw/issues/153257) | 9.5 引发 8 小时故障恢复（crash） | 需 info |
| [#153049](https://github.com/openclaw/openclaw/issues/153049) | 更新失败 doctor-failed | 无 |
| [#149538](https://github.com/openclaw/openclaw/issues/149538) | main 分支事件循环饿死，/health 超时 | 无 |
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | WAL 无限增长阻塞启动 | 无（needs-maintainer-review） |
| [#145995](https://github.com/openclaw/openclaw/issues/145995) | 插件检查间歇性失败（SQLite source 不稳定） | 无（manual-only） |
| [#144742](https://github.com/openclaw/openclaw/issues/144742) | 9.4 漏发 #144208，handoff lease 残留导致所有配置写入失败 | 维护者已确认 not-repro-on-main |

**P1 及以下：**

- [#139847](https://github.com/openclaw/openclaw/issues/139847) / [#144809](https://github.com/openclaw/openclaw/issues/144809) — 回合进行中新消息被丢弃或长回合回复整体丢失（"no active tool authority snapshot" 回归），**claude-cli 用户高频痛点**。
- [#115908](https://github.com/openclaw/openclaw/issues/115908) / [#119720](https://github.com/openclaw/openclaw/issues/119720) — 同步持久化/transcript reconcile 阻塞主线程。
- [#143278](https://github.com/openclaw/openclaw/issues/143278) — Heartbeat 内部输出泄漏到 Telegram 用户聊天（9.3 起）。
- [#153246](https://github.com/openclaw/openclaw/issues/153246)（已关闭）— 插件构建临时目录不清理，~7.5 GB/天磁盘增长。
- [#153067](https://github.com/openclaw/openclaw/issues/153067)（已关闭）— 稳态下每实例每 ~5s 重拷整个状态 DB（~5.9 TB/天写入），与 #153683 重构方向对应。
- [#79983](https://github.com/openclaw/openclaw/issues/79983) — SYSTEM_RUN_DISABLED 与 exec 策略不一致（安全相关）。

## 6. 功能请求与路线图信号

- **[#110950](https://github.com/openclaw/openclaw/issues/110950)**（maintainer 提出）— "Everything is a cron"：统一 heartbeat/watchers/定时自动化为单一 cron 原语。由维护者本人发起，**极可能进入近期路线图**。
- **[#45608](https://github.com/openclaw/openclaw/issues/45608)**（12 评论，4 👍）— `/new` 与每日 reset 前执行 agentic memory flush，复用 compaction 前的现有机制，实现成本低、需求明确，采纳概率高。
- **[#131457](https://github.com/openclaw/openclaw/issues/131457) — Feishu 频道 progress streaming**，其他六大频道已支持，属于一致性补齐，工单成熟。
- **[#71058](https://github.com/openclaw/openclaw/issues/71058) — 单 Gateway 多 Teams bot**，企业多租户场景诉求。
- **[#119992](https://github.com/openclaw/openclaw/issues/119992)** — message 工具每回合发送预算，防止重复消息风暴；已有 linked PR open。
- 结合 PR 信号：OpenAI Agents API 后端（[#151176](https://github.com/openclaw/openclaw/pull/151176)）、云桌面原生 CUA（[#152060](https://github.com/openclaw/openclaw/pull/152060)）、agent attention 请求（[#153885](https://github.com/openclaw/openclaw/pull/153885)）、配对节点工作区（[#154087](https://github.com/openclaw/openclaw/pull/154087)）构成下一版本的主要新功能面。

## 7. 用户反馈摘要

**满意点**：
- 更新失败后自动回滚机制在多数场景（#152759、#151467）能保住旧版本可用，用户认可这一兜底设计。
- Issue 报告体验好：doctor 自动生成 sanitized 恢复报告（如 [#153654](https://github.com/openclaw/openclaw/issues/153654)），降低了排障门槛。

**痛点**：
- **升级焦虑**：9.4→9.5 升级失败形态多样（doctor-failed、死锁、超时），且失败信息“silent and unactionable”。多位用户明确表示“升级前环境稳定，升级后陷入数小时恢复”（#153257）。
- **长期运行不可靠**：内存泄漏、僵尸进程、WAL/临时文件无限增长，迫使 7×24 用户自建 cron 清理与重启，运维负担重（#91588、#97616、#143524、#153246）。
- **消息可靠性**：回合中消息丢失、长回合回复整体丢弃，直接影响 Telegram/WhatsApp/Slack 等 IM 场景可用性（#139847、#144809、#131150）。
- **claude-cli 后端质量参差**：UA 过期导致认证失败（[#94716](https://github.com/openclaw/openclaw/issues/94716)）、tools.deny 不生效（[#132303](https://github.com/openclaw/openclaw/issues/132303)）、消息重复渲染（[#123792](https://github.com/openclaw/openclaw/issues/123792)）。

## 8. 待处理积压

以下高影响 Issue 长期处于 `no-new-fix-pr` / `needs-maintainer-review` 状态，建议优先关注：

- **[#91588](https://github.com/openclaw/openclaw/issues/91588)**（6/9 提出，P0 级内存泄漏）— 3 个多月未决，是最长尾的稳定性投诉。
- **[#38327](https://github.com/openclaw/openclaw/issues/38327)**（3/6 提出，P0，gemini-3.1-pro 鉴权回归，3 👍）— 已被标 stale，但仍是 P0 release-blocker 标签。
- **[#143524](https://github.com/openclaw/openclaw/issues/143524)**（9/9 提出，34 评论）— Windows 用户被完全阻塞，且连续多个 9.x 版本未修复。
- **[#114211](https://github.com/openclaw/openclaw/issues/114211)**（7/27，Matrix 房间 agent 循环 + 过期会话重放，platinum 级评级）— 需 live-repro。
- **[#120162](https://github.com/openclaw/openclaw/issues/120162)**（8/7，safeguard compaction 审计重试共享超时预算）— 影响长会话用户的记忆压缩可靠性。
- **[#119401](https://github.com/openclaw/openclaw/issues/119401)**（8/5，DM NO_REPLY 无条件抑制）— 本地/小模型用户无法强制可见回复，涉及产品决策。
- **[#51429](https://github.com/openclaw/openclaw/issues/51429)**（3/21，hardcoded 工作路径）— 中文社区高热度，虽为 P2 但持续被引用，建议给出正式回应。

**健康度提示**：项目社区参与度与维护者产出均处高位，但 P0 级“升级链路 + 资源泄漏”两类问题的积压数量与存续时长正在累积口碑成本。建议下一版本以升级可靠性为唯一主题，集中消化 #153764（解除 landing hold）、#154035 及各 update-deadlock 工单。

---

## 横向生态对比

# 开源个人 AI 助手 / 自主智能体生态横向对比分析报告
**数据基准日：2026-09-21**

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态已进入**高速迭代与质量分化并存**的阶段：头部项目单日 Issue/PR 更新量均达到 500 条量级，社区参与度处于历史高位。共性痛点从“功能缺失”转向**工程可靠性**——升级链路稳定性、消息投递可靠性、资源泄漏（内存/进程/磁盘）成为用户流失的主要诱因。多网关/多平台桥接（Telegram、WhatsApp、Discord、iMessage、飞书、SimpleX）和 MCP 生态集成已是标配能力，竞争焦点正移向**长期运行治理**与**成本控制**（订阅 OAuth、token 预算）。同时，架构级创新（OpenAI Agents API 后端、语义状态 + runahead computer use、自调优 harness）在 RFC 层面密集涌现，预示下一轮能力跃迁。

---

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新（24h） | 500（新开/活跃 308，关闭 192） | 500（新开 223，关闭 277） |
| PR 更新（24h） | 500（open 289，合并/关闭 211） | 500（open 285，合并/关闭 215） |
| 新版本发布 | 无（社区期待 9.5 修复版） | 无（当前 v0.21.0） |
| Issue 净趋势 | 净增 +116，积压扩大 | 净减 -54，积极消化 |
| 核心风险 | P0 升级链路失败 + 资源泄漏积压 | session-state / 消息投递系统性风险 |
| 健康度评估 | **高产出、高负债**：维护者投入密集但 P0 存续 3+ 个月（#91588） | **修复导向、健康上升**：salvage 式批量修复节奏快，但 285 open PR 评审压力大 |

两者绝对活跃度相当（均触及 500 条/日的统计上限），但**质量曲线方向相反**：OpenClaw 新开 Issue 超过关闭（用户投诉涌入），Hermes 关闭超过新开（债务下降）。

---

## 3. OpenClaw 在生态中的定位

**优势：**
- **研发纵深与规模**：XL 级重构 PR（#153764 更新激活链路、#153683 存储压缩）由核心维护者（@steipete 等）亲自主导，工程能力与 issue 分诊体系（P0/P1、queueable-fix、release-blocker 标签）明显成熟。
- **企业级/集群场景**：632-agent 集群、多 Teams bot、配对节点工作区等诉求表明其已进入大规模部署区间，是同类中唯一明确服务 7×24 集群用户的项目。
- **可观测与兜底设计**：doctor 自动生成 sanitized 恢复报告、更新失败自动回滚，被用户明确认可。
- **前瞻性架构投资**：OpenAI Agents API 原生后端（#151176）、云桌面 CUA（#152060）、"Everything is a cron" 统一原语（#110950，maintainer 发起）。

**风险：** 升级链路（9.4→9.5 多形态失败、silent and unactionable）正在累积信任成本，且 #153764 处于 landing hold，修复版尚未落地。

**与 Hermes 的路线差异：** OpenClaw 走“平台化 + 多后端抽象”路线（gateway 架构、可插拔 model runtime）；Hermes 更侧重**个人自托管 + 全平台 IM 桥接**的纵深打磨（iMessage/BlueBubbles、SimpleX 等长尾渠道覆盖更全）。社区规模上 OpenClaw 的 issue 编号（15 万级）远高于 Hermes（11 万级），历史累积用户基数更大，集群/企业用户占比更高；Hermes 社区 RFC 与 pain-miner 机制活跃，提案质量高但决策响应（如 #25267 OAuth blocked 4 个月）偏慢。

---

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent | 具体诉求 |
|---|---|---|---|
| **升级/自更新可靠性** | #152759、#152884、#153704、#151467（P0 重灾区） | #43837（Windows 更新 10 分钟）、#117663（update 误杀网关） | 升级必须原子、可回滚、失败可诊断 |
| **消息投递可靠性** | #139847、#144809（回合中消息丢失） | `risk-session-state` + `risk-message-delivery` 高频标签、#86106、#52694 | IM 场景下消息不丢、不错会话、不重复 |
| **WAL / 持久化治理** | #143524（WAL 1.4–2.8GB 无限增长） | #110054（deleted-WAL 无恢复路径） | SQLite WAL 检查点失效/损坏是两项目共同痛点 |
| **子进程/MCP 生命周期** | #97616（僵尸进程）、#144911（MCP 初始化崩溃 Gateway） | #117556（bridge.pid 误杀）、#117597（MCP OAuth） | 子进程回收与 MCP 容错是 Gateway 稳定性基石 |
| **成本与计费模式** | claude-cli 认证/工具策略问题 | #25267（Claude 订阅 OAuth，57👍）、#13983（16K token 开销） | 用户强烈要求“订阅制复用”，降低双重付费 |
| **computer use / 执行性能** | 云桌面原生 CUA（#152060） | #112639（语义状态 + runahead RFC） | 从“能操作”转向“脚本速度”的高性能执行 |

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 产品形态 | Gateway 中心的 agent 运行时平台，多 agent 集群 | 个人助理 + 桌面端（Desktop UI）+ 全渠道桥接 |
| 目标用户 | 7×24 集群部署、企业多租户、claude-cli 等多后端用户 | 自托管个人用户、多设备/移动端（Android/Termux 刚修复）用户 |
| 架构重心 | 更新激活/恢复链路、存储与事件循环性能、多 model-runtime 抽象 | session-state、压缩/摘要回退、平台兼容性（macOS/Windows/Android） |
| 生态策略 | 对接 OpenAI Agents API、MCP、CUA，平台化扩张 | 深耕 IM 长尾渠道（SimpleX、BlueBubbles、飞书）+ 社区 RFC 驱动 |
| 质量阶段 | 功能面扩张期，可靠性债集中爆发 | 修复/巩固期，安全边界与平台适配系统性收敛 |

---

## 6. 社区热度与成熟度

- **第一梯队（OpenClaw、Hermes Agent）**：均触及 500 条/日统计上限，属最高活跃层。
  - **OpenClaw — 快速迭代 + 债务累积期**：289 open PR、P0 积压 3+ 个月，维护者产出密集但升级链路风险未消化，口碑成本正在累积。
  - **Hermes Agent — 质量巩固期**：关闭（277）> 新开（223），teknium1 批量修复线覆盖安全/Desktop/MCP，健康度趋势向好；短板是高热需求（订阅 OAuth、跨网关协作）决策滞后。
- 判断依据提示：OpenClaw 用户以“规模与稳定性”为核心诉求，Hermes 用户以“个人体验与渠道覆盖”为核心诉求——两者成熟度曲线不同，不宜直接比较绝对健康度。

---

## 7. 值得关注的趋势信号

1. **“可升级性”成为新的核心竞争力**：两项目升级失败均为高热痛点。对开发者的启示：自更新机制需原子 handoff + 流式 inventory + 可诊断失败信息（OpenClaw #154035 是值得跟踪的参考实现）。
2. **可靠性标签体系兴起**：Hermes 的 `risk-session-state`/`risk-message-delivery` sweeper 标签、OpenClaw 的 queueable-fix/release-blocker 分级，表明社区治理正向**风险域聚类**演进——agent 框架的 QA 需要按故障域而非单点 bug 组织。
3. **成本敏感驱动计费模式博弈**：订阅 OAuth 需求（57👍）持续 blocked，说明个人 agent 的繁荣受制于上游模型厂商协议；多后端抽象（OpenClaw 的 Agents API 后端）是对冲手段。
4. **SQLite WAL/持久化是 agent 运行时的公共薄弱层**：两项目独立踩坑（无限增长 / 损坏无恢复），提示 agent 开发者应将存储引擎的检查点与恢复路径作为一等公民设计。
5. **架构创新进入 RFC 密集期**：自调优 harness（仅保留统计显著改进）、语义状态 + runahead 执行、"Everything is a cron" 统一原语——共同指向**agent 运行时的确定性化与自我优化**，是 1–2 个版本周期内值得提前布局的方向。
6. **运维自治成为用户隐性需求**：7×24 用户被迫自建 cron 清理/重启，意味着“内置资源治理 + 生命周期告警通道”（Hermes #76780）将是低成本高回报的差异化功能。

**对 OpenClaw 的战略建议**（呼应其日报结论）：下一版本以升级可靠性为唯一主题，解除 #153764 landing hold、合入 #154035，是遏制信任流失的最优路径。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目日报 — 2026-09-21

## 1. 今日速览

Hermes Agent 今日保持极高活跃度：过去 24 小时内 Issues 更新 500 条（新开/活跃 223，关闭 277），PR 更新 500 条（待合并 285，已合并/关闭 215），无新版本发布。Issue 关闭数（277）明显超过新开数（223），显示维护团队在积极消化积压，项目健康度良好。从 PR 构成看，@teknium1 主导了大量“salvage”式修复 PR（从他人废弃分支抢救修复），覆盖安全边界、Desktop 体验、MCP OAuth、压缩回退等多个方向。热点议题集中在会话状态稳定性（session-state）与消息投递可靠性，是当前最集中的风险域。

---

## 2. 版本发布

今日无新版本发布。最新代码变更仍在 main 分支累积，建议关注近期是否会有切版（参考 Issue 中提及当前版本为 v0.21.0）。

---

## 3. 项目进展

今日已合并/关闭的代表性 PR：

- **Android/Termux 安装修复落地**：两个同类 PR 先后关闭，将 `uvloop` 改为可选依赖，解决 Android Bionic 环境下 libuv 无法构建导致安装彻底失败的问题（[#116014](https://github.com/NousResearch/hermes-agent/pull/116014)、[#116153](https://github.com/NousResearch/hermes-agent/pull/116153)，修复 #116016）。
- **磁盘清理误删防护**：`guess_category()` 不再把 git worktree 内的 `test_*` 回归测试文件当作可清理临时文件自动删除（[#115307](https://github.com/NousResearch/hermes-agent/pull/115307)）。
- **WhatsApp 桥接误杀防护**：旧版 `bridge.pid`（仅 PID 无启动时间指纹）不再误 SIGTERM 无关进程（[#117556](https://github.com/NousResearch/hermes-agent/pull/117556)）。
- **测试基建加固**：npx 缓存预热 stub 补齐（[#115048](https://github.com/NousResearch/hermes-agent/pull/115048)）、mocked kernel 流正确终止（[#115917](https://github.com/NousResearch/hermes-agent/pull/115917)）、自动 lint 修复（[#117573](https://github.com/NousResearch/hermes-agent/pull/117573)）。

待合并的高质量修复 PR（多数来自 teknium1 的批量修复线）：

- **安全类**：Python 代码读取凭证文件在插件准入中判为 dangerous（[#117577](https://github.com/NousResearch/hermes-agent/pull/117577)）；bang shell 在 sanitizer 不可导入时 fail-closed 而非泄漏全部环境变量/API key（[#117585](https://github.com/NousResearch/hermes-agent/pull/117585)）。
- **Desktop 体验**：时间线跳转后编辑器失效（[#117664](https://github.com/NousResearch/hermes-agent/pull/117664)）、私有链接触发系统 passkey 弹窗（[#117661](https://github.com/NousResearch/hermes-agent/pull/117661)）。
- **模型/压缩**：摘要模型失败回退主模型（[#117665](https://github.com/NousResearch/hermes-agent/pull/117665)）、压缩阈值默认 256K 上限保留（[#117595](https://github.com/NousResearch/hermes-agent/pull/117595)）、profile 自有 catalog 校验（[#117566](https://github.com/NousResearch/hermes-agent/pull/117566)）。
- **MCP/CLI**：Google MCP OAuth 获取 refresh token + device flow 修复（[#117597](https://github.com/NousResearch/hermes-agent/pull/117597)）；429 限额错误不再误报为认证失败、Kanban worker 正确 TEMPFAIL（[#117611](https://github.com/NousResearch/hermes-agent/pull/117611)）。
- **平台**：SimpleX RGBA 截图投递（[#117603](https://github.com/NousResearch/hermes-agent/pull/117603)）、macOS search_files EPERM（[#117583](https://github.com/NousResearch/hermes-agent/pull/117583)）、Windows update 后误杀网关（[#117663](https://github.com/NousResearch/hermes-agent/pull/117663)）。

整体判断：修复节奏快、覆盖面广，尤其安全边界和平台兼容性明显进步；但 285 个待合并 PR 的积压量值得注意。

---

## 4. 社区热点

- **[#88584](https://github.com/NousResearch/hermes-agent/issues/88584)（124 评论）**：自动化的 Nous-to-Enterkey 合并在 `cron/jobs.py` 冲突被阻断，dashboard 更新器停留在旧版本。高评论量反映社区对 CI/交付链路稳定性的焦虑，且已标记 invalid——存在流程争议。
- **[#97681](https://github.com/NousResearch/hermes-agent/pull/97681) → [Issue #97681](https://github.com/NousResearch/hermes-agent/issues/97681)（28 评论）**：跨网关 Bot 协作群聊、不依赖 Desktop 常开——多设备/自托管用户的核心场景诉求。
- **[#25267](https://github.com/NousResearch/hermes-agent/issues/25267)（20 评论，57 👍）**：Claude 订阅 OAuth 接入（Codex 式），避免“订阅 + API 双重付费”。👍 最高的需求之一，但长期 blocked / needs-decision，涉及计费模式。
- **[#112639](https://github.com/NousResearch/hermes-agent/issues/112639)（15 评论）**：RFC——语义状态 + runahead 执行实现“脚本速度”的 computer use，社区对性能架构讨论热烈。
- **[#111237](https://github.com/NousResearch/hermes-agent/issues/111237)（12 评论）**：自调优 harness（本地夜间进化循环、仅保留统计显著的改进），是社区驱动的 agent 自我优化方向系列提案之一。

---

## 5. Bug 与稳定性

**P1（严重）**：
- [#86106](https://github.com/NousResearch/hermes-agent/issues/86106)：Desktop 切换会话后消息持久化到过期会话（UI 与后端日志不一致）——数据完整性风险，暂无 fix PR。
- [#110054](https://github.com/NousResearch/hermes-agent/issues/110054)：deleted-WAL 防护触发后无产品内恢复路径（本周 4 条 Discord 线程 + 13 个 issue），needs-decision。

**P2（重要）**：
- [#95459](https://github.com/NousResearch/hermes-agent/issues/95459)：Desktop 重启后内嵌浏览器拒绝所有 agent 操作（isActiveEvent 误判）。
- [#76767](https://github.com/NousResearch/hermes-agent/issues/76767)：Desktop 查看 Telegram 会话时回复不投递到 Telegram（零投递义务）。
- [#54572](https://github.com/NousResearch/hermes-agent/issues/54572)：patch 工具 replace 模式在非精确匹配时可能改错区域——有正确性风险。
- [#52694](https://github.com/NousResearch/hermes-agent/issues/52694)：后台进程通知被误读为用户消息，回复到过期 Discord DM 锚点。
- [#34372](https://github.com/NousResearch/hermes-agent/issues/34372) / [#30708](https://github.com/NousResearch/hermes-agent/issues/30708)：BlueBubbles 重复处理 iMessage、产生并行会话——长期未修。
- [#103904](https://github.com/NousResearch/hermes-agent/issues/103904)：cron 时区漂移（UTC 持久化导致华沙时区晚 2 小时触发）。
- 外部回归：[#114663](https://github.com/NousResearch/hermes-agent/issues/114663)（已关闭）Console Go 上游 400 导致所有工具调用对话失败。

**P3 / 已修复**：
- [#71650](https://github.com/NousResearch/hermes-agent/issues/71650)：toolset 校验先于插件加载产生误告警——与 [#52382](https://github.com/NousResearch/hermes-agent/issues/52382) 同属“过期 toolset 名无迁移清理”一类。
- 性能类已关闭：[#72589](https://github.com/NousResearch/hermes-agent/issues/72589)（feishu 模块级 import 阻塞首屏 1 分钟）、[#92244](https://github.com/NousResearch/hermes-agent/issues/92244)（/model 选择器串行阻塞 25-50s）。

---

## 6. 功能请求与路线图信号

- **Claude 订阅 OAuth**（[#25267](https://github.com/NousResearch/hermes-agent/issues/25267)，57 👍）：呼声最高但 blocked，短期内取决于 Anthropic 侧协议，非纯工程问题。
- **Auto reasoning mode**（[#40306](https://github.com/NousResearch/hermes-agent/issues/40306)）：ChatGPT 式自动推理强度，P2 + needs-decision，配合成本/用量标签，很可能纳入版本规划。
- **跨网关 Bot 协作**（[#97681](https://github.com/NousResearch/hermes-agent/issues/97681)）：契合多设备/自托管主线，与近期 session-state 修复方向一致。
- **网关生命周期专用告警通道**（[#76780](https://github.com/NousResearch/hermes-agent/issues/76780)）：小而实用，落地成本低。
- **RFC 系列**（[#112639](https://github.com/NousResearch/hermes-agent/issues/112639)、[#111237](https://github.com/NousResearch/hermes-agent/issues/111237)）：computer use 性能与自调优属于长线架构投资，社区讨论已成型，暂未见对应实现 PR。
- 从今日 PR 看下一版本大概率包含：Android/Termux 安装支持、MCP Google OAuth 修复、多个安全边界收紧、Windows update 修复。

---

## 7. 用户反馈摘要

**痛点**：
- **安装/更新慢且脆弱**：Windows `hermes update` 约 10 分钟（[#43837](https://github.com/NousResearch/hermes-agent/issues/43837)）、TUI/dashboard 每次启动重复构建（[#45657](https://github.com/NousResearch/hermesResearch/hermes-agent/issues/45657)，已关闭）、Android 安装彻底失败（已修）——非 Linux 平台体验明显滞后。
- **会话/投递可靠性**是最大不满来源：消息进错会话、投递丢失、重复处理，标签中 `sweeper:risk-session-state` + `sweeper:risk-message-delivery` 高频出现，说明这是系统性风险域。
- **Token 成本敏感**：默认 16K token 开销引发抱怨（[#13983](https://github.com/NousResearch/hermes-agent/issues/13983)，已关闭）、对订阅制 OAuth 的强烈需求。
- **恢复能力缺失**：WAL 损坏后用户只能重启或求助 agent 本身，往往越弄越糟。

**满意点**：修复响应速度快（多 issue 当周关闭）、平台适配广（Telegram/Discord/iMessage/WhatsApp/SimpleX/飞书）、社区提案质量高（RFC 与 pain-miner 机制运转良好）。

---

## 8. 待处理积压

| Issue | 存续时间 | 状态 | 建议 |
|---|---|---|---|
| [#25267](https://github.com/NousResearch/hermes-agent/issues/25267) Claude 订阅 OAuth | ~4 个月（5/13 起） | blocked, needs-decision | 57 👍 的最高需求，建议给出官方立场或路线图说明 |
| [#30708](https://github.com/NousResearch/hermes-agent/issues/30708) BlueBubbles 去重缺失 | ~4 个月（5/23 起） | open | 与 #34372 同根因，iMessage 用户体验持续受损，建议合并处理 |
| [#54572](https://github.com/NousResearch/hermes-agent/issues/54572) patch 工具误编辑 | ~3 个月（6/29 起） | open, P2 | 文件编辑正确性风险，优先级应上调 |
| [#52382](https://github.com/NousResearch/hermes-agent/issues/52382) messaging toolset 无迁移 | ~3 个月（6/25 起） | open | 属于易修复的配置迁移问题 |
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) 跨网关协作 | ~3 周（8/29 起） | open | 28 评论的高热需求，期待维护者表态 |
| [#110054](https://github.com/NousResearch/hermes-agent/issues/110054) WAL 恢复缺失 | P1 | needs-decision | 每周持续产生新报告，需产品级方案而非文档兜底 |

另提醒：**285 个待合并 PR** 中 teknium1 系列修复 PR 质量高、描述完整，建议加速评审合并，避免二次积压。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*