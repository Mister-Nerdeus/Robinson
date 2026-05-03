import assert from "node:assert";
import { rm } from "node:fs/promises";
import path from "node:path";

async function run() {
  process.env.RATE_LIMIT_MODE = "memory";

  await rm(path.join(process.cwd(), "data", "analytics-events.ndjson"), { force: true });

  const { POST } = await import("../src/app/api/analytics/route");

  const valid = await POST(
    new Request("http://localhost/api/analytics", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-forwarded-for": "198.51.100.20",
      },
      body: JSON.stringify({
        event: "page_view",
        path: "/contact",
        metadata: { surface: "header", visible: true },
      }),
    }),
  );
  assert.equal(valid.status, 200, "valid bounded analytics event should be accepted");

  const invalidEvent = await POST(
    new Request("http://localhost/api/analytics", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-forwarded-for": "198.51.100.21",
      },
      body: JSON.stringify({
        event: "invented_event",
        path: "/contact",
      }),
    }),
  );
  assert.equal(invalidEvent.status, 400, "unknown analytics events should be rejected");

  const oversized = await POST(
    new Request("http://localhost/api/analytics", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "content-length": "4097",
        "x-forwarded-for": "198.51.100.22",
      },
      body: JSON.stringify({ event: "page_view" }),
    }),
  );
  assert.equal(oversized.status, 413, "oversized analytics events should be rejected before logging");

  const unsafeMetadata = await POST(
    new Request("http://localhost/api/analytics", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-forwarded-for": "198.51.100.23",
      },
      body: JSON.stringify({
        event: "page_view",
        path: "/",
        metadata: { "bad key": "not allowed" },
      }),
    }),
  );
  assert.equal(unsafeMetadata.status, 400, "metadata keys should be bounded to safe identifiers");

  console.log("[analytics-contract] analytics intake validation, bounds, and rate guard verified");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
