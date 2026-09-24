/**
 * News fetching for the "Art & Creative Tool News" report.
 *
 * Every source is declared in config.yml. Two discovery modes are supported:
 *
 *   feed     — RSS 2.0 / Atom. Preferred: the article text comes with the feed,
 *              so there is no per-article page fetch and no bot wall.
 *   sitemap  — for sites without a feed. `lastmod` tells us what changed, and
 *              the article body is fetched from the page itself unless
 *              `metadata_only: true` is set (some sites 403 datacenter IPs).
 *
 * For both modes the state file (`digests/web-state.json`) records every URL
 * we have ever seen, so a run only reports what is genuinely new.
 */

import fs from "node:fs";
import path from "node:path";
import type { WebSiteConfig } from "./config.ts";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface WebPageItem {
  url: string;
  title: string;
  lastmod: string;
  content: string;
  /** Site id from config.yml. */
  site: string;
  category: string;
}

interface SiteState {
  lastChecked: string;
  /** url → lastmod string (or "seen" if no lastmod available) */
  seenUrls: Record<string, string>;
}

export interface WebState {
  version: number;
  sites: Record<string, SiteState>;
}

export interface WebFetchResult {
  site: string;
  siteName: string;
  isFirstRun: boolean;
  newItems: WebPageItem[];
  /** Total URLs/entries discovered in the feed or sitemap */
  totalDiscovered: number;
  /** Set when the source could not be read at all. */
  error?: string;
}

// ---------------------------------------------------------------------------
// Tunables
// ---------------------------------------------------------------------------

/** Max articles reported per site on the very first run. */
const MAX_ITEMS_FIRST_RUN = 12;
/** Max articles reported per site on incremental runs. */
const MAX_ITEMS_PER_RUN = 15;
/** Characters of article text forwarded to the LLM per item. */
const MAX_CONTENT_LENGTH = 1_500;
/** Polite delay between individual page GETs (ms). */
const FETCH_DELAY_MS = 300;
/** Per-request timeout (ms). */
const FETCH_TIMEOUT_MS = 10_000;

const WEB_HEADERS = {
  "User-Agent": "Mozilla/5.0 (compatible; art-radar/1.0; +https://github.com/havaianasdestruido/art_radar)",
  Accept: "text/html,application/xml,text/xml,application/rss+xml,application/atom+xml,*/*",
  "Accept-Language": "en-US,en;q=0.9",
};

// ---------------------------------------------------------------------------
// HTTP helpers
// ---------------------------------------------------------------------------

async function httpGet(url: string): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const resp = await fetch(url, { headers: WEB_HEADERS, signal: controller.signal });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    return await resp.text();
  } finally {
    clearTimeout(timer);
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;/g, "’")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCodePoint(parseInt(code, 16)));
}

/**
 * Turn feed/HTML content into plain text. Entities are decoded *before* tag
 * stripping: feeds routinely ship escaped HTML (`&lt;p&gt;…`), which would
 * otherwise survive as literal markup.
 */
function stripHtml(html: string, limit = MAX_CONTENT_LENGTH): string {
  return decodeEntities(html)
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, limit);
}

function cdata(raw: string): string {
  return raw
    .replace(/<!\[CDATA\[/g, "")
    .replace(/\]\]>/g, "")
    .trim();
}

// ---------------------------------------------------------------------------
// Feed parsing (RSS 2.0 + Atom)
// ---------------------------------------------------------------------------

export interface FeedEntry {
  url: string;
  title: string;
  date: string;
  content: string;
}

function firstMatch(block: string, patterns: RegExp[]): string {
  for (const pattern of patterns) {
    const match = block.match(pattern);
    if (match?.[1]) return cdata(match[1]);
  }
  return "";
}

/** Parse an RSS 2.0 / Atom document into feed entries. Exported for `pnpm probe`. */
export function parseFeed(xml: string): FeedEntry[] {
  const blocks = [
    ...(xml.match(/<item[\s>][\s\S]*?<\/item>/gi) ?? []),
    ...(xml.match(/<entry[\s>][\s\S]*?<\/entry>/gi) ?? []),
  ];

  return blocks
    .map((block): FeedEntry | null => {
      const title = stripHtml(firstMatch(block, [/<title[^>]*>([\s\S]*?)<\/title>/i]), 200);
      const link = firstMatch(block, [
        /<link[^>]*href=["']([^"']+)["'][^>]*\/?>/i,
        /<link[^>]*>([\s\S]*?)<\/link>/i,
        /<guid[^>]*>([\s\S]*?)<\/guid>/i,
      ]);
      if (!link || !/^https?:\/\//.test(link)) return null;
      const date = firstMatch(block, [
        /<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i,
        /<updated[^>]*>([\s\S]*?)<\/updated>/i,
        /<published[^>]*>([\s\S]*?)<\/published>/i,
        /<dc:date[^>]*>([\s\S]*?)<\/dc:date>/i,
      ]);
      const rawContent = firstMatch(block, [
        /<content:encoded[^>]*>([\s\S]*?)<\/content:encoded>/i,
        /<content[^>]*>([\s\S]*?)<\/content>/i,
        /<description[^>]*>([\s\S]*?)<\/description>/i,
        /<summary[^>]*>([\s\S]*?)<\/summary>/i,
      ]);
      return { url: link, title: title || link, date, content: stripHtml(rawContent) };
    })
    .filter((e): e is FeedEntry => e !== null);
}

function toIsoDate(raw: string): string {
  if (!raw) return "";
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? raw : parsed.toISOString();
}

// ---------------------------------------------------------------------------
// Sitemap parsing (plain-text XML; no DOM needed)
// ---------------------------------------------------------------------------

function parseSitemapUrls(xml: string): Array<{ loc: string; lastmod?: string }> {
  const results: Array<{ loc: string; lastmod?: string }> = [];
  for (const block of xml.match(/<url>[\s\S]*?<\/url>/g) ?? []) {
    const loc = block.match(/<loc>\s*(.*?)\s*<\/loc>/)?.[1];
    const lastmod = block.match(/<lastmod>\s*(.*?)\s*<\/lastmod>/)?.[1];
    if (loc) results.push({ loc, lastmod });
  }
  return results;
}

function isSitemapIndex(xml: string): boolean {
  return /<sitemapindex[\s>]/.test(xml);
}

function extractTitle(html: string): string {
  return (
    html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']{1,200})["']/i)?.[1] ??
    html.match(/<meta[^>]+content=["']([^"']{1,200})["'][^>]+property=["']og:title["']/i)?.[1] ??
    html.match(/<title[^>]*>([^<]{1,200})<\/title>/i)?.[1] ??
    ""
  ).trim();
}

function extractText(html: string): string {
  // Prefer <main> or <article> to avoid nav/header/footer boilerplate
  const source =
    html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] ??
    html.match(/<article[^>]*>([\s\S]*?)<\/article>/i)?.[1] ??
    html;
  return stripHtml(source);
}

function urlCategory(url: string): string {
  try {
    const parts = new URL(url).pathname.split("/").filter(Boolean);
    return parts.slice(0, 2).join("/") || "article";
  } catch {
    return "article";
  }
}

/** Derive a human-readable title from the last URL path segment. */
function titleFromUrl(url: string): string {
  try {
    const slug = new URL(url).pathname.split("/").filter(Boolean).pop() ?? "";
    return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  } catch {
    return url;
  }
}

// ---------------------------------------------------------------------------
// State persistence
// ---------------------------------------------------------------------------

const STATE_FILE = path.join("digests", "web-state.json");
const STATE_VERSION = 2;

export function loadWebState(): WebState {
  try {
    const parsed = JSON.parse(fs.readFileSync(STATE_FILE, "utf-8")) as WebState;
    if (parsed?.sites) return parsed;
  } catch {
    // fall through to an empty state
  }
  return { version: STATE_VERSION, sites: {} };
}

export function saveWebState(state: WebState): void {
  fs.mkdirSync(path.dirname(STATE_FILE), { recursive: true });
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), "utf-8");
}

function siteState(state: WebState, id: string): SiteState {
  const existing = state.sites[id];
  if (existing) return existing;
  const fresh: SiteState = { lastChecked: "", seenUrls: {} };
  state.sites[id] = fresh;
  return fresh;
}

// ---------------------------------------------------------------------------
// Per-mode discovery
// ---------------------------------------------------------------------------

async function discoverFromFeed(cfg: WebSiteConfig): Promise<FeedEntry[]> {
  const xml = await httpGet(cfg.feed!);
  const entries = parseFeed(xml);
  if (entries.length === 0) throw new Error("feed contained no items (HTML page instead of XML?)");
  return entries;
}

async function discoverFromSitemap(cfg: WebSiteConfig): Promise<Array<{ loc: string; lastmod?: string }>> {
  const results: Array<{ loc: string; lastmod?: string }> = [];

  if (cfg.subSitemapNames && cfg.subSitemapTemplate) {
    for (const name of cfg.subSitemapNames) {
      const subUrl = cfg.subSitemapTemplate.replace("{name}", name);
      try {
        const xml = await httpGet(subUrl);
        results.push(...parseSitemapUrls(xml));
        await sleep(100);
      } catch (err) {
        console.error(`  [news/${cfg.id}] sub-sitemap "${name}" failed: ${err}`);
      }
    }
    return results;
  }

  const xml = await httpGet(cfg.sitemap!);
  const all = isSitemapIndex(xml) ? [] : parseSitemapUrls(xml);
  const prefixes = cfg.prefixes ?? [];
  return all.filter(({ loc }) => {
    if (prefixes.length === 0) return true;
    try {
      return prefixes.some((p) => new URL(loc).pathname.startsWith(p));
    } catch {
      return false;
    }
  });
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export async function fetchSiteContent(cfg: WebSiteConfig, state: WebState): Promise<WebFetchResult> {
  const prev = siteState(state, cfg.id);
  const isFirstRun = Object.keys(prev.seenUrls).length === 0;
  const cap = cfg.maxItems ?? (isFirstRun ? MAX_ITEMS_FIRST_RUN : MAX_ITEMS_PER_RUN);

  try {
    let discovered: Array<{ url: string; title: string; date: string; content: string }> = [];

    if (cfg.feed) {
      console.log(`  [news/${cfg.id}] Reading feed ${cfg.feed}`);
      const entries = await discoverFromFeed(cfg);
      discovered = entries.map((e) => ({
        url: e.url,
        title: e.title,
        date: toIsoDate(e.date),
        content: e.content,
      }));
    } else if (cfg.sitemap) {
      console.log(`  [news/${cfg.id}] Discovering URLs from sitemap`);
      const urls = await discoverFromSitemap(cfg);
      // Newest first
      urls.sort((a, b) => (b.lastmod ?? "").localeCompare(a.lastmod ?? ""));
      const fresh = urls.filter(({ loc, lastmod }) => {
        const seen = prev.seenUrls[loc];
        if (!seen) return true;
        return Boolean(lastmod && lastmod > seen);
      });
      const toFetch = fresh.slice(0, cap);

      if (cfg.metadataOnly) {
        discovered = toFetch.map(({ loc, lastmod }) => ({
          url: loc,
          title: titleFromUrl(loc),
          date: lastmod ?? "",
          content: "",
        }));
      } else {
        for (const { loc, lastmod } of toFetch) {
          try {
            const html = await httpGet(loc);
            discovered.push({
              url: loc,
              title: extractTitle(html) || titleFromUrl(loc),
              date: lastmod ?? "",
              content: extractText(html),
            });
          } catch (err) {
            console.error(`  [news/${cfg.id}] Failed to fetch ${loc}: ${err}`);
          }
          await sleep(FETCH_DELAY_MS);
        }
      }

      // Mark every discovered URL as seen so later runs stay incremental
      for (const { loc, lastmod } of urls) prev.seenUrls[loc] = lastmod ?? "seen";
      prev.lastChecked = new Date().toISOString();

      console.log(
        `  [news/${cfg.id}] ${isFirstRun ? "First run" : "Incremental"}: ` +
          `${fresh.length} new of ${urls.length} URLs, reporting ${discovered.length}`,
      );

      return {
        site: cfg.id,
        siteName: cfg.name,
        isFirstRun,
        newItems: discovered.map((d) => ({
          ...d,
          lastmod: d.date,
          site: cfg.id,
          category: urlCategory(d.url),
        })),
        totalDiscovered: urls.length,
      };
    }

    // Feed mode: filter by seen URLs, then cap
    const fresh = discovered.filter((d) => !prev.seenUrls[d.url]);
    const reported = fresh.slice(0, cap);

    for (const entry of discovered) {
      prev.seenUrls[entry.url] = entry.date || "seen";
    }
    prev.lastChecked = new Date().toISOString();

    console.log(
      `  [news/${cfg.id}] ${isFirstRun ? "First run" : "Incremental"}: ` +
        `${fresh.length} new of ${discovered.length} feed entries, reporting ${reported.length}`,
    );

    return {
      site: cfg.id,
      siteName: cfg.name,
      isFirstRun,
      newItems: reported.map((d) => ({
        ...d,
        lastmod: d.date,
        site: cfg.id,
        category: "news",
      })),
      totalDiscovered: discovered.length,
    };
  } catch (err) {
    console.error(`  [news/${cfg.id}] fetch failed: ${err}`);
    return {
      site: cfg.id,
      siteName: cfg.name,
      isFirstRun: false,
      newItems: [],
      totalDiscovered: 0,
      error: String(err),
    };
  }
}
