import assert from "node:assert/strict";
import fs from "node:fs";
import { company } from "../../src/config/company";
import { servicesContent } from "../../src/content/services";

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
    fs.existsSync("docs/qa/request-route-screenshot-proof-standard.md"),
    "Screenshot proof standard is required",
  );

  const workflow = read(".github/workflows/public-gates.yml");
  assert.ok(workflow.includes("test:request-flow-behavior-e2e"), "CI must run behavior-driven request-flow e2e test");
  assert.ok(workflow.includes("proof:issue-163-172"), "CI must capture request-route composition screenshots");
  assert.ok(workflow.includes("test:visual-public-evidence"), "CI must enforce screenshot evidence contract");

  console.log("[request-route-release-gate] business truth, docs, and CI gates pass");
}

run();
