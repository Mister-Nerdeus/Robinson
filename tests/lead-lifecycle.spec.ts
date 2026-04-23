import assert from "node:assert";
import { createSubmission } from "../src/lib/forms/actions";
import { listSubmissionReport, listSubmissions, updateSubmissionTriageById } from "../src/lib/submissions/repository";

async function run() {
  const { record } = await createSubmission(
    {
      type: "evaluation",
      fullName: "Lifecycle Lead",
      phone: "555-3300",
      email: "lifecycle@example.com",
      streetAddress: "90 Sale St",
      city: "Pierson",
      zip: "49339",
      state: "MI",
      preferredDate: "2026-04-24",
      preferredTime: "morning",
      urgency: "urgent",
      roleInSale: "realtor",
      deadlineType: "closing-date",
      brokerageOrCompany: "Lifecycle Realty",
      closingDate: "2026-05-01",
      timelineFlexibility: "firm-date",
      occupancyStatus: "occupied",
      accessContactName: "Listing Agent",
      accessContactPhone: "555-3301",
      accessInstructions: "Call before arrival",
      transactionNotes: "Contingency window is tight",
      utilityOnStatus: "yes",
      occupantPresent: "no",
      propertyType: "single-family",
      message: "Need a fast turnaround evaluation.",
      address: "",
    },
    {
      source: "referral",
      path: "/realtors",
      referrer: "https://partner-broker.example",
      correlationId: "lifecycle-correlation-id",
    },
  );

  assert.equal(record.lifecycleState, "new", "new submissions must begin in lifecycle new state");
  assert.equal(record.serviceLane, "evaluation", "lane should mirror submission type");
  assert.equal(record.attributionSource, "referral", "attribution should persist from request context");

  const contacted = await updateSubmissionTriageById(record.id, "contacted", "Called listing agent", "ops-user");
  assert.equal(contacted, true, "owner/ops should be able to update lifecycle status");

  const scheduled = await updateSubmissionTriageById(record.id, "scheduled", "Inspection date reserved", "owner-user");
  assert.equal(scheduled, true, "lifecycle should progress to scheduled");

  const rows = await listSubmissions({ type: "evaluation" });
  const updated = rows.find((row) => row.id === record.id);
  assert.equal(updated?.lifecycleState, "scheduled", "latest lifecycle state should persist");
  assert.ok(updated?.triageUpdatedBy, "triage update actor must persist");

  const report = await listSubmissionReport({ type: "evaluation" });
  const grouped = report.find(
    (entry) =>
      entry.lane === "evaluation" &&
      entry.lifecycleState === "scheduled" &&
      entry.attributionSource === "referral",
  );
  assert.ok(grouped, "reporting must group by lane, lifecycle state, and attribution source");

  console.log("[lead-lifecycle] lifecycle transitions and attribution reporting verified");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
