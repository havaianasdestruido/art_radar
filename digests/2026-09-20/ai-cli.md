# AI CLI 工具社区动态日报 2026-09-20

> 生成时间: 2026-09-19 22:18 UTC | 覆盖工具: 7 个

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
**数据截至 2026-09-20**

---

## 1. 生态全景

AI CLI 工具已从单纯的命令行补全助手演化为完整的 Agent 操作系统，核心竞争维度转向**沙箱安全、上下文经济性、多智能体编排**三大方向。头部产品（Claude Code、Codex、Gemini CLI）均已形成 CLI + Desktop + IDE 的多端矩阵，并发节奏显著分化：Codex 24 小时连发 4 个 alpha，Qwen Code 发布三线版本（CLI/Desktop/SDK），而 Copilot CLI 与 Kimi CLI 则相对沉寂。社区反馈的重心也从“功能有无”转向“可靠性与信任”——数据损坏、静默失败、计费透明成为最高频的关键词，标志着生态正进入质量收敛期。

---

## 2. 各工具活跃度对比

| 工具 | Issue 动态 | PR 动态 | Release | 本日焦点 |
|---|---|---|---|---|
| **Claude Code** | ~30 条（多为 stale 批量关闭） | 5 个 | v2.1.278 | 服务端分类器默认化；diff 面板系列重构 |
| **OpenAI Codex** | 10+ 热点（Windows 为主） | 10+ | 4 个 alpha（v0.156.0-alpha.5~8） | TUI 大重构；Windows 稳定性重灾区 |
| **Gemini CLI** | 10 热点（含多个 P1） | 10 | v0.62.0-nightly | ast_search、持久化任务追踪两个重量级 PR |
| **Copilot CLI** | 48 条更新 | 0 | 无 | MCP 兼容性、长会话 OOM；批量关闭历史 Issue |
| **Kimi CLI** | 7 条（1 新增） | 5 | 无 | Windows/Linux 兼容性修复推进 |
| **OpenCode** | 10 热点 | 10 | 无 | 计费争议 + 免费层“无锁定”承诺冲突 |
| **Qwen Code** | 10+ 热点 | 10 | v0.24.1（CLI+Desktop+SDK） | 沙箱路线图；1 个 P1 安全漏洞 |

**观察**：Codex 与 Gemini CLI 处于最高速迭代；Copilot CLI“高 Issue 更新、零 PR/Release”的状态值得注意，可能处于内部大版本蓄力期；OpenCode 社区情绪受计费问题拖累。

---

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **MCP 生态兼容性** | Codex、Copilot CLI、OpenCode、Kimi CLI、Claude Code | OAuth 失败（Codex #44437）、远程服务器 `-32601` 致命错误（Copilot #4870）、工具连接成功但不暴露（OpenCode #33027）、会话内授权断裂（Claude Code #75955）。MCP 是全行业最普遍的脆弱环节 |
| **沙箱与安全执行** | Qwen Code、Gemini CLI、Codex | Qwen 的 bwrap/Landlock 双后端路线最完整；Gemini 提零依赖 OS 沙箱方案（#19873）；Codex 面临沙箱行为与文档不一致（#40565）。Claude Code 则爆出权限路径解析漏洞（#12246 属 Qwen）与 Cowork 授权撤销难题 |
| **上下文经济性与压缩可靠性** | 全部 7 款 | Qwen 缓存前缀失效（#6721）、Gemini `/compress` 不持久化（#21335）、OpenCode `/compact` 空摘要销毁历史（#44080）、Copilot 200K 硬限（#3355）、Qwen 工具描述膨胀（#12272）——token 成本是跨产品第一痛点 |
| **会话持久化与恢复** | Claude Code、Copilot CLI、Gemini CLI、OpenCode | transcript 丢失（Claude #76829）、resume OOM（Copilot #4699）、--resume 选错会话（Gemini）、崩溃自动恢复（OpenCode PR #43489） |
| **静默失败治理** | Claude Code、OpenCode、Qwen Code、Gemini CLI | 工具层篡改数据（Claude 反斜杠坍缩）、Skills 静默丢弃（OpenCode #42350）、LSP 空结果（Qwen #12220）——共同诉求是“失败要可见，不要降级为空返回” |
| **Windows/WSL 支持** | Codex、Copilot CLI、Kimi CLI、Qwen Code | Codex 尤为严重（WSL 失效 #41290 为热度第一） |
| **计费/配额透明度** | Codex、OpenCode、Claude Code | 额度异常清零、支付失败、用量统计缺失 |

---

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|---|---|---|---|
| **Claude Code** | 企业级部署、Hooks/Skill 生态、diff 体验打磨 | 企业 + 重度专业开发者 | 闭源、服务端能力下沉（分类器上收）、Bedrock/Vertex/Foundry 多云 |
| **OpenAI Codex** | 桌面端多任务、TUI 渲染性能 | ChatGPT 订阅用户（消费级→Pro） | Rust 核心、激进 alpha 迭代、app-server 架构 |
| **Gemini CLI** | Agent 架构创新（AST 搜索、持久化任务追踪、Auto Memory） | 技术前沿探索者 | 开源、依赖 Gemini 原生能力（如 bash 能力）做安全路由 |
| **Copilot CLI** | GitHub 生态深度集成、github-mcp-server 捆绑 | GitHub 原生用户 | Node + Rust JSON-RPC 混合，迭代节奏最慢 |
| **Kimi CLI** | 跨平台兼容性补课、多模态输入 | 中文社区/性价比敏感用户 | Python（PyInstaller 分发）、第三方 Provider 开放 |
| **OpenCode** | Provider 无锁定、开源可组合 | 开源社区、多模型切换需求者 | 开源 TUI/Electron、Zen 订阅 + 免费层，商业模式承压 |
| **Qwen Code** | 系统级沙箱、批量 API、中文体验 | 中文开发者 + 企业批量场景 | DashScope 深度集成（Batch 半价）、bwrap/Landlock、Web Shell/SSH 远程 |

**关键分野**：闭源三强押注企业级与生态绑定；Qwen/Kimi 以中文体验与成本优势切入；OpenCode 以开放性换社区但商业化最脆弱。

---

## 5. 社区热度与成熟度

- **最活跃迭代期**：**Codex**（4 alpha/日 + 10+ PR/日），但也伴随最高质量的稳定性债务（Windows 问题堆积）
- **架构跃迁期**：**Gemini CLI**（ast_search、任务追踪系统是本日最具前瞻性的两个 PR）与 **Qwen Code**（沙箱三连 PR 构成完整路线图）
- **成熟收敛期**：**Claude Code**——Issue 区以 stale 清理为主，PR 聚焦行为对齐类细节重构，说明核心功能已稳定，进入打磨期；但两个数据损坏 bug 长期 OPEN 是信任隐患
- **沉寂/观望期**：**Copilot CLI**（零 PR/Release，48 条 Issue 更新）与 **Kimi CLI**（仅 1 条新 Issue），后者社区规模明显最小
- **信任危机期**：**OpenCode**——计费三连问题（支付被拒、扣款未到账、额度误判）叠加“无锁定”文档失信，社区情绪本日最负面

---

## 6. 值得关注的趋势信号

1. **安全边界从“提示词约束”走向“OS 级隔离”**：Qwen 的 bwrap/Landlock、Gemini 的零依赖沙箱提案、Codex 的 workspace-write 争议，共同指向沙箱将成为 AI CLI 的标配基础设施。开发者选型时应将沙箱成熟度列为一级指标。

2. **上下文经济学成为核心竞争力**：缓存失效（Qwen）、压缩不持久（Gemini/OpenCode）、工具描述膨胀等问题说明，谁能在长会话中稳定压缩且不丢数据，谁就拥有成本优势。Gemini 的 AST-aware 搜索（减少整文件读取）代表了“精准摄取”这条路线。

3. **静默失败是下一个信任战场**：四款工具同时出现“无报错但数据丢失/降级”类 bug。对开发者的直接建议：**对 Agent 产出建立独立校验**（diff 复查、转义序列抽查、会话转录备份），不要假设工具层忠实传递数据。

4. **模型质量回归风险浮现**：Codex 的 gpt-6-astra 异常行为（#46700，写入近 1TB）提示新模型在 agentic 长任务上可能出现回归，生产环境升级模型版本需灰度验证。

5. **商业化与开放性的张力公开化**：OpenCode 免费层限制与文档承诺的冲突、Codex 配额不透明、Claude 分类器计费调整——订阅制 AI 工具的计费可解释性正在成为用户流失/留存的直接变量。

6. **对开发者的实操建议**：Windows/WSL 重度用户当前首选谨慎（Codex/Copilot 均有重灾问题）；中文用户关注 Qwen 的 LSP 修复（#12206）与本地化进展；企业用户跟踪 Claude Code 的 `CLAUDE_CODE_AUTO_MODE_SERVER` 默认值变更；任何工具升级前先比对 changelog 与文档差异（Claude Code 已出现系统性文档滞后）。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

*数据截止 2026-09-20 · 来源：github.com/anthropics/skills*

---

## 一、热门 Skills 排行（按 PR 讨论度与活跃度）

| # | Skill / PR | 功能与讨论热点 | 状态 |
|---|---|---|---|
| 1 | **skill-creator 触发评测修复** [#1298](https://github.com/anthropics/skills/pull/1298) | 修复 skill 触发评估的误报/漏报：worker 竞争、Windows `select()` 失败、运行时错误被误判为"未触发"。热度最高，持续更新 3 个月 | OPEN |
| 2 | **mcp-builder 兼容修复** [#1742](https://github.com/anthropics/skills/pull/1742) | 适配 `mcp>=2.0` 的 `streamable_http_client` 重命名与自定义 Header。mcp-builder 是问题最密集的官方 Skill（另见 Issue [#1390](https://github.com/anthropics/skills/issues/1390)） | OPEN |
| 3 | **skill-creator recall=0% 修复** [#1769](https://github.com/anthropics/skills/pull/1769) | 修复触发评测对所有 Skill 报告 `precision=100% recall=0%` 的缺陷，关联 Issue #1721 | OPEN |
| 4 | **document-typography** [#514](https://github.com/anthropics/skills/pull/514) | AI 生成文档的排版质量控制（孤行、孤词、编号对齐），切中"所有 Claude 文档都受影响"的痛点 | OPEN |
| 5 | **AWT (AI Watch Tester)** [#822](https://github.com/anthropics/skills/pull/822) | AI 视觉驱动的零代码 E2E 测试，长期活跃讨论 | OPEN |
| 6 | **pyxel 复古游戏开发** [#525](https://github.com/anthropics/skills/pull/525) | Python 复古游戏的创建/调试/确定性无头验证 | OPEN |
| 7 | **blast-radius** [#1776](https://github.com/anthropics/skills/pull/1776) | 批量/破坏性写操作前的"爆炸半径"检查清单，安全意识类新方向 | OPEN |
| 8 | **md2video-audio** [#1703](https://github.com/anthropics/skills/pull/1703) | Markdown 一键编译为带真人配音的 MP4 视频（Marp 路线） | OPEN |

**观察**：docx/pdf 等文档类 Skill 的小修持续涌入（#538、#541、#1790、#1765），说明文档处理是使用量最大的 Skill 类别。

---

## 二、社区需求趋势（来自 Issues）

1. **安全与信任边界**（最强音）— [#492](https://github.com/anthropics/skills/issues/492)（43 条评论）：社区 Skill 冒用 `anthropic/` 命名空间，伪装官方 Skill 骗取权限；配套诉求见 [#1175](https://github.com/anthropics/skills/issues/1175)（Skill 内写权限逻辑的安全性）。
2. **企业/组织级分发** — [#228](https://github.com/anthropics/skills/issues/228)：组织内 Skill 共享库、直接分享链接，替代手动 Slack 传文件。
3. **Skill 评测可靠性** — [#556](https://github.com/anthropics/skills/issues/556)、[#1390](https://github.com/anthropics/skills/issues/1390)：评测脚本触发率为 0%、伪造工具错误导致评分失真，社区呼唤可信的 Skill 质量评估框架（另见 [#83](https://github.com/anthropics/skills/pull/83) 的 quality/security-analyzer 元技能提案）。
4. **上下文窗口效率** — [#1487](https://github.com/anthropics/skills/issues/1487)：`claude-api` Skill 单次注入 ~156k tokens 打爆上下文；[#1329](https://github.com/anthropics/skills/issues/1329) 提议 compact-memory 符号化压缩 agent 状态。
5. **架构融合** — [#16](https://github.com/anthropics/skills/issues/16)：Skill 与 MCP 的互操作；[#29](https://github.com/anthropics/skills/issues/29)：Bedrock 支持。
6. **质量流水线** — [#1385](https://github.com/anthropics/skills/issues/1385)：推理质量门禁管道（校准→对抗审查→交付验证）。

---

## 三、高潜力待合并 Skills（活跃 OPEN，近期可能落地）

- **#1298** skill-creator 评测隔离与 Windows 兼容 — 系核心工具链修复，9 月仍活跃更新，合并优先级高
- **#1742** mcp-builder mcp>=2 兼容 — 修复真实破坏性问题（#1668），9-19 刚更新
- **#1769 / #1765** skill-creator recall 修复、office redlining UTF-8 解码 — 均关联已确认 Issue，修复路径清晰
- **#1776** blast-radius — 安全类填补空白，且契合 #492 反映的安全焦虑
- **#210** frontend-design 可执行性重写 — 早期 PR 但方向正确，长期悬置后有望重启
- **#514 / #525** typography 与 pyxel — 3 月提交至今仍被关注，属"慢热高质量"型

---

## 四、生态洞察（一句话总结）

> **当前社区最集中的诉求是"Skill 的可信度"：从命名空间冒用的安全边界（#492），到评测框架全面失真（#556/#1390/#1769），再到上下文爆炸（#1487），社区正从"造 Skill"转向"如何安全、可靠、高效地评估与分发 Skill"。**

---

# Claude Code 社区动态日报（2026-09-20）

## 1. 今日速览

Claude Code 发布 **v2.1.278**，将 auto 模式默认切换到服务端分类器以降低分类器开销计费。Issue 区今日活跃更新以历史功能请求和文档问题的批量 stale 关闭为主，最值得关注的仍是两个长期未修复的数据损坏类 bug（Bash 工具反斜杠坍缩、Write/Edit 的 `\uXXXX` 解码）。PR 方面，团队持续推进 diff 面板与内置面板行为对齐的系列重构。

## 2. 版本发布

### [v2.1.278](https://github.com/anthropics/claude-code/releases)
- **auto 模式默认改为服务端分类器**：对 Claude API / Enterprise 用户及 Bedrock、Vertex、Foundry 和网关部署生效，不再对分类器开销收费
- 企业私有部署可通过 `CLAUDE_CODE_AUTO_MODE_SERVER=0` 退出该行为，保留本地分类器

## 3. 社区热点 Issues

今日 30 条展示 Issue 中绝大多数为 stale 机器人批量关闭，真正活跃讨论的 OPEN issue 集中在以下方向：

| # | Issue | 关注理由 |
|---|-------|---------|
| 1 | [#88561](https://github.com/anthropics/claude-code/issues/88561) Bash 工具静默将 `\\` 坍缩为 `\` | **高优先级 bug**，破坏 POSIX 单引号保留语义，导致正则和路径损坏；已有复现、6 条评论，仍 OPEN |
| 2 | [#72957](https://github.com/anthropics/claude-code/issues/72957) Write/Edit 静默解码 `\uXXXX` | 与 #88561 同类的**数据损坏系列问题**，文件内容被意外解码，无法写入字面转义序列；已复现但仍 OPEN |
| 3 | [#76100](https://github.com/anthropics/claude-code/issues/76100) 模型不遵守用户技术约束 | 反映“模型遵循性”核心痛点，用户投入 $1500 后仍需反复对抗模型；被 stale 关闭但争议性强 |
| 4 | [#75912](https://github.com/anthropics/claude-code/issues/75912) VS Code 模型选择无法仅限会话 | 每次点选都持久化写入 settings.json，4 👍，IDE 集成体验的代表问题 |
| 5 | [#76829](https://github.com/anthropics/claude-code/issues/76829) 会话转录文件从未生成 | **数据丢失类**，数小时对话无 JSONL 记录且不可恢复，标签含 data-loss |
| 6 | [#87392](https://github.com/anthropics/claude-code/issues/87392) `/resume` 仅加载最近 50 个会话 | 老会话在 UI 中不可达，需手动 grep transcript 找 UUID；被标记 duplicate 说明已有同类反馈 |
| 7 | [#75955](https://github.com/anthropics/claude-code/issues/75955) 无法在会话内完成 Connector 授权 | MCP/集成体验断裂，需跳出会话到独立面板操作 |
| 8 | [#75970](https://github.com/anthropics/claude-code/issues/75970) Cowork 文件夹授权撤销困难 | 被戏称 "Hotel California"——进得去出不来，权限管理代表性问题 |
| 9 | [#75981](https://github.com/anthropics/claude-code/issues/75981) Hooks 无法感知当前模型 | Hook 生态的功能盲区，payload 和环境变量均不含 model 字段 |
| 10 | [#76001](https://github.com/anthropics/claude-code/issues/76001) 分层 Skill 发现机制 | Skill 数量增长导致列表元数据 token 开销上升，社区开始关注 skill 可扩展性 |

> ⚠️ **观察**：今日出现大量 @coygeek 提交的文档 issue（#75875–#75891 系列）被批量 stale 关闭，集中指向“v2.1.205 修复未同步到文档”这一系统性文档滞后问题。

## 4. 重要 PR 进展

今日共 5 个 PR 更新，全部围绕 **diff 面板与内置面板行为统一**：

| PR | 内容 | 状态 |
|----|------|------|
| [#95587](https://github.com/anthropics/claude-code/pull/95587) | 恢复/继续会话时若 transcript 已含编辑，diff 面板随宽度已知即打开；`/clear` 后关闭；会话行跟随引擎启动 | OPEN |
| [#94847](https://github.com/anthropics/claude-code/pull/94847) | 首次编辑仅在面板有文件可列出时才打开，避免仓库外/ignored 文件弹出空面板 | OPEN |
| [#95488](https://github.com/anthropics/claude-code/pull/95488) | docked 面板先读仓库再打开，永不出现 "Loading diff…" 状态 | **已合并** |
| [#95476](https://github.com/anthropics/claude-code/pull/95476) | 仅主循环编辑 + checkpointing 开启时自动打开面板；subagent 编辑或窄终端下的等待打开会被撤销 | **已合并** |
| [#95423](https://github.com/anthropics/claude-code/pull/95423) | 只读 shell 命令（`ls`、`git status` 等）后跳过 diff 重新拉取，对齐内置面板的 `isReadOnly` 判断 | OPEN |

这一系列 PR 显示团队正在系统性收敛 diff mod 与内置 diff 面板之间的行为差异，覆盖打开时机、数据预取、刷新策略三个维度。

## 5. 功能需求趋势

从今日更新的 Issue 中可提炼出社区关注的核心方向：

1. **成本与用量透明度**（#76006、#76000、#76007）：Pro MAX 周限额、用量历史统计、/usage 面板布局——高频 recurring 主题
2. **MCP / 集成体验**（#75955、#75880）：会话内授权流程、MCP 导入行为文档化
3. **Desktop / Cowork 多任务体验**（#76113、#76183）：fork 到 worktree、会话前挂载文件夹
4. **Hooks 与自动化扩展**（#75981）：hook 感知模型切换是明显的能力缺口
5. **Skill 生态扩展性**（#76001、#75883）：skill 发现的 token 开销、verify skill 重写行为
6. **移动端 / 远程会话**（#75992、#75884）：移动端 artifact 预览、Remote Control 状态同步
7. **大仓库性能**（#75993）：本地代码库索引以降低搜索 token 成本

## 6. 开发者关注点

- **数据完整性是最大痛点**：Bash 工具的 `\\` 坍缩（#88561）与 Write/Edit 的 `\uXXXX` 解码（#72957）同属“工具层静默篡改用户数据”类问题，直接影响正则、路径、转义序列等底层技术内容的正确性——两者均已有复现但长期 OPEN，值得优先跟进
- **会话数据可靠性**：transcript 静默丢失（#76829）+ `/resume` 只见 50 条（#87392），会话管理是信任基础
- **企业/私有部署**：新版的 `CLAUDE_CODE_AUTO_MODE_SERVER` 开关表明 Anthropic 在持续优化 Bedrock/Vertex/Foundry 场景的计费与行为，企业用户应关注此默认值变更
- **文档滞后于代码**：大量文档 issue 指向 v2.1.205 修复未回写到 docs，升级前建议先比对 changelog 与官方文档差异

---
*数据截至 2026-09-20，来源：github.com/anthropics/claude-code*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-09-20 | 数据来源：github.com/openai/codex**

---

## 一、今日速览

Codex 今天持续高速迭代，Rust 核心在 24 小时内连发 4 个 alpha 版本（v0.156.0-alpha.5 ~ alpha.8），节奏非常激进。社区方面，Windows 桌面端问题依然是重灾区——WSL 环境切换、渲染器白屏、任务无响应等多个高热度 Issue 集中更新。开发侧则以 TUI 体验大改为主，一批统一 Picker 样式、改进 Transcript 渲染的 PR 密集合入。

---

## 二、版本发布

过去 24 小时连续发布 4 个 alpha 版本，均无附带 changelog 说明：

| 版本 | 链接 |
|---|---|
| rust-v0.156.0-alpha.8 | [Release](https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.8) |
| rust-v0.156.0-alpha.7 | [Release](https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.7) |
| rust-v0.156.0-alpha.6 | [Release](https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.6) |
| rust-v0.156.0-alpha.5 | [Release](https://github.com/openai/codex/releases/tag/rust-v0.156.0-alpha.5) |

> 短时间内 alpha.5 → alpha.8 的高频迭代，配合今日密集合入的 TUI/进程管理 PR，推测 v0.156.0 将聚焦 TUI 渲染重构与 macOS 进程启动优化。

---

## 三、社区热点 Issues

**1. WSL 环境切换后项目创建/删除失败** [#41290](https://github.com/openai/codex/issues/41290) ⭐ 本日热度第一
评论 81、👍 54。Agent Environment 切换到 WSL 后项目管理功能失效，影响大量 Windows + WSL 用户，是当前 Windows 生态最受关注的阻塞级 Bug。

**2. Windows 10 22H2 Computer Use 截图失败** [#25178](https://github.com/openai/codex/issues/25178)
评论 71。`SetIsBorderRequired` 调用返回 `0x80004002` 导致截图在采集前即失败，老版 Windows 上的 Computer Use 完全不可用，长期未修复。

**3. 配置污染：`trusted_level` 写入 config.toml** [#14601](https://github.com/openai/codex/issues/14601)
👍 81 为全榜最高。用户要求将项目级信任配置从 `config.toml` 中分离，避免版本控制下配置被污染，属于影响工作流卫生的架构级诉求。

**4. macOS 渲染器白屏 + 120% CPU** [#46641](https://github.com/openai/codex/issues/46641)
昨日新报，评论已 18。ChatGPT 桌面端 Codex 视图反复白屏，需手动杀掉高占用的渲染进程才能恢复，严重阻塞工作。

**5. Windows 历史会话恢复时复制 MCP / node_repl 进程栈** [#37453](https://github.com/openai/codex/issues/37453)
评论 14。打开/恢复 subagent 历史线程时产生重复进程堆栈，指向 MCP 生命周期管理缺陷，可能导致资源泄漏。

**6. 首轮对话后发送按钮/Composer 被禁用** [#45307](https://github.com/openai/codex/issues/45307) / [#40872](https://github.com/openai/codex/issues/40872)
两个高度相似的症状（各自评论 13）：Windows 桌面端新会话完成第一轮后无法继续输入，疑似同一根源，值得官方合并排查。

**7. 宠物/头像悬浮层导致 UI 冻结** [#33565](https://github.com/openai/codex/issues/33565)
评论 14。开启 pet overlay 后任务切换和鼠标拖拽近乎无响应，性能影响明显。

**8. 沙箱内目录重命名/删除被拒** [#40565](https://github.com/openai/codex/issues/40565)
macOS `workspace-write` 沙箱在可写工作区内拒绝目录 rename/rm，属于核心沙箱策略与预期不一致的问题。

**9. gpt-6-astra 模型行为失控，写入 /tmp 近 1TB** [#46700](https://github.com/openai/codex/issues/46700)
昨日新报的模型行为类问题：无法完成简单计划、自我矛盾循环、未经请求的改动。模型质量而非工具质量的新信号。

**10. 单个小 UI 任务消耗 ~20% 五小时配额** [#46689](https://github.com/openai/codex/issues/46689)
配合 [#44339](https://github.com/openai/codex/issues/44339)（额度无故从 90% 清零）和 [#44550](https://github.com/openai/codex/issues/44550)（Desktop 不像 Web 那样自动降级模型），配额透明度与自动降级机制成为 Pro/Plus 用户的高频不满点。

---

## 四、重要 PR 进展

以下 PR 均在过去 24 小时内更新（多为 copyberry bot 高速合入），主要围绕 **TUI 大重构** 与 **进程/平台底层优化**：

1. **[PR #46721](https://github.com/openai/codex/pull/46721)** Transcript 滚动锚定条目 + 限制视口渲染——解决分页/流式输出时滚动位置漂移，性能优化明显。
2. **[PR #46720](https://github.com/openai/codex/pull/46720)** Transcript 布局跨测量与渲染缓存——消除重复 cell 生成，修复 live tail 过期问题。
3. **[PR #46710](https://github.com/openai/codex/pull/46710)** 恢复历史 Transcript 的富工具详情——加载的记录不再退化为简单状态摘要，命令/MCP 调用/补丁细节完整还原。
4. **[PR #46712](https://github.com/openai/codex/pull/46712)** Recorder 容量压力下恢复已执行工具调用元数据——修复孤儿 output mapping 耗尽容量导致新调用丢失元数据的问题。
5. **[PR #46708](https://github.com/openai/codex/pull/46708)** 折行时保留逻辑源文本与样式——为流式预览变更检测和后续渲染一致性打基础。
6. **[PR #46691](https://github.com/openai/codex/pull/46691) / [#46692](https://github.com/openai/codex/pull/46692) / [#46695](https://github.com/openai/codex/pull/46695) / [#46697](https://github.com/openai/codex/pull/46697)** 系列化统一 TUI Picker 样式——覆盖 apps、plugins、skills、hooks、设置、补全弹窗等所有选择界面，小终端下紧凑布局，是一轮系统性 UI 规范化。
7. **[PR #46680](https://github.com/openai/codex/pull/46680)** TUI 对比度与键盘提示改进——针对暗色/阴影背景下的可读性问题。
8. **[PR #46661](https://github.com/openai/codex/pull/46661)** macOS 文件系统 helper 启动避免 fork——用原生 spawn 替代 `pre_exec` + fork，兼顾描述符隔离。
9. **[PR #46660](https://github.com/openai/codex/pull/46660)** 显式化本地子进程启动 API——统一 macOS 原生后端与 Tokio 后端的受支持启动配置。
10. **[PR #46673](https://github.com/openai/codex/pull/46673)** 版本通知扩展到预发布与本地客户端——后台服务版本不一致的提示覆盖面扩大，减少“App 与 CLI 版本错配”类困惑。

---

## 五、功能需求趋势

- **Windows 平台可靠性**：Windows 相关 Issue 占比最高（WSL、沙箱、PowerShell 执行、i18n），是最迫切的平台短板。
- **TUI / CLI 体验打磨**：本地化时间显示（[#46448](https://github.com/openai/codex/issues/46448)）、配置分离（#14601）等长期诉求持续发酵。
- **配额透明度与弹性**：额度异常清零、单任务消耗过高、模型容量满时不自动降级——计费/调度机制的可解释性需求集中爆发。
- **Subagent 与 Side Chat 可观测性**：side chat 结果无法回流父会话（[#46717](https://github.com/openai/codex/issues/46717)）、create_thread 缺少可寻址 threadId（[#26861](https://github.com/openai/codex/issues/26861)），多智能体编排的接口化需求显现。
- **远程/iPad 会话稳定性**：iPad 远程会话频繁冻结（#41695）、自定义 section 不同步（#42315），移动端远程访问是增长中的使用场景。

---

## 六、开发者关注点

1. **Windows 桌面端稳定性是最大痛点**：无响应需手动重启（#46479）、进程重复堆积（#37453）、发送按钮失效（#45307/#40872）——多个 Issue 指向 app-server 会话生命周期管理的系统性问题。
2. **沙箱行为与文档契约不一致**：macOS 可写工作区拒绝 rename/rm（#40565）、Windows read-only 配置语义需澄清（[#46629](https://github.com/openai/codex/issues/46629)），开发者对沙箱边界的可预期性要求高。
3. **MCP 生态的 OAuth 与进程管理问题**：Meta Ads OAuth 在浏览器登录前即失败（[#44437](https://github.com/openai/codex/issues/44437)）、brokered connector 报 -32603（[#41983](https://github.com/openai/codex/issues/41983)），MCP 集成仍是脆弱环节。
4. **插件自动升级破坏 hooks**：marketplace 升级替换缓存版本后 hooks 持续 exit 1（[#31383](https://github.com/openai/codex/issues/31383)），影响依赖插件的工作流。
5. **模型侧质量波动**：gpt-6-astra 出现自我矛盾循环与异常磁盘写入（#46700），提示新模型在 agentic 长任务上的回归风险值得关注。

---
*本报告基于过去 24 小时 GitHub 公开数据自动汇总，链接均可直接访问原始 Issue/PR。*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 · 2026-09-20

## 1. 今日速览

昨晚发布 nightly 版本 v0.62.0，修复了 ConPTY 进程退出生命周期同步与 PTY 输出终结加固。今日最值得关注的动态是 **AST-aware 结构化搜索工具（`ast_search`）与持久化文件任务追踪系统（替代 WriteToDo）两个重量级功能 PR 进入评审**，标志着 Agent 能力架构的实质性升级。此外，社区围绕 Subagent 可靠性与 Auto Memory 安全/质量问题持续活跃讨论。

---

## 2. 版本发布

**[v0.62.0-nightly.20260919.gcfbcaa8df](https://github.com/google-gemini/gemini-cli/releases)**
- [#29383](https://github.com/google-gemini/gemini-cli/pull/29383) 版本号升至 0.62.0-nightly（机器人自动提交）
- 修复 ConPTY 进程退出生命周期同步，加固 PTY 输出终结逻辑（Windows 终端兼容性改进）

---

## 3. 社区热点 Issues

| # | Issue | 关注理由 |
|---|-------|---------|
| 1 | [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) Subagent 达到 MAX_TURNS 后误报为 GOAL 成功 | **P1**。子代理被中断却报告成功，掩盖真实失败，严重影响可观测性与信任。13 条评论，处于待复测状态 |
| 2 | [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) Generalist agent 无限挂起 | **P1**。简单操作（如建文件夹）也挂起长达一小时，8 👍 反映影响面广 |
| 3 | [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) 零依赖 OS 沙箱 + 执行后意图路由 | 大型 enhancement。利用 Gemini 3 原生 bash 能力的同时保证安全，方向性提案 |
| 4 | [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) AST-aware 文件读取/搜索/映射评估 EPIC | 今日 #29396 PR 直接落地该需求，实现闭环 |
| 5 | [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) 模型不主动使用 skills 和 sub-agents | 用户高频痛点：需显式指令才触发，影响自定义工作流 |
| 6 | [#26525](https://github.com/google-gemini/gemini-cli/issues/26525) Auto Memory 确定性脱敏与日志削减 | **安全类**。密钥脱敏发生在内容已进入模型上下文之后，存在泄露窗口 |
| 7 | [#26522](https://github.com/google-gemini/gemini-cli/issues/26522) Auto Memory 无限重试低信号会话 | 系列质量问题之一，后台资源浪费 |
| 8 | [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) 超过 128 工具时触发 400 错误 | 工具生态扩展的硬上限，企业用户集成 MCP 时易踩坑 |
| 9 | [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) browser subagent 在 Wayland 下失败 | **P1**，Linux Wayland 用户的浏览器自动化不可用 |
| 10 | [#21335](https://github.com/google-gemini/gemini-cli/issues/21335) /compress 结果在 session resume 后丢失 | 省下的 token 又回来了——压缩不持久化，成本优化失效 |

---

## 4. 重要 PR 进展

| # | PR | 内容 |
|---|-----|------|
| 1 | [#29396](https://github.com/google-gemini/gemini-cli/pull/29396) | **feat: AST-aware 结构化搜索工具 `ast_search`**。实现符号级精确导航，避免猜测行号或整文件读取（落地 #22745），size/xl |
| 2 | [#29393](https://github.com/google-gemini/gemini-cli/pull/29393) | **feat: 用持久化文件 CRUD 任务追踪替换 WriteToDo**（落地 #18836），解决 context rot 与 token 成本问题 |
| 3 | [#29402](https://github.com/google-gemini/gemini-cli/pull/29402) | **P1 修复**：持久化状态写入防失败——临时文件 + fsync + 原子重命名，防止中断保存导致 state.json 被截断清空 |
| 4 | [#29368](https://github.com/google-gemini/gemini-cli/pull/29368) | **P1 修复（ACP）**：即使无 resumable 内容也按 ID 解析 session/load |
| 5 | [#29411](https://github.com/google-gemini/gemini-cli/pull/29411) | 修复 `--resume` 裸调用选中过时 spike 会话——改为按最近活动时间解析 |
| 6 | [#29404](https://github.com/google-gemini/gemini-cli/pull/29404) | 新增 `gemini models list` 子命令（JSON 输出），供外部集成动态发现模型，无需硬编码 ID |
| 7 | [#29407](https://github.com/google-gemini/gemini-cli/pull/29407) | 修复 JSON 序列化中重复（非循环）OpenTelemetry 数组被误标 `[Circular]` 的问题 |
| 8 | [#29217](https://github.com/google-gemini/gemini-cli/pull/29217)（已合并） | 修复显式指定 `gemini-2.5-flash` 被静默重写为 3.5 Flash 的问题 |
| 9 | [#29200](https://github.com/google-gemini/gemini-cli/pull/29200)（已合并） | MCP 运行时策略一致性：空 `mcp.allowed` 列表改为 fail-closed，收紧安全边界 |
| 10 | [#29201](https://github.com/google-gemini/gemini-cli/pull/29201)（已合并） | 修复 TOML 自定义命令含多个 shell 注入时确认循环卡死（即便全选 always allow） |

---

## 5. 功能需求趋势

1. **Agent 架构升级**：AST-aware 工具、持久化任务追踪、Subagent 本地化（#20195）是当前主线 workstream，占比最高。
2. **Subagent 可靠性与可观测性**：挂起（#21409）、误报成功（#22323）、轨迹分享（#22598）、bug 报告缺上下文（#21763）集中涌现。
3. **安全与沙箱**：OS 级零依赖沙箱（#19873）、Auto Memory 脱敏（#26525）、破坏性命令防护（#22672）。
4. **Token/上下文效率**：Tactful Extraction 精准读取（#19561）、/compress 持久化（#21335）。
5. **浏览器自动化**：Wayland 支持、会话锁恢复（#22232）、settings.json 覆盖失效（#22267）。

## 6. 开发者关注点

- **Subagent 挂起/误报是最痛的日常问题**：多个 P1 issue 待复测，用户普遍以“禁止使用 subagent”作为临时规避。
- **记忆系统质量**：Auto Memory 的脱敏时机、无效 patch 静默丢弃（#26523）、无限重试（#26522）形成问题簇，建议重度用户暂存疑。
- **配置与状态鲁棒性**：state.json 截断、agents.json 形状错误、symlink 不识别（#20079）——近期多个 PR 均在做防御性修复，值得升级关注。
- **工具数量上限（128）** 对 MCP 重度集成者是硬约束，需注意工具裁剪。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-09-20**

---

## 1. 今日速览

过去 24 小时无新版本发布、无活跃 PR，但 Issues 讨论热度持续：共 48 条 Issue 有更新。焦点集中在 **MCP 生态兼容性**（Figma 远程服务器连接失败、MCP 重连消息刷屏）和**会话稳定性**（长会话 OOM 崩溃、桌面端会话凭证失效）。此外，多个历史高关注 Issue（如非 git 仓库下的 Rewind 支持）迎来批量关闭，值得关注版本演进方向。

---

## 2. 版本发布

无（过去 24 小时无新 Release）。

---

## 3. 社区热点 Issues

1. **[#4870] Figma 远程 MCP 服务器无法加载（OPEN）** — 👍 11 | 评论 7
   `mcp.figma.com` 认证和初始化正常，但 CLI 将 `server/discover` 返回的 `-32601` 视为致命错误，导致工具无法注册；同样的服务器在 VS Code 中工作正常。这是 MCP 生态兼容性问题的典型代表，社区反应强烈。
   https://github.com/github/copilot-cli/issues/4870

2. **[#4699] 长时间 `--resume` 会话 OOM 崩溃（OPEN）** — 👍 6 | 评论 5
   1.0.82 版本在长恢复会话中频繁触发 V8 4 GiB 堆上限崩溃（14 小时内 3 次），且 Node 诊断报告直接写入用户当前目录。涉及核心稳定性与文件卫生两方面问题。
   https://github.com/github/copilot-cli/issues/4699

3. **[#4905] 桌面端会话数分钟后死亡（OPEN）** — 👍 2 | 评论 4
   桌面应用 1.1.22 中 "GitHub credential registration is no longer available" 错误导致 github-mcp-server 目录失效且致命，影响捆绑 CLI（server 模式 / Rust JSON-RPC 引擎）用户。
   https://github.com/github/copilot-cli/issues/4905

4. **[#107] Alpine Linux 上工具调用触发段错误（CLOSED）** — 👍 4 | 评论 16
   老牌高讨论 Issue 正式关闭。Docker alpine 环境下任何工具调用均导致 Segmentation Fault，涉及 musl 兼容性，容器化使用者需关注。
   https://github.com/github/copilot-cli/issues/107

5. **[#4069] WSL2 + Windows Terminal 中途 TUI 卡死（CLOSED）** — 👍 9 | 评论 8
   会话中屏幕清空、输入失灵、Ctrl+C 无响应，伴随 Rust JSON-RPC 传输层 EIO/EPIPE 错误。高赞（👍 9）表明 WSL 用户受影响面广。
   https://github.com/github/copilot-cli/issues/4069

6. **[#1381] 非 git 仓库下 Rewind 不可用（CLOSED）** — 👍 11 | 评论 5
   使用 jj 等其他 VCS 的用户无法使用 Rewind 功能，VS Code 版 Copilot 却无此限制。高赞反映社区对 VCS 无关性支持的强烈诉求，关闭或意味着已有改进。
   https://github.com/github/copilot-cli/issues/1381

7. **[#3355] Claude Opus 4.6 上下文窗口被限制在 200K（CLOSED）** — 👍 4 | 评论 4
   模型原生支持 1M tokens 但 CLI 强制 200K 上限，导致深度技术会话频繁触发自动压缩。与 #3481（long_context tier 不生效）共同构成上下文管理主题。
   https://github.com/github/copilot-cli/issues/3355

8. **[#3439] 1.0.49 版本在 tmux/mintty/Cygwin 下 TUI 渲染延迟回归（CLOSED）** — 评论 9
   相比 1.0.43/1.0.48 出现严重的渲染卡顿、spinner 抖动，是终端兼容性回归的典型案例。
   https://github.com/github/copilot-cli/issues/3439

9. **[#4907] MCP 重连通知刷屏会话历史（OPEN）**
   长会话空闲时，重复的 "连接超时/已连接" MCP 生命周期消息污染对话上下文，降低可用性。
   https://github.com/github/copilot-cli/issues/4907

10. **[#4886] `--plugin-dir` 技能可加载但不显示（OPEN）**
    本地插件技能可被后端发现，却缺失于 `/skills` 与 `/env` 输出，暴露插件系统的可见性/一致性问题。
    https://github.com/github/copilot-cli/issues/4886

---

## 4. 重要 PR 进展

过去 24 小时无 PR 更新，本节省略。

---

## 5. 功能需求趋势

从 Issue 分布看，社区关注方向集中在：

- **MCP 生态兼容性**：远程服务器（Figma）错误处理、生命周期通知治理、github-mcp-server 凭证管理（#4870、#4907、#4905）
- **上下文窗口与内存管理**：更大上下文配置、长上下文 tier 生效、自动压缩循环、OOM（#3355、#3481、#3621、#4699）
- **模型灵活性**：自动模型选择、vision 支持、模型切换（#1801、#3523）
- **Windows / WSL / 多平台终端支持**：渲染、键盘、路径处理问题持续高发（#4069、#3439、#2151、#3733、#3719）
- **可访问性与自定义**：屏幕阅读器反馈、任务栏图标开关、提示音控制（#3005、#4839、#3411）
- **VCS 无关性**：脱离 git 的 Rewind / checkpoint 能力（#1381）

---

## 6. 开发者关注点

- **长会话稳定性是最大痛点**：OOM、会话状态损坏（#2543 的 tool_use/tool_result 不匹配）、session-store 数据缺失（#2655）反复出现，重度用户（agent 长任务、`--resume`）受影响最深。
- **数据安全隐患**：#1675 记录的 checkpoint 恢复执行 `git clean -fd` 永久删除未跟踪文件，虽已关闭，仍提示用户对快照回滚保持警惕；#4699 的崩溃转储写入 cwd 也属同类卫生问题。
- **配置发现路径脆弱**：非 repo 根目录下 `.mcp.json` / hooks 无法读取（#4765），monorepo 与多 repo workspace 用户需要 workaround。
- **配置项"存在但不生效"**：`contextTier: long_context`（#3481）等设置静默失效，期望 CLI 提供更明确的配置校验与反馈。
- **WSL/Cygwin/容器用户**建议暂留意版本回归问题，必要时回退稳定版本。

---
*数据截至 2026-09-20，来源：github.com/github/copilot-cli*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报
**日期：2026-09-20 | 数据来源：MoonshotAI/kimi-cli**

---

## 1. 今日速览

过去 24 小时无新版本发布。社区活动以历史 Issue/PR 的批量更新为主，多位贡献者（尤其 @he-yufeng）的多项修复 PR 获得推进，包括 Windows 兼容性、shell 超时机制和 MCP 日志路由等。新增一条 OpenCode Go 集成的 400 错误报告（#2653），值得 Provider 兼容性方面关注。

---

## 2. 版本发布

过去 24 小时无新 Release。

---

## 3. 社区热点 Issues

> 注：本次数据仅含 7 条 Issue，以下为全部值得关注条目。

| # | 标题 | 状态 | 关注理由 |
|---|------|------|---------|
| [#2653](https://github.com/MoonshotAI/kimi-cli/issues/2653) | OpenCode Go 返回 400（缺少 x-opencode-session header） | OPEN | **今日唯一新增 Issue**。OpenCode Go 作为 Provider 时请求被拒，涉及第三方 Provider 兼容性问题，尚无回复，需官方跟进 |
| [#1266](https://github.com/MoonshotAI/kimi-cli/issues/1266) | HTTP header 校验错误：platform.version() 尾部空格导致 Connection error | CLOSED | Linux 环境高频问题（👍 2），OS 版本字符串含非法字符破坏 HTTP header，同类问题集中出现 |
| [#1368](https://github.com/MoonshotAI/kimi-cli/issues/1368) | Linux 下 platform.version() 含 `#` 字符导致 Connection error | CLOSED | 与 #1266 同根因，`#` 字符进入 header 导致连接失败，Ubuntu 用户集中反馈 |
| [#1364](https://github.com/MoonshotAI/kimi-cli/issues/1364) | Ubuntu 非法 HTTP header 值导致 Connection error | CLOSED | 同一系列 header 校验 bug，1.17.0 版本，反映 Linux 环境信息采集需做清洗 |
| [#1371](https://github.com/MoonshotAI/kimi-cli/issues/1371) | LLM provider 报 Connection error | CLOSED | 涉及 IPv6 环境连接问题，网络环境适配的又一案例 |
| [#1495](https://github.com/MoonshotAI/kimi-cli/issues/1495) | [enhancement] 配置 Plan Mode 计划保存路径 | CLOSED | 功能请求：支持在 `~/.kimi/config.toml` 中自定义 plans 目录，反映用户对工作区配置灵活性的需求 |
| [#1442](https://github.com/MoonshotAI/kimi-cli/issues/1442) | 如何开具发票 | CLOSED | 计费/商务类问题，社区对订阅开票流程文档化的需求 |

---

## 4. 重要 PR 进展

> 注：本次数据共 5 条 PR，全部列出。

| # | 标题 | 状态 | 内容 |
|---|------|------|------|
| [#2183](https://github.com/MoonshotAI/kimi-cli/pull/2183) | fix(shell): 提前附加拖入的图片路径 | OPEN | 提交 prompt 时主动扫描文本中的本地图片路径并立即读取，以 `ImageURLPart` 发送，避免路径失效。修复 #2182，改善多模态体验 |
| [#2350](https://github.com/MoonshotAI/kimi-cli/pull/2350) | fix: 容忍非 UTF-8 worker 输出 | OPEN | 修复 Windows 子进程输出 cp1252 编码导致 UnicodeDecodeError 掩盖真实错误的问题。Windows 兼容性重要修复 |
| [#2181](https://github.com/MoonshotAI/kimi-cli/pull/2181) | fix: 添加 Windows 二进制版本信息 | CLOSED | 从 `pyproject.toml` 生成 PyInstaller 版本资源，并加入 CI 断言，确保 Windows 产物携带 FileVersionInfo |
| [#2200](https://github.com/MoonshotAI/kimi-cli/pull/2200) | fix(shell): 为长命令自适应超时 | CLOSED | 针对 git clone、包安装、构建等慢命令自动延长 shell 超时，普通命令保持 60s 默认值，显著改善长任务体验 |
| [#2259](https://github.com/MoonshotAI/kimi-cli/pull/2259) | fix: stdio MCP stderr 重定向到日志 | CLOSED | 将 MCP 子进程 stderr 路由至 `~/.kimi/logs/mcp/<server>.log`，避免污染交互式终端，改善 MCP 调试体验 |

---

## 5. 功能需求趋势

- **第三方 Provider 兼容性**：OpenCode Go 等外部 Provider 接入问题浮现（#2653），社区期待更广的 Provider 生态支持
- **IDE 集成与配置灵活性**：VSCode 扩展的自定义路径配置请求（#1495），反映用户希望深度控制工作区文件布局
- **多模态输入**：图片路径自动识别与发送（#2183）表明视觉输入体验是活跃改进方向

---

## 6. 开发者关注点

- **Linux 连接稳定性是最大痛点**：#1266/#1364/#1368/#1371 集中反映 OS 环境信息（`platform.version()` 中的空格、`#` 等字符）直接拼入 HTTP header 导致 Connection error，建议官方对环境元数据统一做 sanitize
- **Windows 兼容性持续投入**：非 UTF-8 输出（#2350）、二进制版本信息（#2181）等修复密集落地，跨平台质量明显提升中
- **长命令执行体验**：shell 60s 默认超时对构建/clone 类命令过短（#2200 已修复），是开发者高频使用场景
- **MCP 可观测性**：stderr 泄漏到终端的问题已修复（#2259），日志化路径利于排查 MCP 集成问题

---
*本日报由 AI 自动生成，数据截至 2026-09-20。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-09-20

## 📌 今日速览

今日无新版本发布。社区焦点集中在**订阅计费与免费层（free tier）使用问题**——多张 Issue 反映支付被拒、扣款未到账及第三方 Agent 被拒之门外，与 OpenCode Zen 官方“无锁定”承诺产生冲突，引发争议。产品层面，`/compact` 导致上下文永久丢失、Electron 渲染进程 ResizeObserver 死循环冻结等核心稳定性问题持续发酵。新 PR 方面，社区贡献者提交了 `-s` 会话选择器和 Azure 资源发现功能。

---

## 🔥 社区热点 Issues

**1. [#45278](https://github.com/anomalyco/opencode/issues/45278) — 订阅续费连续 3 个月正常后突然支付失败（21 评论 / 5 👍）**
用户银行卡与银行端均无异常，但订阅被拒。21 条评论显示多人遇到相同问题，计费系统可靠性问题已持续近一个月未解决，是当前社区情绪最集中的痛点。

**2. [#30680](https://github.com/anomalyco/opencode/issues/30680) — 空目录下也陷入自动压缩死循环（18 评论，已关闭）**
OpenCode 反复 auto-compaction 消耗 token 且最终停止响应。该长期问题的关闭或预示近期版本已修复，但值得验证是否真正解决。

**3. [#33027](https://github.com/anomalyco/opencode/issues/33027) — MCP 工具连接成功但未暴露给 Agent（13 评论 / 4 👍）**
`pdfrag` 服务器通过 `tools/list` 正常返回 6 个工具，Agent 却看不到。MCP 集成完整性问题影响生态可用性。

**4. [#49680](https://github.com/anomalyco/opencode/issues/49680) / [#49858](https://github.com/anomalyco/opencode/issues/49858) — 免费层“只能在 OpenCode 内使用”限制引争议**
使用第三方 Agent（如 Pi Agent）时被 Console 拒绝，与 Zen 文档中“无锁定、任意 Agent 可用”的承诺直接矛盾（#49858 标题直言"doc is now a lie"）。策略与文档的一致性问题需要官方澄清。

**5. [#49927](https://github.com/anomalyco/opencode/issues/49927) — 周内首次会话即报 Free Usage Exceeded（6 评论）**
v1.18.31 上免费额度计算明显异常，影响免费用户的首日体验。

**6. [#44080](https://github.com/anomalyco/opencode/issues/44080) — `/compact` 静默落地空摘要，上下文永久丢失**
当压缩模型只返回 reasoning 部分时，空 body 被当作摘要保存，原始对话历史被不可逆销毁。数据安全问题，严重度高于一般 bug。

**7. [#43355](https://github.com/anomalyco/opencode/issues/43355) / [#38296](https://github.com/anomalyco/opencode/issues/38296) — Desktop 渲染进程 ResizeObserver 循环导致冻结**
Electron 后端仍存活但渲染器完全无响应，只能强杀重启。两个 Issue 相互印证，是桌面端最严重的稳定性问题。

**8. [#50054](https://github.com/anomalyco/opencode/issues/50054) — 通过 Stripe/UPI 付款后未收到订阅**
已扣款但无订阅、无收据，要求退款。与 #45278 共同指向计费链路问题。

**9. [#47975](https://github.com/anomalyco/opencode/issues/47975) — Provider 请求 invalid_request_error（已关闭）**
上游请求参数校验失败导致完全不可用，已关闭，可能已修复，建议关注后续版本说明。

**10. [#42350](https://github.com/anomalyco/opencode/issues/42350) — Skills 因 YAML frontmatter 解析失败被静默丢弃**
gray-matter 缓存被污染后，同一进程内二次解析的 Skills 会“无声消失”。对重度自定义用户是隐蔽且难排查的坑。

---

## 🔧 重要 PR 进展

**新提交：**
1. **[#50052](https://github.com/anomalyco/opencode/pull/50052)** — `opencode -s` 不带 ID 时直接打开会话选择器（对应 Issue #48718），TUI 工作流改进。
2. **[#50053](https://github.com/anomalyco/opencode/pull/50053)** — 后台发现并校验 Azure 资源：稳定模型 ID、分页清单、连接前验证访问权限，提升 Azure 集成体验。

**近期批量关闭的社区 PR（automated-pr-cleanup，多为 8 月提交、今日清理）：**

3. **[#43515](https://github.com/anomalyco/opencode/pull/43515)** — 将凭证降级（credential lowering）逻辑下沉到各 provider 包，架构解耦。
4. **[#43510](https://github.com/anomalyco/opencode/opencode/pull/43510)** — 修复追加消息破坏 prompt cache 断点的问题——缓存失效无报错，属隐性性能 bug。
5. **[#43489](https://github.com/anomalyco/opencode/pull/43489)** — 崩溃恢复：`session.auto_resume` 将活跃会话持久化到 manifest，重启后自动恢复。
6. **[#43458](https://github.com/anomalyco/opencode/pull/43458)** — `/reload` 热重载配置、插件、MCP、Skills，无需重启 TUI。
7. **[#43496](https://github.com/anomalyco/opencode/pull/43496)** — 构建时打包全部 tree-sitter 语法，服务离线/隔离网环境（呼应 #18492）。
8. **[#43456](https://github.com/anomalyco/opencode/pull/43456)** — 新增 DB stats / prune / vacuum 命令，用 `VACUUM INTO + 文件替换` 解决 WAL 模式下的空间膨胀。
9. **[#43455](https://github.com/anomalyco/opencode/pull/43455)** — Snapshot 系统加入重试、熔断与瞬态错误检测，修复 Windows 虚拟内存不足时错误被静默吞掉的问题。
10. **[#49828](https://github.com/anomalyco/opencode/pull/49828)**（agent bot 提交）— 修复 `/btw` 对话框在 PluginProvider 边界外调用 `usePlugin()` 的上下文丢失问题，附回归测试。

---

## 📈 功能需求趋势

- **计费与账户管理**（#45278、#50054、#18654）：支付可靠性、订阅状态、邮箱修改/账户合并是高频诉求，#18654（邮箱修改，16 👍）长期未解决。
- **上下文管理与压缩**（#44080、#39677、#30680）：auto-compaction 的正确性、图片超限（Azure 50 张上限）未触发媒体剥离压缩，是 Agent 长会话的核心短板。
- **稳定性 / 渲染性能**（#43355、#38296、#49552、#34214）：Electron TUI 冻结、Web 端流式渲染持续吃满 CPU/GPU，跨端均有反馈。
- **MCP 生态**（#33027、#50036）：工具暴露失败、OAuth issuer 尾斜杠校验回归（2.0.3 起），MCP 兼容性仍是重点。
- **国际化**（#35831）：i18n 框架已就位但多语言翻译未落地，社区愿意贡献。

---

## ⚠️ 开发者关注点

1. **计费系统需紧急排查**：支付被拒 + 扣款未到账 + 免费额度误判三类问题同时出现，直接影响付费信任。
2. **“无锁定”承诺 vs 免费层限制**：官方需明确 Zen 免费层与第三方 Agent 的边界，并同步文档。
3. **静默失败类 bug 危害最大**：Skills 消失、compact 空摘要、export 只导出已加载部分（[#50014](https://github.com/anomalyco/opencode/issues/50014)）——均无报错却造成数据丢失，建议统一增加校验与告警。
4. **v2.0 工具链兼容性问题集中爆发**：VS Code 扩展与 CLI 2.0.10 不兼容（[#50043](https://github.com/anomalyco/opencode/issues/50043)）、MCP OAuth 回归（#50036），2.0.x 升级需谨慎。
5. **Windows 体验**：nvm .ps1 shim 导致 npm 命令被记事本打开（[#50040](https://github.com/anomalyco/opencode/issues/50040)），Windows 用户环境适配仍需打磨。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-09-20

## 1. 今日速览

Qwen Code 发布 **v0.24.1** 正式版，同步推出 Desktop v0.24.1 与 SDK TypeScript v0.1.13，但社区随即发现 v0.24.0 引入的 `/cd` 命令回归（P1）等新问题。安全方向今天格外活跃：一个**权限检查路径解析漏洞**（#12246）和一个 **LSP 非 ASCII 响应静默丢弃 bug**（#12206，已修复）相继被提出。同时 bwrap/Landlock 沙箱执行体系持续推进，三连 PR（#12067 → #12269 → #12278）勾勒出完整的工具级沙箱路线图。

---

## 2. 版本发布

### v0.24.1（CLI）
- ⚠️ **Breaking Change**: `refactor(goal)!:` 停止发送 `active_goal` 流事件（[#12181](https://github.com/QwenLM/qwen-code/pull/12181)），依赖该事件的下游集成方需注意适配。
- 新增 workflows 相关 feature。

### Qwen Code Desktop v0.24.1
- 修复 ACP 权限队列作用域（#11802），channels 新增共享输出模式。
- [Release 链接](https://github.com/QwenLM/qwen-code/releases/tag/desktop-v0.24.1)

### SDK TypeScript v0.1.13
- 捆绑 CLI 0.24.1 版本，与主仓库同源构建。

### Nightly
- `v0.24.1-nightly.20260919.c1c00cbaab`：修复 CI Docker 缓存回收与 review 临时目录清理（#12135）。

---

## 3. 社区热点 Issues（Top 10）

| # | Issue | 为什么重要 |
|---|-------|-----------|
| 1 | [#12224](https://github.com/QwenLM/qwen-code/issues/12224) `/cd` 命令在 v0.24.0 后失效（P1） | 最新版本的直接回归，即使无活动会话也报"response in progress"，5 条评论快速聚集，属高优修复项 |
| 2 | [#12246](https://github.com/QwenLM/qwen-code/issues/12246) 权限检查路径解析漏洞（P1/安全） | 引号读取差异导致后台化 `cd` 被误判为前台，**受保护写操作可解析到错误路径**，是潜在权限绕过向量 |
| 3 | [#11872](https://github.com/QwenLM/qwen-code/issues/11872) Web Terminal "PTY not available"（P1/macOS） | `node-pty` 声明但未打包 + macOS 签名阻止本地 prebuild，11 条评论为今日讨论最热，Desktop 用户核心痛点 |
| 4 | [#12185](https://github.com/QwenLM/qwen-code/issues/12185) web-shell npm 包三处打包缺陷（P1） | `@qwen-code/web-shell` 刚接入发布管线（#12178），未解析的 `@/` 类型导入和内联依赖将直接到达 npm 消费者 |
| 5 | [#12206](https://github.com/QwenLM/qwen-code/issues/12206) LSP 非 ASCII 响应被静默丢弃（P1，已关闭） | Content-Length 字节数与 UTF-16 长度比较错误，**中文文档的 documentSymbol 直接返回空**——对中文用户影响极大，已修复 |
| 6 | [#8182](https://github.com/QwenLM/qwen-code/issues/8182) daemon 给每个 ACP 子进程授权 50% 主机内存（P2） | 多子进程场景下内存超配严重，长存活 issue，配套文档 PR #12265 今天跟进 |
| 7 | [#6721](https://github.com/QwenLM/qwen-code/issues/6721) 延迟工具发现使 prompt cache 前缀失效（P2） | `tool_search` 揭示真实 schema 后调用 `setTools()` 导致缓存全量失效，直接影响 token 成本，7 条评论 |
| 8 | [#12217](https://github.com/QwenLM/qwen-code/issues/12217) `export const meta` 前有注释即导致 workflow 启动失败（P2） | 正则锚点缺 `/m` 标志且不容忍注释，用户极易踩坑且错误提示误导 |
| 9 | [#12277](https://github.com/QwenLM/qwen-code/issues/12277) Local Control 启用遇 EADDRINUSE（P2/daemon） | `--port 0` 分配的临时端口被 LAN 接口占用时，第二个 HTTP listener 冲突，影响 Desktop 用户扫码接入 |
| 10 | [#11783](https://github.com/QwenLM/qwen-code/issues/11783) TUI 后台任务注册后 React #185 崩溃（P1，已关闭） | "Maximum update depth exceeded" 直接杀死 TUI 进程，已修复，可作为回归监测点 |

**其他值得关注**：[#12220](https://github.com/QwenLM/qwen-code/issues/12220)（LSP 失败被吞成空结果）、[#12272](https://github.com/QwenLM/qwen-code/issues/12272)（agent 工具描述约 2000 token，每轮浪费预算）、[#12270](https://github.com/QwenLM/qwen-code/issues/12270)（bwrap 测试套件打红 Windows lane）。

---

## 4. 重要 PR 进展（Top 10）

1. **[#12269](https://github.com/QwenLM/qwen-code/pull/12269) 运行时工具接入 bwrap 沙箱** — 在 #12067 基础上构建 per-tool 沙箱集成层：Shell/Monitor 走共享 bwrap 适配器，Write/Edit 走受限文件 worker。
2. **[#12278](https://github.com/QwenLM/qwen-code/pull/12278) 新增 Landlock 执行回退** — 与 bwrap 形成 `auto` 双后端策略，Linux 沙箱覆盖面更广。
3. **[#11874](https://github.com/QwenLM/qwen-code/pull/11874) `qwen batch` 命令 + headless `--batch` 模式** — 对接 DashScope Batch API（半价、独立配额），支持 submit/status/fetch/cancel，批量任务场景的重大能力。
4. **[#12255](https://github.com/QwenLM/qwen-code/pull/12255) 支持无远程 daemon 的 SSH 工作区** — 在 Web Shell 添加 `ssh://user@host:port/path` 即可通过本地 daemon 操作远程项目，远程开发体验闭环。
5. **[#12190](https://github.com/QwenLM/qwen-code/pull/12190) workflow 运行支持从持久化历史 retry/rerun** — daemon 重启中断的运行可从快照恢复，提升 workflow 可靠性。
6. **[#12142](https://github.com/QwenLM/qwen-code/pull/12142) 为 Agent/Shell 工具描述加 token 预算门控** — 直击 #12272 反馈的 prompt 膨胀问题，未来 prompt 面积增长需显式预算变更。
7. **[#12162](https://github.com/QwenLM/qwen-code/pull/12162) ACP 会话可接收跨会话消息** — 编辑器驱动的会话不再拒绝来自其他会话的消息，向多会话协作演进。
8. **[#12107](https://github.com/QwenLM/qwen-code/pull/12107) 扩展加载循环并行化** — daemon `GET /extensions` 冷加载路径从串行改为并行，显著缩短冷启动。
9. **[#12258](https://github.com/QwenLM/qwen-code/pull/12258) MCP App 资源限制按服务器可配置** — HTML 上限最高 4 MiB、读取超时最高 120s，超出默认但保持安全边界。
10. **[#12265](https://github.com/QwenLM/qwen-code/pull/12265) ACP 子进程堆内存校准文档** — 为 #8182 的固定堆上限方案沉淀双语设计文档与 Node 24 校准证据。

---

## 5. 功能需求趋势

- **沙箱与安全执行**：bwrap → Landlock → 运行时集成，社区在系统级隔离上密集投入，是当前最明确的架构方向。
- **Token/上下文经济性**：prompt 缓存前缀失效（#6721）、agent 描述超长（#12272）、`/context` 统计口径（#12033/#12048）——context-performance 已成正式 roadmap 标签。
- **Web Shell / Desktop 完整度**：会话内搜索（#12231）、standalone 会话展示（#11878）、打包质量（#12185）——web-shell 刚进入 npm 发布，质量收敛需求集中爆发。
- **远程与多机协作**：SSH 工作区（#12255）、Local Control（#12277）、ACP 容量管理（#11907）。
- **多语言/本地化**：session recap 强制英文（#11847）、LSP 中文响应丢弃（#12206），中文用户体验问题受到关注。

## 6. 开发者关注点

1. **版本回归响应速度**：v0.24.0 的 `/cd` 失效（P1）在发布后 24 小时内被大量报告，发布前 E2E 对斜杠命令的覆盖存在盲区。
2. **打包与分发质量**：web-shell npm 包缺陷（#12185）、macOS PTY 打包（#11872）表明发布管线的扩张速度快于质量门禁。
3. **CI 稳定性投入大**：Windows lane 连续打红（#12270、#12262）、E2E 构建产物下载瞬态失败（#12274/#12128），团队在持续修补 flaky 基础设施。
4. **内存与资源管理**：daemon ACP 子进程内存超配（#8182）长期未解，配套文档与容量管理方案正在推进。
5. **错误可观测性**：多个 issue 涉及错误被静默吞掉（LSP 空结果 #12220、缓存失效无提示 #6721），社区希望失败可见而非降级为空返回。

---
*数据来源：GitHub QwenLM/qwen-code 公开数据，统计窗口为过去 24 小时。*

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*