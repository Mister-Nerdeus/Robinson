import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

function read(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function run() {
  const requiredDocs = [
    "docs/cloudflare-go-live-contract.md",
    "docs/dns-inventory-precutover.md",
    "docs/nameserver-cutover-runbook.md",
    "docs/production-cutover-checklist.md",
  ];

  for (const doc of requiredDocs) {
    assert.ok(fs.existsSync(path.join(process.cwd(), doc)), `missing cloudflare cutover artifact: ${doc}`);
  }

  const goLive = read("docs/cloudflare-go-live-contract.md").toLowerCase();
  assert.ok(goLive.includes("godaddy"), "go-live contract must keep godaddy as registrar");
  assert.ok(goLive.includes("authoritative"), "go-live contract must define authoritative dns ownership");
  assert.ok(goLive.includes("dnssec"), "go-live contract must include dnssec handling");

  const runbook = read("docs/nameserver-cutover-runbook.md").toLowerCase();
  assert.ok(runbook.includes("nameserver"), "runbook must include nameserver cutover steps");
  assert.ok(runbook.includes("propagation"), "runbook must include propagation verification");
  assert.ok(runbook.includes("rollback"), "runbook must include rollback");

  const checklist = read("docs/production-cutover-checklist.md").toLowerCase();
  assert.ok(checklist.includes("pre-cutover dns inventory"), "checklist must include pre-cutover dns inventory gate");

  const tunnelInstaller = read("scripts/windows/install-cloudflare-tunnel-service.ps1");
  const tunnelProof = read("docs/verification/cloudflare-tunnel-demo-proof.md");
  const uuidPattern = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;
  assert.ok(!uuidPattern.test(tunnelInstaller), "service installer must not hardcode a live tunnel UUID");
  assert.ok(!uuidPattern.test(tunnelProof), "proof docs must not publish a live tunnel UUID");

  console.log("[cloudflare-cutover-contract] authoritative dns cutover contract verified");
}

run();
