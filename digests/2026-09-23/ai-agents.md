# OpenClaw 生态日报 2026-09-23

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-09-22 22:55 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-09-23

---

## 1. 今日速览

OpenClaw 今日保持高活跃度：过去 24 小时内 Issues 更新达 **500 条**（新开/活跃 476，关闭仅 24），PR 更新 **500 条**（待合并 372，已合并/关闭 128），无新版本发布。社区讨论焦点集中在 **Gateway 稳定性（内存泄漏、CPU 空转、crash-loop）** 和 **消息投递可靠性（Telegram/Feishu/Discord 静默丢消息）** 两大主题。维护者 @steipete 持续高频提交性能与 CI 优化 PR，代码层面向好，但多个 P0 级稳定性 Issue 长期挂着 `no-new-fix-pr` / `needs-maintainer-review` 标签，Issue 关闭率（24/500 ≈ 4.8%）显著偏低，积压压力持续上升。

---

## 2. 版本发布

今日**无新版本发布**。最新版本仍为 2026.9.5（npm stable），但该版本已暴露新问题（见 #152689 Codex catalog retry 填满 tmpdir，虽已关闭但值得关注是否彻底修复）。

---

## 3. 项目进展

今日合并/关闭 PR 共 128 条（数据未逐一列出），从活跃 PR 侧写可见以下方向持续推进：

**性能与 Gateway 线程健康**（对应多个 P0/P1 稳定性 Issue）：
- [#147914](https://github.com/openclaw/openclaw/pull/147914) 将冷历史 metadata 准备移出 Gateway 线程（L，ready for maintainer look）— 直接回应 #119720 事件循环阻塞问题
- [#154069](https://github.com/openclaw/openclaw/pull/154069) transcript 投影发布移出主线程（XL）
- [#155995](https://github.com/openclaw/openclaw/pull/155995)、[#155997](https://github.com/openclaw/openclaw/pull/155997) 减少会话列表/fanout 期间的重复分配与编码 — 与 #91588 内存泄漏治理方向一致

**更新器可靠性**：
- [#155355](https://github.com/openclaw/openclaw/pull/155355) 验证每一次受管 Gateway 重启（XL，兼容性风险）— 关联 #153377、#111372 等 restart-loop 类问题
- [#147629](https://github.com/openclaw/openclaw/pull/147629) dev channel 更新保护 dirty checkout

**产品功能**：
- [#155256](https://github.com/openclaw/openclaw/pull/155256) 用户可从 Profile/聊天中编辑个人指令（USER.md）
- [#148399](https://github.com/openclaw/openclaw/pull/148399) 聊天附件内嵌 PDF 预览
- [#153340](https://github.com/openclaw/openclaw/pull/153340) 基于决策模型的技能/工具两阶段动态预过滤，降低每回合 ~1,800+ token 开销

**实时语音（Talk）集中修复**：#155688 / #155838 / #155839 三个 XL 级 PR 修复 Grok realtime 会话、语音咨询阻塞只读计数等问题。

总体评估：**主线明显在为“下一版本的性能与稳定性”蓄力**，性能类 PR 密集且多为 maintainer 亲自操刀，但大量处于 "needs proof" / "waiting on author" 状态，合并节奏受 CI 验证流程约束。

---

## 4. 社区热点

| 排名 | Issue | 评论 | 核心议题 |
|---|---|---|---|
| 1 | [#91588](https://github.com/openclaw/openclaw/issues/91588) | 33 👍 | **P0** Gateway 内存泄漏：RSS 350MB→15.5GB，OOM crash-loop，自 6 月悬置至今 |
| 2 | [#119720](https://github.com/openclaw/openclaw/issues/119720) | 22 | 同步 agent 持久化/transcript 维护阻塞事件循环，部分修复已落地（#140231、#138984） |
| 3 | [#126360](https://github.com/openclaw/openclaw/issues/126360) | 18 | 多 agent 显式 ownership 下 `AgentSelectionRequiredError` 刷爆日志，需产品决策 |
| 4 | [#114612](https://github.com/openclaw/openclaw/issues/114612) | 16 | memory-core SQLite 表（`memory_index_chunks`/`memory_embedding_cache`）无保留策略，磁盘无限增长 |
| 5 | [#96834](https://github.com/openclaw/openclaw/issues/96834) | 16 | WhatsApp 图片消息使主 lane 卡死 ~3 分钟 |

**诉求分析**：热议 Issue 集中在**长期运行的生产实例资源管理**（内存、磁盘、CPU）与**多 agent 架构下的状态一致性**。大量 Issue 被打上 `clawsweeper-recovery-stuck`（恢复卡住）标签，表明社区对“问题被机器人分诊但无人认领修复”的流程有不满情绪——`clawsweeper:no-new-fix-pr` 出现在几乎所有头部 Issue 上。

---

## 5. Bug 与稳定性（按严重程度）

**P0 — 关键**：
- [#91588](https://github.com/openclaw/openclaw/issues/91588) Gateway 内存泄漏致 OOM crash-loop 🟡 **无专属 fix PR**（#155995/#155997 为间接缓解）
- [#111372](https://github.com/openclaw/openclaw/issues/111372) macOS 上 Gateway 无限 SIGTERM 重启循环（2026.7.1-2 回归，stable 用户）🟡 无 fix PR
- [#89278](https://github.com/openclaw/openclaw/issues/89278) Codex OAuth 刷新超 10s 导致 cron/heartbeat 全挂 🟢 有关联开放 PR
- [#136203](https://github.com/openclaw/openclaw/issues/136203) Windows de-DE 升级后 Doctor 维护被阻塞 🟢 标记 fix-shape-clear/queueable-fix
- [#152689](https://github.com/openclaw/openclaw/issues/152689)（已关闭）2026.9.5 Codex catalog 重试循环以 342MB/次填满 tmpdir

**P1 — 高**：
- [#119720](https://github.com/openclaw/openclaw/issues/119720) 事件循环阻塞 🟢 部分修复落地，对应 [#147914](https://github.com/openclaw/openclaw/pull/147914) 推进中
- [#136183](https://github.com/openclaw/openclaw/issues/136183) 命令执行器 spawn ssh 挂起（2026.8.1 回归）🟡 无 fix PR
- [#134993](https://github.com/openclaw/openclaw/issues/134993) / [#134925](https://github.com/openclaw/openclaw/issues/134925) 大规模 skill/agent 场景下 Gateway 单核打满（文件系统发现 busy loop / 每回合 100% CPU）🟡 无 fix PR
- [#113701](https://github.com/openclaw/openclaw/issues/113701) 大型工具输出撑爆上下文窗口，compaction 无法恢复，会话进入失败循环 🟡 无 fix PR
- [#126246](https://github.com/openclaw/openclaw/issues/126246) / [#125764](https://github.com/openclaw/openclaw/issues/125764) Telegram 出站消息卡在 `send_attempt_started`，重启即丢；网络失败一次即永久 dead-letter 🟡 无 fix PR（相关 #128872 在途）

**P1 — 数据丢失类（值得单独警示）**：
- [#112259](https://github.com/openclaw/openclaw/issues/112259) 入站消息可被**静默丢弃**，无重试/死信/用户可见失败
- [#113306](https://github.com/openclaw/openclaw/issues/113306) SQLite 快照恢复缺少端到端崩溃与身份保证
- [#125570](https://github.com/openclaw/openclaw/issues/125570) Skill Workshop 更新覆盖 live skill 描述，静默破坏技能路由

---

## 6. 功能请求与路线图信号

可能进入下一版本的信号（已有 PR 支撑或 maintainer 参与）：
- **个人指令编辑（USER.md）**：[#155256](https://github.com/openclaw/openclaw/pull/155256) 已 ready for maintainer look，落地概率高
- **PDF 内嵌预览**：[#148399](https://github.com/openclaw/openclaw/pull/148399) proof sufficient，接近合并
- **工具/技能动态预过滤**：[#153340](https://github.com/openclaw/openclaw/pull/153340) 直指 token 成本与工具幻觉，社区呼声高
- **决策评估框架（Labs opt-in）**：[#155134](https://github.com/openclaw/openclaw/pull/155134)（已关闭，疑被 supersede/重开迭代）

仍在产品决策阶段的请求：
- [#53763](https://github.com/openclaw/openclaw/issues/53763) 内置 headless 浏览器（13 评论，长期呼声）
- [#10687](https://github.com/openclaw/openclaw/issues/10687) OpenRouter 等动态模型发现（👍4）
- [#99583](https://github.com/openclaw/openclaw/issues/99583) 会话智能自动命名
- [#120244](https://github.com/openclaw/openclaw/issues/120244) cron 维护窗口与角色隔离 RFC
- [#96975](https://github.com/openclaw/openclaw/issues/96975) 子 agent 完成结果与父上下文隔离

---

## 7. 用户反馈摘要

**真实痛点**：
- **生产长期运行不可靠**是最大痛点：内存泄漏（#91588）、磁盘无限增长（#114612）、CPU 打满（#134925 树莓派用户）多来自 7×24 部署在家庭服务器/容器/树莓派上的重度用户。
- **静默丢消息损害信任**：Telegram/Feishu/Discord 用户反复报告“agent 明明跑完了但回复没送达”，且无任何告警（#126246、#125764、#112259、#49381、#55694 的刷屏死循环）。
- **升级体验差**：多次升级引入回归（#134570 列出 7 个独立阻塞点、#136203 Windows、#111372 macOS restart loop），#73537 有用户恳请发布“生产就绪”稳定标签。
- **中文社区活跃**：#50490（飞书群聊 activation 失效）、#55694（工具死循环刷屏）反映飞书渠道为重要用户群体。

**满意点**：用户普遍认可产品价值（#73537：“已成为家庭和业务的日常助手”）；对 maintainer 的性能治理方向（off-thread 化系列 PR）和 clawsweeper 分诊机器人的透明度给予正面反馈。

---

## 8. 待处理积压（维护者关注建议）

| Issue/PR | 状态 | 呼吁 |
|---|---|---|
| [#91588](https://github.com/openclaw/openclaw/issues/91588) 内存泄漏 | 悬置 **3.5 个月**，33 评论，P0 | 🔴 最高优先级，直接关系 stable 版可用性 |
| [#111372](https://github.com/openclaw/openclaw/issues/111372) 无限重启循环 | P0，2 个月无 fix PR | 🔴 stable 用户被锁死在旧版 |
| [#114612](https://github.com/openclaw/openclaw/issues/114612) SQLite 无限增长 | 近 2 个月 | 🟠 数据丢失风险（磁盘写满） |
| [#112313](https://github.com/openclaw/openclaw/issues/112313) 死信队列永久无法清理 | 2 个月，无任何 CLI/RPC 出口 | 🟠 运维死角 |
| [#77467](https://github.com/openclaw/openclaw/issues/77467) MiniMax OAuth 无法自动刷新 | 4.5 个月，👍3 | 🟠 中国用户高频受影响 |
| [#96975](https://github.com/openclaw/openclaw/issues/96975) 子 agent 结果注入父上下文 | 已标 stale | 🟡 有真实性能影响，建议不 stale |
| PR [#136764](https://github.com/openclaw/openclaw/pull/136764)、[#147629](https://github.com/openclaw/openclaw/pull/147629) | waiting on author 3 周 | 🟡 提醒作者响应 |

**健康度小结**：开发吞吐与社区热度均为一线水准，但 **P0 稳定性债务的清偿速度跟不上新增速度**，`clawsweeper-recovery-stuck` 标签的普遍出现是流程瓶颈的明确信号。建议下一版本聚焦“资源治理 + 消息投递可靠性”双主题后再引入新功能。

---

## 横向生态对比

# 个人 AI 助手开源生态横向对比分析报告 — 2026-09-23

## 1. 生态全景

个人 AI 助手/自主智能体开源生态当前处于**高速成长与稳定性债务并存**的阶段：头部项目日均 Issue/PR 更新量均触及 500 条上限，社区热度一线水准。两项目均在无新版本发布的情况下高强度合并修复 PR，反映出生态共同痛点已从“功能丰富度”转向**长期运行可靠性**（内存/磁盘/存储损坏、消息投递、升级回归）。AI 辅助开发流程已深度嵌入（Hermes 的 bot 自动提交 PR、OpenClaw 的 clawsweeper 分诊机器人），同时带来新的流程瓶颈争议。自托管、7×24 家庭服务器/树莓派部署成为核心用户场景，倒逼项目向“生产就绪”演进。

## 2. 各项目活跃度对比

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新（24h） | 500（新开/活跃 476） | 500（新开/活跃 389） |
| Issue 关闭 | 24 | 111 |
| **Issue 关闭率** | **≈4.8% 🔴** | **≈22% 🟢** |
| PR 更新 | 500（待合并 372） | 500（待合并 419） |
| PR 合并/关闭 | 128 | 81 |
| Release | 无（最新 2026.9.5，已暴露新问题） | 无（Releases 为空） |
| 核心风险 | P0 内存泄漏悬置 3.5 月、stable 用户被回归锁死 | state.db 损坏簇、session-state 渲染簇 |
| 健康度评估 | 开发吞吐高但**稳定性债务清偿速度跟不上新增** | 收敛趋势可期，修复 PR 直接命中热点风险簇 |

**关键差异**：Hermes 的消化速度明显更健康；OpenClaw 的 `clawsweeper-recovery-stuck` 标签普遍出现是流程瓶颈的明确信号。

## 3. OpenClaw 在生态中的定位

**优势**：
- 社区热度与开发吞吐均为生态顶格（476 条新 Issue/日），用户基础更大、更国际化（含活跃中文/飞书社区）
- 维护者 @steipete 亲自操刀性能治理，off-thread 化系列 PR（#147914、#154069）技术方向清晰
- 功能广度领先：实时语音（Talk）、技能/工具动态预过滤（省 ~1,800 token/回合）、多渠道投递（Telegram/WhatsApp/飞书/Discord）

**技术路线差异**：OpenClaw 走“大而全的多渠道个人助手”路线，Gateway 单体架构承载消息路由+agent 编排；Hermes 更聚焦 Desktop 体验与 gateway 多路复用架构，插件生态（jev-router、mem0）更开放。

**短板**：相比 Hermes，OpenClaw 的 P0 债务悬置时间更长（#91588 达 3.5 个月），升级回归频发（macOS restart loop 锁死 stable 用户），`no-new-fix-pr` 标签大面积出现表明维护带宽已不足以覆盖社区规模。

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent | 诉求本质 |
|---|---|---|---|
| **存储可靠性** | #114612 SQLite 无限增长、#113306 快照恢复 | #100896 state.db 损坏×4、#119615 WAL 修复 | SQLite 单机存储在多写者/长运行场景下的数据安全 |
| **消息投递可靠性** | #126246/#125764 Telegram 卡死、#112259 静默丢消息 | #68502 Telegram 重复回复 | At-least-once 语义、死信队列、可观测告警 |
| **会话/上下文治理** | #113701 上下文撑爆无法 compaction | #68927/#118670 长任务渲染问题 | 长会话场景的上下文与状态一致性 |
| **升级/更新可靠性** | #111372 重启循环、#155355 重启验证 | #119603 update 429 重试、#88371 ImportError | 自更新是自托管产品的最大回归风险面 |
| **路由成本优化** | #153340 两阶段动态预过滤 | jev-router 插件（决策模型路由） | 降低 per-turn token 开销、工具幻觉 |
| **多 agent/gateway 协作** | #126360 ownership 决策、#96975 隔离 | #97681 跨 gateway Bot 协作 | 多 agent 架构下的状态一致性与协作 |

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 多渠道消息投递、实时语音、多 agent 编排 | Desktop 体验、Kanban 任务调度、插件体系 |
| 目标用户 | 7×24 自托管重度用户（家庭服务器/树莓派/容器）、多 IM 渠道用户 | Desktop 重度交互用户、多 provider/多 gateway 高级玩家 |
| 技术架构 | Gateway 单体为核心，稳定性风险集中在 Gateway 线程 | gateway 多路复用 + Electron Desktop，风险集中在 state.db 多写者 |
| 交付形态 | npm stable 渠道 + dev channel | 桌面应用 + CLI，Releases 尚空（早期） |

## 6. 社区热度与成熟度

- **两项目热度均处顶格**（日均更新触 500 上限），但成熟度阶段不同：
  - **OpenClaw：规模成熟、质量巩固阶段**——用户已将其作为“家庭和业务的日常助手”（#73537），但 P0 积压表明进入“以稳定性换信任”的关键期，社区对“生产就绪”稳定标签有明确诉求
  - **Hermes：快速迭代阶段**——Releases 为空、功能 PR 活跃（Lunar City 等大型 feature），issue 报告质量高（含复现路径与日志），用户群体专业度高，处于功能与稳定性并进的扩张期
- **分层信号**：Hermes 的 22% 关闭率 vs OpenClaw 的 4.8%，说明社区规模超越维护带宽是头部项目共同的下一道坎。

## 7. 值得关注的趋势信号

1. **“静默失败”成为信任头号杀手**：无告警的丢消息、空会话、静默数据回滚（Hermes #119626、OpenClaw #112259）比崩溃更损害信任——可观测性与显式降级 UX 是下一个产品竞争点（Hermes #110054 的“产品内引导式恢复”是先行信号）。
2. **token 成本工程化**：从模型路由（jev-router）到工具预过滤（OpenClaw #153340），基于决策模型而非 LLM 的 per-turn 路由成为活跃方向，对智能体开发者而言这是显著的降本杠杆。
3. **存储层是自托管智能体的阿喀琉斯之踵**：SQLite + WAL 在多写者场景的损坏问题两项目同时爆发，选型时需认真考虑单写者约束或引入嵌入式数据库的事务纪律。
4. **AI 辅助开发流程的双刃剑**：bot 自动提交 PR 提升吞吐，但 OpenClaw 的 `clawsweeper-recovery-stuck` 表明自动分诊若无匹配的人工修复带宽，会放大而非缓解积压。
5. **长任务/长会话是质量分水岭**：两项目的 P1 问题高度集中在多工具长 turn、后台任务、warm-resume 场景——智能体开发者应将长运行稳定性纳入测试矩阵的核心用例。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报（2026-09-23）

## 1. 今日速览

Hermes Agent 今日保持高活跃度：过去 24 小时内 Issues 更新 500 条（新开/活跃 389、关闭 111），PR 更新 500 条（待合并 419、合并/关闭 81），社区贡献热度处于高位，Issue 关闭率约 22%，消化速度健康。**今日无新版本发布**，主分支仍处于持续集大量修复 PR 的状态。议题焦点高度集中于 **Desktop 会话状态渲染与 state.db 存储可靠性**，多条 P1 级 Bug 围绕同一“session-state”风险簇展开，已形成明确的修复集群。此外 Kanban/调度器、SSH 同步、更新机制等方向今日新增多个高质量修复 PR，其中相当一部分由 bot 账号（@hermes-the-chat-bot）自动提交，显示项目已深度应用 AI 辅助开发流程。

## 2. 版本发布

今日无新版本发布，最新 Releases 列表为空，无破坏性变更或迁移事项。

## 3. 项目进展

今日 81 个 PR 被合并/关闭，重点待合并/新提交的 PR 显示项目在以下方向推进：

**会话状态 / Desktop 渲染（对应今日最热的 Bug 集群）：**
- [#119616](https://github.com/NousResearch/hermes-agent/pull/119616) — 会话终止后清理残留的 `running` 状态 turn activity，修复蓝色计时器幽灵计数（关联 #117867 一类“最新 turn 消失”问题）
- [#119183](https://github.com/NousResearch/hermes-agent/pull/119183) — 在 tool-result flush 前持久化 edit preview，保证冷加载/第二窗口可见性
- [#119613](https://github.com/NousResearch/hermes-agent/pull/119613) — 修复 hydrate 后 auto-speak 重读同一 turn（关联 #93515）
- [#119184](https://github.com/NousResearch/hermes-agent/pull/119184) — 延迟图片加载时保持 image frame 高度稳定

**存储层（state.db / WAL）：**
- [#119615](https://github.com/NousResearch/hermes-agent/pull/119615) — gVisor 9p 挂载下保留 WAL（修正 #98965 的跨 VM 文件系统误判），直接缓解 #100896 一类 WAL 禁用过宽问题

**Kanban 调度器（bot 自动提交系列）：**
- [#119625](https://github.com/NousResearch/hermes-agent/pull/119625) / [#119623](https://github.com/NousResearch/hermes-agent/pull/119623) / [#119624](https://github.com/NousResearch/hermes-agent/pull/119624) / [#119622](https://github.com/NousResearch/hermes-agent/pull/119622) — 区分 timed_out 成因、报告崩溃尝试的真实输出、处理不可解析的 pinned skill、修正 stop-gate nudge 触发条件

**后端与更新：**
- [#119626](https://github.com/NousResearch/hermes-agent/pull/119626) — 防止 SSH 文件同步中过期数据静默回滚新写入（三种失败变体）
- [#119603](https://github.com/NousResearch/hermes-agent/pull/119603) — `hermes update` 遇 GitHub 429 时用已有凭据重试（关联 #105857）
- [#119621](https://github.com/NousResearch/hermes-agent/pull/119621) — 精确允许同级 gateway profile 的 systemd 重启
- [#119629](https://github.com/NousResearch/hermes-agent/pull/119629) — mem0 插件 per-turn 同步的 `sync_infer` 可配置化，统一显式/隐式写路径语义

**生态扩展：** [#119628](https://github.com/NousResearch/hermes-agent/pull/119628) 新增 jev-router 插件目录条目（基于决策模型而非 LLM 的 per-turn 模型路由）。

整体看，项目正在系统性地收敛 session-state 与存储可靠性两大风险面，kanban 子系统的可观测性修复密度高。

## 4. 社区热点

| Issue | 评论 | 热点分析 |
|---|---|---|
| [#88584](https://github.com/NousResearch/hermes-agent/issues/88584) 自动化 Nous 集成被阻塞（cron 合并冲突） | 132 | 长期最热议题，标注 invalid，涉及 `cron/jobs.py` 合并冲突与 dashboard 更新停滞，讨论已持续一个月以上，需维护者明确处理或关闭 |
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) 跨 gateway Bot 协作（P2 feature） | 29 | 高价值架构需求：不同 gateway 上的 Bot 在群组中协作、跨设备接管、保留各自模型/凭据，诉求清晰，社区期待高 |
| [#100896](https://github.com/NousResearch/hermes-agent/issues/100896) state.db 5 周 4 次损坏（P1，WAL 多写者） | 16 | 生产环境数据点扎实（"5 live SessionDB handles" 告警早于故障 7 分钟），与 #90837/#100313/#89737 同簇；#119615 可能部分缓解 |
| [#11941](https://github.com/NousResearch/hermes-agent/issues/11941) 邮件网关 HTML 支持 | 14 | 👍4，长期开放（4 月起），定时报告的 Markdown 渲染为强需求 |
| [#38007](https://github.com/NousResearch/hermes-agent/issues/38007) Desktop 系统托盘常驻 | 14 | **👍19，今日最高票**，Windows/Linux 关窗即退出、冷启动慢的痛点持续发酵 |
| [#119003](https://github.com/NousResearch/hermes-agent/issues/119003) kanban dispatch 静默销毁真实任务行 | 13 | 昨日新报，多路复用 gateway 下任务数据被 `t_running` 占位符替换，数据破坏级问题 |

## 5. Bug 与稳定性（按严重度）

**P1：**
- [#100896](https://github.com/NousResearch/hermes-agent/issues/100896) — state.db 损坏 ×4/5 周，WAL 多写者（gateway+dashboard）。相关：#119615 已提交（部分缓解）、#110054 痛点聚类
- [#117867](https://github.com/NousResearch/hermes-agent/issues/117867) — warm-resume transcript gate 下最新 turn 完成即消失。**有 fix 方向：#119616**
- [#100573](https://github.com/NousResearch/hermes-agent/issues/100573) — Linux Electron 40.10.2 反复 SIGTRAP 崩溃（`string_view::substr` 越界），尚无 fix PR
- [#68927](https://github.com/NousResearch/hermes-agent/issues/68927) — 长任务后 Enter 提交但 UI 不渲染用户消息
- [#118693](https://github.com/NousResearch/hermes-agent/issues/118693) — background review 期间 transcript 渲染失败
- [#72046](https://github.com/NousResearch/hermes-agent/issues/72046) — state.db 损坏时 Desktop 静默显示空/部分会话，缺显式降级状态与引导恢复
- [#110054](https://github.com/NousResearch/hermes-agent/issues/110054) — 痛点聚类：deleted-WAL guard 触发后无产品内恢复路径（周报：4 Discord 线程 + 13 issues）
- [#68502](https://github.com/NousResearch/hermes-agent/issues/68502) — Telegram gateway 重复处理入站消息导致重复回复

**P2：**
- [#119003](https://github.com/NousResearch/hermes-agent/issues/119003)（标注 P3 但具数据破坏性）— kanban dispatch 销毁任务行
- [#70108](https://github.com/NousResearch/hermes-agent/issues/70108) / [#118670](https://github.com/NousResearch/hermes-agent/issues/118670) — Desktop 重复渲染 assistant 回复（DB 中仅一份），后者昨日新报
- [#118900](https://github.com/NousResearch/hermes-agent/issues/118900) — 刷新后 assistant 回复消失（昨日新报）
- [#119195](https://github.com/NousResearch/hermes-agent/issues/119195) — 主/首备 provider 均限流时 Desktop 中止而非走完 fallback 链（昨日新报）
- [#47742](https://github.com/NousResearch/hermes-agent/issues/47742) — vision_analyze 快速路径导致仅支持 user-message 视觉的 provider 产生幻觉描述
- [#86565](https://github.com/NousResearch/hermes-agent/issues/86565) — 审批阻塞时 session 状态点不变色，影响后台会话可用性感知
- [#74922](https://github.com/NousResearch/hermes-agent/issues/74922) — 安全扫描器熔断忽略 fail_open 配置，3 次失败后静默放行命令（**安全相关，值得优先**）

**P3：** [#88371](https://github.com/NousResearch/hermes-agent/issues/88371) update 后 ImportError、[#75791](https://github.com/NousResearch/hermes-agent/issues/75791) Windows dashboard --status 误报、[#92352](https://github.com/NousResearch/hermes-agent/issues/92352) 切换 gateway 不刷新会话列表。

**今日已关闭的 Bug：** [#71650](https://github.com/NousResearch/hermes-agent/issues/71650)（插件 toolset 校验误报）、[#81563](https://github.com/NousResearch/hermes-agent/issues/81563)（macOS 本地网络权限）、[#50698](https://github.com/NousResearch/hermes-agent/issues/50698)（config set 吃掉注释）、[#71998](https://github.com/NousResearch/hermes-agent/issues/71998)、[#99640](https://github.com/NousResearch/hermes-agent/issues/99640)。

## 6. 功能请求与路线图信号

- **跨 gateway Bot 协作**（[#97681](https://github.com/NousResearch/hermes-agent/issues/97681)，P2）— 架构级需求，与 gateway multiplexing 方向一致，#119621（gateway 重启管控）是相关基础设施铺垫，大概率进入后续规划
- **Desktop 系统托盘**（[#38007](https://github.com/NousResearch/hermes-agent/issues/38007)）— 19 👍，需求成熟，建议优先排期
- **HTML 邮件支持**（[#11941](https://github.com/NousResearch/hermes-agent/issues/11941)）— 长期开放，实现路径清晰（multipart/alternative + Markdown 渲染）
- **PowerShell 终端支持**（[#36929](https://github.com/NousResearch/hermes-agent/issues/36929)）— Windows 生态补齐
- **HA watch 事件重定向到其他消息平台**（[#35060](https://github.com/NousResearch/hermes-agent/issues/35060)）
- **产品内恢复流程**（[#110054](https://github.com/NousResearch/hermes-agent/issues/110054)）— 痛点矿工自动聚类产出，来自官方账号，属内部识别的路线图项
- PR 侧信号：[#103263](https://github.com/NousResearch/hermes-agent/pull/103263)（Discord per-user 工具权限）表明共享 Bot 的细粒度权限控制是活跃方向

## 7. 用户反馈摘要

- **会话数据可靠性是最大信任杀手**：多个 P1 issue 反映“回复消失/重复渲染/刷新丢失”体验，虽多为 UI 层问题（DB 数据完好），但用户感知为“丢失回复”，信任损耗显著
- **存储损坏恢复缺位**：#110054 显示用户在 WAL guard 触发后只能重启、问 agent 或跑 `doctor --fix`，且往往越弄越糟——用户需要的是产品内引导式恢复
- **长会话/长任务场景暴露集中**：#68927、#118670 等均发生在多工具调用长 turn 后，重度用户受影响最大
- **多 provider/多 gateway 高级用法受挫**：fallback 链走不完（#119195）、多路复用 gateway 下任务被破坏（#119003）
- **满意度正面信号**：社区对插件体系（jev-router、mem0 配置化）参与积极；issue 报告质量普遍很高（含复现路径、日志证据），反映用户群体专业度高

## 8. 待处理积压

- [#88584](https://github.com/NousResearch/hermes-agent/issues/88584) — **132 条评论、8 月中旬至今**，自动化集成冲突悬而未决，建议维护者裁决（重新指派或关闭）
- [#100896](https://github.com/NousResearch/hermes-agent/issues/100896) — P1 存储损坏，需与 #110054/#72046 统一规划“多写者架构 + 恢复 UX”方案
- [#11941](https://github.com/NousResearch/hermes-agent/issues/11941)、[#38007](https://github.com/NousResearch/hermes-agent/issues/38007) — 高 👍 功能请求长期 needs-decision，建议排期表态
- [#100573](https://github.com/NousResearch/hermes-agent/issues/100573) — Linux SIGTRAP 崩溃 3 次+，无 fix PR，可能需上游 Electron 报告
- [#74922](https://github.com/NousResearch/hermes-agent/issues/74922) — 安全扫描器 fail-open 语义问题，标记 duplicate 但安全影响值得复核
- [#68502](https://github.com/NousResearch/hermes-agent/issues/68502) — Telegram 重复回复自 7 月下旬未关闭，消息投递风险标签长期挂起
- PR 侧：[#101552](https://github.com/NousResearch/hermes-agent/pull/101552)（Lunar City 交互世界）、[#103263](https://github.com/NousResearch/hermes-agent/pull/103263) 等大型 feature PR 已开放约 3 周，建议推进 review 以免贡献者流失

---

**健康度小结**：项目今日处于“高强度修稳定性”阶段，Issue 关闭/新增比（111/389）显示新报问题仍快于消化速度，但 419 个待合并 PR 中相当比例直接命中当前最热风险簇（session-state、WAL），收敛趋势可期。建议优先闭环 state.db 损坏恢复链路与 #88584 长尾争议。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*