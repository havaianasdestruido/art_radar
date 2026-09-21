# AI CLI 工具社区动态日报 2026-09-22

> 生成时间: 2026-09-21 23:15 UTC | 覆盖工具: 7 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [Kimi Code CLI](https://github.com/MoonshotAI/kimi-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

# AI CLI 工具生态横向对比分析报告
**数据日期：2026-09-22**

---

## 一、生态全景

AI CLI 工具已从单一编码助手演化为覆盖 CLI、桌面端、Web Shell、IDE 扩展的多形态 agent 平台，竞争焦点从“代码补全能力”转向**多 Agent 编排、成本可控性与企业治理**。头部厂商（OpenAI、Google、GitHub）保持每日高频迭代，而 Anthropic 的 Claude Code 因 issue 治理失序（6k+ 可复现 bug 被自动关闭）陷入社区信任危机。垂直玩家加速分化：Kimi CLI 直接归档并由 native binary 架构的 Kimi Code CLI 接棒，OpenCode/Qwen Code 则在多模型路由、沙箱安全、远程开发等细分方向深耕。整体看，行业已进入“工程化深水区”——可靠性、透明度与平台适配（Windows/远程/企业代理）取代模型能力成为主要战场。

---

## 二、各工具活跃度对比

| 工具 | 今日热点 Issues | 重要 PR 动态 | Release | 迭代状态 |
|---|---|---|---|---|
| **Claude Code** | 10+（#87647 治理危机 59👍） | 2（含 1 关闭） | 无 | 静默期，社区信任承压 |
| **OpenAI Codex** | 10（capacity/静默降级投诉主线） | 20+（全部自动化合入） | **7 个 alpha**（0.157.0-alpha.2） | 最激进预发布周期 |
| **Gemini CLI** | 10（P1 级 Agent 可靠性为主） | 15+（多个 P1 修复已合） | v0.62.0 nightly | 稳定高频修复 |
| **GitHub Copilot CLI** | 10（OOM、MCP 兼容为主） | 2（均为文档类） | **2 个版本**（v1.0.87/88-0） | 稳定版节奏，企业功能落地 |
| **Kimi CLI** | 2 | 3（2 个归档收尾合并） | v1.51.0（**最终版**） | 已归档，迁移至 kimi-code |
| **OpenCode** | 10+（1.18.30 回归 issue 簇集中关闭） | 10+（TUI/GitLab/codemode） | v1.18.32 | 回归修复中，社区贡献活跃 |
| **Qwen Code** | 10（远程 SSH、PTY 打包 P1） | 10（沙箱/Web Shell 为主） | v0.24.3 + Desktop + SDK | 多端同步发布 |

**关键观察**：Codex 的 PR 量与发布频率断层领先（单日 20+ PR、7 个 alpha，且由自动化机器人流水线合入）；Claude Code 单日仅 2 条 PR 且无发布，与其 issue 危机形成鲜明反差。

---

## 三、共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **成本可控性与模型透明度** | Claude Code（#94013 后台 subagent 无审批耗 1.7M token、#95313 启动审批诉求）、Codex（#46189/$200 Pro 用户容量错误、#46632 静默模型替换）、Copilot CLI（#4218 Auto 模式模型池配置 👍16）、Gemini CLI（#29429 配额重置窗口展示） | 后台 agent 需 token/时间上限、启动审批；静默降级与 capacity 错误是付费用户共同痛点 |
| **沙箱与安全边界** | Qwen Code（bwrap 工具级沙箱 + Landlock 后端）、Codex（#47094 MCP FD 泄漏修复、Windows execpolicy）、Gemini CLI（零依赖 OS 沙箱提案 #19873）、Claude Code（#78818 沙箱干扰 git） | 沙箱从“整体进程级”向“单工具执行级”下沉，Linux 体系化成形，Windows 误报普遍 |
| **MCP 生态健壮性** | Codex（OAuth 凭证丢失、FD 泄漏）、Copilot CLI（协议版本协商 #4888、Atlassian OAuth #4926）、OpenCode（MCP 超时 PR 被清理）、Gemini CLI（128 工具上限 #24246） | MCP 是全行业 Bug 高发区：认证、协议协商、资源泄漏、工具数上限 |
| **会话状态可靠性** | Codex（孤儿 turn #41591）、Copilot CLI（长会话 OOM #4699、会话分支 #1313）、Gemini CLI（退出挂起）、OpenCode（Web 会话列表为空 issue 簇） | 长会话持久化、崩溃恢复、跨端会话一致性是普遍短板 |
| **企业治理与策略** | Copilot CLI（组织级 Auto 路由策略）、Codex（Guardian extra_policy、代理遵循）、Gemini CLI（配额提示、代理互操作）、Claude Code（审计日志缺失） | 企业租户策略注入、MDM 管控、代理网络兼容成为采购决策要素 |

---

## 四、差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|---|---|---|---|
| **Claude Code** | Agent 能力深度（subagent、hooks、定时任务）但工程治理滞后 | 重度订阅制专业开发者 | 闭源单模型，CLI + 桌面双形态，桌面端被视为“二等公民” |
| **OpenAI Codex** | 模型迭代 + 企业安全（Guardian、SKU、审计字段），工程响应最快 | Pro/Business 付费用户 | Rust 重写（rust-v 系列），全自动化 PR 流水线，模型目录动态调整 |
| **Gemini CLI** | Subagent/Memory 可靠性 + Token 效率（AST 感知工具） | 开源社区 + Google 生态用户 | 开源 TS，P1/P2 优先级标签管理，社区提案驱动（OS 沙箱、AST EPIC） |
| **GitHub Copilot CLI** | 企业策略管控 + 终端集成深度（OSC 通知、skills 命名空间） | GitHub 企业客户、组织管理员 | 组织级托管默认值 + BYOK，依托 GitHub 生态分发 |
| **OpenCode** | 多模型路由（Zen 平台、Bedrock/Together/GitLab） | 追求模型自由的开发者 | 开源多 provider 架构，社区贡献占比高，版本回归风险偏高 |
| **Qwen Code** | Web Shell / 远程开发 / 多端（Desktop + SDK + Mobile QR 配对） | 远程与多场景开发者 | fork 自 Gemini 生态但深度定制，沙箱（bwrap/Landlock）与 daemon 会话模型自成体系 |
| **Kimi Code** | 架构换代 | 存量用户迁移 | Python → native binary，体现“CLI 重写为原生二进制”的行业倾向 |

---

## 五、社区热度与成熟度

- **最活跃**：OpenAI Codex——单日 20+ PR、7 个 alpha、issue 讨论量高（#7291 达 51 评论），但付费用户负面情绪集中（容量/降级投诉构成主线）。
- **健康修复期**：Gemini CLI 与 Qwen Code——P1 修复当日合入，Qwen 多端同步发布，工程节奏稳定，社区提案质量高（如 Landlock 沙箱、Managed Agent 架构）。
- **成熟但保守**：Copilot CLI——稳定版节奏，功能向企业策略倾斜，当日 PR 仅文档类，社区诉求（会话分支、模型池）响应偏慢。
- **信任承压**：Claude Code——6k+ "has repro" issue 被自动关闭引发治理危机，单日近乎零工程动作，高质量 bug 报告随 stale 机制流失，是最需官方回应的工具。
- **动荡/退出**：Kimi CLI 归档；OpenCode 处于 1.18.30 重大回归的修复验证期，且面临计费信任问题（#50452 积分无日志消失）。

---

## 六、值得关注的趋势信号

1. **成本治理成为第一优先级**：后台 subagent 失控（Claude Code）、静默模型降级、capacity 错误、Auto 模型池不可控——三大头部工具同时爆发付费体验投诉。**参考价值**：构建多 agent 系统时，审批门控、token 上限、成本可见性应作为架构一级公民，而非事后补丁。

2. **Issue 治理即产品口碑**：Claude Code 的 stale 自动关闭与 Codex 的“关闭即合入”自动化流水线形成正反案例。**参考价值**：开源项目的 bug 追踪机制直接影响社区信任，自动化治理需保留人工复核通道。

3. **沙箱从进程级下沉到工具调用级**：Qwen 的 bwrap 工具级沙箱 + Landlock 回退、Gemini 的零依赖 OS 沙箱提案、Codex 的 stdio-only FD 策略，方向高度趋同。**参考价值**：自研 agent 工具链应预设 per-tool 执行沙箱接口。

4. **多形态交付成为标配**：CLI + Desktop + Web Shell + IDE 扩展 + Mobile 配对（Qwen）+ ACP 协议（Zed/Xcode 集成），纯 CLI 工具竞争力收窄。**参考价值**：选型时优先考察会话数据跨端一致性（恰是当前 Bug 高发区）。

5. **native binary 重写潮**：Codex（Rust）、Kimi Code（native binary）均抛弃脚本语言实现，追求启动性能与内存基线（Qwen 也将 RSS 从 660MB 降至 434MB）。**参考价值**：TS/Python CLI 在长会话内存（Copilot 4 GiB OOM）与启动延迟上已见天花板。

6. **企业采购要素成型**：组织策略托管（Copilot）、Guardian 策略注入、代理网络兼容、审计字段持久化（Codex 线程 creator_user_id）——AI CLI 正在复制传统开发者工具的企业化路径。**参考价值**：企业场景选型应验证 MDM 策略、代理环境与审计日志三项硬指标。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

> 数据说明：本报告基于 anthropics/skills 仓库截至 2026-09-22 的数据。样本中 PR 的评论数与点赞数均为缺失（undefined），因此热度判断综合参考了关联 Issue 讨论量、PR 更新活跃度与内容影响力；所有列出的 PR 均为 **OPEN** 状态。

---

## 一、热门 Skills 排行（PR）

| # | Skill / PR | 作者 | 功能与讨论热点 | 状态 |
|---|---|---|---|---|
| 1 | **skill-creator 触发评估修复** [#1298](https://github.com/anthropics/skills/pull/1298) | @MartinCajiao | 修复 skill-creator 触发评估的误报/漏报、Windows select() 兼容与运行时故障误判。关联 Issue [#556](https://github.com/anthropics/skills/issues/556)（12 条评论：`claude -p` 触发率恒为 0%）与 [#1769](https://github.com/anthropics/skills/pull/1769)，是全仓最集中的技术痛点，6 月创建后持续更新至 9 月 | OPEN |
| 2 | **mcp-builder 兼容修复** [#1742](https://github.com/anthropics/skills/pull/1742) | @Kuldeeep18 | 适配 `mcp>=2.0` 的 `streamable_http_client` 重命名与自定义 header 传递。关联高讨论 Issue [#1390](https://github.com/anthropics/skills/issues/1390)（评估脚本对真实 MCP 服务器打 0 分），MCP 生态演进对 skill 的连锁影响是讨论焦点 | OPEN |
| 3 | **AWT（AI Watch Tester）** [#822](https://github.com/anthropics/skills/pull/822) | @ksgisang | AI 视觉驱动的零代码 E2E 测试技能，给 Claude 浏览器控制能力。3 月创建、9 月仍在更新，生命周期长、社区迭代意愿强 | OPEN |
| 4 | **Pyxel 复古游戏开发** [#525](https://github.com/anthropics/skills/pull/525) | @kitao | 用 Python 创建/调试复古游戏，含确定性 headless 运行与帧检查。作者为 Pyxel 作者本人，半年间持续维护 | OPEN |
| 5 | **md2video-audio** [#1703](https://github.com/anthropics/skills/pull/1703) | @70v-Yoyo | Markdown 一键编译为带拟真配音的 MP4 视频（Marp + TTS），主打零成本内容生产 | OPEN |
| 6 | **testing-patterns** [#723](https://github.com/anthropics/skills/pull/723) | @4444J99 | 覆盖 Testing Trophy 模型、AAA 单测、React 组件测试的全栈测试方法论技能，3 月至 9 月持续打磨 | OPEN |
| 7 | **proofcore-contract-auditor** [#1771](https://github.com/anthropics/skills/pull/1771) | @ProofCore-Protocol | Solidity/Rust 智能合约静态分析，并将审计证明锚定到 TON 链。**注意**：与 Issue [#492](https://github.com/anthropics/skills/issues/492)（43 条评论的信任边界滥用问题）直接相关——此类带商业/品牌推广性质的社区 skill 正是争议核心 | OPEN |
| 8 | **blast-radius** [#1776](https://github.com/anthropics/skills/pull/1776) | @kishormorol | 批量/破坏性写操作前的安全检查清单（删库、批量发邮件等），切入“操作正确 ≠ 影响可控”的安全盲区 | OPEN |

另有 DOCX/PDF 官方技能的系列质量修复值得关注：[#541](https://github.com/anthropics/skills/pull/541)（w:id 冲突致文档损坏）、[#1790](https://github.com/anthropics/skills/pull/1790)、[#1765](https://github.com/anthropics/skills/pull/1765)（Windows 非 UTF-8 locale）、[#538](https://github.com/anthropics/skills/pull/538)（大小写路径）。

## 二、社区需求趋势（来自 Issues）

1. **安全与信任治理**（最热，[#492](https://github.com/anthropics/skills/issues/492)，43 评论）：社区 skill 冒用 `anthropic/` 命名空间、SKILL.md 内嵌权限逻辑的 SharePoint 场景（[#1175](https://github.com/anthropics/skills/issues/1175)）、agent 治理模式提案（[#412](https://github.com/anthropics/skills/issues/412)）——安全是第一大诉求。
2. **团队/组织协作分发**：组织内 skill 共享与统一库（[#228](https://github.com/anthropics/skills/issues/228)，16 评论）、插件重复安装污染上下文（[#189](https://github.com/anthropics/skills/issues/189)，👍9）。
3. **评测与工具链可靠性**：skill 触发评测系统性失效（[#556](https://github.com/anthropics/skills/issues/556)、[#1769](https://github.com/anthropics/skills/pull/1769)）、mcp-builder 评估框架缺陷（[#1390](https://github.com/anthropics/skills/issues/1390)）、web-artifacts-builder 构建工具链兼容（[#1362](https://github.com/anthropics/skills/issues/1362)）。
4. **上下文效率与记忆管理**：claude-api skill 单次注入 ~156k token（[#1487](https://github.com/anthropics/skills/issues/1487)）、压缩符号化 agent 记忆提案 compact-memory（[#1329](https://github.com/anthropics/skills/issues/1329)，9 评论）。
5. **推理质量流水线**：任务前校准 → 对抗性审查 → 交付验证的三道门提案（[#1385](https://github.com/anthropics/skills/issues/1385)）。
6. **平台互通**：Bedrock 支持（[#29](https://github.com/anthropics/skills/issues/29)）、Skills 暴露为 MCP（[#16](https://github.com/anthropics/skills/issues/16)）。

## 三、高潜力待合并 Skills（活跃且未合并）

- [#1298](https://github.com/anthropics/skills/pull/1298) skill-creator 触发评估修复——关联多个已确认 bug（#556/#1721），落地优先级高
- [#1742](https://github.com/anthropics/skills/pull/1742) mcp-builder mcp v2 兼容——修复已确认 Issue #1668，阻塞新版本 MCP 用户
- [#541](https://github.com/anthropics/skills/pull/541) DOCX tracked change ID 冲突——修复文档损坏级缺陷
- [#723](https://github.com/anthropics/skills/pull/723) testing-patterns——半年持续迭代，方法论型 skill，符合官方收录偏好
- [#525](https://github.com/anthropics/skills/pull/525) Pyxel——上游作者维护，质量背书强
- [#822](https://github.com/anthropics/skills/pull/822) AWT E2E 测试——长期活跃更新，配合社区测试自动化需求

## 四、生态洞察（一句话）

**社区在 Skills 层面最集中的诉求是“可信度”**——既要安全的分发与命名空间治理（谁能代表官方），又要可靠的工程基础（触发评测不再静默失败、上下文不再被撑爆、插件不再重复安装），其次才是更丰富的垂域能力（测试、Web3、内容生成、HPC）。

---

# Claude Code 社区动态日报 · 2026-09-22

## 1. 今日速览

过去 24 小时无新版本发布。社区焦点集中在两件事：一是 #87647 曝出**自 2026 年 3 月以来超过 6 千条带 "has repro" 标签的 Issue 被自动关闭**，引发对 issue 管理机制的强烈质疑（59 👍）；二是后台 subagent 成本失控问题持续发酵，多个 Issue 反映后台代理在无审批情况下消耗巨额 token。此外，大量 7-8 月的 issue 因 stale 被批量关闭。

## 2. 版本发布

无。

## 3. 社区热点 Issues

1. **[#87647](https://github.com/anthropics/claude-code/issues/87647)** — 6k+ 条 "has repro" Issue 自 3 月起被自动关闭。元层面的社区治理问题，👍 59 为近期最高，反映用户对 bug 追踪机制的信任危机。
2. **[#58693](https://github.com/anthropics/claude-code/issues/58693)** — Windows 桌面端拼写检查无法关闭，导致输入文本难以阅读。18 条评论、开放 4 个月未修复，Windows 用户高频痛点。
3. **[#95313](https://github.com/anthropics/claude-code/issues/95313)** — 请求在启动高成本 agent 前要求用户确认。9 月 18 日新提，与 #94013 构成同一主题，成本控制诉求上升。
4. **[#94013](https://github.com/anthropics/claude-code/issues/94013)** — 三个后台研究 subagent 无审批消耗 1.7M token，无 token/turn/时间上限。后台代理成本透明度问题的典型案例。
5. **[#79305](https://github.com/anthropics/claude-code/issues/79305)** — 桌面端请求自定义主题/强调色，与 CLI 主题系统对齐。19 👍，桌面端个性化需求代表。
6. **[#94830](https://github.com/anthropics/claude-code/issues/94830)** — 桌面内置浏览器无法为 `.local` 站点授予持久权限（WordPress Studio 场景）。内置浏览器权限模型仍不完善。
7. **[#78818](https://github.com/anthropics/claude-code/issues/78818)** — 沙箱在 linked worktree 中持久化 `.git/config.lock`，阻塞 git config 写入。已标记 reproduced，影响 git worktree 工作流。
8. **[#82610](https://github.com/anthropics/claude-code/issues/82610)** — 桌面本地会话无法加载 marketplace 插件工具（LocalPluginsReader 只识别内置 skills 插件）。桌面插件生态的关键阻塞。
9. **[#95826](https://github.com/anthropics/claude-code/issues/95826)** — 模型将粘贴的第三方内容中的假设误提升为用户决策，纠正后仍复发。模型行为可靠性问题，昨日新提。
10. **[#87840](https://github.com/anthropics/claude-code/issues/87840)** — 侧栏会话分组手动排序失效（regression），已被 stale 关闭。桌面 UI 回归问题被自动关闭的典型例子。

> 注：#79174（VSCode MCP elicitation 被 auto-decline）、#80697（PreToolUse hook 启动失败被误判为 deny 导致工具锁死）、#83323（定时任务首跑后静默停止）等多个高质量 bug 报告也因 stale 被批量关闭，与 #87647 反映的问题相互印证。

## 4. 重要 PR 进展

过去 24 小时仅 2 条 PR 更新：

1. **[#95423](https://github.com/anthropics/claude-code/pull/95423)** [OPEN] — 优化 `diff` 面板刷新逻辑：原实现每次 Bash/PowerShell 调用后都重新拉取 diff，现在参考内置面板行为，跳过只读命令（`ls`、`git status`、`cat` 等），降低无谓刷新开销。
2. **[#95932](https://github.com/anthropics/claude-code/pull/95932)** [CLOSED] — 新增 claude.ai GitHub 连接问题的 issue 模板（含 `github-integration` 标签与诊断信息收集），已被关闭。

## 5. 功能需求趋势

- **成本与审批控制**（#95313、#94013、#87896）：后台 agent 的 token 上限、启动审批、成本可见性是当前最集中的新需求。
- **桌面端与 CLI 功能对齐**（#79305、#82610、#87878）：自定义主题、插件加载、会话恢复，桌面版被普遍视为“二等公民”。
- **权限系统精细化**（#94830、#87292、#87843）：本地站点持久授权、定时任务的权限规则匹配。
- **国际化与无障碍**（#88502、#87887、#95937）：多语言拼写检查、捷克语本地化、NVDA 屏幕阅读器支持。
- **沙箱与 git 兼容性**（#78818）：沙箱 bind-mount 对 git 内部机制的干扰。

## 6. 开发者关注点

- **Issue 治理危机**：6k+ 可复现 bug 被自动关闭（#87647），stale 机制正在流失高质量 bug 报告与社区信任，是最需官方回应的问题。
- **后台 subagent 失控**：无成本上限、无审批、无可见性（#94013、#87896），直接影响订阅额度与账单。
- **Windows/桌面端体验欠账**：拼写检查（#58693）、排序回归（#87840）、插件不可用（#82610）等长期未修。
- **企业/代理环境兼容性**：`ANTHROPIC_BASE_URL` 自定义代理导致订阅功能被撤（#87876）、MCP elicitation 失效（#79174），影响进阶工作流。
- **可观测性缺口**：OTel 遥测数据静默丢失（#77237）、会话清理无审计日志（#87889）。

---
*数据来源：github.com/anthropics/claude-code · 过去 24 小时*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 · 2026-09-22

## 📌 今日速览

Codex CLI 持续高频迭代，过去 24 小时内连发 7 个 alpha 版本（推进至 `0.157.0-alpha.2`），同时在合入大量工程化改进 PR，涵盖 MCP 文件描述符泄漏修复、线程元数据持久化、模型目录调整（GPT-5.6-Sol 优先级下调）等。社区侧，付费用户对 "Selected model is at capacity" 账号级限流及 GPT-6 静默降级为 GPT-5.6 模型的投诉持续升温，值得重点关注。

---

## 🚀 版本发布

过去 24 小时密集发布 7 个 alpha 版本，处于活跃预发布周期：

| 版本 | 备注 |
|---|---|
| `rust-v0.157.0-alpha.2` | 最新预发布 |
| `rust-v0.157.0-alpha.1` | 0.157 首个 alpha |
| `rust-v0.156.0-alpha.12` ~ `.17`（除 .15） | 0.156 系列密集修补 |

> 说明：Release Notes 均为简短占位文本，具体功能以 PR 记录为准。同期 PR #47095 移除了每 4 小时自动刷新 models.json 的 `rust-release-prepare` workflow，暗示模型目录更新流程可能已迁移。

---

## 🔥 社区热点 Issues（Top 10）

1. **[#7291](https://github.com/openai/codex/issues/7291) VSCode 扩展无法回滚变更** — 评论 51 条、👍 19。长期高热 issue，扩展误删/无法 revert 用户代码属于数据安全级问题，社区持续施压。

2. **[#46189](https://github.com/openai/codex/issues/46189) $200/月 Pro 账户 GPT-6 容量错误/降级回退** — 评论 7 条。付费上限用户反复遭遇 capacity 错误，用户已多次向 OpenAI 支持提交证据，反映服务质量与定价预期落差。

3. **[#46632](https://github.com/openai/codex/issues/46632) gpt-6-astra 被静默替换为 gpt-5.6-luna** — 确定性模型替换 + 47 次虚假 capacity 错误，与 #46189、#46231 共同构成“模型可用性”投诉主线。

4. **[#46231](https://github.com/openai/codex/issues/46231) 账号级 "Selected model is at capacity"（9/14 起）** — 用户完成交叉测试证明问题跟随账号而非设备/网络，且额度未耗尽（`secondary-used-percent: 0`），诊断质量高。

5. **[#23195](https://github.com/openai/codex/issues/23195)（已关闭）macOS 将 Codex 判定为恶意软件** — 👍 27。Gatekeeper 误报影响 Business 用户，已解决但反映签名/公证流程曾出问题。

6. **[#40060](https://github.com/openai/codex/issues/40060) Windows 沙箱 execpolicy 误报** — 评论 20 条。PowerShell 脚本中 `Start-Process` 与无关 URL 同现即触发误拦截，最新稳定版与 main 均未修复。

7. **[#31864](https://github.com/openai/codex/issues/31864) GPT-5.6 Sol 所有请求因 MultiAgentV2 保留工具名冲突失败** — 👍 18、评论 8 条。`collaboration.spawn_agent` 保留字冲突导致 Sol 会话全量失败，属高危功能阻断。

8. **[#41591](https://github.com/openai/codex/issues/41591) macOS App 孤儿 inProgress turn 遮蔽已完成回合且重启不清除** — 评论 13 条，会话状态机持久化缺陷的典型案例（Windows 侧 #39178 avatarOverlay 问题同源）。

9. **[#46960](https://github.com/openai/codex/issues/46960) Linux 桌面版 stdio MCP 服务器继承 app-server 全部文件描述符** — 当日新报。FD 泄漏传导至 MCP 子进程，存在资源耗尽与信息泄漏风险。**好消息：PR #47094（`DescriptorPolicy::StdioOnly`）当日已合入修复。**

10. **[#35346](https://github.com/openai/codex/issues/35346) Codex Desktop 在 macOS 27 无法访问局域网** — 从未触发“本地网络”权限弹窗，SSH/TCP 报 `EHOSTUNREACH`，权限请求路径存在缺陷。

---

## 🔧 重要 PR 进展（Top 10）

1. **[#47094](https://github.com/openai/codex/pull/47094) 限制 Unix 本地 MCP 服务器仅继承 stdio 描述符** — 直接修复 #46960 的 FD 泄漏问题，安全意义重大。

2. **[#47085](https://github.com/openai/codex/pull/47085) 更新模型目录：GPT-5.6-Sol 优先级 6→4** — 定位调整为“可靠的日常 agentic 主力”，GPT-5.5 描述为“上一代”，暗示模型排序策略变化。

3. **[#47122](https://github.com/openai/codex/pull/47122) 文件 blob 上传超时 60s → 5min** — 缓解大文件上传失败，改善实际使用体验。

4. **[#47125](https://github.com/openai/codex/pull/47125) Guardian 审查新增 `extra_policy` 配置** — 企业租户可注入额外策略文本，扩展治理能力。

5. **[#47108](https://github.com/openai/codex/pull/47108) 修复 Windows 沙箱 helper 丢失 `SystemDrive`/`LOCALAPPDATA` 环境变量** — 解决环境变量过滤导致的平台目录解析失败，与 #32315 等 Windows 沙箱问题相关。

6. **[#47101](https://github.com/openai/codex/pull/47101) Realtime WebSocket 遵循代理配置** — 修复 Voice WebRTC 旁路绕过代理策略的问题，对企业网络用户关键。

7. **[#47114](https://github.com/openai/codex/pull/47114) + [#47113](https://github.com/openai/codex/pull/47113) 线程生命周期时间戳与创建者身份持久化** — 持久化 item 起止时间、`creator_user_id`，为多用户/审计场景铺路（rollout + SQLite 迁移）。

8. **[#47118](https://github.com/openai/codex/pull/47118) Code Mode 工具消息支持模型目录覆盖** — 为不同模型定制 exec/wait 工具描述，提升跨模型兼容性。

9. **[#47116](https://github.com/openai/codex/pull/47116) 远程插件请求遵循配置的 product SKU** — 修复硬编码 `OAI-Product-Sku: codex`，支持多产品形态。

10. **[#47100](https://github.com/openai/codex/pull/47100) 修复 TUI 任务响应预算截断丢弃助手回答** — 提升响应字节数上限并保留关键内容，配套 [#47096](https://github.com/openai/codex/pull/47096) 将提示固定在输入框上方，TUI 体验持续打磨。

> 值得注意：当日全部 PR 均由 `@copyberry[bot]` 提交并快速关闭（合入），官方已大规模采用自动化提交流水线。

---

## 📈 功能需求趋势

- **模型可用性与透明度**（最强烈）：capacity 错误、静默模型替换、降级回退是当前最大痛点（#46189/#46231/#46632）。
- **会话状态可靠性**：孤儿 turn、线程隐藏、重启不恢复等问题在 macOS/Windows/Linux 均有报告（#41591/#39178/#32614）。
- **Windows 沙箱体验**：execpolicy 误报、payload 超限、Full access 名不副实（#40060/#32315/#45403），Windows 已成为 bug 重灾区。
- **VS Code 扩展成熟度**：revert 失败（#7291）、Inline Suggestions/Ghost Text（#11898，👍 47，已关闭或有望落地）。
- **自动化与连续性**：限额重置后自动恢复任务（#28931，👍 35）、默认展开工具调用摘要（#23868，👍 15）。
- **可扩展性与文档**：社区围绕 `~/.codex` rollout 文件构建工具，请求官方明确稳定 API 契约（#45251）。

## 👨‍💻 开发者关注点

1. **付费体验与 SLA 落差**：Pro/Plus 用户的容量错误和模型替换缺乏官方回应通道，负面情绪集中。
2. **Windows 一等公民地位待加强**：沙箱、更新（#46628 Store 自动更新失败致应用无法启动）、登录（#46613）问题密集。
3. **MCP 生态健壮性**：OAuth 凭证重启丢失（#28201）、Meta Ads 端点校验失败（#44437）、FD 泄漏（#46960）表明 MCP 集成仍需打磨。
4. **会话文件格式稳定性**：下游工具开发者依赖 rollout 文件，亟需官方契约文档。
5. **质量信号积极面**：官方当天合入约 20+ PR，修复节奏快、覆盖面广（安全、TUI、模型目录、企业策略），alpha 版本迭代频繁，工程响应能力健康。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 · 2026-09-22

## 📌 今日速览

Gemini CLI 昨日发布 v0.62.0 nightly 构建并合入多个 P1 级修复。社区贡献活跃，新增多项稳定性修复 PR（进程挂起、CPU 100%、原子文件写入等）。Issue 端 Subagent 可靠性与 Auto Memory 安全/质量问题成为持续焦点。

---

## 🚀 版本发布

- **v0.62.0-nightly.20260921.gcfbcaa8df**（2026-09-21 发布，nightly 通道）
  [Full Changelog](https://github.com/google-gemini/gemini-cli/compare/v0.62.0-nightly.20260920.gcfbcaa8df...v0.62.0-nightly.20260921.gcfbcaa8df)

---

## 🔥 社区热点 Issues（Top 10）

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) Subagent 达到 MAX_TURNS 后仍报告 GOAL 成功**（P1，13 评论）
   子代理因回合上限被中断却返回 `success`，掩盖了真实失败，直接影响任务可靠性。P1 + 待复测状态，是当前讨论最多的 Agent 正确性 bug。

2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) Generalist agent 挂起**（P1，8 评论 / 8 👍）
   委派给通用 agent 后 CLI 无限挂起，简单操作（如建目录）也卡死，用户等待长达一小时。高 👍 数表明影响面广。

3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) 零依赖 OS 沙箱 + 执行后意图路由**（P2，9 评论）
   社区大型提案：让 Gemini 3 充分发挥原生 bash 能力，同时通过沙箱保障安全。方向性架构讨论，值得跟踪。

4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) AST 感知的文件读取/搜索/代码库映射**（P2 EPIC，7 评论）
   探索 AST 工具精准读取方法边界，减少无效读取与 token 噪音，是 token 效率方向的重要工作流。

5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) Gemini 不主动使用 skills 和 sub-agents**（P2，6 评论）
   自定义 skill/子代理几乎不被自主调用，仅在显式指令下生效——多 Agent 编排可用性的核心痛点。

6. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) Auto Memory 泄密风险：需确定性脱敏**（P2/安全，5 评论）
   本地 transcript 内容在脱敏前已进入模型上下文，安全敏感，建议关注修复进展。

7. **[#26522](https://github.com/google-gemini/gemini-cli/issues/26522) Auto Memory 无限重试低价值会话**（P2，4 评论）
   未读取的会话永远标记为未处理，被反复处理，浪费资源。

8. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) Browser subagent 在 Wayland 下失败**（P1，4 评论）
   Linux Wayland 用户浏览器代理完全不可用，P1 级待复测。

9. **[#22267](https://github.com/google-gemini/gemini-cli/issues/22267) Browser Agent 忽略 settings.json 配置（如 maxTurns）**（P2，3 评论）
   配置合并逻辑读取正确但未生效，配置系统一致性问题。

10. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) 超过 128 个工具触发 400 错误**（P2，3 评论）
    MCP/自定义工具多的用户直接被 API 拒绝，需要更智能的工具范围裁剪。

---

## 🔧 重要 PR 进展（Top 10）

1. **[#29244](https://github.com/google-gemini/gemini-cli/pull/29244) 工具文件写入原子化 + 同路径串行化**（P1）
   修复并行工具调用同写一文件时静默丢失编辑的问题——数据完整性关键修复。

2. **[#29436](https://github.com/google-gemini/gemini-cli/pull/29436) 修复引号内 `@` 导致 100% CPU 挂起**（P1）
   `@scope/pkg` 等 import 语句被 @ 路径正则误吞为巨型 token，粘贴代码即触发死循环。

3. **[#29435](https://github.com/google-gemini/gemini-cli/pull/29435) 修复会话退出时进程挂起**（P2）
   stdin 未 pause/unref + MCP transport 未正确关闭，导致 CLI 无法退出。

4. **[#29429](https://github.com/google-gemini/gemini-cli/pull/29429) 展示配额限制与重置窗口**（P1/enterprise）
   读取 `RESOURCE_EXHAUSTED` 中的 `quotaResetTimeStamp` 等元数据，让用户知道何时恢复。

5. **[#29437](https://github.com/google-gemini/gemini-cli/pull/29437) 后台 shell 退出时清理临时目录**（P1）
   防止 `gemini-shell-*` 临时目录泄漏。

6. **[#29432](https://github.com/google-gemini/gemini-cli/pull/29432) Scheduler 销毁时结清排队中的工具调用**（agent）
   避免 dispose 后工具仍执行或调用方永久 pending——与 #21409 挂起问题相关。

7. **[#29423](https://github.com/google-gemini/gemini-cli/pull/29423) 沙箱内持久化目录信任决策**（platform）
   修复 podman/docker 沙箱下每次启动重复弹出信任对话框。

8. **[#29439](https://github.com/google-gemini/gemini-cli/pull/29439)（已合）ACP 模式下权限请求前发送 pending 状态 tool_call**（P1）
   修复 ACP 客户端（如 Zed）等待确认时的状态流。

9. **[#29401](https://github.com/google-gemini/gemini-cli/pull/29401)（已合）规范化 proxy-agent esbuild 互操作**（P1）
   修复企业代理环境下 https-proxy-agent 构造函数解析失败。

10. **[#29319](https://github.com/google-gemini/gemini-cli/pull/29319) SDK sendStream 中 guard JSON.parse**（P2）
    畸形 tool-call 参数 JSON 不再杀死整个流。

> 另有多个文档/小修复已合入：[#29230](https://github.com/google-gemini/gemini-cli/pull/29230)（死锚点）、[#29229](https://github.com/google-gemini/gemini-cli/pull/29229)（设置编辑器拒绝 Infinity）、[#29303](https://github.com/google-gemini/gemini-cli/pull/29303) / [#29304](https://github.com/google-gemini/gemini-cli/pull/29304)（emoji 截断代理对损坏）。

---

## 📈 功能需求趋势

- **Subagent 可靠性**：挂起（#21409）、假成功（#22323）、配置失效（#22267）、bug report 缺上下文（#21763）——多 Agent 是当前问题最集中的领域。
- **Auto Memory 安全与质量**：三个同日更新的 P2（#26525/#26522/#26523）+ 汇总 issue（#26516），显示团队正在系统性整改记忆系统。
- **Token 效率**：AST 感知工具（#22745/#22746）、Tactful Extraction 精准读取（#19561）、持久化任务跟踪替代 in-context todo（#18836/#21000）。
- **安全沙箱**：零依赖 OS 沙箱提案（#19873）、抑制破坏性命令（#22672）、per-workspace 信任策略（#18397）。
- **浏览器代理**：Wayland 支持、会话锁恢复、配置覆盖——browser agent 子系统持续打磨中。

## 🎯 开发者关注点（痛点总结）

1. **Agent 挂起/卡死**是最高频抱怨：generalist agent、交互式提示（#22465）、会话退出挂起，均有对应 PR 修复中。
2. **状态误报**：subagent 失败被包装为成功，破坏对自动化流程的信任。
3. **安全边界**：Auto Memory 在脱敏前发送内容、破坏性 git/DB 操作缺乏防护。
4. **工具数量上限**：重度 MCP 用户撞 128 工具限制。
5. **企业/代理环境**：代理互操作、配额提示、沙箱持久化等 PR 密集落地，企业场景支持明显加强。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 — 2026-09-22

## 📰 今日速览

昨日 Copilot CLI 连发两个版本：**v1.0.88-0** 新增 Ghostty/WezTerm 的 OSC 777 终端通知支持，**v1.0.87** 引入 Auto 路由层的组织级默认策略管控。社区方面，长会话 OOM 崩溃（#4699）、每小时 MCP 重新枚举（#4892）等性能问题持续发酵，另有多个与 v1.0.87 相关的新 Bug 被报告。

---

## 🚀 版本发布

### v1.0.88-0（昨日发布）
- **新增**：为直接运行的 Ghostty 和 WezTerm 会话提供可选的 OSC 777 终端通知
- **改进**：
  - 支持命名空间化的自定义 skills，并在 skill 发现阶段忽略指定 skill 目录
  - MCP 与插件视图现在显示服务器展示名和插件描述，状态更清晰

### v1.0.87（2026-09-21）
- 为 Auto 路由层新增用户级与托管启动默认值，支持严格模式和用户可覆盖的组织策略
- 同模式下连续的 steering 提示合并为一条待处理消息；空输入框中按 ↑ 可取回编辑（包括粘贴文本）

---

## 🔥 社区热点 Issues

1. **[#4699](https://github.com/github/copilot-cli/issues/4699)** — 长 `--resume` 会话触发 V8 堆 OOM 崩溃（OPEN）
   14 小时内 3 次崩溃，均在 4 GiB 堆上限处触发；且 Node 崩溃转储文件被写入用户 cwd，污染工作目录。长期会话用户的核心痛点。

2. **[#4892](https://github.com/github/copilot-cli/issues/4892)** — 扩展宿主与 MCP 服务器每小时重新枚举（OPEN）
   作者更正了最初的“进程泄漏”说法后重新验证了周期性 reload 行为，报告质量高，涉及会话内资源管理。

3. **[#4218](https://github.com/github/copilot-cli/issues/4218)** — 允许用户配置 Auto 模式可用的模型池（OPEN，👍 16）
   高票功能请求：Auto 模式随机选择模型导致成本和行为不可预测，社区希望限定候选模型范围。

4. **[#3399](https://github.com/github/copilot-cli/issues/3399)** — BYOK 支持自定义 HTTP 头（CLOSED，👍 14）
   企业多租户场景（如 X-Tenant-ID）急需的功能，已关闭，可能已实现或纳入规划。

5. **[#1313](https://github.com/github/copilot-cli/issues/1313)** — 会话分支（Session Branching）（CLOSED，👍 13）
   期望从当前会话分叉出新会话并继承完整历史。高票功能请求已关闭，值得关注是否落地。

6. **[#4926](https://github.com/github/copilot-cli/issues/4926)** — Atlassian MCP OAuth 失败（CLOSED）
   1.0.87 新报问题：redirect_uri 端口与 client-metadata.json 声明不匹配，企业用户（含 Zscaler 环境）受阻。

7. **[#4924](https://github.com/github/copilot-cli/issues/4924)** — 桌面端新 worktree 会话缺失自定义 agents（OPEN）
   配置发现先于延迟 checkout 完成，`.github/agents/*.agent.md` 整个会话期间不生效——时序竞争问题。

8. **[#4844](https://github.com/github/copilot-cli/issues/4844)** — `--yolo` 标志被 pre-auth fail-closed 窗口吞掉（OPEN）
   策略解析完成后 bypass 模式未重新应用，涉及权限模型与安全策略交互的边界情况。

9. **[#4837](https://github.com/github/copilot-cli/issues/4837)** — 策略驱动的 enabledPlugins 安装后永不激活（OPEN）
   1.0.83 上通过 device/MDM 和 repo 级设置均可复现，企业插件分发场景的阻塞问题。

10. **[#4888](https://github.com/github/copilot-cli/issues/4888)** — MCP 客户端在成功的 `2026-07-28` discovery 后仍发送 legacy initialize（OPEN）
    协议版本协商缺陷，双时代 MCP SDK 服务器会直接拒绝连接，影响新版 MCP 服务器兼容性。

---

## 🔀 重要 PR 进展

> 今日仅 2 条 PR 更新，且均为文档类提案：

1. **[#4739](https://github.com/github/copilot-cli/pull/4739)** — docs: 终端自有的 macOS 通知方案
   记录 macOS 通知点击问题，提供 MIT 许可的终端通知参考实现及可移植回归测试。与 v1.0.88-0 的 OSC 777 通知方向呼应。

2. **[#4770](https://github.com/github/copilot-cli/pull/4770)** — 记录 WebSocket responses 退出开关
   当网络封锁 WebSocket 或会话出现 `400 input item ID does not belong to this connection` 错误时，文档化可用的逃生通道。

---

## 📈 功能需求趋势

1. **会话管理与持久化**：会话分支（#1313）、hook 携带 sessionId（#1425）、长会话稳定性（#4699）——社区对长周期、可追溯的会话需求强烈。
2. **企业治理与策略管控**：细粒度组织策略（#1971）、BYOK 自定义头（#3399）、Auto 模式托管默认值——与 v1.0.87 的组织策略功能方向一致，企业采用是当前主线。
3. **MCP 生态兼容性**：协议版本协商（#4888）、BigInt 序列化（#4211）、OAuth 兼容（#4926）、GPT 模型 schema 400 错误（#2223）——MCP 集成是 Bug 高发区。
4. **模型可控性**：Auto 模式模型池配置（#4218）、effort 级别回退问题（#3119）——用户要求对成本和模型行为有更强的预测性。
5. **插件/Skills 体系**：插件内嵌 instruction 文件（#2727）、命名空间 skills（已在 v1.0.88-0 落地）。

---

## ⚠️ 开发者关注点

- **内存与性能**：4 GiB 堆 OOM、大仓库 @mention 延迟 5 秒+（#3469）、每小时资源重载（#4892）——长时间/大规模使用场景的稳定性是最大痛点。
- **终端渲染质量**：流式输出字符重复/截断（#3749）、RTL 语言（希伯来语/阿拉伯语）显示方向错误（#3704）。
- **企业环境兼容**：MDM/设备策略下插件不激活（#4837）、fail-closed 窗口吞掉 `--yolo`（#4844）、Linux 沙箱在拒绝 namespace 的主机上静默挂起（#4853）。
- **行为可预测性**：Plan Mode 越权改代码（#1663）、`/ask` 无结果返回（#4253）、排队提示卡住（#4705）——agent 行为与预期不符的信任问题。
- **WSL/Windows 体验**：WSL 升级后卡死（#3385，14 条评论）虽已关闭，但 Windows 生态相关问题仍高频出现。

---

*数据来源：github.com/github/copilot-cli | 生成时间：2026-09-22*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报
**日期：2026-09-22 | 数据来源：MoonshotAI/kimi-cli**

---

## 1. 今日速览

重磅消息：MoonshotAI 官方宣布 **Kimi CLI（本仓库）正式停止维护并归档**，项目已由同团队打造的下一代终端 AI 代理 **Kimi Code CLI**（native binary 架构）取代。1.51.0 作为 kimi-cli 的**最终版本**发布，官方建议所有用户尽快迁移。

---

## 2. 版本发布

### v1.51.0（最终版本）
- **归档准备**：仓库正式归档，README、文档站、安全/贡献策略及 PyPI 元数据指向 Kimi Code CLI（[PR #2659](https://github.com/MoonshotAI/kimi-cli/pull/2659)）
- **版本收尾**：将当前 release notes 归入 1.51.0（CHANGELOG、双语 changelog 及 breaking changes），`packages/kimi-code` stub 版本同步至 1.51.0，不再依赖 `kimi-cli`（[PR #2660](https://github.com/MoonShotAI/kimi-cli/pull/2660)）

---

## 3. 社区热点 Issues（过去 24 小时共 2 条）

| # | 标题 | 状态 | 关注理由 |
|---|------|------|----------|
| [#2661](https://github.com/MoonshotAI/kimi-cli/issues/2661) | 📢 Kimi CLI 停止维护，请迁移至 Kimi Code CLI | OPEN | 官方迁移公告。Kimi CLI 归档，由原生二进制的 Kimi Code CLI 接替，**所有用户需关注迁移路径** |
| [#1534](https://github.com/MoonshotAI/kimi-cli/issues/1534) | CLI 在终端界面乱序且自动重复 | CLOSED | 终端界面渲染 bug，随仓库归档关闭；受影响用户需确认在新版 Kimi Code CLI 中是否复现 |

---

## 4. 重要 PR 进展（过去 24 小时共 3 条）

| PR | 内容 | 状态 |
|----|------|------|
| [#2659](https://github.com/MoonshotAI/kimi-cli/pull/2659) | 仓库归档准备：README、文档站、安全/贡献策略全面指向 Kimi Code CLI | ✅ 已合并 |
| [#2660](https://github.com/MoonshotAI/kimi-cli/pull/2660) | 发布最终版 1.51.0，完成 CHANGELOG 收尾与 kimi-code stub 版本同步 | ✅ 已合并 |
| [#1625](https://github.com/MoonshotAI/kimi-cli/pull/1625) | feat(mcp)：MCP OAuth 增加 `--scope` 可重复选项并修复上游认证流问题 | ⚠️ OPEN，**归档后可能无法合入**，建议作者转向 kimi-code 仓库重新提交 |

---

## 5. 功能需求趋势

从近期动态看，社区关注方向包括：

- **迁移与连续性**：项目向 native binary 架构演进，用户最关心配置、插件与 MCP 集成的迁移兼容性
- **MCP 生态增强**：OAuth scope 细粒度配置（PR #1625）反映社区对 MCP 认证灵活性的需求
- **终端渲染稳定性**：Issue #1534 反映终端界面渲染问题长期存在，需在新 CLI 中验证

---

## 6. 开发者关注点

1. **立即迁移**：kimi-cli 已归档，所有 bug 修复与新功能将只出现在 [MoonshotAI/kimi-code](https://github.com/MoonshotAI/kimi-code)，PyPI 包不再更新
2. **未合并贡献去向**：如 PR #1625 等未合入的贡献，作者需评估向新仓库重新提交
3. **存量问题验证**：旧 issue（如终端乱序）已被批量关闭，建议在新 CLI 中复现并重新提报

---
*明日日报将聚焦新仓库 MoonshotAI/kimi-code 的动态。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-09-22

## 📰 今日速览

OpenCode 发布 **v1.18.32**，修复了 Bedrock 图片附件与 Together AI 流式用量上报问题。Issue 区焦点集中在 **v1.18.30 引发的 SystemPrompt.environment 崩溃回归**（多项相关 issue 已集中关闭）以及 **Web/Desktop 端会话列表不显示** 的长期问题。PR 方面，TUI 自动标签模式、GitLab Duo OAuth 登录和 codemode 一致性修复是今日亮点。

---

## 🚀 版本发布

### v1.18.32
**Core 修复：**
- 修复 Bedrock 图片附件处理，现在仅对 Claude、Nova 和 Llama 4 模型进行 hoist
- 修复 Together AI 流式 usage 上报

**社区贡献（感谢 @dc85）：**
- 文档：为 Zen 添加 DeepSeek V4.1 Flash (#49897)
- 功能：为 Zen 添加 Grok 4.7

---

## 🔥 社区热点 Issues（Top 10）

| # | Issue | 关注理由 |
|---|-------|---------|
| 1 | [#13984](https://github.com/anomalyco/opencode/issues/13984) CLI 无法复制粘贴（61 评论 / 32 👍） | 长期高热痛点：提示"已复制到剪贴板"但 Ctrl+V 无内容，自 2 月持续至今仍 OPEN，影响基础可用性 |
| 2 | [#48811](https://github.com/anomalyco/opencode/issues/48811) macOS 每次提示均报 `a.name` TypeError（47 👍） | v1.18.30 回归 bug 的代表性 issue，已关闭，疑似随新版修复 |
| 3 | [#49158](https://github.com/anomalyco/opencode/issues/49158) `SystemPrompt.environment` TypeError（35 👍） | 同一回归的又一复现报告，升级 1.18.30 后所有 prompt 立即失败 |
| 4 | [#48965](https://github.com/anomalyco/opencode/issues/48965) 同类崩溃（22 👍） | 该回归系列 issue 数量多、👍 高，是今日集中关闭的主要对象，值得确认修复版本 |
| 5 | [#50093](https://github.com/anomalyco/opencode/issues/50093) Zen 免费额度超限后重试计时器跨模型持续膨胀 | 新鲜高热（8 评论）：等待 6 小时后换免费模型，计时器反而更长，用户体验受损 |
| 6 | [#14292](https://github.com/anomalyco/opencode/issues/14292) 会话数据保存到项目目录的 Feature Request（23 👍） | 高 👍 功能需求：目前数据统一存于 `~/.opencode`，用户希望随项目存放便于版本管理 |
| 7 | [#45011](https://github.com/anomalyco/opencode/issues/45011) Web Home 不显示 CLI/TUI 创建的会话 | Web 端项目注册仅存客户端，是“会话列表为空”系列问题的根因之一 |
| 8 | [#42264](https://github.com/anomalyco/opencode/issues/42264) TUI 流式输出时文本消失，TreeSitter worker 栈溢出 | 深度诊断型报告：语法高亮 WASM worker 崩溃导致主线程 busy-loop，显示冻结 |
| 9 | [#50339](https://github.com/anomalyco/opencode/issues/50339) V1→V2 迁移在含大 base64 文件 part 的会话上 OOM | 279MB PDF part 导致每次启动崩溃，V2 升级路径的硬阻塞 |
| 10 | [#50452](https://github.com/anomalyco/opencode/issues/50452) 账户积分消失且无日志（$20 充值归零） | 计费合规类问题，已打上 `needs:compliance` 标签，需官方尽快响应 |

**其他值得留意：** [#50366](https://github.com/anomalyco/opencode/issues/50366)（免费层仅限 OpenCode 内使用）、[#50451](https://github.com/anomalyco/opencode/issues/50451)（OpenCode 2 beta Zen 免费模型返回 HTTP 426）、[#39864](https://github.com/anomalyco/opencode/issues/39864)（Codex OAuth Fast 模型未获得优先吞吐）。

---

## 🔧 重要 PR 进展（Top 10）

1. **[#50456](https://github.com/anomalyco/opencode/pull/50456)** `feat(tui): add automatic tabs mode` — 将布尔 tab 设置升级为 `tabs.mode: auto/on/off`，默认 auto，并自动迁移旧配置
2. **[#50422](https://github.com/anomalyco/opencode/pull/50422)** `feat(core): restore GitLab workflow discovery and add OAuth login` — 恢复 GitLab Duo 工作流发现能力并新增 OAuth 登录
3. **[#50453](https://github.com/anomalyco/opencode/pull/50453)** `fix(cli): flush missed parts when run goes idle` — 修复 `opencode run --format json` 间歇性 stdout 为空的问题（服务端有数据但未输出）
4. **[#50455](https://github.com/anomalyco/opencode/pull/50455)**（已关闭）`feat(codemode): name the closest tool in unknown-tool errors` — 未知工具报错附带最接近的正确工具名，改善 DX
5. **[#50450](https://github.com/anomalyco/opencode/pull/50450)**（已关闭）`fix(codemode)` — 5 项 JS 一致性修复：live Map/Set forEach、generator 原型、delete 非引用等
6. **[#50454](https://github.com/anomalyco/opencode/pull/50454)** `test: stabilize Windows CI without longer timeouts` — 限制 Turbo 并发为 3，系统性解决 Windows CI 不稳定
7. **[#50447](https://github.com/anomalyco/opencode/pull/50447)**（已关闭）`fix(tui): persist MCP sidebar state` — MCP 侧边栏展开状态跨会话/重启持久化
8. **[#50445](https://github.com/anomalyco/opencode/pull/50445)** `fix(desktop): identify updater requests` — 更新器请求统一标识为 `opencode/<channel>/<version>/desktop`
9. **[#50437](https://github.com/anomalyco/opencode/pull/50437)** `fix(app): hide cached panel divider` — 修复 review 面板关闭动画后残留的重复分隔线
10. **[#50318](https://github.com/anomalyco/opencode/pull/50318)** `chore: bump gitlab-ai-provider to 6.15.1` — GitLab provider 依赖从 6.12.1 升至最新

**旧 PR 批量清理：** 多个 8 月的 stale PR（#43912、#43993、#43978、#43960 等）今日被集中关闭，涉及 MCP 超时、Anthropic 工具校验、Console 设备登录 URL 等修复，部分功能可能需要重新提交。

---

## 📈 功能需求趋势

1. **会话/数据管理本地化** — 会话数据随项目目录存储（#14292，23 👍）、归档会话可检索等，反映用户对工作区便携性的诉求
2. **Web/Desktop 与 CLI 数据一致性** — “Web 端会话列表为空”形成 issue 簇（#45011、#46444、#44216、#37096、#42668），是当前最大痛点群，根因指向项目注册机制设计
3. **TUI 交互体验** — 复制粘贴（#13984）、Tab 快捷键（#37077）、会话目录过滤器（#42060）等键盘交互精细化
4. **模型生态扩展** — Zen 上新增 DeepSeek V4.1 Flash、Grok 4.7；社区持续关注免费层策略与额度透明度
5. **ACP/编辑器集成** — ACP 在 Xcode、Zed 等场景的配置与稳定性（#43912、#50236）

---

## ⚠️ 开发者关注点

- **版本回归风险高**：v1.18.30 的 `SystemPrompt.environment` 崩溃影响面大（多个 30+ 👍 issue），建议仍受影响的用户暂留 1.18.18/1.18.20 并关注 v1.18.32 验证效果
- **Windows/WSL 支持薄弱**：Web 会话列表、Desktop ESM provider 加载、Windows CI 稳定性均有专项问题
- **Zen 免费层与计费透明度**：重试计时器膨胀（#50093）、积分无日志消失（#50452）、OpenCode 2 beta 无法使用免费模型（#50451），计费侧信任问题需官方回应
- **V2 迁移健壮性**：ACP 配置加载丢失（#50236）、历史会话迁移 OOM（#50339），升级 2.x 前建议备份
- **长尾基础体验**：剪贴板、shell 补全（fish 语法错误 #41232）、reasoning 思维链显示（#36877）等“小但高频”的问题积累较多

---
*数据截至 2026-09-22 · 来源：github.com/anomalyco/opencode*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 · 2026-09-22

## 一、今日速览

Qwen Code 今日发布 **v0.24.3** 稳定版及配套 Desktop、SDK TypeScript v0.1.14，重点改进 Web Shell（结构化 Shell 结果、移动端导航修复）。社区热度集中在两处：**Remote-SSH 下所有会话创建失败（P1 #12416）** 和 **Web Terminal PTY 打包缺失（P1 #11872）**，另有多条 standalone session 路由 404 问题持续发酵。

---

## 二、版本发布

**v0.24.3**（含 nightly 与同步发布的 desktop-v0.24.3、sdk-typescript-v0.1.14）
- Web Shell：结构化 shell 执行结果、可选轨迹指标、host 设置白名单、移动端导航修复
- core：monitor tool 加入系统提示词指引（daemon 批量 workspace 支持进行中）
- desktop：修复 ACP 权限队列按 session 作用域隔离、channels 共享输出模式
- 无已知破坏性变更
- 注：此前 v0.24.2 Windows 构建失败问题（#12414）已随本版修复并关闭

---

## 三、社区热点 Issues（Top 10）

| # | Issue | 关注理由 |
|---|-------|---------|
| 1 | [#11872](https://github.com/QwenLM/qwen-code/issues/11872) P1 | Web Terminal 报 "PTY not available"：`@lydell/node-pty` 声明但未打包，macOS 签名又拦截本地 prebuild，双因素叠加，13 条评论为今日最热 |
| 2 | [#12287](https://github.com/QwenLM/qwen-code/issues/12287) P2 | workflow retry-from-history 加固工作从 #12190 拆分——该 PR 已膨胀至 ~1900 行、触碰 checkpoint schema 与 runner 恢复语义，拆分审查是大型 PR 治理的典型案例 |
| 3 | [#12416](https://github.com/QwenLM/qwen-code/issues/12416) P1 | Companion 0.24.2 在 Remote-SSH 下所有 `POST /session` 失败（EPIPE / BridgeChannelClosedError），阻塞远程开发主流程 |
| 4 | [#11847](https://github.com/QwenLM/qwen-code/issues/11847) P3 | Session recap（离开摘要）系统提示词硬编码英文，无法跟随会话语言，国际化用户痛点 |
| 5 | [#12303](https://github.com/QwenLM/qwen-code/issues/12303) P2 | 多 session 宿主下的跨会话准入：settle、上限与命名三大开放问题，multi-agent 路线图关键讨论 |
| 6 | [#12414](https://github.com/QwenLM/qwen-code/issues/12414) P1（已关闭） | v0.24.2 Windows 构建在 pwsh 下执行 bash 安装步骤导致无 Windows 产物——已修复关闭，但暴露 CI 跨 shell 脆弱性 |
| 7 | [#12381](https://github.com/QwenLM/qwen-code/issues/12381) P2 | HTTP 网关超时后如何找回 session 创建结果（客户端拿不到 session ID 也无法安全重试），影响弱网/代理环境 |
| 8 | [#12417](https://github.com/QwenLM/qwen-code/issues/12417) P2 | 工具执行 sandbox 加固跟踪（承接 PR #12267 bwrap 改造），Linux 安全边界持续推进 |
| 9 | [#12380](https://github.com/QwenLM/qwen-code/issues/12380) P2 | Managed Agent 双路径架构提案：模型推理与工具环境供给解耦、Session 持久所有权，属平台级方向性讨论 |
| 10 | [#12237](https://github.com/QwenLM/qwen-code/issues/12237) + [#12399](https://github.com/QwenLM/qwen-code/issues/12399) P2/P3 | standalone session 在启动恢复、延迟重载、turn-index 请求中误走 workspace 端点导致 404——同类问题成簇出现，值得统一修复 |

---

## 四、重要 PR 进展（Top 10）

1. [#12267](https://github.com/QwenLM/qwen-code/pull/12267) — bwrap 沙箱从整体 CLI 下沉到单次工具执行，暴露 `tools.executionSandbox` 策略，已过 5 轮审查
2. [#12278](https://github.com/QwenLM/qwen-code/pull/12278) — 新增 Landlock 文件系统沙箱后端，`auto` 模式下作为 bwrap 回退
3. [#12370](https://github.com/QwenLM/qwen-code/pull/12370)（已合入）— 修复 `/review` 覆盖率报告中的 phantom chunk，分母改从 plan 读取
4. [#12255](https://github.com/QwenLM/qwen-code/pull/12255) — 支持 `ssh://` workspace，无需远程 daemon 即可通过本地 daemon 操作远程项目
5. [#12323](https://github.com/QwenLM/qwen-code/pull/12323) — Agent 工具提示词写作指引迁移至 bundled skill，精简系统提示词体积
6. [#12322](https://github.com/QwenLM/qwen-code/pull/12322) — Web Shell 移动端 QR 配对默认开放于非回环监听，60 秒单次邀请机制
7. [#12154](https://github.com/QwenLM/qwen-code/pull/12154) — Git 对话框新增 Worktrees 管理标签页
8. [#12234](https://github.com/QwenLM/qwen-code/pull/12234) — Web Shell 会话内文本搜索
9. [#12410](https://github.com/QwenLM/qwen-code/pull/12410) — Desktop 恢复窗口缩放（快捷键 + Ctrl 滚轮），直接回应 #12406 字号诉求
10. [#12258](https://github.com/QwenLM/qwen-code/pull/12258) — MCP App 三项修复：服务器资源加载上限、App 发起工具调用、iframe 隔离 origin（Tableau App 已可正常渲染）

---

## 五、功能需求趋势

- **Web Shell / Desktop 体验深化**：结构化 shell 结果、worktree 管理、会话内搜索、QR 配对、UI 缩放——Web Shell 已成为最活跃的功能迭代面
- **Session 管理健壮性**：standalone session、跨 workspace 会话目录（#12249）、多 session 宿主准入（#12303）、网关超时恢复（#12381）集中出现，daemon 会话模型正在补课
- **沙箱与安全边界**：bwrap → 工具级沙箱 → Landlock 回退，Linux 沙箱体系化成形；Windows daemon 守卫误杀（#12375）、MCP mime 标签信任（#12290）等安全细节持续打磨
- **多 Agent / 后台自动化**：Managed Agent 架构提案（#12380）、workflow retry-from-history，路线图逐步落地
- **性能**：one-shot headless 启动延迟与内存基线（#12405，RSS 峰值 660→434 MB）

---

## 六、开发者关注点

1. **远程/SSH 场景稳定性**是当前最大痛点：#12416 的 EPIPE 全量失败、#12255 的无 daemon SSH 方案，说明远程开发是高频使用路径但脆弱
2. **打包与平台适配**：node-pty 未打包 + macOS 签名拦截、Windows CI 失败、nightly 连续两次 release 失败（#12382、#12401）——发布工程需加强
3. **大型 PR 治理**：多个 PR 膨胀至数千行后被迫拆分（#12190、#9768），社区已形成"加固工作独立成 issue"的惯例
4. **UI 可读性与国际化**：Desktop 字号不可调、recap 强制英文，细节体验诉求上升

*数据来源：github.com/QwenLM/qwen-code，统计窗口为过去 24 小时（截至 2026-09-22）*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*