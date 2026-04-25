import assert from "node:assert";
import { rm } from "node:fs/promises";
import path from "node:path";
import type { SubmissionRecord } from "../src/lib/forms/types";

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
    fullName: "SMTP Contract",
    phone: "555-0300",
    email: "smtp.contract@example.com",
    streetAddress: "300 SMTP Rd",
    city: "Pierson",
    zip: "49339",
    state: "MI",
    address: "300 SMTP Rd, Pierson, MI 49339",
    preferredDate: "2026-04-25",
    preferredTime: "evening",
    urgency: "normal",
    message: "SMTP contract test",
    topic: "general-question",
    serviceLocationInvolved: "yes",
  };
}

async function run() {
  process.env.RUNTIME_MODE = "production";
  process.env.NOTIFICATION_MODE = "smtp";
  process.env.NOTIFICATION_INTERNAL_TO_EMAIL = "dispatch@example.com";
  process.env.NOTIFICATION_FROM_EMAIL = "no-reply@example.com";
  process.env.SMTP_PROFILE = "m365-exchange-online";
  process.env.SMTP_HOST = "";
  process.env.SMTP_PORT = "587";
  process.env.SMTP_USER = "";
  process.env.SMTP_PASS = "";
  process.env.SMTP_SECURE = "false";

  await rm(notificationLogPath, { force: true });

  const { notificationConfig } = await import("../src/config/notifications");
  assert.equal(
    notificationConfig.smtp.profile,
    "m365-exchange-online",
    "SMTP profile should support explicit Exchange Online mode",
  );
  assert.equal(
    notificationConfig.smtp.host,
    "smtp.office365.com",
    "Exchange Online profile should default SMTP host when not provided",
  );

  const { sendSubmissionNotification } = await import("../src/lib/notifications/send");
  const result = await sendSubmissionNotification(buildGeneralRecord("smtp-config-contract"));

  assert.equal(result.ok, false, "smtp contract test with missing credentials should fail fast");
  assert.equal(result.channel, "smtp", "smtp failure should stay in smtp channel contract");
  assert.ok(
    (result.error || "").includes("SMTP credentials are missing"),
    "smtp contract should emit explicit credential guidance",
  );

  console.log("[smtp-config-contract] m365 profile and smtp guardrails verified");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
