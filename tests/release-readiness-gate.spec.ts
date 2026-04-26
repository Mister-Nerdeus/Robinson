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
    "docs/project-contract.md",
    "docs/notification-delivery-contract.md",
    "docs/data-retention-contract.md",
  ];

  for (const doc of requiredDocs) {
    assert.ok(fs.existsSync(path.join(process.cwd(), doc)), `missing release-readiness artifact: ${doc}`);
  }

  const readme = read("README.md");
  assert.ok(readme.includes("production-cutover-checklist"), "README must link production cutover checklist");
  assert.ok(readme.includes("release-readiness-proof-pack"), "README must link release readiness proof pack");

  const checklist = read("docs/production-cutover-checklist.md");
  assert.ok(checklist.includes("Go / No-Go"), "cutover checklist must include explicit go/no-go criteria");
  assert.ok(checklist.includes("owner"), "cutover checklist must include owner verification checkpoint");

  const proofPack = read("docs/release-readiness-proof-pack.md");
  const requiredProofs = [
    "persistence",
    "notification",
    "admin auth",
    "public facts",
    "privacy",
    "terms",
  ];
  for (const proof of requiredProofs) {
    assert.ok(proofPack.toLowerCase().includes(proof), `proof pack missing section: ${proof}`);
  }

  const packageJson = read("package.json");
  assert.ok(packageJson.includes("test:release-readiness-gate"), "release readiness test script must exist");

  console.log("[release-readiness] checklist, proof pack, and gate wiring verified");
}

run();
