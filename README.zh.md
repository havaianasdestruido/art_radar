# Art Radar 🎨

[English](./README.md) | [Português](./README.pt.md) | 中文

一个每天早上自动运行的 GitHub Actions 工作流，为你读取生成艺术与创意编程世界的动态：跟踪艺术家常用
工具、创作框架的 GitHub 活跃度，监控正在升温的艺术主题，抓取 Hacker News 上艺术与技术相关的讨论，
以及主流开源艺术工具的官方博客——随后将结果发布为 GitHub Issue 并提交 Markdown 文件。

报告可用**英语、葡萄牙语和中文**生成（可配置），支持 Markdown 阅读、GitHub Issue、网页界面、
RSS 以及 MCP 服务器等方式获取。

## 网页界面

**`https://<你的用户名>.github.io/art_radar`**

深色主题、无需登录的界面，通过 GitHub Pages 渲染本仓库的全部报告，每条报告都带有语言切换
（EN / PT / 中文）以及全文搜索。

## RSS 订阅

**`https://<你的用户名>.github.io/art_radar/feed.xml`**

可直接用 Feedly、Reeder、NewsBlur 等阅读器订阅。Feed 包含所有语言与报告类型的最新 30 条内容，
每次运行后与 `manifest.json` 一起更新。

## MCP 服务器

部署 `mcp/` 中的 [Model Context Protocol](https://modelcontextprotocol.io) 服务器后，任何兼容
MCP 的客户端（Claude Desktop、OpenClaw 等）都可以直接查询雷达数据。

| 工具 | 说明 |
|------|------|
| `list_reports` | 列出可用日期与报告类型（最近 N 天） |
| `get_latest` | 获取某类型的最新报告 |
| `get_report` | 按日期与类型获取指定报告 |
| `search` | 在近期报告中做关键词检索 |

```bash
cd mcp
pnpm install
wrangler deploy
```

然后在客户端中配置，例如 Claude Desktop：

```json
{
  "mcpServers": {
    "art-radar": { "url": "https://art-radar-mcp.<你的子域名>.workers.dev" }
  }
}
```

## Telegram 通知

配置 `TELEGRAM_BOT_TOKEN` 与 `TELEGRAM_CHAT_ID` 后，每次运行都会推送一条消息，包含当天所有已生成
语言版本的报告链接。

## 跟踪的数据源

### 艺术家工具——艺术家真正在使用的应用与 CLI

| 工具 | 仓库 | 媒介 |
|------|------|------|
| Cables.gl | [cables-gl/cables](https://github.com/cables-gl/cables) | 节点式生成视觉 |
| Graphite | [GraphiteEditor/Graphite](https://github.com/GraphiteEditor/Graphite) | 矢量图形与程序化设计 |
| Aseprite | [aseprite/aseprite](https://github.com/aseprite/aseprite) | 像素画与精灵动画 |
| Sonic Pi | [sonic-pi-net/sonic-pi](https://github.com/sonic-pi-net/sonic-pi) | Live Coding 音乐 |
| Manim | [3b1b/manim](https://github.com/3b1b/manim) | 程序化动画 |
| vpype | [abey79/vpype](https://github.com/abey79/vpype) | 笔式绘图仪工作流 |

### 核心框架与同赛道项目

[p5.js](https://github.com/processing/p5.js) 为核心参照项目：它拥有深度分析章节，并与同赛道框架
（three.js、openFrameworks、Processing 4、OPENRNDR、nannou、PixiJS、raylib、LÖVE、Babylon.js）
进行横向对比。以上均可在 `config.yml` 中配置。

### 社区展示

[terkelg/awesome-creative-coding](https://github.com/terkelg/awesome-creative-coding)——一个精选清单
仓库，每个 Pull Request 都在提交新工具、库、工作室、艺术节或学习资源。按讨论热度而非时间排序，
因此报告呈现的是社区真正想要的。

### GitHub 艺术主题

最近 7 天活跃的以下主题仓库：`creative-coding`、`generative-art`、`procedural-generation`、`glsl`、
`shader`、`p5js`、`processing`、`plotter`、`livecoding`、`art`。同时抓取 GitHub Trending 榜单并按
艺术关键词预筛选。

### Hacker News

过去 24 小时内与艺术/创意编程相关的帖子（内容较少时自动扩大到 72 小时），通过 Algolia HN API 以
艺术相关查询抓取，并按艺术关键词列表二次过滤。

### 艺术工具资讯源

Blender · Blender Developers Blog · Krita · Processing Foundation（p5.js）· Inkscape。

优先使用 RSS/Atom（正文随 Feed 一起返回，无需逐页抓取，也不会遇到反爬）；也支持没有 Feed 的网站
使用 sitemap。

## 报告类型

| 报告 | 文件（EN / PT / ZH） | 说明 |
|------|---------------------|------|
| 创意编程工具动态日报 | `art-tools.md` · `art-tools-pt.md` · `art-tools-zh.md` | 各工具报告 + 横向对比 + 社区展示 |
| 创意编程框架生态日报 | `art-frameworks[-lang].md` | p5.js 深度报告 + 同赛道对比 |
| 艺术与创意工具资讯 | `art-news[-lang].md` | 来自配置的资讯源；无新内容时跳过 |
| 生成艺术开源趋势日报 | `art-trending[-lang].md` | GitHub Trending（艺术筛选）+ 主题搜索 |
| Hacker News 艺术与技术社区动态 | `art-hn[-lang].md` | 热门帖子、社区情绪与深读推荐 |
| 艺术雷达周报 | `art-weekly[-lang].md` | 每周一，基于最近 7 天日报 |
| 艺术雷达月报 | `art-monthly[-lang].md` | 每月 1 日，基于周报（或抽样的日报） |

`art-tools-zh.md` 结构：

```
# 创意编程工具动态日报 YYYY-MM-DD

## 横向对比
  整体格局 / 活跃度对比 / 共同需求 / 差异化定位 / 社区热度 / 趋势信号

## 社区展示
  热门提交 / 领域需求信号 / 高潜力待收录 / 策展信号

## 各工具详细报告
  <details> Cables.gl   — 今日速览 / 版本发布 / 热点 Issues / PR 进展 / 创作流程趋势 / 创作者痛点
  <details> Graphite    — ...
```

GitHub Issue 会按报告与语言打标签：`art-tools`、`art-tools-pt`、`art-tools-zh`、`art-frameworks`、
`art-frameworks-pt` 等，以及 `art-weekly`、`art-monthly`。

## 配置

### 1. Fork 本仓库

开启 GitHub Pages（Settings → Pages → Deploy from branch → `main` / root），以便访问网页界面与
`feed.xml`。

### 2. 调整 `config.yml`（可选）

`config.yml` 带有完整注释，控制所有内容：工具列表、核心项目、同赛道框架、社区清单仓库、GitHub 主题、
Hacker News 查询与关键词、资讯源、语言以及报告日期使用的时区。删除某个配置段即回退到内置默认值。

### 3. 检查数据源

```bash
export GITHUB_TOKEN=ghp_xxxxx
pnpm probe
```

`pnpm probe` 会检查每个配置的仓库、主题、HN 查询与资讯源，并打印健康报告（`❌` 表示该源有问题）。
仓库中还提供了 **Source health check** 工作流，可在 CI 中运行同样的检查。

### 4. 配置 Secrets

**Settings → Secrets and variables → Actions：**

| Secret | 必需 | 说明 |
|--------|------|------|
| `OPENAI_API_KEY` | ✅ | 任意兼容 `chat/completions` 的接口密钥 |
| `OPENAI_BASE_URL` | 可选 | 接口地址覆盖（默认 `https://api.openai.com/v1`） |
| `OPENAI_MODEL` | 可选 | 模型名（默认 `gpt-4.1-mini`） |
| `REPORT_LANGS` | 可选 | 例如 `en,pt,zh`，会覆盖 config.yml 中的 `report_langs` |
| `PAGES_URL` | 建议 | 站点地址，例如 `https://你的用户名.github.io/art_radar` |
| `TELEGRAM_BOT_TOKEN` | 可选 | Telegram 通知 |
| `TELEGRAM_CHAT_ID` | 可选 | Telegram 会话/频道 ID |

`ANTHROPIC_API_KEY` / `ANTHROPIC_BASE_URL` / `ANTHROPIC_MODEL` 仍可作为别名使用，`GITHUB_TOKEN`
由 Actions 自动提供。

> **成本提示：** 每个仓库条目在每种语言下都会产生一次 LLM 调用，因此默认配置下"英语 + 葡萄牙语 +
> 中文"的完整运行每天约 60 次调用。可减少 `tools` / `peers`，或设置 `report_langs: [zh]` 以降低成本。

### 5. 调整运行时间

| 工作流 | Cron (UTC) | 圣保罗时间 |
|--------|-----------|-----------|
| 每日日报 | `0 10 * * *` | 07:00 |
| 周报 | `0 11 * * 1` | 周一 08:00 |
| 月报 | `0 12 1 * *` | 每月 1 日 09:00 |

请在 `.github/workflows/` 中修改 cron 表达式，并在 `config.yml` 中调整 `timezone_offset`。

## 本地开发

```bash
pnpm install
pnpm start          # 运行完整日报流程
pnpm probe          # 检查所有配置的数据源
pnpm test           # 单元测试
pnpm typecheck      # tsc --noEmit
pnpm lint           # ESLint
pnpm manifest       # 重新生成 manifest.json + feed.xml
pnpm weekly         # 周报
pnpm monthly        # 月报
pnpm notify         # 发送 Telegram 通知
```

本地运行所需环境变量：

```bash
export GITHUB_TOKEN=ghp_xxxxx
export OPENAI_API_KEY=sk-xxxxx
export DIGEST_REPO=owner/art_radar   # 省略则不创建 GitHub Issue
export REPORT_LANGS=en,pt,zh         # 可选
```

## 与原 Fork 的差异

本仓库最初是 AI/LLM 方向"Big Model Radar"的 fork。所有分层都已针对艺术领域重写：跟踪的数据源、
报告集合与文件名、提示词（现为三种语言）、Trending 主题、Hacker News 过滤规则、资讯源，以及网页界面、
RSS、MCP 服务器和 Telegram 通知。原有的 AI 日报内容已全部移除。
