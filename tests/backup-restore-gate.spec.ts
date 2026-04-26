import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { createSubmission } from "../src/lib/forms/actions";
import {
  getSubmissionById,
  saveSubmission,
  updateSubmissionTriageById,
} from "../src/lib/submissions/repository";

function read(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

async function run() {
  process.env.NOTIFICATION_MODE = "log";
  process.env.RUNTIME_MODE = "demo";

  const { record } = await createSubmission(
    {
      type: "general",
      fullName: "Backup Rehearsal",
      phone: "555-7788",
      email: "backup.rehearsal@example.com",
      preferredDate: "2026-04-26",
      preferredTime: "morning",
      urgency: "normal",
      message: "Backup rehearsal seed record",
      topic: "general-question",
      serviceLocationInvolved: "yes",
      streetAddress: "260 Recovery Rd",
      city: "Pierson",
      zip: "49339",
      state: "MI",
      address: "",
    },
    {
      source: "referral",
      path: "/contact",
      referrer: "https://backup-rehearsal.example",
      correlationId: "backup-restore-gate-correlation",
    },
  );

  const snapshot = await getSubmissionById(record.id);
  assert.ok(snapshot, "backup rehearsal needs a persisted submission");
  assert.equal(snapshot?.lifecycleState, "new", "rehearsal baseline should start in new lifecycle state");

  const drifted = await updateSubmissionTriageById(record.id, "closed", "intentional rehearsal drift", "owner-rehearsal");
  assert.equal(drifted, true, "rehearsal must be able to induce controlled drift");

  const driftedRecord = await getSubmissionById(record.id);
  assert.equal(driftedRecord?.lifecycleState, "closed", "controlled drift should be visible before restore");

  await saveSubmission(snapshot!);

  const restored = await getSubmissionById(record.id);
  assert.equal(restored?.lifecycleState, "new", "restore should recover pre-drift lifecycle state");
  assert.equal(restored?.message, snapshot?.message, "restore should recover canonical record payload");

  const backupContract = read("docs/backup-restore-contract.md").toLowerCase();
  const rehearsalRunbook = read("docs/recovery-rehearsal-runbook.md").toLowerCase();
  const projectContract = read("docs/project-contract.md").toLowerCase();

  assert.ok(backupContract.includes("backup scope"), "backup contract must define scope");
  assert.ok(backupContract.includes("retention"), "backup contract must define retention policy");
  assert.ok(rehearsalRunbook.includes("validation proof"), "runbook must require restore validation evidence");
  assert.ok(projectContract.includes("backup"), "project contract must reference backup/restore obligations");

  console.log("[backup-restore-gate] backup scope and restore rehearsal validation verified");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
