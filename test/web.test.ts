import assert from "node:assert/strict";
import { test } from "node:test";

import { parseFeed } from "../src/web.ts";

const RSS = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Blender</title>
    <item>
      <title><![CDATA[Blender 5.2 LTS Release]]></title>
      <link>https://www.blender.org/press/blender-5-2-lts-release/</link>
      <pubDate>Tue, 14 Jul 2026 15:48:17 +0000</pubDate>
      <description><![CDATA[<p>Blender Foundation presents <strong>Blender 5.2 LTS</strong> with new Geometry Nodes.</p>]]></description>
    </item>
    <item>
      <title>Show your support for Blender projects</title>
      <link>https://www.blender.org/news/show-your-support-for-blender-projects/</link>
      <pubDate>Mon, 21 Sep 2026 10:58:44 +0000</pubDate>
      <description>A donation to the Blender Development Fund is a non-targeted form of support &amp; stays that way.</description>
    </item>
  </channel>
</rss>`;

const ATOM = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Krita</title>
  <entry>
    <title>Krita 5.3.4 Released!</title>
    <link rel="alternate" type="text/html" href="https://krita.org/en/posts/2026/krita-5.3.4-released/"/>
    <updated>2026-09-15T00:00:00+00:00</updated>
    <content type="html">&lt;p&gt;Bugfixes across the board&lt;/p&gt;</content>
  </entry>
</feed>`;

test("parses RSS items with titles, links, dates and text content", () => {
  const entries = parseFeed(RSS);
  assert.equal(entries.length, 2);
  assert.equal(entries[0]!.title, "Blender 5.2 LTS Release");
  assert.equal(entries[0]!.url, "https://www.blender.org/press/blender-5-2-lts-release/");
  assert.ok(entries[0]!.date.startsWith("Tue, 14 Jul 2026"));
  assert.ok(entries[0]!.content.includes("Blender 5.2 LTS"));
  assert.equal(entries[0]!.content.includes("<p>"), false, "HTML tags must be stripped");
});

test("decodes entities in feed descriptions", () => {
  const entries = parseFeed(RSS);
  assert.ok(entries[1]!.content.includes("support & stays that way"));
});

test("parses Atom entries via their link href", () => {
  const entries = parseFeed(ATOM);
  assert.equal(entries.length, 1);
  assert.equal(entries[0]!.title, "Krita 5.3.4 Released!");
  assert.equal(entries[0]!.url, "https://krita.org/en/posts/2026/krita-5.3.4-released/");
  assert.equal(entries[0]!.content, "Bugfixes across the board");
});

test("returns an empty list for HTML pages", () => {
  assert.deepEqual(parseFeed("<html><body><h1>Are you human?</h1></body></html>"), []);
});
