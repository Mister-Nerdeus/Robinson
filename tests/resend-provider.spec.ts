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
    fullName: "Resend Contract",
    phone: "555-0100",
    email: "resend.contract@example.com",
    streetAddress: "100 Contract Ln",
    city: "Pierson",
    zip: "49339",
    state: "MI",
    address: "100 Contract Ln, Pierson, MI 49339",
    preferredDate: "2026-04-25",
    preferredTime: "morning",
    urgency: "normal",
    message: "Resend contract test",
    topic: "general-question",
    serviceLocationInvolved: "yes",
  };
}

async function run() {
  process.env.RUNTIME_MODE = "production";
  process.env.NOTIFICATION_MODE = "resend";
  process.env.NOTIFICATION_INTERNAL_TO_EMAIL = "dispatch@example.com";
  process.env.NOTIFICATION_FROM_EMAIL = "no-reply@example.com";
  process.env.NOTIFICATION_FROM_NAME = "Robinson Intake";
  process.env.NOTIFICATION_REPLY_TO_EMAIL = "service@example.com";
  process.env.RESEND_API_KEY = "re_test_123";
  process.env.RESEND_FROM_EMAIL = "intake@example.com";

  await rm(notificationLogPath, { force: true });

  const { sendSubmissionNotification, setResendClientFactoryForTests } = await import(
    "../src/lib/notifications/send"
  );

  setResendClientFactoryForTests(() => ({
    emails: {
      send: async () => ({ data: { id: "re_12345" }, error: null }),
    },
  }));

  const success = await sendSubmissionNotification(buildGeneralRecord(`resend-success-${Date.now()}`));
  assert.equal(success.ok, true, "resend success result should be ok");
  assert.equal(success.channel, "resend", "resend mode should map channel to resend");
  assert.equal(success.messageId, "re_12345", "resend message id should map into delivery contract");

  setResendClientFactoryForTests(() => ({
    emails: {
      send: async () => ({ data: null, error: { message: "simulated resend failure" } }),
    },
  }));

  const failure = await sendSubmissionNotification(buildGeneralRecord(`resend-failure-${Date.now()}`));
  assert.equal(failure.ok, false, "resend failures should return contract failure");
  assert.equal(failure.channel, "resend", "failure channel should remain resend");
  assert.ok(
    (failure.error || "").includes("simulated resend failure"),
    "resend error message should map into delivery contract",
  );

  setResendClientFactoryForTests(null);

  console.log("[resend-provider] resend delivery success/failure contract verified");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
