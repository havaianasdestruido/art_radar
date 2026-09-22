# AI CLI 工具社区动态日报 2026-09-23

> 生成时间: 2026-09-22 22:55 UTC | 覆盖工具: 7 个

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

# AI CLI 工具生态横向对比分析报告 · 2026-09-23

---

## 一、生态全景

AI CLI 工具已从单一终端助手演进为**多模态、多 Agent、平台化**的开发基础设施：语音交互（Codex 语音默认启用、Qwen Live Voice）、全屏 TUI、Web Shell / daemon 架构成为新一代交互标配。头部工具（Claude Code、Codex）在模型迭代驱动下保持高频发布节奏，同时新模型（Opus 5.5、GPT-6 Sol/Luna、Gemini 3.8 Flash）接入 CLI 的周期大幅缩短。社区痛点高度趋同：**长会话稳定性（压缩 OOM、会话损坏）、静默失败、安全边界（fail-open、机器消息伪装）** 是全行业的共性工程债。国产力量（Qwen Code、Kimi）在架构创新（daemon/Web Shell、企业托管分发）上展现差异化竞争力。

---

## 二、各工具活跃度对比

| 工具 | 今日 Release | Issues 活跃 | PR 活跃 | 整体活跃度评价 |
|---|---|---|---|---|
| **OpenAI Codex** | v0.156.0 正式版 + 9 个 alpha | 10 条热点（最高 88 评论） | **20+ PR 合并** | ⭐⭐⭐⭐⭐ 最活跃 |
| **Qwen Code** | v0.24.4 稳定版 + preview + Desktop | 10 条热点（最高 11 评论） | 10+ PR | ⭐⭐⭐⭐⭐ 高活跃、响应极快 |
| **Gemini CLI** | nightly v0.62.0 | 50 条更新 | 27 条更新 | ⭐⭐⭐⭐⭐ 高活跃 |
| **OpenCode** | 无 | 10 条热点（含付费投诉集中爆发） | 10 条进展 + 批量清理 | ⭐⭐⭐⭐ 治理型活跃 |
| **Claude Code** | v2.1.280 | 10 条热点（最高 37 评论 / 74 👍） | **0 条** | ⭐⭐⭐ Issue 侧热、开发侧静默 |
| **GitHub Copilot CLI** | 3 个版本（v1.0.88/88-2/89-0） | 10 条热点 | 1 条 | ⭐⭐⭐ 发布密集、社区互动偏弱 |
| **Kimi Code CLI** | v1.52.0（迁移引导版） | 1 条 | 8 条 | ⭐⭐ 处于退役迁移期 |

---

## 三、共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **长会话稳定性与数据完整性** | Codex、Copilot CLI、Kimi、OpenCode、Gemini CLI | 压缩 OOM 死循环（Copilot #4780）、Compaction 原位覆写破坏对话记录（Codex #44363）、内存压力下会话损坏（Kimi #2336）、auto-compaction 误触发（OpenCode #49965）——**这是全行业第一痛点** |
| **上下文压缩可控性** | Codex、Gemini、OpenCode、Claude Code | 压缩边界恢复（Codex PR #47365）、`/compress` 不持久化（Gemini #21335）、Recap 不可关闭（Codex #41622，86 👍 今日最高赞） |
| **MCP 生态管理与安全** | Gemini、Copilot CLI、Qwen、OpenCode | 配置损坏 fail-open 暴露禁用服务器（Gemini 3 个 P1 PR 集中修复）、enable/disable 命令失效、客户端标识元数据缺失（Copilot #432） |
| **静默失败治理（fail loud）** | OpenCode、Qwen、Gemini、Copilot CLI | 插件静默跳过、粘贴/剪贴板静默失败、企业市场静默不注册——用户一致要求“要么成功、要么明确报错” |
| **Subagent 可靠性** | Gemini、Qwen、Codex、Claude Code | 挂起、误报成功（Gemini #22323）、并发资源保护（Qwen PR #12461）、子代理恢复（Codex PR #47369/47348） |
| **Windows / 桌面端稳定性** | Claude Code、Codex、OpenCode、Copilot CLI | 窗口置顶 Bug（Claude #89467，74 👍）、历史丢失/项目消失（Codex 4 条）、Windows ARM64（OpenCode #19130） |
| **新模型快速接入** | Claude Code、Codex、Copilot CLI、Gemini | Opus 5.5（1M 上下文 + $0.20/Mtok 缓存）、GPT-6 上 Bedrock、Gemini 3.8 Flash |
| **安全边界强化** | Qwen、Claude Code、Gemini、OpenCode | PreToolUse hooks fail-open（Qwen #12457）、机器消息无标记的注入风险（Claude #96157）、Auto Memory 脱敏滞后（Gemini #26525） |

---

## 四、差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|---|---|---|---|
| **Claude Code** | 模型能力驱动（Opus 5.5 + 超大上下文/低缓存成本）、桌面端整合 | 重度专业开发者、长会话用户 | 闭源单模型栈，Cowork/Chat 合并走桌面一体化 |
| **OpenAI Codex** | 语音 + 全屏 TUI 多模态交互、多云（Bedrock） | 效率导向的广泛用户群 | Rust 重写 + 极速 alpha 迭代（单日 9 个预览版） |
| **Gemini CLI** | Subagent/Memory 架构、AST 代码理解、token 效率 | 架构敏感的工程团队 | 开源、nightly 滚动发布，重视工程细节（UTF-16 代理对） |
| **GitHub Copilot CLI** | 企业托管配置、Connector/Marketplace 分发、BYOK | GitHub 企业生态用户 | 深度绑定 GitHub 企业链路，安全权限模型精细 |
| **Qwen Code** | daemon/Web Shell 平台化、本地小模型保护、Termux 移动端 | 本地部署/国产模型用户、企业托管场景 | 对标 Codex 语义（hybrid code mode），社区响应当日闭环 |
| **OpenCode** | 多 provider（Ollama/openai-compatible）、插件生态、V2 架构迁移 | 自定义模型 + 开源生态用户 | 开源中立路线，正经历 V1→V2 迁移阵痛 |
| **Kimi Code CLI** | 技术栈迁移（Python → TypeScript）、CJK 输入兼容 | 中文开发者、ACP 互操作场景 | 退役期，通过 OpenCode/ACP 协议接入外部平台 |

---

## 五、社区热度与成熟度

- **高热度 + 快速迭代**：**Codex**（话题量与 PR 产出双第一，但回归问题频发）；**Gemini CLI**（Issue/PR 更新量大，RFC 式讨论质量高）
- **高热度 + 成熟稳定**：**Claude Code**（Issue 互动强，但 PR 静默、老 Bug 长期未修——#89467 近一个月、#73386 regression 长期悬置，社区耐心在消耗）
- **上升期**：**Qwen Code**（issue 当天立项当天修复的响应速度是七个工具中最快的，daemon 架构提案具前瞻性）
- **转型阵痛期**：**OpenCode**（V2 迁移 + 批量关闭社区 PR，存在贡献者流失风险）；**Kimi**（归档迁移，社区流量已转移）
- **企业稳健型**：**Copilot CLI**（发布密集但社区互动弱，问题集中在企业链路而非核心功能）

---

## 六、值得关注的趋势信号

1. **“压缩即破坏”正在成为信任危机**：Codex #44363（Compaction 覆写原始转录）与 Copilot OOM 死循环表明，上下文压缩从优化项变成了**数据完整性风险项**。建议：重要会话定期备份本地 JSONL，关注各工具的压缩边界恢复机制（Codex PR #47365 是标杆做法）。

2. **语音/多模态是下一代交互入口**：Codex 单日 20+ PR 中近半投向语音，Qwen 推进 Live Voice——但 Claude Code 同期出现语音听写工具回归（#93782），提示**输入方式兼容性测试将成必需**。

3. **daemon / Web Shell 架构成为平台化分水岭**：Qwen 的 Managed Agent 提案、OpenCode 的后台服务、Codex 的 App-server 路由，均指向“CLI → 常驻多 Agent 平台”演进。选型时应关注会话持久化与网关容错能力（Qwen #12381、#11908 值得参考）。

4. **安全模型从“事后权限”转向“不可信输入治理”**：fail-open hooks、机器消息伪装用户输入、MCP 配置损坏暴露——**多 Agent 总线场景下的安全审计**（Qwen #12457、Claude #96157）将成为企业采购的硬性考察项。

5. **非主流环境是隐藏雷区**：kvm64 VM、Wayland、WSL2、VM 共享目录、Windows ARM64、Termux 均有阻断性问题。**部署前自查环境兼容性**应纳入团队 SOP。

6. **配额透明度是新的付费决策变量**：Codex GPT-5.6 Luna 消耗暴涨 4-5 倍（#45867）、OpenCode 付费后不可用投诉集中爆发——社区自发遥测分析（rollout 数据自查）值得每位付费用户掌握。

---

*数据截至 2026-09-23，基于各仓库过去 24 小时公开数据。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

*数据截止：2026-09-23 | 来源：anthropics/skills*

---

## 一、热门 Skills 排行（PR）

> 注：PR 评论数据缺失（undefined），以下按活跃度（更新时间/关联 Issue 讨论度）综合排序。

| # | Skill / PR | 功能与讨论热点 | 状态 |
|---|---|---|---|
| 1 | **skill-creator 触发评估修复** ([#1298](https://github.com/anthropics/skills/pull/1298)) | 修复触发评估误报/漏报问题：per-worker 探针竞争、Windows select() 失败、运行时错误被误判为非触发。与 Issue [#556](https://github.com/anthropics/skills/issues/556)（`claude -p` 0% 触发率，12 条评论）及 [#1769](https://github.com/anthropics/skills/pull/1769)（recall 恒为 0%）呼应，是**社区最痛的技术问题** | OPEN |
| 2 | **proofcore-contract-auditor** ([#1771](https://github.com/anthropics/skills/pull/1771)) | Web3 智能合约静态分析 + TON 链上审计证明锚定（Solidity/Rust）。涉及第三方协议集成，安全审查关注度高 | OPEN |
| 3 | **mcp-builder 修复** ([#1742](https://github.com/anthropics/skills/pull/1742)) | 适配 mcp>=2.0 的 `streamable_http_client` 重命名与自定义 header。关联 Issue [#1390](https://github.com/anthropics/skills/issues/1390)（evaluation.py 对真实 MCP server 全部 0 分） | OPEN |
| 4 | **pyxel 复古游戏开发** ([#525](https://github.com/anthropics/skills/pull/525)) | Python 复古游戏创建/调试/无头验证。3 月提交，持续更新至 9/22，是最长寿的待合并 PR 之一 | OPEN |
| 5 | **md2video-audio** ([#1703](https://github.com/anthropics/skills/pull/1703)) | Markdown → MP4 视频带拟真人配音（Marp + TTS），零成本方案 | OPEN |
| 6 | **AWT AI E2E 测试** ([#822](https://github.com/anthropics/skills/pull/822)) | 零代码 E2E 测试：赋予 Claude 视觉与浏览器控制能力，6 个月持续迭代 | OPEN |
| 7 | **blast-radius** ([#1776](https://github.com/anthropics/skills/pull/1776)) | 批量/破坏性写操作前的安全检查清单（删数据、批量邮件、权限回收前）“爆炸半径”评估 | OPEN |
| 8 | **office 文档系列修复** ([#538](https://github.com/anthropis/skills/pull/538), [#541](https://github.com/anthropics/skills/pull/541), [#1790](https://github.com/anthropics/skills/pull/1790), [#1765](https://github.com/anthropics/skills/pull/1765)) | docx/pdf/xlsx 官方 Skills 的一批社区修复：文件名大小写、w:id 冲突导致文档损坏、rels 缺失、UTF-8 编码 | OPEN |

---

## 二、社区需求趋势（Issues 提炼）

1. **安全与信任机制** — 最热 Issue [#492](https://github.com/anthropics/skills/issues/492)（43 评论）：社区 Skills 冒用 `anthropic/` 命名空间造成信任边界滥用；[#1175](https://github.com/anthropics/skills/issues/1175) 关注 SKILL.md 内嵌权限逻辑的安全性。**社区强烈要求官方/社区 Skills 的分发治理机制**。
2. **组织级协作分发** — [#228](https://github.com/anthropics/skills/issues/228)（16 评论，8 👍）：期望 Skills 组织内共享库、直接分享链接，替代手动传 .skill 文件。
3. **Agent 记忆与上下文管理** — [#1329](https://github.com/anthropics/skills/issues/1329) compact-memory（符号化压缩 Agent 状态）、[#1487](https://github.com/anthropics/skills/issues/1487) claude-api 一次性注入 156k tokens 撑爆上下文。**上下文效率是高频痛点**。
4. **AI 治理与质量控制** — [#412](https://github.com/anthropics/skills/issues/412) agent-governance、[#1385](https://github.com/anthropics/skills/issues/1385) 三阶段推理质量门禁流水线。
5. **测试与验证自动化** — testing-patterns ([#723](https://github.com/anthropics/skills/pull/723))、AWT、skill-quality-analyzer ([#83](https://github.com/anthropics/skills/pull/83))。
6. **文档处理与排版** — ODT 支持 ([#486](https://github.com/anthropics/skills/pull/486))、排版质控 ([#514](https://github.com/anthropics/skills/pull/514))。
7. **互操作性** — Bedrock 支持 ([#29](https://github.com/anthropics/skills/issues/29))、Skills 与 MCP 互通 ([#16](https://github.com/anthropics/skills/issues/16))。

---

## 三、高潜力待合并 Skills

- **skill-creator 双修复**：[#1298](https://github.com/anthropics/skills/pull/1298) + [#1769](https://github.com/anthropics/skills/pull/1769) — 修复核心评估链路，关联多个高热度 Issue，合并优先级最高
- **[#1742](https://github.com/anthropics/skills/pull/1742) mcp-builder 适配 mcp>=2** — 明确修复 #1668，9/19 仍活跃
- **[#525](https://github.com/anthropics/skills/pull/525) pyxel** — 6 个月持续维护，作者响应积极
- **[#822](https://github.com/anthropics/skills/pull/822) AWT** — 持续半年迭代，需求明确
- **[#1765](https://github.com/anthropics/skills/pull/1765) / [#1790](https://github.com/anthropics/skills/pull/1790) docx 小型修复** — 范围窄、修复明确，最易近期落地

---

## 四、生态洞察（一句话总结）

> **社区最集中的诉求是“可信与高效”**：一方面要求官方解决 Skills 的命名空间安全治理、组织级分发和上下文膨胀问题；另一方面大量贡献集中在修复 skill-creator 评估失真与 office/mcp-builder 官方 Skills 的实际缺陷——生态正从“踊跃贡献新 Skill”转向“要求官方 Skill 质量与分发机制跟上生态规模”。

---

# Claude Code 社区动态日报 · 2026-09-23

## 一、今日速览

Claude Code 发布 **v2.1.280**，新增 **Claude Opus 5.5** 作为默认 Opus 模型（1M 上下文，$4/$20 per Mtok，缓存读取仅 $0.20/Mtok），并扩展了全屏模式下的鼠标支持。社区方面，Windows 桌面端窗口置顶无法关闭的 Bug（#89467）持续发酵，37 条评论、74 个 👍，成为关注度最高的问题；多个 2.1.26x 系列引入的回归问题也在持续被追踪。

---

## 二、版本发布

### v2.1.280
- **新模型**：新增 Claude Opus 5.5（`claude-opus-5-5`），成为默认 Opus 模型。1M 上下文窗口，定价 $4/$20 per Mtok，缓存读取 $0.20/Mtok——大上下文 + 低缓存成本对长会话开发者是显著利好。
- **交互改进**：全屏模式下更多列表支持鼠标操作——滚轮可滚动 `/skills` 列表，`/plugin` 中 skill 的状态选项支持点击。

---

## 三、社区热点 Issues

1. **[#89467](https://github.com/anthropics/claude-code/issues/89467)** — Windows 桌面窗口强制置顶且无法关闭（37 评论 / 74 👍）
   影响所有 Windows 桌面用户的基础体验问题，无任何设置、快捷键或菜单项可关闭置顶。创建近一个月仍在活跃更新，是当前社区呼声最高的 Bug。

2. **[#76694](https://github.com/anthropics/claude-code/issues/76694)** — Chat/Cowork 合并后新项目丢失"Choose a folder"，右键菜单退化为仅上传知识库（32 评论 / 27 👍）
   Cowork 与 Chat 合并引入的功能回退，直接影响 Cowork 工作流，跨 Windows/macOS 桌面端。

3. **[#93782](https://github.com/anthropics/claude-code/issues/93782)** — 2.1.269 回归：语音听写工具（Wispr Flow）粘贴内容无法插入 VS Code 集成终端（WSL2）（14 评论）
   有完整复现步骤的回归问题，2.1.268 正常。影响依赖语音输入的无障碍/效率工作流用户，标注为 regression。

4. **[#94553](https://github.com/anthropics/claude-code/issues/94553)** — `persistent: true` 的 Monitor 被强制 30 分钟上限（5 评论 / 5 👍）
   2.1.26x 起长时监控场景（如 CI 观察长任务）被静默截断，且仅在过期时提示一次，需手动重新布防。

5. **[#95566](https://github.com/anthropics/claude-code/issues/95566)** — 原生二进制在 kvm64 CPU 型号的 VM 上 100% CPU 静默挂起（4 评论）
   缺少 SSE4/POPCNT 指令集支持导致，glibc 和 musl 构建均受影响。社区建议安装前增加 CPU 特性预检。

6. **[#95524](https://github.com/anthropics/claude-code/issues/95524)** — Stop hook 的未推送提交检查存在漏检与误报（4 评论）
   无远程 ref 的分支静默通过检查；PR 合并后出现误报。影响依赖该 hook 保证提交安全的工作流。

7. **[#96157](https://github.com/anthropics/claude-code/issues/96157)** — `/code-review` 的 apply-findings 步骤以裸文本占据用户回合，无 machine-generated 标记（新增）
   安全相关问题：机器生成的指令与人类输入无法区分，可能被用于注入。涉及 `area:security`，值得关注。

8. **[#73386](https://github.com/anthropics/claude-code/issues/73386)** — Edit/Write 在 VM 共享文件夹上已存在文件时报 `ENOENT: fchmod`（9 评论，regression）
   影响 VM 共享目录开发环境的文件编辑核心功能，长期未修复。

9. **[#68083](https://github.com/anthropics/claude-code/issues/68083)** — 桌面端全局 "Auto-fix CI" 开关对本地 `gh` 创建的 PR 不生效且不持久化（4 评论 / 7 👍）
   与 #90665（要求默认开启 Auto-fix 的配置项）同属一个高频需求方向：CI 自动修复的配置能力。

10. **[#84371](https://github.com/anthropics/claude-code/issues/84371)** — `CLAUDE_CODE_LOCAL_BINARY` 环境变量在桌面端为死代码，读取后即丢弃（1 评论 / 2 👍）
    阻碍高级用户在桌面端使用自定义/本地二进制，代码层面已被确认无调用点。

---

## 四、重要 PR 进展

过去 24 小时内无更新的 Pull Requests。

---

## 五、功能需求趋势

从近期 Issues 提炼出的社区需求方向：

- **配置持久化与默认行为**：Auto-fix CI、桌面端各项开关的持久化（#68083、#90665），反映用户对"设置一次、全局生效"的强烈诉求。
- **配额灵活度**：个人订阅额度转让/共享池化（#90152），家庭/团队共享方案仍是热门话题。
- **子代理（Subagent）管理**：子代理与会话间的升降级、上下文回收（#80798 已 stale，但需求真实存在）。
- **健壮性要求**：长时任务（Monitor persistent 模式）、跨平台文件系统（VM 共享目录）、老旧 CPU/虚拟化环境的兼容性预检。
- **可观测性与安全边界**：机器生成消息的显式标记（#96157）、权限提示信息完整性（Grep/Glob 目标路径展示）。
- **桌面端体验**：窗口管理（置顶）、主题跟随系统、会话侧边栏分组稳定性等基础体验问题占比高。

---

## 六、开发者关注点

1. **回归问题频发于 2.1.26x 系列**：听写粘贴（#93782）、Monitor 30 分钟上限（#94553）均为近期版本引入，提示团队在快速迭代中需要更强的回归测试覆盖。
2. **Windows/桌面端是重灾区**：评论数前两位均为桌面端问题，窗口置顶（#89467）长期未解正在消耗社区耐心。
3. **Wearables/输入方式兼容性**：语音听写工具在 WSL2 + VS Code 终端场景失效，影响效率工具链用户。
4. **信任与安全模型**：#96157 暴露的"机器消息伪装成用户输入"问题，以及 Stop hook 检查不可靠（#95524），说明自动化的可信标记机制需要加强。
5. **非主流环境支持**：kvm64 VM、VM 共享文件夹、musl 构建等边缘环境的安装与运行问题持续存在，建议部署前自查环境兼容性。

---

*数据来源：github.com/anthropics/claude-code（过去 24 小时）*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 · 2026-09-23

## 📌 今日速览

Codex CLI 发布 **v0.156.0** 正式版，带来全新全屏 TUI 界面（`/tui`）并将语音对话设为默认启用。开发团队当日合并了 20+ 个 PR，集中优化语音会话管理、线程恢复机制和 Windows 沙箱安全。社区方面，Windows 桌面端历史记录丢失、会话上下文错乱等老问题持续发酵，配额消耗异常上涨的新报告值得警惕。

---

## 🚀 版本发布

### rust-v0.156.0（正式版）
- **全屏 TUI 界面**：通过 `/tui` 启动，支持对话记录搜索、鼠标选择与右键复制
- **语音对话默认启用**：F8 快捷键开关，新增 `/voice settings` 设置选择器，内置音频资源

另发布 0.157.0-alpha.2 ~ alpha.10 共 9 个预览版，迭代节奏极快。

🔗 https://github.com/openai/codex/releases

---

## 🔥 社区热点 Issues（Top 10）

| # | Issue | 亮点分析 |
|---|-------|---------|
| 1 | [#8648](https://github.com/openai/codex/issues/8648) 多轮对话中模型回复旧消息而非最新消息 | **88 评论 / 64 👍**，跨版本长期存在的上下文错乱核心 bug，影响所有重度用户 |
| 2 | [#45019](https://github.com/openai/codex/issues/45019) App-server 排队跟进消息丢失 | **24 评论 / 60 👍**，高共鸣，排队消息"不复存在"直接中断工作流 |
| 3 | [#41622](https://github.com/openai/codex/issues/41622) 请求增加配置项禁用自动对话 Recap | **21 评论 / 86 👍**（今日最高赞），社区对 Recap 功能的干扰性强烈不满 |
| 4 | [#41079](https://github.com/openai/codex/issues/41079) Windows 分页线程历史在重复序号处卡住 | 36 评论，本地历史投影停滞但 rollout JSONL 完整，诊断报告质量高 |
| 5 | [#42215](https://github.com/openai/codex/issues/42215) Windows ChatGPT Work 项目上下文同步失败 | 36 评论，"Could not use this project for a local chat"反复出现，阻断 Work 功能 |
| 6 | [#42739](https://github.com/openai/codex/issues/42739) Windows 桌面更新后本地项目从侧栏消失 | 26 评论，更新引发状态丢失的典型案例，与 #46987 相互印证 |
| 7 | [#32492](https://github.com/openai/codex/issues/32492) Windows 安装卡在 "Finish Windows setup"，无 UAC 弹窗 | 16 评论，长期未解的沙箱安装问题，同类还有 #40550、#37940 |
| 8 | [#44363](https://github.com/openai/codex/issues/44363) 上下文压缩原位覆写 rollout，永久破坏对话记录 | 9 评论，**数据完整性风险**，Compaction 直接销毁原始转录 |
| 9 | [#45867](https://github.com/openai/codex/issues/45867) GPT-5.6 Luna 配额消耗较 8/31 暴涨 4-5 倍 | 8 评论，附详细本地遥测对比，若非个例将影响付费决策 |
| 10 | [#37213](https://github.com/openai/codex/issues/37213) 桌面端不再显示正在运行的命令 | 8 评论 / 22 👍，可观测性回退，削弱用户对 Agent 的信任感 |

---

## 🛠 重要 PR 进展（Top 10）

1. **[#47381](https://github.com/openai/codex/pull/47381) 语音对话跨 TUI 线程导航持续运行**——切换线程不再中断通话，配合 v0.156 语音默认启用
2. **[#47380](https://github.com/openai/codex/pull/47380) 语音控制统一路由至 App 层**——`/voice`、`/voice mute` 等按线程作用域分发
3. **[#47365](https://github.com/openai/codex/pull/47365) 从最新压缩边界恢复模型上下文**——直接回应 #44363 类压缩/恢复痛点，避免恢复过期状态
4. **[#47361](https://github.com/openai/codex/pull/47361) 限制 Windows 沙箱默认对象访问至登录会话**——安全加固，防止跨登录会话 DACL 篡改
5. **[#47347](https://github.com/openai/codex/pull/47347) GPT-6 Sol / Luna 登陆 Amazon Bedrock**——多云支持扩展，Sol 成为默认模型
6. **[#47340](https://github.com/openai/codex/pull/47340) 条件化打断当前回合并保留待处理输入**——核心交互增强，为精细控制 Agent 打断提供 API
7. **[#47375](https://github.com/openai/codex/pull/47375) 本地 MXC 沙箱 opt-in 偏好**——Windows 本地执行新后端试验，可能缓解沙箱安装系列问题
8. **[#47362](https://github.com/openai/codex/pull/47362) exec-server 入站请求统一限额**——跨 stdio/WebSocket/Relay 传输的 8 KiB 消息限制，健壮性提升
9. **[#47369](https://github.com/openai/codex/pull/47369) / [#47348](https://github.com/openai/codex/pull/47348) 子代理恢复/生成并行化**——最多 8 个后代元数据并发读取，提升多 Agent 场景性能
10. **[#47350](https://github.com/openai/codex/pull/47350) 云端 Skill 目录跨回合复用**——消除每回合重复发现，降低延迟与配额浪费（与 #45867 相关）

其他值得注意：[#47358](https://github.com/openai/codex/pull/47358) `codex doctor` 按检查状态着色、[#47353](https://github.com/openai/codex/pull/47353) 保留 `invalid_prompt` 错误分类。

---

## 📈 功能需求趋势

1. **Windows 桌面稳定性**（最大声量）：历史记录丢失、项目侧栏消失、沙箱安装失败——相关 Issue 超过 10 条，是当前最集中的抱怨区
2. **上下文与压缩可控性**：Compaction 破坏转录、Resume/Fork 状态错乱、Recap 不可关闭
3. **可观测性回归**：命令执行不再展示、配额消耗不透明（#45867 的遥测分析正是社区自发的努力）
4. **多云 / 多模型支持**：Bedrock 接入 GPT-6，第三方 Provider 兼容持续演进
5. **语音与多模态交互**：v0.156 全面铺开，PR 密集跟进，是当前官方投入最重的方向

---

## ⚠️ 开发者关注点

- **数据安全焦虑**：#44363（Compaction 覆写原始记录）触及底线——建议重要会话定期备份 `~/.codex/` 下的 JSONL
- **配额账单异常**：若使用 GPT-5.6 Luna，建议对照本地 rollout 遥测自查消耗（参考 #45867 方法论）
- **Windows 用户避坑**：暂缓依赖 Projects 侧栏的关键工作流；沙箱安装失败可关注 MXC 沙箱（#47375）后续进展
- **CLI 升级建议**：v0.156 的全屏 TUI + 语音是显著体验升级，但若依赖 `thread/resume` 的 `developerInstructions`，注意 #19045 尚未修复

---
*数据截至 2026-09-23 · 来源: github.com/openai/codex*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 · 2026-09-23

## 📌 今日速览

Gemini CLI 昨晚发布 v0.62.0 nightly 版本，包含 proxy-agent 环境代理解析修复和 ACP 模式工具调用时序修复。社区方面，**MCP 配置安全与可用性**成为今日 PR 焦点，多个 P1 级修复集中处理 `mcp-server-enablement.json` 损坏导致禁用服务器“fail-open”暴露给模型的安全隐患；同时一条 P1 PR 尝试引入 **Gemini 3.8 Flash / 3.5 Flash Lite** 新模型支持（已被关闭，值得关注后续动向）。Issues 端，Subagent 可靠性（挂起、MAX_TURNS 误报成功）仍是讨论最热烈的话题。

---

## 🚀 版本发布

**v0.62.0-nightly.20260922.gd5b3e3acc** — [Release 链接](https://github.com/google-gemini/gemini-cli/releases)

- **fix(core)**: 规范化 proxy-agent 的 esbuild interop，修复环境代理解析（PR [#29401](https://github.com/google-gemini/gemini-cli/pull/29401)）
- **fix(cli)**: ACP 模式下在 `request_permission` 之前先发出 tool_call 更新，修复权限请求时序问题

---

## 🔥 社区热点 Issues（Top 10）

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) Subagent 触达 MAX_TURNS 后误报 GOAL 成功**（P1，13 评论）
   隐藏中断的“假成功”会误导上层 Agent 决策，是可观测性层面的关键缺陷，社区讨论最为热烈。

2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) Generalist agent 无限挂起**（P1，8 评论 / 8 👍）
   简单的文件夹创建操作也会挂起超过一小时，👍 数最高，说明影响面广，被标记 need-retesting。

3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) 零依赖 OS 沙箱 + 执行后意图路由**（P2，9 评论）
   利用 Gemini 3 模型原生的 bash 能力（grep/sed/awk 链式调用），同时兼顾安全性，是大方向的架构提案。

4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) AST 感知的文件读取/搜索/代码库映射评估**（P2，7 评论）
   EPIC 级调研：AST 工具可精确定位方法边界、减少 token 噪声，可能重塑 `codebase_investigator`。

5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) 模型几乎不主动使用 Skills 和 Sub-agents**（P2，6 评论）
   自定义 skill 需显式指令才被调用，反映工具选择策略的普遍痛点。

6. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) Auto Memory 缺乏确定性脱敏**（P2 · security，5 评论）
   密钥脱敏发生在内容已进入模型上下文之后，且日志记录过多，属隐私安全隐患。

7. **[#26522](https://github.com/google-gemini/gemini-cli/issues/26522) Auto Memory 对低信号会话无限重试**（P2，4 评论）
   未被 `read_file` 读取的会话永远标记为未处理，造成后台 Agent 重复处理。

8. **[#22267](https://github.com/google-gemini/gemini-cli/issues/22267) Browser Agent 忽略 settings.json 配置覆盖**（P2，4 评论）
   `AgentRegistry` 正确合并了配置但 Browser Agent 完全不读取，如 `maxTurns` 失效。

9. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) Browser subagent 在 Wayland 下失败**（P1，4 评论）
   Linux Wayland 桌面用户的硬阻断，标记 need-retesting。

10. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) 工具数 > 128 时触发 400 错误**（P2，3 评论）
    MCP 生态扩张下工具数量爆炸的现实问题，需要更智能的工具作用域裁剪。

---

## 🔧 重要 PR 进展（Top 10）

1. **[#29451](https://github.com/google-gemini/gemini-cli/pull/29451)** 限制工具输出大小并优化长时运行 Agent 循环的内存生命周期 — 解决构建/测试类高频工具调用下内存无限增长问题。

2. **[#29443](https://github.com/google-gemini/gemini-cli/pull/29443)**（已关闭）引入 **Gemini 3.8 Flash / 3.5 Flash Lite** GA 模型 — P1 但被关闭，可能因流程或命名问题，值得追踪后续。

3. **[#29448](https://github.com/google-gemini/gemini-cli/pull/29448)** 修复无限认证循环（P1）— 解决 Windows/WSL/headless 环境下文件争用、keyring 不可用导致的死循环（#28341），提供加密文件存储回退。

4. **[#29445](https://github.com/google-gemini/gemini-cli/pull/29445)** 区分“不可读”与“缺失”的 MCP 启用配置（P1）— 修复损坏的 `mcp-server-enablement.json` 导致用户禁用的 MCP 服务器被错误暴露给模型，且覆写历史配置。

5. **[#29446](https://github.com/google-gemini/gemini-cli/pull/29446)** 同主题补充修复（P1）— ENOENT 与 malformed JSON 区分处理，与 #29445 形成竞合。

6. **[#29444](https://github.com/google-gemini/gemini-cli/pull/29444)** `gemini mcp enable/disable` 从未匹配到任何服务器 — 命令行 MCP 管理功能实际完全失效的根因修复。

7. **[#29402](https://github.com/google-gemini/gemini-cli/pull/29402)** PersistentState 写入容错（P1）— 临时文件 + fsync + 原子 rename，防止中断导致 `state.json` 截断清空。

8. **[#29450](https://github.com/google-gemini/gemini-cli/pull/29450)** a2a-server V1→V2 设置迁移 — 分层 V2 配置 schema 并保持 V1 平面配置的内存级兼容。

9. **[#29304](https://github.com/google-gemini/gemini-cli/pull/29304)** 截断时避免拆分 UTF-16 代理对 — 修复 emoji 被截断后静默消失的渲染 bug，体现国际化细节关注。

10. **[#29449](https://github.com/google-gemini/gemini-cli/pull/29449)** 新增 PkgDiet 内置 Skill — 自动拦截 `npm install`，安装前通过 PkgDiet MCP 检查包健康度、体积与弃用状态。

---

## 📈 功能需求趋势

| 方向 | 代表 Issue | 趋势解读 |
|---|---|---|
| **Subagent 架构成熟化** | #22323 / #21409 / #20195 / #22598 | 最大热点：挂起、误报成功、配置失效、轨迹不可见，子 Agent 全链路可靠性成为工作流主线 |
| **Auto Memory 质量与隐私** | #26525 / #26522 / #26523 / #26516 | 5 月集中提出的 Memory 系列问题持续发酵，脱敏、幂等性、patch 校验是焦点 |
| **代码理解升级（AST/精准读取）** | #22745 / #22746 / #19561 | 从"firehose 式全文件读取”转向 AST 感知和 token 节俭的外科手术式提取 |
| **安全与沙箱** | #19873 / #22672 / #26525 | 零依赖 OS 沙箱、破坏性命令防护、确定性脱敏——安全诉求贯穿 Agent 执行层 |
| **Browser Agent 健壮性** | #22267 / #22232 / #21983 | 配置覆盖、会话接管/锁恢复、Wayland 兼容 |
| **新模型支持** | PR #29443 | Flash 系列新模型迭代进入 CLI 支持节奏 |
| **任务追踪持久化** | #18836 / #21000 | 废弃 in-context WriteToDo，转向文件系统 CRUD 追踪以对抗 context rot |

---

## ⚠️ 开发者关注点（痛点总结）

1. **子 Agent 可靠性是最大痛点**：挂起（#21409）、假成功（#22323）、`/bug` 报告不含子 Agent 上下文（#21763），排查和信任成本高。
2. **MCP 管理体验脆弱**：enable/disable 命令失效 + 配置损坏即 fail-open（PR #29444/29445/29446 三个 PR 集中修复），暴露生态扩张下的工程债。
3. **长时运行稳定性**：内存无限增长（PR #29451）、`/compress` 不持久化（#21335）、`state.json` 截断损坏（PR #29402）——长时间 Agent 会话的健壮性普遍不足。
4. **认证流程易死循环**：Windows/WSL/headless 环境认证循环（PR #29448）与 `401` 子串误判（PR #29242）影响可用性。
5. **工具调度与上下文成本**：模型不主动用 skill（#21968）、工具数超限 400 报错（#24246）、每回合约 36.6k token 基线过高（#19561），token 效率是持续诉求。

---

*数据来源：github.com/google-gemini/gemini-cli · 统计窗口：过去 24 小时（Issues 50 条更新 / PR 27 条更新）*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-09-23** | 数据来源：github.com/github/copilot-cli

---

## 一、今日速览

过去 24 小时 Copilot CLI 连发三个版本（v1.0.88 / 1.0.88-2 / 1.0.89-0），带来 claude-opus-5.5 模型支持、OSC 777 终端通知及多项权限体验修复。社区侧，**会话稳定性（OOM、session 卡死、auth token 失效）成为当前最集中的痛点类别**，多起 session wedge / compaction OOM 问题持续获得讨论。

---

## 二、版本发布

**v1.0.89-0**
- 新增 claude-opus-5.5 模型支持
- Connector 授权流程改进：connect/reconnect 时显示可复制的授权 URL 及 managed consent 进度

**v1.0.88 / v1.0.88-2 / 1.0.88-1**
- 新增可选 OSC 777 终端通知（直接支持 Ghostty 和 WezTerm 会话）
- 修复：底部锚定对话框（含登录设备码）中可正常选中文本
- 修复：managed-settings 刷新失败时保留 `/allow-all`；精确记录 session 级目录授权（可通过 `/list-dirs` 查看、`/reset-allowed-tools` 清除）
- 修复：Sandbox 网络拒绝中 proxy tunnel 失败的场景

---

## 三、社区热点 Issues（Top 10）

1. **#4438** — `disable-model-invocation: true` 使项目 Skill 完全不可达（7 评论 / 9 👍）。Skill 配置语义与预期（仅禁用模型主动调用）不符，属高呼声的功能性缺陷。[链接](https://github.com/github/copilot-cli/issues/4438)

2. **#432** — 请求 CLI 调用 MCP server 时携带标识元数据（6 评论）。涉及生态互操作性，MCP 服务端无法区分客户端来源。[链接](https://github.com/github/copilot-cli/issues/432)

3. **#4556** — 服务端管理的 `extraKnownMarketplaces` 拉取成功但静默不注册（4 评论）。企业插件分发链路上的“静默失败”，排查成本高。[链接](https://github.com/github/copilot-cli/issues/4556)

4. **#4780** — Session compaction OOM 死循环，`--resume` 也无法恢复（3 评论 / 3 👍）。默认 ~4.3 GB 堆上限下长会话不可恢复，稳定性关键问题。[链接](https://github.com/github/copilot-cli/issues/4780)

5. **#4639** — event-storage 耗尽触发重试风暴 → GC/compaction 循环 → Node OOM（3 评论）。与 #4780 同属长会话资源管理问题。[链接](https://github.com/github/copilot-cli/issues/4639)

6. **#4755** — Session 永久卡死：queued-lane 消息落在 turn 末尾时 idle 收尾被抑制（3 评论）。只能杀进程恢复，严重影响可用性。[链接](https://github.com/github/copilot-cli/issues/4755)

7. **#4929** — 长驻进程 auth token 停止刷新，所有 prompt 失败直至重启（2 评论，昨日新报）。/login 无法恢复，仅重启可用。[链接](https://github.com/github/copilot-cli/issues/4929)

8. **#4602** — managedSettings 在 serverFetchFailed 时“fail closed”，导致 `store_memory` 失败 + 全部 MCP server 被剥离。作者梳理了多个 issue 的共同根因，triage 价值高。[链接](https://github.com/github/copilot-cli/issues/4602)

9. **#4851** — Azure MCP registry 校验 BrokenPipe，运行数月的配置一夜失效（5 👍）。企业 Azure 用户影响面较大。[链接](https://github.com/github/copilot-cli/issues/4851)

10. **#4919** — `/ask` 在 `/models auto` 模式下报“模型不支持”（3 评论）。常用交互路径上的高频使用问题。[链接](https://github.com/github/copilot-cli/issues/4919)

---

## 四、重要 PR 进展

本期仅 1 条 PR 更新：

1. **#4770** — [OPEN] 文档化 WebSocket responses 退出机制。说明当 WebSocket 传输不可用（网络封锁或 `400 input item ID does not belong to this connection`）时的禁用方法。[链接](https://github.com/github/copilot-cli/pull/4770)

*注：过去 24 小时 PR 活动较少，主要更新集中在 Releases 与 Issues 侧。*

---

## 五、功能需求趋势

- **模型与端点灵活性**：自定义模型端点（#4003）、BYOK 场景修复（Deepseek #4840、Thinking tokens #3736）、新模型支持（claude-opus-5.5 已落地；#4927 反映 gpt-6-astra 上下文窗口元数据不一致）
- **企业/托管配置**：managed settings fail-closed 问题（#4602）、服务端插件市场分发（#4556）、企业 MCP 集成（#4851、#4931）
- **Agent/Skill 体系**：Skill 调用语义（#4438）、sub-agent 模型策略（#4432）、从 cwd 发现自定义 agents（#2504，已关闭）
- **插件生态**：插件启用/禁用开关（#2714，已关闭，11 👍）、hook 上下文注入（#2980，已关闭）
- **自动化与权限**：AutoPilot 模式下的确认暂停（#3595）、权限请求超时策略（#4486）

---

## 六、开发者关注点（痛点总结）

1. **长会话稳定性是头号痛点**：compaction OOM（#4780）、event-storage 重试风暴（#4639）、session 永久卡死（#4755）形成一个问题簇，建议团队优先做根因层面的资源与状态机治理。
2. **静默失败过多**：插件市场不注册（#4556）、hook 上下文不注入、fail-closed 配置（#4602）——开发者希望“要么成功、要么明确报错”。
3. **认证生命周期脆弱**：token 停止刷新（#4929）、并发 refresh-token 击穿 OAuth 链（#3456，已关闭）表明长驻进程的 auth 恢复机制需要加固。
4. **BYOK 与企业环境兼容性**：自定义端点、私有模型、Azure/企业代理等场景仍有一批未闭环的问题。

---
*本报告基于过去 24 小时 GitHub 公开数据自动整理，仅供参考。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报
**日期：2026-09-23 | 数据来源：[MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)**

---

## 1. 今日速览

今日最重要的动态是 **v1.52.0 发布，正式开启 Python 版 kimi-cli 的退役迁移流程**——包入口点被改为引导用户安装新的 TypeScript 版 Kimi Code CLI，配合仓库归档与 PyPI tombstone 操作，标志着项目技术栈的重大转向。此外，社区贡献活跃，修复合入了 CJK 输入法兼容修复，并出现 OpenCode Go 主机兼容性改进；不过仓库归档后仍有多个 dependabot 依赖升级 PR 待处理。唯一活跃 Issue 是一个长期未解的会话损坏 bug，值得持续关注。

---

## 2. 版本发布

### v1.52.0（[Changelog](https://github.com/MoonshotAI/kimi-cli/compare/1.51.0...1.52.0)）

- **feat(cli): short-circuit entry points to a Kimi Code installer**（[#2666](https://github.com/MoonshotAI/kimi-cli/pull/2666)，by @sailist）
  - Python 版 kimi-cli 已归档。本版本将包入口点改造为迁移引导：通过 `uv tool install kimi-cli` 安装的用户会被引导至新的 TypeScript 版 Kimi Code CLI。
  - 与 #2659 互补（归档仓库、对 PyPI 上的 `kimi-code` 包做 tombstone 处理）。

**分析师点评**：这是一个“承上启下”的版本——不含功能性更新，核心目的是平滑完成老用户向新 CLI 的迁移，避免归档后用户陷入无指引状态。建议老版本用户关注新版 CLI 的功能对齐情况。

---

## 3. 社区热点 Issues（过去24小时更新：共 1 条）

> 今日仅 1 条 Issue 更新，数据量有限，以下为全部有效条目。

### [#2336] [Bug] 内存压力下会话损坏：会话丢失 + 恢复时报 400 tool_call 错误（OPEN）
- **链接**：https://github.com/MoonshotAI/kimi-cli/issues/2336
- **作者**：@kkc25 | 创建于 2026-05-21，最新更新 2026-09-22 | 评论 2
- **环境**：v1.43.0 / Kimi Code / kimi-for-coding / Linux
- **为何重要**：
  - 这是一个**长期悬而未决（4 个月）的数据完整性 bug**：内存压力下会话文件损坏，恢复时触发 400 tool_call 响应错误，直接导致对话历史丢失。
  - 对长会话重度用户影响最大——会话损坏意味着不可恢复的工作损失，属于 CLI 工具最严重的故障类别之一。
  - 用户仍停留在 v1.43.0，与当前版本差距较大，且该 Issue 处于 Python 版仓库（现已归档），**修复可能已转移到新版 TypeScript CLI**，建议受影响用户确认新 CLI 是否复现。
- **社区反应**：评论仅 2 条、0 👍，关注度偏低，可能与仓库归档后流量转移有关。

---

## 4. 重要 PR 进展（过去24小时更新：共 8 条）

### 功能与修复类（高优先级）

| # | 标题 | 状态 | 要点 |
|---|------|------|------|
| [#2666](https://github.com/MoonshotAI/kimi-cli/pull/2666) | feat(cli): 入口点短路至 Kimi Code 安装器 | ✅ CLOSED（已合入 v1.52.0） | Python 版退役迁移路径，见上文版本发布部分 |
| [#2667](https://github.com/MoonshotAI/kimi-cli/pull/2667) | fix(web): 防护 IME 组合输入时的 Enter 键事件 | ✅ CLOSED | **CJK 用户重要修复**：WebKit 下 IME 组合输入时，`isComposing` 尚未被 React 观察到之前，可能发出 `keyCode === 229` 的 Enter keydown，导致未完成的中文输入被提前提交。PR 在现有 Enter 提交边界处增加 WebKit 兼容防护。by @dvd233 |
| [#2656](https://github.com/MoonshotAI/kimi-cli/pull/2656) | fix(llm): 为 OpenCode Go 主机发送 x-opencode-session 头 | 🔄 OPEN | 解决 #2653：OpenCode Go 对缺少稳定 `x-opencode-session` 头的请求返回 HTTP 400。自动检测官方 OpenCode 主机（`opencode.ai` / `*.opencode.ai`）并将当前 Kimi 会话 id 设为该头。by @FOWEPJF255 |

### 依赖升级类（dependabot）

| # | 依赖 | 版本变化 | 状态 |
|---|------|---------|------|
| [#2664](https://github.com/MoonshotAI/kimi-cli/pull/2664) | agent-client-protocol | 0.8.0 → 0.12.1 | OPEN（跨 4 个 minor 版本，协议 SDK 变化较大，需仔细验证兼容性） |
| [#2662](https://github.com/MoonshotAI/kimi-cli/pull/2662) | fastapi | 0.128.0 → 0.141.1 | OPEN |
| [#2665](https://github.com/MoonshotAI/kimi-cli/pull/2665) | ruff | 0.14.14 → 0.16.8 | OPEN（新开，更新更彻底） |
| [#2663](https://github.com/MoonshotAI/kimi-cli/pull/2663) | rich | 14.2.0 → 15.0.0 | OPEN（大版本升级，"The So Long 3.8 Release"，放弃 Python 3.8 支持） |
| [#884](https://github.com/MoonshotAI/kimi-cli/pull/884) | ruff | 0.14.14 → 0.15.0 | OPEN（**挂起 7 个月**，与 #2665 重复，建议关闭其一） |

**分析师点评**：仓库归档与迁移背景下，这批 dependabot PR 的处置方式值得关注——是继续维护至迁移完成，还是随归档一并关闭。ruff 的两个重复 PR 建议维护者合并处理，优先采纳 #2665。

---

## 5. 功能需求趋势

> 受限于今日仅 1 条 Issue 更新，趋势分析以现有数据结合 PR 方向推断：

1. **向 TypeScript 版 Kimi Code CLI 全面迁移**：入口点改造、仓库归档、PyPI tombstone 一系列动作表明这是当前最高优先级方向，Python 版进入纯维护/退役状态。
2. **国际化与输入法兼容（CJK 场景）**：#2667 的 IME 修复说明中文等 CJK 用户的输入体验是活跃贡献方向，预计新版 CLI 会持续打磨此类细节。
3. **第三方平台/协议互操作**：#2656 针对 OpenCode Go 主机的 session 头适配，反映社区对 Kimi CLI 与外部 agent 平台（OpenCode、ACP 等）集成的实际需求；agent-client-protocol 的依赖升级（#2664）也印证了 ACP 生态对接的持续投入。

---

## 6. 开发者关注点

- **会话稳定性与数据完整性**：#2336（内存压力下会话损坏 + 恢复 400 错误）是长期痛点，长会话用户对历史丢失零容忍，建议在新版 CLI 中验证并修复，且在迁移文档中说明。
- **迁移体验的平滑度**：`uv tool install kimi-cli` 老用户能否无损迁移到新 CLI（配置、会话历史迁移路径）是退役期的关键关切，目前 PR 描述未明确历史数据迁移方案。
- **归档期的依赖维护真空**：5 个 dependabot PR 堆积（含 1 个挂起 7 个月），fastapi/rich 等跨大版本升级若长期不处理，可能带来安全隐患（rich 放弃 Python 3.8、fastapi 多个修复版本）。
- **版本碎片化**：报告 bug 的用户仍使用 v1.43.0，与最新 v1.52.0 差距较大，提示需要更有效的版本升级引导机制。

---

*本报告基于 2026-09-23 过去 24 小时的 GitHub 数据自动汇总分析。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-09-23

## 今日速览

今日无新版本发布。社区动态集中于 **V2 生态稳定性**：核心团队一天内合并/关闭多个关键修复 PR，包括 OpenAI 支出限额误判导致重试风暴、ACP 客户端重试状态不可见、monorepo 子目录插件安装失败等问题。Issues 侧，付费/免费额度相关投诉集中爆发（#50720、#50366、#50697），自定义 provider 在 V2 配置中被静默跳过的问题（#49912、#50340）也引发多人共鸣。

---

## 版本发布

过去 24 小时无新 Release。

---

## 社区热点 Issues（Top 10）

1. **[#19130](https://github.com/anomalyco/opencode/issues/19130)** Windows ARM64 原生版 TUI 初始化失败（bun:ffi dlopen TinyCC 错误）。27 条评论、13 👍，是本期互动最高的长尾 issue，ARM64 Windows 用户无法使用 TUI，非交互命令正常，指向 FFI 加载链路问题。

2. **[#49965](https://github.com/anomalyco/opencode/issues/49965)** Ollama（openai-compatible）provider 每次工具调用后都触发 auto-compaction，即使远未达到上下文限制。本地模型用户的核心体验问题。

3. **[#49982](https://github.com/anomalyco/opencode/issues/49982)** v2.0.9 后台服务在配置变更时插件重载失败（`pe is not a function`），静默丢失自定义 agents 和 commands，需重启恢复——影响面广的静默失败。

4. **[#44821](https://github.com/anomalyco/opencode/issues/44821)** ChatGPT OAuth 转换将 Codex 产品预算当作 GPT-5.6 Sol 端点实际上限，导致提前数十万 token 压缩上下文。4 👍，付费用户痛点。

5. **[#43748](https://github.com/anomalyco/opencode/issues/43748)** 官方 config JSON Schema 与 V2 文档不匹配（skills、mcp.*、permissions 字段被拒），编辑器校验误报。5 👍，影响所有 V2 用户的配置体验。

6. **[#42263](https://github.com/anomalyco/opencode/issues/42263)** 大 PDF 被无限制 base64 编码且每轮重新编码，导致 OOM。内存泄漏类问题，与已关闭的 #49320（图片 base64 持久化导致上下文膨胀）同源。

7. **[#50734](https://github.com/anomalyco/opencode/issues/50734)**（新）超大 git worktree 快照导致后台服务 100% CPU 挂起、HTTP 无响应。与 #32981（home 目录快照冻结数分钟）共同指向快照性能这一系统性问题。

8. **[#50236](https://github.com/anomalyco/opencode/issues/50236)** 自 v2.0.4 起 `opencode acp` 的 session/new 目录忽略用户配置（自定义 provider、agents、默认模型），Zed 等 ACP 客户端只看到内置模型。

9. **[#50715](https://github.com/anomalyco/opencode/issues/50715)**（已关闭）HTTP auth 允许通过 `?auth_token=` 查询参数传递 Basic 凭据——安全审计类报告，凭证可能泄漏到日志/历史记录。同日相关的 #50721（无法禁用 Basic Auth）也已关闭。

10. **[#50720](https://github.com/anomalyco/opencode/issues/50720)** / **[#50697](https://github.com/anomalyco/opencode/issues/50697)** 付费后无法使用的投诉集中出现（另有 #50366 免费层限制报错），反映计费/额度同步问题在当日集中发酵。

---

## 重要 PR 进展（Top 10）

1. **[#50755](https://github.com/anomalyco/opencode/pull/50755)**（OPEN）fix(ai): 将 OpenAI 支出限额（429）分类为 quota exceeded 而非 rate limit——修复永久性错误被重试 10 次的问题。是 #50743/#50752 的跟进。

2. **[#50752](https://github.com/anomalyco/opencode/pull/50752)**（CLOSED）fix(acp): 向 ACP 客户端转发 provider 重试状态，解决重试期间客户端“看起来卡死”的体验问题。

3. **[#50754](https://github.com/anomalyco/opencode/pull/50754)**（CLOSED）fix(core): 修复 monorepo 分支子目录插件安装失败（pacote 丢弃 `::path:`），同时关闭 #47517 与 #48133，并推动了上游 npm/pacote#513。

4. **[#50025](https://github.com/anomalyco/opencode/pull/50025)**（CLOSED，bot）feat(session): `PATCH /api/session/{id}` 支持 metadata 更新，通过持久化 `session.metadata.updated` 事件实现。

5. **[#44250](https://github.com/anomalyco/opencode/pull/44250)**（CLOSED，bot）fix(core): 快照时跳过嵌套 git 仓库的目录型 untracked 条目，附带回归测试——与今日热点 #50734/#32981 的快照问题同域。

6. **[#44214](https://github.com/anomalyco/opencode/pull/44214)**（CLOSED）feat(desktop): 新增原生 Windows ARM64 桌面 agent（Electron 38），与热度第一的 #19130 直接相关。

7. **[#44223](https://github.com/anomalyco/opencode/pull/44223)**（CLOSED）fix(session): 修复 legacy 200k 价格覆盖模型真实 context tier 的逻辑错误，配套 #44229（Zen 的 cache-write token 计入 input_tokens）。

8. **[#44231](https://github.com/anomalyco/opencode/pull/44231)**（CLOSED）fix(provider): 激活 github-copilot 时忽略无关的 `GITHUB_TOKEN` 环境变量，避免误判。

9. **[#44139](https://github.com/anomalyco/opencode/pull/44139)**（CLOSED）feat(cli): 发布 V2 Homebrew formula 到 `anomalyco/tap/opencode@2`，改善 V2 安装分发渠道。

10. **[#44191](https://github.com/anomalyco/opencode/pull/44191)**（CLOSED）feat(core): cron 定时 prompt 工具，对标 Claude Code 的定时任务能力——功能向贡献的代表。

> 注：大量 8 月下旬的社区 PR 当日被批量清理关闭（automated-pr-cleanup），其中不少关联 issue 仍未解决（如 #4570 的 `mcp remove` 命令“closed as completed 但从未落地”），值得关注贡献者流失风险。

---

## 功能需求趋势

- **本地/自定义模型支持（Ollama、openai-compatible、Xiaomi MiMo、GLM）**：多条 issue 集中在自定义 provider 的能力声明、上下文限制推断和消息格式兼容上，是当前最大的需求集群。
- **上下文与压缩管理**：auto-compaction 误触发、`compaction.reserved` 被忽略、预算/限额混淆（#44821、#38835、#49965）——压缩机制的正确性是 V2 的核心敏感区。
- **桌面端与 IDE/ACP 集成**：Desktop 新会话无响应（#49561）、/models 缺失自定义模型（#50726）、ACP 配置加载失效（#50236）。
- **性能与资源**：快照在大仓库/home 目录下的挂起（#32981、#50734）、PDF/图片 base64 内存问题（#42263）。
- **插件生态**：安装（私有仓库、monorepo 子目录）、重载稳定性（#49982）、TUI 主题 token 兼容（#49922）。

---

## 开发者关注点

1. **“静默失败”是最大痛点**：provider 被静默跳过（#49912/#50340）、插件重载失败静默丢功能（#49982）、drain 失败不上报客户端（#49740）、V1→V2 升级后会话丢失（#49412）——用户反复要求“宁可报错也不要静默吞掉”。
2. **配置迁移与 Schema 一致性**：V1→V2 迁移文档与实际校验逻辑脱节（capabilities 必须含 tools 但文档未说明）、官方 schema 过期（#43748）。
3. **计费/额度透明度**：当日多条付费后不可用、免费层限制报错的投诉，说明额度状态展示与同步机制需要改进。
4. **错误反馈链路**：多个 issue 本质都是“错误只写在服务端日志，客户端无感知”，建议团队系统性梳理事件上报（`session.error` 等）覆盖面。
5. **大仓库/大文件场景的工程健壮性**：快照、base64 编码均缺少上限与增量策略，重度用户（20k+ 文件仓库、大 PDF）体验显著劣化。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-09-23

## 一、今日速览

Qwen Code 迎来 **v0.24.4 稳定版**与 **v0.24.5-preview.0** 预览版双发布，同日更新了 Desktop 端。社区讨论焦点集中在 **Web Shell / daemon 多会话架构**（Managed Agent 双路径提案、Live Voice 单工作区打不开的 P1 bug）以及**不可信输入下的安全边界**（PreToolUse hooks fail-open、沙箱加固后续）。此外，多个由 issue 直接驱动的修复 PR 当天立项当天提交，社区响应速度值得关注。

## 二、版本发布

### [v0.24.4](https://github.com/QwenLM/qwen-code/releases)（稳定版）
- **feat(core)**: 将 monitor tool 加入 system prompt 引导（[#12408](https://github.com/QwenLM/qwen-code/pull/12408)）
- 无已知破坏性变更

### [v0.24.5-preview.0](https://github.com/QwenLM/qwen-code/releases)（预览版）
- fix(core,docs): 修正 deferred-tool bridge 导致的过时/未测试内容（[#12355](https://github.com/QwenLM/qwen-code/pull/12355)）

### [desktop-v0.24.4](https://github.com/QwenLM/qwen-code/releases)
- fix(review): 将未计划 chunk 排除出覆盖率统计，从 plan 读取分母（[#12370](https://github.com/QwenLM/qwen-code/pull/12370)）

另有 v0.24.4-nightly 与 v0.24.3-nightly 两个 nightly 构建。

## 三、社区热点 Issues（Top 10）

1. **[#7040](https://github.com/QwenLM/qwen-code/issues/7040) — RFC: 可靠的自动记忆召回（11 评论，已关闭）**
   长期跟踪的记忆召回可靠性项目：遥测已合入，受限的首轮召回 + 确定性快速路径正在 review。闭环式的 RFC 推进方式是仓库标杆实践。

2. **[#12449](https://github.com/QwenLM/qwen-code/issues/12449) — TUI 在移动端软键盘行收缩时吞行（10 评论）**
   Termux/移动端用户强痛点：bundled ink 7.0.3 未包含上游 rows-shrink 修复。依赖升级讨论热烈。

3. **[#12380](https://github.com/QwenLM/qwen-code/issues/12380) — Managed Agent 双路径架构提案（9 评论）**
   定义 daemon 的会话持久所有权、Workspace 绑定、可恢复工具执行，是 serve/Web Shell 方向的重量级架构提案。

4. **[#12425](https://github.com/QwenLM/qwen-code/issues/12425) — CodeModeOnly 下 workflow 关键字桥接语句自相矛盾（7 评论）**
   系统提示推荐了被隐藏且拒绝调用的桥接工具，自报式 review 发现的提示词一致性缺陷，已有配套单测 PR #12497。

5. **[#12417](https://github.com/QwenLM/qwen-code/issues/12417) — 沙箱设置加固跟进（7 评论，P2 安全）**
   Linux bubblewrap 从整体 CLI 收敛到单工具执行后的边界问题跟踪，历经 5 轮 review，安全向必修。

6. **[#12381](https://github.com/QwenLM/qwen-code/issues/12381) — HTTP 网关超时后恢复 session-create 结果（7 评论）**
   浏览器收到超时但 session 实际创建成功，客户端拿不到 ID 无法继续，daemon 可靠性核心问题。

7. **[#12488](https://github.com/QwenLM/qwen-code/issues/12488) — Linux/WSL 无 wl-paste/xclip 时粘贴静默失败（5 评论）**
   Ctrl+V 无任何报错与降级提示，当天即有修复 PR #12489，响应迅速。

8. **[#11908](https://github.com/QwenLM/qwen-code/issues/11908) — 超大 available_commands_update 触发 MAX_JSON_NODES 导致会话全 404（P1）**
   ACP bridge fail-closed 杀掉子进程后所有请求返回 `No session with id`，daemon 稳定性高危问题。

9. **[#12460](https://github.com/QwenLM/qwen-code/issues/12460) — Auto 模式下 git commit --amend 豁免逻辑为死代码（4 评论）**
   `sessionCommitShas` 从未被填充，agent 自己的提交也无法 amend，安全门与实用性失衡的典型案例。

10. **[#12457](https://github.com/QwenLM/qwen-code/issues/12457) — 不可信输入下运行 Qwen Code 的三大安全缺口（3 评论）**
    PreToolUse hooks fail-open、hook allow 无法覆盖 serve 分类器、缺少正向工具白名单——多 agent 总线场景的安全实测报告，质量很高。

## 四、重要 PR 进展（Top 10）

1. **[#12500](https://github.com/QwenLM/qwen-code/pull/12500)** — 修复 MCP 仅工具型服务器被误判断连（-32601 处理），直接对应 issue #12496。
2. **[#12489](https://github.com/QwenLM/qwen-code/pull/12489)** — Linux 剪贴板不可用时明确报告而非静默失败，与 #12488 同日闭环。
3. **[#12461](https://github.com/QwenLM/qwen-code/pull/12461)** — 将 `maxParallelAgentsByModel` 并发上限扩展到前台 sub-agent，保护本地小模型不爆 VRAM（对应 #12470）。
4. **[#11854](https://github.com/QwenLM/qwen-code/pull/11854)** — 新增 hybrid code mode：`direct` / `code_mode` / `code_mode_only` 三档工具模式，对齐 Codex 语义。
5. **[#12183](https://github.com/QwenLM/qwen-code/pull/12183)** — 支持 `--managed-extensions` 从部署管理目录加载扩展，面向企业托管分发场景。
6. **[#12475](https://github.com/QwenLM/qwen-code/pull/12475)** — channels 新增 `groupSenderPolicy`，群组成员访问与 DM 白名单解耦。
7. **[#12499](https://github.com/QwenLM/qwen-code/pull/12499)** — Web Shell 为 Plugins/Channels/定时任务/Goals/Settings 增加可分享 URL 路由。
8. **[#12154](https://github.com/QwenLM/qwen-code/pull/12154)** — Web Shell git 对话框新增 Worktrees 标签页，可视化管理工作树。
9. **[#12107](https://github.com/QwenLM/qwen-code/pull/12107)** — 扩展冷加载循环并行化，直接改善 daemon `GET /extensions` 性能。
10. **[#12487](https://github.com/QwenLM/qwen-code/pull/12487)** — 版本 bump 时保持 manifest 布局不变，解决发布流程中 pnpm 重写 package.json 的格式污染问题。

其他值得留意：[#12498](https://github.com/QwenLM/qwen-code/pull/12498)（外部编辑器不可用时隐藏选项）、[#12502](https://github.com/QwenLM/qwen-code/pull/12502)（修复 VSCode Companion 消息编辑 rewind）、[#10954](https://github.com/QwenLM/qwen-code/pull/10954)（serve 暴露后台 agent 状态 API）。

## 五、功能需求趋势

- **Daemon / Web Shell 架构深化**：Managed Agent 双路径（#12380）、后台 agent API（#10954）、可分享路由（#12499）、Web 端 Live Voice Host（#12164）——多 agent 平台化是最密集的方向。
- **安全与不可信输入治理**：沙箱加固（#12417）、hooks fail-open（#12457）、工具白名单、destructive 命令门控精细化（#12460）。
- **会话可靠性**：网关超时恢复（#12381）、ACP 通道容错（#11908）、artifact 恢复语义（#12389）。
- **浏览器/IDE 集成**：Chrome Extension 复活提案（#5626）、WebBridge 直控浏览器（#8699）、VSCode Companion 修复持续进行。
- **性能**：扩展加载并行化（#12107）、pnpm worktree 快速引导（#10444）、`/review` 编排迁移到 workflow 引擎（#8769）。

## 六、开发者关注点

1. **静默失败是最大抱怨来源**：剪贴板粘贴（#12488）、LSP 诊断误报 clean（#12467）、MCP 断连误判（#12496）——开发者要求"fail loud"。
2. **本地/小模型资源保护**：并发上限对前台 agent 失效（#12470）直接影响本地部署可用性。
3. **移动端/Termux 体验**：TUI 行收缩吞行（#12449）长期未随上游 ink 修复。
4. **提示词与配置一致性**：CodeModeOnly 桥接矛盾（#12425）、`tools.eager` 拼写静默忽略（#12435）表明配置类错误的反馈缺失。
5. **Desktop 渲染质量**：工具调用块空白导致无法审批前核对 Edit/Shell 内容（#11966），是 Desktop 端最高频的可用性障碍。

---
*数据来源：GitHub QwenLM/qwen-code 过去 24 小时活动 | 由 AI 技术分析师生成*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*