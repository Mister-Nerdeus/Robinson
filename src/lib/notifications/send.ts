import nodemailer from "nodemailer";
import { Resend } from "resend";
import { notificationConfig, resolveInternalRecipient } from "@/config/notifications";
import type { SubmissionRecord } from "@/lib/forms/types";
import { getSubmissionSummaryFields } from "@/lib/forms/types";
import type { DeliveryResult } from "./types";
import { appendNotificationLog } from "./log";
import { getRuntimeEnv } from "@/lib/runtime/env";
import {
  getNotificationDeliveryRecord,
  upsertNotificationDeliveryRecord,
} from "@/lib/notifications/deliveryState";
import { logStructuredEvent } from "@/lib/observability";

const submissionTypeLabels: Record<SubmissionRecord["type"], string> = {
  general: "General Contact",
  "septic-service": "Septic Service",
  evaluation: "Well/Septic Evaluation",
  rental: "Portable Toilet Rental",
  "commercial-service": "Commercial Service",
};

function renderSubject(record: SubmissionRecord) {
  const base = `[${submissionTypeLabels[record.type]}] New intake - ${record.fullName}`;
  return notificationConfig.subjectPrefix ? `${notificationConfig.subjectPrefix} ${base}` : base;
}

function renderFromValue() {
  return notificationConfig.fromName
    ? `${notificationConfig.fromName} <${notificationConfig.fromEmail}>`
    : notificationConfig.fromEmail;
}

function renderTypeSpecificLines(record: SubmissionRecord): string[] {
  switch (record.type) {
    case "general":
      return [
        `Topic: ${record.topic}`,
        `Service Location Involved: ${record.serviceLocationInvolved}`,
      ];
    case "septic-service":
      return [
        `Tank Size (Gallons): ${record.tankSizeGallons}`,
        `Tank Count: ${record.tankCount}`,
        `Lids Exposed: ${record.lidsExposed}`,
        `Tank Location Known: ${record.tankLocationKnown}`,
        `Problem Signs: ${record.problemSigns.join(", ") || "-"}`,
        `Additional Warning Details: ${record.additionalWarningDetails || "-"}`,
        `Access Issues: ${record.accessIssues.join(", ") || "-"}`,
        `Dispatch Contact Name: ${record.dispatchContactName}`,
        `Dispatch Contact Phone: ${record.dispatchContactPhone || "-"}`,
        `Truck Access Level: ${record.truckAccessLevel}`,
        `Occupancy At Service: ${record.occupancyAtService}`,
      ];
    case "evaluation":
      return [
        `Role In Sale: ${record.roleInSale}`,
        `Primary Deadline: ${record.deadlineType}`,
        `Brokerage/Company: ${record.brokerageOrCompany}`,
        `Closing Date: ${record.closingDate}`,
        `Timeline Flexibility: ${record.timelineFlexibility}`,
        `Occupancy Status: ${record.occupancyStatus}`,
        `Access Contact Name: ${record.accessContactName}`,
        `Access Contact Phone: ${record.accessContactPhone}`,
        `Utility On: ${record.utilityOnStatus}`,
        `Occupant Present: ${record.occupantPresent}`,
        `Property Type: ${record.propertyType}`,
        `Access Instructions: ${record.accessInstructions || "-"}`,
        `Transaction Notes: ${record.transactionNotes || "-"}`,
      ];
    case "rental":
      return [
        `Event Type: ${record.eventType}`,
        `Unit Count: ${record.unitCount}`,
        `Rental Duration: ${record.rentalDuration}`,
        `Service Frequency: ${record.serviceFrequency}`,
        `Site Type: ${record.siteType}`,
        `Handwash Station Needed: ${record.handwashStationNeeded}`,
        `ADA Unit Needed: ${record.adaUnitNeeded}`,
        `Placement Surface: ${record.placementSurface}`,
        `Site Access Notes: ${record.siteAccessNotes || "-"}`,
      ];
    case "commercial-service":
      return [
        `Facility Name: ${record.facilityName}`,
        `Facility Type: ${record.facilityType}`,
        `Service Needed: ${record.serviceNeeded}`,
        `Grease Trap Count: ${record.greaseTrapCount}`,
        `On-Site Contact: ${record.onSiteContact}`,
        `Access Hours: ${record.accessHours || "-"}`,
        `Grease Trap Location: ${record.greaseTrapLocation}`,
        `Previous Service History Known: ${record.previousServiceHistoryKnown}`,
        `Service Urgency: ${record.serviceUrgency}`,
      ];
  }
}

function renderText(record: SubmissionRecord) {
  const summaryLines = getSubmissionSummaryFields(record).map(
    (field) => `${field.label}: ${field.value}`,
  );

  return [
    `Type: ${submissionTypeLabels[record.type]} (${record.type})`,
    `Created: ${record.createdAt}`,
    `Name: ${record.fullName}`,
    `Phone: ${record.phone}`,
    `Email: ${record.email}`,
    ...summaryLines,
    ...renderTypeSpecificLines(record),
    `Message: ${record.message}`,
  ].join("\n");
}

let etherealAccountPromise: Promise<nodemailer.TestAccount> | null = null;

type ResendSendResult = {
  data?: { id?: string | null } | null;
  error?: { message?: string | null } | null;
};

type ResendClient = {
  emails: {
    send: (payload: {
      from: string;
      to: string;
      replyTo?: string;
      subject: string;
      text: string;
    }) => Promise<ResendSendResult>;
  };
};

let resendClientFactory: (apiKey: string) => ResendClient = (apiKey: string) => new Resend(apiKey);

export function setResendClientFactoryForTests(factory: ((apiKey: string) => ResendClient) | null) {
  resendClientFactory = factory || ((apiKey: string) => new Resend(apiKey));
}

async function getEtherealAccount() {
  if (!etherealAccountPromise) {
    etherealAccountPromise = nodemailer.createTestAccount();
  }
  return etherealAccountPromise;
}

function validateDevelopSafeInbox() {
  const env = getRuntimeEnv();
  if (
    env.mode !== "demo" ||
    (notificationConfig.mode !== "smtp" && notificationConfig.mode !== "resend")
  ) {
    return null;
  }

  const pattern = new RegExp(notificationConfig.developSafeInboxPattern, "i");
  const recipients = [
    notificationConfig.internalDefaultToEmail,
    ...Object.values(notificationConfig.laneToRecipient),
  ].filter(Boolean);
  const hasUnsafeRecipient = recipients.some((entry) => !pattern.test(entry));
  if (hasUnsafeRecipient) {
    return `Develop delivery requires notification recipient emails to match pattern: ${notificationConfig.developSafeInboxPattern}`;
  }

  return null;
}

function validateProviderContract(recipient: string): string | null {
  if (!recipient) {
    return "Notification recipient is missing. Configure NOTIFICATION_INTERNAL_TO_EMAIL or NOTIFICATION_TO_EMAIL.";
  }
  if (!notificationConfig.fromEmail) {
    return "Notification sender is missing. Configure NOTIFICATION_FROM_EMAIL.";
  }
  if (notificationConfig.mode === "smtp") {
    if (!notificationConfig.smtp.host) {
      return "SMTP host is missing. Configure SMTP_HOST.";
    }
    if (!notificationConfig.smtp.user || !notificationConfig.smtp.pass) {
      return "SMTP credentials are missing. Configure SMTP_USER and SMTP_PASS.";
    }
  }
  if (notificationConfig.mode === "resend" && !notificationConfig.resend.apiKey) {
    return "Resend mode requires RESEND_API_KEY.";
  }
  return null;
}

function maxNotificationAttempts(): number {
  const parsed = Number(process.env.NOTIFICATION_MAX_ATTEMPTS || "3");
  if (!Number.isFinite(parsed) || parsed < 1) {
    return 3;
  }
  return Math.floor(parsed);
}

async function attemptDelivery(
  record: SubmissionRecord,
  recipient: string,
  from: string,
  replyTo: string | undefined,
  subject: string,
  text: string,
): Promise<DeliveryResult> {
  if (notificationConfig.mode === "smtp") {
    const transporter = nodemailer.createTransport({
      host: notificationConfig.smtp.host,
      port: notificationConfig.smtp.port,
      secure: notificationConfig.smtp.secure,
      auth: {
        user: notificationConfig.smtp.user,
        pass: notificationConfig.smtp.pass,
      },
    });

    const info = await transporter.sendMail({
      from,
      to: recipient,
      replyTo,
      subject,
      text,
    });

    return { ok: true, channel: "smtp", messageId: info.messageId, state: "sent" };
  }

  if (notificationConfig.mode === "ethereal") {
    const account = await getEtherealAccount();
    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: { user: account.user, pass: account.pass },
    });

    const info = await transporter.sendMail({
      from,
      to: recipient,
      replyTo,
      subject,
      text,
    });

    return {
      ok: true,
      channel: "ethereal",
      messageId: info.messageId,
      previewUrl: nodemailer.getTestMessageUrl(info) || undefined,
      state: "sent",
    };
  }

  if (notificationConfig.mode === "resend") {
    const resend = resendClientFactory(notificationConfig.resend.apiKey);
    const resendFrom = notificationConfig.resend.fromEmail || from;
    const response = await resend.emails.send({
      from: resendFrom,
      to: recipient,
      replyTo,
      subject,
      text,
    });

    if (response.error) {
      return {
        ok: false,
        channel: "resend",
        error: response.error.message || "resend delivery failed",
        state: "failed",
      };
    }

    const messageId = response.data?.id || `resend-${record.id}`;
    return { ok: true, channel: "resend", messageId, state: "sent" };
  }

  await appendNotificationLog({
    ts: new Date().toISOString(),
    channel: "log",
    submissionId: record.id,
    type: record.type,
    subject,
    text,
    recipient,
    from,
    replyTo,
  });
  return { ok: true, channel: "log", messageId: `log-${record.id}`, state: "sent" };
}

export async function sendSubmissionNotification(record: SubmissionRecord): Promise<DeliveryResult> {
  const subject = renderSubject(record);
  const text = renderText(record);
  const recipient = resolveInternalRecipient(record.type);
  const from = renderFromValue();
  const replyTo = notificationConfig.replyToEmail || undefined;
  const dedupeKey = `submission:${record.id}:internal-v1`;
  const maxAttempts = maxNotificationAttempts();
  const now = new Date().toISOString();

  const existing = await getNotificationDeliveryRecord(record.id, dedupeKey);
  if (existing?.state === "sent") {
    return {
      ok: true,
      channel: existing.channel,
      messageId: existing.messageId || undefined,
      state: "sent",
      attempts: existing.attemptCount,
      dedupeKey,
      deduped: true,
    };
  }

  if (existing?.state === "abandoned") {
    return {
      ok: false,
      channel: existing.channel,
      error: existing.lastError || "notification abandoned",
      state: "abandoned",
      attempts: existing.attemptCount,
      dedupeKey,
      deduped: true,
    };
  }

  const baseChannel = notificationConfig.mode;
  await upsertNotificationDeliveryRecord({
    submissionId: record.id,
    dedupeKey,
    channel: baseChannel,
    state: "pending",
    attemptCount: existing?.attemptCount || 0,
    messageId: existing?.messageId || "",
    lastError: existing?.lastError || "",
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  });

  try {
    const developSafetyError = validateDevelopSafeInbox();
    if (developSafetyError) {
      await upsertNotificationDeliveryRecord({
        submissionId: record.id,
        dedupeKey,
        channel: baseChannel,
        state: "abandoned",
        attemptCount: existing?.attemptCount || 0,
        messageId: "",
        lastError: developSafetyError,
        createdAt: existing?.createdAt || now,
        updatedAt: new Date().toISOString(),
      });

      await logStructuredEvent({
        eventType: "notification.failure",
        level: "error",
        correlationId: record.correlationId || record.id,
        requestPath: record.attributionPath || "/api/forms",
        submissionId: record.id,
        lane: record.type,
        status: 502,
        details: {
          channel: baseChannel,
          attempts: existing?.attemptCount || 0,
          dedupeKey,
          error: developSafetyError,
        },
      });

      return {
        ok: false,
        channel: baseChannel,
        error: developSafetyError,
        state: "abandoned",
        attempts: existing?.attemptCount || 0,
        dedupeKey,
      };
    }

    const providerContractError = validateProviderContract(recipient);
    if (providerContractError) {
      await upsertNotificationDeliveryRecord({
        submissionId: record.id,
        dedupeKey,
        channel: baseChannel,
        state: "abandoned",
        attemptCount: existing?.attemptCount || 0,
        messageId: "",
        lastError: providerContractError,
        createdAt: existing?.createdAt || now,
        updatedAt: new Date().toISOString(),
      });

      await logStructuredEvent({
        eventType: "notification.failure",
        level: "error",
        correlationId: record.correlationId || record.id,
        requestPath: record.attributionPath || "/api/forms",
        submissionId: record.id,
        lane: record.type,
        status: 502,
        details: {
          channel: baseChannel,
          attempts: existing?.attemptCount || 0,
          dedupeKey,
          error: providerContractError,
        },
      });

      return {
        ok: false,
        channel: baseChannel,
        error: providerContractError,
        state: "abandoned",
        attempts: existing?.attemptCount || 0,
        dedupeKey,
      };
    }

    const startingAttempt = existing?.attemptCount || 0;

    for (let attempt = startingAttempt + 1; attempt <= maxAttempts; attempt += 1) {
      await upsertNotificationDeliveryRecord({
        submissionId: record.id,
        dedupeKey,
        channel: baseChannel,
        state: attempt === 1 ? "pending" : "retrying",
        attemptCount: attempt,
        messageId: "",
        lastError: "",
        createdAt: existing?.createdAt || now,
        updatedAt: new Date().toISOString(),
      });

      const attemptResult = await attemptDelivery(record, recipient, from, replyTo, subject, text);

      await appendNotificationLog({
        ts: new Date().toISOString(),
        result: attemptResult,
        submissionId: record.id,
        type: record.type,
        attempt,
        dedupeKey,
      });

      if (attemptResult.ok) {
        await upsertNotificationDeliveryRecord({
          submissionId: record.id,
          dedupeKey,
          channel: attemptResult.channel,
          state: "sent",
          attemptCount: attempt,
          messageId: attemptResult.messageId || "",
          lastError: "",
          createdAt: existing?.createdAt || now,
          updatedAt: new Date().toISOString(),
        });

        await logStructuredEvent({
          eventType: "notification.success",
          level: "info",
          correlationId: record.correlationId || record.id,
          requestPath: record.attributionPath || "/api/forms",
          submissionId: record.id,
          lane: record.type,
          details: {
            channel: attemptResult.channel,
            attempts: attempt,
            dedupeKey,
          },
        });

        return {
          ...attemptResult,
          state: "sent",
          attempts: attempt,
          dedupeKey,
        };
      }

      const lastError = attemptResult.error || "notification delivery failed";
      const terminal = attempt >= maxAttempts;

      await upsertNotificationDeliveryRecord({
        submissionId: record.id,
        dedupeKey,
        channel: attemptResult.channel,
        state: terminal ? "abandoned" : "failed",
        attemptCount: attempt,
        messageId: attemptResult.messageId || "",
        lastError,
        createdAt: existing?.createdAt || now,
        updatedAt: new Date().toISOString(),
      });

      if (terminal) {
        await logStructuredEvent({
          eventType: "notification.failure",
          level: "error",
          correlationId: record.correlationId || record.id,
          requestPath: record.attributionPath || "/api/forms",
          submissionId: record.id,
          lane: record.type,
          status: 502,
          details: {
            channel: attemptResult.channel,
            attempts: attempt,
            dedupeKey,
            error: lastError,
          },
        });

        return {
          ok: false,
          channel: attemptResult.channel,
          error: lastError,
          state: "abandoned",
          attempts: attempt,
          dedupeKey,
        };
      }
    }

    return {
      ok: false,
      channel: baseChannel,
      error: "notification retries exhausted",
      state: "abandoned",
      attempts: maxAttempts,
      dedupeKey,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown notification error";

    await upsertNotificationDeliveryRecord({
      submissionId: record.id,
      dedupeKey,
      channel: baseChannel,
      state: "abandoned",
      attemptCount: maxAttempts,
      messageId: "",
      lastError: message,
      createdAt: existing?.createdAt || now,
      updatedAt: new Date().toISOString(),
    });

    await logStructuredEvent({
      eventType: "notification.failure",
      level: "error",
      correlationId: record.correlationId || record.id,
      requestPath: record.attributionPath || "/api/forms",
      submissionId: record.id,
      lane: record.type,
      status: 502,
      details: {
        channel: baseChannel,
        attempts: maxAttempts,
        dedupeKey,
        error: message,
      },
    });

    return {
      ok: false,
      channel: baseChannel,
      error: message,
      state: "abandoned",
      attempts: maxAttempts,
      dedupeKey,
    };
  }
}
