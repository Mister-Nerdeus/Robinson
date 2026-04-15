import assert from "node:assert";
import { submissionSchema } from "../src/lib/forms/schema";
import { createSubmission } from "../src/lib/forms/actions";

const payloads = [
  {
    type: "general",
    fullName: "General User",
    phone: "555-1000",
    email: "general@example.com",
    address: "10 Main St",
    preferredDate: "2026-04-20",
    urgency: "normal",
    topic: "general-question",
    message: "Need an update on service windows.",
  },
  {
    type: "septic-service",
    fullName: "Septic User",
    phone: "555-1001",
    email: "septic@example.com",
    address: "11 Main St",
    preferredDate: "2026-04-21",
    urgency: "urgent",
    tankSizeGallons: "1500",
    tankCount: "2",
    lidsExposed: "no",
    backupSigns: "slow drains and gurgling",
    message: "Dispatch needed this week.",
  },
  {
    type: "evaluation",
    fullName: "Eval User",
    phone: "555-1002",
    email: "eval@example.com",
    address: "12 Main St",
    preferredDate: "2026-04-22",
    urgency: "normal",
    roleInSale: "realtor",
    brokerageOrCompany: "Example Realty",
    closingDate: "2026-05-01",
    occupancyStatus: "occupied",
    message: "Need evaluation before closing.",
  },
  {
    type: "rental",
    fullName: "Rental User",
    phone: "555-1003",
    email: "rental@example.com",
    address: "13 Main St",
    preferredDate: "2026-04-23",
    urgency: "normal",
    eventType: "construction",
    unitCount: "4",
    rentalDuration: "3 weeks",
    serviceFrequency: "weekly",
    siteType: "easy-truck-access",
    message: "Need rentals for site crew.",
  },
  {
    type: "commercial-service",
    fullName: "Commercial User",
    phone: "555-1004",
    email: "commercial@example.com",
    address: "14 Main St",
    preferredDate: "2026-04-24",
    urgency: "urgent",
    facilityName: "Northside Diner",
    facilityType: "restaurant",
    serviceNeeded: "grease-trap",
    greaseTrapCount: "3",
    onSiteContact: "Sam Manager",
    message: "Recurring grease service needed.",
  },
] as const;

async function run() {
  for (const payload of payloads) {
    const parsed = submissionSchema.safeParse(payload);
    assert.ok(parsed.success, `Schema parse failed for ${payload.type}`);

    const { record } = await createSubmission(parsed.data);
    assert.equal(record.type, payload.type, `Stored type mismatch for ${payload.type}`);

    Object.entries(payload).forEach(([key, value]) => {
      if (key === "type") return;
      assert.equal((record as Record<string, string>)[key], value, `${payload.type} field dropped: ${key}`);
    });
  }

  console.log("[submission-contract] all submission lanes preserve required fields");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
