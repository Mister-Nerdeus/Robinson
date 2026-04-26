import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

function read(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function run() {
  const requiredDocs = [
    "docs/incident-response-contract.md",
    "docs/incident-playbook-forms.md",
    "docs/incident-playbook-public-facts.md",
    "docs/maintenance-checklist.md",
  ];

  for (const doc of requiredDocs) {
    assert.ok(fs.existsSync(path.join(process.cwd(), doc)), `missing maintenance artifact: ${doc}`);
  }

  const incidentContract = read("docs/incident-response-contract.md").toLowerCase();
  const formsPlaybook = read("docs/incident-playbook-forms.md").toLowerCase();
  const factsPlaybook = read("docs/incident-playbook-public-facts.md").toLowerCase();
  const maintenanceChecklist = read("docs/maintenance-checklist.md").toLowerCase();
  const packageJson = read("package.json");

  const incidentClasses = [
    "submission intake failure",
    "notification delivery failure",
    "bad public fact",
    "auth/admin access failure",
    "rollback-needed",
  ];

  for (const incidentClass of incidentClasses) {
    assert.ok(incidentContract.includes(incidentClass), `incident contract missing class: ${incidentClass}`);
  }

  assert.ok(formsPlaybook.includes("first response"), "forms playbook must include first response section");
  assert.ok(factsPlaybook.includes("containment"), "public-facts playbook must include containment section");
  assert.ok(maintenanceChecklist.includes("weekly"), "maintenance checklist must define weekly cadence");
  assert.ok(maintenanceChecklist.includes("monthly"), "maintenance checklist must define monthly cadence");
  assert.ok(maintenanceChecklist.includes("quarterly"), "maintenance checklist must define quarterly cadence");

  assert.ok(packageJson.includes("test:maintenance-gate"), "package scripts must include maintenance gate test");

  console.log("[maintenance-gate] incident taxonomy, runbooks, and schedulable maintenance checklist verified");
}

run();
