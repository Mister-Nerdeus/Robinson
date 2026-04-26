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
    "docs/net-cutover-rehearsal.md",
  ];

  for (const doc of requiredDocs) {
    assert.ok(fs.existsSync(path.join(process.cwd(), doc)), `missing net cutover rehearsal artifact: ${doc}`);
  }

  const rehearsal = read("docs/net-cutover-rehearsal.md").toLowerCase();
  assert.ok(rehearsal.includes("cloudflare nameserver"), "rehearsal must include cloudflare nameserver validation");
  assert.ok(rehearsal.includes("railway"), "rehearsal must include railway custom-domain validation");
  assert.ok(rehearsal.includes("microsoft 365"), "rehearsal must include microsoft 365 dns validation");
  assert.ok(rehearsal.includes("rollback"), "rehearsal must include rollback rehearsal steps");

  const proofPack = read("docs/release-readiness-proof-pack.md").toLowerCase();
  assert.ok(proofPack.includes("recommendation"), "proof pack must include explicit recommendation record");
  assert.ok(proofPack.includes("go") && proofPack.includes("no-go"), "proof pack must include go/no-go language");

  const rollback = read("docs/rollback-runbook.md").toLowerCase();
  assert.ok(rollback.includes("dns authority rollback"), "rollback runbook must include dns authority rollback");

  console.log("[net-cutover-rehearsal-gate] .net cutover rehearsal + rollback gates verified");
}

run();
