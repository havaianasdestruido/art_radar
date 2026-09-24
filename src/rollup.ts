/**
 * Weekly and monthly rollup report generator — Art Radar.
 * Reads the daily digest files that are already committed — no API calls needed.
 */

import fs from "node:fs";
import path from "node:path";
import { callLlm, saveFile, autoGenFooter } from "./report.ts";
import { buildWeeklyPrompt, buildMonthlyPrompt } from "./prompts.ts";
import { createGitHubIssue } from "./github.ts";
import { type Lang, DEFAULT_LANGS, parseLangs, reportFileName } from "./lang.ts";
import { ROLLUP_SOURCE_IDS, findReport, issueLabel, type ReportDef } from "./reports.ts";
import { loadConfig } from "./config.ts";

const DIGESTS_DIR = "digests";
const MAX_CHARS_PER_DAILY = 2500;
const MAX_CHARS_PER_WEEKLY = 3000;

const TRUNCATED: Record<Lang, string> = {
  en: "\n...[truncated]",
  pt: "\n...[truncado]",
  zh: "\n...[截断]",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function loadLangs(): Lang[] {
  const raw = process.env["REPORT_LANGS"];
  if (raw !== undefined && raw.trim() !== "") return parseLangs(raw, DEFAULT_LANGS);
  return loadConfig().reportLangs ?? DEFAULT_LANGS;
}

function getDateDirs(): string[] {
  if (!fs.existsSync(DIGESTS_DIR)) return [];
  return fs
    .readdirSync(DIGESTS_DIR)
    .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d) && fs.statSync(path.join(DIGESTS_DIR, d)).isDirectory())
    .sort()
    .reverse();
}

function readTruncated(filePath: string, limit: number, lang: Lang): string {
  const content = fs.readFileSync(filePath, "utf-8");
  const truncated = content.slice(0, limit);
  return truncated.length < content.length ? truncated + TRUNCATED[lang] : truncated;
}

/** Read one daily digest for the requested language (falling back to English). */
function readDailyDigest(date: string, lang: Lang): string | null {
  for (const id of ROLLUP_SOURCE_IDS) {
    for (const fileName of [reportFileName(id, lang), reportFileName(id, "en")]) {
      const p = path.join(DIGESTS_DIR, date, fileName);
      if (fs.existsSync(p)) return readTruncated(p, MAX_CHARS_PER_DAILY, lang);
    }
  }
  return null;
}

/** Read a weekly report for the requested language (falling back to English). */
function readWeeklyDigest(date: string, lang: Lang): string | null {
  for (const fileName of [reportFileName("art-weekly", lang), reportFileName("art-weekly", "en")]) {
    const p = path.join(DIGESTS_DIR, date, fileName);
    if (fs.existsSync(p)) return readTruncated(p, MAX_CHARS_PER_WEEKLY, lang);
  }
  return null;
}

function hasWeeklyDigest(date: string, lang: Lang): boolean {
  return (
    fs.existsSync(path.join(DIGESTS_DIR, date, reportFileName("art-weekly", lang))) ||
    fs.existsSync(path.join(DIGESTS_DIR, date, reportFileName("art-weekly", "en")))
  );
}

/** Format a date as an ISO week string, e.g. "2026-W10". */
function toWeekStr(date: Date): string {
  // ISO week: week containing the first Thursday of the year
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

function localDateStr(now: Date, timezoneOffset: number): string {
  return new Date(now.getTime() + timezoneOffset * 60 * 60 * 1000).toISOString().slice(0, 10);
}

interface RollupContext {
  dateStr: string;
  utcStr: string;
  digestRepo: string;
  report: ReportDef;
}

// ---------------------------------------------------------------------------
// Weekly rollup
// ---------------------------------------------------------------------------

async function generateWeeklyForLang(
  lang: Lang,
  last7: string[],
  weekStr: string,
  ctx: RollupContext,
): Promise<void> {
  const dailyDigests: Record<string, string> = {};
  for (const date of last7) {
    const content = readDailyDigest(date, lang);
    if (content) dailyDigests[date] = content;
  }

  if (Object.keys(dailyDigests).length === 0) {
    console.log(`[weekly/${lang}] No daily digests found, skipping.`);
    return;
  }

  const dates = Object.keys(dailyDigests);
  console.log(`[weekly/${lang}] Using ${dates.length} daily digests: ${dates.join(", ")}`);

  const summary = await callLlm(buildWeeklyPrompt(dailyDigests, weekStr, lang), 8192);
  const range = `${last7[last7.length - 1]} ~ ${last7[0]}`;
  const coverage: Record<Lang, string> = {
    en: `> Coverage: ${range} | Generated: ${ctx.utcStr} UTC`,
    pt: `> Cobertura: ${range} | Gerado em: ${ctx.utcStr} UTC`,
    zh: `> 覆盖日期: ${range} | 生成时间: ${ctx.utcStr} UTC`,
  };

  const content = `# ${ctx.report.title[lang]} ${weekStr}\n\n${coverage[lang]}\n\n---\n\n${summary}${autoGenFooter(lang)}`;
  console.log(`  Saved ${saveFile(content, ctx.dateStr, reportFileName(ctx.report.id, lang))}`);

  if (ctx.digestRepo) {
    const url = await createGitHubIssue(
      `${ctx.report.icon} ${ctx.report.title[lang]} ${weekStr}`,
      content,
      issueLabel(ctx.report.id, lang),
      lang,
    );
    console.log(`  Created weekly issue (${lang}): ${url}`);
  }
}

export async function runWeeklyRollup(): Promise<void> {
  const now = new Date();
  const config = loadConfig();
  const localNow = new Date(now.getTime() + config.timezoneOffset * 60 * 60 * 1000);
  const dateStr = localDateStr(now, config.timezoneOffset);
  const utcStr = now.toISOString().slice(0, 16).replace("T", " ");
  const weekStr = toWeekStr(localNow);
  const digestRepo = process.env["DIGEST_REPO"] ?? "";
  const langs = loadLangs();
  const report = findReport("art-weekly")!;

  console.log(`[weekly] Generating rollup for ${weekStr} (date: ${dateStr})`);
  console.log(`[weekly] Languages: ${langs.join(", ")}`);

  const last7 = getDateDirs().slice(0, 7);
  const ctx: RollupContext = { dateStr, utcStr, digestRepo, report };

  await Promise.all(
    langs.map((lang) =>
      generateWeeklyForLang(lang, last7, weekStr, ctx).catch((err) => {
        console.error(`[weekly/${lang}] failed: ${err}`);
      }),
    ),
  );

  console.log("[weekly] Done!");
}

// ---------------------------------------------------------------------------
// Monthly rollup
// ---------------------------------------------------------------------------

async function generateMonthlyForLang(
  lang: Lang,
  monthDates: string[],
  monthStr: string,
  ctx: RollupContext,
): Promise<void> {
  const weeklyDates = monthDates.filter((d) => hasWeeklyDigest(d, lang));
  const sourceDigests: Record<string, string> = {};
  let sourceLabel: string;

  if (weeklyDates.length >= 2) {
    sourceLabel = {
      en: `${weeklyDates.length} weekly reports`,
      pt: `${weeklyDates.length} relatórios semanais`,
      zh: `${weeklyDates.length} 份周报`,
    }[lang];
    for (const date of weeklyDates) {
      const content = readWeeklyDigest(date, lang);
      if (content) sourceDigests[date] = content;
    }
  } else {
    // Sample daily reports: every 4th day, max 10
    const sampled = monthDates.filter((_, i) => i % 4 === 0).slice(0, 10);
    sourceLabel = {
      en: `${sampled.length} daily reports (sampled every 4 days)`,
      pt: `${sampled.length} relatórios diários (amostragem a cada 4 dias)`,
      zh: `${sampled.length} 份日报（每4日采样）`,
    }[lang];
    for (const date of sampled) {
      const content = readDailyDigest(date, lang);
      if (content) sourceDigests[date] = content;
    }
  }

  if (Object.keys(sourceDigests).length === 0) {
    console.log(`[monthly/${lang}] No source digests found for ${monthStr}, skipping.`);
    return;
  }

  console.log(`[monthly/${lang}] Sources: ${sourceLabel}`);
  const summary = await callLlm(buildMonthlyPrompt(sourceDigests, monthStr, lang), 8192);
  const sourcesLine: Record<Lang, string> = {
    en: `> Sources: ${sourceLabel} | Generated: ${ctx.utcStr} UTC`,
    pt: `> Fontes: ${sourceLabel} | Gerado em: ${ctx.utcStr} UTC`,
    zh: `> 数据来源: ${sourceLabel} | 生成时间: ${ctx.utcStr} UTC`,
  };

  const content = `# ${ctx.report.title[lang]} ${monthStr}\n\n${sourcesLine[lang]}\n\n---\n\n${summary}${autoGenFooter(lang)}`;
  console.log(`  Saved ${saveFile(content, ctx.dateStr, reportFileName(ctx.report.id, lang))}`);

  if (ctx.digestRepo) {
    const url = await createGitHubIssue(
      `${ctx.report.icon} ${ctx.report.title[lang]} ${monthStr}`,
      content,
      issueLabel(ctx.report.id, lang),
      lang,
    );
    console.log(`  Created monthly issue (${lang}): ${url}`);
  }
}

export async function runMonthlyRollup(): Promise<void> {
  const now = new Date();
  const config = loadConfig();
  const localNow = new Date(now.getTime() + config.timezoneOffset * 60 * 60 * 1000);
  // Monthly report covers the PREVIOUS month
  const prevMonth = new Date(Date.UTC(localNow.getUTCFullYear(), localNow.getUTCMonth() - 1, 1));
  const monthStr = prevMonth.toISOString().slice(0, 7); // "2026-02"
  const dateStr = localDateStr(now, config.timezoneOffset);
  const utcStr = now.toISOString().slice(0, 16).replace("T", " ");
  const digestRepo = process.env["DIGEST_REPO"] ?? "";
  const langs = loadLangs();
  const report = findReport("art-monthly")!;

  console.log(`[monthly] Generating rollup for ${monthStr} (date: ${dateStr})`);
  console.log(`[monthly] Languages: ${langs.join(", ")}`);

  const monthDates = getDateDirs().filter((d) => d.startsWith(monthStr));
  const ctx: RollupContext = { dateStr, utcStr, digestRepo, report };

  await Promise.all(
    langs.map((lang) =>
      generateMonthlyForLang(lang, monthDates, monthStr, ctx).catch((err) => {
        console.error(`[monthly/${lang}] failed: ${err}`);
      }),
    ),
  );

  console.log("[monthly] Done!");
}
