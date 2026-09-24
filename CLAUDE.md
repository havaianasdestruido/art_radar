# CLAUDE.md

Guidance for agents (and humans) working inside this repository.

## Project overview

Art Radar is a daily digest generator for the **generative art and creative-coding** open-source
ecosystem — the fork of an AI-ecosystem radar that has been rewritten end to end for the art domain.
A GitHub Actions cron job runs at 10:00 UTC (07:00 in São Paulo) and produces the daily reports listed
below, in English, Portuguese and Chinese, published as GitHub Issues and committed Markdown files.
Weekly and monthly rollups are generated on top of the daily reports.

## Commands

```bash
pnpm start          # run the full digest locally
pnpm probe          # health-check every source configured in config.yml
pnpm test           # node:test unit tests
pnpm typecheck      # tsc --noEmit
pnpm lint           # ESLint (src + test)
pnpm lint:fix       # ESLint --fix
pnpm format         # Prettier --write
pnpm format:check   # Prettier --check
pnpm manifest       # regenerate manifest.json + feed.xml
pnpm weekly         # weekly rollup
pnpm monthly        # monthly rollup
pnpm notify         # Telegram notification
```

Required env vars for local runs:

```bash
export GITHUB_TOKEN=ghp_xxxxx
export OPENAI_API_KEY=sk-xxxxx
export OPENAI_BASE_URL=https://api.openai.com/v1   # any OpenAI-compatible endpoint
export DIGEST_REPO=owner/art_radar                 # omit to skip GitHub issue creation
export REPORT_LANGS=en,pt,zh                       # omit to use config.yml
```

## Architecture

The pipeline runs in four sequential phases, each a named async function in `src/index.ts`:

1. **`fetchAllData`** — all network I/O in parallel: GitHub API (issues/PRs/releases) for every
   configured repo, the community showcase list, the news feeds, GitHub Trending HTML + art topic
   search, and the Hacker News Algolia API. Every fetch is individually wrapped so one failing source
   cannot abort the run; repos whose requests all fail are flagged (`fetchError`) and reported as a
   fetch problem rather than as "no activity".
2. **`generateSummaries`** — one LLM call per repo per language, plus the showcase and trend reports,
   rate-limited to 5 concurrent requests by the queue in `src/report.ts`. Runs once per language.
3. **Comparisons** — two LLM calls per language: cross-tool comparison and flagship-vs-peers
   comparison. Failures fall back to a localised placeholder instead of throwing.
4. **Save phase** — `buildToolsReportContent` / `buildFrameworksReportContent` build Markdown strings;
   `saveNewsReport` / `saveTrendingReport` / `saveHnReport` call the LLM, write the file and create a
   GitHub Issue.

## Source files

| File | Responsibility |
|------|---------------|
| `src/index.ts` | Orchestration: phases, report content builders, `main()` |
| `src/config.ts` | `config.yml` schema, validation and the creative-coding defaults |
| `src/lang.ts` | `Lang` type (`en`/`pt`/`zh`), language parsing, report filenames |
| `src/reports.ts` | Single source of truth for report ids, titles, colours, issue labels |
| `src/github.ts` | GitHub API helpers: `fetchRecentItems`, `fetchRecentReleases`, `fetchShowcaseData`, `createGitHubIssue` |
| `src/prompts.ts` | All LLM prompt builders (per-language templates) and `formatItem` |
| `src/report.ts` | `callLlm` (concurrency limiter + retries), `saveFile`, `autoGenFooter` |
| `src/web.ts` | News fetching: RSS/Atom feeds and sitemaps, state in `digests/web-state.json` |
| `src/trending.ts` | GitHub Trending HTML scraper, art topic search, `matchesKeywords` |
| `src/hn.ts` | Hacker News art stories via the Algolia HN Search API |
| `src/rollup.ts` | Weekly and monthly rollups built from committed daily digests |
| `src/notify.ts` | Telegram notification built from `manifest.json` |
| `src/probe.ts` | Source health check (`pnpm probe`) |
| `src/generate-manifest.ts` | `manifest.json` (web UI) + `feed.xml` (RSS) |

## Report outputs

Files written to `digests/YYYY-MM-DD/` (English is the canonical variant and has no suffix):

| File | Issue label | Notes |
|------|-------------|-------|
| `art-tools.md` | `art-tools` | Always generated |
| `art-frameworks.md` | `art-frameworks` | Always generated |
| `art-news.md` | `art-news` | Skipped when no source has new content |
| `art-trending.md` | `art-trending` | Skipped when both data sources fail |
| `art-hn.md` | `art-hn` | Skipped when the Algolia fetch fails |
| `art-weekly.md` | `art-weekly` | Mondays |
| `art-monthly.md` | `art-monthly` | 1st of the month |

Language variants append `-pt` / `-zh` to both the filename and the issue label.

## Tracked sources (defaults, all overridable in `config.yml`)

- **tools** — artist apps/CLIs: Cables.gl, Graphite, Aseprite, Sonic Pi, Manim, vpype
- **flagship** — processing/p5.js (deep dive + comparison anchor)
- **peers** — three.js, openFrameworks, Processing 4, OPENRNDR, nannou, PixiJS, raylib, LÖVE, Babylon.js
- **showcase_repo** — terkelg/awesome-creative-coding (community submissions, sorted by discussion)
- **trending_topics** — creative-coding, generative-art, procedural-generation, glsl, shader, p5js,
  processing, plotter, livecoding, art
- **hn_queries / hn_keywords** — art-specific queries plus a keyword filter that keeps HN on topic
- **web_sites** — Blender, Blender Developers Blog, Krita, Processing Foundation (p5.js), Inkscape

## Key conventions

- **Languages**: `Lang = "en" | "pt" | "zh"`. English owns the plain filename; other languages are
  suffixed. `REPORT_LANGS` (env) beats `report_langs` (config.yml) beats the built-in `["en"]`.
- **Prompts**: every builder in `src/prompts.ts` renders shared data once and then picks a template
  from a `Record<Lang, (payload) => string>`. When you change one language, change all three.
- **Report metadata**: never hard-code report ids, titles or file names — import from `src/reports.ts`
  and `src/lang.ts`. The manifest generator, Telegram notifications, the web UI and the MCP server all
  read the same definitions.
- **`callLlm(prompt, maxTokens?)`** defaults to 4096 tokens; flagship deep dives use 8192, trend
  reports 6144, news reports 8192. On 429 or empty responses it retries up to 3 times with exponential
  backoff (5 s / 10 s / 20 s), releasing the concurrency slot while it waits.
- The concurrency limiter (`LLM_CONCURRENCY = 5`) prevents 429s when many parallel calls fire. Do not
  bypass it by calling the provider SDK directly.
- **News state** (`digests/web-state.json`, `version: 2`) is committed on every run and is the source
  of truth for which URLs have been seen. Feeds prefer feed content; sitemap sites fall back to page
  fetching unless `metadata_only: true`.
- **`sampleNote(total, sampled, lang)`** in `src/prompts.ts` formats the "showing top N" note.
  Reuse it — do not inline the same string format.
- Add keyword lists to `config.yml` rather than the code when tuning what counts as "art".

## Web UI & RSS feed

- `index.html` reads `manifest.json`, groups the language variants of each report into one sidebar row
  and fetches `digests/YYYY-MM-DD/<report>.md` on demand.
- The `TITLES` map in `index.html` must stay in sync with `REPORTS` in `src/reports.ts`.
- `feed.xml` contains the latest 30 items across all languages; both it and `manifest.json` are
  regenerated by `pnpm manifest` and committed by the workflow.

## Adding a new report type

1. Add a `ReportDef` entry in `src/reports.ts` (id, icon, colour, titles per language) — and to
   `DAILY_REPORTS` / `ROLLUP_REPORTS` implicitly via the `rollup` flag.
2. Create a data fetcher (or extend `src/web.ts` / `src/trending.ts`) and, if it is configurable, add
   its schema to `src/config.ts` plus defaults and a `config.yml` section.
3. Add per-language prompt templates in `src/prompts.ts`.
4. Wire it into `fetchAllData`, `generateSummaries` (or the comparison phase) and a `saveXxxReport`
   function in `src/index.ts`.
5. Add the label to `TITLES` in `index.html` and, if needed, to `REPORT_LABELS` in `mcp/src/index.ts`.
6. Update the READMEs (all three languages) and this file.

## Adding a new source language

1. Extend `LANGS` in `src/lang.ts` with the new code and add entries to `LANG_BADGE`, `LANG_NAME` and
   `LANG_LOCALE`.
2. Add the language to every `Record<Lang, …>` in `src/prompts.ts`, `src/index.ts` (the `CONTENT`
   map), `src/rollup.ts` (truncation/status strings) and `src/reports.ts` (report titles).
3. Add a badge to `BADGES` and titles to `TITLES` in `index.html`.
4. Update the schedules/labels documentation in the READMEs.
