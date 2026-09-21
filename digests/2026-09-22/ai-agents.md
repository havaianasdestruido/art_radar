# OpenClaw 生态日报 2026-09-22

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-09-21 23:15 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 — 2026-09-22

## 1. 今日速览

OpenClaw 今日保持高度活跃：过去 24 小时内 Issues 更新 500 条（新开/活跃 458，关闭 42），PR 更新 500 条（待合并 301，已合并/关闭 199），并发布了 1 个新版本 v2026.7.35。新 Issue 开启速率远超关闭速率（约 10:1），表明社区反馈涌入但维护消化能力承压。工程主线集中在 Gateway 性能优化（会话读取、成员快照复用、内存索引批量化）和升级/更新链路可靠性修复。总体健康度：**活跃度高、贡献pipeline充实，但高严重级 Bug（P0 回归、数据丢失类）积压值得关注**。

---

## 2. 版本发布

### v2026.7.35 — Gateway-only `extended-stable`（LTS 等效）发布
🔗 [Releases](https://github.com/openclaw/openclaw/releases)

- **定位**：仅面向 Gateway 的长期支持通道，基于 2026 年 7 月底代码基线 + 关键安全更新 + 可靠性/性能修复 + 新模型支持。
- **迁移注意**：追求最新功能应使用最新版 **2026.9.5**；生产环境（尤其 systemd/长驻部署）建议留在 `extended-stable` 跟随安全补丁。
- ⚠️ 值得注意：最新版 2026.9.5 本身正被多个 P0 升级/回归问题困扰（见第 5 节），短期内 `extended-stable` 可能是更稳妥的生产选择。

---

## 3. 项目进展

今日关闭/合并的 199 条 PR 中代表性工作（注：今日数据以 OPEN/CLOSED 状态为主，以下为活跃推进的 PR）：

**性能与架构**
- [#154727](https://github.com/openclaw/openclaw/pull/154727) `perf: prepare subagent facts for session and task reads`（P1，XL，security-sensitive）— 消除 Gateway 事件循环上对注册表的重复全量扫描，直接回应 #44925 等子代理编排可靠性问题。
- [#154707](https://github.com/openclaw/openclaw/pull/154707) `perf(sessions): reuse worker membership snapshots across viewers`（XL）— 多 viewer Gateway 请求线程性能改善，关联会话卡顿类反馈。
- [#155135](https://github.com/openclaw/openclaw/pull/155135) `perf(memory): batch bounded embedding vector encoding`（XS）— memory-core 索引 CPU 优化。
- [#153683](https://github.com/openclaw/openclaw/pull/153683) `refactor: compact agent storage and index full-text maintenance`（XL）— 存储压缩 + 全文维护索引化。

**修复（已关闭，修复落地或验证完成）**
- [#155207](https://github.com/openclaw/openclaw/pull/155207) `fix(codex): reset native context after history cuts`（P1）— 修复 Codex 原生对话在回退/切分支后“记住已删除轮次”。
- [#155254](https://github.com/openclaw/openclaw/pull/155254)（已关闭）— CI 冻结源准入减少 2,942 次冗余 Git 对象探测，节省 6.1s。
- [#154920](https://github.com/openclaw/openclaw/pull/154920)（已关闭）— 更新失败摘要保留失败步骤的真实原因，直接改善 #146637 类升级排障体验。
- [#155248](https://github.com/openclaw/openclaw/pull/155248)（已关闭）— Security Review 在瞬时 GitHub 状态发布错误后可自动恢复。

**平台覆盖**
- [#155071](https://github.com/openclaw/openclaw/pull/155071) `fix(windows)`（P1）— Windows Gateway 模型运行元数据持久化失败修复。
- [#149882](https://github.com/openclaw/openclaw/pull/149882) FreeBSD root-owned 前台更新支持（XL，兼容性/安全边界风险标签）。

**整体判断**：工程重心清晰指向「Gateway 热路径性能 + 升级可靠性 + 跨平台覆盖」，301 条待合并 PR 中大量已标记 "ready for maintainer look"，合并吞吐是当前瓶颈。

---

## 4. 社区热点

| Issue | 评论 | 主题 |
|---|---|---|
| [#44925](https://github.com/openclaw/openclaw/issues/44925) | 29 | **子代理完成结果静默丢失**（P1，🦞 diamond lobster）— 多种失败模式下无重试、无通知、无超时自动重启，涉及数据/消息丢失 |
| [#91009](https://github.com/openclaw/openclaw/issues/91009) | 25 | **Codex PreToolUse hook 中继进程打满 CPU 并阻塞 Gateway RPC**（P0，crash-loop） |
| [#42475](https://github.com/openclaw/openclaw/issues/42475) | 23 | 网关级 per-agent 成本预算（日/月上限）功能需求 — 反映运营方对失控消费的担忧 |
| [#115908](https://github.com/openclaw/openclaw/issues/115908) | 22 | **会话转录投影 reconcile 持续写入下活锁**，同步重建阻塞主线程数十秒、冻结所有 channel 传输（P1，diamond lobster） |
| [#48003](https://github.com/openclaw/openclaw/issues/48003) | 20 | steer 模式无法在主会话中途注入消息 — 已定位到 3 月引入的 `KeyedAsyncQueue` 回归，有 linked PR |
| [#153257](https://github.com/openclaw/openclaw/issues/153257) | 19 | 「2026.9.5 把稳定环境变成 8 小时故障恢复」— 情绪强烈的新版升级灾难报告 |

**诉求分析**：讨论热度最高的问题集中在三条主线：①子代理/多代理编排可靠性（静默丢失、活锁、进程泄漏）；②升级链路（9.3→9.4→9.5 连续翻车）；③运营成本与资源控制（预算上限、token 浪费）。#153257 的标题式抱怨是新版本发布质量的直接警号。

---

## 5. Bug 与稳定性（按严重程度）

### P0 / 阻塞级
1. **#91009** — Codex hook 中继 100%+ CPU、Gateway RPC 停摆。**未见直接 fix PR**（#155214 覆盖相邻的 provider 暂停路径）。
2. **#153257** — 2026.9.5 升级后崩溃级不稳定（ux-release-blocker）。维护者已加 needs-info 标签，**无 fix PR**。
3. **#146637** — 9.3→9.4 npm 全局安装 swap 失败 — ✅ 相关修复：#154920（失败原因保留，已关闭）。
4. **#154114** — `openclaw update` 候选演练阶段误报"No usable, authenticated, tool-capable inference route"（9.4→9.5 升级受阻）。**修复进行中但未落地**。
5. **#70903** — Provider 402 后文件级 `disabledUntil` 冷却在充值后仍阻塞数小时。**长期无 fix PR**。
6. **#40001** — write 工具无 append 模式，cron 隔离会话覆盖共享文件导致数据丢失。**长期无 fix PR**。

### P1 / 高
7. **#44925** — 子代理结果静默丢失（29 评论）— 部分相关：#155000（子代理 reasoning-only 终止轮重试，需证明）、#154727（注册表读取性能）。
8. **#115908** — 转录投影活锁阻塞全部传输。**未见直接 fix PR**。
9. **#148707** — 9.4 回归：并发 run 顶替在途轮次导致回复丢失（"no active tool authority snapshot"）。**无 fix PR**。
10. **#97616** — hook/tool 子进程未回收，僵尸进程累积致运行时退化。**无 fix PR**。
11. **#154571**（已关闭）— 9.5 外部插件加载每次泄漏 ~430MB 临时目录 — 当日报告、当日关闭，响应迅速 👍。

**结论**：升级路径是当前最集中的稳定性雷区；多个 P0/P1 数据丢失类问题长期缺 fix PR，是最大的健康度隐患。

---

## 6. 功能请求与路线图信号

近期可能纳入版本的（有活跃 PR 或维护者参与）：
- **[#153340](https://github.com/openclaw/openclaw/pull/153340)** 插件动态两阶段 skill/tool 预过滤（决策模型）— 直接回应 #14785（工具 schema 固定 ~3,500 token/会话税），状态 needs proof，落地概率较高。
- **[#153625](https://github.com/openclaw/openclaw/pull/153625)** swarm 原生收集器认知配置文件 — 多代理差异化搜索轨迹方向。
- **[#154874](https://github.com/openclaw/openclaw/pull/154874)**（P1）Claude 后台研究未完成时先投递已完成回复 — 回复投递策略演进。
- **[#142153](https://github.com/openclaw/openclaw/pull/142153)** cron 自动化定义代际化（Always allow 授权失效重审）— 安全语义收紧，接近合并。

长期路线图信号（维护者标签 tracking/umbrella）：
- **#77700** Prepared Runtime Resolution Migration（维护者 tracking）— 热请求路径停止重复解析运行时信息。
- **#74704** SDK app-client happy path 稳定化。
- **#69208** 跨 channel 重复转录/回放/context 组装 umbrella。

用户呼声高但尚无工程动作的：#42475（成本预算）、#50093（WhatsApp 断线消息回填）、#53763（内置 headless 浏览器）、#71058（单网关多 Teams bot）。

---

## 7. 用户反馈摘要

**痛点（按频次/强度）**
- **升级焦虑**：#153257「真心后悔升级到 9.5」、#146637/#154114 连续版本升级失败——用户在自动化更新与手动更新两条路径上都受挫。
- **静默失败比崩溃更伤信任**：#44925、#148707、#50093 共同主题是“无重试、无通知、消息/数据直接消失”。
- **Token 成本焦虑**：#67419（bootstrap 文件每轮重注入浪费 20-30% 上下文）、#14785（工具 schema 固定 3.5k token）、#42475（无预算护栏）。
- **长对话退化**：#53408 — 15+ 轮后 write/exec 参数被静默丢弃。

**满意点**
- #73537 用户明确表达长期依赖（Telegram + 自动化 + Home Assistant 家庭/商业助手），诉求是“生产就绪”标签而非弃用。
- #154571 当日报告当日关闭，展示维护者对资源泄漏类问题的快速响应能力。
- 深度推理模型（kimi-k2.5、DeepSeek-R1）用户群在增长（#68596），生态多样性良好。

**典型场景画像**：Linux 服务器 + systemd + Telegram/Discord/Teams 多 channel 网关、多代理并行批处理、cron 自动化记忆任务、LiteLLM 代理路由。

---

## 8. 待处理积压（维护者关注清单）

| Issue | 年龄 | 状态 | 风险 |
|---|---|---|---|
| [#44925](https://github.com/openclaw/openclaw/issues/44925) | 6 个月 | 无 fix PR，needs-product-decision | 子代理数据丢失，热度第一 |
| [#40001](https://github.com/openclaw/openclaw/issues/40001) | 6.5 个月 | P0，无 fix PR | 共享文件静默覆盖 |
| [#70903](https://github.com/openclaw/openclaw/issues/70903) | 5 个月 | P0，ux-release-blocker，stale | 计费恢复后仍被锁数小时 |
| [#69208](https://github.com/openclaw/openclaw/issues/69208) | 5 个月 | umbrella（maintainer 标签） | 跨 channel 重复消息体系性问题 |
| [#48003](https://github.com/openclaw/openclaw/issues/48003) | 6 个月 | linked PR open（4 👍） | 已定位回归根因但 PR 未落地 |
| [#53408](https://github.com/openclaw/openclaw/issues/53408) | 6 个月 | stale | 长对话参数丢失 |
| [#91009](https://github.com/openclaw/openclaw/issues/91009) | 3.5 个月 | P0 crash-loop | CPU 打满 + RPC 停摆，无 fix |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 3 个月 | P1 | 僵尸进程累积 |

**PR 侧积压**：301 条待合并中，多条 P1 已标 "👀 ready for maintainer look"（#154727、#154874、#155071、#155194 等），建议优先评审。另注意 #155194（Doctor 重复归档仲裁，P1，session-state/availability 风险）目前 "⏳ waiting on author"。

**健康度总评**：社区输入极度活跃、工程产出质量高且规范（尺寸/风险/证明标签体系成熟），但 **P0 级数据丢失与升级回归的消化速度明显落后于新报告速度**，建议维护者将升级链路（#153257/#154114/#146637）和子代理静默丢失（#44925/#115908）列为下个版本的最高优先级。

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析 — 2026-09-22

## 1. 生态全景

个人 AI 助手/智能体开源生态已进入“高频迭代 + 规模化运维”阶段：头部项目日均在 500 条量级的 Issue/PR 更新中运转，社区输入速度已接近或超过维护消化能力。技术重心从“功能可用”转向**网关化架构（Gateway）、多渠道消息接入（Telegram/Discord/WhatsApp/Teams）、多代理编排可靠性**。两大痛点主题跨项目高度重合——升级链路可靠性与会话/消息数据静默丢失，成为生态成熟度的新分水岭。同时企业化信号（受控 rollout、成本预算、安全边界）开始密集出现，预示赛道正从爱好者工具向生产级平台演进。

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issue 更新（24h） | 500（新开/活跃 458，关闭 42） | 495（新开/活跃 366，关闭 129） |
| Issue 关闭率 | ~9% | ~26% |
| PR 更新（24h） | 500（待合并 301，合并/关闭 199） | 500（待合并 359，合并/关闭 141） |
| Release | v2026.7.35（Gateway-only extended-stable，LTS 通道） | v0.21.4 / v2026.9.21（稳定 tag，打包 ~1,800 PR） |
| 健康度 | 输入极活跃但消化承压：P0 数据丢失/升级回归积压，10:1 开关比失衡 | 高频迭代且收敛有序：29% PR 合并率，长期性能 bug（内存泄漏、DB 损坏）落地修复 |

**关键差异**：OpenClaw 是“贡献 pipeline 充实但合并吞吐成瓶颈”；Hermes 呈“战役式收敛”（profile 多路复用、WAL 恢复聚类），维护响应闭环更快（对比：Hermes 官方发起痛点聚类 #110054 vs OpenClaw 多个 P0 长期无 fix PR）。

## 3. OpenClaw 在生态中的定位

**优势**：
- 工程流程成熟度高：PR 尺寸/风险/证明标签体系（XS–XL、security-sensitive、needs proof）是生态内标杆；
- 双通道发布策略（extended-stable LTS + 最新版）显示对生产部署用户的明确承诺；
- 子代理编排（swarm 收集器、subagent facts）、cron 自动化、跨平台覆盖（FreeBSD/Windows）广度领先。

**劣势/风险**：
- 升级链路连续翻车（9.3→9.4→9.5，#153257“8 小时故障恢复”），且最新版被 P0 回归困扰，LTS 通道反而成为避险选择；
- 数据丢失类 P0/P1（#44925 子代理静默丢失 6 个月、#40001 文件覆盖 6.5 个月、#70903 计费锁死 5 个月 stale）长期缺 fix PR。

**技术路线差异**：OpenClaw 走“多代理并行 + 网关热路径性能优化”路线；Hermes 走“Desktop/UI 体验 + 消息平台适配器 + 多 profile 单网关多路复用”路线。OpenClaw 更偏服务器端 headless 编排，Hermes 更偏端侧与多渠道交付。

**社区规模**：两者日活跃量级相当（Issue 495–500、PR 500），但 Hermes 关闭/合并吞吐高 2–3 倍，负反馈消化能力目前更强。

## 4. 共同关注的技术方向

| 方向 | OpenClaw | Hermes Agent | 具体诉求 |
|---|---|---|---|
| **升级链路可靠性** | #146637、#154114、#153257（update 误报、安装 swap 失败） | #58746（update 拉 main 而非稳定 tag）、#118597 | 自托管用户要求“一键升级可回滚、指向稳定 tag” |
| **会话/消息静默丢失** | #44925、#148707、#48003 | #68321、#117867、#110054（WAL 恢复聚类） | “数据在库里、UI/编排层丢”是跨项目共性信任问题 |
| **消息平台适配精细化** | #50093（WhatsApp 回填）、#71058（多 Teams bot） | WhatsApp 三连 PR（#118586/#118565/#118511） | WhatsApp 正在快速追平 Discord/Telegram/Slack 成为一等公民 |
| **成本/资源护栏** | #42475（per-agent 预算）、#67419（bootstrap token 浪费）、#97616（僵尸进程） | #77111（语音 PR 统一接口治理） | 运营方对失控消费与资源泄漏的治理需求 |
| **安全边界收紧** | #142153（cron 授权代际化）、#149882（root 边界） | #59293（config set 绕过审批）、#118606（终端注入） | 智能体权限模型的“最小授权”重构 |
| **企业/规模化部署** | systemd/长驻部署是核心场景画像 | #118029（SSH 托管 rollout 控制平面） | Fleet 管理与受控发布 |

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 多代理编排（subagent/swarm）、cron 自动化、Gateway 性能 | Desktop 体验、多 profile 多路复用、Bot Mode 群聊感、语音（RealtimeVoiceProvider ABC RFC） |
| 目标用户 | Linux 服务器 + systemd 运营方，Telegram/Discord/Teams 多渠道网关，批量编排重度用户 | 自托管个人助手用户 + Desktop/多设备用户，企业 SSH 托管方向初显 |
| 架构 | Gateway 中心化、事件循环热路径优化、可插拔存储演进中 | SQLite 零配置默认 + 可插拔会话存储、Electron Desktop、Footprint Ladder 治理 |
| 模型生态 | kimi-k2.5、DeepSeek-R1、LiteLLM 代理路由多样 | Kimi 等提供商 + Nous Portal 自有计费（含计费信任问题） |
| 发布策略 | LTS（extended-stable）+ 最新版双通道 | 稳定 tag 打包 + hermes update 渠道（修复中） |

## 6. 社区热度与成熟度

- **两者均处生态头部活跃层**（日均 500 级更新），但节奏不同：
  - **OpenClaw：快速迭代但质量承压期**。新 Issue 开启 10 倍于关闭，多个 P0 数据丢失问题 5–6.5 个月无 fix，升级回归集中爆发——典型“增长快于消化”信号。
  - **Hermes Agent：质量巩固期**。26% Issue / 28% PR 关闭率，长期性能 bug（renderer CPU 30-65%、5GB 内存、state.db 损坏）批量落地修复，v0.21.4 打包收敛，战役式推进（profile 多路复用进入强迁移门控）。
- 信任修复动作对比鲜明：Hermes 官方主动发起痛点聚类 issue（teknium1 的 #110054）；OpenClaw 单点响应快（#154571 当日关闭）但系统性积压待解。

## 7. 值得关注的趋势信号

1. **“静默失败”是智能体信任的头号杀手**：跨项目最热议题均为无重试/无通知的数据与消息丢失。对开发者的启示：编排框架必须内建可观测的失败语义（重试、超时、死信通知），而非依赖用户发现。
2. **升级链路正成为 AI 基础设施的第二战场**：两项目不约而同在“update 可靠性”上密集投入。智能体长期驻留 + 高频发版的组合，要求“分阶段 rollout + 可回滚 + LTS 通道”成为标配。
3. **成本与资源治理从 nice-to-have 变刚需**：per-agent 预算、token 税优化（OpenClaw #14785 的 3.5k schema 税、两阶段工具预过滤）、进程/内存泄漏治理——运营成本直接决定智能体能否生产化。
4. **消息渠道收敛为标准能力**：WhatsApp 快速补齐状态 reaction/presence/生命周期语义，说明“IM 原生体验”（而非 bot 模拟）是用户留存关键。
5. **接口先行 + 治理机制兴起**：Hermes 的 RealtimeVoiceProvider ABC RFC 与 Footprint Ladder、OpenClaw 的 PR 证明标签体系，表明社区正从“先合并再说”转向“先定契约”——智能体框架的模块化程度已成为架构竞争力指标。
6. **企业化前奏**：受控 rollout 控制平面、授权代际化、终端注入防护等议题涌现，预示 2026 下半年个人 AI 助手赛道将向 fleet 级/组织级部署演进。

**给技术决策者的一句话**：OpenClaw 适合需要重度多代理编排、且有能力锁定 extended-stable 的团队；Hermes 适合重视端侧体验与升级平滑度的自托管用户。两者共同的短板——会话可靠性——正是选型时应重点验收的维度。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目日报 — 2026-09-22

## 1. 今日速览

Hermes Agent 今日保持极高活跃度：24 小时内 Issues 更新 495 条（新开/活跃 366，关闭 129），PR 更新 500 条（待合并 359，合并/关闭 141），并发布了 patch 版本 **v0.21.4 (v2026.9.21)**。关闭率约 26%（Issues）、28%（PR），吞吐健康。活跃焦点集中在 Desktop 端 session 状态相关 bug、Gateway profile 多路复用战役，以及 WhatsApp/Telegram 等消息平台适配器的持续打磨。整体项目呈“高频迭代 + 大版本收敛”的典型成熟开源项目节奏。

## 2. 版本发布

**[v2026.9.21: Hermes Agent v0.21.4](https://github.com/NousResearch/hermes-agent/releases)**（2026-09-21）

- **性质**：Patch 版本，将 v0.21.3 以来约 **~1,800 个已合并 PR** 打包为稳定 tag，面向下游消费者（Docker 镜像、Hermes Cloud、托管部署）。
- **破坏性变更**：暂无明确说明，完整 curated notes 延后发布，建议下游部署者在详细 changelog 出炉前在预发环境验证。
- **迁移建议**：使用 `hermes update` 的用户需注意 [#58746](https://github.com/NousResearch/hermes-agent/issues/58746) 反映的问题——`hermes update` 目前拉取 `main` 而非最新稳定 tag，升级渠道仍待修正。

## 3. 项目进展

今日合并/关闭的重要变更：

- **[PR #117813（已关闭）可插拔会话存储](https://github.com/NousResearch/hermes-agent/pull/117813)**：引入 profile 级、可插拔的对话历史后端，同时保持 SQLite 作为零配置默认，`SessionDB` 仍是第一方持久化门面——架构层面的重要铺垫（虽本 PR 关闭，方向已被 tracking issue 接管）。
- **[Issue #109417（已关闭）profile 多路复用战役收尾](https://github.com/NousResearch/hermes-agent/issues/109417)**：单个 `hermes gateway run` 服务所有 profile 的目标进入强迁移门控阶段，配套 PR [#118449](https://github.com/NousResearch/hermes-agent/pull/118449)（Settings 页按显示的 "Applies to" profile 读写）修复了多路复用下的配置错位。
- **[PR #118597](https://github.com/NousResearch/hermes-agent/pull/118597)**：`hermes update` 修复 2026.7 之前无法在 exit 78 停车的 system gateway unit，fleet 升级路径更稳。
- **[Issue #71206（已关闭）](https://github.com/NousResearch/hermes-agent/issues/71206)**：macOS launchd Gateway 被本地网络隐私（nehelper）阻断的问题已解决。
- **[Issue #102198（已关闭）](https://github.com/NousResearch/hermes-agent/issues/102198)**：SIGTERM 后 ~0.9s 的写入打穿 state.db page 0 导致 "file is not a database" 的 P1 严重 bug 已修复。
- **[Issue #77311（已关闭）](https://github.com/NousResearch/hermes-agent/issues/77311)**：Desktop renderer 无限增长至 5GB 的内存问题已处理。

总体看，本日推进以 **Desktop 性能/会话稳定性修复** 和 **Gateway 安装升级链路加固** 为主线，配合 v0.21.4 的打包发布，形成了一次实质性的稳定性收敛。

## 4. 社区热点

- **[#88584（127 评论）](https://github.com/NousResearch/hermes-agent/issues/88584)** — 自动化 Nous→Enterkey 定时集成在 `cron/jobs.py` 冲突受阻。评论量远超其他条目，反映社区对上游自动集成流水线可靠性的高度关注。
- **[#97681（28 评论，👍2）](https://github.com/NousResearch/hermes-agent/issues/97681)** — 跨 Gateway 的 Bot 协作、不依赖 Desktop 常开的群组聊天。多设备/自托管用户的核心诉求。
- **[#77111（27 评论）](https://github.com/NousResearch/hermes-agent/issues/77111)** — RFC：四个竞争的全双工语音 PR 需要统一 `RealtimeVoiceProvider` ABC 而非排队合并。项目治理模式（Footprint Ladder 规则）正在起作用，接口先行的呼声强烈。
- **[#110912（27 评论，已关闭）](https://github.com/NousResearch/hermes-agent/issues/110912)** — Nous Portal 在订阅额度用尽后对部分模型路由按牌价计费（疑似折扣路由 bug），涉及真金白银的计费问题，社区敏感度极高。
- **[#59293（15 评论）](https://github.com/NousResearch/hermes-agent/issues/59293)** — `hermes config set` 可绕过审批层写保护的安全问题，安全边界讨论持续。
- **[#38007（👍19，最高的 reaction）](https://github.com/NousResearch/hermes-agent/issues/38007)** — Windows/Linux 系统托盘后台运行，长尾高需求功能。

## 5. Bug 与稳定性（按严重度）

**P1**
- **[#100573](https://github.com/NousResearch/hermes-agent/issues/100573)** Linux/Electron 40.10.2 上 `string_view::substr` 越界导致的反复 SIGTRAP 崩溃。暂无对应 fix PR。
- **[#110054](https://github.com/NousResearch/hermes-agent/issues/110054)** 痛点聚类：deleted-WAL 守卫触发后无产品内恢复路径（本周 4 个 Discord 线程 + 13 个 issue），P1 待决策。

**P2**
- **[#117867](https://github.com/NousResearch/hermes-agent/issues/117867)**（今日新报）Desktop warm-resume 时最新一轮对话在完成瞬间消失——session 渲染问题家族又一成员。已有相关方向的 PR 活跃（如 #118600 历史媒体预览缺失处理）。
- **[#118004](https://github.com/NousResearch/hermes-agent/issues/118004)**（今日新报）Windows SSH 模式下终端面板永不启动（空白、无 pty、无日志）。
- **[#68321](https://github.com/NousResearch/hermes-agent/issues/68321)** 切换会话后所有 assistant 消息消失（DB 完好），长期未解。
- **[#66429](https://github.com/NousResearch/hermes-agent/issues/66429)** Kimi 提供商下空 assistant 消息的失控循环。
- **[#89412](https://github.com/NousResearch/hermes-agent/issues/89412)** MCP OAuth 仅在 401 挑战时触发，Google Gmail MCP 等无挑战服务器无法登录。

**P3 / 低危**
- **[#96355](https://github.com/NousResearch/hermes-agent/issues/96355)** `delegate_task` 在 output_schema 校验失败时仍返回 completed。
- **[#103410](https://github.com/NousResearch/hermes-agent/issues/103410)** TUI 热重载压缩配置在外部 LCMEngine 上崩溃。
- **[#118606](https://github.com/NousResearch/hermes-agent/pull/118606)（PR，今日新）**：`hermes peer` 输出未消毒 peer 控制的文本，存在 ANSI/OSC 终端注入风险——安全修复 PR 已提交。

**已修复（今日关闭）**：#98394（renderer 重渲染循环 30-65% CPU）、#102198（state.db 损坏）、#71206（macOS LAN 阻断）、#77311（内存泄漏）。

## 6. 功能请求与路线图信号

- **[PR #109044](https://github.com/NousResearch/hermes-agent/pull/109044)** `reasoning_effort: "auto"` — 基于请求形态的确定性逐轮思考级别解析，无额外 LLM 调用；配合 #61334（Anthropic 兼容层 effort 降级 bug），reasoning effort 很可能是下个版本主题之一。
- **[#118029](https://github.com/NousResearch/hermes-agent/issues/118029)**（今日新）SSH 托管安装的统一受控 rollout 控制平面，且强制绑定 #92618 企业安全保证——企业部署方向信号明确。
- **[#110054](https://github.com/NousResearch/hermes-agent/issues/110054)** 官方（teknium1）发起的痛点聚类 issue，产品内 WAL 恢复 UX 大概率排入近期路线。
- **WhatsApp 生态密集投入**：[#118586](https://github.com/NousResearch/hermes-agent/pull/118586)（👀→✅/❌ 处理状态 reaction，对齐 Discord/Telegram/Slack）、[#118565](https://github.com/NousResearch/hermes-agent/pull/118565)（显式 presence 端点）、[#118511](https://github.com/NousResearch/hermes-agent/pull/118511)（登出会话停止重启 bridge）——WhatsApp 适配器正在快速追平其他平台。
- **[#117520](https://github.com/NousResearch/hermes-agent/issues/117520) / [#117867 家族]**：Bot Mode 的“群聊感”打磨（轻量社交化回复），社区对 Bot Mode 体验的诉求在上升。
- **[#97681](https://github.com/NousResearch/hermes-agent/issues/97681)** 跨 Gateway Bot 协作 + **#77111 语音 ABC** 属中期架构议题。

## 7. 用户反馈摘要

- **Desktop 会话渲染是最大痛点群**：消息消失（#68321、#117867）、重复气泡（#70108）、空白面板（#118004）——共同点是“数据库完好、UI 层出错”，用户对数据安全的信任尚在，但对 UI 可靠性不满情绪明显。
- **自托管/运维用户**呼唤更平滑的升级路径（#58746 要求 update 指向稳定版；#118592 修复更新等待期的假启动失败；#118597 修复老 unit 停车失败）——“`hermes update` 一把梭”的体验正在被系统性修补。
- **消息平台重度用户**（WhatsApp/Telegram/iMessage）反馈集中在投递可靠性细节：markdown 降级为纯文本（#118591）、登出后 bridge 疯狂重启（#118511）、bot 回复迟缓且轮询驱动（#92760）。
- **付费用户**对 Portal 计费透明度敏感（#110912），问题虽已关闭，但需要官方在 release notes 中明确披露根因以重建信任。
- **积极面**：v0.21.4 的稳定 tag 发布、内存泄漏/重渲染循环等长期性能问题的落地修复获得好评；Bot Mode 和多 profile 多路复用的推进被自托管社区视为“终于听进去了”的方向。

## 8. 待处理积压

| 条目 | 状态 | 说明 |
|---|---|---|
| [#100573](https://github.com/NousResearch/hermes-agent/issues/100573) | P1，9/1 报告 | Linux SIGTRAP 崩溃，无 fix PR，Electron 上游联动可能需要 |
| [#20849](https://github.com/NousResearch/hermes-agent/issues/20849) | 5/6 报告，P2 | 复杂编码工作流下的上下文丢失/截断覆盖/记忆架构缺陷，4 个月未根治 |
| [#38007](https://github.com/NousResearch/hermes-agent/issues/38007) | 6/3 报告，👍19 | 系统托盘后台运行，最高赞功能请求，长期无认领 |
| [#59293](https://github.com/NousResearch/hermes-agent/issues/59293) | 7/6 报告，P2 安全 | `hermes config set` 绕过审批层，needs-decision 挂起近 3 个月，建议优先裁决 |
| [#89412](https://github.com/NousResearch/hermes-agent/issues/89412) | 8/18 报告，P2 | MCP OAuth 主动触发缺失，标注 duplicate 但上游问题似仍未解 |
| [#84361](https://github.com/NousResearch/hermes-agent/issues/84361) | 8/12 报告 | Desktop MEDIA 文件链接双缺陷（regex + 字符串拼接 URL），影响媒体工作流 |
| [#96355](https://github.com/NousResearch/hermes-agent/issues/96355) | 8/27 报告，needs-repro | `delegate_task` 状态与校验结果不一致，影响编排可靠性 |

**建议**：安全类（#59293）与 P1 崩溃（#100573）应进入维护者本周议程；session 渲染 bug 家族（#68321/#117867/#70108）建议开设统一 tracking issue 集中归因。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*