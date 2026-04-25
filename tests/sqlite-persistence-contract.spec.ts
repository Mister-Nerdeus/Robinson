import assert from "node:assert";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { rm } from "node:fs/promises";
import path from "node:path";

async function run() {
  const tempDbPath = path.join(process.cwd(), "data", "sqlite-contract-test.sqlite");
  const legacyJsonPath = path.join(process.cwd(), "data", "submissions.json");

  process.env.SUBMISSIONS_DB_PATH = tempDbPath;
  process.env.NOTIFICATION_MODE = "log";
  process.env.NOTIFICATION_INTERNAL_TO_EMAIL = "sqlite-contract@example.com";
  process.env.NOTIFICATION_FROM_EMAIL = "no-reply@example.com";

  await rm(tempDbPath, { force: true });

  const { createSubmission } = await import("../src/lib/forms/actions");
  const { listSubmissions, saveSubmission } = await import("../src/lib/submissions/repository");

  const { record } = await createSubmission({
    type: "general",
    fullName: "SQLite Contract",
    phone: "555-0400",
    email: "sqlite.contract@example.com",
    preferredDate: "2026-04-25",
    preferredTime: "morning",
    urgency: "normal",
    message: "sqlite persistence contract",
    topic: "general-question",
    serviceLocationInvolved: "yes",
    streetAddress: "400 SQLite Ave",
    city: "Pierson",
    zip: "49339",
    state: "MI",
    address: "",
  });

  const rows = await listSubmissions({ type: "general" });
  assert.ok(rows.some((row) => row.id === record.id), "new records must persist in sqlite repository");
  assert.ok(existsSync(tempDbPath), "sqlite file must be created at configured path");

  const legacyRecord = {
    ...record,
    id: "legacy-import-contract-row",
    createdAt: new Date().toISOString(),
    triageUpdatedAt: new Date().toISOString(),
    triageUpdatedBy: "legacy",
    correlationId: "legacy-import-contract-row",
  };

  writeFileSync(legacyJsonPath, JSON.stringify([legacyRecord], null, 2), "utf8");
  await saveSubmission(legacyRecord);

  const imported = await listSubmissions({ type: "general" });
  assert.ok(
    imported.some((row) => row.id === "legacy-import-contract-row"),
    "legacy JSON rows must be importable into sqlite canonical storage",
  );

  const actionsSource = readFileSync(path.join(process.cwd(), "src", "lib", "forms", "actions.ts"), "utf8");
  assert.ok(
    actionsSource.includes('from "@/lib/submissions/repository"'),
    "form actions must use sqlite repository as canonical runtime store",
  );

  console.log("[sqlite-persistence] sqlite canonical storage and legacy import path verified");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
