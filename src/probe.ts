/**
 * Source health check — `pnpm probe`.
 *
 * Verifies every source configured in config.yml before (or after) changing it:
 *   - tracked GitHub repos: reachable, issues enabled, not archived, recent activity
 *   - art topics: how many repos were active in the last 7 days
 *   - Hacker News queries: how many art stories the filter keeps in the last 24 h
 *   - news feeds: reachable and how many entries / how fresh
 *
 * Nothing is written to digests/ — the probe never touches the real state file.
 */

import { loadConfig } from "./config.ts";
import { parseFeed } from "./web.ts";
import { matchesKeywords } from "./trending.ts";

const TOKEN = process.env["GITHUB_TOKEN"] ?? process.env["GH_TOKEN"] ?? "";

const OK = "✅";
const WARN = "⚠️ ";
const FAIL = "❌";

let failures = 0;

function headers(): Record<string, string> {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "art-radar-probe/1.0",
  };
  if (TOKEN) h["Authorization"] = `Bearer ${TOKEN}`;
  return h;
}

async function checkRepo(id: string, repo: string): Promise<void> {
  try {
    const resp = await fetch(`https://api.github.com/repos/${repo}`, { headers: headers() });
    if (!resp.ok) {
      failures++;
      console.log(`${FAIL} ${id.padEnd(18)} ${repo} — HTTP ${resp.status}`);
      return;
    }
    const data = (await resp.json()) as {
      archived: boolean;
      has_issues: boolean;
      stargazers_count: number;
      pushed_at: string;
      open_issues_count: number;
    };
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const searchResp = await fetch(
      `https://api.github.com/search/issues?q=repo:${repo}+updated:>${since}&per_page=1`,
      { headers: headers() },
    );
    const updatedToday = searchResp.ok
      ? ((await searchResp.json()) as { total_count: number }).total_count
      : -1;

    const notes: string[] = [];
    if (data.archived) {
      notes.push("ARCHIVED");
      failures++;
    }
    if (!data.has_issues) notes.push("issues disabled");
    if (updatedToday === 0) notes.push("no updates in 24h");
    console.log(
      `${notes.some((n) => n === "ARCHIVED") ? FAIL : notes.length ? WARN : OK} ` +
        `${id.padEnd(18)} ${repo} — ${data.stargazers_count}★, ${data.open_issues_count} open, ` +
        `${updatedToday >= 0 ? `${updatedToday} items updated in 24h` : "activity unknown"}` +
        `${notes.length ? ` (${notes.join(", ")})` : ""}`,
    );
  } catch (err) {
    failures++;
    console.log(`${FAIL} ${id.padEnd(18)} ${repo} — ${err}`);
  }
}

async function checkTopic(tag: string): Promise<void> {
  try {
    const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const resp = await fetch(
      `https://api.github.com/search/repositories?q=topic:${tag}+pushed:>${since}&per_page=1`,
      { headers: headers() },
    );
    if (!resp.ok) {
      console.log(`${WARN} topic:${tag.padEnd(24)} HTTP ${resp.status}`);
      return;
    }
    const data = (await resp.json()) as { total_count: number };
    const mark = data.total_count > 0 ? OK : WARN;
    console.log(`${mark} topic:${tag.padEnd(24)} ${data.total_count} repos active in the last 7 days`);
  } catch (err) {
    console.log(`${WARN} topic:${tag.padEnd(24)} ${err}`);
  }
}

async function checkHnQuery(query: string, keywords: string[]): Promise<void> {
  try {
    const since = Math.floor((Date.now() - 24 * 60 * 60 * 1000) / 1000);
    const url =
      `https://hn.algolia.com/api/v1/search_by_date?tags=story&query=${encodeURIComponent(query)}` +
      `&numericFilters=created_at_i>${since}&hitsPerPage=50`;
    const resp = await fetch(url, { headers: { "User-Agent": "art-radar-probe/1.0" } });
    if (!resp.ok) {
      console.log(`${WARN} hn:${query.padEnd(27)} HTTP ${resp.status}`);
      return;
    }
    const data = (await resp.json()) as { hits: Array<{ title: string }> };
    const kept = data.hits.filter((h) => matchesKeywords(h.title ?? "", keywords)).length;
    const mark = kept > 0 ? OK : WARN;
    console.log(`${mark} hn:${query.padEnd(27)} ${kept}/${data.hits.length} hits kept by the art filter`);
  } catch (err) {
    console.log(`${WARN} hn:${query.padEnd(27)} ${err}`);
  }
}

async function checkFeed(id: string, name: string, feed: string): Promise<void> {
  try {
    const resp = await fetch(feed, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; art-radar-probe/1.0)",
        Accept: "application/xml,*/*",
      },
    });
    if (!resp.ok) {
      failures++;
      console.log(`${FAIL} feed:${id.padEnd(25)} ${name} — HTTP ${resp.status}`);
      return;
    }
    const xml = await resp.text();
    const entries = parseFeed(xml);
    if (entries.length === 0) {
      failures++;
      console.log(`${FAIL} feed:${id.padEnd(25)} ${name} — no entries parsed (HTML instead of XML?)`);
      return;
    }
    const newest = entries
      .map((e) => new Date(e.date).getTime())
      .filter((t) => !Number.isNaN(t))
      .sort((a, b) => b - a)[0];
    const ageDays = newest ? Math.round((Date.now() - newest) / 86_400_000) : -1;
    console.log(
      `${OK} feed:${id.padEnd(25)} ${name} — ${entries.length} entries, newest ${ageDays >= 0 ? `${ageDays}d old` : "date unknown"}`,
    );
  } catch (err) {
    failures++;
    console.log(`${FAIL} feed:${id.padEnd(25)} ${name} — ${err}`);
  }
}

async function checkSitemap(id: string, name: string, sitemap: string): Promise<void> {
  try {
    const resp = await fetch(sitemap, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; art-radar-probe/1.0)",
        Accept: "application/xml,*/*",
      },
    });
    if (!resp.ok) {
      failures++;
      console.log(`${FAIL} sitemap:${id.padEnd(21)} ${name} — HTTP ${resp.status}`);
      return;
    }
    const xml = await resp.text();
    const count = (xml.match(/<url>/g) ?? []).length;
    console.log(`${count > 0 ? OK : WARN} sitemap:${id.padEnd(21)} ${name} — ${count} URLs`);
  } catch (err) {
    failures++;
    console.log(`${FAIL} sitemap:${id.padEnd(21)} ${name} — ${err}`);
  }
}

async function main(): Promise<void> {
  const config = loadConfig();

  console.log(`\nArt Radar probe — checking every configured source\n`);
  console.log(`GitHub token: ${TOKEN ? "present" : "⚠️  missing (rate limits will be low)"}\n`);

  console.log("── Tracked repositories ─────────────────────────────────────────────");
  for (const tool of config.tools) await checkRepo(tool.id, tool.repo);
  await checkRepo(config.flagship.id, config.flagship.repo);
  for (const peer of config.peers) await checkRepo(peer.id, peer.repo);
  await checkRepo("showcase", config.showcaseRepo);

  console.log("\n── GitHub art topics ────────────────────────────────────────────────");
  for (const topic of config.trendingTopics) await checkTopic(topic.tag);

  console.log("\n── Hacker News queries ──────────────────────────────────────────────");
  for (const query of config.hnQueries) await checkHnQuery(query, config.hnKeywords);

  console.log("\n── News sources ─────────────────────────────────────────────────────");
  for (const site of config.webSites) {
    if (site.feed) await checkFeed(site.id, site.name, site.feed);
    else if (site.sitemap) await checkSitemap(site.id, site.name, site.sitemap);
  }

  console.log(
    `\nProbe finished: ${failures === 0 ? "all sources healthy ✅" : `${failures} source(s) failed ❌`}\n`,
  );
  if (failures > 0) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
