# AI CLI 工具社区动态日报 2026-09-24

> 生成时间: 2026-09-23 22:56 UTC | 覆盖工具: 7 个

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
**数据日期：2026-09-24**

---

## 一、生态全景

AI CLI 工具已进入**功能深化与可靠性攻坚并行**的阶段：头部工具（Claude Code、Codex、Gemini CLI）模型迭代与平台能力（企业网关、Bedrock 集成、扩展 API）持续提速，而社区抱怨重心已从“功能缺失”转向“长会话稳定性、权限安全边界、MCP 生产化摩擦”等工程成熟度问题。同时，**AGENTS.md 等开放标准的兼容**（Claude Code PR #95409）和**权限旁路类安全修复的密集出现**（Claude Code、Qwen Code、Gemini CLI 均有）表明生态正从野蛮生长走向规范化。第二梯队（Kimi、OpenCode）则暴露出资源投入不足导致的响应滞后与贡献者流失风险。

---

## 二、各工具活跃度对比

| 工具 | 热点 Issues（Top 10 内） | 今日 PR 活动 | Release | 开发节奏 |
|---|---|---|---|---|
| **OpenAI Codex** | 10 条（多条 13-30 评论） | 10+ 功能 PR | 稳定版 0.156.1 + 5 个 alpha | 极高（日级 alpha 迭代） |
| **Gemini CLI** | 10 条（多为 P1/P2 标签） | 10+ PR，P1 修复密集 | v0.62.0-nightly + preview | 高（P1 修复批量落地） |
| **Claude Code** | 10 条（含批量 stale 关闭） | 6 条，含重要安全修复 | v2.1.281 | 高（企业功能 + 安全双线） |
| **Qwen Code** | 10 条（安全链修复为主） | 10+ PR，社区贡献活跃 | 2 个版本（含 CUA Driver） | 中高（安全加固集中期） |
| **Copilot CLI** | 10 条（50 条/24h 更新） | 仅 1 条 CI 维护 | v1.0.89-1 | 中（Issue 活跃但 PR 沉寂） |
| **OpenCode** | 10 条（53 评论事故贴） | 1 条新 PR + ~20 条机器人清理 | 无 | 低（响应滞后信号明显） |
| **Kimi Code CLI** | 仅 2 条 | 0 | 无 | 极低（疑似维护低谷） |

---

## 三、共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **长会话/大上下文可靠性** | Claude Code、Codex、Gemini CLI、Copilot CLI、OpenCode | 1M token 缓存失效（CC #74544）、压缩后遗忘规则（Codex #25792）、压缩覆写对话记录（Codex #44363）、压缩无限重试计费（Copilot #4663）、/compress 不持久化（Gemini #21335） |
| **权限/沙箱安全边界** | 全部 7 款 | 审查器读取敏感文件（CC PR #96434）、Plan 模式子 agent 绕过（CC #79811）、yolo 模式 rm -rf 越界（Kimi #2596）、Bash 白名单绕过（Qwen #11764）、fail-closed 粒度（Copilot #4512/#4844） |
| **Memory 系统可控性** | Claude Code、Gemini CLI、Qwen Code、Copilot CLI | 仓库本地存储 + 人工裁决（CC #87517/#78398）、脱敏时机（Gemini #26525）、MemoryChanged Hook（Qwen #12558）、store_memory 报错（Copilot #4535） |
| **MCP 生产化** | Claude Code、Gemini CLI、OpenCode、Qwen Code、Copilot CLI | OAuth 元数据被 403（CC #84263）、配置 fail-open（Gemini PR #29445）、跨进程刷新竞态（OpenCode #50994）、工具数超限 400（Gemini #24246）、企业策略拉取失败（Copilot #4512） |
| **Token 经济性** | Qwen Code、Gemini CLI、OpenCode、Copilot CLI | 上下文优先应答（Qwen #12579）、prompt cache 丢失 50% 计费（OpenCode #50258）、重试静默消耗 premium 请求（Copilot #2421） |
| **新模型快速接入** | Codex、Copilot CLI、Gemini CLI | GPT-6 Sol/Luna 双平台同日上线；Gemini 3.8 Flash GA |

---

## 四、差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特点 |
|---|---|---|---|
| **Claude Code** | 企业级管控 + 生态标准兼容 | 企业开发者、重度 IDE 用户 | Apps Gateway、Bedrock IAM 角色分离、策略块管控；主动拥抱 AGENTS.md 开放标准 |
| **Codex** | 模型迭代 + 平台广度 | 全平台用户（Windows 投入大） | Rust 重写、日级 alpha、扩展 API 钩子、Computer Use/Remote Control 多端、GovCloud 深度集成 |
| **Gemini CLI** | Agent 子系统 + 安全默认 | 自动化流水线、Linux 用户 | subagent 体系打磨、零依赖 OS 沙箱探索、AST 感知读取的前沿架构实验 |
| **Copilot CLI** | 企业策略 + GitHub 生态 | 企业 CI/托管策略环境 | fail-closed 安全姿态、托管策略体系，但第三方 provider 开放度低 |
| **Qwen Code** | 安全加固 + 多端/本地化 | 本地 LLM 用户、跨端用户 | 文件身份校验防御性工程、CUA Driver 签名分发、Mesh 多 agent 协作、Web Shell 多端统一 |
| **OpenCode** | 开源/多 provider | 自托管、自定义 provider 用户 | provider 无关架构、ACP 协议、SDK 编排，但 V2 迁移回归集中 |
| **Kimi CLI** | 基础可用性 | 轻量用户 | 数据信号不足以判断路线，维护活跃度是当前主要风险 |

---

## 五、社区热度与成熟度

- **第一梯队（高活跃 + 高投入）**：**Codex** 开发节奏最猛（24h 内 6 个版本、10+ 功能 PR），但**版本回归频发**（#46388、#47511 均为版本回归）是成熟度短板；**Gemini CLI** 官方响应质量最高（P1 问题批量修复 + roadmap 汇总跟踪）。
- **成熟稳定型**：**Claude Code** 迭代稳健，企业功能与安全修复双线推进，但存在**两年未修的高热 issue**（#3301，73 👍），长尾体验债务明显。
- **追赶型**：**Qwen Code** 社区贡献质量高（@yiliang114 安全 PR 连发）、路线图清晰，处于快速补课期；**Copilot CLI** Issue 讨论活跃但 PR 沉寂，投入产出疑似失衡。
- **风险信号**：**OpenCode** 免费层事故 53 评论无官方方案 + 机器人批量关闭有效社区 PR，贡献者流失风险高；**Kimi** 单日仅 2 条 Issue、严重安全问题 #2596 两个月未关闭。

---

## 六、值得关注的趋势信号

1. **“信任”成为新的竞争维度**：subagent 假成功（Gemini #22323）、压缩覆写数据（Codex #44363）、静默计费浪费（Copilot #4663）——agent 自报告状态不可信是行业性缺口，**可验证的任务结果语义**将是下一个差异化战场。

2. **权限旁路是系统性风险模式**：三家（CC、Qwen、Kimi）同日出现权限/沙箱绕过问题，共性是**子 agent、审查器、失败操作重试等“间接路径”绕过主权限模型**。开发者应避免在 yolo/自动模式下暴露敏感目录，企业选型时需审计权限保证的一致性而非仅看主流程。

3. **上下文压缩成为可靠性瓶颈**：压缩引发的遗忘、数据破坏、计费循环、不持久化在 5 款工具上同时出现，说明它是各家共同的技术天花板。**长任务用户应主动分段会话 + 外部持久化任务状态**，不要依赖工具自身的压缩机制。

4. **开放标准与生态互通加速**：Claude Code 官方支持 AGENTS.md、Qwen 对齐 Codex 的 `tools.mode` 枚举——工具间指令与配置标准正在收敛，**降低厂商锁定的同时也在重塑竞争格局**。

5. **模型-工具协同进入新阶段**：GPT-6 Sol/Luna、Gemini 3.8 Flash 同期上线，配套“原生 bash 能力”“AST 感知读取”等架构讨论表明，工具层正从“通用工具集”转向**为特定模型能力定制执行架构**。

6. **Windows 是被低估的投入洼地**：Codex 今日过半热点 issue 带 windows 标签，Qwen 的 64 位文件 ID 系列问题也源于 Windows——**Windows 企业用户选型时应重点验证沙箱与桌面端稳定性**，而非仅看 macOS/Linux 上的评测。

---

**选型建议速览**：企业管控优先 → Claude Code / Copilot CLI；追新模型与多端 → Codex；自动化流水线与安全默认 → Gemini CLI；本地 LLM / 数据自主 → Qwen Code 或 OpenCode（需评估其当前稳定性风险）。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
（数据截止 2026-09-24，来源：anthropics/skills）

## 一、热门 Skills 排行

> 说明：本期 PR 评论数据缺失，综合 PR 内容关联度、关联 Issue 讨论热度及活跃度排序。

1. **skill-creator（触发评估修复系列）** — 社区最热焦点
   - [#1298](https://github.com/anthropics/skills/pull/1298)：隔离触发评估、兼容 Windows、处理运行时失败（OPEN，长期活跃至 9 月）
   - [#1769](https://github.com/anthropics/skills/pull/1769)：修复触发检测恒报 0% recall 的问题（OPEN）
   - 关联 Issue [#556](https://github.com/anthropics/skills/issues/556)（12 条评论）：`claude -p` 完全不触发 skills，触发率 0%
   - **热点**：官方 Skill 开发工具链的评估机制可靠性被大量质疑，是社区最集中的痛点。

2. **mcp-builder**
   - [#1742](https://github.com/anthropics/skills/pull/1742)：适配 `mcp>=2` 的 `streamable_http_client` 重命名与自定义 header（OPEN）
   - 关联 Issue [#1390](https://github.com/anthropics/skills/issues/1390)：evaluation.py 对真实 MCP 服务器全部评 0 分
   - **热点**：MCP 生态快速演进导致官方 skill 兼容性滞后。

3. **docx（文档处理，修复最密集的官方 skill）**
   - [#1792](https://github.com/anthropics/skills/pull/1792)：LibreOffice 超时应报错并校验输出（OPEN）
   - [#1790](https://github.com/anthropics/skills/pull/1790)：comment.py 缺失时自动创建 rels（OPEN）
   - [#541](https://github.com/anthropics/skills/pull/541)：修复 tracked changes ID 冲突导致文档损坏
   - **热点**：OOXML 边界场景与超时静默失败问题频出。

4. **proofcore-contract-auditor** — [#1771](https://github.com/anthropics/skills/pull/1771)（OPEN）
   - Solidity/Rust 智能合约静态分析 + TON 链上审计证明锚定；Web3 方向代表性贡献。

5. **blast-radius** — [#1776](https://github.com/anthropics/skills/pull/1776)（OPEN）
   - 批量/破坏性写操作前的安全检查清单（删除行、批量邮件等），切中 Agent 安全刚需。

6. **md2video-audio** — [#1703](https://github.com/anthropics/skills/pull/1703)（OPEN）
   - Markdown 一键编译为带拟真配音的 MP4 视频（Marp + TTS），内容创作方向。

7. **md2video/pyxel / testing-patterns / AWT** — 长期挂起的老 PR
   - [pyxel #525](https://github.com/anthropics/skills/pull/525)（复古游戏开发）、[testing-patterns #723](https://github.com/anthropics/skills/pull/723)（全栈测试方法论）、[AWT #822](https://github.com/anthropics/skills/pull/822)（AI 视觉 E2E 测试）
   - 均为 2026 年 3 月创建、持续更新至今仍 OPEN，反映外部 skill 合并门槛高。

## 二、社区需求趋势

1. **组织级 Skill 分发与治理**（[#228](https://github.com/anthropics/skills/issues/228)，16 评论）：期待 org 内共享库、直接分享链接，替代 Slack 手传 `.skill` 文件。
2. **安全与信任边界**（[#492](https://github.com/anthropics/skills/issues/492)，43 评论，全库最热）：社区 skill 冒用 `anthropic/` 命名空间构成信任滥用，呼吁签名/验证机制；与 [#1175](https://github.com/anthropics/skills/issues/1175)（SPO 权限写入 SKILL.md 的安全顾虑）同属此类。
3. **上下文效率**（[#1487](https://github.com/anthropics/skills/issues/1487)）：`claude-api` skill 一次注入 ~156k token 耗尽上下文；[compact-memory #1329](https://github.com/anthropics/skills/issues/1329) 提出符号化压缩 agent 状态。
4. **Agent 质量与治理框架**：[agent-governance #412](https://github.com/anthropics/skills/issues/412)、[Reasoning Quality Gate #1385](https://github.com/anthropics/skills/issues/1385)——策略执行、对抗审查、交付验证类 skill 需求上升。
5. **互操作性**：[Skills 暴露为 MCP #16](https://github.com/anthropics/skills/issues/16)、Bedrock 支持 [#29](https://github.com/anthropics/skills/issues/29)。
6. **工程化质量工具**：testing-patterns、skill-quality/security-analyzer（[#83](https://github.com/anthropics/skills/pull/83)）等元 skill 需求。

## 三、高潜力待合并 Skills

- **#1742 mcp-builder 兼容修复**：修复被明确引用的 Issue #1668，目标单一，最可能近期合并。
- **#1792 / #1790 docx 修复**： Tingyu 系列修复定位精准、附带可验证用例，处于活跃 review（9/19–9/23 持续更新）。
- **#1769 skill-creator recall 修复**：修复高关注度 Issue #1721，属社区最痛点，优先级高。
- **#1776 blast-radius**：契合官方对安全类 skill 的方向倾斜。
- **#525 pyxel / #723 testing-patterns**：半年以上持续维护、作者响应积极，是最“长寿”的候选者，但合并前景依赖官方收录策略放宽。

## 四、生态洞察

**社区最集中的诉求是：官方 skill 基础设施（触发评估、MCP 兼容、上下文注入）的可靠性与安全治理机制——即“先把现有 skill 做对、把分发做安全”，而非更多新功能 skill。**

---

# Claude Code 社区动态日报 · 2026-09-24

## 一、今日速览

Claude Code 发布 **v2.1.281**，重点增强了 Claude Apps Gateway 的企业级能力：支持新版 Desktop 密钥策略块与 Bedrock `assume_role`。安全修复方面，PR #96434 修复了 security-guidance 审查器可绕过权限规则读取敏感文件的隐患。社区层面，长期未修的 IDE 终端环境警告问题（#3301）仍是热度榜首。

---

## 二、版本发布

### v2.1.281
- **Desktop 策略块增强**：Claude apps gateway 支持新版 Claude Desktop 密钥，新增 `blockReadsOutsideWorkingDirectories` 与 `disableBypassPermissionsMode` 两个策略项，强化了工作目录读取隔离与权限绕过管控。
- **Bedrock IAM 角色支持**：网关上游可配置 `assume_role`，允许以 IAM 角色身份调用 Bedrock，方便企业级部署的权限分离。

---

## 三、社区热点 Issues

1. **[#3301](https://github.com/anthropics/claude-code/issues/3301) — IDE 终端环境警告反复弹窗**（48 评论 / 73 👍）
   最高热度 issue。每次打开 Cursor/VSCode 集成终端都会出现"Claude Code 想重启终端"警告，长期未修复（自 2025-07 报告），社区抱怨持续累积。

2. **[#87517](https://github.com/anthropics/claude-code/issues/87517) — autoMemoryDirectory 应支持仓库本地存储**
   功能请求：目前仅支持绝对路径，用户希望记忆目录可存于 repo 内，便于团队共享与版本管理。

3. **[#84263](https://github.com/anthropics/claude-code/issues/84263) — CIMD 元数据被 claude.ai 反爬 403，破坏 MCP OAuth**
   新版客户端采用 URL 形态 client id，MCP 服务器需服务端拉取元数据文档，但 claude.ai 的 bot 防护对云出口 IP 返回 403，云端 MCP OAuth 认证受影响。

4. **[#81227](https://github.com/anthropics/claude-code/issues/81227) — VS Code 聊天面板点击二进制文件链接静默失败**
   `showTextDocument()` 无法打开图片/PDF 且未处理 rejection，属典型 UX 细节缺陷。

5. **[#74544](https://github.com/anthropics/claude-code/issues/74544) — 1M 上下文会话缓存失效后 ECONNRESET 且 /compact 同样失败**（已关闭）
   ~520k token 大会话在冷缓存时不可恢复，`/compact` 因需发送全量上下文也失败——大上下文可靠性问题值得长期关注。

6. **[#79664](https://github.com/anthropics/claude-code/issues/79664) — Skill frontmatter model override 被 Skill 工具调用忽略**（已关闭，已复现）
   通过 Skill tool 调用时模型覆盖失效，但用户手动 `/skill-name` 正常，影响 skill 成本/模型路由策略。

7. **[#78398](https://github.com/anthropics/claude-code/issues/78398) — auto-memory 批量审查（promote/keep/discard）机制**（已关闭）
   社区希望对自动记忆增加人工裁决步骤，反映对 auto-memory 可控性的诉求。

8. **[#79811](https://github.com/anthropics/claude-code/issues/79811) — Plan 模式只读保证未对子 agent 强制执行**（已关闭）
   安全语义类问题：Agent tool 派发的子 agent 可绕过 Plan mode 的只读限制。

9. **[#79668](https://github.com/anthropics/claude-code/issues/79668) — 结构化输出生成时 TUI 进度指示器冻结**（已关闭）
   计时器/token 计数停止更新，活跃任务看似挂死，影响用户对任务状态的判断。

10. **[#79815](https://github.com/anthropics/claude-code/issues/79815) — 极端内存泄漏（约 2GB/小时）**（已关闭）
    内存管理类问题的典型案例，长会话场景下的资源稳定性仍是痛点。

> 注：今日更新的大量 issue 为批量关闭的 stale issue（7 月下旬提交），实际新活跃讨论集中在前 4 条。

---

## 四、重要 PR 进展

1. **[#96434](https://github.com/anthropics/claude-code/pull/96434) — 安全修复：审查器不再触碰被拒绝/敏感文件**（Claude bot 提交）
   security-guidance 审查器此前可通过 `git diff`/`git show` 把 `secrets.yaml` 等受权限保护的文件送入模型上下文，本 PR 堵住该旁路。**今日最重要的安全修复**。

2. **[#96487](https://github.com/anthropics/claude-code/pull/96487) — telemetry 行携带引擎版本信息**
   利用 2.1.281 新增的 `$.session.version()`（含 `base`、`builtAt`），修复外部构建上报无版本号的问题。

3. **[#96363](https://github.com/anthropics/claude-code/pull/96363) — diff 传 `--no-color`**
   修复 `color.ui=always` 配置下 ANSI 转义导致 diff hunk 解析为空的问题，细节但实用。

4. **[#96364](https://github.com/anthropics/claude-code/pull/96364) — AGENTS.md 分页读取不再误判为已投递**
   超过 token 上限的整文件 Read 会被自动分页，此前误判为“已交付”导致后续不再附带项目指令。

5. **[#95409](https://github.com/anthropics/claude-code/pull/95409) — AGENTS.md 项目指令 mod**（已合并/关闭）
   引入 `instructionFiles` 选项，使引擎以读取 CLAUDE.md 的方式读取 AGENTS.md，是跨工具生态兼容的关键一步。

6. **[#79150](https://github.com/anthropics/claude-code/pull/79150) — code-review README 与实现对齐**（社区 PR，持续更新）
   清理文档与实际命令流水线的不一致（旧置信度评分系统描述）。

---

## 五、功能需求趋势

| 方向 | 信号来源 | 趋势解读 |
|---|---|---|
| **Auto-memory 可控性** | #87517、#78398 | 社区希望记忆支持仓库级存储 + 人工批量裁决，memory 是当前活跃需求焦点 |
| **MCP 生态健壮性** | #84263、#79711、#79784 | OAuth 认证、移动端调用、连接诊断均有反馈，MCP 生产化仍需打磨 |
| **IDE 集成体验** | #3301、#81227、#79787 | VS Code/Cursor 集成的基础体验问题（弹窗、文件打开、Edit 确认）长期高热 |
| **大上下文可靠性** | #74544 | 1M token 场景下缓存/网络/压缩的联动失败，是高级用户的核心关切 |
| **企业网关与安全** | v2.1.281、PR #96434、#79811 | 官方发力企业策略管控（Bedrock IAM、Desktop 策略块），安全旁路修复密集 |
| **AGENTS.md 标准兼容** | PR #95409、#96364 | 官方 mods 体系主动拥抱 AGENTS.md 开放标准 |

---

## 六、开发者关注点

- **终端弹窗疲劳**：#3301 两年未解（73 👍），是 IDE 用户最直接的可感知痛点。
- **权限模型的“旁路”焦虑**：无论是 Plan 模式子 agent 绕过只读（#79811）还是审查器读取敏感文件（PR #96434），开发者对权限保证的一致性要求在提高。
- **长会话稳定性**：内存泄漏、进度条冻结、大上下文 ECONNRESET，长时任务的可观测性与可恢复性是高频抱怨。
- **MCP 生产部署摩擦**：OAuth 元数据拉取被 403、云端 IP 受限，说明 MCP 在非本机环境落地仍有实际障碍。
- **文档与实现同步**：README 漂移（PR #79150）提示快速迭代下文档可信度下降，社区正在自发补齐。

---
*数据来源：github.com/anthropics/claude-code（过去 24 小时）*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报（2026-09-24）

## 1. 今日速览

Codex 发布稳定版 **rust-v0.156.1**，新增 GPT-6 Sol / GPT-6 Luna 模型选择支持，并继续推进 0.157/0.158 的 alpha 迭代（过去 24 小时内连发 5 个 alpha 版本）。开发活动极为活跃，团队合入大量涉及 Guardian 上下文管理、Windows 沙箱修复和扩展 API 的 PR。社区侧，Windows 桌面端稳定性问题（沙箱初始化、消息发送阻塞）仍是投诉焦点。

---

## 2. 版本发布

**rust-v0.156.1（稳定版）**
- 模型选择器新增 **GPT-6 Sol** 和 **GPT-6 Luna**；触发限流提示时现在会推荐切换到 GPT-6 Luna（#47405）
- [完整 Changelog](https://github.com/openai/codex/compare/rust-v0.156.0...rust-v0.156.1)

**Alpha 快速迭代**：0.158.0-alpha.2 ~ alpha.5、0.157.0-alpha.11、0.155.0-alpha.16.3/16.4 均为常规发布，无附注说明。

---

## 3. 社区热点 Issues

1. **[#45626](https://github.com/openai/codex/issues/45626)** Windows 桌面端完成一轮对话后无法发送后续消息（CLI 不受影响）。30 条评论、持续 8 天未解决，是当前讨论最热烈的问题，严重影响 Windows 用户工作流。

2. **[#44342](https://github.com/openai/codex/issues/44342)** Windows 已有会话因 `loading-local-config` / pending codex-home 被无限阻塞，主窗口重载可恢复但重启会复发。18 条评论，与 #45626 同属 Windows 桌面端消息链路故障。

3. **[#25792](https://github.com/openai/codex/issues/25792)** 上下文压缩（compaction）后遗忘 AGENTS 规则，任务进度从 97% 回退到 42%。长任务可靠性的经典痛点，18 条评论，长任务用户强烈共鸣。

4. **[#20851](https://github.com/openai/codex/issues/20851)** 请求 CLI 一等公民支持 Computer Use（目前仅为桌面插件 + 内置 MCP helper）。39 👍，今日最受赞同的功能请求。

5. **[#15368](https://github.com/openai/codex/issues/15368)** 请求提高 VS Code 扩展的会话数量上限。18 条评论，IDE 重度用户的长期诉求。

6. **[#44363](https://github.com/openai/codex/issues/44363)** 上下文压缩原地覆写 rollout 文件，**永久破坏对话记录**。数据丢失级别问题，值得关注官方修复优先级。

7. **[#40231](https://github.com/openai/codex/issues/40231)** Windows app-server 在执行 shell 命令途中被 `STATUS_CONTROL_C_EXIT` 终止，且为 26.818.5229 版本回归。13 条评论。

8. **[#46388](https://github.com/openai/codex/issues/46388)** CLI 0.155.0 回归：Windows 提权沙箱初始化在运行时路径校验时失败，0.154.0 正常。影响 Windows CLI 用户升级。

9. **[#47555](https://github.com/openai/codex/issues/47555)** 昨日新增：Windows 更新后 Agent 沙箱 setup 卡死，本地 UI 被阻塞但移动端 Remote Control 反而可执行——提示问题出在本地沙箱路径而非后端。

10. **[#47511](https://github.com/openai/codex/issues/47511)** 桌面版 26.917.51856 回归：git commit & push 按钮消失。12 👍，高频操作缺失，预计很快修复。

---

## 4. 重要 PR 进展

1. **[#47689](https://github.com/openai/codex/pull/47689) / [#47690](https://github.com/openai/codex/pull/47690) / [#47686](https://github.com/openai/codex/pull/47686)** Guardian 线程上下文捕获改为无条件启用并移除过时分支——简化历史管理、压缩身份保持和 fork 处理，可能与 #25792 的上下文遗忘问题相关。
2. **[#47691](https://github.com/openai/codex/pull/47691)** 为待处理的 agent 间消息固化 rollout 持久化，提升多 agent 会话的可靠性。
3. **[#47672](https://github.com/openai/codex/pull/47672)** 修复 Windows 10 上 no-reparse 目录打开失败（`OBJ_DONT_REPARSE` 与盘符链接冲突），直接改善 Windows 兼容性。
4. **[#47673](https://github.com/openai/codex/pull/47673)** 细化 Windows 沙箱 setup 错误码（区分 owner 不匹配、removal 进行中等），呼应 #47555 一类难以诊断的沙箱卡死问题。
5. **[#47679](https://github.com/openai/codex/pull/47679)** 扩展 API 新增 `ModelRequestContributor` / `ModelResponseInterceptor` 钩子，扩展可注入 client metadata 并拦截模型响应流——扩展生态重要能力。
6. **[#47683](https://github.com/openai/codex/pull/47683)** 新增 executor 能力发现 V2 基础设施，启动时预热插件与全局 skill 位置。
7. **[#47657](https://github.com/openai/codex/pull/47657)** 为 Bedrock GovCloud（Mantle）端点提供受限默认模型目录（仅 GPT-5.6 Terra / Luna / GPT-5.4），继续深化 AWS 集成。
8. **[#47665](https://github.com/openai/codex/pull/47665)** 保留流式订阅器附加前的早期命令输出，修复完成事件中输出丢失的问题。
9. **[#47654](https://github.com/openai/codex/pull/47654)** Linux 文件描述符清理改为 fork-safe（close-on-exec），修复子进程 spawn 竞态。
10. **[#47678](https://github.com/openai/codex/pull/47678)** Mermaid 流程图支持带引号标签和 `&` 字符，改善 Markdown 渲染体验。

---

## 5. 功能需求趋势

- **新模型支持**：0.156.1 加入 GPT-6 Sol/Luna 表明模型快速迭代是主线；社区同步反馈 GPT-5.6 Luna xhigh 的配额消耗异常（[#45733](https://github.com/openai/codex/issues/45733)）。
- **CLI 能力对齐桌面端**：Computer Use CLI 化（#20851）、API 认证下的 fast mode（[#27940](https://github.com/openai/codex/issues/27940)）呼声高。
- **会话管理**：VS Code 会话上限（#15368）、CLI /resume 按当前 worktree 过滤（[#47485](https://github.com/openai/codex/issues/47485)）。
- **远程/多设备场景**：Remote-SSH 陈旧 app-server（#41849）、macOS 迁移后 Remote Control 409（#36295）、headless SSH 委派工具丢失（#42973）。
- **扩展生态**：模型请求/响应钩子、工具调度观测（#47679、#47662）显示官方在系统性建设扩展 API。

---

## 6. 开发者关注点

1. **Windows 是最大痛点来源**：今日热点 Issue 中过半带 `windows-os` 标签，覆盖沙箱初始化（#46388、#47555）、消息阻塞（#45626、#44342）、app-server 崩溃（#40231）等。团队近期多个 PR（#47672、#47673）显示正在集中攻坚。
2. **上下文压缩的数据安全**：压缩导致规则遗忘（#25792）和 rollout 被覆写（#44363）表明长任务场景下的持久化设计存在结构性风险。
3. **版本回归频发**：0.155/0.156、26.818/26.917 多个版本出现回归（#46388、#47374、#47511），用户升级需谨慎，建议关注版本对比后再更新。
4. **远程与多 agent 可靠性**：Remote-SSH、headless HPC、移动端 Remote Control 场景的会话状态一致性是高级用户的主要摩擦点，相关修复 PR（#47691、#47653）已在推进。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-09-24）

## 一、今日速览

Google 昨晚发布 v0.62.0-nightly 及 v0.61.0-preview.1，核心变化是**正式引入 Gemini 3.8 Flash 与 Gemini 3.5 Flash Lite 作为新一代 GA 模型**。社区讨论焦点集中在 Agent 子系统的可靠性上：subagent 假成功、通用 agent 挂起等 P1 问题持续发酵。此外，一批涉及数据安全的修复 PR（MCP 配置损坏 fail-open、未信任目录 settings.json 被清空）值得所有用户关注。

---

## 二、版本发布

### v0.62.0-nightly.20260923
- **新模型支持**：新增 Gemini 3.8 Flash（`gemini-3.8-flash`）与 Gemini 3.5 Flash Lite（`gemini-3.5-flash-lite`），作为 Flash 与 Flash Lite 层级的最新 GA 模型（[PR #29443](https://github.com/google-gemini/gemini-cli/pull/29443)，已合并）

### v0.61.0-preview.1
- 将上述模型支持补丁 cherry-pick 至 v0.61.0 preview 分支（[PR #29455](https://github.com/google-gemini/gemini-cli/pull/29455)）

---

## 三、社区热点 Issues

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) Subagent 达到 MAX_TURNS 后仍报告 GOAL 成功（P1）**
   13 条评论，讨论最热。`codebase_investigator` 在未做任何分析就撞上轮次上限时仍返回 `success`，掩盖了中断事实。这直接影响任务可靠性与自动化流水线的可信度。

2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) 通用 agent 无限挂起（P1，8 👍）**
   简单操作如创建文件夹也会挂起一小时以上；禁用 subagent 即可绕过。高 👍 数表明受影响用户较广。

3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) 零依赖 OS 沙箱 + 执行后意图路由（P2 增强）**
   社区提出利用 Gemini 3 原生 bash 能力（POSIX 工具链），在不牺牲安全的前提下释放模型潜力，架构讨论价值高。

4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) AST 感知文件读取/搜索/代码库映射 EPIC（P2）**
   探索用 AST 精确定位方法边界，减少错位读取与 token 噪音，是提升 agent 效率的关键方向。

5. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) Auto Memory 密钥脱敏时机过晚（P2，安全）**
   敏感内容先进入模型上下文后才做脱敏，需改为确定性前置脱敏并减少日志，安全敏感用户重点关注。

6. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) 模型几乎不主动使用 skills 与 subagents（P2）**
   即使有高度相关的自定义 skill，模型也不会自主调用，反映调度策略存在缺陷。

7. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) Browser subagent 在 Wayland 下失败（P1）**
   Linux Wayland 用户的基本可用性问题，且同样呈现“GOAL 成功”的误导性终止。

8. **[#22267](https://github.com/google-gemini/gemini-cli/issues/22267) Browser Agent 忽略 settings.json 配置（P2）**
   `maxTurns` 等配置在 `AgentRegistry` 合并后被完全忽略，配置体系一致性问题。

9. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) 工具数超限时触发 400 错误（P2）**
   社区期望 agent 能智能裁剪工具作用域，与 MCP 生态扩张后的工具爆炸问题相关。

10. **[#21335](https://github.com/google-gemini/gemini-cli/issues/21335) /compress 压缩结果不会持久化到会话文件（P2）**
    会话恢复后压缩失效，token 节省归零，长会话用户痛点明显。

---

## 四、重要 PR 进展

1. **[#29443](https://github.com/google-gemini/gemini-cli/pull/29443)（已合并）Gemini 3.8 Flash / 3.5 Flash Lite 模型支持** — 今日最重要变更，已随 nightly 发布。

2. **[#29451](https://github.com/google-gemini/gemini-cli/pull/29451) 限制工具输出大小并优化长循环内存生命周期（P1）** — 解决构建/测试等高频工具调用下内存无限增长问题。

3. **[#29466](https://github.com/google-gemini/gemini-cli/pull/29466) 阻止未信任工作区清空自身 settings.json（P1，安全）** — `gemini mcp add` 在未信任目录中会静默销毁项目配置，此 PR 修复该严重问题。

4. **[#29445](https://github.com/google-gemini/gemini-cli/pull/29445) 区分 MCP 启用配置“损坏”与“缺失”（P1，安全）** — 修复损坏的 `mcp-server-enablement.json` 导致 fail-open、被禁用的 MCP 服务器全部重新暴露给模型的问题。

5. **[#29457](https://github.com/google-gemini/gemini-cli/pull/29457) read-many-files 用 glob 匹配替代模糊子串匹配（P1）** — 修复二进制资源被误判为“显式请求”导致的上下文膨胀 bug。

6. **[#29452](https://github.com/google-gemini/gemini-cli/pull/29452) 解耦工具确认与 IDE diff RPC，防 UI 冻结（P1）** — 修复 IDE 集成终端中按 Enter 无响应的问题。

7. **[#29468](https://github.com/google-gemini/gemini-cli/pull/29468) 连接恢复时显示重试进度指示器（P1）** — 429/503 错误时 UI 不再卡在 "Thinking..."。

8. **[#29436](https://github.com/google-gemini/gemini-cli/pull/29436) 修复 stdin 中引号内 `@` 导致 100% CPU 挂起（P1）** — `@path` 正则回溯灾难的修复。

9. **[#29467](https://github.com/google-gemini/gemini-cli/pull/29467) 移除无效 diff.external 覆盖（P1）** — 修复沙箱内执行 git diff 时的 fatal 错误。

10. **[#29444](https://github.com/google-gemini/gemini-cli/pull/29444) 修复 `gemini mcp enable/disable` 永远匹配不到服务器** — MCP 管理命令级 bug，与 #29445/#29466 共同构成 MCP 配置可靠性修复组。

---

## 五、功能需求趋势

- **Agent 子系统可靠性**（最热）：subagent 状态误报、挂起、不自主调用，是压倒性的讨论重心，官方以 workstream-rollup 汇总跟踪。
- **新模型支持**：Gemini 3.8 Flash / 3.5 Flash Lite 已落地，社区对模型-工具协同（原生 bash 能力、AST 感知）兴趣浓厚。
- **Memory 系统成熟化**：Auto Memory 的脱敏、重试、补丁校验系列 issue（#26516/#26522/#26523/#26525）显示该功能进入打磨期。
- **MCP 生态健壮性**：工具数上限、配置损坏处理、enable/disable 命令修复，反映 MCP 规模化使用后的配套需求。
- **Token 经济性**：`/compress` 持久化、“Tactful Extraction” 精准读取、持久化任务追踪，均指向降低上下文成本。
- **Browser Agent**：Wayland 兼容、配置覆盖、会话锁恢复，多 issue 聚焦其可用性。

## 六、开发者关注点

1. **结果可信度**：subagent “假成功” 是最大痛点——用户无法信任 agent 的自报告状态，亟需真实的中断/失败语义。
2. **配置静默失效/损坏**：settings.json 被清空、MCP 配置 fail-open、配置覆盖被忽略，多处“静默失败”模式引发信任担忧。
3. **安全边界**：密钥脱敏时机、危险命令（`git reset --force`）防护、未信任目录行为，是企业采用的关键门槛。
4. **长会话稳定性**：内存无限增长、挂起、CPU 空转——本轮多个 P1 修复 PR 集中回应此类问题，建议尽快升级到最新 nightly 验证。
5. **IDE 集成体验**：diff RPC 冻结、重试无反馈，IDE 内工作流仍是最常被吐槽的场景之一。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-09-24** | 数据来源：github.com/github/copilot-cli

---

## 一、今日速览

今日发布 **v1.0.89-1**，新增 GPT-6 Sol / GPT-6 Luna 两款模型到模型选择器，并修复 View 工具行范围解析和本地会话输入历史问题。社区讨论聚焦于**长会话稳定性**（认证令牌失效、压缩重试无限计费）与**企业/MCP 环境下的 fail-closed 策略**问题。Issue 活跃度较高（过去24小时更新 50 条），PR 方面仅有 CI 维护类更新。

---

## 二、版本发布

### v1.0.89-1

**Added**
- 模型选择器新增 **GPT-6 Sol** 和 **GPT-6 Luna**（可用时显示）

**Fixed**
- View 工具在 provider 发送扁平化 `view_range` 参数时正确遵循行范围
- 本地会话中，空输入框按 Up 键可召回待发送消息，且不再弹出队列中的提示词

---

## 三、社区热点 Issues（Top 10）

| # | Issue | 关注理由 |
|---|-------|---------|
| 1 | [#2421](https://github.com/github/copilot-cli/issues/2421) HTTP/2 GOAWAY 竞态导致级联重试失败与 premium 请求静默浪费（👍19） | 高赞老问题，合并了 5 个重复 issue，涉及网络层核心连接池逻辑，直接影响计费 |
| 2 | [#2995](https://github.com/github/copilot-cli/issues/2995) 无法使用 DeepSeek API（👍9，已关闭） | 第三方 provider 接入的代表性问题，关注自定义模型端点的呼声持续 |
| 3 | [#2827](https://github.com/github/copilot-cli/issues/2827) 改进所有类型速率限制的 UI 展示（👍9，已关闭） | 长期痛点：用户缺乏实时额度可见性，仅在触发限制时才感知 |
| 4 | [#1063](https://github.com/github/copilot-cli/issues/1063) Zsh 补全失效及文档链接失效（👍7，已关闭） | 影响 CLI 基础上手体验，文档一致性问题 |
| 5 | [#4535](https://github.com/github/copilot-cli/issues/4535) `store_memory` 在 v1.0.81 预发布版报 `Instance id is required`（评论 10） | context-memory 子系统缺陷，记忆功能稳定性受关注 |
| 6 | [#4663](https://github.com/github/copilot-cli/issues/4663) 压缩失败后每轮无变化重试：无限计费、上下文单调增长、无用户可见错误 | ⚠️ 直接造成**计费损失**，无退避/降级机制，严重度高 |
| 7 | [#4929](https://github.com/github/copilot-cli/issues/4929) 进程内认证令牌停止刷新，所有提示失败直到重启 | 长会话用户的高频痛点，`/login` 也无法恢复 |
| 8 | [#4844](https://github.com/github/copilot-cli/issues/4844) `--yolo` 启动参数被 pre-auth fail-closed 窗口吞掉，策略加载后未重新应用 | 权限模式与托管策略交互的边界 bug，影响 CI/自动化场景 |
| 9 | [#4512](https://github.com/github/copilot-cli/issues/4512) MCP registry 策略拉取失败时，本地 stdio MCP server 也被 fail-closed 屏蔽 | 企业/离线环境可用性问题：本地自有配置不应依赖远端策略 |
| 10 | [#4213](https://github.com/github/copilot-cli/issues/4213) 终端 pane 失焦时丢弃 Enter 等按键事件 | 由 20k star 的 agent 多路复用器 herdr 维护者报告，影响整个自动化生态 |

---

## 四、重要 PR 进展

> 过去 24 小时仅更新 **1 条 PR**，无功能性 PR 活动：

- [#4948](https://github.com/github/copilot-cli/pull/4948) **Update github-script action pin**（@klockhoffbjorn-collab，OPEN）
  将 `actions/github-script` 固定引用刷新至 v9.0.0；仓库无运行时依赖清单，`actions/stale` 已是最新，`git diff --check` 通过。纯 CI 供应链维护更新。

---

## 五、功能需求趋势

1. **自定义模型 / 第三方 provider 支持**（#2995、#4003）：接入 DeepSeek、本地/私有模型端点，对齐 VS Code 的 Language Models 能力
2. **长时运行会话稳定性**（#4929、#4663、#2533）：令牌刷新、压缩重试治理、阻塞 shell 命令时的消息可交互性
3. **企业策略与 MCP 生态**（#4847、#4512、#4901、#4796）：托管策略刷新、fail-closed 粒度控制、Atlassian/Entra OAuth 集成
4. **多 agent 可观测性**（#1783、#2682、#2261）：后台子 agent 面板、长命令实时输出、fleet 自定义 agent 分发
5. **权限与自动化体验**（#3877、#3331、#4844）：会话启动自动 allow-all、插件自动更新、启动参数可靠性
6. **终端渲染与兼容性**（#4843、#4213）：Warp 主题适配、失焦按键事件处理

---

## 六、开发者关注点

- **计费透明度与浪费**：HTTP/2 竞态重试（#2421）和压缩无限重试（#4663）都会造成 premium 请求静默消耗，是社区最强烈的不满之一
- **fail-closed 策略过于激进**：pre-auth 窗口吞掉 `--yolo`（#4844）、MCP 策略拉取失败连本地 server 也封禁（#4512），企业用户希望有更细粒度的降级路径
- **长会话可靠性**：认证失效需重启（#4929）、阻塞命令冻结 agent（#2533）表明长时自动化场景仍未被充分覆盖
- **可观测性不足**：速率限制用量、后台子 agent 状态、长命令输出均缺乏 UI 呈现
- **生态兼容性**：Warp、herdr 等第三方终端工具的兼容问题反映 CLI 对非标准环境适配欠佳

---
*本报告基于过去 24 小时 GitHub 公开数据自动汇总，仅供技术分析参考。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报
**日期：2026-09-24**

---

## 1. 今日速览

今日无新版本发布，也无 PR 更新，社区动态集中在 Issues 讨论。最值得关注的是安全问题 [#2596](https://github.com/MoonshotAI/kimi-cli/issues/2596)（OPEN）：Agent 在 yolo 权限模式下对工作区外的真实目录执行了 `rm -rf`，删除了用户会话数据，该问题自 8 月提出至今仍未关闭，值得所有使用高权限模式的用户警惕。此外，登录态相关的老问题 [#1547](https://github.com/MoonshotAI/kimi-cli/issues/1547) 已被关闭。

---

## 2. 版本发布

过去 24 小时无新 Release。（可关注 [Releases 页面](https://github.com/MoonshotAI/kimi-cli/releases) 获取后续更新）

---

## 3. 社区热点 Issues

过去 24 小时内仅更新 2 条 Issue：

- **#2596 [OPEN] Agent 对工作区外已存在目录执行 rm -rf，删除用户会话数据** ⚠️
  作者 @iMaxTomas | 👍 0 | 评论 1
  https://github.com/MoonshotAI/kimi-cli/issues/2596
  **为什么重要**：这是严重的文件安全边界问题。Agent 在 yolo 模式下清理此前创建失败的符号链接时，因未察觉 `ln -sfn` 指向的是一个真实存在的目录，直接执行了递归删除，波及 `~/.pi/agent/sessions` 下的用户数据。这暴露了两个风险叠加：(1) symlink 创建失败的静默错误未被 Agent 感知；(2) 危险命令缺少工作区边界保护。建议避免在含重要数据的目录附近使用 yolo 模式，并关注官方后续的安全修复。

- **#1547 [CLOSED] 生成中途反复报 "Authorization failed" 错误**
  作者 @Philipp-Pfeiffer | 👍 0 | 评论 0
  https://github.com/MoonshotAI/kimi-cli/issues/1547
  **简评**：Linux 环境下（v1.24.0，kimi-for-coding 模型）正常生成过程中登录态失效的问题，历时半年后已关闭。虽然无评论记录解决方案，但状态变更可能意味着问题已在新版本中修复，遇到同类问题的用户可升级验证。

---

## 4. 重要 PR 进展

过去 24 小时无 PR 更新。

---

## 5. 功能需求趋势

基于今日有限的数据，可提炼以下方向：

- **安全与权限管控**：#2596 反映出社区对危险命令（如 `rm -rf`）的沙箱边界、工作区外路径保护、symlink 操作审计的强烈诉求，预计将成为后续版本的重点方向。
- **认证稳定性**：登录态过期/token 刷新类问题（如 #1547）是长期反馈主题，涉及长会话场景下的可靠性。

---

## 6. 开发者关注点

- **yolo 模式风险**：全自动权限模式虽提升效率，但缺乏文件系统破坏性操作的硬性防护。开发者在敏感环境（home 目录、含会话数据的目录）应谨慎授权，或定期备份。
- **Agent 对失败操作的感知能力**：#2596 中 symlink 创建失败但 Agent 未察觉，提示对文件系统操作结果校验的改进需求。
- **长会话稳定性**：认证中断问题影响批量/长任务的连续性，建议关注版本更新日志中的相关修复。

---

*数据来源：github.com/MoonshotAI/kimi-cli | 本日报基于过去 24 小时内的活动数据生成*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-09-24

## 今日速览

今日无新版本发布。社区焦点集中在免费层报错问题（#49433 评论已达 53 条）以及多起计费/订阅相关投诉；安全性方面，`debug config` 明文暴露 API 密钥的问题（#50915）已由 bot PR 快速修复关闭。PR 侧值得注意的是 MCP OAuth 跨进程刷新竞态的修复方案（#50994）仍待合并，同时 automated-pr-cleanup 机器人集中清理了约 20 个 8 月遗留 PR。

---

## 社区热点 Issues

1. **[#49433](https://github.com/anomalyco/opencode/issues/49433)** 免费层报错 "free tier can only be used from within OpenCode"（53 评论 / 15 👍）——影响所有模型，波及多名用户（#49678 为重复报告），是本周最严重的可用性事故，官方尚无明确修复方案。

2. **[#988](https://github.com/anomalyco/opencode/issues/988)** MCP 远程服务器 OAuth 2.1 支持（122 👍）——今日关闭，与 PR #50994 的 OAuth 刷新序列化修复呼应，MCP 体验明显改善，属于高呼声需求的落地。

3. **[#45278](https://github.com/anomalyco/opencode/issues/45278)** 订阅支付被拒（22 评论）——正常使用 3 个月的卡片突然扣款失败，银行确认无问题，属计费系统问题，影响付费用户留存。

4. **[#50258](https://github.com/anomalyco/opencode/issues/50258)** DeepSeek-V4.1-Flash 上游反复丢弃 prompt cache，约 50% 计费为全量重读——直接影响 OpenCode Go 用户的成本，标记 URGENT。

5. **[#50915](https://github.com/anomalyco/opencode/issues/50915)** `debug config` 明文输出 API 密钥（已关闭）——共享终端/录屏场景下的安全隐患，当天由 PR #50956 修复，响应速度值得肯定。

6. **[#49365](https://github.com/anomalyco/opencode/issues/49365)** 升级后 `TypeError: undefined is not an object (evaluating 'a.name')`（10 评论）——提供了完整 DEBUG 日志的回归 bug，是多个重复 issue 的样板报告。

7. **[#45856](https://github.com/anomalyco/opencode/issues/45856)** v2 `serve` 的 Basic Auth 恒返回 401——阻塞 v2 服务端部署的核心场景，长期未解。

8. **[#41848](https://github.com/anomalyco/opencode/issues/41848)** LLM 重试无上限，流错误导致无限循环、UI 卡死在 "Thinking"——`RETRY_MAX_DELAY` 默认值高达 24 天，缺乏用户反馈机制。

9. **[#50775](https://github.com/anomalyco/opencode/issues/50775)** 单个畸形 tool result 导致整个会话永久卡死（"Failed to drain Session"）——单晚复现 33 次，2.0.14 仍存在，稳定性风险高。

10. **[#49630](https://github.com/anomalyco/opencode/issues/49630)** ACP 模式下 `SchemaError` 导致自定义 provider 完全失效——阻塞 ACP 集成用户升级到 2.0.6/2.0.7。

---

## 重要 PR 进展

1. **[#50994](https://github.com/anomalyco/opencode/pull/50994)（OPEN）** 跨进程序列化 MCP OAuth 刷新——修复多进程共用 refresh token 导致授权失效的竞态，关联 #34520，是今日最有价值的新 PR。

2. **[#50956](https://github.com/anomalyco/opencode/pull/50956)（已关闭）** `debug config` 凭据脱敏——统一掩码 API 密钥、HTTP header 及含凭据 URL，不留还原开关，当天修复当天关闭。

3. **[#50989](https://github.com/anomalyco/opencode/pull/50989)（已关闭）** 修正 OpenAIPlugin 的 'astra' 条件判断。

4. **[#44533](https://github.com/anomalyco/opencode/pull/44533)（清理关闭）** VS Code 集成终端中权限审批调用原生 diff 编辑器——功能呼声高但被 automated-pr-cleanup 关闭，或需重开。

5. **[#44524](https://github.com/anomalyco/opencode/pull/44524)（清理关闭）** ACP v2 draft 协议支持——WIP 状态被清理，值得社区重新认领。

6. **[#44514](https://github.com/anomalyco/opencode/pull/44514) / [#44512](https://github.com/anomalyco/opencode/pull/44512)（清理关闭）** Desktop 的 WSL 探测改用 PATH，修复 NixOS/Home Manager 安装不被识别的问题。

7. **[#44492](https://github.com/anomalyco/opencode/pull/44492)（清理关闭）** `disabled_plugins` 配置及插件管理命令——对应长期 issue #7687。

8. **[#44378](https://github.com/anomalyco/opencode/pull/44378)（清理关闭）** AgentRouter provider 原生支持（自定义 User-Agent）。

9. **[#44343](https://github.com/anomalyco/opencode/pull/44343)（清理关闭）** 允许固定 websearch provider 为任意模型启用搜索工具。

10. **[#44342](https://github.com/anomalyco/opencode/pull/44342)（清理关闭）** TUI 与服务器重启后的 pending prompts/permissions 状态对账——修复服务重启丢失待审批请求的问题。

> ⚠️ 观察：今日大量 PR 被 `automated-pr-cleanup` 机器人批量关闭（多为 8 月创建、长期无 review 的社区贡献），虽然内容有价值（WSL、ACP v2、插件管理等），可能造成贡献者流失，建议维护者关注。

---

## 功能需求趋势

- **MCP 与 OAuth 安全集成**：#988 落地 + #50994 修复，MCP 易用性是持续主线
- **上下文/成本控制**：#50258（prompt cache 丢失）、#50944（文件夹作为上下文）、#45498（多仓库变更追踪）
- **模型选择体验**：#50964（Desktop 模型选择器消失）、#50969（模型收藏失效）、#48789（选择器弹窗过小）——V2 迁移回归集中爆发
- **SDK 与编排能力**：#48356（队列消息绑定 agent/model）、#49842（后台子代理、cron、worktree 隔离）
- **平台细节支持**：#43176（Linux PRIMARY 中键粘贴）

---

## 开发者关注点

1. **免费层/计费故障频发**：#49433、#45278、#49867 持续发酵，信任成本上升，官方沟通不足
2. **V2 迁移回归**：V1→V2 兼容性问题集中（模型选择、ACP schema、base prompt 缺 question 工具指引 #50995）
3. **稳定性缺陷**：无限重试（#41848）、会话卡死（#50775）、排队消息时序错乱（#46235）、输出循环复读（#50634）
4. **Provider 兼容性**：NVIDIA 拒绝 `prompt_cache_key`（#49240）、GLM 流式列表截断（#48155）
5. **贡献流程**：automated-pr-cleanup 大规模关闭有效贡献，社区贡献者体验堪忧

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 · 2026-09-24

## 一、今日速览

今日发布 **v0.24.4-nightly** 与 **cua-driver-rs v0.20.11** 两个版本，CUA Driver 首次提供 macOS 签名公证的通用二进制。Issue 活动高度聚焦于**安全性修复链**（64 位文件 ID、MCP 权限规则、会话提交校验），#11848 衍生的一批 follow-up 修复 PR 集中提交，成为当日最显著的开发主线。此外，多个来自社区用户的新功能提案（记忆变更 Hook、HTML 工件公开分享、上下文优先应答）值得关注。

## 二、版本发布

**v0.24.4-nightly.20260923** ([链接](https://github.com/QwenLM/qwen-code/releases))
- 修复 deferred-tool bridge 文档中过时/未测试的描述（PR #12355）

**cua-driver-rs v0.20.11** ([链接](https://github.com/QwenLM/qwen-code/releases))
- macOS：签名 + 公证的通用二进制及 `QwenCuaDriver.app`
- Linux：未签名（x86_64 + arm64，最低 glibc 2.31）
- Windows：未签名 UIAccess worker + 原生 SDK（x86_64 + arm64）

## 三、社区热点 Issues

1. **#12185 (P1)** — web-shell 发布包存在无法解析的 `@/` 类型导入并内联了六个声明的运行时依赖，随发布管道直达 npm 用户。最高优先级打包缺陷。
   https://github.com/QwenLM/qwen-code/issues/12185

2. **#11198 (P1, CLOSED)** — 遥测默认将原始工具错误文本（含 shell 命令行）未经脱敏上传至 RUM，属严重数据隐私问题，今日关闭说明已修复。
   https://github.com/QwenLM/qwen-code/issues/11198

3. **#11764 (P1, CLOSED)** — Bash 白名单规则可被“单引号内反斜杠”绕过，授权第二条未确认命令，安全类高优修复完成。
   https://github.com/QwenLM/qwen-code/issues/11764

4. **#12574 (P2)** — #11848 修复后的 follow-up：repo-context 中两个 plan 身份校验仍用 number 型 inode，在 2^53 以上 fail-open。配套 PR #12577 已提交。
   https://github.com/QwenLM/qwen-code/issues/12574

5. **#12514 (P2)** — 会话提交注册未覆盖所有提交路径与拼写，导致误报“非本会话 agent 提交”而阻止 amend，配套 PR #12556。
   https://github.com/QwenLM/qwen-code/issues/12514

6. **#12496 (P2)** — MCP 客户端将 `-32601`（方法不存在）误判为传输错误，导致 tools-only 服务器被标记为断连，影响 0.23.0 及以上版本用户。
   https://github.com/QwenLM/qwen-code/issues/12496

7. **#12326 (P2)** — 核心架构提案：`tools.eager` 静态手维护列表改为动态选择常驻工具集，且不使 prompt prefix 失效，属 context-performance 路线图关键项。
   https://github.com/QwenLM/qwen-code/issues/12326

8. **#12530 (P2, CLOSED)** — Qwen Live 全平台统一走 Web Shell 端点，原生 macOS Host 改为 opt-in，方向性决策已定。
   https://github.com/QwenLM/qwen-code/issues/12530

9. **#12558 (P3)** — 社区提案：新增 `MemoryChanged` Hook 事件，让第三方感知托管记忆的创建/更新/删除，呼应 hooks-events 路线图。
   https://github.com/QwenLM/qwen-code/issues/12558

10. **#12579 (P3)** — 用户反馈 agent 反复重查会话历史中已有的内容，浪费 token（本地 LLM 尤甚），配套 PR #12580 同日提出“上下文优先应答”策略。
    https://github.com/QwenLM/qwen-code/issues/12579

## 四、重要 PR 进展

1. **#12568 / #12577** — @yiliang114 连发两个 PR，将剩余文件身份比较器全部迁移至 `{ bigint: true }`，彻底关闭 #11848 系列安全缺口。
   https://github.com/QwenLM/qwen-code/pull/12568 · https://github.com/QwenLM/qwen-code/pull/12577

2. **#12531** — MCP 权限模式不再经有损的 `sanitizeToolNameForProvider()` 归一化后比较，防止规则授权同名冲突服务器，安全修复。
   https://github.com/QwenLM/qwen-code/pull/12531

3. **#12539** — deferred-tool bridge 两侧统一工具名解析方式，修复 #10410 遗留的两个安全发现。
   https://github.com/QwenLM/qwen-code/pull/12539

4. **#12580** — 系统提示词加入“上下文优先”应答策略，要求模型先检查对话历史再发起调查。
   https://github.com/QwenLM/qwen-code/pull/12580

5. **#12258** — MCP 支持更大 Apps、作用域工具调用与源隔离，已在远程 HTTPS 渲染器上验证 Tableau 集成场景。
   https://github.com/QwenLM/qwen-code/pull/12258

6. **#12191** — web-shell 发布包加固，针对 #12185 的三处构建/打包缺陷。
   https://github.com/QwenLM/qwen-code/pull/12191

7. **#12107** — 扩展冷加载循环并行化，daemon `GET /extensions` 等全量刷新路径此前严格串行，性能优化。
   https://github.com/QwenLM/qwen-code/pull/12107

8. **#12308** — 外部创建会话时支持 `startupConfig: { modelServiceId, reasoningEffort }`，serve API 能力增强。
   https://github.com/QwenLM/qwen-code/pull/12308

9. **#11206** — Mesh：持久化共享线程的多 Agent 协作——工作区 Agent 身份、任务分配、中途插话、归因结果与运行历史。
   https://github.com/QwenLM/qwen-code/pull/11206

10. **#11854** — 对齐 Codex 的 `tools.mode` 枚举（`direct` / `code_mode` / `code_mode_only`），引入隔立的 `exec` JS 工具。
    https://github.com/QwenLM/qwen-code/pull/11854

## 五、功能需求趋势

- **上下文与 token 效率**：#12326、#12579、#12272（agent 描述约 2000 token）集中反映社区对 prompt 预算与常驻工具面优化的强烈诉求，是当前最活跃的方向（roadmap/context-performance）。
- **安全加固**：文件身份校验（#11848 系列）、MCP 权限（#12531、#12496）、会话提交校验（#12514）构成持续的防御性工程流。
- **Web Shell / 多端体验**：会话内搜索（#12231）、HTML 工件公开分享（#12551）、定时任务会话可发现性（#12576）、桌面端禁用自动更新检查（#12575）。
- **Hook 与可扩展性**：`MemoryChanged` 事件（#12558）、部署托管扩展目录加载（#12183）。
- **Agent 协作与编排**：共享线程协作（#11206）、hybrid code mode（#11854）、会话级模型/推理配置（#12308）。

## 六、开发者关注点

1. **Windows 兼容性是痛点**：64 位 NTFS 文件 ID（#11848、#12574、#12578）、Windows 文件粘贴（#7957）、bwrap 套件误跑在 win32 致 CI 常红（#12270），多起问题围绕平台差异展开。
2. **CI 基础设施脆弱**：ECS runner 更新失败致池过期（#11633）、helper 测试因 ESM 加载方式 repo 级失败（#11937），合并门禁可靠性受影响。
3. **包发布质量**：web-shell 进入 npm 后暴露打包缺陷（#12185），提示发布管道需要更强的 preflight 验证（#12191 正在解决）。
4. **token 浪费引发用户不满**：长描述、重复调查、静态 eager 工具面是本地 LLM 用户的主要抱怨点，社区期待实质优化落地。
5. **遥测隐私信任**：#11198 类“默认开启 + 未脱敏”问题关闭后，用户对遥测默认值的敏感性预计会推动更透明的 opt-in 机制。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*