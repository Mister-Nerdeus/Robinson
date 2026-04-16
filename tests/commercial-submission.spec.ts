import assert from "node:assert";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createSubmission, getSubmissions } from "../src/lib/forms/actions";
import { commercialServiceSchema } from "../src/lib/forms/schema";

async function run() {
  const payload = {
    type: "commercial-service",
    fullName: "Facility Owner",
    phone: "555-7777",
    email: "facility@example.com",
    streetAddress: "250 Commerce Rd",
    city: "Pierson",
    zip: "49339",
    state: "MI",
    preferredDate: "2026-04-25",
    urgency: "urgent",
    facilityName: "Westside Foods",
    facilityType: "restaurant",
    serviceNeeded: "grease-trap",
    greaseTrapCount: "6",
    onSiteContact: "Alex Shift Lead",
    accessHours: "Weekdays 5am-2pm",
    greaseTrapLocation: "indoor",
    previousServiceHistoryKnown: "yes",
    serviceUrgency: "urgent",
    message: "Need recurring service with after-hours access notes.",
  };

  const parsed = commercialServiceSchema.safeParse(payload);
  assert.ok(parsed.success, "Commercial payload must validate");

  await createSubmission(parsed.data);

  const rows = await getSubmissions();
  const commercial = rows.find((row) => row.type === "commercial-service" && row.fullName === payload.fullName);
  assert.ok(commercial, "Commercial row should be persisted");
  if (commercial.type !== "commercial-service") {
    throw new Error("Stored row type drifted from commercial-service");
  }
  assert.equal(commercial.facilityName, payload.facilityName, "facilityName must persist");
  assert.equal(commercial.serviceNeeded, payload.serviceNeeded, "serviceNeeded must persist");
  assert.equal(commercial.city, payload.city, "city must persist");
  assert.equal(commercial.zip, payload.zip, "zip must persist");

  const logPath = path.join(process.cwd(), "data", "notification-log.ndjson");
  const logRaw = await readFile(logPath, "utf8");
  assert.match(logRaw, /Facility Name: Westside Foods/, "notification output must include facility name");
  assert.match(logRaw, /Service Needed: grease-trap/, "notification output must include service needed");
  assert.match(logRaw, /Grease Trap Location: indoor/, "notification output must include trap location");

  console.log("[commercial] facility fields persist across storage and notification");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
