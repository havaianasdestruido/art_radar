/**
 * Telegram notification — reads manifest.json and sends a message with links to
 * the latest reports. Skips silently when the secrets are not set.
 *
 * Required env vars:
 *   TELEGRAM_BOT_TOKEN  — bot token from @BotFather
 *   TELEGRAM_CHAT_ID    — channel/group/user chat ID
 * Optional:
 *   PAGES_URL           — GitHub Pages base URL; derived from the repo slug when omitted
 */

import fs from "node:fs";
import { LANG_BADGE, type Lang, LANGS, reportFileName } from "./lang.ts";
import { REPORTS } from "./reports.ts";

const BOT_TOKEN = process.env["TELEGRAM_BOT_TOKEN"] ?? "";
const CHAT_ID = process.env["TELEGRAM_CHAT_ID"] ?? "";

function resolvePagesUrl(): string {
  const explicit = process.env["PAGES_URL"] ?? process.env["SITE_URL"];
  if (explicit) return explicit.replace(/\/$/, "");

  const repo = process.env["DIGEST_REPO"] ?? process.env["GITHUB_REPOSITORY"];
  if (repo) {
    const [owner, name] = repo.split("/");
    if (owner && name) return `https://${owner}.github.io/${name}`;
  }

  throw new Error("Missing PAGES_URL/SITE_URL and unable to derive from repository.");
}

const PAGES_URL = resolvePagesUrl();

async function sendTelegram(text: string): Promise<void> {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Telegram API ${res.status}: ${body}`);
  }
}

function buildMessage(date: string, reports: string[]): string {
  const ordered = [...REPORTS].sort((a, b) => Number(Boolean(a.rollup)) - Number(Boolean(b.rollup)));
  const headerIcon = reports.includes("art-monthly") ? "📆" : reports.includes("art-weekly") ? "📅" : "🎨";

  const lines: string[] = [`${headerIcon} <b>Art Radar · ${date}</b>\n`];

  for (const report of ordered) {
    const variants = LANGS.filter((lang: Lang) =>
      reports.includes(reportFileName(report.id, lang).replace(/\.md$/, "")),
    );
    if (variants.length === 0) continue;

    const primary = variants.includes("en") ? "en" : variants[0]!;
    const links = variants
      .filter((lang) => lang !== primary)
      .map((lang) => {
        const file = reportFileName(report.id, lang).replace(/\.md$/, "");
        return `<a href="${PAGES_URL}/#${date}/${file}">${LANG_BADGE[lang]}</a>`;
      });

    const mainFile = reportFileName(report.id, primary).replace(/\.md$/, "");
    const main = `<a href="${PAGES_URL}/#${date}/${mainFile}">${report.title[primary]}</a>`;
    lines.push(`• ${main}${links.length ? `  ·  ${links.join(" · ")}` : ""}`);
  }

  lines.push(`\n<a href="${PAGES_URL}">🌐 Web UI</a>  ·  <a href="${PAGES_URL}/feed.xml">⊕ RSS</a>`);
  return lines.join("\n");
}

async function main(): Promise<void> {
  if (!BOT_TOKEN) {
    console.log("[notify] TELEGRAM_BOT_TOKEN not set — skipping.");
    return;
  }
  if (!CHAT_ID) {
    console.log("[notify] TELEGRAM_CHAT_ID not set — skipping.");
    return;
  }

  if (!fs.existsSync("manifest.json")) {
    console.log("[notify] manifest.json not found — skipping.");
    return;
  }

  const { dates } = JSON.parse(fs.readFileSync("manifest.json", "utf-8")) as {
    dates: { date: string; reports: string[] }[];
  };

  const latest = dates?.[0];
  if (!latest) {
    console.log("[notify] manifest is empty — skipping.");
    return;
  }

  const text = buildMessage(latest.date, latest.reports);
  console.log(`[notify] Sending Telegram message for ${latest.date} (${latest.reports.length} reports)…`);
  await sendTelegram(text);
  console.log("[notify] Done!");
}

main().catch((e: unknown) => {
  console.error("[notify]", e instanceof Error ? e.message : e);
  process.exit(1);
});
