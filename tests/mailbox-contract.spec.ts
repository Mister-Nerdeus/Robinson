import assert from "node:assert";
import { readFile, rm } from "node:fs/promises";
import path from "node:path";
import { submissionTypes, type SubmissionRecord } from "../src/lib/forms/types";

const notificationLogPath = path.join(process.cwd(), "data", "notification-log.ndjson");

function buildGeneralRecord(id: string): SubmissionRecord {
  return {
    id,
    createdAt: new Date().toISOString(),
    triageUpdatedAt: new Date().toISOString(),
    triageUpdatedBy: "spec",
    lifecycleState: "new",
    internalNote: "",
    serviceLane: "general",
    attributionSource: "direct",
    attributionPath: "/contact",
    attributionReferrer: "",
    correlationId: `corr-${id}`,
    type: "general",
    fullName: "Mailbox Contract",
    phone: "555-0200",
    email: "mailbox.contract@example.com",
    streetAddress: "200 Mailbox Rd",
    city: "Pierson",
    zip: "49339",
    state: "MI",
    address: "200 Mailbox Rd, Pierson, MI 49339",
    preferredDate: "2026-04-25",
    preferredTime: "afternoon",
    urgency: "normal",
    message: "Mailbox contract test",
    topic: "general-question",
    serviceLocationInvolved: "yes",
  };
}

async function run() {
  process.env.RUNTIME_MODE = "production";
  process.env.NOTIFICATION_MODE = "log";
  process.env.NOTIFICATION_INTERNAL_TO_EMAIL = "ops-default@example.com";
  process.env.NOTIFICATION_LANE_TO_EMAIL_MAP =
    "general:general-lane@example.com;septic-service:dispatch@example.com";
  process.env.NOTIFICATION_FROM_EMAIL = "no-reply@example.com";
  process.env.NOTIFICATION_FROM_NAME = "Robinson Service Intake";
  process.env.NOTIFICATION_REPLY_TO_EMAIL = "service-desk@example.com";

  await rm(notificationLogPath, { force: true });

  const { resolveInternalRecipient } = await import("../src/config/notifications");
  const { sendSubmissionNotification } = await import("../src/lib/notifications/send");

  for (const lane of submissionTypes) {
    const recipient = resolveInternalRecipient(lane);
    assert.ok(recipient.includes("@"), `lane ${lane} must resolve to a valid recipient rule`);
  }

  const submissionId = `mailbox-contract-${Date.now()}`;
  const result = await sendSubmissionNotification(buildGeneralRecord(submissionId));
  assert.equal(result.ok, true, "log mode should still succeed under mailbox contract");
  assert.equal(result.channel, "log", "mailbox contract should remain provider-neutral in log mode");

  const lines = (await readFile(notificationLogPath, "utf8")).trim().split("\n").filter(Boolean);
  const parsed = lines.map((line) => JSON.parse(line) as Record<string, unknown>);
  const last = [...parsed].reverse().find((entry) => typeof entry.recipient === "string") || {};

  assert.equal(last.recipient, "general-lane@example.com", "lane-specific routing must override default recipient");
  assert.equal(last.replyTo, "service-desk@example.com", "reply-to must be independent from sender address");
  assert.ok(
    String(last.from || "").includes("no-reply@example.com"),
    "sender address must remain explicit and provider-neutral",
  );

  console.log("[mailbox-contract] sender identity, reply-to, and lane routing verified");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
