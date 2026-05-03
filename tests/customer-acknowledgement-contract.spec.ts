import assert from "node:assert";
import type { SubmissionRecord } from "../src/lib/forms/types";

function buildRecord(): SubmissionRecord {
  return {
    id: `customer-ack-${Date.now()}`,
    createdAt: new Date().toISOString(),
    triageUpdatedAt: new Date().toISOString(),
    triageUpdatedBy: "spec",
    lifecycleState: "new",
    internalNote: "",
    serviceLane: "general",
    attributionSource: "direct",
    attributionPath: "/contact",
    attributionReferrer: "",
    correlationId: "customer-ack-contract",
    type: "general",
    fullName: "Customer Ack Contract",
    phone: "555-0100",
    email: "customer.ack@example.com",
    streetAddress: "100 Ack Rd",
    city: "Pierson",
    zip: "49339",
    state: "MI",
    address: "100 Ack Rd, Pierson, MI 49339",
    preferredDate: "2026-05-05",
    preferredTime: "morning",
    urgency: "normal",
    message: "Customer acknowledgement contract test.",
    topic: "general-question",
    serviceLocationInvolved: "yes",
  };
}

async function run() {
  process.env.NOTIFICATION_MODE = "log";

  const { deliverSubmissionEmail } = await import("../src/lib/email/provider");
  const delivery = await deliverSubmissionEmail(buildRecord());

  assert.equal(delivery.internal.ok, true, "internal notification should still flow through configured provider");
  assert.equal(delivery.customer.ok, false, "customer acknowledgement must not claim sent without a provider path");
  assert.equal(delivery.customer.state, "abandoned", "customer acknowledgement should explicitly report not delivered");
  assert.match(
    delivery.customer.error || "",
    /not configured/i,
    "customer acknowledgement should explain that delivery is not configured",
  );

  console.log("[customer-acknowledgement-contract] customer ack delivery state is honest when disabled");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
