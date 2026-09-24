/**
 * Art & creative-coding stories from Hacker News, fetched via the Algolia
 * HN Search API.
 *
 * HN is a general tech forum, so two filters keep the report on-topic:
 *   1. queries are art-specific (generative art, shaders, plotters, …)
 *   2. every title must match an art keyword list before it is reported
 *
 * Because art stories are sparser than AI stories, the search window starts at
 * 24 h and widens to 72 h when too few hits survive the filter. The window that
 * was actually used is returned so the report can say so.
 */

import { matchesKeywords } from "./trending.ts";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface HnStory {
  id: string;
  title: string;
  url: string; // external URL, or HN discussion link if no external URL
  hnUrl: string; // always the HN discussion link
  points: number;
  comments: number;
  author: string;
  createdAt: string;
}

export interface HnData {
  stories: HnStory[];
  fetchSuccess: boolean;
  /** Window actually used, in hours (24 or 72). */
  windowHours: number;
  /** Unique stories seen before keyword filtering. */
  scanned: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HN_TOP_STORIES = 25;
const WINDOW_HOURS = 24;
const WINDOW_HOURS_FALLBACK = 72;
/** Widen the window when fewer than this many art stories were found. */
const MIN_STORIES = 6;
const HITS_PER_PAGE = 30;

// ---------------------------------------------------------------------------
// Algolia API types
// ---------------------------------------------------------------------------

interface AlgoliaHit {
  objectID: string;
  title: string;
  url?: string;
  points: number;
  num_comments: number;
  author: string;
  created_at: string;
}

interface AlgoliaResponse {
  hits: AlgoliaHit[];
}

// ---------------------------------------------------------------------------
// Fetch
// ---------------------------------------------------------------------------

async function searchHn(queries: string[], sinceHours: number): Promise<Map<string, HnStory>> {
  const since = Math.floor((Date.now() - sinceHours * 60 * 60 * 1000) / 1000);
  const seen = new Map<string, HnStory>();

  await Promise.all(
    queries.map(async (q) => {
      try {
        const url =
          `https://hn.algolia.com/api/v1/search_by_date` +
          `?tags=story` +
          `&query=${encodeURIComponent(q)}` +
          `&numericFilters=created_at_i>${since}` +
          `&hitsPerPage=${HITS_PER_PAGE}`;
        const resp = await fetch(url, { headers: { "User-Agent": "art-radar/1.0" } });
        if (!resp.ok) {
          console.error(`  [hn] "${q}": HTTP ${resp.status}`);
          return;
        }
        const data = (await resp.json()) as AlgoliaResponse;
        for (const hit of data.hits ?? []) {
          if (!seen.has(hit.objectID)) {
            const hnUrl = `https://news.ycombinator.com/item?id=${hit.objectID}`;
            seen.set(hit.objectID, {
              id: hit.objectID,
              title: hit.title,
              url: hit.url ?? hnUrl,
              hnUrl,
              points: hit.points ?? 0,
              comments: hit.num_comments ?? 0,
              author: hit.author,
              createdAt: hit.created_at,
            });
          }
        }
      } catch (err) {
        console.error(`  [hn] "${q}": ${err}`);
      }
    }),
  );

  return seen;
}

function rank(seen: Map<string, HnStory>, keywords: string[]): HnStory[] {
  return [...seen.values()]
    .filter((s) => matchesKeywords(s.title, keywords))
    .sort((a, b) => b.points - a.points)
    .slice(0, HN_TOP_STORIES);
}

export async function fetchHnData(queries: string[], keywords: string[]): Promise<HnData> {
  try {
    let windowHours = WINDOW_HOURS;
    let seen = await searchHn(queries, windowHours);
    let stories = rank(seen, keywords);

    if (stories.length < MIN_STORIES) {
      console.log(
        `  [hn] only ${stories.length} art stories in the last ${WINDOW_HOURS}h — widening to ${WINDOW_HOURS_FALLBACK}h`,
      );
      windowHours = WINDOW_HOURS_FALLBACK;
      seen = await searchHn(queries, windowHours);
      stories = rank(seen, keywords);
    }

    console.log(
      `  [hn] ${stories.length} art stories kept (from ${seen.size} unique hits in ${windowHours}h)`,
    );
    return { stories, fetchSuccess: stories.length > 0, windowHours, scanned: seen.size };
  } catch (err) {
    console.error(`  [hn] fetch failed: ${err}`);
    return { stories: [], fetchSuccess: false, windowHours: WINDOW_HOURS, scanned: 0 };
  }
}
