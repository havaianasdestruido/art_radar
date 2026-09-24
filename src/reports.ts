/**
 * Single source of truth for report types.
 *
 * Everything that needs to know about report ids, titles, filenames or issue
 * labels (the pipeline, the manifest/RSS generator, Telegram notifications and
 * the MCP server description) reads from here so the pieces cannot drift apart.
 */

import { type Lang, LANGS, reportFileName } from "./lang.ts";

export interface ReportDef {
  /** Stable identifier, also the base filename and the issue label (en). */
  id: string;
  /** Emoji used in GitHub issue titles and Telegram messages. */
  icon: string;
  /** Title per language, used by the feed, the site sidebar and notifications. */
  title: Record<Lang, string>;
  /** GitHub issue label colour. */
  color: string;
  /** Rollups aggregate the daily reports instead of fetching fresh data. */
  rollup?: boolean;
}

export const REPORTS: ReportDef[] = [
  {
    id: "art-tools",
    icon: "🎨",
    color: "a855f7",
    title: {
      en: "Creative Coding Tools Digest",
      pt: "Radar de Ferramentas Criativas",
      zh: "创意编程工具动态日报",
    },
  },
  {
    id: "art-frameworks",
    icon: "🖌️",
    color: "0ea5e9",
    title: {
      en: "Creative Coding Frameworks Digest",
      pt: "Radar de Frameworks Criativos",
      zh: "创意编程框架生态日报",
    },
  },
  {
    id: "art-news",
    icon: "📰",
    color: "f472b6",
    title: {
      en: "Art & Creative Tool News",
      pt: "Notícias de Arte e Ferramentas Criativas",
      zh: "艺术与创意工具资讯",
    },
  },
  {
    id: "art-trending",
    icon: "📈",
    color: "f9a825",
    title: {
      en: "Generative Art Open Source Trends",
      pt: "Tendências Open Source de Arte Generativa",
      zh: "生成艺术开源趋势日报",
    },
  },
  {
    id: "art-hn",
    icon: "🗣️",
    color: "ff6600",
    title: {
      en: "Hacker News Art & Tech Digest",
      pt: "Hacker News: Arte e Tecnologia",
      zh: "Hacker News 艺术与技术社区动态",
    },
  },
  {
    id: "art-weekly",
    icon: "📅",
    color: "7c3aed",
    rollup: true,
    title: {
      en: "Art Radar Weekly",
      pt: "Art Radar Semanal",
      zh: "艺术雷达周报",
    },
  },
  {
    id: "art-monthly",
    icon: "📆",
    color: "0d9488",
    rollup: true,
    title: {
      en: "Art Radar Monthly",
      pt: "Art Radar Mensal",
      zh: "艺术雷达月报",
    },
  },
];

export const DAILY_REPORTS = REPORTS.filter((r) => !r.rollup);
export const ROLLUP_REPORTS = REPORTS.filter((r) => r.rollup);

/** Daily report ids that are read back when building weekly/monthly rollups. */
export const ROLLUP_SOURCE_IDS = ["art-tools", "art-frameworks", "art-news", "art-trending", "art-hn"];

export function findReport(id: string): ReportDef | undefined {
  return REPORTS.find((r) => r.id === id);
}

export function reportTitle(id: string, lang: Lang): string {
  return findReport(id)?.title[lang] ?? id;
}

/** `en` keeps the plain id; other languages append a suffix. */
export function issueLabel(id: string, lang: Lang): string {
  return lang === "en" ? id : `${id}-${lang}`;
}

/** Strip a `-pt` / `-zh` suffix so colours can be looked up by report id. */
export function labelBase(label: string): string {
  for (const lang of LANGS) {
    if (lang !== "en" && label.endsWith(`-${lang}`)) return label.slice(0, -(lang.length + 1));
  }
  return label;
}

/** Every `<report><lang>.md` filename the manifest generator should look for. */
export function allReportFileNames(): string[] {
  const names: string[] = [];
  for (const report of REPORTS) {
    for (const lang of LANGS) names.push(reportFileName(report.id, lang));
  }
  return names;
}

/** Titles for every language variant, keyed by filename base (for RSS labels). */
export function reportLabelMap(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const report of REPORTS) {
    for (const lang of LANGS) {
      map[reportFileName(report.id, lang).replace(/\.md$/, "")] = report.title[lang];
    }
  }
  return map;
}
