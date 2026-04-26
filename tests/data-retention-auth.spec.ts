import assert from "node:assert";
import { createSubmission } from "../src/lib/forms/actions";
import { getSubmissionById } from "../src/lib/submissions/repository";
import { DELETE, GET } from "../src/app/api/submissions/route";

async function run() {
  process.env.RUNTIME_MODE = "demo";
  process.env.ENABLE_ADMIN_SUBMISSIONS_REVIEW = "true";
  process.env.ADMIN_OWNER_TOKEN = "retention-owner-token-012345";
  process.env.ADMIN_OPS_TOKEN = "retention-ops-token-012345";
  process.env.NOTIFICATION_MODE = "log";

  const anonymousExport = await GET(new Request("http://localhost/api/submissions?export=json"));
  assert.equal(anonymousExport.status, 401, "unauthenticated export must be blocked");

  const ownerExport = await GET(
    new Request("http://localhost/api/submissions?export=json", {
      headers: {
        authorization: "Bearer retention-owner-token-012345",
      },
    }),
  );
  assert.equal(ownerExport.status, 200, "authenticated export should succeed");

  const { record } = await createSubmission(
    {
      type: "general",
      fullName: "Retention User",
      phone: "555-3300",
      email: "retention.user@example.com",
      preferredDate: "2026-04-25",
      preferredTime: "morning",
      urgency: "normal",
      message: "Retention suppression auth test submission.",
      topic: "general-question",
      serviceLocationInvolved: "yes",
      streetAddress: "330 Data Ln",
      city: "Pierson",
      zip: "49339",
      state: "MI",
      address: "",
    },
    {
      source: "direct",
      path: "/contact",
      referrer: "",
      correlationId: "retention-auth-correlation",
    },
  );

  const anonymousDelete = await DELETE(
    new Request("http://localhost/api/submissions", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id: record.id }),
    }),
  );
  assert.equal(anonymousDelete.status, 401, "unauthenticated suppression must be blocked");

  const ownerDelete = await DELETE(
    new Request("http://localhost/api/submissions", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer retention-owner-token-012345",
      },
      body: JSON.stringify({ id: record.id }),
    }),
  );
  assert.equal(ownerDelete.status, 200, "authenticated suppression should succeed");

  const suppressed = await getSubmissionById(record.id);
  assert.equal(suppressed?.retention?.dataState, "suppressed", "suppression should persist retention state");
  assert.equal(suppressed?.fullName, "[suppressed]", "suppression should redact customer identity fields");

  console.log("[data-retention-auth] authenticated export and suppression controls verified");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
