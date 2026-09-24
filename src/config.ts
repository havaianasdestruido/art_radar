/**
 * Loads and validates Art Radar configuration from config.yml.
 *
 * Everything the radar tracks lives in config.yml — artist tools, creative
 * coding frameworks, the community showcase repo, GitHub topics, Hacker News
 * queries and the blogs/feeds used by the news report. The built-in defaults
 * below are used when config.yml (or a section inside it) is missing.
 */

import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import type { RepoConfig } from "./github.ts";
import type { Lang } from "./lang.ts";
import { isLang } from "./lang.ts";

// ---------------------------------------------------------------------------
// Schema types
// ---------------------------------------------------------------------------

interface RawRepoEntry {
  id: string;
  repo: string;
  name: string;
  paginated?: boolean;
}

interface RawTopicEntry {
  tag: string;
  label?: string;
}

interface RawWebSite {
  id: string;
  name: string;
  /** RSS/Atom feed URL. Preferred source — most art-tool blogs are WordPress. */
  feed?: string;
  /** Sitemap URL, used when a site has no feed. */
  sitemap?: string;
  /** Sitemap mode: keep only URLs whose path starts with one of these. */
  prefixes?: string[];
  /** Sitemap-index mode: named sub-sitemaps to fetch. */
  sub_sitemap_names?: string[];
  /** Sitemap-index mode: URL template, `{name}` is replaced per sub-sitemap. */
  sub_sitemap_template?: string;
  /** Skip fetching article pages and rely on sitemap/feed metadata only. */
  metadata_only?: boolean;
  /** Max items reported per run (defaults to the built-in cap). */
  max_items?: number;
}

interface RawConfig {
  tools?: RawRepoEntry[];
  flagship?: RawRepoEntry;
  peers?: RawRepoEntry[];
  showcase_repo?: string;
  showcase_name?: string;
  trending_topics?: Array<string | RawTopicEntry>;
  hn_queries?: string[];
  hn_keywords?: string[];
  web_sites?: RawWebSite[];
  report_langs?: string[] | string;
  timezone_offset?: number;
}

export interface TrendingTopic {
  /** GitHub topic tag, e.g. `generative-art`. */
  tag: string;
  /** Short label shown in the report, e.g. `generative-art`. */
  label: string;
}

export interface WebSiteConfig {
  id: string;
  name: string;
  feed?: string;
  sitemap?: string;
  prefixes?: string[];
  subSitemapNames?: string[];
  subSitemapTemplate?: string;
  metadataOnly?: boolean;
  maxItems?: number;
}

export interface RadarConfig {
  /** Artist-facing apps and CLIs — one digest section each. */
  tools: RepoConfig[];
  /** Flagship creative-coding framework, receives the deep-dive section. */
  flagship: RepoConfig;
  /** Peer creative-coding frameworks, compared against the flagship. */
  peers: RepoConfig[];
  /** Community-contributed "awesome list" repo, used for the showcase section. */
  showcaseRepo: string;
  /** Display name for the showcase repo. */
  showcaseName: string;
  trendingTopics: TrendingTopic[];
  hnQueries: string[];
  hnKeywords: string[];
  webSites: WebSiteConfig[];
  /** Languages to generate, when not overridden by REPORT_LANGS. */
  reportLangs?: Lang[];
  /** UTC offset used for the report date (e.g. Brazil = -3, UTC = 0). */
  timezoneOffset: number;
}

// ---------------------------------------------------------------------------
// Defaults — the creative-coding corner of the art world
// ---------------------------------------------------------------------------

/** Apps and CLIs artists actually run: node-based visuals, pixel art, plotters… */
const DEFAULT_TOOLS: RepoConfig[] = [
  { id: "cables", repo: "cables-gl/cables", name: "Cables.gl", paginated: true },
  { id: "graphite", repo: "GraphiteEditor/Graphite", name: "Graphite", paginated: true },
  { id: "aseprite", repo: "aseprite/aseprite", name: "Aseprite" },
  { id: "sonic-pi", repo: "sonic-pi-net/sonic-pi", name: "Sonic Pi", paginated: true },
  { id: "manim", repo: "3b1b/manim", name: "Manim", paginated: true },
  { id: "vpype", repo: "abey79/vpype", name: "vpype (plotter pipeline)" },
];

/** Flagship framework for the deep dive: the reference project of the field. */
const DEFAULT_FLAGSHIP: RepoConfig = {
  id: "p5js",
  repo: "processing/p5.js",
  name: "p5.js",
  paginated: true,
};

/** Peer frameworks and libraries artists build with. */
const DEFAULT_PEERS: RepoConfig[] = [
  { id: "threejs", repo: "mrdoob/three.js", name: "three.js", paginated: true },
  { id: "openframeworks", repo: "openframeworks/openFrameworks", name: "openFrameworks", paginated: true },
  { id: "processing", repo: "processing/processing4", name: "Processing 4" },
  { id: "openrndr", repo: "openrndr/openrndr", name: "OPENRNDR" },
  { id: "nannou", repo: "nannou-org/nannou", name: "nannou" },
  { id: "pixijs", repo: "pixijs/pixijs", name: "PixiJS", paginated: true },
  { id: "raylib", repo: "raysan5/raylib", name: "raylib", paginated: true },
  { id: "love2d", repo: "love2d/love", name: "LÖVE" },
  { id: "babylonjs", repo: "BabylonJS/Babylon.js", name: "Babylon.js", paginated: true },
];

const DEFAULT_SHOWCASE_REPO = "terkelg/awesome-creative-coding";

const DEFAULT_TRENDING_TOPICS: TrendingTopic[] = [
  { tag: "creative-coding", label: "creative-coding" },
  { tag: "generative-art", label: "generative-art" },
  { tag: "procedural-generation", label: "procedural-generation" },
  { tag: "glsl", label: "glsl" },
  { tag: "shader", label: "shader" },
  { tag: "p5js", label: "p5js" },
  { tag: "processing", label: "processing" },
  { tag: "plotter", label: "plotter" },
  { tag: "livecoding", label: "livecoding" },
  { tag: "art", label: "art" },
];

const DEFAULT_HN_QUERIES = [
  "generative art",
  "creative coding",
  "shader",
  "demoscene",
  "plotter",
  "live coding",
  "blender",
  "computer graphics",
];

/**
 * Words that mark a Hacker News story as relevant to the art/creative-coding
 * beat. Matching is word-boundary based so "art" does not match "artificial".
 */
const DEFAULT_HN_KEYWORDS = [
  "art",
  "arts",
  "artist",
  "artists",
  "artistic",
  "artwork",
  "creative coding",
  "creative-coding",
  "generative",
  "procedural",
  "shader",
  "shaders",
  "glsl",
  "hlsl",
  "webgl",
  "webgpu",
  "wgsl",
  "raytracing",
  "raytracer",
  "renderer",
  "rendering",
  "graphics",
  "canvas",
  "drawing",
  "sketch",
  "sketches",
  "plotter",
  "pen plotter",
  "axidraw",
  "svg art",
  "live coding",
  "livecoding",
  "algorithmic composition",
  "demoscene",
  "vj",
  "visualizer",
  "visualiser",
  "visuals",
  "installation",
  "interactive",
  "animation",
  "animated",
  "blender",
  "three.js",
  "threejs",
  "p5.js",
  "p5js",
  "processing",
  "openframeworks",
  "touchdesigner",
  "pixel art",
  "sprite",
  "illustration",
  "typography",
  "sound design",
  "synthesis",
  "synthesizer",
  "synth",
  "modular synth",
  "music",
  "audio",
  "museum",
  "gallery",
  "exhibition",
  "sculpture",
  "printmaking",
  "risograph",
  "photography",
  "typeface",
];

/**
 * Blogs and news feeds behind the "Art & Creative Tool News" report.
 * All five feeds were checked live; feed mode is preferred because it returns
 * the article text directly (no per-article page fetch, no bot walls).
 */
const DEFAULT_WEB_SITES: WebSiteConfig[] = [
  { id: "blender", name: "Blender", feed: "https://www.blender.org/feed/" },
  { id: "blender-dev", name: "Blender Developers Blog", feed: "https://code.blender.org/feed/" },
  { id: "krita", name: "Krita", feed: "https://krita.org/en/index.xml" },
  {
    id: "processing-foundation",
    name: "Processing Foundation (p5.js)",
    feed: "https://medium.com/feed/processing-foundation",
  },
  { id: "inkscape", name: "Inkscape", feed: "https://inkscape.org/news/feed/" },
];

// ---------------------------------------------------------------------------
// Loader
// ---------------------------------------------------------------------------

function toRepoConfig(e: RawRepoEntry): RepoConfig {
  return { id: e.id, repo: e.repo, name: e.name, ...(e.paginated ? { paginated: true } : {}) };
}

/** `owner/awesome-creative-coding` → `Awesome Creative Coding`. */
function titleFromRepoSlug(slug: string): string {
  const name = slug.split("/").pop() ?? slug;
  return name
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function toWebSiteConfig(e: RawWebSite): WebSiteConfig {
  return {
    id: e.id,
    name: e.name,
    ...(e.feed ? { feed: e.feed } : {}),
    ...(e.sitemap ? { sitemap: e.sitemap } : {}),
    ...(e.prefixes ? { prefixes: e.prefixes } : {}),
    ...(e.sub_sitemap_names ? { subSitemapNames: e.sub_sitemap_names } : {}),
    ...(e.sub_sitemap_template ? { subSitemapTemplate: e.sub_sitemap_template } : {}),
    ...(e.metadata_only ? { metadataOnly: true } : {}),
    ...(e.max_items ? { maxItems: e.max_items } : {}),
  };
}

function toTrendingTopic(entry: string | RawTopicEntry): TrendingTopic | null {
  if (typeof entry === "string") {
    const tag = entry.trim();
    return tag ? { tag, label: tag } : null;
  }
  if (!entry?.tag) return null;
  const tag = entry.tag.trim();
  return tag ? { tag, label: (entry.label ?? tag).trim() } : null;
}

function isRepoEntry(value: unknown): value is RawRepoEntry {
  const e = value as RawRepoEntry | undefined;
  return Boolean(e && e.id && e.repo && e.name);
}

function cleanStrings(values: string[] | undefined): string[] {
  return (values ?? []).map((v) => String(v).trim()).filter(Boolean);
}

export function loadConfig(configPath = "config.yml"): RadarConfig {
  const resolved = path.resolve(configPath);
  const defaults: RadarConfig = {
    tools: DEFAULT_TOOLS,
    flagship: DEFAULT_FLAGSHIP,
    peers: DEFAULT_PEERS,
    showcaseRepo: DEFAULT_SHOWCASE_REPO,
    showcaseName: titleFromRepoSlug(DEFAULT_SHOWCASE_REPO),
    trendingTopics: DEFAULT_TRENDING_TOPICS,
    hnQueries: DEFAULT_HN_QUERIES,
    hnKeywords: DEFAULT_HN_KEYWORDS,
    webSites: DEFAULT_WEB_SITES,
    timezoneOffset: -3,
  };

  if (!fs.existsSync(resolved)) {
    console.log(`[config] ${configPath} not found — using built-in defaults.`);
    return defaults;
  }

  let raw: RawConfig;
  try {
    raw = (yaml.load(fs.readFileSync(resolved, "utf-8")) ?? {}) as RawConfig;
  } catch (err) {
    console.error(`[config] Failed to parse ${configPath}: ${err} — using built-in defaults.`);
    return defaults;
  }

  const tools = (raw.tools ?? []).filter(isRepoEntry).map(toRepoConfig);
  const peers = (raw.peers ?? []).filter(isRepoEntry).map(toRepoConfig);
  const topics = (raw.trending_topics ?? [])
    .map(toTrendingTopic)
    .filter((t): t is TrendingTopic => t !== null);
  const sites = (raw.web_sites ?? []).filter((s) => s?.id && s?.name && (s.feed || s.sitemap));

  const langs = Array.isArray(raw.report_langs)
    ? raw.report_langs.map((l) => String(l).trim().toLowerCase()).filter(isLang)
    : typeof raw.report_langs === "string"
      ? raw.report_langs
          .split(",")
          .map((l) => l.trim().toLowerCase())
          .filter(isLang)
      : [];

  const config: RadarConfig = {
    tools: tools.length > 0 ? tools : DEFAULT_TOOLS,
    flagship: isRepoEntry(raw.flagship) ? toRepoConfig(raw.flagship) : DEFAULT_FLAGSHIP,
    peers: peers.length > 0 ? peers : DEFAULT_PEERS,
    showcaseRepo:
      typeof raw.showcase_repo === "string" && raw.showcase_repo.trim()
        ? raw.showcase_repo.trim()
        : DEFAULT_SHOWCASE_REPO,
    showcaseName:
      typeof raw.showcase_name === "string" && raw.showcase_name.trim()
        ? raw.showcase_name.trim()
        : titleFromRepoSlug(
            typeof raw.showcase_repo === "string" && raw.showcase_repo.trim()
              ? raw.showcase_repo.trim()
              : DEFAULT_SHOWCASE_REPO,
          ),
    trendingTopics: topics.length > 0 ? topics : DEFAULT_TRENDING_TOPICS,
    hnQueries: cleanStrings(raw.hn_queries).length > 0 ? cleanStrings(raw.hn_queries) : DEFAULT_HN_QUERIES,
    hnKeywords:
      cleanStrings(raw.hn_keywords).length > 0 ? cleanStrings(raw.hn_keywords) : DEFAULT_HN_KEYWORDS,
    webSites: sites.length > 0 ? sites.map(toWebSiteConfig) : DEFAULT_WEB_SITES,
    timezoneOffset:
      typeof raw.timezone_offset === "number" && Number.isFinite(raw.timezone_offset)
        ? raw.timezone_offset
        : defaults.timezoneOffset,
    ...(langs.length > 0 ? { reportLangs: langs } : {}),
  };

  console.log(
    `[config] Loaded from ${configPath}: ` +
      `${config.tools.length} tools, ${config.peers.length} peer frameworks, ` +
      `${config.trendingTopics.length} topics, ${config.webSites.length} news feeds`,
  );

  return config;
}
