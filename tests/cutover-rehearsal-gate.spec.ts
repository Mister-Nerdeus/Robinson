import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

function read(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function run() {
  const requiredDocs = [
    "docs/production-cutover-checklist.md",
    "docs/release-readiness-proof-pack.md",
    "docs/rollback-runbook.md",
    "docs/email-domain-contract.md",
    "docs/inbound-mail-ops-contract.md",
  ];

  for (const doc of requiredDocs) {
    assert.ok(fs.existsSync(path.join(process.cwd(), doc)), `missing cutover rehearsal artifact: ${doc}`);
  }

  const checklist = read("docs/production-cutover-checklist.md").toLowerCase();
  assert.ok(checklist.includes("dry-run rehearsal"), "cutover checklist must include dry-run rehearsal section");
  assert.ok(checklist.includes("owner"), "cutover checklist must include owner signoff gating");
  assert.ok(checklist.includes("go / no-go"), "cutover checklist must include explicit go/no-go section");

  const rollback = read("docs/rollback-runbook.md").toLowerCase();
  assert.ok(rollback.includes("domain/mail rollback"), "rollback runbook must include domain/mail rollback");
  assert.ok(rollback.includes("config rollback"), "rollback runbook must include config rollback");

  const proofPack = read("docs/release-readiness-proof-pack.md").toLowerCase();
  assert.ok(proofPack.includes("notification"), "proof pack must include notification evidence");
  assert.ok(proofPack.includes("rollback"), "proof pack must include rollback evidence");
  assert.ok(proofPack.includes("recommendation"), "proof pack must include explicit recommendation record");

  console.log("[cutover-rehearsal-gate] dry-run, rollback, and go/no-go evidence gates verified");
}

run();
