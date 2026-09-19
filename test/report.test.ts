import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";

import { callLlm, EmptyLlmResponseError } from "../src/report.ts";

const originalFetch = globalThis.fetch;
const originalApiKey = process.env["OPENAI_API_KEY"];
const originalBaseUrl = process.env["OPENAI_BASE_URL"];

beforeEach(() => {
  process.env["OPENAI_API_KEY"] = "test-key";
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalApiKey === undefined) delete process.env["OPENAI_API_KEY"];
  else process.env["OPENAI_API_KEY"] = originalApiKey;
  if (originalBaseUrl === undefined) delete process.env["OPENAI_BASE_URL"];
  else process.env["OPENAI_BASE_URL"] = originalBaseUrl;
});

function response(content: unknown): Response {
  return Response.json({ choices: [{ message: { content } }] });
}

test("retries an empty response and returns the next completion", async () => {
  const responses = [response(""), response("complete")];
  const waits: number[] = [];
  globalThis.fetch = async () => responses.shift()!;

  const result = await callLlm("prompt", 4096, {
    sleep: async (ms) => {
      waits.push(ms);
    },
  });

  assert.equal(result, "complete");
  assert.deepEqual(waits, [5_000]);
});

test("fails after exhausting retries for empty responses", async () => {
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    return response("");
  };

  await assert.rejects(callLlm("prompt", 4096, { sleep: async () => undefined }), EmptyLlmResponseError);
  assert.equal(calls, 4);
});

test("treats whitespace-only structured content as empty", async () => {
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    return response([{ type: "text", text: "  \n\t " }]);
  };

  await assert.rejects(callLlm("prompt", 4096, { sleep: async () => undefined }), EmptyLlmResponseError);
  assert.equal(calls, 4);
});

test("retries an empty structured content array", async () => {
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    return response([]);
  };

  await assert.rejects(callLlm("prompt", 4096, { sleep: async () => undefined }), EmptyLlmResponseError);
  assert.equal(calls, 4);
});

test("retries null content", async () => {
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    return response(null);
  };

  await assert.rejects(callLlm("prompt", 4096, { sleep: async () => undefined }), EmptyLlmResponseError);
  assert.equal(calls, 4);
});

test("preserves the 429 retry count and backoff sequence", async () => {
  let calls = 0;
  const waits: number[] = [];
  globalThis.fetch = async () => {
    calls++;
    return new Response("rate limited", { status: 429 });
  };

  await assert.rejects(
    callLlm("prompt", 4096, {
      sleep: async (ms) => {
        waits.push(ms);
      },
    }),
    /LLM API 429/,
  );
  assert.equal(calls, 4);
  assert.deepEqual(waits, [5_000, 10_000, 20_000]);
});

test("does not retry an unexpected response shape", async () => {
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    return response([{ type: "image", url: "https://example.com/image.png" }]);
  };

  await assert.rejects(
    callLlm("prompt", 4096, { sleep: async () => undefined }),
    /Unexpected response type from LLM/,
  );
  assert.equal(calls, 1);
});

test("does not retry a missing response content field", async () => {
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    return Response.json({ choices: [{ message: {} }] });
  };

  await assert.rejects(
    callLlm("prompt", 4096, { sleep: async () => undefined }),
    /Unexpected response type from LLM/,
  );
  assert.equal(calls, 1);
});

test("disables thinking for GLM coding endpoints", async () => {
  const bodies: Record<string, unknown>[] = [];
  globalThis.fetch = async (_input, init) => {
    bodies.push(JSON.parse(String(init?.body)));
    return response("ok");
  };
  process.env["OPENAI_BASE_URL"] = "https://api.z.ai/api/coding/paas/v4";

  await callLlm("prompt", 4096, { sleep: async () => undefined });

  assert.deepEqual(bodies[0]?.["thinking"], { type: "disabled" });
});

test("omits the thinking flag for non-GLM endpoints", async () => {
  const bodies: unknown[] = [];
  globalThis.fetch = async (_input, init) => {
    bodies.push(JSON.parse(String(init?.body)));
    return response("ok");
  };
  process.env["OPENAI_BASE_URL"] = "https://api.openai.com/v1";

  await callLlm("prompt", 4096, { sleep: async () => undefined });

  assert.equal("thinking" in (bodies[0] as Record<string, unknown>), false);
});
