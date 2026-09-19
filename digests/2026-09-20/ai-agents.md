# OpenClaw 生态日报 2026-09-20

> Issues: 500 | PRs: 500 | 覆盖项目: 2 个 | 生成时间: 2026-09-19 22:18 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/NousResearch/hermes-agent)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报 · 2026-09-20

---

## 1. 今日速览

OpenClaw 今日保持极高活跃度：过去 24 小时 Issues 更新 500 条（新开/活跃 337，关闭 163），PR 更新 500 条（待合并 303，已合并/关闭 197），并发布了 **v2026.9.5** 版本（64 个直接提交、4,179 个 PR、503 位贡献者）。但社区焦点明显集中在**升级/更新链路可靠性**上——2026.9.5 发布当天即涌现多个 P0 级升级失败报告（Codex 迁移、OAuth profile 丢失、doctor-failed 等），更新器质量问题已成为当前最大隐患。同时，长期存在的 Gateway 资源泄漏类问题（内存泄漏、zombie 进程、CPU 忙循环）持续活跃，维护者 @steipete 集中提交了一批更新器与启动性能修复 PR，节奏紧张但方向明确。

---

## 2. 版本发布

### v2026.9.5（2 个 Release，含 linux-stable 更新通道）

- **规模**：64 direct commits · 4,179 pull requests · 503 contributors
- **产物**：
  - [AppImage (amd64)](https://github.com/openclaw/openclaw/releases/download/v2026.9.5/OpenClaw-2026.9.5-amd64.AppImage)
  - [Debian 包 (amd64)](https://github.com/openclaw/openclaw/releases/download/v2026.9.5/OpenClaw-2026.9.5-amd64.deb)
  - [Release notes](https://docs.openclaw.ai/rele)

⚠️ **迁移注意事项（基于当日报告，升级前请评估）**：
1. **Codex retained-state 迁移不收敛**：从 2026.7.x 升级后 session-catalog 永久冷启动，会话列表为空（[#152744](https://github.com/openclaw/openclaw/issues/152744)，P0）
2. **Codex OAuth profile 丢失**：升级后所有 lane HTTP 401，回滚 2026.9.4 可恢复（[#152968](https://github.com/openclaw/openclaw/issues/152968)，P0）
3. **tmpdir 填充**：Codex resident catalog 重试循环反复写入 342 MB 插件快照（[#152689](https://github.com/openclaw/openclaw/issues/152689)，P0）
4. **更新本身失败**：2026.9.4 → 2026.9.5 报 `doctor-failed`，回滚成功但无诊断输出（[#152759](https://github.com/openclaw/openclaw/issues/152759)，P0）
5. **Windows 启动挂起**：sidecars.model-runtime 阶段卡 ~17 分钟后超时失败（[#152981](https://github.com/openclaw/openclaw/issues/152981)，P0）

**建议**：生产环境暂缓自动升级至 2026.9.5，等待 2026.9.6 或确认上述 P0 已修复（维护者修复 PR #153147 已就绪待合并，见下文）。

---

## 3. 项目进展

今日 PR 关闭/合并 197 条，主要推进方向：

**更新器与升级可靠性（本周主线）**
- [#153147](https://github.com/openclaw/openclaw/pull/153147) fix(update): 保留 Doctor 建议与终端报告 — 直接修复 #152759、#152918 等 6 个 P0/P1 更新失败 issue，**P0、ready for maintainer look**
- [#152466](https://github.com/openclaw/openclaw/pull/152466) fix: 前台 Gateway 更新替换运行时文件后失败 — P1，Linux 打包验证已通过，等待 CI 修复
- [#153178](https://github.com/openclaw/openclaw/pull/153178) fix: 更新 finalize 失败后验证 Gateway 恢复状态 — 修复 5 个 issue 的恢复观测缺失
- [#153093](https://github.com/openclaw/openclaw/pull/153093) fix(update): 防止长包更新期间的生命周期工作重叠
- [#150898](https://github.com/openclaw/openclaw/pull/150898) fix(update): 修复托管服务固定在旧安装的问题 — P1
- [#145335](https://github.com/openclaw/openclaw/pull/145335) fix: Node 前缀变更后完成 Gateway 升级 — P1，已挂起 9 天待合并

**启动与运行时性能**
- [#153183](https://github.com/openclaw/openclaw/pull/153183) refactor: 只读 workspace 快照移出主线程 — 针对启动卡顿类问题（#153067 等的前置）
- [#153125](https://github.com/openclaw/openclaw/pull/153125) perf(doctor): 历史转录转换从启动路径中延迟 — 缓解大数据库启动阻塞（#112423 系列）

**新能力**
- [#153124](https://github.com/openclaw/openclaw/pull/153124) feat(memory): 远程 workspace 上的记忆读写（Enterprise 联动）
- [#153126](https://github.com/openclaw/openclaw/pull/153126) feat(skills): agent 任务中使用远程 workspace Skills
- [#152652](https://github.com/openclaw/openclaw/pull/152652) feat(workspace): 上传文件投递到远程 harness
- [#153206](https://github.com/openclaw/openclaw/pull/153206) feat(compaction): 压缩后语义保真度检查 — 值得关注的上下文质量方向
- [#152057](https://github.com/openclaw/openclaw/pull/152057) feat(browser): 统一桌面/终端本地 Chrome 配置

整体看，项目在**远程 workspace/harness 分离架构**上投入显著（3 个 XL PR），更新器修复密集落地中。

---

## 4. 社区热点

| 排名 | Issue | 评论 | 热点分析 |
|---|---|---|---|
| 1 | [#149361](https://github.com/openclaw/openclaw/issues/149361) WebUI 性能与稳定性 Umbrella | 50 | 维护者维护的总索引，桌面/移动端 WebUI 卡顿与稳定性问题的集中诉求，社区持续补充复现证据 |
| 2 | [#97616](https://github.com/openclaw/openclaw/issues/97616) hook/tool 子进程泄漏成 zombie | 30 | 长期运行实例的核心痛点，导致运行时退化 |
| 3 | [#144911](https://github.com/openclaw/openclaw/issues/144911) MCP server 初始化超时导致 Gateway 崩溃 | 30 | P1，未捕获 rejection 路径，标记 queueable-fix 但尚无 fix PR 落地 |
| 4 | [#91588](https://github.com/openclaw/openclaw/issues/91588) Gateway 内存泄漏 350MB→15.5GB | 27 | 6 月报告至今未修，标签 needs-maintainer-review，OOM 反复重启 |
| 5 | [#115908](https://github.com/openclaw/openclaw/issues/115908) 转录投影重建 livelock 阻塞主线程 | 18 | 持续写入负载下所有 channel transport 停摆 |
| 6 | [#112423](https://github.com/openclaw/openclaw/issues/112423) 大 SQLite 转录清理阻塞事件循环 | 18 | 与 #115908、#118885 同属“大数据库同步 I/O”问题族 |

**PR 侧**：[#153147](https://github.com/openclaw/openclaw/pull/153147)（更新器修复，P0）和 [#153124](https://github.com/openclaw/openclaw/pull/153124)/[#153126](https://github.com/openclaw/openclaw/pull/153126)（远程 workspace）是当日最受关注的变更。

**核心诉求**：用户要求 ① 升级链路可预测、失败可诊断；② 长时间运行的 Gateway 不泄漏资源；③ 大状态库下的启动/运行性能。

---

## 5. Bug 与稳定性（按严重程度）

### P0（发布阻断级）
| Issue | 描述 | Fix 状态 |
|---|---|---|
| [#152744](https://github.com/openclaw/openclaw/issues/152744) | 2026.9.5 Codex 迁移不收敛，会话列表永久为空 | ❌ 无 fix PR |
| [#152968](https://github.com/openclaw/openclaw/issues/152968) | 2026.9.5 Codex OAuth "openai:default" 401 | ❌ 无 fix PR |
| [#152689](https://github.com/openclaw/openclaw/issues/152689) | Codex 重试循环填充 tmpdir（342MB/次） | ❌ 无 fix PR |
| [#152759](https://github.com/openclaw/openclaw/issues/152759) | 9.4→9.5 更新 doctor-failed 静默失败 | ✅ [#153147](https://github.com/openclaw/openclaw/pull/153147) ready |
| [#152981](https://github.com/openclaw/openclaw/issues/152981) | Windows 启动挂起 17 分钟（model-runtime 超时） | ❌ 无 fix PR |
| [#153177](https://github.com/openclaw/openclaw/issues/153177) | 更新失败 finalize:targetConfigConvergence | ✅ 相关 #153178 |
| [#151467](https://github.com/openclaw/openclaw/issues/151467) | v6.33→v9.4 自升级死锁 + 回滚 cron 失败 | ❌ needs-info |
| [#56217](https://github.com/openclaw/openclaw/issues/56217) | Secret provider crash-loop 耗尽 1Password 限流 | ❌ 3 月至今未修，P0 |

### P1（严重）
- [#91588](https://github.com/openclaw/openclaw/issues/91588) 内存泄漏致 OOM — ❌ 无 fix PR
- [#144911](https://github.com/openclaw/openclaw/issues/144911) MCP 超时崩溃 Gateway — ❌ 标记 queueable-fix 但无 PR
- [#115908](https://github.com/openclaw/openclaw/issues/115908) / [#112423](https://github.com/openclaw/openclaw/issues/112423) 事件循环阻塞族 — ⏳ 部分由 #153125/#153183 缓解
- [#97616](https://github.com/openclaw/openclaw/issues/97616) zombie 进程泄漏 — ❌ 无 fix PR
- [#134993](https://github.com/openclaw/openclaw/issues/134993) 文件系统发现忙循环占满 CPU 核 — ❌ 无 fix PR
- [#104992](https://github.com/openclaw/openclaw/issues/104992) **安全**：脱敏值 `***` 在会话恢复时回放进模型上下文 — ❌ 需安全评审
- [#143632](https://github.com/openclaw/openclaw/issues/143632) iMessage 消息 2-3 倍重投递且携带内部 envelope — ❌
- [#152961](https://github.com/openclaw/openclaw/issues/152961) 2026.9.5 WorkerThread 常驻占 1 CPU 核 + RSS 增长 — ❌
- [#153067](https://github.com/openclaw/openclaw/issues/153067) 稳态下每 5s 全量复制状态库（~5.9TB/天写入）— ⏳ #183183 相关

### 已关闭的正面信号
- [#144712](https://github.com/openclaw/openclaw/issues/144712) npm global install swap 失败误报 — CLOSED
- [#145070](https://github.com/openclaw/openclaw/issues/145070) systemd doctor --fix 重验证失败 — CLOSED
- [#150204](https://github.com/openclaw/openclaw/issues/150204) Talk gemini-3.8-live consult 转录竞态 — CLOSED
- [#149106](https://github.com/openclaw/openclaw/issues/149106) Gateway 冻结 31 分钟 — CLOSED

---

## 6. 功能请求与路线图信号

| 需求 | 状态 | 纳入下一版本可能性 |
|---|---|---|
| LLM 流量拦截/修改 hooks（[#115988](https://github.com/openclaw/openclaw/issues/115988)） | 讨论中，两度 PR 被拒，需产品决策 + 安全评审 | 中期 |
| 远程 workspace 记忆/Skills/附件（[#153124](https://github.com/openclaw/openclaw/pull/153124)、[#153126](https://github.com/openclaw/openclaw/pull/153126)、[#152652](https://github.com/openclaw/openclaw/pull/152652)） | PR 活跃开发中 | **高，明确路线图方向（Gateway/Harness 存储分离）** |
| 压缩语义保真检查（[#153206](https://github.com/openclaw/openclaw/pull/153206)） | 新 PR，依赖 #152237 | 中 |
| Telegram 人性化 topic 名（[#7406](https://github.com/openclaw/openclaw/issues/7406)） | 2 月至今 P2 未动 | 低 |
| 便携式 QA 证据包（[#138098](https://github.com/openclaw/openclaw/issues/138098)） | 讨论中 | 中期 |
| Codex 任务 schema 约束（[#137450](https://github.com/openclaw/openclaw/pull/137450)） | ready for maintainer look | **高** |

---

## 7. 用户反馈摘要

**痛点（真实使用场景提炼）**：
- **升级即事故**：多位用户（Linux Mint、macOS x64、Oracle Cloud aarch64）反映 `openclaw update` 在不同阶段失败，回滚虽可用但无诊断信息，"silent and unactionable" 是高频评价
- **7×24 场景不可靠**：把 OpenClaw 当常驻助手跑 iMessage/WhatsApp/Discord 通道的用户遭遇消息重复投递、监听器丢失、48 小时后进程冻结 31 分钟
- **重度数据用户被惩罚**：大型 SQLite 状态库（GB 级）触发启动阻塞、tmpdir 填满、磁盘写入暴涨（5.9TB/天）——用得越久问题越重
- **安全顾虑**：脱敏值回放（#104992）和子代理原始输出绕过请求方（#150498）引发信任担忧

**满意点**：
- 回滚机制基本可靠（多次报告“rollback succeeds/restores”）
- Issue 分诊体系（clawsweeper 标签、rating 分级）透明度高，社区报告质量高
- 维护者 @steipete 对更新器问题的响应速度今日明显加快

---

## 8. 待处理积压（维护者关注清单）

| 项目 | 挂起时长 | 说明 |
|---|---|---|
| [#56217](https://github.com/openclaw/openclaw/issues/56217) 1Password crash-loop | **~6 个月**，P0 | 长期 needs-product-decision，影响生产认证 |
| [#91588](https://github.com/openclaw/openclaw/issues/91588) 内存泄漏 | **~3.5 个月**，P1，27 评论 | 最高的资源类 issue，无 fix PR |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) zombie 进程 | ~3 个月，P1 | 回归类，30 评论 |
| [#104992](https://github.com/openclaw/openclaw/issues/104992) 脱敏回放（安全） | ~2 个月 | 需安全评审排期 |
| [#112423](https://github.com/openclaw/openclaw/issues/112423) / [#118885](https://github.com/openclaw/openclaw/issues/118885) 大库同步 I/O | ~2 个月 | needs-product-decision，#153125 可部分缓解 |
| [#121232](https://github.com/openclaw/openclaw/issues/121232) memory dreaming "Ranked N, Promoted 0" | ~1.5 个月 | 功能完全失效型 bug |
| [#119702](https://github.com/openclaw/openclaw/pull/119702) ReDoS 防护 PR | **~1.5 个月** waiting on author，security-review-required | 安全相关 PR 长期滞留 |
| [#145335](https://github.com/openclaw/openclaw/pull/145335) Node 前缀升级修复 PR | 9 天，P1，ready | 多个更新失败 issue 依赖此 PR 合并 |

**健康度小结**：OpenClaw 社区参与度和工程节奏优秀（单日 500 issue / 500 PR 活动），但 **Gateway 长时运行稳定性（泄漏/阻塞）和更新器可靠性两大技术债**正在集中兑现，2026.9.5 发布首日的 P0 密度偏高。建议维护者优先合并 #153147、#145335 并针对 Codex 迁移路径发布补充修复。

---

## 横向生态对比

# 个人 AI 助手/智能体开源生态横向对比报告
**数据基准日：2026-09-20**

---

## 1. 生态全景

个人 AI 助手/自主智能体开源生态正处于**从“功能扩张期”向“可靠性攻坚期”过渡**的关键阶段：两个头部项目单日 Issue/PR 活动均达 500 条量级，社区参与度处于第一梯队，但议题重心已从新能力转向升级链路可靠性、长时运行稳定性和状态持久化正确性。值得注意的是，两项目不约而同地暴露出 **SQLite 多写者/大状态库**这一共性系统性风险，以及**更新器成为最大事故源**的工程悖论——迭代速度最快的项目，其自我更新能力反而最脆弱。远程 workspace/harness 分离、插件 SDK 生态化、多 Bot 协作正在成为下一代架构演进的三条主线。

---

## 2. 各项目活跃度对比

| 指标 | OpenClaw | Hermes Agent |
|---|---|---|
| Issues 更新（24h） | 500（新开/活跃 337 / 关闭 163） | 500（新开/活跃 193 / 关闭 307） |
| PR 更新（24h） | 500（待合并 303 / 合并关闭 197） | 500（待合并 216 / 合并关闭 284） |
| Release | **v2026.9.5**（含 linux-stable 通道），64 commits / 4,179 PR / 503 贡献者 | 无（v0.21.x 后 main 迭代期） |
| Issue 收敛比（关闭/新增） | 0.48 ⚠️（发散中） | **1.59** ✅（强收敛） |
| 版本成熟度 | 高频正式发布（9.x） | 0.x 迭代期 |
| 发布日 P0 密度 | **5+ 个 P0**（升级链路为主） | 0 |
| 健康度评估 | **黄牌**：社区规模与吞吐顶级，但技术债集中兑现，P0 积压含 6 个月未修项（#56217） | **绿牌偏黄**：修复速度快、净收敛，但 state.db 多写者损坏（#100896 P1）是系统性隐患 |

---

## 3. OpenClaw 在生态中的定位

**优势**：
- **规模领先**：单版本汇聚 503 位贡献者、4,179 个 PR，社区吞吐和多平台分发（AppImage/deb/多架构）显著超出 Hermes（个人/小团队生产使用为主）
- **架构纵深**：远程 workspace/harness 存储分离（#153124/#153126/#152652 三个 XL PR）、Enterprise 联动记忆、语义压缩保真检查（#153206），路线图明显更面向企业级多租户场景
- **分诊体系透明**：clawsweeper 标签、rating 分级、维护者响应节奏（@steipete 单日密集提交更新器修复）

**风险**：
- 2026.9.5 发布首日即现 5+ 个 P0 升级失败，“发布质量”与“迭代速度”失衡
- 资源泄漏类 P1 长期无解（#91588 内存泄漏 3.5 个月、#97616 zombie 进程 3 个月、#56217 六个月）
- 安全类积压（#104992 脱敏回放、ReDoS PR #119702 滞留 1.5 个月）在信任敏感的“个人助手”品类中代价更高

**技术路线差异**：OpenClaw 走“Gateway 中心化 + 远程 harness 分离”的重架构路线；Hermes 走“单 gateway 多路复用 + 消息适配层 + Desktop 插件生态”的场景深耕路线，更贴近个人常驻助手形态。

---

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **更新器可靠性** | 两者 | OpenClaw：升级 P0 群发、doctor-failed 静默失败；Hermes：`hermes update` ZIP 回退删 Desktop（#90495）。共同诉求：失败可诊断、回滚可观测 |
| **SQLite 状态库健壮性** | 两者 | OpenClaw：GB 级库启动阻塞、5.9TB/天写入（#153067）、livelock；Hermes：state.db 多写者损坏 4 次/5 周（#100896）、WAL 孤儿化（#109687）。这是**生态级共性短板** |
| **常驻 7×24 运行稳定性** | 两者 | OpenClaw：内存泄漏/zombie/忙循环；Hermes：#97681 要求 Bot 群聊独立于 Desktop 存活。长时运行是核心使用场景而非边缘需求 |
| **MCP 集成质量** | 两者 | OpenClaw：MCP 初始化超时崩溃 Gateway（#144911）、lazy 配置失效；Hermes：MCP OAuth 持久化（#99787） |
| **Codex/OpenAI 生态集成** | 两者 | OpenClaw：OAuth profile 丢失 401（#152968）；Hermes：供应错误中断工作（#107307）、认证无重试 |

---

## 5. 差异化定位分析

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 功能侧重 | 通用 Agent 运行时：远程 workspace、记忆系统、压缩保真、多语言 UI 性能 | 个人多渠道助手：iMessage/Telegram/Discord 适配打磨、bot-to-bot 协作、/usage 运营功能 |
| 目标用户 | 企业/重度部署者（Enterprise 联动、linux-stable 通道） | 个人生产用户、自建 gateway host 的 prosumer |
| 架构关键点 | Gateway/Harness 分离、Node 运行时、跨平台打包分发 | 单 gateway profile 多路复用（#109417 官方 campaign）、Desktop 插件 SDK |
| 生态策略 | 大规模社区贡献（503 人） | 插件目录规模化（12+5 个插件）倒逼 SDK 扩展 |
| 质量重心 | 启动性能、更新链路 | 会话状态治理、消息渲染细节（生产消息审计级打磨） |

---

## 6. 社区热度与成熟度

- **OpenClaw——快速迭代但进入“技术债兑现阶段”**：issue 发散比 0.48 表明问题产生速度超过消化速度；P0 积压含 3~6 个月陈年项，属于“规模大但质量巩固滞后”的典型。需要一次类似 2026.9.6 的集中修复版本来重建发布信任。
- **Hermes Agent——质量巩固期的健康样本**：收敛比 1.59，P2 修复周期 1~2 周，基于 2,250 条生产消息的审计式修复体现工程成熟度。隐患在于 state.db 系统性问题和 #88584（120 评论被标 invalid）的社区沟通风险。
- **分层结论**：OpenClaw 是“生态平台”定位的领跑者但需降速提质；Hermes 是“产品打磨”定位的稳健者，正从 0.x 向规模化插件生态过渡。

---

## 7. 值得关注的趋势信号

1. **可靠性正在取代功能成为竞争壁垒**：两个头部项目当日主线均为升级/状态/泄漏问题，说明用户已从尝鲜转向生产部署，“silent and unactionable”的失败不可接受。对开发者的启示：**把更新器和诊断输出当一等公民工程设计**。
2. **嵌入式 SQLite 状态层是智能体的阿喀琉斯之踵**：多写者 WAL、大库同步 I/O、写入放大在两项目同步爆发。方向信号：状态库单写者化、写入队列化、异步/延迟迁移（OpenClaw #153125/#153183 的做法值得借鉴）。
3. **架构向 Gateway/Harness 分离演进**：OpenClaw 的远程 workspace 三连 PR 与 Hermes 的 profile 多路复用殊途同归——计算/存储与客户端生命周期解耦，支撑无头常驻运行。
4. **插件/技能生态成为下一战场**：Hermes 插件目录规模化倒逼 SDK 扩展，OpenClaw 的 remote Skills（#153126）同向，预示“Agent 平台化 + 第三方能力市场”是下一个竞争维度。
5. **安全与信任问题开始浮出水面**：脱敏值回放进上下文（#104992）、子代理绕过请求方（#150498）提示：随着 Agent 深入个人通信和认证凭据，**安全评审排期能力**将成为开源项目的硬性门槛。
6. **常驻多 Bot 协作是被验证的真实需求**：iMessage/Telegram/Discord 通道的重复投递、跨设备接续类 issue 高热，确认“个人 AI 助手作为 7×24 基础设施”是核心产品形态而非附加场景。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报（2026-09-20）

## 1. 今日速览

Hermes Agent 今日保持**高度活跃**状态：过去 24 小时 Issues 更新 500 条（新开/活跃 193，关闭 307），PR 更新 500 条（待合并 216，已合并/关闭 284），关闭量明显大于新增，**净收敛趋势良好**。无新版本发布，项目仍处于 v0.21.x 之后的 main 分支迭代期。社区焦点集中在**会话状态管理（state.db / WAL）**、**gateway 多路复用（profile multiplexing）**和 **Desktop 插件生态**三大方向。整体来看，项目处于“高强度修 bug + 快速吸纳社区 PR”的成熟活跃期，健康度较高。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日关闭/合并的 PR 推进了多个方向：

- **Gateway 稳定性**：#116445 修复非 `gateway run` 进程内嵌 gateway 时 `hermes gateway status` 误报"stopped"的问题；#99792 使 Windows gateway 启动器可观测、崩溃后可自动重启。
- **iMessage/BlueBubbles 体验**：#116401 解决一条 iMessage 因 chat-id 变体被拆成两个会话、导致群聊 DM 发回发送者的问题。
- **Bot 协作体验**：#116440 让 bot-to-bot 对话在同一线程中可见，而非两条互不相关的聊天记录。
- **Telegram 渲染**：#116448 引入 Bot API 10.1 `sendRichMessage` 原生渲染水平分割线；#116447 修复星号列表项与斜体标记冲突引发的 MarkdownV2 解析错误（基于 2,250 条生产消息审计）。
- **配置与可观测性**：#116442 为 `/usage` 增加 GitHub Copilot 配额查询；#116438 改进模型连接重置后的用户提示（引导 `/retry` 而非误报不可达）；#99787 使 MCP OAuth 授权跨 dashboard/TUI 持久化。
- **Desktop UX**：#116449 修复滚动上翻被消息流 resize 重新吸底的竞态；#116050 修复看板 done 列排序颠倒。

整体进展：**会话状态治理、消息适配层打磨、桌面端可用性**三条线并行推进，单日吞吐量在同类开源 Agent 项目中属第一梯队。

## 4. 社区热点

- **#88584**（120 评论）[Automated Nous integration is blocked](https://github.com/NousResearch/hermes-agent/issues/88584) — 定时 Nous-to-Enterkey 合并在 `cron/jobs.py` 持续冲突，dashboard 更新器停留在旧版本。**评论量异常高但被标记 invalid + P3**，疑似上游合并策略之争，值得维护者公开回应以澄清维护路线。
- **#97681**（28 评论，2 👍）[Bot Group Chats should keep working after Desktop closes](https://github.com/NousResearch/hermes-agent/issues/97681) — 用户希望 Bot 群聊会话独立于 Desktop 存活、可跨设备接续。反映"常驻 gateway + 无头多 Bot 协作"是核心使用场景诉求。
- **#103483**（21 评论，11 👍）[muse-spark 流式提前终止](https://github.com/NousResearch/hermes-agent/issues/103483) — OpenRouter muse-spark 在 Responses 协议下以无关单词 + `finish_reason=stop` 中断任务，已关闭（有修复）。
- **#107307**（19 评论）[Codex Pro 供应错误中断工作](https://github.com/NousResearch/hermes-agent/issues/107307) — 用户报告可用时间窗口不断收窄、连续失败，已关闭。
- **#109417**（12 评论）[Profile 多路复用唯一 gateway 模式追踪](https://github.com/NousResearch/hermes-agent/issues/109417) — 官方 Sep 10–12 campaign，单 gateway 服务全部 profile，是当前架构演进主线。
- **#116305**（9 评论，今日新建）[Desktop 插件 SDK hook 愿望清单](https://github.com/NousResearch/hermes-agent/issues/116305) — 基于 2026-09-19 插件目录评审（12 个同作者插件 + 5 个第三方包），暴露出 SDK 能力缺口，显示**插件生态正在规模化，倒逼 SDK 扩展**。

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue | 状态 | Fix PR |
|---|---|---|---|
| **P0** | [#109687](https://github.com/NousResearch/hermes-agent/issues/109687) 单次普通 CLI 调用即孤儿化在跑 gateway 的 WAL generation，gateway 继续服务但**静默丢弃会话写入**（Linux，2026-09-12 main 复现，#102589 修复后回归） | 已关闭 | 相关修复见 #116451（symlink 路径下 deleted-WAL 不可见） |
| **P1** | [#100896](https://github.com/NousResearch/hermes-agent/issues/100896) `state.db` 5 周内损坏 4 次（gateway+dashboard 多写者 WAL），"5 live SessionDB handles" 警告早于发病 7 分钟 | **仍 OPEN** | 待关注 |
| **P1** | [#90495](https://github.com/NousResearch/hermes-agent/issues/90495) `hermes update` ZIP 回退路径删除 Desktop 应用且遗忘安装状态 | 已关闭 | — |
| **P2** | [#101007](https://github.com/NousResearch/hermes-agent/issues/101007) MCP `lazy` 配置因 schema 缓存 `ttl_ms: 0` 被视为过期而永不生效 | OPEN | 待修 |
| **P2** | [#116450 → #116451](https://github.com/NousResearch/hermes-agent/pull/116451) symlinked `HERMES_HOME` 下 deleted-WAL 监控失效 | OPEN PR | 本 PR 即修复 |
| **P2** | [#62810](https://github.com/NousResearch/hermes-agent/issues/62810) CLI 布尔成功退出码为 1（自动化兼容性） | OPEN | 待修 |

**核心风险信号**：`sweeper:risk-session-state` 标签几乎贯穿所有高优 Issue，SQLite 多写者会话持久化是当前项目**最集中的系统性薄弱点**（关联 #90837 / #100313 / #89737 腐损坏类问题追踪链）。

## 6. 功能请求与路线图信号

- **#116305 Desktop 插件 SDK hook 扩展**：今日新建、来自官方插件目录评审，配套社区已有大量插件提交，**极可能成为下版本重点**。
- **#109417 profile 多路复用强制迁移**：官方 tracking issue，配合 #88715（profile 身份晚绑定问题）已关闭，迁移门槛正在逐项清除。
- **#97681 Bot 群聊跨设备持续运行**：与 #116440（bot-to-bot 线程可视化）方向一致，多 Bot 协作是明确的产品主线。
- **#13566 Cron 投递重试机制**：长期 OPEN（4 月至今），网络瞬断导致定时任务结果静默丢失，属低成本高价值改进。
- **#19320 Codex `web.run` 搜索接入**（已关闭，5 👍）：第三方搜索依赖的替代方案，受用户欢迎。
- **#73680 并发实例模型切换隔离**：多实例用户痛点，与 session-state 治理同属一个架构议题。

## 7. 用户反馈摘要

- **不满意（高频痛点）**：
  - 会话数据可靠性：state.db 损坏、写入静默丢失类问题让长期运行的生产用户（自建 gateway host）最焦虑。
  - 更新路径脆弱：`hermes update` 在 Windows/ZIP 回退场景反复破坏 Desktop 安装（#40187、#90495）。
  - OpenAI/Codex 生态集成摩擦：认证回退无重试（#73237）、base_url 被忽略（#5875）、本地模型提示词过大导致分钟级卡顿（#61265）。
- **满意/认可**：
  - 修复合入速度快，多数 P2 问题在一至两周内关闭（如 #83714 patch 截断、#80449 压缩器预算）。
  - 多渠道适配（Telegram、Discord、BlueBubbles/iMessage）持续有社区贡献打磨细节，用户参与度高（如基于生产消息审计的 #116447）。
  - `/usage` 配额可视化、看板等运营型功能不断丰富，显示用户在“日常生产使用”而非玩具场景。

## 8. 待处理积压

- **#100896（P1，9-02 开）**：state.db 多写者损坏仍 OPEN，是当前最高优未解问题，且已有可复现的前兆信号（SessionDB handles 警告），建议优先。
- **#88584（120 评论）**：上游合并冲突被标记 invalid 但讨论量巨大，需要官方表态以稳定社区预期。
- **#26058（5-15 开，6 👍）**：Discord `auto_thread` 与 `free_response_channels` 交互破坏合法用例，长期 needs-decision。
- **#13566（4-21 开）**：Cron 投递重试缺失，4+ 个月无决策。
- **#101007（P2）**：MCP lazy 加载完全失效，配置形同虚设，影响所有配置了 lazy 的用户。
- PR 积压 216 个待合并，其中 #116445、#116451 等稳定性修复建议加速评审。

---
*数据来源：GitHub Issues/PR API 快照（2026-09-20），统计窗口为过去 24 小时。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*