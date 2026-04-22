import assert from "node:assert/strict";
import fs from "node:fs";
import { company } from "../../src/config/company";
import { servicesContent } from "../../src/content/services";
import { businessFactRegistry } from "../../src/content/businessFacts";

function read(filePath: string) {
  return fs.readFileSync(filePath, "utf8");
}

function run() {
  assert.ok(
    company.emergencyService.claim.toLowerCase().includes("24/7"),
    "Business-truth emergency claim must stay present",
  );

  const lanes = [
    servicesContent.septicCleaning,
    servicesContent.evaluations,
    servicesContent.portableToilets,
    servicesContent.commercial,
  ];

  for (const lane of lanes) {
    assert.ok(lane.reasonsToCall.length >= 3, "Each request lane must preserve reasons-to-call truth content");
    assert.ok(lane.whatToHaveReady.length >= 3, "Each request lane must preserve prep guidance truth content");
    assert.ok(lane.nextSteps.length >= 2, "Each request lane must preserve next-steps truth content");
  }

  assert.ok(
    fs.existsSync("docs/release/request-route-release-gate.md"),
    "Request-route release gate checklist doc is required",
  );
  assert.ok(
    fs.existsSync("docs/release/public-surface-release-gate.md"),
    "Public-surface release gate doc is required",
  );
  assert.ok(
    fs.existsSync("docs/business-truth/owner-verification-checklist.md"),
    "Owner verification checklist is required",
  );
  assert.ok(
    fs.existsSync("docs/business-truth/owner-truth-dashboard.md"),
    "Owner-facing truth dashboard is required",
  );
  assert.ok(
    fs.existsSync("docs/qa/request-route-screenshot-proof-standard.md"),
    "Screenshot proof standard is required",
  );
  assert.ok(
    fs.existsSync("docs/release/final-service-route-release-gate.md"),
    "Final service-route release gate doc is required",
  );

  const pendingPublicFacts = businessFactRegistry.filter(
    (fact) => fact.status === "pending-verification" && fact.public,
  );
  assert.equal(
    pendingPublicFacts.length,
    0,
    "Pending-verification business facts must not be exposed as public facts",
  );

  const workflow = read(".github/workflows/public-gates.yml");
  assert.ok(workflow.includes("test:request-flow-behavior-e2e"), "CI must run behavior-driven request-flow e2e test");
  assert.ok(workflow.includes("proof:issue-163-172"), "CI must capture request-route composition screenshots");
  assert.ok(workflow.includes("test:visual-public-evidence"), "CI must enforce screenshot evidence contract");
  assert.ok(workflow.includes("test:business-facts-contract"), "CI must enforce canonical business fact contract");

  console.log("[request-route-release-gate] business truth, docs, and CI gates pass");
}

run();
