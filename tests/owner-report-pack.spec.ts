import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { createSubmission } from "../src/lib/forms/actions";
import { listOwnerReportPack, updateSubmissionTriageById } from "../src/lib/submissions/repository";

function read(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function normalizeForDeterminism(pack: Awaited<ReturnType<typeof listOwnerReportPack>>) {
  return {
    ...pack,
    generatedAtUtc: "",
  };
}

async function run() {
  process.env.NOTIFICATION_MODE = "log";
  process.env.RUNTIME_MODE = "demo";

  const seedOne = await createSubmission(
    {
      type: "septic-service",
      fullName: "Report Pack Septic",
      phone: "555-8801",
      email: "report.septic@example.com",
      streetAddress: "101 Report Ln",
      city: "Pierson",
      zip: "49339",
      state: "MI",
      preferredDate: "2026-04-26",
      preferredTime: "morning",
      urgency: "urgent",
      message: "Need septic service",
      tankSizeGallons: "1000",
      tankCount: "1",
      lidsExposed: "yes",
      tankLocationKnown: "yes",
      problemSigns: ["slow-drains"],
      additionalWarningDetails: "",
      accessIssues: ["none"],
      dispatchContactName: "Ops",
      dispatchContactPhone: "555-8802",
      truckAccessLevel: "direct",
      occupancyAtService: "occupied",
      address: "",
    },
    {
      source: "campaign",
      path: "/services/septic-cleaning",
      referrer: "https://report-pack.example/campaign",
      correlationId: "owner-report-pack-septic",
    },
  );

  const seedTwo = await createSubmission(
    {
      type: "evaluation",
      fullName: "Report Pack Evaluation",
      phone: "555-8811",
      email: "report.evaluation@example.com",
      streetAddress: "102 Report Ln",
      city: "Pierson",
      zip: "49339",
      state: "MI",
      preferredDate: "2026-04-26",
      preferredTime: "afternoon",
      urgency: "normal",
      roleInSale: "realtor",
      deadlineType: "closing-date",
      brokerageOrCompany: "Pack Realty",
      closingDate: "2026-05-10",
      timelineFlexibility: "firm-date",
      occupancyStatus: "occupied",
      accessContactName: "Agent",
      accessContactPhone: "555-8812",
      accessInstructions: "Call first",
      transactionNotes: "none",
      utilityOnStatus: "yes",
      occupantPresent: "no",
      propertyType: "single-family",
      message: "Need evaluation",
      address: "",
    },
    {
      source: "campaign",
      path: "/realtors",
      referrer: "https://report-pack.example/campaign",
      correlationId: "owner-report-pack-evaluation",
    },
  );

  await updateSubmissionTriageById(seedOne.record.id, "contacted", "owner callback complete", "owner-report-pack");

  const packOne = await listOwnerReportPack({ source: "campaign" });
  const packTwo = await listOwnerReportPack({ source: "campaign" });

  assert.deepEqual(
    normalizeForDeterminism(packOne),
    normalizeForDeterminism(packTwo),
    "owner report pack output must be deterministic for unchanged data",
  );

  assert.ok(
    packOne.submissionsByLane.some((entry) => entry.lane === "septic-service"),
    "report pack must include submissions by lane",
  );
  assert.ok(
    packOne.lifecycleByLane.some((entry) => entry.lane === "septic-service" && entry.lifecycleState === "contacted"),
    "report pack must include lifecycle by lane",
  );
  assert.ok(
    packOne.deliveryStateSummary.length > 0,
    "report pack must include delivery-state summary",
  );
  assert.ok(
    packOne.timeToFirstOwnerAction.samples >= 1,
    "report pack must compute time-to-first-owner-action where available",
  );

  assert.ok(read("docs/owner-report-pack.md").toLowerCase().includes("submissions by lane"), "owner report pack doc must define required views");
  assert.ok(read("docs/reporting-regeneration-runbook.md").toLowerCase().includes("determinism"), "reporting runbook must define regeneration determinism check");
  assert.ok(fs.existsSync(path.join(process.cwd(), "docs/samples/owner-report-pack-sample.json")), "sample report export must exist");

  console.log("[owner-report-pack] canonical report pack generation and determinism verified");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
