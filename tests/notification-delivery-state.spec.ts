import assert from "node:assert";
import type { SubmissionRecord } from "../src/lib/forms/types";

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
    fullName: "Delivery Contract",
    phone: "555-7000",
    email: "delivery.contract@example.com",
    streetAddress: "700 Delivery Ln",
    city: "Pierson",
    zip: "49339",
    state: "MI",
    address: "700 Delivery Ln, Pierson, MI 49339",
    preferredDate: "2026-04-25",
    preferredTime: "afternoon",
    urgency: "normal",
    message: "Delivery contract test",
    topic: "general-question",
    serviceLocationInvolved: "yes",
  };
}

async function run() {
  process.env.SUBMISSIONS_DB_PATH = `data/submissions-notification-${Date.now()}.sqlite`;
  process.env.RUNTIME_MODE = "production";
  process.env.NOTIFICATION_MODE = "resend";
  process.env.NOTIFICATION_INTERNAL_TO_EMAIL = "dispatch@example.com";
  process.env.NOTIFICATION_FROM_EMAIL = "no-reply@example.com";
  process.env.NOTIFICATION_FROM_NAME = "Robinson Intake";
  process.env.NOTIFICATION_REPLY_TO_EMAIL = "service@example.com";
  process.env.RESEND_API_KEY = "re_test_123";
  process.env.RESEND_FROM_EMAIL = "intake@example.com";
  process.env.NOTIFICATION_MAX_ATTEMPTS = "2";

  const { sendSubmissionNotification, setResendClientFactoryForTests } = await import(
    "../src/lib/notifications/send"
  );
  const { getNotificationDeliveryRecord } = await import("../src/lib/notifications/deliveryState");

  let sendCalls = 0;
  setResendClientFactoryForTests(() => ({
    emails: {
      send: async () => {
        sendCalls += 1;
        return { data: { id: "re_dedupe_success" }, error: null };
      },
    },
  }));

  const dedupeRecord = buildGeneralRecord(`delivery-dedupe-success-${Date.now()}`);
  const first = await sendSubmissionNotification(dedupeRecord);
  const second = await sendSubmissionNotification(dedupeRecord);

  assert.equal(first.ok, true, "first delivery should succeed");
  assert.equal(first.state, "sent", "first delivery should move to sent state");
  assert.equal(second.ok, true, "second delivery should return prior success");
  assert.equal(second.deduped, true, "second delivery should be deduped");
  assert.equal(sendCalls, 1, "dedupe must prevent duplicate provider send");

  const dedupeStored = await getNotificationDeliveryRecord(dedupeRecord.id, `submission:${dedupeRecord.id}:internal-v1`);
  assert.equal(dedupeStored?.state, "sent", "persisted delivery state should be sent after success");

  setResendClientFactoryForTests(() => ({
    emails: {
      send: async () => ({ data: null, error: { message: "forced retry failure" } }),
    },
  }));

  const failRecord = buildGeneralRecord(`delivery-retry-failure-${Date.now()}`);
  const failed = await sendSubmissionNotification(failRecord);

  assert.equal(failed.ok, false, "failed resend should return failure");
  assert.equal(failed.state, "abandoned", "failed resend should move to abandoned after max attempts");
  assert.equal(failed.attempts, 2, "retry policy must be bounded by configured max attempts");

  const failedStored = await getNotificationDeliveryRecord(failRecord.id, `submission:${failRecord.id}:internal-v1`);
  assert.equal(failedStored?.attemptCount, 2, "persisted attempt count should match retry bound");
  assert.equal(failedStored?.state, "abandoned", "persisted state should be abandoned at retry limit");

  setResendClientFactoryForTests(null);

  console.log("[notification-delivery] dedupe guard and bounded retry policy verified");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
