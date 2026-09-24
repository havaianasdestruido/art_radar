/**
 * Keeps the Web UI in sync with the pipeline: index.html duplicates a little
 * report metadata (language codes, badges, titles) because it is a static page.
 * These tests execute the page's own helpers and compare them against the
 * TypeScript source of truth in src/reports.ts and src/lang.ts.
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import { test } from "node:test";

import { LANGS, type Lang } from "../src/lang.ts";
import { REPORTS, allReportFileNames } from "../src/reports.ts";

const html = fs.readFileSync("index.html", "utf-8");
const scriptMatch = html.match(/<script>([\s\S]*)<\/script>/);
assert.ok(scriptMatch, "index.html should contain an inline script");
const script = scriptMatch[1]!;

/** Grab `prefix … { … }` from the page script, matching braces properly. */
function sliceBalanced(prefix: string): string {
  const start = script.indexOf(prefix);
  assert.ok(start >= 0, `index.html no longer defines "${prefix}" — update this test`);

  let depth = 0;
  for (let i = script.indexOf("{", start); i < script.length; i++) {
    const ch = script[i];
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) return script.slice(start, i + 1);
    }
  }
  throw new Error(`unbalanced braces after "${prefix}" in index.html`);
}

function slicePattern(pattern: RegExp, what: string): string {
  const match = script.match(pattern);
  assert.ok(match, `index.html no longer defines ${what} — update this test`);
  return match[0];
}

// Prettier indents the inline script, so patterns have to tolerate whitespace.
const pageScript = [
  slicePattern(/const LANGS = \[[^\]]*\];/, "LANGS"),
  slicePattern(/const BADGES = \{[^}]*\};/, "BADGES"),
  sliceBalanced("const TITLES = {"),
  sliceBalanced("function parseReport("),
  sliceBalanced("function primaryReports("),
  "return { LANGS, BADGES, TITLES, parseReport, primaryReports };",
].join("\n");

interface PageHelpers {
  LANGS: string[];
  BADGES: Record<string, string>;
  TITLES: Record<string, Record<string, string>>;
  parseReport: (file: string) => { base: string; lang: Lang };
  primaryReports: (reports: string[]) => string[];
}

const page = new Function(pageScript)() as PageHelpers;

test("the page knows every language the pipeline can emit", () => {
  assert.deepEqual(page.LANGS, [...LANGS]);
  for (const lang of LANGS) assert.ok(page.BADGES[lang], `missing badge for ${lang}`);
});

test("the page titles cover every report in every language", () => {
  for (const report of REPORTS) {
    const titles = page.TITLES[report.id];
    assert.ok(titles, `index.html is missing a title for ${report.id}`);
    for (const lang of LANGS) {
      assert.ok(titles![lang]?.length, `index.html is missing ${report.id}/${lang}`);
    }
  }
});

test("the page splits report filenames into base + language", () => {
  assert.deepEqual(page.parseReport("art-tools"), { base: "art-tools", lang: "en" });
  assert.deepEqual(page.parseReport("art-tools-pt"), { base: "art-tools", lang: "pt" });
  assert.deepEqual(page.parseReport("art-weekly-zh"), { base: "art-weekly", lang: "zh" });
});

test("every filename the manifest can contain is understood by the page", () => {
  for (const file of allReportFileNames()) {
    const key = file.replace(/\.md$/, "");
    const { base, lang } = page.parseReport(key);
    assert.ok(
      REPORTS.some((r) => r.id === base),
      `${key} resolves to unknown report "${base}"`,
    );
    assert.ok(LANGS.includes(lang), `${key} resolves to unknown language "${lang}"`);
    assert.ok(page.TITLES[base]?.[lang], `no sidebar title for ${key}`);
  }
});

test("the search index only reads one variant per report", () => {
  const primary = page.primaryReports(["art-tools-pt", "art-tools-zh", "art-tools", "art-hn-zh"]);
  assert.deepEqual(primary.sort(), ["art-hn-zh", "art-tools"]);

  const ptOnly = page.primaryReports(["art-tools-pt", "art-tools-zh"]);
  assert.deepEqual(ptOnly, ["art-tools-pt"]);
});
