import assert from "node:assert/strict";
import { test } from "node:test";

import { matchesKeywords } from "../src/trending.ts";

const KEYWORDS = ["art", "artist", "creative coding", "plotter", "shader", "live coding", "three.js"];

test("matches whole words only", () => {
  assert.equal(matchesKeywords("Generative art with p5.js", KEYWORDS), true);
  assert.equal(matchesKeywords("Artificial intelligence benchmark", KEYWORDS), false);
  assert.equal(matchesKeywords("State of the art startup chart", KEYWORDS), true); // "art" is a real word here
  assert.equal(matchesKeywords("Smart home automation", KEYWORDS), false);
});

test("matches multi-word and hyphenated keywords", () => {
  assert.equal(matchesKeywords("An introduction to creative coding", KEYWORDS), true);
  assert.equal(matchesKeywords("Live coding with Tidal Cycles", KEYWORDS), true);
  assert.equal(matchesKeywords("three.js renderer internals", KEYWORDS), true);
});

test("is case insensitive", () => {
  assert.equal(matchesKeywords("PEN PLOTTER ART", KEYWORDS), true);
  assert.equal(matchesKeywords("GLSL SHADER tutorial", KEYWORDS), true);
});

test("treats word boundaries correctly inside identifiers", () => {
  assert.equal(matchesKeywords("smart-artificial-pipeline", ["art"]), false);
  assert.equal(matchesKeywords("start-up chart", ["art"]), false);
  assert.equal(matchesKeywords("blender-addon", ["blender"]), true);
  assert.equal(matchesKeywords("blenderizer", ["blender"]), false);
  assert.equal(matchesKeywords("state-of-the-art, really", ["art"]), true);
});
