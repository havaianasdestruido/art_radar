import assert from "node:assert/strict";
import { test } from "node:test";

import { parseLangs, reportFileName, parseReportFileName, LANGS } from "../src/lang.ts";
import { allReportFileNames, issueLabel, reportLabelMap, REPORTS } from "../src/reports.ts";

test("parseLangs keeps valid languages and drops unknown ones", () => {
  assert.deepEqual(parseLangs("en,pt,zh"), ["en", "pt", "zh"]);
  assert.deepEqual(parseLangs(" PT , en , fr "), ["pt", "en"]);
  assert.deepEqual(parseLangs("fr,de"), ["en"]);
  assert.deepEqual(parseLangs(undefined), ["en"]);
  assert.deepEqual(parseLangs(undefined, ["pt"]), ["pt"]);
});

test("parseLangs removes duplicates", () => {
  assert.deepEqual(parseLangs("en,en,pt"), ["en", "pt"]);
});

test("report filenames use English as the canonical variant", () => {
  assert.equal(reportFileName("art-tools", "en"), "art-tools.md");
  assert.equal(reportFileName("art-tools", "pt"), "art-tools-pt.md");
  assert.equal(reportFileName("art-tools", "zh"), "art-tools-zh.md");
});

test("report filenames round-trip through parseReportFileName", () => {
  for (const report of REPORTS) {
    for (const lang of LANGS) {
      const file = reportFileName(report.id, lang);
      assert.deepEqual(parseReportFileName(file), { base: report.id, lang });
    }
  }
});

test("every report defines a title in every language", () => {
  for (const report of REPORTS) {
    for (const lang of LANGS) {
      assert.ok(report.title[lang]?.length > 0, `${report.id} is missing a ${lang} title`);
    }
  }
});

test("allReportFileNames covers every report and language", () => {
  const names = allReportFileNames();
  assert.equal(names.length, REPORTS.length * LANGS.length);
  assert.ok(names.includes("art-tools.md"));
  assert.ok(names.includes("art-tools-pt.md"));
  assert.ok(names.includes("art-monthly-zh.md"));
});

test("issue labels only carry a suffix for non-English reports", () => {
  assert.equal(issueLabel("art-tools", "en"), "art-tools");
  assert.equal(issueLabel("art-tools", "pt"), "art-tools-pt");
  assert.equal(issueLabel("art-tools", "zh"), "art-tools-zh");
});

test("report filenames carry the .md extension and have a matching label", () => {
  const labels = reportLabelMap();
  for (const file of allReportFileNames()) {
    assert.ok(file.endsWith(".md"), `${file} should carry the .md extension`);
    assert.ok(labels[file.replace(/\.md$/, "")], `${file} has no label in reportLabelMap()`);
  }
});

test("reportLabelMap maps filename bases to localised titles", () => {
  const labels = reportLabelMap();
  assert.equal(labels["art-tools"], "Creative Coding Tools Digest");
  assert.equal(labels["art-tools-pt"], "Radar de Ferramentas Criativas");
  assert.equal(labels["art-weekly-zh"], "艺术雷达周报");
});
