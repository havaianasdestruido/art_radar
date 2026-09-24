/**
 * Art Radar — daily digest for generative art and creative coding.
 *
 * Tracks artist-facing tools (Cables, Graphite, Aseprite, Sonic Pi, Manim,
 * vpype…), the flagship creative-coding framework p5.js and its peers, the
 * community showcase list, art topics on GitHub, art stories on Hacker News
 * and the news feeds of the main open-source art tools.
 *
 * Reports are generated in English, Portuguese and Chinese (configurable).
 *
 * Env vars:
 *   OPENAI_API_KEY      - API key for an OpenAI-compatible endpoint
 *   OPENAI_BASE_URL     - Endpoint override (default: https://api.openai.com/v1)
 *   OPENAI_MODEL        - Model name (default: gpt-4.1-mini)
 *   ANTHROPIC_API_KEY   - Backward-compatible alias for OPENAI_API_KEY
 *   ANTHROPIC_BASE_URL  - Backward-compatible alias for OPENAI_BASE_URL
 *   ANTHROPIC_MODEL     - Backward-compatible alias for OPENAI_MODEL
 *   GITHUB_TOKEN        - GitHub token for API access and issue creation
 *   DIGEST_REPO         - owner/repo where digest issues are posted (optional)
 *   REPORT_LANGS        - Comma-separated languages, e.g. "en,pt,zh" (optional)
 */

import {
  type RepoConfig,
  type GitHubItem,
  type GitHubRelease,
  fetchRecentItems,
  fetchRecentReleases,
  fetchShowcaseData,
  createGitHubIssue,
} from "./github.ts";
import {
  type RepoDigest,
  buildToolPrompt,
  buildFrameworkPrompt,
  buildToolComparisonPrompt,
  buildFrameworkComparisonPrompt,
  buildShowcasePrompt,
  buildNewsPrompt,
  buildTrendingPrompt,
  buildHnPrompt,
  NO_ACTIVITY,
  FETCH_FAILED,
  COMPARISON_FAILED,
  SUMMARY_FAILED,
  SHOWCASE_FAILED,
  TRENDING_NO_DATA,
  TRENDING_FAILED,
} from "./prompts.ts";
import { callLlm, saveFile, autoGenFooter, getLlmBaseUrl, hasLlmCredentials } from "./report.ts";
import { loadWebState, saveWebState, fetchSiteContent, type WebFetchResult, type WebState } from "./web.ts";
import { fetchTrendingData, type TrendingData } from "./trending.ts";
import { fetchHnData, type HnData } from "./hn.ts";
import { loadConfig, type RadarConfig } from "./config.ts";
import { type Lang, DEFAULT_LANGS, parseLangs, reportFileName } from "./lang.ts";
import { DAILY_REPORTS, findReport, issueLabel } from "./reports.ts";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const config: RadarConfig = loadConfig();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

/** Report date in the configured timezone (Brazil by default). */
export function reportDate(now = new Date(), timezoneOffset = config.timezoneOffset): string {
  const shifted = new Date(now.getTime() + timezoneOffset * 60 * 60 * 1000);
  return shifted.toISOString().slice(0, 10);
}

/** Languages enabled by REPORT_LANGS, falling back to config.yml then English. */
function enabledLanguages(): Lang[] {
  const raw = process.env["REPORT_LANGS"];
  if (raw !== undefined && raw.trim() !== "") return parseLangs(raw, DEFAULT_LANGS);
  return config.reportLangs ?? DEFAULT_LANGS;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RepoFetch {
  cfg: RepoConfig;
  issues: GitHubItem[];
  prs: GitHubItem[];
  releases: GitHubRelease[];
  /** Set when every GitHub request for this repo failed (rate limit, outage…). */
  fetchError?: string;
}

interface Summaries {
  toolDigests: RepoDigest[];
  flagshipSummary: string;
  peerDigests: RepoDigest[];
  showcaseSummary: string;
  trendingSummary: string;
  /** Filled in by the comparison phase. */
  comparison: string;
  frameworkComparison: string;
}

// ---------------------------------------------------------------------------
// Phase 1: Fetch
// ---------------------------------------------------------------------------

async function fetchAllData(
  since: Date,
  webState: WebState,
): Promise<{
  fetched: RepoFetch[];
  showcase: { prs: GitHubItem[]; issues: GitHubItem[] };
  newsResults: WebFetchResult[];
  trendingData: TrendingData;
  hnData: HnData;
}> {
  const allConfigs = [...config.tools, config.flagship, ...config.peers];
  console.log(
    `  Tracking ${allConfigs.length} repos: ${allConfigs.map((r) => r.id).join(", ")}, ` +
      `${config.showcaseRepo}, ${config.webSites.length} news feeds, github trending, hacker news`,
  );

  const [fetched, showcase, newsResults, trendingData, hnData] = await Promise.all([
    Promise.all(
      allConfigs.map(async (cfg): Promise<RepoFetch> => {
        let failures = 0;
        let lastError = "";
        const onError = (err: unknown, what: string): never[] => {
          failures++;
          lastError = String(err);
          console.error(`  [${cfg.id}] ${what} fetch failed: ${err}`);
          return [];
        };

        const [issuesRaw, prs, releases] = await Promise.all([
          fetchRecentItems(cfg, "issues", since).catch((err) => onError(err, "issues")),
          fetchRecentItems(cfg, "pulls", since).catch((err) => onError(err, "pulls")),
          fetchRecentReleases(cfg.repo, since).catch((err) => onError(err, "releases")),
        ]);
        const issues = issuesRaw.filter((i) => !i.pull_request);
        console.log(
          `  [${cfg.id}] issues: ${issues.length}, prs: ${prs.length}, releases: ${releases.length}` +
            (failures === 3 ? " (all requests failed)" : ""),
        );
        return { cfg, issues, prs, releases, ...(failures === 3 ? { fetchError: lastError } : {}) };
      }),
    ),
    fetchShowcaseData(config.showcaseRepo)
      .then((d) => {
        console.log(`  [showcase] prs: ${d.prs.length}, issues: ${d.issues.length}`);
        return d;
      })
      .catch((err) => {
        console.error(`  [showcase] fetch failed: ${err}`);
        return { prs: [], issues: [] };
      }),
    Promise.all(config.webSites.map((site) => fetchSiteContent(site, webState))),
    fetchTrendingData(config.trendingTopics, config.hnKeywords).catch((): TrendingData => ({
      trendingRepos: [],
      trendingTotal: 0,
      searchRepos: [],
      trendingFetchSuccess: false,
    })),
    fetchHnData(config.hnQueries, config.hnKeywords).catch((): HnData => ({
      stories: [],
      fetchSuccess: false,
      windowHours: 24,
      scanned: 0,
    })),
  ]);

  return { fetched, showcase, newsResults, trendingData, hnData };
}

// ---------------------------------------------------------------------------
// Phase 2: LLM summaries
// ---------------------------------------------------------------------------

async function generateSummaries(
  toolFetches: RepoFetch[],
  flagshipFetch: RepoFetch,
  peerFetches: RepoFetch[],
  showcase: { prs: GitHubItem[]; issues: GitHubItem[] },
  trendingData: TrendingData,
  dateStr: string,
  lang: Lang,
): Promise<Summaries> {
  const [toolDigests, flagshipSummary, peerDigests, showcaseSummary, trendingSummary] = await Promise.all([
    Promise.all(
      toolFetches.map(async ({ cfg, issues, prs, releases, fetchError }): Promise<RepoDigest> => {
        if (fetchError) {
          console.log(`  [${cfg.id}] GitHub fetch failed, skipping LLM call`);
          return { config: cfg, issues, prs, releases, summary: FETCH_FAILED[lang] };
        }
        if (!issues.length && !prs.length && !releases.length) {
          console.log(`  [${cfg.id}] No activity, skipping LLM call`);
          return { config: cfg, issues, prs, releases, summary: NO_ACTIVITY[lang] };
        }
        console.log(`  [${cfg.id}] Calling LLM for tool digest...`);
        try {
          return {
            config: cfg,
            issues,
            prs,
            releases,
            summary: await callLlm(buildToolPrompt(cfg, issues, prs, releases, dateStr, lang)),
          };
        } catch (err) {
          console.error(`  [${cfg.id}] LLM call failed: ${err}`);
          return { config: cfg, issues, prs, releases, summary: SUMMARY_FAILED[lang] };
        }
      }),
    ),
    (async () => {
      const { cfg, issues, prs, releases, fetchError } = flagshipFetch;
      if (fetchError) {
        console.log(`  [${cfg.id}] GitHub fetch failed, skipping LLM call`);
        return FETCH_FAILED[lang];
      }
      if (!issues.length && !prs.length && !releases.length) {
        console.log(`  [${cfg.id}] No activity, skipping LLM call`);
        return NO_ACTIVITY[lang];
      }
      console.log(`  [${cfg.id}] Calling LLM for flagship deep dive...`);
      return callLlm(buildFrameworkPrompt(cfg, issues, prs, releases, dateStr, 50, 30, lang), 8192);
    })(),
    Promise.all(
      peerFetches.map(async ({ cfg, issues, prs, releases, fetchError }): Promise<RepoDigest> => {
        if (fetchError) {
          console.log(`  [${cfg.id}] GitHub fetch failed, skipping LLM call`);
          return { config: cfg, issues, prs, releases, summary: FETCH_FAILED[lang] };
        }
        if (!issues.length && !prs.length && !releases.length) {
          console.log(`  [${cfg.id}] No activity, skipping LLM call`);
          return { config: cfg, issues, prs, releases, summary: NO_ACTIVITY[lang] };
        }
        console.log(`  [${cfg.id}] Calling LLM for framework digest...`);
        try {
          return {
            config: cfg,
            issues,
            prs,
            releases,
            summary: await callLlm(
              buildFrameworkPrompt(cfg, issues, prs, releases, dateStr, undefined, undefined, lang),
            ),
          };
        } catch (err) {
          console.error(`  [${cfg.id}] LLM call failed: ${err}`);
          return { config: cfg, issues, prs, releases, summary: SUMMARY_FAILED[lang] };
        }
      }),
    ),
    (async () => {
      console.log(`  [showcase] Calling LLM for community showcase...`);
      try {
        return await callLlm(
          buildShowcasePrompt(
            showcase.prs,
            showcase.issues,
            config.showcaseRepo,
            config.showcaseName,
            dateStr,
            lang,
          ),
        );
      } catch (err) {
        console.error(`  [showcase] LLM call failed: ${err}`);
        return SHOWCASE_FAILED[lang];
      }
    })(),
    (async () => {
      const hasData = trendingData.trendingRepos.length > 0 || trendingData.searchRepos.length > 0;
      if (!hasData) return TRENDING_NO_DATA[lang];
      console.log(`  [trending] Calling LLM for trend report...`);
      try {
        return await callLlm(buildTrendingPrompt(trendingData, dateStr, lang), 6144);
      } catch (err) {
        console.error(`  [trending] LLM call failed: ${err}`);
        return TRENDING_FAILED[lang];
      }
    })(),
  ]);

  return {
    toolDigests,
    flagshipSummary,
    peerDigests,
    showcaseSummary,
    trendingSummary,
    comparison: "",
    frameworkComparison: "",
  };
}

// ---------------------------------------------------------------------------
// Report content builders
// ---------------------------------------------------------------------------

interface ContentStrings {
  toolsTitle: string;
  toolsMeta: (utcStr: string, count: number) => string;
  toolsLink: string;
  comparison: string;
  showcase: string;
  showcaseSource: string;
  perTool: string;
  frameworksTitle: string;
  frameworksMeta: (utcStr: string, issues: number, prs: number, projects: number) => string;
  frameworksLink: string;
  flagshipDeepDive: (name: string) => string;
  frameworksComparison: string;
  peerReports: string;
}

const CONTENT: Record<Lang, ContentStrings> = {
  en: {
    toolsTitle: "Creative Coding Tools Digest",
    toolsMeta: (utcStr, count) => `> Generated: ${utcStr} UTC | Tools covered: ${count}`,
    toolsLink: "Source",
    comparison: "Cross-Tool Comparison",
    showcase: "Community Showcase",
    showcaseSource: "Source",
    perTool: "Per-Tool Reports",
    frameworksTitle: "Creative Coding Frameworks Digest",
    frameworksMeta: (utcStr, issues, prs, projects) =>
      `> Issues: ${issues} | PRs: ${prs} | Projects covered: ${projects} | Generated: ${utcStr} UTC`,
    frameworksLink: "Projects",
    flagshipDeepDive: (name) => `${name} Deep Dive`,
    frameworksComparison: "Cross-Framework Comparison",
    peerReports: "Peer Framework Reports",
  },
  pt: {
    toolsTitle: "Radar de Ferramentas Criativas",
    toolsMeta: (utcStr, count) => `> Gerado em: ${utcStr} UTC | Ferramentas cobertas: ${count}`,
    toolsLink: "Fonte",
    comparison: "Comparação entre ferramentas",
    showcase: "Vitrine da comunidade",
    showcaseSource: "Fonte",
    perTool: "Relatórios por ferramenta",
    frameworksTitle: "Radar de Frameworks Criativos",
    frameworksMeta: (utcStr, issues, prs, projects) =>
      `> Issues: ${issues} | PRs: ${prs} | Projetos cobertos: ${projects} | Gerado em: ${utcStr} UTC`,
    frameworksLink: "Projetos",
    flagshipDeepDive: (name) => `Análise aprofundada: ${name}`,
    frameworksComparison: "Comparação entre frameworks",
    peerReports: "Relatórios dos frameworks pares",
  },
  zh: {
    toolsTitle: "创意编程工具动态日报",
    toolsMeta: (utcStr, count) => `> 生成时间: ${utcStr} UTC | 覆盖工具: ${count} 个`,
    toolsLink: "数据来源",
    comparison: "横向对比",
    showcase: "社区展示",
    showcaseSource: "数据来源",
    perTool: "各工具详细报告",
    frameworksTitle: "创意编程框架生态日报",
    frameworksMeta: (utcStr, issues, prs, projects) =>
      `> Issues: ${issues} | PRs: ${prs} | 覆盖项目: ${projects} 个 | 生成时间: ${utcStr} UTC`,
    frameworksLink: "覆盖项目",
    flagshipDeepDive: (name) => `${name} 项目深度报告`,
    frameworksComparison: "横向生态对比",
    peerReports: "同赛道框架详细报告",
  },
};

function detailsBlock(name: string, repo: string, body: string): string {
  return [
    `<details>`,
    `<summary><strong>${name}</strong> — <a href="https://github.com/${repo}">${repo}</a></summary>`,
    ``,
    body,
    ``,
    `</details>`,
  ].join("\n");
}

function buildToolsReportContent(
  toolDigests: RepoDigest[],
  showcaseSummary: string,
  comparison: string,
  utcStr: string,
  dateStr: string,
  footer: string,
  lang: Lang,
): string {
  const t = CONTENT[lang];
  const repoLinks =
    toolDigests.map((d) => `- [${d.config.name}](https://github.com/${d.config.repo})`).join("\n") +
    `\n- [${config.showcaseRepo}](https://github.com/${config.showcaseRepo})`;

  return (
    `# ${t.toolsTitle} ${dateStr}\n\n` +
    `${t.toolsMeta(utcStr, toolDigests.length)}\n\n` +
    `${repoLinks}\n\n` +
    `---\n\n` +
    `## ${t.comparison}\n\n${comparison}\n\n` +
    `---\n\n` +
    `## ${t.showcase}\n\n> ${t.showcaseSource}: [${config.showcaseRepo}](https://github.com/${config.showcaseRepo})\n\n${showcaseSummary}\n\n` +
    `---\n\n` +
    `## ${t.perTool}\n\n` +
    toolDigests.map((d) => detailsBlock(d.config.name, d.config.repo, d.summary)).join("\n\n") +
    footer
  );
}

function buildFrameworksReportContent(
  flagshipFetch: RepoFetch,
  peerDigests: RepoDigest[],
  flagshipSummary: string,
  comparison: string,
  utcStr: string,
  dateStr: string,
  footer: string,
  lang: Lang,
): string {
  const t = CONTENT[lang];
  const { issues, prs } = flagshipFetch;
  const projectLinks =
    `- [${config.flagship.name}](https://github.com/${config.flagship.repo})\n` +
    config.peers.map((p) => `- [${p.name}](https://github.com/${p.repo})`).join("\n");

  return (
    `# ${t.frameworksTitle} ${dateStr}\n\n` +
    `${t.frameworksMeta(utcStr, issues.length, prs.length, 1 + config.peers.length)}\n\n` +
    `### ${t.frameworksLink}\n` +
    `${projectLinks}\n\n` +
    `---\n\n` +
    `## ${t.flagshipDeepDive(config.flagship.name)}\n\n${flagshipSummary}\n\n` +
    `---\n\n` +
    `## ${t.frameworksComparison}\n\n${comparison}\n\n` +
    `---\n\n` +
    `## ${t.peerReports}\n\n` +
    peerDigests.map((d) => detailsBlock(d.config.name, d.config.repo, d.summary)).join("\n\n") +
    footer
  );
}

// ---------------------------------------------------------------------------
// Report savers
// ---------------------------------------------------------------------------

async function saveNewsReport(
  newsResults: WebFetchResult[],
  webState: WebState,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: Lang,
  saveState: boolean,
): Promise<void> {
  const withNews = newsResults.filter((r) => r.newItems.length > 0);

  if (saveState) {
    saveWebState(webState);
    console.log("  [news] State saved.");
  }

  if (withNews.length === 0) {
    console.log(`  [news/${lang}] No new content detected, skipping report.`);
    return;
  }

  console.log(`  [news/${lang}] Calling LLM for the news report...`);
  try {
    const summary = await callLlm(buildNewsPrompt(newsResults, dateStr, lang), 8192);
    const isFirstRun = newsResults.some((r) => r.isFirstRun);
    const totalNew = newsResults.reduce((sum, r) => sum + r.newItems.length, 0);

    const headerLabels: Record<
      Lang,
      { title: string; mode: string; newItems: string; sources: string; generated: string }
    > = {
      en: {
        title: "Art & Creative Tool News",
        mode: isFirstRun ? "First full crawl" : "Today's update",
        newItems: "new items",
        sources: "Sources",
        generated: "Generated",
      },
      pt: {
        title: "Notícias de Arte e Ferramentas Criativas",
        mode: isFirstRun ? "Primeira coleta completa" : "Atualização de hoje",
        newItems: "novos itens",
        sources: "Fontes",
        generated: "Gerado em",
      },
      zh: {
        title: "艺术与创意工具资讯",
        mode: isFirstRun ? "首次全量" : "今日更新",
        newItems: "条新内容",
        sources: "数据来源",
        generated: "生成时间",
      },
    };
    const h = headerLabels[lang];

    const sourceLines = newsResults
      .map((r) =>
        r.error
          ? `- ${r.siteName} — ⚠️ ${r.error}`
          : `- ${r.siteName} — ${r.newItems.length} ${h.newItems} (feed total: ${r.totalDiscovered})`,
      )
      .join("\n");

    const content =
      `# ${h.title} ${dateStr}\n\n` +
      `> ${h.mode} | ${totalNew} ${h.newItems} | ${h.generated}: ${utcStr} UTC\n\n` +
      `${h.sources}:\n${sourceLines}\n\n` +
      `---\n\n` +
      summary +
      footer;

    const fileName = reportFileName("art-news", lang);
    console.log(`  Saved ${saveFile(content, dateStr, fileName)}`);

    if (digestRepo) {
      const issueTitles: Record<Lang, string> = {
        en: "Art & Creative Tool News",
        pt: "Notícias de Arte e Ferramentas Criativas",
        zh: "艺术与创意工具资讯",
      };
      const url = await createGitHubIssue(
        `${findReport("art-news")?.icon ?? "📰"} ${issueTitles[lang]} ${dateStr}`,
        content,
        issueLabel("art-news", lang),
        lang,
      );
      console.log(`  Created news issue (${lang}): ${url}`);
    }
  } catch (err) {
    console.error(`  [news/${lang}] Report generation failed: ${err}`);
  }
}

async function saveTrendingReport(
  trendingData: TrendingData,
  trendingSummary: string,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: Lang,
): Promise<void> {
  if (trendingData.trendingRepos.length === 0 && trendingData.searchRepos.length === 0) {
    console.log(`  [trending/${lang}] No data available, skipping report.`);
    return;
  }

  const t = findReport("art-trending")!;
  const header: Record<Lang, string> = {
    en: `# ${t.title.en} ${dateStr}\n\n> Sources: GitHub Trending (art-filtered) + GitHub Search API (art topics) | Generated: ${utcStr} UTC\n\n---\n\n`,
    pt: `# ${t.title.pt} ${dateStr}\n\n> Fontes: GitHub Trending (filtrado por arte) + GitHub Search API (tópicos de arte) | Gerado em: ${utcStr} UTC\n\n---\n\n`,
    zh: `# ${t.title.zh} ${dateStr}\n\n> 数据来源: GitHub Trending（艺术关键词筛选）+ GitHub Search API（艺术主题） | 生成时间: ${utcStr} UTC\n\n---\n\n`,
  };

  const content = header[lang] + trendingSummary + footer;
  const fileName = reportFileName(t.id, lang);
  console.log(`  Saved ${saveFile(content, dateStr, fileName)}`);

  if (digestRepo) {
    const url = await createGitHubIssue(
      `${t.icon} ${t.title[lang]} ${dateStr}`,
      content,
      issueLabel(t.id, lang),
      lang,
    );
    console.log(`  Created trending issue (${lang}): ${url}`);
  }
}

async function saveHnReport(
  hnData: HnData,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
  footer: string,
  lang: Lang,
): Promise<void> {
  if (!hnData.fetchSuccess) {
    console.log(`  [hn/${lang}] No data available, skipping report.`);
    return;
  }

  console.log(`  [hn/${lang}] Calling LLM for the HN report...`);
  try {
    const summary = await callLlm(buildHnPrompt(hnData, dateStr, lang));
    const t = findReport("art-hn")!;
    const header: Record<Lang, string> = {
      en: `# ${t.title.en} ${dateStr}\n\n> Source: [Hacker News](https://news.ycombinator.com/) | ${hnData.stories.length} stories from the last ${hnData.windowHours}h | Generated: ${utcStr} UTC\n\n---\n\n`,
      pt: `# ${t.title.pt} ${dateStr}\n\n> Fonte: [Hacker News](https://news.ycombinator.com/) | ${hnData.stories.length} posts das últimas ${hnData.windowHours}h | Gerado em: ${utcStr} UTC\n\n---\n\n`,
      zh: `# ${t.title.zh} ${dateStr}\n\n> 数据来源: [Hacker News](https://news.ycombinator.com/) | 过去 ${hnData.windowHours} 小时内 ${hnData.stories.length} 条 | 生成时间: ${utcStr} UTC\n\n---\n\n`,
    };

    const content = header[lang] + summary + footer;
    const fileName = reportFileName(t.id, lang);
    console.log(`  Saved ${saveFile(content, dateStr, fileName)}`);

    if (digestRepo) {
      const url = await createGitHubIssue(
        `${t.icon} ${t.title[lang]} ${dateStr}`,
        content,
        issueLabel(t.id, lang),
        lang,
      );
      console.log(`  Created HN issue (${lang}): ${url}`);
    }
  } catch (err) {
    console.error(`  [hn/${lang}] Report generation failed: ${err}`);
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  requireEnv("GITHUB_TOKEN");
  if (!hasLlmCredentials()) {
    throw new Error("Missing required environment variable: OPENAI_API_KEY");
  }

  const now = new Date();
  const since = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const dateStr = reportDate(now);
  const utcStr = now.toISOString().slice(0, 16).replace("T", " ");
  const digestRepo = process.env["DIGEST_REPO"] ?? "";
  const langs = enabledLanguages();

  console.log(`[${now.toISOString()}] Art Radar starting | endpoint: ${getLlmBaseUrl()}`);
  console.log(
    `  Report date: ${dateStr} (UTC${config.timezoneOffset >= 0 ? "+" : ""}${config.timezoneOffset})`,
  );
  console.log(`  Languages: ${langs.join(", ")}`);
  console.log(`  Daily reports: ${DAILY_REPORTS.map((r) => r.id).join(", ")}`);

  // 1. Fetch everything in parallel
  const webState = loadWebState();
  const { fetched, showcase, newsResults, trendingData, hnData } = await fetchAllData(since, webState);

  const toolIds = new Set(config.tools.map((t) => t.id));
  const peerIds = new Set(config.peers.map((p) => p.id));
  const toolFetches = fetched.filter((f) => toolIds.has(f.cfg.id));
  const peerFetches = fetched.filter((f) => peerIds.has(f.cfg.id));
  const flagshipFetch = fetched.find((f) => f.cfg.id === config.flagship.id);
  if (!flagshipFetch) throw new Error(`Flagship repo ${config.flagship.id} was not fetched`);

  // 2. Per-repo summaries + trend report, once per language
  const summariesByLang = new Map<Lang, Summaries>();
  await Promise.all(
    langs.map(async (lang) => {
      const summaries = await generateSummaries(
        toolFetches,
        flagshipFetch,
        peerFetches,
        showcase,
        trendingData,
        dateStr,
        lang,
      );
      summariesByLang.set(lang, summaries);
    }),
  );

  // 3. Cross-repo comparisons, once per language
  await Promise.all(
    langs.map(async (lang) => {
      const summaries = summariesByLang.get(lang);
      if (!summaries) return;
      const flagshipDigest: RepoDigest = {
        config: config.flagship,
        issues: flagshipFetch.issues,
        prs: flagshipFetch.prs,
        releases: flagshipFetch.releases,
        summary: summaries.flagshipSummary,
      };
      console.log(`  [${lang}] Generating comparison reports...`);
      const [comparison, frameworkComparison] = await Promise.all([
        callLlm(buildToolComparisonPrompt(summaries.toolDigests, dateStr, lang)).catch((err) => {
          console.error(`  [${lang}] tool comparison failed: ${err}`);
          return COMPARISON_FAILED[lang];
        }),
        callLlm(buildFrameworkComparisonPrompt(flagshipDigest, summaries.peerDigests, dateStr, lang)).catch(
          (err) => {
            console.error(`  [${lang}] framework comparison failed: ${err}`);
            return COMPARISON_FAILED[lang];
          },
        ),
      ]);
      summaries.comparison = comparison;
      summaries.frameworkComparison = frameworkComparison;
    }),
  );

  // 4. Build and save every report
  for (const lang of langs) {
    const summaries = summariesByLang.get(lang);
    if (!summaries) continue;
    const footer = autoGenFooter(lang);

    const toolsContent = buildToolsReportContent(
      summaries.toolDigests,
      summaries.showcaseSummary,
      summaries.comparison,
      utcStr,
      dateStr,
      footer,
      lang,
    );
    const frameworksContent = buildFrameworksReportContent(
      flagshipFetch,
      summaries.peerDigests,
      summaries.flagshipSummary,
      summaries.frameworkComparison,
      utcStr,
      dateStr,
      footer,
      lang,
    );

    console.log(`  Saved ${saveFile(toolsContent, dateStr, reportFileName("art-tools", lang))}`);
    console.log(`  Saved ${saveFile(frameworksContent, dateStr, reportFileName("art-frameworks", lang))}`);

    if (digestRepo) {
      const toolsDef = findReport("art-tools")!;
      const frameworksDef = findReport("art-frameworks")!;
      const toolsUrl = await createGitHubIssue(
        `${toolsDef.icon} ${toolsDef.title[lang]} ${dateStr}`,
        toolsContent,
        issueLabel(toolsDef.id, lang),
        lang,
      );
      console.log(`  Created tools issue (${lang}): ${toolsUrl}`);
      const frameworksUrl = await createGitHubIssue(
        `${frameworksDef.icon} ${frameworksDef.title[lang]} ${dateStr}`,
        frameworksContent,
        issueLabel(frameworksDef.id, lang),
        lang,
      );
      console.log(`  Created frameworks issue (${lang}): ${frameworksUrl}`);
    }
  }

  // 5. News, trending and HN reports (state is written with the first language)
  await Promise.all(
    langs.map((lang, index) =>
      saveNewsReport(
        newsResults,
        webState,
        utcStr,
        dateStr,
        digestRepo,
        autoGenFooter(lang),
        lang,
        index === 0,
      ),
    ),
  );

  await Promise.all(
    langs.flatMap((lang) => {
      const summaries = summariesByLang.get(lang);
      if (!summaries) return [];
      const footer = autoGenFooter(lang);
      return [
        saveTrendingReport(
          trendingData,
          summaries.trendingSummary,
          utcStr,
          dateStr,
          digestRepo,
          footer,
          lang,
        ),
        saveHnReport(hnData, utcStr, dateStr, digestRepo, footer, lang),
      ];
    }),
  );

  console.log("Done!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
