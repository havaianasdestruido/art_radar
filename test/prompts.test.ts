import assert from "node:assert/strict";
import { test } from "node:test";

import type { GitHubItem, GitHubRelease } from "../src/github.ts";
import {
  buildToolPrompt,
  buildFrameworkPrompt,
  buildToolComparisonPrompt,
  buildFrameworkComparisonPrompt,
  buildShowcasePrompt,
  buildTrendingPrompt,
  buildNewsPrompt,
  buildHnPrompt,
  buildWeeklyPrompt,
  buildMonthlyPrompt,
  formatItem,
  sampleNote,
  type RepoDigest,
} from "../src/prompts.ts";
import type { WebFetchResult } from "../src/web.ts";
import type { TrendingData } from "../src/trending.ts";
import type { HnData } from "../src/hn.ts";
import { LANGS } from "../src/lang.ts";

const repo = { id: "vpype", repo: "abey79/vpype", name: "vpype" };

function item(number: number, title: string): GitHubItem {
  return {
    number,
    title,
    state: "open",
    user: { login: "artist" },
    labels: [{ name: "enhancement" }],
    created_at: "2026-09-20T10:00:00Z",
    updated_at: "2026-09-23T10:00:00Z",
    comments: number,
    reactions: { "+1": 3 },
    body: "Support G-code output for pen plotters",
    html_url: `https://github.com/abey79/vpype/issues/${number}`,
  };
}

const issues = [item(3, "Add G-code export"), item(5, "Pen-up travel optimisation")];
const prs = [item(7, "feat: incremental plotting")];
const releases: GitHubRelease[] = [
  { tag_name: "v1.14", name: "vpype 1.14", body: "New export options", published_at: "2026-09-23T10:00:00Z" },
];

const digests: RepoDigest[] = [
  { config: repo, issues, prs, releases, summary: "SUMMARY-VPYPE" },
  {
    config: { id: "manim", repo: "3b1b/manim", name: "Manim" },
    issues: [],
    prs: [],
    releases: [],
    summary: "",
  },
];

const trending: TrendingData = {
  trendingRepos: [
    {
      fullName: "someone/plotter-art",
      description: "Generative plotter art",
      language: "Python",
      todayStars: 120,
      totalStars: 900,
      forks: 10,
      url: "https://github.com/someone/plotter-art",
    },
  ],
  trendingTotal: 25,
  searchRepos: [
    {
      fullName: "someone/shaders",
      description: "GLSL playground",
      language: "GLSL",
      stargazersCount: 500,
      pushedAt: "2026-09-23T00:00:00Z",
      url: "https://github.com/someone/shaders",
      searchQuery: "glsl",
    },
  ],
  trendingFetchSuccess: true,
};

const news: WebFetchResult[] = [
  {
    site: "blender",
    siteName: "Blender",
    isFirstRun: false,
    totalDiscovered: 10,
    newItems: [
      {
        url: "https://www.blender.org/news/thing/",
        title: "Blender thing",
        lastmod: "2026-09-23T00:00:00Z",
        content: "A body of text",
        site: "blender",
        category: "news",
      },
    ],
  },
  {
    site: "krita",
    siteName: "Krita",
    isFirstRun: false,
    totalDiscovered: 0,
    newItems: [],
    error: "HTTP 403",
  },
];

const hn: HnData = {
  stories: [
    {
      id: "1",
      title: "Show HN: Pen plotter art from code",
      url: "https://example.com",
      hnUrl: "https://news.ycombinator.com/item?id=1",
      points: 200,
      comments: 40,
      author: "artist",
      createdAt: "2026-09-23T12:00:00Z",
    },
  ],
  fetchSuccess: true,
  windowHours: 24,
  scanned: 120,
};

test("every prompt builder returns content for every language", () => {
  const builders: Array<{ name: string; run: (lang: (typeof LANGS)[number]) => string; needle: string }> = [
    {
      name: "tool",
      run: (lang) => buildToolPrompt(repo, issues, prs, releases, "2026-09-24", lang),
      needle: "abey79/vpype",
    },
    {
      name: "framework",
      run: (lang) =>
        buildFrameworkPrompt(repo, issues, prs, releases, "2026-09-24", undefined, undefined, lang),
      needle: "abey79/vpype",
    },
    {
      name: "tool comparison",
      run: (lang) => buildToolComparisonPrompt(digests, "2026-09-24", lang),
      needle: "SUMMARY-VPYPE",
    },
    {
      name: "framework comparison",
      run: (lang) => buildFrameworkComparisonPrompt(digests[0]!, [digests[1]!], "2026-09-24", lang),
      needle: "SUMMARY-VPYPE",
    },
    {
      name: "showcase",
      run: (lang) =>
        buildShowcasePrompt(
          prs,
          issues,
          "terkelg/awesome-creative-coding",
          "Awesome Creative Coding",
          "2026-09-24",
          lang,
        ),
      needle: "awesome-creative-coding",
    },
    {
      name: "trending",
      run: (lang) => buildTrendingPrompt(trending, "2026-09-24", lang),
      needle: "someone/shaders",
    },
    { name: "news", run: (lang) => buildNewsPrompt(news, "2026-09-24", lang), needle: "Blender thing" },
    { name: "hn", run: (lang) => buildHnPrompt(hn, "2026-09-24", lang), needle: "Pen plotter art" },
    {
      name: "weekly",
      run: (lang) => buildWeeklyPrompt({ "2026-09-23": "daily content" }, "2026-W39", lang),
      needle: "daily content",
    },
    {
      name: "monthly",
      run: (lang) => buildMonthlyPrompt({ "2026-08-01": "weekly content" }, "2026-08", lang),
      needle: "weekly content",
    },
  ];

  // Chinese packs more meaning per character, so it needs a lower bound
  const minLength: Record<string, number> = { en: 500, pt: 500, zh: 250 };

  for (const builder of builders) {
    for (const lang of LANGS) {
      const prompt = builder.run(lang);
      assert.ok(prompt.length > minLength[lang]!, `${builder.name}/${lang} prompt looks too short`);
      assert.ok(prompt.includes(builder.needle), `${builder.name}/${lang} is missing its data`);
      assert.ok(!prompt.includes("undefined"), `${builder.name}/${lang} contains "undefined"`);
    }
  }
});

test("prompts are written in the requested language", () => {
  const markers: Record<string, string> = { en: "English", pt: "português", zh: "中文" };
  for (const lang of LANGS) {
    const prompt = buildToolPrompt(repo, issues, prs, releases, "2026-09-24", lang);
    assert.ok(prompt.includes(markers[lang]!), `tool prompt for ${lang} should mention ${markers[lang]}`);
  }
});

test("formatItem localises its field labels", () => {
  assert.ok(formatItem(issues[0]!, "en").includes("Author: @artist"));
  assert.ok(formatItem(issues[0]!, "pt").includes("Autor: @artist"));
  assert.ok(formatItem(issues[0]!, "zh").includes("作者: @artist"));
});

test("sampleNote localises the sampling hint", () => {
  assert.equal(sampleNote(10, 10, "en"), "(Total: 10 items)");
  assert.ok(sampleNote(40, 10, "en").includes("showing the 10 most commented"));
  assert.ok(sampleNote(40, 10, "pt").includes("mais comentados"));
  assert.ok(sampleNote(40, 10, "zh").includes("共 40 条"));
});

test("news prompt flags sources that failed to fetch", () => {
  const prompt = buildNewsPrompt(news, "2026-09-24", "en");
  assert.ok(prompt.includes("source unavailable"));
  assert.ok(prompt.includes("HTTP 403"));
});

test("framework prompt reports release and activity counts", () => {
  const prompt = buildFrameworkPrompt(repo, issues, prs, releases, "2026-09-24", undefined, undefined, "en");
  assert.ok(prompt.includes("New releases: 1"));
  assert.ok(prompt.includes("Issues updated in the last 24h: 2"));
});

test("prompts fall back to the inactivity note for silent projects", () => {
  const prompt = buildToolComparisonPrompt(digests, "2026-09-24", "en");
  assert.ok(prompt.includes("No activity in the last 24 hours."));
  const ptPrompt = buildToolComparisonPrompt(digests, "2026-09-24", "pt");
  assert.ok(ptPrompt.includes("Sem atividade"));
});
