# AI CLI 工具社区动态日报 2026-09-13

> 生成时间: 2026-09-12 22:15 UTC | 覆盖工具: 7 个

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

**数据日期：2026-09-13** ｜ 覆盖 7 款工具：Claude Code / OpenAI Codex / Gemini CLI / GitHub Copilot CLI / Kimi Code CLI / OpenCode / Qwen Code

---

## 一、生态全景

AI CLI 工具已整体从「功能扩张期」进入「深化打磨期」：今日七款工具的动态几乎全部围绕稳定性修复、安全加固和计量准确性，而非新增核心能力。**成本可观测性成为跨社区的第一痛点**——prompt cache 失效、配额计量失真、子代理叠加消耗在至少四个社区同日爆发，且多与模型代际切换（Opus 4.7→4.8、Sol→Astra）相关。多 Agent 协作是公认的演进方向，但会话生命周期管理、子代理可靠性、跨端控制等基础设施缺陷正在集中暴露。值得注意的是，开源生态在安全与架构创新上推进更快，而商业化工具则在配额治理与插件基础设施上深入。

---

## 二、各工具活跃度对比

| 工具 | Issue 动态 | PR 动态 | Release | 今日核心事件 |
|---|---|---|---|---|
| **Claude Code** | ~50 条更新（多数被 stale 批量关闭） | 2 条 | ✅ v2.1.270 | 回归修复；stale 机器人争议 |
| **OpenAI Codex** | 单 Issue 最高 42 评论 | **15+ 条合并**（全工具最多） | ❌ 无 | GPT-6 Astra 配额消耗集中爆发 |
| **Gemini CLI** | ~50 条活跃 | ~10 条实质进展 | ✅ v0.61.0-nightly | 安全加固版（注入防护 + 沙箱） |
| **Copilot CLI** | 7 条（4 新增） | 3 条（均为 CI 维护） | ❌ 无 | Linux 堆内存溢出持续发酵 |
| **Kimi CLI** | 3 条 | 0 条 | ❌ 无 | 低活跃日 |
| **OpenCode** | 10+ 热点（剪贴板集群累计 240+ 评论） | 10 条（**全部为机器人批量关闭**） | ❌ 无 | 剪贴板系统性问题 + V2 迁移阵痛 |
| **Qwen Code** | 10+ 热点 | 4+ 条实质合并 | ✅ v0.23.3-nightly | TUI 崩溃当日修复 + 架构级路线图 |

> ⚠️ 注：各日报统计口径略有差异，以上为方向性对比而非精确度量。

---

## 三、共同关注的功能方向

### 1. 成本透明与计量准确性（5/7 工具，最普遍痛点）
- **Claude Code** #63930：并行工具调用后 cache

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

**数据来源**：github.com/anthropics/skills | 数据截止：2026-09-13
**说明**：PR 评论数字段缺失，排行综合关联 Issue 热度（评论/👍）、更新活跃度与主题影响力推断；所列 PR 状态均为 OPEN。

---

## 一、热门 Skills 排行（Top 8）

| # | Skill / PR | 功能与讨论热点 | 状态 |
|---|---|---|---|
| 1 | **skill-creator 评估链路修复** [#1298](https://github.com/anthropics/skills/pull/1298) | 修复 `run_eval.py` 恒报 0% recall 的核心缺陷，关联 Issue [#556](https://github.com/anthropics/skills/issues/556)（12 评论、10+ 独立复现），同时覆盖 Windows 流读取、触发检测与并行 worker。描述优化循环此前一直在"对噪声优化"，属基础设施级修复 | OPEN，2026-09-12 仍活跃 |
| 2 | **document-typography 排版质控** [#514](https://github.com/anthropics/skills/pull/514) | 解决 AI 生成文档的孤行、寡段、编号错位等普遍排版问题。定位独特："用户不会主动要求、但每份文档都受影响"的隐性质量需求 | OPEN（挂起 6 个月） |
| 3 | **Hivemind 多智能体编排** [#1628](https://github.com/anthropics/skills/pull/1628) | Claude Code 仅做规划/审查/合并，机械劳动委派给运行免费模型的 headless opencode worker。核心理念："昂贵模型的上下文才是稀缺资源"，引发成本与架构讨论 | OPEN |
| 4 | **mcp-builder 兼容性修复** [#1742](https://github.com/anthropics/skills/pull/1742) | 适配 `mcp>=2.0.0` 的 API 重命名（`streamable_http_client`）与自定义 Header（修复 #1668）。反映 MCP 生态快速迭代对 Skills 的兼容压力 | OPEN，2026-09-11 更新 |
| 5 | **ODT 文档技能** [#486](https://github.com/anthropics/skills/pull/486) | OpenDocument（.odt/.ods）创建、模板填充与 HTML 转换，补齐开源/ISO 标准文档格式版图，与 docx/pdf 技能形成文档处理矩阵 | OPEN |
| 6 | **scnet-hpc 科研集群技能** [#1615](https://github.com/anthropics/skills/pull/1615) | 基于 SSH + Slurm 的 HPC 集群操作，代表 Skills 向垂直专业域（科研计算

---

# Claude Code 社区动态日报
**日期：2026-09-13** · 数据来源：github.com/anthropics/claude-code

---

## 一、今日速览

Claude Code 发布 **v2.1.270**，修复了 v2.1.269 引入的只读 git 命令反复请求权限的回归问题。值得注意的是，过去 24 小时内更新的 50 条 Issue 中绝大多数被批量标记为 `stale` 并关闭，其中不乏已复现（`reproduced`）或附复现步骤的 bug，社区对自动化清理的争议值得关注。讨论热度最高的问题仍是 **prompt cache 大规模失效导致成本浪费**（#63930）。

---

## 二、版本发布

### v2.1.270
- **修复**：会话运行一段时间后，Bash 中执行只读 git 命令（如 `git status`、`git log`）会意外弹出权限确认的问题（v2.1.269 引入的回归）。

📌 这是典型的"快速回归、快速修复"节奏，建议受影响的用户立即升级。

---

## 三、社区热点 Issues（Top 10）

> ⚠️ 以下 Issue 今日均被标记 `stale` 并关闭，部分已复现的问题并未确认修复。

| # | Issue | 关注理由 |
|---|-------|---------|
| 1 | [#63930](https://github.com/anthropics/claude-code/issues/63930) Prompt cache 在大量并行工具调用后被完全重建 | **今日热度第一**（12 评论 / 7 👍）。自 v2.1.154（伴随 Opus 4.7→4.8 切换）起，cache_read 塌缩至 system+tools 下限，会话中约 **74% 的 cache 写入被浪费**，直接推高 API 成本。带完整复现，却因 stale 被关闭，社区不满情绪明显。 |
| 2 | [#80912](https://github.com/anthropics/claude-code/issues/80912) Windows 内核 BSOD (0x139) | 9 评论。VS Code 会话触发内核级蓝屏，签名与早期 #30137 相同，说明底层崩溃问题可能长期未根治，属最高严重级别。 |
| 3 | [#86059](https://github.com/anthropics/claude-code/issues/86059) 跨会话消息到达时中断接收方会话 | 6 评论。多 Agent 协作场景下，消息送达反而打断目标会话，且会话事后对消息"失忆"，直接影响 agents 可靠性。 |
| 4 | [#74329](https://github.com/anthropics/claude-code/issues/74329) stdio MCP server 中途退出后重连异常 | 5 评论（作者为知名开发者 @jph00）。惰性重连成功一次调用后，工具被错误注销且残留进程泄漏，对自建 MCP server 用户影响大。 |
| 5 | [#70161](https://github.com/anthropics/claude-code/issues/70161) Statusline OSC 8 超链接不可点击 | 5 评论 / 3 👍，**已标记 reproduced**。2.1.181 引入的回归，破坏了自定义 statusline 生态的交互体验。 |
| 6 | [#86280](https://github.com/anthropics/claude-code/issues/86280) Cowork 项目全部丢失（data-loss） | 带 `data-loss` 标签。macOS 更新/重启后项目文件被重建为空；另揭露 `cleanupPeriodDays=30` 默认值**静默删除会话转录**，数据持久化策略引发担忧。 |
| 7 | [#71711](https://github.com/anthropics/claude-code/issues/71711) Gmail connector 在 CLI 中不出现 | 5 评论。同账号下 Calendar/Drive 正常、唯独 Gmail 缺失，6 月中旬后功能静默退化，无任何迁移提示。 |
| 8 | [#77469](https://github.com/anthropics/claude-code/issues/77469) 用量限制提示的重置时间比实际晚 ~3.5 小时 | 提示 5:40pm 重置、实际 2:00pm 已恢复，用户白等近 4 小时。同类型问题还有 [#74165](https://github.com/anthropics/claude-code/issues/74165)、[#87007](https://github.com/anthropics/claude-code/issues/87007)，**限流提示不准已成系统性问题**。 |
| 9 | [#86828](https://github.com/anthropics/claude-code/issues/86828) 云端会话中 GitHub 出口代理覆盖"Full"网络策略 | 配置了"无限制网络访问"的环境，对 GitHub 的匿名 API/HTML 读取仍返回 403，且自定义 Authorization 头被吞掉，阻碍 Web 端工作流自动化。 |
| 10 | [#85369](https://github.com/anthropics/claude-code/issues/85369) 等 ClAudit 安全过滤误报系列 | @sworrl 单日提交 **8+ 条**误报报告（[#85354](https://github.com/anthropics/claude-code/issues/85354)、[#85385](https://github.com/anthropics/claude-code/issues/85385)、[#85365](https://github.com/anthropics/claude-code/issues/85365) 等），均为 `session-halted` 级别——合法的运维/安全工作被 cyber/aup 分类器中途拦截，安全过滤器的校准问题集中爆发。 |

**其他值得留意**：[#85952](https://github.com/anthropics/claude-code/issues/85952)（compaction 后 AI 收到误导性系统上下文，影响核心正确性）、[#86533](https://github.com/anthropics/claude-code/issues/86533)（iOS 端会话列表冻结）。

---

## 四、重要 PR 进展

> 过去 24 小时仅 2 条 PR 有更新，活动较少，以下为全部内容：

1. **[#93912](https://github.com/anthropics/claude-code/pull/93912)** — mods 单元测试体系（by @poteat）
   为 diff、安全默认值、遥测等内置 mods 补充单元测试。亮点是**测试与 mod 同环境运行**：每个测试拿到引擎自己的 `$` 与 hooks 模块的 `on`，通过 `claude plugin test <dir>` 驱动。这为插件生态提供了可复用的测试范式，是向插件开发者开放基础设施的信号。

2. **[#61716](https://github.com/anthropics/claude-code/pull/61716)** — 文档：排查"虚假用量限制"（by @giruuuuj）
   一个从 5 月挂起至今的文档 PR 今日重新激活。根因：**上下文溢出被错误映射为 usage limit 报错**（/compact 报 "Extra usage required for 1M context"）。临时方案是切换 1M 上下文模型。对应关闭 #50321，与今日多条 cost 类 Issue 相互印证。

---

## 五、功能需求趋势

从今日 Issue 的标签与内容分布，社区关注集中在六个方向：

1. **成本透明与可预测性**（最热）— `area:cost` 标签占比最高：cache 失效浪费（#63930）、异常 token 消耗（[#84750](https://github.com/anthropics/claude-code/issues/84750)、[#86812](https://github.com/anthropics/claude-code/issues/86812)）、限流信息失真（#77469、#74165、#87007）。
2. **多 Agent / 跨会话协作可靠性** — 消息中断（#86059）、pinned 会话不可达（[#86864](https://github.com/anthropics/claude-code/issues/86864)）、Cowork 文件投递 429（[#86992](https://github.com/anthropics/claude-code/issues/86992)）。
3. **MCP 生态稳定性** — 进程生命周期管理（#74329）、connector 覆盖度与准确性（#71711、[#86885](https://github.com/anthropics/claude-code/issues/86885)）。
4. **Cloud/Web 会话网络能力** — 出口代理策略一致性（#86828）。
5. **移动端 / 桌面端功能对齐** — iOS 会话同步（#86533）、Remote Control 配对（[#86993](https://github.com/anthropics/claude-code/issues/86993)）。
6. **安全过滤校准** — 面向安全运维人员的 ClAudit 误报，需 whitelisting/申诉通道。

---

## 六、开发者关注点

- **成本是最大痛点**：从 cache 浪费 74% 到"一条对话吃掉 10% 周额度"，付费用户（尤其 Max 订阅者）对成本失控的容忍度正在下降，且缺少足够的诊断工具。
- **回归质量管理**：近期连续出现版本回归（2.1.154 cache、2.1.181 statusline、2.1.269 git 权限），发布节奏与稳定性平衡受到质疑。
- **stale 机器人批量关闭引发信任问题**：今日大量带复现、带 `reproduced` 标签的 Issue 被自动关闭，用户需重新开票或自行确认是否已修复，建议关注自己订阅的 Issue 状态。
- **数据持久化默认值需谨慎**：`cleanupPeriodDays=30` 静默清理会话记录（#86280

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-09-13** | 数据来源：[github.com/openai/codex](https://github.com/openai/codex)

---

## 📌 今日速览

今日无新版本发布，但合并了 15+ 个功能与修复 PR，重点集中在 **Agent Command Center 增强、TUI 体验优化和 token 计量准确性**。社区侧最突出的动态是 **GPT-6 Astra 配额消耗问题集中爆发**——三条新增 Issue 均指向模型在极短时间内烧毁大量配额，其中一条记录了单任务消耗 86% 周配额的极端案例。此外，iOS Remote 回归问题（42 条评论）仍在持续发酵。

---

## 🚨 社区热点 Issues（Top 10）

### 1. 配额消耗类问题集中爆发 ⚠️ 今日最热主题

**[#42987](https://github.com/openai/codex/issues/42987) GPT-6 Astra Medium 两轮短对话耗尽 Plus 5小时配额**（21 评论 / 14 👍）
Windows 平台用户报告 Astra 在总计仅几分钟的两轮对话中耗尽全部 5 小时配额，14 个 👍 表明受影响面较广。

**[#45085](https://github.com/openai/codex/issues/45085) 单个多 agent 任务 4.5 小时消耗 86% 周配额**（今日新建）
Prolite 用户记录了约 1.98 亿 token 的消耗（97.4% 为缓存输入），数据详实的极端案例。

**[#43731](https://github.com/openai/codex/issues/43731) Pro 20x 实测：Astra 周配额等效 API 容量比 Sol 低约 36%**
同账号对照测量，社区开始用量化数据对比新旧模型的实际可用容量。

> 💡 **值得注意**：今日合并的 PR [#45094](https://github.com/openai/codex/pull/45094)（改进 token 估算逻辑，剔除序列化 envelope 中的冗余开销）可能与配额显示/计量争议直接相关。

---

### 2. [#36040](https://github.com/openai/codex/issues/36040) iOS Remote 回归：仅显示最近有会话的项目（42 评论）
本日评论最多的 Issue，影响 ChatGPT 移动端 Remote Control 工作流，自 7 月底持续至今未修复，移动端用户不满情绪明显。

### 3. [#44781](https://github.com/openai/codex/issues/44781) Desktop 编辑已排队消息触发 "queued follow-up no longer exists"（13 评论 / 17 👍）
高 👍 新 Issue，指向 app-server 的消息队列生命周期管理缺陷，Desktop 稳定性问题的代表。

### 4. [#31376](https://github.com/openai/codex/issues/31376) `codex exec` 在 SSE 流建立前无限挂起（14 评论）
非交互式长任务的可靠性硬伤：连接处于 CLOSE_WAIT 时无读超时、无重试。对 CI/自动化场景影响较大。

### 5. [#22779](https://github.com/openai/codex/issues/22779) 已完成的 subagent 仍占用线程上限（15 评论）
多 agent 并行工作流的核心阻塞点，长期未解决。

### 6. [#41849](https://github.com/openai/codex/issues/41849) VS Code Remote-SSH 重连后残留 app-server 锁死会话（8 评论 / 7 👍）
断线重连产生双 app-server 实例，旧实例持有 thread writer 导致 "open in another app" 报错，远程开发场景的高频痛点。

### 7. [#41741](https://github.com/openai/codex/issues/41741) Auto-review 将本地无害操作误判为敏感出站请求（6 评论）
新增的 Auto-review 安全审查被认为过度拦截已授权的本地工作流，且**无人工申诉通道**，涉及产品安全策略与用户体验的平衡问题。

### 8. [#42937](https://github.com/openai/codex/issues/42937) GPT-5.6 Sol / GPT-6 Astra 自主完成率与运行可靠性下降（7 评论）
社区对模型代际切换的质量分析帖，含结构化证据链，反映部分用户认为新模型"更聪明但更难用"。

### 9. [#44444](https://github.com/openai/codex/issues/44444) CLI 0.154.0：选择 Astra 后光标在输入行内跳变（6 评论 / 5 👍）
最新版 TUI 的回归问题，影响日常输入体验。

### 10. [#14339](https://github.com/openai/codex/issues/14339) ✅ 已关闭：执行计划前清除上下文（27 👍）
高票功能需求（对齐 Claude Code / Copilot 的三选项交互）终于关闭，推测已实现或排期，对 Plan 模式用户是好消息。

---

## 🔧 重要 PR 进展（Top 10）

> 今日 PR 以 copyberry[bot] 自动化提交为主，绝大多数已合并，方向集中在 Command Center、TUI 和计量准确性。

| PR | 内容 | 意义 |
|---|---|---|
| [#45094](https://github.com/openai/codex/pull/45094) | 基于内容而非序列化 envelope 估算历史 token | 剔除消息 ID/元数据/JSON 转义导致的估算膨胀，**直接回应配额争议** |
| [#44970](https://github.com/openai/codex/pull/44970) | Command Center 显示任务 token 用量与费用估算 | 多 agent 场景下成本可见性大幅提升 |
| [#44957](https://github.com/openai/codex/pull/44957) | Command Center 支持按项目/状态/模型分组（Ctrl+S 切换） | 多任务管理体验优化 |
| [#44969](https://github.com/openai/codex/pull/44969) | 其他 app-server 管理的任务可只读打开 | 解决跨应用会话无法查看的问题，呼应 #41849 类痛点 |
| [#44945](https://github.com/openai/codex/pull/44945) | TUI Windows 沙箱安装走 app-server 通道 | 重构 Windows elevated/unelevated 沙箱流程，或改善 #39245 类问题 |
| [#45089](https://github.com/openai/codex/pull/45089) + [#45090](https://github.com/openai/codex/pull/45090) | 自动 Recap 延迟 3→30 分钟，并保留上下文/区分待办 | TUI 输出降噪与信息保真度的组合改进 |
| [#44946](https://github.com/openai/codex/pull/44946) | 移除 Friendly / Pragmatic 人格选择 | 产品简化，转向字面量模型指令模板 |
| [#44952](https://github.com/openai/codex/pull/44952) | 语音字幕跨说话人更新与历史移交时保持可见 | 语音交互（Voice）方向持续投入的信号 |
| [#44948](https://github.com/openai/codex/pull/44948) | 新增异步提问与插件刷新的上下文快照测试 | 加固多轮交互与插件热重载的测试覆盖 |
| [#31471](https://github.com/openai/codex/pull/31471) 🟡 仍 Open | 提取 `ConnectorRuntimeManager`（faster-connectors 1/4） | Connectors 架构大型重构的首个 PR，按账号/workspace 隔离运行时上下文 |

其他值得留意：[#25383](https://github.com/openai/codex/pull/25383) 多账号 Profile Switching 的 app-server 会话生命周期已合入；[#45051](https://github.com/openai/codex/pull/45051)、[#45035](https://github.com/openai/codex/pull/45035)、[#45039](https://github.com/openai/openai/codex/pull/45039) 为发布流水线优化（artifact 合并下载、DotSlash 直跑 Ubuntu runner、gzip level 6）。

---

## 📈 功能需求趋势

从近期 Issue 标签与讨论提炼，社区关注度排序：

1. **配额透明度与计量准确性**（rate-limits 类 Issue 占比明显上升）：用户要求更清晰的用量归因（缓存 vs 新输入、subagent 分摊）和更准的估算。
2. **多 Agent 会话管理**：线程上限释放（#22779）、跨应用只读访问、会话命名与颜色标记（[#44093](https://github.com/openai/codex/issues/44093)）——对齐 Claude Code 的多任务体验。
3. **远程/移动端工作流**：iOS Remote 回归、iPad 冻结、headless SSH 任务委托（#42973）、VS Code Remote-SSH 是长期痛点集群。
4. **Windows 平

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报
**日期：2026-09-13** | 数据来源：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

---

## 一、今日速览

昨夜发布的 **v0.61.0-nightly** 是一个安全导向版本，修复了构建文件修改与不可信 flag 引发的**间接提示注入漏洞**，并大幅加固了沙箱文件系统边界。社区讨论焦点集中在**子代理可靠性**上——子代理挂起、误报成功状态等问题持续发酵，其中通用代理挂起问题（#21409）已收获 8 个 👍。同时，多位贡献者提交了 MCP 策略执行、终端渲染闪烁等高质量修复 PR。

---

## 二、版本发布

### v0.61.0-nightly.20260912.g9c1b0a610
本次 nightly 更新聚焦安全加固：

- **fix(core)**: 防止通过构建文件修改和不可信 flag 进行的间接提示注入攻击（[PR #29250](https://github.com/google-gemini/gemini-cli/pull/29250)）
- **fix(sandbox)**: 加固文件系统边界，隔离运行时状态（[PR #29214](https://github.com/google-gemini/gemini-cli/pull/29214)）——将沙箱运行时状态与宿主机配置目录隔离，用净化后的配置文件替代宿主目录挂载，并在路径敏感检查中标准化 realpath 解析

> 💡 值得注意的是，这两项安全修复与社区热议的 #19873（OS 级沙箱方案）方向高度契合，表明安全沙箱已是维护团队的重点工作流。

---

## 三、社区热点 Issues

| # | Issue | 亮点 |
|---|-------|------|
| 1 | [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) 子代理达到 MAX_TURNS 后误报为 GOAL 成功 | **P1** · 13 条评论（今日最热）。`codebase_investigator` 触发轮次上限后仍报告 `success`，掩盖了实际中断，直接影响用户对结果的信任 |
| 2 | [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) 通用代理（generalist agent）无限挂起 | **P1** · 8 👍（今日最高）。简单如创建文件夹的操作也会挂起超过一小时，用户只能通过提示词禁止子代理来规避 |
| 3 | [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) 零依赖 OS 沙箱 + 执行后意图路由 | 9 条评论。提出利用 Gemini 3 原生 bash 能力（grep/cat/sed/awk 链式调用）同时保障安全性的架构方案，与今日发布的安全修复呼应 |
| 4 | [#25166](https://github.com/google-gemini/gemini-cli/issues/25166) Shell 命令完成后卡在 "Waiting input" | **P1** · 3 👍。命令已执行完毕但 UI 持续显示等待输入，影响核心交互可靠性 |
| 5 | [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) Gemini 主动调用 skills 和子代理的频率过低 | 6 条评论。用户配置了 gradle/git skills 后模型几乎从不自主使用，只在显式指示时才调用——反映子代理路由策略存在短板 |
| 6 | [#26525](https://github.com/google-gemini/gemini-cli/issues/26525) Auto Memory 确定性脱敏与日志缩减 | **P2 · 安全**。当前流程中密钥脱敏发生在内容已进入模型上下文**之后**，存在泄露风险，需引入确定性前置脱敏 |
| 7 | [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) AST 感知的文件读取/搜索/代码库映射 EPIC | 架构级调研：用 AST 精确读取方法边界，减少错位读取导致的额外轮次和 token 噪音，有望显著优化 `codebase_investigator` |
| 8 | [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) 浏览器子代理在 Wayland 下失败 | **P1**。Linux Wayland 用户无法使用 browser agent，同样伴随 GOAL 误报问题 |
| 9 | [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) 工具数量超过 128 个触发 400 错误 | MCP 生态扩容下的实际痛点：重度配置 MCP 服务器的用户直接撞上 API 限制，需更智能的工具范围裁剪 |
| 10 | [#22186](https://github.com/google-gemini/gemini-cli/issues/22186) get-shit-done 输出 hook 导致崩溃 | **P1**。在打印用户摘要阶段稳定复现崩溃，阻塞了该工作流的正常使用 |

---

## 四、重要 PR 进展

| # | PR | 内容 |
|---|-----|------|
| 1 | [#29250](https://github.com/google-gemini/gemini-cli/pull/29250) | 🚀 **已随 nightly 发布**：防止通过构建文件修改和不可信 flag 的间接提示注入 |
| 2 | [#29214](https://github.com/google-gemini/gemini-cli/pull/29214) | 🚀 **已随 nightly 发布**：沙箱文件系统边界加固，隔离运行时状态，配置文件净化 |
| 3 | [#29217](https://github.com/google-gemini/gemini-cli/pull/29217) | **P1 修复**：`--model gemini-2.5-flash` 显式指定模型被静默改写为 3.5 Flash，`isFlashModel()` 的宽泛 `endsWith('flash')` 匹配是根因 |
| 4 | [#29201](https://github.com/google-gemini/gemini-cli/pull/29201) | **P1 · 安全修复**：TOML 自定义命令含多个 `!{...}` 注入时确认循环永不收敛（即使全选"始终允许"），现已跨重试保留已批准命令 |
| 5 | [#29294](https://github.com/google-gemini/gemini-cli/pull/29294) | **今日新提交**：修复后台命令执行期间输入导致的终端闪烁撕裂，定位到 ink 渲染器的 stdout 争用与光标焦点双重瓶颈 |
| 6 | [#29292](https://github.com/google-gemini/gemini-cli/pull/29292) | **今日新提交**：checkpoint 加载时校验 `history` 为数组，防止部分写入/损坏的 JSON 导致 `/resume` 后续操作异常 |
| 7 | [#29200](https://github.com/google-gemini/gemini-cli/pull/29200) | **企业级修复**：MCP 策略运行时统一执行——空 `mcp.allowed` 列表改为 fail-closed（拒绝全部），对齐大小写不敏感的服务器名匹配 |
| 8 | [#29203](https://github.com/google-gemini/gemini-cli/pull/29203) | **安全修复**：`stripShellWrapper` 此前仅识别裸 `bash -c`，携带额外 flag 的包装命令可绕过策略引擎的内层命令复检 |
| 9 | [#29208](https://github.com/google-gemini/gemini-cli/pull/29208) | 形状错误的 `agents.json`（合法 JSON 但结构异常）导致确认流程崩溃或静默丢失，现回退为空配置 |
| 10 | [#29287](https://github.com/google-gemini/gemini-cli/pull/29287) | **已关闭**：将 `--yolo` flag 原生映射为 `allowedTools: ["*"]` 通配策略，移除独立的 `ApprovalMode.YOLO` 状态——权限模型向统一策略引擎收敛 |

---

## 五、功能需求趋势

从今日活跃的 50 条 Issues 中，可提炼出以下五大方向：

1

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报

**日期：2026-09-13 ｜ 数据来源：[github/copilot-cli](https://github.com/github/copilot-cli)**

---

## 一、今日速览

过去 24 小时仓库无新版本发布，社区动态以问题反馈为主：新增 4 条 Issue，其中多条聚焦**多模型/子代理运行时的 Token 消耗与可观测性**（#4829、#4825），成本透明化诉求明显上升。稳定性方面，Linux 平台堆内存溢出问题（#4725）持续发酵，是当前评论最多的热点；MCP 取消请求合规问题（#4759）已关闭。PR 侧以 CI 依赖升级与供应链安全加固为主。

---

## 二、版本发布

过去 24 小时无新 Release。

---

## 三、社区热点 Issues

> 过去 24 小时共 7 条 Issue 有更新（新增 4 条），按重要性排序全部覆盖如下：

**1. [#4725](https://github.com/github/copilot-cli/issues/4725) Linux 平台频繁 JavaScript 堆内存溢出（OPEN）**
- 内存持续增长至约 4GB 后 Mark-Compact 失败崩溃，每几分钟发生一次，长会话基本不可用
- **为何重要**：核心稳定性缺陷，直接导致 Linux 用户无法进行长时间任务
- **社区反应**：4 条评论、1 👍，为当前互动量最高的 Issue，自 9 月 4 日持续活跃至今

**2. [#4829](https://github.com/github/copilot-cli/issues/4829) 子代理长工具调用序列导致 prompt caching 失效与 Token 叠加消耗（OPEN）**
- 自定义 agent 经 `task` 工具执行时，单轮可运行数百次工具调用，缓存失效后 Token 消耗成倍增长
- **为何重要**：直接影响使用成本，子代理/自主代理重度用户（企业场景）的高敏感问题

**3. [#4831](https://github.com/github/copilot-cli/issues/4831) 粘贴一张图片后 claude-opus-5 无法再查看任何图片（OPEN）**
- 会话中粘贴截图后，所有 `view` 调用均报 "已达到最大可查看图片数 (1)"
- **为何重要**：多模态工作流的关键阻塞，图片配额逻辑疑似存在缺陷

**4. [#4830](https://github.com/github/copilot-cli/issues/4830) 请求新增 `/remove-dir` 命令撤销目录访问（OPEN）**
- 已有 `/add-dir`、`/list-dirs`，但缺少对称的权限回收命令，用户只能重启会话才能降低目录访问范围
- **为何重要**：符合最小权限原则的安全增强，API 设计完整性的合理补齐

**5. [#4825](https://github.com/github/copilot-cli/issues/4825) HydraFusion：向 OpenTelemetry 输出各阶段模型、判定与额度属性（OPEN）**
- 多模型编排（HydraFusion）对外只暴露单一答案与总额度，路由细节仅存于本地 `events.jsonl`，未导出至 OTEL
- **为何重要**：多模型时代的成本归因与可观测性是企业落地的基础设施需求

**6. [#4824](https://github.com/github/copilot-cli/issues/4824) ctrl-t 排队的提示词不执行（OPEN）**
- 提示词入队后，前序任务完成时队列不自动执行，UI 无限停留在 "Working"
- **为何重要**：提示词队列（prompt queueing）这一工作流自动化能力的可靠性回归

**7. [#4759](https://github.com/github/copilot-cli/issues/4759) Copilot CLI 应发送 MCP 取消请求（CLOSED）**
- 工具调用等待 URL 模式 elicitation 时，用户取消操作未按 MCP 规范发送 cancellation 请求
- **为何重要**：MCP 协议合规性问题；已关闭，建议关注后续 Release Notes 是否包含对应修复

---

## 四、重要 PR 进展

> 过去 24 小时共 3 条 PR 更新，均为 CI/供应链维护类，无功能代码变更：

**1. [#4828](https://github.com/github/copilot-cli/pull/4828) 升级 actions/github-script 7.1.0 → 9.0.0（OPEN）**
- Dependabot 自动升级，跨两个大版本的 CI 脚本 Action 更新，需注意 v9.0.0 的破坏性变更

**2. [#4827](https://github.com/github/copilot-cli/pull/4827) 升级 actions/stale 9.1.0 → 11.0.0（OPEN）**
- Dependabot 自动升级，同样跨大版本，涉及 Issue/PR 自动关闭策略的 Action

**3. [#4808](https://github.com/github/copilot-cli/pull/4808) 将 GitHub Actions 固定到 commit SHA（CLOSED）**
- 安全机器人提交，将 3 处 `uses:` 引用全部 pin 到不可变 commit SHA（4 个文件变更，0 错误 0 警告）
- **值得注意**：该 PR 已关闭，而两条 Dependabot 升级 PR 仍在开放中——版本升级与 SHA 固定策略可能存在冲突，后续合并顺序值得关注

---

## 五、功能需求趋势

从近期 Issue 中可提炼出社区最关注的五个方向：

| 方向 | 相关 Issue | 信号强度 |
|---|---|---|
| **多模型编排可观测性** | #4825（HydraFusion 路由/额度导出 OTEL） | ⭐⭐⭐ 新增即获关注 |
| **Token 成本控制** | #4829（子代理缓存失效、消耗叠加） | ⭐⭐⭐ 成本敏感型用户核心诉求 |
| **权限与安全管理** | #4830（会话内动态撤销目录访问） | ⭐⭐ 最小权限原则 |
| **多模态体验** | #4831（图片配额/查看限制） | ⭐⭐ 视觉工作流阻塞 |
| **MCP 协议完整合规** | #4759（cancellation 请求，已关闭） | ⭐ 有望近期落地 |

整体趋势：随着 Copilot CLI 支持多模型（Gemini、claude-opus 系列等）与自主子代理，社区关注点正从“基础可用”转向**成本归因、遥测透明度与权限治理**。

---

## 六、开发者关注点

**主要痛点：**

1. **长会话稳定性**：#4725 的堆内存溢出使 Linux 长任务不可行，且已持续一周以上未解决，是当前最急迫的缺陷
2. **Token 成本不可控**：子代理多轮调用下 prompt caching 失效，账单与预期严重偏离（#4829）
3. **多模态限制**：图片查看配额被单次粘贴耗尽，截图驱动的调试流程受阻（#4831）
4. **交互功能可靠性**：提示词队列不执行、UI 假死（#4824）
5. **遥测黑盒**：多模型路由决策与计费细节仅存本地日志，无法接入企业监控体系（#4825）

**高频需求：**
- 会话内权限收敛能力（`/remove-dir`）
- OTEL 遥测维度扩展（模型、判定、额度）
- 面向子代理场景的缓存与上下文管理优化

---

*本报告基于过去 24 小时的 GitHub 公开数据自动汇总，链接均指向原始 Issue/PR。*

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报
**日期：2026-09-13 | 数据来源：[MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)**

---

## 一、今日速览

今日为社区低活跃日：过去 24 小时无新版本发布、无 PR 更新，仅 3 条 Issue 有动态。值得关注的是，两个沉淀数月的 Web 模式相关 Bug（#1409、#1404）于昨日被批量关闭，或与近期版本迭代清理有关；同时，Web UI 消息队列"Steer（⚡）"功能请求（#2370）持续有社区讨论，反映出用户对 Web 交互模式下任务干预能力的强烈需求。

---

## 二、版本发布

过去 24 小时无新版本发布。

---

## 三、社区热点 Issues

> 今日仅 3 条 Issue 有更新（不足 10 条），以下为全部动态。

### 1. [OPEN] #2370 功能请求：为 Web UI 队列面板添加 Steer（⚡）按钮
- **作者**：@2986787982dsx-ui ｜ 创建于 2026-05-26 ｜ 👍 2 ｜ 💬 1
- **链接**：https://github.com/MoonshotAI/kimi-cli/issues/2370
- **为什么重要**：用户在使用 `kimi web` 启动的 Web UI 时，若在 AI 执行任务途中发送后续消息，消息只能进入队列排队，无法即时干预或调整 AI 当前行为。该请求提出增加 Steer（⚡）按钮，允许将队列中的消息"插队"为实时引导指令。这直接关系到**长任务执行过程中的可控性**，是当前 Agent 类工具的普遍痛点，社区已有点赞和讨论，值得官方纳入规划。

### 2. [CLOSED] #1409 Bug：Web 模式持续刷新并连接到不同端口
- **作者**：@LSTM-Kirigaya ｜ 创建于 2026-03-11 ｜ 版本 1.20.0 ｜ macOS (arm64)
- **链接**：https://github.com/MoonshotAI/kimi-cli/issues/1409
- **为什么重要**：CLI 中使用 `/web` 启动网页端时，页面反复刷新并连到异常端口，导致 Web 模式不可用。该 Issue 沉淀 6 个月后关闭，无后续评论，推测已在后续版本中修复或随架构调整失效。可作为 Web 模式稳定性演进的历史参考。

### 3. [CLOSED] #1404 Bug：行为鲁莽（Reckless behaviour）
- **作者**：@acorello ｜ 创建于 2026-03-11 ｜ 版本 1.19.0 ｜ macOS (arm64) ｜ kimi.ai
- **链接**：https://github.com/MoonshotAI/kimi-cli/issues/1404
- **为什么重要**：用户要求 Kimi "制定计划并先展示"，但模型未等待确认便直接执行操作，属于典型的**自主性边界 / 安全确认机制**问题。虽然该 Issue 已关闭且无评论沉淀，但此类反馈对评估 AI 执行前的确认流程（plan-then-act）改进仍有参考价值。

---

## 四、重要 PR 进展

过去 24 小时无 PR 更新。

---

## 五、功能需求趋势

基于今日活跃 Issue 及近期讨论方向，社区关注点集中在：

| 方向 | 说明 | 相关 Issue |
|---|---|---|
| **Web UI 交互增强** | 消息队列机制不够灵活，缺少对正在执行任务的实时引导/干预能力（Steer 插队执行） | #2370 |
| **Web 模式稳定性** | `/web` 模式曾存在端口混乱、页面循环刷新等连接层问题，随版本迭代逐步收敛 | #1409 |
| **AI 行为可控性** | 用户期望"先计划、后执行"的确认流程能被严格遵守，避免模型越权操作 | #1404 |

---

## 六、开发者关注点

1. **任务中途干预能力缺失**：AI 长任务执行期间，用户消息只能排队、无法即时纠偏，是当前反馈中最直接的产品体验短板（#2370）。
2. **Web 模式可靠性**：历史 Bug 显示 Web 模式在端口分配与连接稳定性上曾有缺陷，使用 `kimi web` / `/web` 的开发者建议保持版本更新。
3. **执行确认与安全边界**：部分用户对模型"未确认即执行"的行为存在顾虑，期待更强的 plan 审阅与操作确认机制（#1404）。

---

*本日报基于过去 24 小时 GitHub 公开数据自动生成。今日数据量较小，趋势分析样本有限，建议结合近期往期日报综合判断。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**日期：2026-09-13** | 数据来源：[anomalyco/opencode](https://github.com/anomalyco/opencode)

---

## 📌 今日速览

过去 24 小时无新版本发布。**剪贴板/复制粘贴问题仍是社区最大痛点**——相关 Issue 累计评论超 240 条，横跨 SSH、Docker、code-server、Windows、macOS 等几乎所有环境。此外，V2 版本的 subagent、skills 等新功能暴露出多个可靠性 bug，仓库同时对一批 8 月创建的过期 PR 进行了自动化清理关闭。

---

## 🚀 版本发布

过去 24 小时无新 Release。（当前 Issue 中提及的版本线索：V1 稳定版约 1.18.30，V2 已迭代至 v2.0.2 及 `0.0.0-next-17403` nightly）

---

## 🔥 社区热点 Issues（Top 10）

**1. 剪贴板复制完全失效（历史最热 Issue）** — [#4283](https://github.com/anomalyco/opencode/issues/4283)
131 条评论、123 👍，自 2025 年 11 月开放至今。TUI 中选中文本无法复制到系统剪贴板，是该仓库热度最高的未解问题，今日仍有活跃讨论。

**2. CLI 复制粘贴双失效** — [#13984](https://github.com/anomalyco/opencode/issues/13984)
57 条评论。UI 提示 "copied to clipboard" 但 Ctrl+V 无内容——提示与实际状态不一致说明是剪贴板写入链路问题，而非交互问题。

**3. VSCode Server (Docker) 环境复制失效** — [#41470](https://github.com/anomalyco/opencode/issues/41470)
远程容器开发场景下提示成功但实际未写入，22 条评论，容器/远程场景无系统剪贴板可用是根因之一。

**4. Web 终端环境剪贴板集体失效** — [#26459](https://github.com/anomalyco/opencode/issues/26459)
覆盖 code-server、GitHub Codespaces、Gitpod 等主流 Web IDE 环境，与 #41470 同属远程场景集群，社区持续追加复现环境。

**5. Desktop 对慢速本地 Provider 硬编码 5 分钟超时** — [#26602](https://github.com/anomalyco/opencode/issues/26602)
即使配置 `"timeout": false` 也会在 5 分钟整点报 `Headers Timeout Error`，12 条评论。对本地大模型用户是硬性阻断。

**6. V2 subagent 工具未向模型暴露有效 ID** — [#36761](https://github.com/anomalyco/opencode/issues/36761)
模型只能"猜" subagent ID 导致委派失败，缺乏发现机制。由核心开发者 @kitlangton 提出，是 V2 架构级修复项。

**7. `opencode run` 流静默停滞：无超时、无重试、不退出** — [#48675](https://github.com/anomalyco/opencode/issues/48675)
3 个并行 headless worker 同时停滞且无任何错误输出。对 CI/自动化场景是致命问题，今日新报。

**8. Desktop sidecar 内存压力下反复崩溃 (0xC0000409)** — [#48715](https://github.com/anomalyco/opencode/issues/48715)
附 3 份 debug bundle，同时报告 "Too many images" 错误会永久锁死会话，今日新报。

**9. V2 TUI Ctrl+C 无提示丢弃整个提示词草稿** — [#48636](https://github.com/anomalyco/opencode/issues/48636)
长提示词误触即全丢、无恢复路径，用户体验类高优先级问题。**当日创建当日关闭**，修复响应迅速。

**10. 功能需求：移动端/第二设备远程审批权限请求** — [#39628](https://github.com/anomalyco/opencode/issues/39628)
长任务因权限确认（文件编辑、bash、MCP 调用）阻塞，用户希望在手机上完成审批，指向"异步挂机工作流"方向。

> 💡 另可关注：[#48720](https://github.com/anomalyco/opencode/issues/48720)（slash 调用 skills 时尾部参数被丢弃，V2.0.2）、[#48687](https://github.com/anomalyco/opencode/issues/48687)（DeepSeek 4.1 Flash 周配额计量疑似异常）。

---

## 🔧 重要 PR 进展（Top 10）

> ⚠️ **观察**：今日展示的活跃 PR 更新均为**批量关闭**操作（`automated-pr-cleanup` 标签），这批 PR 创建于 8 月 12 日、9 月 12 日被机器人统一清理，属过期贡献回收，不代表功能已合入主线。

**1. Zen 响应补全 CORS 头** — [#42101](https://github.com/anomalyco/opencode/pull/42101)
修复模型列表响应缺少 CORS 头（此前仅 OPTIONS 预检有），浏览器端集成场景的关键修复。

**2. Desktop 退出前正确停止 sidecar** — [#42095](https://github.com/anomalyco/opencode/pull/42095)
修复 Linux 下关闭应用时 NodeService 进程被 SIGABRT 异常终止的问题。

**3. 限制 Desktop 可启动的应用范围（安全）** — [#42087](https://github.com/anomalyco/opencode/pull/42087)
仅允许 "Open in" 菜单暴露的应用穿越 IPC 边界，Windows 可执行路径在主进程解析，收窄攻击面。

**4. 校验 `/global/upgrade` 升级请求（安全）** — [#42022](https://github.com/anomalyco/opencode/pull/42022)
强制 JSON Content-Type 触发 CORS 预检 + 校验 semver 目标版本，防跨站伪造升级。

**5. MCP 本地服务器瞬态启动失败自动重试** — [#42020](https://github.com/anomalyco/opencode/pull/42020)
并行 spawn（`concurrency: "unbounded"`）下的竞态失败重试，与今日 #43845（每项目目录重复 spawn MCP）问题相关。

**6. apply_patch 保留文件尾部空行** — [#42084](https://github.com/anomalyco/opencode/pull/42084)
修复补丁未触及的 `\n\n` 尾部空行被静默删除，避免无关 diff 污染。

**7. 拒绝空 compaction 摘要** — [#42063](https://github.com/anomalyco/opencode/pull/42063)
压缩模型输出 reasoning 但无正文摘要时，V1 误判为成功会破坏会话历史，此 PR 强制失败重试。

**8. CLI 修复 EPIPE 崩溃** — [#41968](https://github.com/anomalyco/opencode/pull/41968)
后台服务 stdout/stderr 消费方退出后，Bun CLI 因未处理 EPIPE 直接死亡，影响守护进程稳定性。

**9. 隔离工作区配置状态（防跨工作区污染）** — [#41950](https://github.com/anomalyco/opencode/pull/41950) / [#41945](https://github.com/anomalyco/opencode/pull/41945)
全局配置缓存经 `mergeDeep` 合并后保留共享引用，单工作区的插件配置修改可能泄漏到其他工作区，双 PR 分别从深拷贝与引用隔离角度修复。

**10. 尊重仓库 Git 语义** — [#41963](https://github.com/anomalyco/opencode/pull/41963)
V2 快照仓库不再覆盖 `core.autocrlf` / `core.symlinks`，从源仓库继承换行符与符号链接语义——对 Windows 用户尤其重要。

---

## 📈 功能需求趋势

| 方向 | 信号强度 | 依据 |
|---|---|---|
| **剪贴板/复制粘贴可靠性** | 🔴 极高 | 9+ 个活跃 Issue，覆盖 SSH/Docker/Web IDE/Windows/macOS 全场景 |
| **V2 核心功能打磨** | 🔴 高 | subagent ID 发现 (#36761)、skills 参数丢失 (#48720)、TUI 草稿保护 (#48636) |
| **长时间任务与无人值守运行** | 🟠 中高 | 远程审批 (#39628)、流停滞超时 (#48675)、5 分钟硬超时 (#26602) |
| **Desktop / IDE 集成稳定性** | 🟠 中高 | sidecar 崩溃 (#48715)、VSCode 扩展复制失效 (#39588)、面板管理 (#48661) |
| **终端环境兼容性** | 🟡 中 | GNU Screen (#32985)、Figma PNG 粘贴 (#44740) |
| **配额与计费透明度** | 🟡 中 | DeepSeek 4.1 Flash 计量 (#48687)、Go 订阅识别失败 (#48681) |

---

## 🎯 开发者关注点

1. **剪贴板是头号系统性问题**：不是单点 bug 而是跨环境架构问题——TUI 鼠标捕获、远程无系统剪贴板、Web 沙箱限制各自成因不同，#4283 拖延 10 个月未解已消耗大量社区信任，建议官方给出统一路线图。
2. **"静默失败"模式引发信任危机**：多个 Issue 共同指向同一模式——显示成功但实际失败（剪贴板、subagent 空结果 [#38866](https://github.com/anomalyco/opencode/issues/38866)、流停滞无报错 [#48675]），可观测性是 V2 需要补的课。
3. **headless/自动化场景被低估**：`opencode run` 无超时无退出、EPIPE 崩溃、MCP 并发竞态，均影响 CI 与多 agent 编排场景，与社区"无人值守长任务"诉求形成对照。
4. **V2 迁移期建议观望或锁定版本**：v2.0.2 仍有 skills 参数丢失、subagent ID 不可发现等基础功能缺陷；生产环境建议留在 V1 稳定线。
5. **订阅/配额问题大量以 Issue 形式涌入**（#48681、#48684），且多为当日提出当日关闭——建议官方在模板中分流计费类反馈至支持渠道。

---
*本日报基于 GitHub 公开数据自动整理，链接均指向原始 Issue/PR。*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 · 2026-09-13

## 一、今日速览

Qwen Code 发布 **v0.23.3 nightly** 版本。今日社区热度最高的是 **TUI 崩溃问题**：两个 P1 Issue（#11500、#11732）先后报告多个后台 agent 完成时触发 React #185 未捕获异常，CLI 静默退出至 shell，官方修复 PR（#11742）已当日提交。另一条主线是维护者 @wenshao 推动「**agent harness 与执行环境分离**」架构路线（#11695 + PR #11711 + #11746），容器执行与 SSH 远程执行成为 multi-agent 演进的核心方向。

---

## 二、版本发布

**[v0.23.3-nightly.20260912.54aa66834b](https://github.com/QwenLM/qwen-code/releases)**（2026-09-12）

- refactor(dingtalk): 移除过时的后台响应聚合逻辑（[#11570](https://github.com/QwenLM/qwen-code/pull/11570)）
- feat(channels)**!**: 移除部分 channels 能力 —— **破坏性变更**，升级前请查阅完整 release notes

---

## 三、社区热点 Issues

**1. [#11500](https://github.com/QwenLM/qwen-code/issues/11500) [P1] 多个后台 agent 接连完成时 TUI 静默崩溃（10 评论，今日最热）**
多个后台子代理在短时间内完成时，Ink 的 useBoxMetrics 布局监听器触发 setState 循环，抛出 Minified React error #185（超出最大更新深度）后进程直接掉回 shell，无任何错误渲染。涉及核心渲染稳定性，讨论量今日第一。

**2. [#11732](https://github.com/QwenLM/qwen-code/issues/11732) [P1] 0.23.3 在 native monitor 任务运行期间因 React #185 崩溃（6 评论）**
与 #11500 同一故障模式：长任务通过 native monitor 启动后 CLI 崩溃，但监控任务仍在后台运行。两个独立会话复现，官方已提交修复 PR #11742。

**3. [#11695](https://github.com/QwenLM/qwen-code/issues/11695) 执行环境与 agent harness 分离总体规划（5 评论）**
@wenshao 提出的伞形方向：让工具执行环境成为**可分离、可寻址**的运行时组件，而非 agent 循环进程的固有属性。这是本日最重要的架构级讨论，直接衍生出 PR #11711 与 #11746。

**4. [#11704](https://github.com/QwenLM/qwen-code/issues/11704) Android 官方伴侣客户端提案（5 评论）**
提议基于 ACP 协议为 `qwen serve` 构建原生 Android 瘦客户端，作者承诺实现 MVP 并长期维护，社区响应积极。

**5. [#11499](https://github.com/QwenLM/qwen-code/issues/11499) [P2] .mcp.json 中 `${VAR}` 占位符不展开（4 评论）**
配置 `Authorization: Bearer ${MY_TOKEN}` 时占位符文本被原样发送，环境变量中的密钥无法注入。MCP 用户的普遍痛点。

**6. [#11198](https://github.com/QwenLM/qwen-code/issues/11198) [P1] 遥测未脱敏上传原始工具错误文本（含 shell 命令行）（3 评论）**
默认开启的 usage-statistics 通道将 shell 失败的原始命令行上传至 RUM 端点，存在凭据泄漏风险。安全类高优问题，等待人工处理。

**7. [#11724](https://github.com/QwenLM/qwen-code/issues/11724) [P2] Windows 长效运行内存高达 7GB 并崩溃（3 评论）**
中文用户报告长会话触发 7GB 内存告警后 CLI 崩溃且无法续接会话，进度追回成本高。已标记 need-information 等待复现信息。

**8. [#11718](https://github.com/QwenLM/qwen-code/issues/11718) [P2] Desktop AppImage 的 PYTHONHOME/PYTHONPATH 泄漏（3 评论）**
AppImage 全局设置的环境变量被子进程 stdio MCP 服务器继承，导致外部 Python 解释器崩溃。Linux 桌面用户接入 MCP 的阻断性问题。

**9. [#11610](https://github.com/QwenLM/qwen-code/issues/11610) [P1] hooks 契约与 Claude Code 对齐（3 评论）**
要求对齐明文 stdout、`stop_hook_active`、超时单位、matcher 语法等细节，降低现有 Claude Code hooks 配置的迁移成本，属于生态兼容关键项。

**10. [#11710](https://github.com/QwenLM/qwen-code/issues/11710) [P2] Virtual Viewport 退出后终端残留脏状态（3 评论）**
任意方式退出后摘要一闪而过、历史输出丢失，后续使用 nano 报 `[ Unknown sequence ]`，表明终端状态未正确恢复。

> **已关闭亮点**：[#11666](https://github.com/QwenLM/qwen-code/issues/11666)（`logPrompts=false` 时仍导出 API 请求内容）、[#11657](https://github.com/QwenLM/qwen-code/issues/11657)（Fireworks Qwen3 工具调用续传 400 错误）、[#11720](https://github.com/QwenLM/qwen-code/issues/11720)（Cron 在 DST 重复小时计算过去时刻）、[#10953](https://github.com/QwenLM/qwen-code/issues/10953)（子代理委派期间 Todo 计划状态冻结 55 分钟）。

---

## 四、重要 PR 进展

**1. [#11711](https://github.com/QwenLM/qwen-code/pull/11711) feat(core): 子代理容器执行环境**
Unix 主机上通过 `QWEN_AGENT_EXECUTION_BACKEND` 启用 Docker/Podman，Agent 工具可选 `execution_backend: "container"` 并配合 worktree 隔离。#11695 路线图的首个落地实现。

**2. [#11742](https://github.com/QwenLM/qwen-code/pull/11742) fix(cli): 未捕获异常时收割运行中的 monitor**
进程死亡前调用 `MonitorRegistry.abortAll()`，确保崩溃时 monitor 资源被正确回收 —— 直接响应 P1 Issue #11732。

**3. [#11636](https://github.com/QwenLM/qwen-code/pull/11636) feat: 后台结果执行跨 daemon 与 Web Shell 追踪**
为后台结果处理赋予显式 daemon 执行生命周期，覆盖权限、取消、重放等路径，与 #11500 崩溃场景高度相关。

**4. [#11643](https://github.com/QwenLM/qwen-code/pull/11643) fix(core): Web 终端 PTY 迁移至内置 ConPTY 后端**
解决 Windows 内置后端的宿主泄漏问题，spawn 失败时自动回退，退出后释放 worker 资源并保留

</details>

---
*本日报由 [Big Model Radar](https://github.com/litang9/big_model_radar) 自动生成。*