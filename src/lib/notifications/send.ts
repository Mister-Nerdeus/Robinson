import nodemailer from "nodemailer";
import { notificationConfig } from "@/config/notifications";
import type { SubmissionRecord } from "@/lib/forms/types";
import { getSubmissionSummaryFields } from "@/lib/forms/types";
import type { DeliveryResult } from "./types";
import { appendNotificationLog } from "./log";
import { getRuntimeEnv } from "@/lib/runtime/env";

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
        `Existing Customer: ${record.existingCustomer}`,
        `Property Usage: ${record.propertyUsage}`,
        `System Pumped Before: ${record.systemPumpedBefore}`,
      ];
    case "evaluation":
      return [
        `Role In Sale: ${record.roleInSale}`,
        `Brokerage/Company: ${record.brokerageOrCompany}`,
        `Closing Date: ${record.closingDate}`,
        `Occupancy Status: ${record.occupancyStatus}`,
        `Utility On: ${record.utilityOnStatus}`,
        `Occupant Present: ${record.occupantPresent}`,
        `Property Type: ${record.propertyType}`,
        `Access Instructions: ${record.accessInstructions || "-"}`,
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

async function getEtherealAccount() {
  if (!etherealAccountPromise) {
    etherealAccountPromise = nodemailer.createTestAccount();
  }
  return etherealAccountPromise;
}

function validateDevelopSafeInbox() {
  const env = getRuntimeEnv();
  if (env.mode !== "demo" || notificationConfig.mode !== "smtp") {
    return null;
  }

  const pattern = new RegExp(notificationConfig.developSafeInboxPattern, "i");
  if (!pattern.test(notificationConfig.toEmail)) {
    return `Develop SMTP delivery requires NOTIFICATION_TO_EMAIL to match pattern: ${notificationConfig.developSafeInboxPattern}`;
  }

  return null;
}

export async function sendSubmissionNotification(record: SubmissionRecord): Promise<DeliveryResult> {
  const subject = renderSubject(record);
  const text = renderText(record);

  try {
    const developSafetyError = validateDevelopSafeInbox();
    if (developSafetyError) {
      const result: DeliveryResult = {
        ok: false,
        channel: notificationConfig.mode,
        error: developSafetyError,
      };
      await appendNotificationLog({
        ts: new Date().toISOString(),
        result,
        submissionId: record.id,
        type: record.type,
      });
      return result;
    }

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
        from: notificationConfig.fromEmail,
        to: notificationConfig.toEmail,
        subject,
        text,
      });

      const result: DeliveryResult = { ok: true, channel: "smtp", messageId: info.messageId };
      await appendNotificationLog({ ts: new Date().toISOString(), result, submissionId: record.id, type: record.type });
      return result;
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
        from: notificationConfig.fromEmail,
        to: notificationConfig.toEmail,
        subject,
        text,
      });

      const result: DeliveryResult = {
        ok: true,
        channel: "ethereal",
        messageId: info.messageId,
        previewUrl: nodemailer.getTestMessageUrl(info) || undefined,
      };
      await appendNotificationLog({ ts: new Date().toISOString(), result, submissionId: record.id, type: record.type });
      return result;
    }

    await appendNotificationLog({ ts: new Date().toISOString(), channel: "log", submissionId: record.id, type: record.type, subject, text });
    return { ok: true, channel: "log", messageId: `log-${record.id}` };
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown notification error";
    const result: DeliveryResult = { ok: false, channel: notificationConfig.mode, error: message };
    await appendNotificationLog({ ts: new Date().toISOString(), result, submissionId: record.id, type: record.type });
    return result;
  }
}
