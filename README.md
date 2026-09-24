# Art Radar 🎨

English | [Português](./README.pt.md) | [中文](./README.zh.md)

A GitHub Actions workflow that wakes up every morning and reads the generative-art and creative-coding
world for you: it tracks GitHub activity in the tools artists run, the frameworks people sketch with,
the art topics that are trending, the art-and-tech threads on Hacker News, and the blogs of the main
open-source art tools — then publishes the result as GitHub Issues and committed Markdown files.

Reports are generated in **English, Portuguese and Chinese** (configurable) and can be read as Markdown,
as GitHub Issues, through the web UI, through RSS or through an MCP server.

## Web UI

**`https://<your-user>.github.io/art_radar`**

A dark-themed, no-login interface that renders every report from this repository via GitHub Pages,
with language toggles (EN / PT / 中文) per report and full-text search across recent digests.

## RSS Feed

**`https://<your-user>.github.io/art_radar/feed.xml`**

Subscribe in Feedly, Reeder, NewsBlur or any other reader. The feed carries the latest 30 reports
across all languages and report types, refreshed on every run together with `manifest.json`.

## MCP Server

Deploy the hosted [Model Context Protocol](https://modelcontextprotocol.io) server from `mcp/` and any
MCP client (Claude Desktop, OpenClaw, …) can query the radar directly.

| Tool | Description |
|------|-------------|
| `list_reports` | List available dates and report types (last N days) |
| `get_latest` | Fetch the most recent report of a given type |
| `get_report` | Fetch a specific report by date and type |
| `search` | Keyword search across recent reports |

```bash
cd mcp
pnpm install
wrangler deploy
```

Then add it to your client, e.g. Claude Desktop:

```json
{
  "mcpServers": {
    "art-radar": { "url": "https://art-radar-mcp.<your-subdomain>.workers.dev" }
  }
}
```

## Telegram notifications

Set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` and every run posts a short message with links to
that day's reports in all generated languages.

## Tracked sources

### Artist tools — applications and CLIs artists actually run

| Tool | Repository | Medium |
|------|-----------|--------|
| Cables.gl | [cables-gl/cables](https://github.com/cables-gl/cables) | node-based generative visuals |
| Graphite | [GraphiteEditor/Graphite](https://github.com/GraphiteEditor/Graphite) | vector graphics / procedural design |
| Aseprite | [aseprite/aseprite](https://github.com/aseprite/aseprite) | pixel art & sprite animation |
| Sonic Pi | [sonic-pi-net/sonic-pi](https://github.com/sonic-pi-net/sonic-pi) | live-coded music |
| Manim | [3b1b/manim](https://github.com/3b1b/manim) | programmatic animation |
| vpype | [abey79/vpype](https://github.com/abey79/vpype) | pen-plotter pipeline |

### Flagship framework + peers

[p5.js](https://github.com/processing/p5.js) is the flagship: it gets a deep-dive section and is
compared against the peer frameworks below — three.js, openFrameworks, Processing 4, OPENRNDR,
nannou, PixiJS, raylib, LÖVE and Babylon.js. Everything is configurable in `config.yml`.

### Community showcase

[terkelg/awesome-creative-coding](https://github.com/terkelg/awesome-creative-coding) — a curated list
where every pull request proposes a new tool, library, studio, festival or learning resource. Sorted by
discussion rather than by date, so the report shows what the community is actually asking for.

### GitHub art topics

Repositories active in the last 7 days under: `creative-coding`, `generative-art`,
`procedural-generation`, `glsl`, `shader`, `p5js`, `processing`, `plotter`, `livecoding`, `art`.
The daily GitHub Trending page is also scraped and pre-filtered with an art keyword list.

### Hacker News

Art / creative-coding stories from the last 24 h (widened to 72 h when the beat is quiet), searched via
the Algolia HN API with art-specific queries and filtered again by an art keyword list, so the report
stays on topic.

### Art-tool news feeds

Blender · Blender Developers Blog · Krita · Processing Foundation (p5.js) · Inkscape.

Feeds take precedence (the article text comes with the feed, so no page fetching and no bot walls);
sitemap-based sources are supported too, for sites without a feed.

## Reports

| Report | Files (EN / PT / ZH) | Notes |
|--------|----------------------|-------|
| Creative Coding Tools Digest | `art-tools.md` · `art-tools-pt.md` · `art-tools-zh.md` | Per-tool digests + cross-tool comparison + community showcase |
| Creative Coding Frameworks Digest | `art-frameworks[-lang].md` | p5.js deep dive + peer comparison + peer digests |
| Art & Creative Tool News | `art-news[-lang].md` | From the configured feeds; skipped when nothing is new |
| Generative Art Open Source Trends | `art-trending[-lang].md` | GitHub Trending (art-filtered) + art topic search |
| Hacker News Art & Tech Digest | `art-hn[-lang].md` | Top art stories, sentiment and reading list |
| Art Radar Weekly | `art-weekly[-lang].md` | Every Monday, from the last 7 daily digests |
| Art Radar Monthly | `art-monthly[-lang].md` | On the 1st, from the weeklies (or sampled dailies) |

`art-tools.md` / `art-tools-pt.md` / `art-tools-zh.md` structure:

```
# Creative Coding Tools Digest YYYY-MM-DD

## Cross-Tool Comparison
  Landscape overview / Activity table / Shared needs / Differentiation /
  Community momentum / Trend signals

## Community Showcase
  Top submissions / What the field is asking for / Pending entries / Curation signals

## Per-Tool Reports
  <details> Cables.gl   — Highlights / Releases / Hot issues / PR progress /
                          Workflow trends / Artist pain points
  <details> Graphite    — ...
  <details> Aseprite    — ...
```

`art-frameworks.md` structure:

```
# Creative Coding Frameworks Digest YYYY-MM-DD

## p5.js Deep Dive
  Overview / Releases / Progress / Hot topics / Bugs / Roadmap signals /
  Artist & educator feedback / Backlog watch

## Cross-Framework Comparison
  Ecosystem overview / Activity table / Flagship position / Shared directions /
  Differentiation / Momentum / Trend signals

## Peer Framework Reports
  <details> three.js — ...   <details> openFrameworks — ...   <details> ...
```

`art-trending.md` structure:

```
# Generative Art Open Source Trends YYYY-MM-DD

Today's highlights
Top projects by dimension
  🎨 Generative & algorithmic art
  🖌️ Creative coding frameworks & libraries
  🎛️ Live coding, audio & audiovisual performance
  🧊 3D, WebGL/WebGPU & rendering
  🛠️ Art tools & production pipelines
Trend signal analysis
Community focus
```

Issues are labelled per report and language: `art-tools`, `art-tools-pt`, `art-tools-zh`,
`art-frameworks`, `art-frameworks-pt`, … plus `art-weekly` / `art-monthly`.

## Setup

### 1. Fork this repository

Then enable GitHub Pages (Settings → Pages → Deploy from branch → `main` / root) so the web UI and
`feed.xml` become available.

### 2. Customise `config.yml` (optional)

`config.yml` is fully commented and controls everything: tools, the flagship project, peer frameworks,
the showcase repo, GitHub topics, Hacker News queries/keywords, news feeds, languages and the timezone
used for the report date. Delete a section to fall back to the built-in defaults.

### 3. Verify the sources

```bash
export GITHUB_TOKEN=ghp_xxxxx
pnpm probe
```

`pnpm probe` checks every configured repo, topic, HN query and feed and prints a health report
(`❌` marks a broken source). There is also a **Source health check** workflow for running it in CI.

### 4. Add secrets

**Settings → Secrets and variables → Actions:**

| Secret | Required | Description |
|--------|----------|-------------|
| `OPENAI_API_KEY` | ✅ | API key for any OpenAI-compatible `chat/completions` endpoint |
| `OPENAI_BASE_URL` | optional | Endpoint override (default `https://api.openai.com/v1`) |
| `OPENAI_MODEL` | optional | Model name (default `gpt-4.1-mini`) |
| `REPORT_LANGS` | optional | e.g. `en,pt,zh` — overrides `report_langs` from config.yml |
| `PAGES_URL` | recommended | Public site base URL, e.g. `https://your-user.github.io/art_radar` |
| `TELEGRAM_BOT_TOKEN` | optional | Telegram notifications |
| `TELEGRAM_CHAT_ID` | optional | Telegram chat/channel id |

`ANTHROPIC_API_KEY` / `ANTHROPIC_BASE_URL` / `ANTHROPIC_MODEL` still work as aliases, and
`GITHUB_TOKEN` is provided automatically by Actions.

> **Cost note:** each repo entry produces one LLM call per language, so a full English + Portuguese +
> Chinese run with the default config issues roughly 60 calls per day. Trim `tools` / `peers` or set
> `report_langs: [en]` to reduce that.

### 5. Choose the schedule

| Workflow | Cron (UTC) | Local time (São Paulo) |
|----------|-----------|------------------------|
| Daily digest | `0 10 * * *` | 07:00 |
| Weekly rollup | `0 11 * * 1` | Monday 08:00 |
| Monthly rollup | `0 12 1 * *` | 1st, 09:00 |

Edit the cron expressions in `.github/workflows/` and `timezone_offset` in `config.yml` to match your
own timezone.

## Local development

```bash
pnpm install
pnpm start          # run the full digest
pnpm probe          # check every configured source
pnpm test           # unit tests
pnpm typecheck      # tsc --noEmit
pnpm lint           # ESLint
pnpm manifest       # rebuild manifest.json + feed.xml
pnpm weekly         # weekly rollup
pnpm monthly        # monthly rollup
pnpm notify         # send the Telegram notification
```

Required env vars for local runs:

```bash
export GITHUB_TOKEN=ghp_xxxxx
export OPENAI_API_KEY=sk-xxxxx
export DIGEST_REPO=owner/art_radar   # omit to skip GitHub issue creation
export REPORT_LANGS=en,pt,zh         # optional
```

## What changed from the original fork

This repository started as a fork of an AI/LLM “Big Model Radar”. Every layer has been rewritten for
the art domain: the tracked sources, the report set and file names, the prompts (now in three
languages), the trending topics, the Hacker News filter and the news-feed sources, plus the web UI,
RSS feed, MCP server and Telegram notifications. The previous AI digests were removed.

## Star history

[![Star History Chart](https://api.star-history.com/svg?repos=havaianasdestruido/art_radar&type=Date)](https://star-history.com/#havaianasdestruido/art_radar&Date)
