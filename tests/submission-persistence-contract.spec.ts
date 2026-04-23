import assert from "node:assert";
import { existsSync } from "node:fs";
import { createSubmission } from "../src/lib/forms/actions";
import { listSubmissions } from "../src/lib/submissions/repository";
import { getSubmissionsDatabasePath } from "../src/lib/db/sqlite";

async function run() {
  const payload = {
    type: "general" as const,
    fullName: "Persistence Contract",
    phone: "555-2000",
    email: "persistence@example.com",
    preferredDate: "2026-04-23",
    preferredTime: "morning",
    urgency: "normal" as const,
    message: "Persist this in canonical sqlite storage.",
    topic: "general-question",
    serviceLocationInvolved: "yes" as const,
    streetAddress: "20 Canonical Dr",
    city: "Pierson",
    zip: "49339",
    state: "MI",
    address: "",
  };

  const { record } = await createSubmission(payload, {
    source: "campaign",
    path: "/contact",
    referrer: "https://example.test/campaign",
    correlationId: "persist-contract-correlation",
  });

  const rows = await listSubmissions({ type: "general" });
  const persisted = rows.find((row) => row.id === record.id);

  assert.ok(persisted, "created submission must be queryable from canonical repository");
  assert.equal(persisted?.serviceLane, "general", "service lane must persist");
  assert.equal(persisted?.attributionSource, "campaign", "attribution source must persist");
  assert.equal(
    persisted?.correlationId,
    "persist-contract-correlation",
    "correlation id must persist",
  );

  const dbPath = getSubmissionsDatabasePath();
  assert.ok(existsSync(dbPath), "sqlite file must exist after write");

  console.log(`[submission-persistence] canonical sqlite persistence verified at ${dbPath}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
