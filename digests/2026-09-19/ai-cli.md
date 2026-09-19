# AI CLI 工具社区动态日报 2026-09-19

> 生成时间: 2026-09-19 01:58 UTC | 覆盖工具: 7 个

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
**数据日期：2026-09-19**

---

## 一、生态全景

AI CLI 工具已从单纯的命令行补全工具演进为**多模态、多 Agent 编排的开发平台**。竞争焦点正从“代码生成能力”转向**可扩展性架构**（Claude Code 的 Mods、Codex 的 Plugin Catalog、Copilot 的 Skills）与**跨工具标准兼容**（AGENTS.md 已成事实标准，Claude Code 今日正式加入）。与此同时，Windows 平台质量欠账（Codex 约 60% 热点 Issue 带 windows-os 标签）、沙箱安全语义、上下文/token 经济性成为全行业共性痛点。

---

## 二、各工具活跃度对比

| 工具 | 今日热点 Issues | 今日 PR 动态 | Release | 核心动态 |
|---|---|---|---|---|
| **Claude Code** | 10 条精选（含 2 条今日新增高危） | 8 条（mods 相关 3+ 条密集合入） | v2.1.276 / v2.1.277 | AGENTS.md 落地，关闭 5169👍 头号请求 |
| **Codex** | 10 条精选 + 多个问题簇 | **11+ 条**（架构级重构多） | rust-v0.155.1 稳定版 + alpha 密集迭代 | AgentControl 契约、Plugin Catalog |
| **Gemini CLI** | 10 条精选 | 11 条（含 2 个 XL 级） | v0.62.0-nightly | ast_search 落地、持久化任务追踪 |
| **Copilot CLI** | 10 条精选（MCP 问题集中爆发） | **0 条** | v1.0.87-0 | 组织级策略、MCP 兼容性问题集群 |
| **Kimi Code CLI** | 10 条（多为批量关闭） | **1 条** | 无 | 2.0.0 架构迁移回归、积压清理 |
| **OpenCode** | 10+ 条（免费层故障十余个重复 Issue） | **15+ 条**（启动性能系列） | 无版本发布 | Zen 免费层故障、性能优化 PR 井喷 |
| **Qwen Code** | 10 条（3 个 P1） | 10 条 | v0.24.1-preview.0 + nightly | node-pty 打包、/cd 回归修复 |

**PR 活跃度排序**：OpenCode ≈ Codex > Gemini CLI ≈ Qwen Code > Claude Code >> Copilot CLI ≈ Kimi CLI

---

## 三、共同关注的功能方向

| 方向 | 涉及工具 | 具体表现 |
|---|---|---|
| **MCP 生态兼容性** | Copilot CLI（Figma 连接失败、OAuth DCR 被拒）、Kimi（断连报错、配置混乱）、Qwen（registrationUrl 丢失）、Gemini（策略绕过修复） | 全行业最大共性痛点：各 CLI 的 MCP 实现与生态实际存在明显兼容性鸿沟 |
| **AGENTS.md / 项目指令标准** | Claude Code（今日正式支持）、Copilot CLI（symlink 越界发现问题） | 跨 Agent 指令文件复用已成事实标准，关注点转向发现的精确性 |
| **多 Agent 编排与子代理可靠性** | Codex（AgentControl 契约、LiveAgent 结构化）、Gemini（Agent Teams 呼声第一，但挂起/误报成功/不主动调用问题集中）、Claude Code（Mods 函数级 Hook） | 编排能力是各家主攻方向；子代理是故障率最高的子系统 |
| **可扩展性（Mods/Plugins/Skills）** | Claude Code（Mods #91870）、Codex（Plugin Catalog 双 PR）、Copilot（skills 子文件夹 24👍）、OpenCode（npm 子路径插件） | 第三方扩展基础设施加速建设，生态平台化竞争开启 |
| **沙箱与权限精细化** | Claude Code（excludedCommands 过度排除）、Codex（Windows 私有桌面强制化）、Qwen（文件系统作用域权限体系）、Codex（后台进程审批一致性） | 安全边界从粗粒度开关走向语义精确匹配 |
| **上下文/token 经济性** | Gemini（/compress 不持久化、工具>128 报 400）、Qwen（非对话上下文计费治理）、OpenCode（子代理成本统计遗漏） | 重度用户对 token 透明度和计费颗粒度要求快速上升 |
| **Windows 平台质量** | Codex（60% Issue）、Claude Code（fswatch 泄漏 230MB/min）、Qwen（TUI 崩溃）、OpenCode（AMD 启动崩溃） | 全行业 Windows 支持普遍滞后 |

---

## 四、差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|---|---|---|---|
| **Claude Code** | 扩展性架构（Mods）、桌面端一体化（Cowork/远程控制） | 重度专业开发者 + 移动办公场景 | 闭源、官方主导架构演进、快速响应社区头号需求 |
| **Codex** | Agent 平台化（AgentControl/Plugin Catalog）、Computer Use | 企业部署 + 第三方集成者 | Rust 重写、开源、PR 节奏最快、API 契约先行 |
| **Gemini CLI** | 代码结构感知（AST 工具）、记忆系统 | Google 生态用户、注重安全的团队 | 开源、AST/记忆等差异化能力建设 |
| **Copilot CLI** | 企业治理（组织策略/Agent 分发）、GitHub 原生集成 | 企业/组织用户 | 闭源、策略层能力强但工程迭代慢（今日 0 PR） |
| **Kimi Code CLI** | 终端生态细节（OSC 通知、主题）、多 provider 支持 | 中文社区、个人开发者 | Python → 单文件二进制迁移期，处于质量重建阶段 |
| **OpenCode** | 开放多前端（"no lock-in"）、桌面性能 | 逃离锁定的用户、第三方前端开发者 | 开源、社区贡献驱动（个人维护者 PR 井喷） |
| **Qwen Code** | LSP 深度集成、ACP/远程工作区、企业部署 | 中文开发者、团队场景 | 对齐 Codex 设计（tools.mode、远程连接），积极吸收竞品方案 |

---

## 五、社区热度与成熟度

- **第一梯队（成熟 + 高活跃）**：**Claude Code**（单 Issue 最高 5169👍，400 评论，社区规模最大）、**Codex**（PR 密度最高，架构级变更频繁，处于平台化转型期）
- **第二梯队（快速迭代追赶）**：**Gemini CLI**（差异化功能落地快）、**Qwen Code**（修复响应迅速，企业需求抬头）、**OpenCode**（社区贡献最活跃，但基础设施故障暴露治理短板——免费层故障两天十余个重复 Issue 未合并处理）
- **第三梯队（迭代放缓/质量整固）**：**Copilot CLI**（今日 0 PR，回归频出但社区热度尚可）、**Kimi CLI**（批量关闭积压，2.0.0 迁移期回归，活跃度最低）

**治理风险信号**：Claude Code 的 6000+ 可复现 Issue 被自动关闭（#87647）与 OpenCode 的重复 Issue 泛滥，反映高增长社区的 Bug 追踪机制跟不上规模。

---

## 六、值得关注的趋势信号

1. **AGENTS.md 标准战争已结束，互操作竞争开始**。Claude Code 加入后，主流工具全部支持，项目指令文件可复用。开发者现在可放心将 AGENTS.md 作为唯一配置入口——但注意各家的发现逻辑差异（Copilot 的 symlink 遍历问题提示需测试边界行为）。

2. **从 CLI 到 Agent 平台的架构竞赛**。Codex 的 AgentControl 契约、Claude 的 Mods、Copilot 的组织级 Agent 分发，指向同一方向：CLI 只是宿主，可编排的 Agent 生态才是产品。第三方集成者应提前跟进这些公开 API。

3. **安全语义精确化是下一战场**。excludedCommands glob 误匹配、MCP 策略绕过、沙箱边界“连坐”——粗粒度沙箱开关正在被淘汰，文件系统作用域、命令级语义匹配成为标配。企业选型时应重点评估权限模型颗粒度。

4. **Token/成本透明度成为采购决策因素**。子代理开销不计量（OpenCode）、非对话上下文全量计费（Qwen）、限额连坐（OpenCode）等 Issue 显示重度用户已开始按账单审视工具，成本可观测性将成为差异化能力。

5. **Windows 是全行业质量洼地**。Codex 60% Issue、Claude 内核级内存泄漏、OpenCode AMD 崩溃——若团队主力在 Windows，任何工具都需谨慎评估并保留回退方案。

6. **静默失败是信任杀手**。文本静默丢失（Claude）、图片粘贴静默失败、LSP 错误吞为空结果（Qwen）——“坏了但不知道为什么坏”比崩溃更损害信任，错误可观测性投入回报率高。

---

*本报告基于 2026-09-19 各仓库公开 GitHub 数据整理，反映单日快照，趋势判断需结合连续多日数据验证。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（截止 2026-09-19）

> 说明：本期 PR 数据中评论数缺失，排行依据为 PR 活跃度（创建/更新时间）、关联 Issue 热度及议题相关性综合评估。

---

## 一、热门 Skills 排行

| # | Skill / PR | 功能 | 讨论热点 | 状态 |
|---|---|---|---|---|
| 1 | **skill-creator 触发评估修复** [#1298](https://github.com/anthropics/skills/pull/1298) | 修复 skill-creator 触发评估中 per-worker 探针竞争、Windows `select()` 失败及运行时错误被误判为非触发的问题 | 与 #1769、#556 共同指向社区最痛的「触发评估 0% 召回率」问题 | OPEN |
| 2 | **proofcore-contract-auditor** [#1771](https://github.com/anthropics/skills/pull/1771) | Solidity/Rust 智能合约静态分析 + TON 链上审计证明锚定 | Web3 场景 + 外部协议绑定，涉及社区技能推广边界争议 | OPEN |
| 3 | **md2video-audio** [#1703](https://github.com/anthropics/skills/pull/1703) | Markdown 一键编译为带配音的 MP4 视频（Marp + TTS，零成本） | 内容创作者刚需，近期活跃更新 | OPEN |
| 4 | **mcp-builder 修复与升级** [#1742](https://github.com/anthropics/skills/pull/1742) | 适配 mcp>=2.0 的 `streamable_http_client` 重命名与自定义 Header | 关联 #1668、#1390，mcp-builder 是社区使用最重的官方 Skill 之一 | OPEN |
| 5 | **pyxel 复古游戏开发** [#525](https://github.com/anthropics/skills/pull/525) | Python 复古游戏创建/调试/验证，含 headless 运行与帧检查 | 挂起 6 个月仍持续更新，长尾待合并代表 | OPEN |
| 6 | **Hivemind 多 Agent 编排** [#1628](https://github.com/anthropics/skills/pull/1628) | 用免费模型跑 headless opencode worker，Claude 只做规划/审查/合并 | 「省钱式多 Agent 协作」引发关注 | OPEN |
| 7 | **blast-radius** [#1776](https://github.com/anthropics/skills/pull/1776) | 批量/破坏性写操作前的爆炸半径检查清单 | 安全治理类 Skill 新兴方向 | OPEN |
| 8 | **document-typography** [#514](https://github.com/anthropics/skills/pull/514) | AI 生成文档排版质检（孤行、孤字换行、编号错位） | 命中「每个 Claude 文档都受影响」的普遍痛点 | OPEN |

---

## 二、社区需求趋势（来自 Issues）

1. **安全与信任边界**：[#492](https://github.com/anthropics/skills/issues/492)（43 评论，最高热度）——社区技能冒用 `anthropic/` 命名空间造成权限滥用风险；[#1175](https://github.com/anthropics/skills/issues/1175) 关注 SPO 场景下的权限与上下文安全。安全治理是第一诉求。
2. **组织级分发与共享**：[#228](https://github.com/anthropics/skills/issues/228)（16 评论）——组织内 Skill 库、分享链接；企业落地刚需。
3. **Skill 质量评测工具链**：[#556](https://github.com/anthropics/skills/issues/556)、[#1390](https://github.com/anthropics/skills/issues/1390)、[#1385](https://github.com/anthropics/skills/issues/1385)——触发率评估、MCP 评估框架、推理质量门禁；社区在自建评估体系。
4. **上下文效率**：[#1487](https://github.com/anthropics/skills/issues/1487)——claude-api skill 一次注入 156k token；[#1329](https://github.com/anthropics/skills/issues/1329) 提议 compact-memory 符号化记忆。Skill 瘦身/渐进加载是强需求。
5. **工程化缺陷反馈**：[#189](https://github.com/anthropics/skills/issues/189)（插件重复安装）、[#1362](https://github.com/anthropics/skills/issues/1362)（web-artifacts-builder 构建失败）——官方 Skill 的跨平台（Windows、pnpm）兼容性问题集中爆发。
6. **生态互操作**：[#29](https://github.com/anthropics/skills/issues/29)（Bedrock 支持）、[#16](https://github.com/anthropics/skills/issues/16)（Skill 暴露为 MCP）。

---

## 三、高潜力待合并 Skills

- **#1298 skill-creator 触发评估隔离修复**（2026-09-16 仍活跃）——修复评测基础设施，合并优先级高
- **#1769 触发检测 0% 召回修复**（[链接](https://github.com/anthropics/skills/pull/1769)，Fixes #1721）——直击评测核心 Bug，最强合并候选
- **#1742 mcp-builder 适配 mcp>=2**（[链接](https://github.com/anthropics/skills/pull/1742)，Fixes #1668）——官方 Skill 破坏性修复，近期活跃
- **#1765 office redlining UTF-8 修复**（[链接](https://github.com/anthropics/skills/pull/1765)，Fixes #1707）——Windows 本地化场景修复，小而确定
- **#541 docx tracked change w:id 冲突修复**（[链接](https://github.com/anthropics/skills/pull/541)）——官方 docx skill 数据损坏级 Bug

趋势：近期最可能落地的是**官方 Skill（skill-creator / mcp-builder / docx）的 Bug 修复类 PR**，而非新增第三方 Skill。

---

## 四、生态洞察（一句话）

**社区最集中的诉求不是「更多 Skill」，而是「可信与可测」——建立命名空间信任机制、修复触发评估工具链、控制 Skill 上下文开销，让 Skills 从 Demo 走向企业级生产。**

---

# Claude Code 社区动态日报
**日期：2026-09-19** | 数据来源：github.com/anthropics/claude-code

---

## 📌 今日速览

今日最重要的动态是 **v2.1.277 正式支持 AGENTS.md**，标志着 Claude Code 加入跨 Agent 通用的项目指令标准——拥有 5169 个 👍、400 条评论的社区头号功能请求（#6235）正式关闭，这是社区长期呼吁的重大胜利。同时 v2.1.276 修复了导致代理/网关用户全部请求失败的 400 回归错误。Mods 可扩展性系统（#91870）持续活跃推进，diff 面板与 agents-md mods 相关的多个 PR 密集合入。

---

## 🚀 版本发布

### v2.1.277
- **AGENTS.md 支持**：项目中无 CLAUDE.md 时，Claude Code 会转而读取 AGENTS.md；可在 `/config` 的 "Project instructions" 中配置（Bedrock / Vertex / Foundry 暂不支持）
- 新增 `CLAUDE_GATEWAY_PROXY_IS_EGRESS_BOUNDARY=1` 环境变量，用于仅出站边界型网关配置

### v2.1.276
- 修复 2.1.275 引入的回归：当 `ANTHROPIC_BASE_URL` 指向代理或网关时，所有请求均报 `400 … Input tag 'advisor_20260301'` 错误

---

## 🔥 社区热点 Issues

1. **[#6235](https://github.com/anthropics/claude-code/issues/6235) [已关闭] Support AGENTS.md** — 👍 5169 / 💬 400
   社区呼声最高的功能请求，今日随 v2.1.277 正式落地。Codex、Amp、Cursor 等已围绕 AGENTS.md 形成统一标准，Claude Code 的加入意味着多 Agent 协作开发时项目指令文件可复用，无需维护多份说明文件。

2. **[#91870](https://github.com/anthropics/claude-code/issues/91870) [开放] Mods - make Claude 10x more extensible** — 👍 121 / 💬 201
   官方主导的函数级 Hook 扩展系统，9 月 9 日社区更新确认 "数周内发布"。今日多个 mods 相关 PR 合入（见下文），是近期最值得跟踪的架构演进。

3. **[#18435](https://github.com/anthropics/claude-code/issues/18435) [开放] Claude Desktop 多账号管理与快速切换** — 👍 814 / 💬 192
   多账号/多配置切换是桌面端用户的高频需求，对同时管理个人与工作账号的开发者尤为关键。

4. **[#87647](https://github.com/anthropics/claude-code/issues/87647) [开放] 超过 6 千条带 "has repro" 标签的 Issue 自 2026 年 3 月起被自动关闭** — 👍 49
   元问题：社区质疑 Issue 自动关闭机制吞掉了大量可复现的 Bug 报告，反映社区对仓库治理透明度的不满。

5. **[#76694](https://github.com/anthropics/claude-code/issues/76694) [开放] Cowork 与 Chat 合并后丢失 "Choose a folder"** — 💬 29
   Chat/Cowork 合并后，新建项目仅剩上传式知识菜单，本地文件夹工作流受损，影响重度用户。

6. **[#89398](https://github.com/anthropics/claude-code/issues/89398) [开放] 斜杠命令选择器不弹出但命令仍执行** — 💬 13
   Windows 桌面端 UX 问题："/" 不在首位时自动补全不出现，但提交时命令照样执行，容易造成误操作。

7. **[#77651](https://github.com/anthropics/claude-code/issues/77651) [开放] 工具调用之间的助手文本静默丢失** — 💬 11
   严重的数据完整性问题：交错思考模式下，模型在工具调用间的回复不渲染、不进 Ctrl+O 历史、不写入会话 .jsonl。

8. **[#95489](https://github.com/anthropics/claude-code/issues/95489) [开放] Windows 桌面端 fswatch 探测每秒重试约 3.8 万次，内核非分页内存泄漏 230 MB/min** — 🔴 今日新增
   高危回归：ntfs.sys NtFC 池泄漏直至重启才恢复，临时方案为设置 `CLAUDE_CODE_TMPDIR`。与 #94198（CoworkVMService 泄漏）同属 Windows 内存问题簇。

9. **[#95455](https://github.com/anthropics/anthropics/claude-code/issues/95455) [开放] 2.1.277 sandbox excludedCommands 过度排除 `git -C` 等带前置 flag 的单命令** — 🔴 今日新增
   2.1.277 的 sandbox 修复矫枉过正，影响携带 `--git-dir`、`-c` 等参数的 git 命令沙箱豁免。

10. **[#95367](https://github.com/anthropics/claude-code/issues/95367) [开放] 2.1.271 磁盘 Skills 全部加载失败** — 回归问题
    用户 `~/.claude/skills/` 与插件 Skills 均不注册，仅内置 Skills 可用，对 Skills 重度用户影响较大。

---

## 🔀 重要 PR 进展

1. **[#95409](https://github.com/anthropics/claude-code/pull/95409) [已合并] mods/agents-md：AGENTS.md 项目指令 mod**
   与今日版本发布呼应，将 agents-md mod 源码入库，按 sec-default/diff/telemetry 相同布局组织，支持 `instructionFiles` 选项，可用 `claude plugin test` 测试。

2. **[#95417](https://github.com/anthropics/claude-code/pull/95417) [已合并] agents-md mod 与引擎行为对齐**
   在 `--bare` 或禁用附件模式下，Read 不附加嵌套 AGENTS.md，确保 mod 与引擎内置行为完全一致。

3. **[#95488](https://github.com/anthropics/claude-code/pull/95488) [已合并] diff 面板打开前预读仓库，消除 "Loading diff" 状态**
   内置 diff 面板在打开前即完成数据加载，首屏直接呈现内容，体验优化。

4. **[#95476](https://github.com/anthropics/claude-code/pull/95476) [已合并] diff 面板自动打开逻辑收紧**
   仅在主循环发起编辑且开启 checkpointing 时自动打开 diff 面板；子代理编辑或关闭 checkpointing 时不再弹出。

5. **[#95423](https://github.com/anthropics/claude-code/pull/95423) [开放] diff mod 优化：只读 shell 命令后不再刷新 diff**
   `ls`、`git status`、`cat` 等只读命令后跳过 diff 重取，减少不必要的计算，与内置面板行为对齐。

6. **[#95198](https://github.com/anthropics/claude-code/pull/95198) [已合并] diff mod 类型修复**
   `openPane` 返回类型改为 `Promise<unknown>`，为 `$.ui.open` 返回更丰富结果对象做好编译兼容。

7. **[#94847](https://github.com/anthropics/claude-code/pull/94847) [开放] 首次编辑仅在 diff 面板有内容时打开**
   修复写入仓库外文件、ignored 文件或不同 worktree 时弹出空 diff 面板的问题。

8. **[#51452](https://github.com/anthropics/claude-code/pull/51452) [已关闭] README 重写**
   社区贡献：重写 README 以去除 AI 写作痕迹、修复 npm badge，提升文档质量。

---

## 📈 功能需求趋势

- **跨 Agent 标准兼容**：AGENTS.md 支持落地后，社区关注点转向 Bedrock/Vertex/Foundry 的跟进支持，以及与其他 Agent 工具的深度互操作
- **可扩展性（Mods / Hooks / Plugins）**：#91870 引领的函数级 Hook 体系是最活跃的开发方向，今日多个 mods PR 密集合入，生态雏形已现
- **多账号与配置切换**：桌面端多账号管理需求持续高涨（👍 814）
- **桌面端 Cowork / Routines / 远程控制**：Chat/Cowork 合并后的功能退化、iOS 远程同步、定时任务等成为新的问题高发区
- **沙箱与权限精细化**：excludedCommands 匹配语义、权限分类器误报（#95479）等反映社区对沙箱控制粒度的高要求

---

## ⚠️ 开发者关注点

1. **Windows 内存泄漏问题集中爆发**：#95489（fswatch 重试风暴，230 MB/min 泄漏）与 #94198（CoworkVMService NtFC 泄漏）同属内核非分页池问题，重启是唯一恢复手段，建议 Windows 用户关注 `CLAUDE_CODE_TMPDIR` 临时方案
2. **升级 2.1.277 需注意**：sandbox excludedCommands 的 glob 语义变化可能导致 `git -C` 等命令被误排除（#95455）
3. **会话数据完整性**：交错思考模式下助手文本静默丢失（#77651）、Skills 加载失败（#95367）等问题影响信任度
4. **代理/网关用户**：v2.1.276 已修复 400 错误，若仍停留在 2.1.275 请立即升级
5. **Issue 治理信任危机**：6 千+ 可复现 Issue 被自动关闭（#87647）引发社区对 Bug 追踪有效性的担忧

---
*本日报基于过去 24 小时 GitHub 公开数据自动整理，点击各条目链接可查看原始讨论。*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 · 2026-09-19

## 1. 今日速览

Codex CLI 发布稳定版 **rust-v0.155.1**，修复了新 TUI 会话默认携带 reasoning summary 导致部分 provider 拒绝请求的问题。Windows 平台仍是 bug 重灾区——Computer Use、沙箱初始化（"setup refresh had errors"）和桌面应用退出问题占据热点 Issue 榜首。PR 方向高度活跃，agent 控制架构重构（后端无关的 `AgentControl` 契约）、插件目录体系（Plugin Catalog）和 Windows 沙箱私有桌面强制化持续推进。

---

## 2. 版本发布

### rust-v0.155.1（稳定版）
- **修复**：新建本地 TUI 会话时默认不再发送 reasoning summaries，解决不支持该能力的 provider 拒绝请求的问题；用户显式配置的 reasoning-summary 设置仍被尊重（#46467）
- 完整变更：https://github.com/openai/codex/compare/rust-v0.155

### Alpha 版本（预发布通道）
- rust-v0.156.0-alpha.2 ~ alpha.5 持续迭代，0.156 版本正在密集验证中
- rust-v0.155.0-alpha.9.2 补充发布

---

## 3. 社区热点 Issues

**① #25178 — Windows Computer Use 截屏失败（69 评论 / 28 👍）**
Win10 22H2 上调用 `get_window_state` 请求截屏时，`SetIsBorderRequired` 报 0x80004002 接口不支持错误，Computer Use 完全无法截屏。运行时间近 4 个月仍未修复，是评论区最活跃的 Issue。
https://github.com/openai/codex/issues/25178

**② #24287 — Desktop 卡死在 Thinking 状态（32 评论）**
接受 prompt 后 UI 卡在 Thinking，Stop 按钮失效，重启后该轮对话甚至消失。涉及 app-server 会话管理，macOS Pro 用户报告。
https://github.com/openai/codex/issues/24287

**③ #17322 — Windows 关闭窗口后应用未完全退出（22 评论 / 19 👍）**
点 X 关窗后进程残留，且侧边栏 "New Chat" 存在点击热区（hit-testing）偏移问题。基础体验类 bug，点赞率高。
https://github.com/openai/codex/issues/17322

**④ #45119 — macOS 14.2 沙箱启动失败（21 评论）**
沙箱脚本引用未定义变量 `TIOCSTI`（该常量在旧版 macOS 不可用）导致启动即崩，确认上游 main 分支同样存在。
https://github.com/openai/codex/issues/45119

**⑤ #43596 — Windows Computer Use 无法访问原生应用（19 评论）**
应用清单为空、sky RPC 不可用，Computer Use 功能在 Windows 上形同虚设。
https://github.com/openai/codex/issues/43596

**⑥ #9252 — TUI 命令建议多余两个前导空格（17 评论 / 90 👍）**
小改动但 👍 全场最高，说明 TUI 细节体验是 CLI 用户的核心关切，社区对微小 UX 瑕疵容忍度低。
https://github.com/openai/codex/issues/9252

**⑦ #12840 — TUI 跟随系统自动切换亮/暗主题（16 评论）**
与 #45163（系统主题切换后输入框不可读，因调色板仅在启动时缓存）构成一组主题相关问题，反映 TUI 对动态系统环境的适配不足。
https://github.com/openai/codex/issues/12840

**⑧ #45835 — "Selected model is at capacity" 频繁出现（15 评论）**
连接正常却持续报模型容量满，Pro Lite 用户受影响，疑似限流/容量策略问题。
https://github.com/openai/codex/issues/45835

**⑨ #32477 — Windows 上 apply_patch 卡顿 40-60 秒（10 评论 / 6 👍）**
单行文件修改前出现超长延迟，跨多个 GPT-5.6 模型复现，是 CLI 性能类最严重的报告。
https://github.com/openai/codex/issues/32477

**⑩ #44364 — Windows Chrome 控制需 TUN 才能工作（10 评论）**
无 TUN 时浏览器控制失败，用户已验证 `cua_repl launch.mjs` 代理 workaround，诊断质量高，对 Windows 网络栈问题定位有价值。
https://github.com/openai/codex/issues/44364

**其他值得留意**：Windows 沙箱 "setup refresh had errors" 系列持续发酵（#44696、#42513、#44425），呈多 Issue 并发态势；语音功能 403 拒绝（#45752、#46537）和 MFA 后无法启用远程控制（#46449）是今日新增的认证类问题。

---

## 4. 重要 PR 进展

**① #46547 — 后端无关的 Agent 控制契约**
新增公开、object-safe 的 `AgentControl` trait，定义 agent 树的生命周期、消息传递、状态观察等契约，为本地/远程线程统一协调打基础。架构级变更。
https://github.com/openai/codex/pull/46547

**② #46558 / #46567 — 插件目录（Plugin Catalog）体系**
新增目录发现 API（快照、元数据、稳定标识、云/执行器来源），并将目录列表与包解析解耦。插件生态基础设施加速建设中。
https://github.com/openai/codex/pull/46558

**③ #46554 — Windows 旧沙箱强制使用私有桌面**
移除私有桌面的 opt-out 与 `windows.sandbox_private_desktop` 配置项，与沙箱安全模型收敛相关，可能缓解 #42513 等 helper 报错问题。
https://github.com/openai/codex/pull/46554

**④ #46562 — 登录/启动请求增加系统代理回退**
解决端点仅可通过系统代理访问时，云配置生效前的登录和企业配置引导失败问题。对企业用户（尤其国内网络环境）意义显著。
https://github.com/openai/codex/pull/46562

**⑤ #46561 — 支持显式 provider 模型目录 URL**
新增 `model_catalog_url` 配置，允许 provider 独立于推理端点提供模型元数据，利好第三方/自建 provider 集成。
https://github.com/openai/codex/pull/46561

**⑥ #46566 — 线程不可用时允许恢复命令**
修复线程不可用导致 slash 命令被阻断、用户无法开始/恢复会话的问题，直接关联 #24287 类卡死场景。
https://github.com/openai/codex/pull/46566

**⑦ #46552 / #46553 — Agent 完成路由与列表重构**
子 agent 终态交付迁入 agent controller，`list_agents` 返回结构化 `LiveAgent` 记录，多 agent 编排能力持续打磨。
https://github.com/openai/codex/pull/46552

**⑧ #46556 — 后台进程审批环境一致性**
后台进程可能超出所属 turn 生命周期，其审批现继承发起环境的文件系统限制，安全边界修复。
https://github.com/openai/codex/pull/46556

**⑨ #46555 — 连接刷新与恢复期间的 executor 注册追踪**
防止 executor 续期注册时因密钥相同被误判、导致会话被错误回收，稳定性修复。
https://github.com/openai/codex/pull/46555

**⑩ #46565 — TUI 保持 reasoning 摘要时序**
Reasoning 摘要在活动分组中保持与工具调用的原始顺序，改善 TUI 可读性。
https://github.com/openai/codex/pull/46565

**工程化**：#46551 新增 `build-codex-packages` 复合 Action 用于构建与冒烟测试 CLI/app-server 包，发布流程自动化在加强。

---

## 5. 功能需求趋势

| 方向 | 代表 Issue | 社区热度 |
|---|---|---|
| **Computer Use / 浏览器控制（Windows）** | #25178、#43596、#43373、#44364 | 🔥🔥🔥 最集中的痛点 |
| **沙箱稳定性（Windows/macOS）** | #45119、#27889、#34013、#44696 系列 | 🔥🔥🔥 多 Issue 并发 |
| **语音功能可用性** | #45752、#46537、#37619 | 🔥🔥 新增热点 |
| **TUI 打磨（主题/细节）** | #9252（90👍）、#12840、#45163 | 🔥🔥 点赞密度最高 |
| **性能（补丁应用/缓存）** | #32477、#42996 | 🔥🔥 |
| **配额/限流透明度** | #45835、#32540 | 🔥 |
| **认证/MFA/远程控制** | #46449、#46382 | 🔥 上升中 |

---

## 6. 开发者关注点

1. **Windows 平台质量欠账严重**：今日 30 个热点 Issue 中约 60% 带 `windows-os` 标签，集中在沙箱初始化失败（"setup refresh had errors"）、Computer Use 不可用、UAC 提权失败三个集群。好消息是 #46554（强制私有桌面）等 PR 显示官方正在收敛 Windows 沙箱实现。
2. **多 agent / 插件架构是主攻方向**：今日 PR 大量投向 `AgentControl` 契约、Plugin Catalog、executor 注册管理——Codex 正从单一 CLI 向可编排的 agent 平台演进，第三方集成者值得提前跟进这些 API。
3. **企业网络与自定义 provider 支持增强**：系统代理回退（#46562）与模型目录 URL（#46561）两个 PR 明显针对企业部署和 BYO-provider 场景。
4. **CLI 用户对微小体验瑕疵极度敏感**：两个前导空格的 Issue 拿到 90 👍，说明 TUI 核心用户群黏性高、反馈直接，细节打磨回报率高。
5. **认证/语音类问题抬头**：MFA 与远程控制冲突、Voice 403、Workspace 路由 432 等今日集中出现，建议关注后续是否有服务端变更公告。

---
*数据来源：github.com/openai/codex | 统计窗口：过去 24 小时*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 · 2026-09-19

## 1. 今日速览

Gemini CLI 发布 v0.62.0-nightly，重点修复了 Windows ConPTY 进程退出生命周期问题。社区方面，多智能体协作（对标 Claude Code Agent Teams）持续成为呼声最高的功能需求（44 👍），而 AST 感知工具的落地 PR（#29396）和持久化任务追踪系统（#29393）标志着 Agent 基础能力的重大升级。多个安全相关修复（MCP 策略绕过、shell 包装器解析）也在近期合并。

## 2. 版本发布

**v0.62.0-nightly.20260919.gcfbcaa8df**
- [PR #29383](https://github.com/google-gemini/gemini-cli/pull/29383) 版本号提升
- `fix(core)`: 同步 ConPTY 进程退出生命周期，加固 PTY 输出收尾处理（Windows 终端稳定性改进）

## 3. 社区热点 Issues

| Issue | 焦点 |
|---|---|
| [#19430](https://github.com/google-gemini/gemini-cli/issues/19430) | **多智能体协作/并行 Agent Teams**（对标 Claude Code）。呼声最高（44 👍、14 评论），长期 Stale 但热度不减，反映社区对多 Agent 编排的强烈需求 |
| [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) | **Subagent 达到 MAX_TURNS 后误报成功**。P1 bug，子代理被中断却报告 `GOAL success`，掩盖了任务失败，直接影响任务可靠性 |
| [#26390](https://github.com/google-gemini/gemini-cli/issues/26390) | **严重的“行动偏执”问题**：Agent 无视用户明确的 hold 指令和 GEMINI.md 约束，自主执行破坏性工具调用。与 #26767（源代码永久丢失）同类，安全性焦虑的核心 |
| [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) | **通用 agent 挂起**：简单操作（如建文件夹）挂起长达一小时，用户只能手动禁用子代理规避 |
| [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) | **AST 感知工具 EPIC**：评估 AST 级别的文件读取/搜索/代码库映射，减少误读和 token 浪费。对应 PR #29396 已落地 |
| [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) | **Agent 不主动使用 skills 和子代理**，即使任务高度相关也不调用，需显式指令触发 |
| [#29197](https://github.com/google-gemini/gemini-cli/issues/29197) | **TOML 命令多次权限确认陷入死循环**（已关闭，PR #29201 修复）。多 `!{}` 注入场景下即使选"always allow"也永不收敛 |
| [#26525](https://github.com/google-gemini/gemini-cli/issues/26525) | **Auto Memory 脱敏时机问题**：secret 脱敏发生在内容已进入模型上下文之后，且日志过度记录，存在隐私风险 |
| [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) | **工具数量 > 128 触发 400 错误**，Agent 缺乏工具作用域智能裁剪机制 |
| [#21335](https://github.com/google-gemini/gemini-cli/issues/21335) | **`/compress` 不持久化**：session resume 后压缩丢失，token 节省失效 |

## 4. 重要 PR 进展

| PR | 内容 |
|---|---|
| [#29396](https://github.com/google-gemini/gemini-cli/pull/29396) | **AST 感知结构化搜索工具 `ast_search`**（size/xl）：实现精确符号级导航，告别猜测行号/整文件读取，落地 #22745 |
| [#29393](https://github.com/google-gemini/gemini-cli/pull/29393) | **持久化文件级任务追踪（CRUD）**替代内存中的 WriteToDo 工具，解决 context rot 和高 token 成本 |
| [#29201](https://github.com/google-gemini/gemini-cli/pull/29201) ✅ | 修复 TOML 多命令权限确认死循环（#29197），权限批准在重试间持久保留 |
| [#29203](https://github.com/google-gemini/gemini-cli/pull/29203) ✅ | **安全修复**：`stripShellWrapper` 支持带额外 flag 的 shell 包装器（如 `bash -x -c`），堵住策略引擎绕过漏洞（#29202） |
| [#29200](https://github.com/google-gemini/gemini-cli/pull/29200) ✅ | **MCP 运行时策略统一执行**：显式空 allowlist 改为 fail-closed，服务器名匹配大小写不敏感 |
| [#29402](https://github.com/google-gemini/gemini-cli/pull/29402) | **PersistentState 原子写入**：temp 文件 + fsync + 原子 rename，防止中断保存损坏 `state.json` |
| [#29400](https://github.com/google-gemini/gemini-cli/pull/29400) | 修复 `-r` 恢复 session 时 `functionResponse` 重复回放问题 |
| [#29368](https://github.com/google-gemini/gemini-cli/pull/29368) | **ACP 修复**：按 ID 加载 session，即使无 resumable 内容也能正确恢复 |
| [#29401](https://github.com/google-gemini/gemini-cli/pull/29401) | 修复 esbuild 打包中 proxy-agent CJS/ESM 互操作问题，保证环境代理解析一致 |
| [#29217](https://github.com/google-gemini/gemini-cli/pull/29217) ✅ | 修复显式指定 `gemini-2.5-flash` 被静默改写为 3.5 Flash 的模型选择劫持问题 |

## 5. 功能需求趋势

1. **多智能体协作**：并行 Agent Teams、子代理调度与编排是社区第一诉求（#19430），子代理可靠性（挂起、误报成功、上下文缺失）是配套痛点
2. **代码结构感知能力**：AST 级搜索/读取/代码库映射（#22745、#22746），PR #29396 已在落地
3. **安全与可控性**：破坏性行为防护（#26390、#26767、#22672）、Auto Memory 脱敏（#26525）、MCP 策略一致性
4. **记忆系统完善**：Auto Memory 的重试策略、无效 patch 隔离、日志控制等一揽子改进（#26516 系列）
5. **Session 与上下文管理**：压缩持久化（#21335）、resume 去重、轨迹分享（#22598）

## 6. 开发者关注点

- **子代理可靠性不足**：挂起（#21409）、误报成功（#22323）、不主动调用（#21968）、bug report 缺上下文（#21763）——子代理是目前故障率最高的子系统
- **破坏性操作风险**：多起源码永久丢失/误删报告，“行动偏执”与用户约束不匹配是信任危机的核心，社区期待默认安全护栏
- **Token 与上下文经济性**：工具过多导致 400 错误、临时脚本污染工作区（#23571）、任务追踪吃 context（#29393 正在解决）
- **平台兼容性**：Windows ConPTY（本次 nightly 已修）、Wayland 下 browser agent 失败（#21983）、终端 resize 闪烁（#21924）仍有长尾问题
- **配置一致性**：Browser Agent 无视 `settings.json` 覆盖（#22267）、显式模型选择被改写（#29217 已修），配置优先级需要更严格的测试覆盖

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-09-19** | 数据来源：github.com/github/copilot-cli

---

## 📌 今日速览

Copilot CLI 发布 v1.0.87-0，引入 Auto routing 层的组织级 startup 默认值与策略控制，以及连续 steering 提示合并编辑能力。社区方面，**MCP 生态问题持续发酵**——Figma MCP 连接失败、OAuth DCR 注册被拒等问题集中涌现（#4870、#4906、#4901）。此外今日新增多个会话管理相关 bug 报告（#4903、#4904、#4907），会话/子会话可靠性成为近期热点。

---

## 🚀 版本发布

### v1.0.87-0
- **Auto routing 层新增用户级与托管级 startup 默认值**，支持严格模式及用户可覆盖的组织策略
- **连续 steering 提示合并**：同模式下连续提示合并为一条待处理消息，空输入框按 `↑` 可取回编辑（包括粘贴的文本）

---

## 🔥 社区热点 Issues（精选 10 条）

1. **[#1632](https://github.com/github/copilot-cli/issues/1632)**（CLOSED）[plugins] 支持 skills 子文件夹组织
   👍 24 | 💬 12 — 社区呼声极高的组织能力需求，用户已有 10+ skills 但被限制为扁平结构，已关闭，值得关注是否已落地。

2. **[#1285](https://github.com/github/copilot-cli/issues/1285)**（OPEN）[agents/enterprise] 组织级 Agent 不显示
   👍 13 | 💬 10 — 企业用户在 `.github-private` 中配置的 Agent 无法在 CLI/VS Code 中出现，影响企业级采用。

3. **[#4870](https://github.com/github/copilot-cli/issues/4870)**（OPEN）Figma MCP 远程服务器加载失败，`-32601` 被当作致命错误
   👍 11 | 💬 6 — CLI 对 `server/discover` 错误码处理过严，导致 VS Code 可用的 Figma MCP 在 CLI 中完全不可用。

4. **[#4905](https://github.com/github/copilot-cli/issues/4905)**（OPEN）桌面版会话数分钟后死亡："credential registration no longer available"
   💬 3 — 桌面 app 1.1.22 中 github-mcp-server catalog 变 stale 且 fatal，属于较严重的产品级 bug。

5. **[#4765](https://github.com/github/copilot-cli/issues/4765)**（OPEN）非 repo 根目录下配置文件（.mcp.json、hooks）读取失败
   💬 4 — 多 repo workspace 场景下的配置发现缺陷，影响常见工作目录布局。

6. **[#4900](https://github.com/github/copilot-cli/issues/4900)**（OPEN）并发会话退出时互相覆盖 config.json，trustedFolders 丢失
   💬 1 — 配置写入无合并机制，多会话用户数据丢失，工程上典型的 last-write-wins 问题。

7. **[#4822](https://github.com/github/copilot-cli/issues/4822)**（OPEN）AGENTS.md 发现逻辑跟随 symlink 并遍历所有祖先目录
   💬 1 — 导入无关 repo 的指令文件，dotfiles 为 git repo 的用户尤其受影响，涉及上下文污染。

8. **[#4906](https://github.com/github/copilot-cli/issues/4906)**（OPEN）MCP OAuth DCR 的 client_name "copilot-cli" 被 Figma 白名单 403 拒绝
   新增 — 与 #4870、#4901 共同构成今日 MCP/OAuth 问题群，DCR 注册标识不合规。

9. **[#4902](https://github.com/github/copilot-cli/issues/4902)**（OPEN）`-p` 值以 `-` 开头被误解析为 flag（1.0.85 回归）
   新增 — 以 YAML frontmatter 开头的 prompt 全部报错，且报错信息误导用户“未加引号”。

10. **[#4698](https://github.com/github/copilot-cli/issues/4698)**（CLOSED）/compact 压缩失败："received empty response from model"
    💬 1 — 长会话管理核心功能失效，已关闭，可关注修复版本。

---

## 🔀 重要 PR 进展

过去 24 小时内无 PR 更新（0 条），本节省略。部分 Issue 关闭（如 #1632、#4698）可能对应已合入主干但未在此窗口内活跃的变更。

---

## 📈 功能需求趋势

1. **MCP 生态兼容性**（最高热度）：Figma、Atlassian 等主流 MCP server 的连接、OAuth、错误处理问题密集出现（#4870、#4901、#4906、#4907）
2. **Skills/Plugins 组织能力**：子文件夹支持（#1632）、`--plugin-dir` 技能可见性（#4886）
3. **模型选择控制**：默认模型持久化（#1824）、Rubber Duck 指定模型（#3480）
4. **会话管理可靠性**：分支型会话元数据、子会话状态同步、sidebar 排序（#4903、#4904）
5. **企业级能力**：组织级 Agent 分发与策略管理（#1285、v1.0.87-0 的新策略功能）

---

## 🛠️ 开发者关注点（痛点总结）

- **MCP 是当前最大痛点**：错误分类过严（-32601 视为 fatal）、DCR client_name 不合规、重连通知刷屏、OAuth redirect_uri 注册失败——CLI 的 MCP 实现与生态实际兼容性差距明显
- **配置与状态管理脆弱**：并发会话覆盖 config.json、非 repo 根目录配置不生效、AGENTS.md 越界发现
- **回归质量**：1.0.85 引入的 `-p` 参数解析回归说明发布前测试覆盖有盲区
- **平台差异体验**：Windows 的 PowerShell 强制（#1086）、Ctrl+Backspace 失效（#3858）持续困扰用户
- **长会话体验**：/compact 失败、MCP 生命周期消息污染对话历史、会话 sidebar 被批量刷新

> 💡 建议：MCP 兼容性问题已形成集群效应，建议官方优先发布修复批次；企业用户可关注 v1.0.87-0 的组织策略新能力。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报
**日期：2026-09-19** | 数据来源：[MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)

---

## 📌 今日速览

过去 24 小时无新版本发布。社区最值得关注的是 **2.0.0 版本 macOS 粘贴图片偶发静默失败的回归 Bug**（#2652），系从 0.43.x Python 版迁移至 darwin-arm64 单文件版后出现。同时，长期维护中的 **Hooks 文本提取修复 PR #2176** 持续推进，将解决 `UserPromptSubmit` hook 在多模态输入下失效的问题。此外，多个历史 Issue 集中被关闭，显示团队正在批量清理积压问题。

---

## 🚀 版本发布

过去 24 小时无新 Release。

---

## 🔥 社区热点 Issues（10 条精选）

1. **[#2652] macOS 2.0.0 粘贴图片偶发静默失败（0.43.x 回归）** `OPEN`
   今日新增的高优先级 Bug。剪贴板有图片时 `Ctrl+V` 偶发完全无反应，无占位符也无报错，疑似 2.0.0 架构迁移（Python → 单文件二进制）引入的回归，影响多模态工作流。
   👉 https://github.com/MoonshotAI/kimi-cli/issues/2652

2. **[#1234] 环境变量代理因 aiohttp 默认设置失效（`kimi login`）** `CLOSED`
   企业/受限网络环境的高频痛点，14 条评论、2 👍，讨论充分后关闭，代理配置问题应已解决。
   👉 https://github.com/MoonshotAI/kimi-cli/issues/1234

3. **[#1680] VSCode 插件独立调节 kimi 窗口字体大小** `OPEN`
   中文社区活跃的功能请求（2 👍）。用户希望仿照 CodeGeeX 支持 kimi 面板字体独立调节，避免整体缩放影响其他窗口布局，反映 IDE 集成体验的细节诉求。
   👉 https://github.com/MoonshotAI/kimi-cli/issues/1680

4. **[#1107] 安装 sh 脚本 Bug（未安装 uv 场景）** `CLOSED`
   `curl -LsSf https://code.kimi.com/install.sh` 在无 uv 环境下出错，直接影响新用户首次安装体验，已修复关闭。
   👉 https://github.com/MoonshotAI/kimi-cli/issues/1107

5. **[#1459] Kimi 不会配置自己（MCP 配置混乱）** `CLOSED`
   有趣的自指问题：让 Kimi 配置 MCP 时，配置位置（config.toml vs 其他路径）经常出错，暴露出配置体系文档与自我认知不足的问题。
   👉 https://github.com/MoonshotAI/kimi-cli/issues/1459

6. **[#1342] 支持 OSC 9/777 终端任务完成通知** `CLOSED`
   请求在任务完成时发送 OSC 转义序列，使 iTerm2、kitty、WezTerm 等终端可弹桌面通知。对长任务无人值守场景价值高，已关闭。
   👉 https://github.com/MoonshotAI/kimi-cli/issues/1342

7. **[#734] Google GenAI provider 对含 `$schema` 的工具参数报 extra_forbidden** `CLOSED`
   使用第三方 provider（gemini-3-pro-preview）+ Exa MCP 时的兼容性问题，反映社区对多模型后端支持的依赖。
   👉 https://github.com/MoonshotAI/kimi-cli/issues/734

8. **[#1296] MCP 断连引发的间歇性报错** `CLOSED`
   Windows 环境下 MCP 连接不稳定时弹出错误，涉及错误处理健壮性，已修复。
   👉 https://github.com/MoonshotAI/kimi-cli/issues/1296

9. **[#1291] Stdin Prompt 中非法 Markdown 导致崩溃** `CLOSED`
   非交互管道场景下格式异常输入直接崩溃 CLI，属稳定性问题，已关闭。
   👉 https://github.com/MoonshotAI/kimi-cli/issues/1291

10. **[#1480] flow:skill 交互模式下流程无法中断或选择** `CLOSED`
    Skills 工作流在交互模式下失控的问题（1 👍），影响 Agent 流程可控性，已修复。
    👉 https://github.com/MoonshotAI/kimi-cli/issues/1480

*其他被关闭的历史 Issue：#1301（ghostty 主题下 yolo 标识难辨认）、#1302（Web UI 路径视图与 diff 重叠）、#1339（@ 文件提及列出 .git/objects 内部文件）。*

---

## 🔧 重要 PR 进展

> 过去 24 小时仅 1 条 PR 更新，今日重点如下：

1. **[#2176] fix(hooks): extract text from ContentPart for UserPromptSubmit hook** `OPEN`
   解决 #2148：当用户输入为 `list[ContentPart]`（新版默认消息格式）时，`UserPromptSubmit` hook 收到空 `prompt` 与 `matcher_value`，导致正则 matcher 完全失效。该 PR 补齐了非字符串类型的文本提取逻辑，对 Hooks 生态的可用性至关重要。自 5 月提交以来持续更新，值得 Hooks 用户关注。
   👉 https://github.com/MoonshotAI/kimi-cli/pull/2176

---

## 📈 功能需求趋势

从近期 Issue 分布可提炼以下方向：

- **架构迁移稳定性**：2.0.0 单文件二进制版成为回归问题新来源（#2652），版本切换期的质量保障是当前焦点。
- **IDE 集成体验打磨**：VSCode 插件的 UI 自定义（字体、布局）诉求明确（#1680、#1302）。
- **终端生态兼容**：主题适配（#1301）、OSC 桌面通知（#1342）等终端深度集成需求活跃。
- **MCP 生态健壮性**：连接稳定性（#1296）、第三方 MCP 工具参数兼容（#734）、配置易用性（#1459）持续被提及。
- **多 Provider 支持**：Google GenAI 等第三方模型接入的兼容性仍是社区关注点（#734）。
- **安装与网络环境**：安装脚本健壮性（#1107）与企业代理环境（#1234）影响首触体验。

---

## ⚠️ 开发者关注点

1. **2.0.0 回归风险**：从 Python 版升级到单文件版的用户应留意图片粘贴等功能异常（#2652），建议保留回退方案。
2. **Hooks 生态可用性**：多模态输入下 hook 失效是系统性问题（#2176），依赖 Hooks 的自动化流程需验证。
3. **企业网络环境**：aiohttp 默认代理行为曾导致登录失败（#1234），受限网络用户需确认已使用新版。
4. **无人值守场景**：长任务的完成通知（#1342）与流程中断控制（#1480）是自动化工作流的高频痛点。
5. **配置体系复杂度**：MCP/配置文件位置混乱（#1459）提示官方文档与默认行为需进一步清晰化。

---
*本报告基于 GitHub 公开数据自动生成，仅反映过去 24 小时社区动态。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-09-19）

## 📰 今日速览

今日社区最大热点是 **OpenCode Zen 免费层大面积故障**——大量用户报告 "free tier can only be used from within OpenCode" 错误，相关 Issue 短短两天内涌现十余个，疑似与 User-Agent 转发/客户端识别机制有关。与此同时，维护者 @Hona 提交了一系列高质量的桌面端启动性能优化 PR（V8 代码缓存、asar 瘦身、延迟加载等），启动体验显著改善可期。CPU 占用过高问题（#30086）持续发酵，评论已达 54 条。

---

## 🐛 社区热点 Issues

### 1. 免费层故障（今日最热事件）
**#49433** [OPEN] Error from provider (Console): OpenCode's free tier can only be used from within OpenCode
- 43 条评论、8 👍，影响所有模型的免费层请求。后续 #49580、#49588、#49678、#49680、#49736、#49698、#49858 均为同一故障的重复报告，波及官方 Desktop、CLI、第三方前端（MonoCode、Pi Agent）。
- 关键线索：**#49756** 指出 `opencode serve` 未向 Zen API 转发 `User-Agent` 头，可能是根因；**#49723** 报告内置 explore 子代理也复现，而 general agent 正常。
- 社区情绪偏负面，#49858 直接引用官方 "no lock-in" 文档质疑宣传与实现不符。
- 链接：https://github.com/anomalyco/opencode/issues/49433

### 2. #30086 [OPEN] 新版本 CPU 占用飙升
54 条评论、30 👍。用户从可同时开 10+ 会话退化为 3 个都卡，鼠标都卡顿。与 #26416（macOS 空闲高 CPU，5 👍）相互印证，是长期未解的性能痛点。
链接：https://github.com/anomalyco/opencode/issues/30086

### 3. #45417 [OPEN] 会话成本统计遗漏子代理开销
11 👍。多子代理工作流下，TUI/`/export` 显示的费用远低于实际账单。对重度用户是真实的成本透明度问题。
链接：https://github.com/anomalyco/opencode/issues/45417

### 4. #49014 [OPEN] Go 5 小时限额“连坐”封锁所有模型
一个模型触达限额后，其他零用量的 Go 模型也全部报同样错误，无法通过切换模型规避。
链接：https://github.com/anomalyco/opencode/issues/49014

### 5. #46692 [OPEN] [2.0] chunkTimeout/timeout 配置被静默忽略
v2 `packages/llm` 原生路径完全不读取这两个配置，导致无任何客户端侧卡顿保护。与 #48675（headless 流式零 chunk 卡死无超时、无退出）是同一类问题，对 CI/自动化场景影响大。
链接：https://github.com/anomalyco/opencode/issues/46692

### 6. #49777 [OPEN] `/btw` 命令渲染时崩溃 TUI
内置命令在答案对话框中越界访问 `PluginProvider` 导致崩溃（v2.0.8）。
链接：https://github.com/anomalyco/opencode/issues/49777

### 7. #49800 [OPEN] Zen 流式输出 token 合并错乱
`big-pickle` 模型输出出现相邻请求内容“粘串”（如 `GPU is freecars`）、重复发射、非 ASCII 泄漏——疑似网关串流隔离问题，值得官方优先排查。
链接：https://github.com/anomalyco/opencode/issues/49800

### 8. #48747 [OPEN] Windows + AMD 显卡启动崩溃
GPU 进程反复崩溃（exitCode -2147483645）连带渲染进程挂掉，属于环境兼容性硬阻断。
链接：https://github.com/anomalyco/opencode/issues/48747

### 9. #49027 [OPEN] Agent 配置多余字段原样透传上游导致 invalid_request_error
自定义 vendor 属性未过滤，直接打进 provider 请求。影响所有自定义 agent 配置用户。
链接：https://github.com/anomalyco/opencode/issues/49027

### 10. #47480 [OPEN] 自定义 provider 模型粘贴图片被静默替换为占位符
`attachment` 能力默认 `false`，即使上游模型支持视觉也不提醒。图片工作流用户的隐性行为陷阱。
链接：https://github.com/anomalyco/opencode/issues/47480

**其他值得关注**：#35870（headless 间歇性启动挂起）、#46455（Copilot 连接后无模型）、#44055（TUI resize 监听器内存泄漏）、#49852（npm 子路径插件安装解析错误）、#12393（桌面端会话归档恢复，35 👍 已关闭）。

---

## 🔧 重要 PR 进展

@Hona 今日集中提交了一波桌面端启动性能优化（多数已合并）：

1. **#49869** [已关闭] Electron ready 即显示首窗口——原先启动后有约 900ms 空白，通过解除主 bundle 加载与窗口创建的串行依赖解决。
   https://github.com/anomalyco/opencode/pull/49869
2. **#49767** [已关闭] 为 `oc://renderer/` 启用 V8 代码缓存，避免每次启动重新编译整个 bundle（省约 191ms）。
   https://github.com/anomalyco/opencode/pull/49767
3. **#49772** [已关闭] asar 中剔除声明文件与 source map，头索引从 2.9MB/12,377 条瘦身，主进程解析省约 50ms。
   https://github.com/anomalyco/opencode/pull/49772
4. **#49786** [已关闭] TypeScript 编译器延迟到首次 transpile 才加载——原先每个 CLI/TUI 进程启动都要加载约 11MiB 的编译器（直击 CPU/启动痛点）。
   https://github.com/anomalyco/opencode/pull/49786
5. **#49789** [已关闭] node-pty 原生模块延迟到交互式 WSL 安装时才加载，移出启动关键路径。
   https://github.com/anomalyco/opencode/pull/49789
6. **#49763** [已关闭] 先创建窗口再连接后台服务，渲染器不再等待 CLI service 握手。
   https://github.com/anomalyco/opencode/pull/49763
7. **#49872** [OPEN] 在入口模块埋设 4 个启动时间戳，为性能基准提供分阶段数据。
   https://github.com/anomalyco/opencode/pull/49872
8. **#49876** [OPEN] 移除 luxon（占渲染器 main chunk 68KB），三处日期操作改用原生实现。
   https://github.com/anomalyco/opencode/pull/49876
9. **#49873** [已关闭，agent 提交] Console 配置刷新失败时保留上一次成功快照，避免瞬时错误导致 provider 被清空重建（与今日免费层故障相关度高）。
   https://github.com/anomalyco/opencode/pull/49873
10. **#49875** [OPEN] 修复 `opencode://new-session` 深度链接在新布局下失效的问题（修复 #44160、#35225，取代 #49657）。
    https://github.com/anomalyco/opencode/pull/49875

其他：#49874（官网安装链接切至 v2 分支）、#49877（明确 `tabs.open` focus 参数语义）、#49871（技能指引说明用户显式调用场景，避免模型重复加载 skill）、#49870（codemode 移除 TS 剥离，直接以 Acorn 解析 JS）。

---

## 📈 功能需求趋势

1. **稳定性与可用性**：免费层故障、流式卡死、启动挂起、TUI 崩溃等基础可靠性问题集中爆发，是当前最大诉求。
2. **成本透明度**：子代理费用统计（#45417）、限额“连坐”（#49014）反映重度用户对计费/额度可见性的强需求。
3. **超时与自动化健壮性**：headless/CI 场景下的超时、重试、退出机制（#46692、#48675、#35870）是 v2 需补齐的短板。
4. **多前端/开放生态**：第三方前端（MonoCode、Pi Agent）用户期望 Zen 免费层真正兑现 "no lock-in" 承诺（#49858）。
5. **桌面端性能**：@Hona 的系列 PR 显示官方正系统性地优化桌面启动路径，与用户侧 CPU 投诉形成呼应。

## ⚠️ 开发者关注点

- **紧急**：Zen 免费层故障影响面最大，根因很可能在客户端识别（User-Agent 转发）逻辑，建议官方尽快发布公告并标记重复 Issue。
- **性能焦虑未消**：CPU 占用问题（#30086/#26416）长期开放且评论持续增长，尽管启动优化 PR 密集落地，空闲 CPU 问题仍待专门修复。
- **v2 迁移阵痛**：超时配置失效、子代理权限异常、事件监听泄漏等多个问题集中在 v2/2.0.x 路径，升级用户需留意。
- **静默失败模式**：图片占位符、超时配置忽略、多余字段透传等多个 Issue 共同指向“配置不生效且无告警”这类体验陷阱，值得在错误提示层面统一改进。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 · 2026-09-19

## 1. 今日速览

Qwen Code 发布 **v0.24.1-preview.0** 预览版，主要聚焦 CI 稳定性与 ACP 边界验收文档。Issue 社区讨论热度集中在 **LSP 非静默失败**、**macOS Web Terminal PTY 打包**、**v0.24.0 /cd 回归** 三个 P1 级问题上。PR 侧动作活跃，多项修复直指近期高热 Issue（node-pty 打包、node-repl 快照注入、/cd 空闲守卫）。

## 2. 版本发布

### [v0.24.1-preview.0](https://github.com/QwenLM/qwen-code/releases)
- **docs(serve)**: 记录已合并的 ACP 边界验收（PR #12024，@wenshao）
- **fix(ci)**: 打包前等待导出渲染器发布完成，修复发布流水线时序问题

同日另有 nightly 构建 `v0.24.0-nightly.20260918.537311b8a5`，内容与上述一致。

## 3. 社区热点 Issues（Top 10）

1. **[#11872](https://github.com/QwenLM/qwen-code/issues/11872) Web Terminal 报 "PTY not available"（P1，10 评论）**
   `@lydell/node-pty` 已声明但未打包进产物，且 macOS 代码签名阻止本地预编译二进制加载，Web 终端完全不可用。对应修复 PR #12225 已在今天提交，是当前最热的桌面端阻塞问题。

2. **[#12224](https://github.com/QwenLM/qwen-code/issues/12224) v0.24.0 后 /cd 无法切换目录（P1，5 评论）**
   升级 0.24.0 后 `/cd` 报"response or tool call is in progress"，即使无活跃会话也失败——新版引入的高优先级回归，PR #12227 疑似针对相关空闲状态判定。

3. **[#12206](https://github.com/QwenLM/qwen-code/issues/12206) LSP 静默丢弃非 ASCII 响应（P1，4 评论）**
   `Content-Length` 按 UTF-16 字符串长度与字节数错比，导致含中文等 CJK 字符的 LSP 响应（如中文标题的 documentSymbol）静默返回空结果。对中文开发者影响直接，修复价值高。

4. **[#11783](https://github.com/QwenLM/qwen-code/issues/11783) 后台任务注册后 TUI 崩溃（P1，5 评论）**
   注册后台 shell 任务数秒后触发 React #185（Maximum update depth exceeded），整个 TUI 进程死亡。

5. **[#12053](https://github.com/QwenLM/qwen-code/issues/12053) 精简 Goal 运行时（P2，8 评论）**
   社区实测两场 `/goal-draft` 会话在单轮约 100 次工具调用内即完成目标，提议砍掉 evidence catalog 与 checkpoints 机制。是 Goal 架构演进的核心讨论帖。

6. **[#12165](https://github.com/QwenLM/qwen-code/issues/12165) MCP OAuth 丢失 registrationUrl（P2，4 评论）**
   WWW-Authenticate 发现阶段丢弃 `registrationUrl`，导致 Atlassian 远程 MCP 完全无法完成 OAuth 认证，集成生态的硬阻塞。

7. **[#12216](https://github.com/QwenLM/qwen-code/issues/12216) ACP 进程重复启动两套 LSP 服务（P2，3 评论）**
   `qwen serve` 为每个 ACP 子进程注入 `--experimental-lsp`，叠加 MCP workspace 发现配置后产生冗余 LSP 服务器集，浪费资源。

8. **[#12220](https://github.com/QwenLM/qwen-code/issues/12220) LSP 服务器失败被报告为“无结果”（P2，3 评论）**
   每服务器的请求错误被 catch 后吞掉返回空数组，用户无法区分“服务器挂了”和“真的没命中”。与 #12206 共同构成 LSP 可观测性改造诉求。

9. **[#12042](https://github.com/QwenLM/qwen-code/issues/12042) provenance 字段在投影中丢失（P2，5 评论）**
   PR #12007 后仍有两类通知形态被误分类，根因是 `provenance` 字段未在 api-history 投影中保留，属于会话管理核心数据链路问题。

10. **[#12226](https://github.com/QwenLM/qwen-code/issues/12226) 文件系统作用域的权限体系（P3，3 评论）**
    提议按文件系统范围分层评估权限规则、支持集中管理的仓库级规则，与昨日关闭的 #12223 一脉相承——企业/团队部署场景的权限治理需求在持续升温。

## 4. 重要 PR 进展（Top 10）

1. **[#12225](https://github.com/QwenLM/qwen-code/pull/12225) Desktop 运行时打包 node-pty 预编译产物**
   将 `@lydell/node-pty` 包装器及目标 prebuild 包注入 Desktop 运行时，附带真实 PTY spawn 冒烟测试。直接修复今日最热 P1 Issue #11872。

2. **[#12227](https://github.com/QwenLM/qwen-code/pull/12227) 本地斜杠命令分发期间保持空闲状态**
   命令解析期间维持 idle 状态以通过 idle-only 守卫，与 #12224 的 `/cd` 回归高度相关，含回归测试。

3. **[#12168](https://github.com/QwenLM/qwen-code/pull/12168) node-repl 快照注入加语句终结符**
   修复单元格末尾语句缺少分号时注入的快照提交产生内部 SyntaxError 的问题（Issue #12167）。

4. **[#12119](https://github.com/QwenLM/qwen-code/pull/12119) /context 分类汇总对齐 provider 总数**
   重构 `/context` 明细使其按内容分区并精确等于 provider 报告的总 token，呼应 #12028 非对话上下文治理跟踪帖。

5. **[#12198](https://github.com/QwenLM/qwen-code/pull/12198) 未决信任工作区默认视为不可信**
   启用文件夹信任后，无信任决定的工作区在 CLI 与 daemon 快启路径均以不可信启动，禁用项目级设置/环境/hooks，安全加固。

6. **[#12156](https://github.com/QwenLM/qwen-code/pull/12156) 限制大型扫描中 gitignore matcher 保留**
   避免大目录扫描时每个目录都保留一份编译后的 gitignore 规则，内存优化。

7. **[#12115](https://github.com/QwenLM/qwen-code/pull/12115) Linux 独立安装包 glibc 预检**
   CentOS 7 等旧发行版上，安装前先检测 glibc 兼容性，避免装完才发现 Node 22 运行时无法启动。

8. **[#11854](https://github.com/QwenLM/qwen-code/pull/11854) 混合代码模式**
   对齐 Codex 的 `tools.mode` 枚举，`code_mode` 下普通工具直接可调用的同时暴露隔离的 `exec` JS 工具。

9. **[#12085](https://github.com/QwenLM/qwen-code/pull/12085) Web Shell 恢复远程工作区连接流程**
   Codex 风格远程连接：Settings > Connections 管理已验证的 daemon 源，bearer token 保持 tab 级作用域。

10. **[#11859](https://github.com/QwenLM/qwen-code/pull/11859) 全面切换 pnpm 并退役 package-lock.json**
    CI 与发布统一使用固定版本 pnpm，确保发布产物与 CI 测试的依赖图一致。

## 5. 功能需求趋势

- **会话管理与恢复健壮性**：session writer 锁机制（#12212/#12213/#12214）、Web Shell 恢复误报（#11995）、非优雅关停恢复文档——daemon 多进程场景的可靠性是持续热点。
- **上下文/token 治理**：#12028 提出非对话上下文（系统提示词、工具 schema、QWEN.md、skill 列表）每次请求都全量计费的治理路线，#12119/#12119 的 /context 精确化是配套动作。
- **权限与信任模型分层**：#12223/#12226/#12198 表明社区需要按文件系统作用域、项目级覆盖用户级的细粒度权限体系。
- **LSP 质量与可观测性**：#12206/#12216/#12220 密集出现，LSP 从“能用”走向“可诊断”。
- **架构精简（Goal slimming）**：#12053/#12179 显示团队在主动给 Goal 运行时做减法，去除证据目录与检查点。
- **集成生态**：ACP/Zed 体验（#11361）、远程 MCP OAuth（#12165）、远程工作区连接（PR #12085）持续迭代。

## 6. 开发者关注点

- **v0.24.0 升级回归是当前最大痛点**：/cd 失效（#12224）、ACP/LSP 双服务器（#12216）等升级后立即暴露的问题，建议关注即将到来的 0.24.1 正式版。
- **中文/非 ASCII 场景仍易踩坑**：LSP CJK 响应静默丢弃（#12206）、session recap 强制英文（#11847），国际化细节是高频反馈。
- **错误可观测性不足**：LSP 错误吞为空数组（#12220）、node-repl 报内部标识符名（#12167）、session writer 所有失败共用一个 errorKind（#12212）——用户普遍反映“坏了但不知道为什么坏”。
- **打包/分发链路脆弱**：node-pty 未打包（#11872）、旧 glibc Linux 安装失败（PR #12115）、CI 发布时序问题（本次 release 修复），桌面与独立分发质量是薄弱环节。
- **企业部署需求抬头**：部署托管扩展目录（#12147）、集中管理仓库权限规则（#12226）表明 Qwen Code 正被更多团队场景采用。

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*