import assert from "node:assert";
import { rm, readFile } from "node:fs/promises";
import path from "node:path";

const logPath = path.join(process.cwd(), "data", "observability.ndjson");

async function run() {
  process.env.NOTIFICATION_MODE = "smtp";
  process.env.NOTIFICATION_TO_EMAIL = "dispatch@example.com";
  process.env.RUNTIME_MODE = "demo";
  process.env.ENABLE_ADMIN_SUBMISSIONS_REVIEW = "true";
  process.env.ADMIN_OWNER_TOKEN = "observability-owner-token-012345";
  process.env.ADMIN_OPS_TOKEN = "observability-ops-token-012345";
  process.env.LOCAL_ONLY_MODE = "false";

  await rm(logPath, { force: true });

  const { POST } = await import("../src/app/api/forms/route");
  const submissionsApi = await import("../src/app/api/submissions/route");

  const invalidResponse = await POST(
    new Request("http://localhost/api/forms", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-correlation-id": "obs-validation-correlation",
        "x-forwarded-for": "203.0.113.10",
      },
      body: JSON.stringify({
        type: "general",
        fullName: "Validation User",
        message: "Normal customer message body for schema validation path.",
      }),
    }),
  );
  assert.equal(invalidResponse.status, 400, "invalid payload should fail validation");

  const abuseResponse = await POST(
    new Request("http://localhost/api/forms", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-correlation-id": "obs-abuse-correlation",
        "x-forwarded-for": "203.0.113.11",
      },
      body: JSON.stringify({
        type: "general",
        fullName: "Abuse User",
        phone: "555-0199",
        email: "abuse@example.com",
        streetAddress: "1 Main",
        city: "Pierson",
        zip: "49339",
        state: "MI",
        preferredDate: "",
        preferredTime: "",
        urgency: "normal",
        topic: "general-question",
        serviceLocationInvolved: "yes",
        message: "Valid message body for abuse test path.",
        companyWebsite: "https://spam.example",
      }),
    }),
  );
  assert.equal(abuseResponse.status, 400, "honeypot abuse should be blocked");

  const acceptedResponse = await POST(
    new Request("http://localhost/api/forms", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-correlation-id": "obs-accepted-correlation",
        referer: "https://google.com/search?q=septic",
        "x-forwarded-for": "203.0.113.12",
      },
      body: JSON.stringify({
        type: "general",
        fullName: "Notify Failure",
        phone: "555-2200",
        email: "notify@example.com",
        streetAddress: "44 Alert Rd",
        city: "Pierson",
        zip: "49339",
        state: "MI",
        preferredDate: "2026-04-23",
        preferredTime: "morning",
        urgency: "normal",
        topic: "general-question",
        serviceLocationInvolved: "yes",
        message: "Notification failure path should emit structured event.",
      }),
    }),
  );
  assert.equal(acceptedResponse.status, 201, "submission should still persist when notification fails");

  const deniedAdmin = await submissionsApi.GET(new Request("http://localhost/api/submissions"));
  assert.equal(deniedAdmin.status, 401, "anonymous admin review access must be denied");

  const allowedAdmin = await submissionsApi.GET(
    new Request("http://localhost/api/submissions", {
      headers: {
        authorization: "Bearer observability-owner-token-012345",
      },
    }),
  );
  assert.equal(allowedAdmin.status, 200, "authenticated admin review access should be allowed");

  const raw = await readFile(logPath, "utf8");
  const entries = raw
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line) as Record<string, unknown>);

  const requiredEvents = [
    "submission.rejected",
    "abuse.blocked",
    "submission.accepted",
    "notification.failure",
    "admin.review_access.denied",
    "admin.review_access.allowed",
  ];

  for (const eventType of requiredEvents) {
    assert.ok(entries.some((entry) => entry.eventType === eventType), `missing observability event: ${eventType}`);
  }

  const acceptedEvent = entries.find((entry) => entry.eventType === "submission.accepted");
  assert.equal(acceptedEvent?.correlationId, "obs-accepted-correlation", "accepted event must carry correlation id");

  const serialized = JSON.stringify(entries);
  assert.ok(
    !serialized.includes("notify@example.com") &&
      !serialized.includes("555-2200") &&
      !serialized.includes("44 Alert Rd") &&
      !serialized.includes("Notify Failure") &&
      !serialized.includes("Abuse User") &&
      !serialized.includes("Validation User") &&
      !serialized.includes("Pierson") &&
      !serialized.includes("49339") &&
      !serialized.includes("203.0.113."),
    "sensitive fields must be redacted in observability output",
  );

  console.log("[observability] submission/admin event taxonomy, correlation ids, and redaction verified");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
