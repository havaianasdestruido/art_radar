/**
 * GitHub trending and art-topic search data fetching.
 *
 * Two sources feed the "Generative Art Open Source Trends" report:
 *   1. github.com/trending (HTML) — pre-filtered by art keywords so the LLM
 *      only sees repos that plausibly belong to the creative-coding beat.
 *   2. GitHub Search API — one query per configured art topic tag.
 */

import type { TrendingTopic } from "./config.ts";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TrendingRepo {
  fullName: string;
  description: string;
  language: string;
  todayStars: number;
  totalStars: number;
  forks: number;
  url: string;
}

export interface SearchRepo {
  fullName: string;
  description: string | null;
  language: string | null;
  stargazersCount: number;
  pushedAt: string;
  url: string;
  searchQuery: string;
}

export interface TrendingData {
  /** Trending repos that matched the art keyword pre-filter. */
  trendingRepos: TrendingRepo[];
  /** How many repos the trending page listed in total (before filtering). */
  trendingTotal: number;
  searchRepos: SearchRepo[];
  trendingFetchSuccess: boolean;
}

// ---------------------------------------------------------------------------
// Keyword matching (word-boundary based, so "art" ≠ "artificial")
// ---------------------------------------------------------------------------

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function matchesKeywords(text: string, keywords: string[]): boolean {
  const haystack = text.toLowerCase();
  return keywords.some((k) => {
    const needle = k.toLowerCase().trim();
    if (!needle) return false;
    if (!/^[\w .-]+$/.test(needle)) return haystack.includes(needle);
    return new RegExp(`(?<!\\w)${escapeRegex(needle)}(?!\\w)`).test(haystack);
  });
}

// ---------------------------------------------------------------------------
// GitHub Trending HTML fetch
// ---------------------------------------------------------------------------

/** Repos kept from the trending page when the keyword filter matches. */
const MAX_TRENDING_KEPT = 25;
/** Repos kept when the keyword filter matches nothing usable. */
const TRENDING_FALLBACK = 10;

async function fetchGitHubTrending(): Promise<{ repos: TrendingRepo[]; success: boolean }> {
  try {
    const resp = await fetch("https://github.com/trending?since=daily&spoken_language_code=", {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; art-radar/1.0)",
        Accept: "text/html",
      },
    });
    if (!resp.ok) {
      console.error(`  [trending] HTTP ${resp.status} fetching github.com/trending`);
      return { repos: [], success: false };
    }

    const html = await resp.text();
    const repos: TrendingRepo[] = [];

    // Split by article blocks
    const articlePattern =
      /<article[^>]*class="[^"]*Box-row[^"]*"[\s\S]*?(?=<article[^>]*class="[^"]*Box-row[^"]*"|$)/g;
    const blocks = html.match(articlePattern) ?? [];

    for (const block of blocks) {
      try {
        // fullName from <h2> > <a href="/owner/repo">
        const nameMatch = block.match(/<h2[^>]*>[\s\S]*?<a[^>]+href="\/([^/"]+\/[^/"]+)"/);
        if (!nameMatch?.[1]) continue;
        const fullName = nameMatch[1].trim();

        // description from col-9 paragraph
        const descMatch = block.match(/<p[^>]*class="[^"]*col-9[^"]*"[^>]*>([\s\S]*?)<\/p>/);
        const description = descMatch?.[1] ? descMatch[1].replace(/<[^>]+>/g, "").trim() : "";

        // language
        const langMatch = block.match(/<span[^>]+itemprop="programmingLanguage"[^>]*>([\s\S]*?)<\/span>/);
        const language = langMatch?.[1] ? langMatch[1].replace(/<[^>]+>/g, "").trim() : "";

        // today stars
        const todayMatch = block.match(/([\d,]+)\s+stars?\s+today/i);
        const todayStars = todayMatch?.[1] ? parseInt(todayMatch[1].replace(/,/g, ""), 10) : 0;

        // total stars — look for link with /stargazers
        const totalMatch = block.match(/href="\/[^"]+\/stargazers"[^>]*>\s*<[^>]+>\s*([\d,]+)/);
        const totalStars = totalMatch?.[1] ? parseInt(totalMatch[1].replace(/,/g, ""), 10) : 0;

        // forks
        const forkMatch = block.match(/href="\/[^"]+\/forks"[^>]*>\s*<[^>]+>\s*([\d,]+)/);
        const forks = forkMatch?.[1] ? parseInt(forkMatch[1].replace(/,/g, ""), 10) : 0;

        repos.push({
          fullName,
          description,
          language,
          todayStars,
          totalStars,
          forks,
          url: `https://github.com/${fullName}`,
        });
      } catch {
        // single block parse failure is non-fatal
      }
    }

    if (repos.length === 0) {
      console.error("  [trending] Parsed 0 repos — HTML structure may have changed");
      return { repos: [], success: false };
    }

    console.log(`  [trending] Parsed ${repos.length} trending repos from HTML`);
    return { repos, success: true };
  } catch (err) {
    console.error(`  [trending] Fetch failed: ${err}`);
    return { repos: [], success: false };
  }
}

// ---------------------------------------------------------------------------
// GitHub Search API — one query per art topic
// ---------------------------------------------------------------------------

interface SearchApiItem {
  full_name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  html_url: string;
}

interface SearchApiResponse {
  items: SearchApiItem[];
}

/** Repos requested per topic query. */
const PER_TOPIC = 10;

async function searchArtRepos(topics: TrendingTopic[], sevenDaysAgo: string): Promise<SearchRepo[]> {
  const token = process.env["GITHUB_TOKEN"] ?? "";
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const seen = new Set<string>();
  const all: SearchRepo[] = [];

  await Promise.all(
    topics.map(async ({ tag, label }) => {
      try {
        const query = `topic:${tag}+pushed:>${sevenDaysAgo}&sort=stars&order=desc`;
        const url = `https://api.github.com/search/repositories?q=${query}&per_page=${PER_TOPIC}`;
        const resp = await fetch(url, { headers });
        if (!resp.ok) {
          console.error(`  [trending/search] "${label}": HTTP ${resp.status}`);
          return;
        }
        const data = (await resp.json()) as SearchApiResponse;
        let added = 0;
        for (const item of data.items ?? []) {
          if (!seen.has(item.full_name)) {
            seen.add(item.full_name);
            all.push({
              fullName: item.full_name,
              description: item.description,
              language: item.language,
              stargazersCount: item.stargazers_count,
              pushedAt: item.pushed_at,
              url: item.html_url,
              searchQuery: label,
            });
            added++;
          }
        }
        console.log(`  [trending/search] "${label}": ${added} new repos`);
      } catch (err) {
        console.error(`  [trending/search] "${label}": ${err}`);
      }
    }),
  );

  return all;
}

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export async function fetchTrendingData(topics: TrendingTopic[], keywords: string[]): Promise<TrendingData> {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  const [{ repos: trendingRaw, success }, searchRepos] = await Promise.all([
    fetchGitHubTrending(),
    searchArtRepos(topics, sevenDaysAgo),
  ]);

  const matched = trendingRaw.filter((r) => matchesKeywords(`${r.fullName} ${r.description}`, keywords));
  const trendingRepos =
    matched.length >= 3 ? matched.slice(0, MAX_TRENDING_KEPT) : trendingRaw.slice(0, TRENDING_FALLBACK);

  console.log(
    `  [trending] ${matched.length}/${trendingRaw.length} trending repos matched art keywords ` +
      `(sending ${trendingRepos.length})`,
  );

  return {
    trendingRepos,
    trendingTotal: trendingRaw.length,
    searchRepos,
    trendingFetchSuccess: success,
  };
}
