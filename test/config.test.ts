import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";

import { loadConfig } from "../src/config.ts";

function writeConfig(contents: string): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "art-radar-"));
  const file = path.join(dir, "config.yml");
  fs.writeFileSync(file, contents, "utf-8");
  return file;
}

test("falls back to the creative-coding defaults when config.yml is missing", () => {
  const config = loadConfig(path.join(os.tmpdir(), "definitely-missing-art-radar.yml"));
  assert.equal(config.flagship.repo, "processing/p5.js");
  assert.ok(config.tools.some((t) => t.repo === "abey79/vpype"));
  assert.ok(config.peers.some((p) => p.repo === "mrdoob/three.js"));
  assert.equal(config.showcaseRepo, "terkelg/awesome-creative-coding");
  assert.equal(config.showcaseName, "Awesome Creative Coding");
  assert.ok(config.trendingTopics.some((t) => t.tag === "generative-art"));
  assert.ok(config.webSites.length >= 3);
  assert.equal(config.timezoneOffset, -3);
});

test("reads a full custom configuration", () => {
  const file = writeConfig(`
tools:
  - id: my-tool
    repo: me/my-art-tool
    name: My Art Tool
    paginated: true
flagship:
  id: my-framework
  repo: me/my-framework
  name: My Framework
peers:
  - id: peer-a
    repo: peer/a
    name: Peer A
showcase_repo: me/awesome-art
showcase_name: Awesome Art
trending_topics:
  - tag: generative-art
    label: gen-art
  - demoscene
hn_queries:
  - plotter art
hn_keywords:
  - plotter
web_sites:
  - id: rhizome
    name: Rhizome
    feed: https://example.com/feed/
    max_items: 4
  - id: td
    name: TouchDesigner
    sitemap: https://example.com/sitemap.xml
    prefixes: ["/news"]
    metadata_only: true
report_langs: [pt, en]
timezone_offset: 8
`);

  const config = loadConfig(file);
  assert.equal(config.tools.length, 1);
  assert.equal(config.tools[0]!.paginated, true);
  assert.equal(config.flagship.name, "My Framework");
  assert.equal(config.peers[0]!.repo, "peer/a");
  assert.equal(config.showcaseName, "Awesome Art");
  assert.deepEqual(config.trendingTopics, [
    { tag: "generative-art", label: "gen-art" },
    { tag: "demoscene", label: "demoscene" },
  ]);
  assert.deepEqual(config.hnQueries, ["plotter art"]);
  assert.deepEqual(config.hnKeywords, ["plotter"]);
  assert.equal(config.webSites.length, 2);
  assert.equal(config.webSites[0]!.maxItems, 4);
  assert.equal(config.webSites[1]!.metadataOnly, true);
  assert.deepEqual(config.webSites[1]!.prefixes, ["/news"]);
  assert.deepEqual(config.reportLangs, ["pt", "en"]);
  assert.equal(config.timezoneOffset, 8);
});

test("derives the showcase name from the repo slug when not given", () => {
  const file = writeConfig(`
showcase_repo: someone/awesome-generative-art
`);
  assert.equal(loadConfig(file).showcaseName, "Awesome Generative Art");
});

test("falls back to defaults for empty sections and broken YAML", () => {
  const empty = writeConfig(`
tools: []
web_sites: []
report_langs: [xx]
`);
  const config = loadConfig(empty);
  assert.ok(config.tools.length > 0, "empty tools list falls back to defaults");
  assert.ok(config.webSites.length > 0, "empty web_sites falls back to defaults");
  assert.equal(config.reportLangs, undefined, "unknown languages are ignored");

  const broken = writeConfig("tools: [ :: not yaml");
  assert.equal(loadConfig(broken).flagship.repo, "processing/p5.js");
});
