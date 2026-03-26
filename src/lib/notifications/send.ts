import nodemailer from "nodemailer";
import { notificationConfig } from "@/config/notifications";
import type { SubmissionRecord } from "@/lib/forms/types";
import type { DeliveryResult } from "./types";
import { appendNotificationLog } from "./log";

function renderSubject(record: SubmissionRecord) {
  return `[${record.type}] New lead - ${record.fullName}`;
}

function renderText(record: SubmissionRecord) {
  return [
    `Type: ${record.type}`,
    `Created: ${record.createdAt}`,
    `Name: ${record.fullName}`,
    `Phone: ${record.phone}`,
    `Email: ${record.email}`,
    `Address: ${record.address ?? ""}`,
    `Preferred Date: ${record.preferredDate ?? ""}`,
    `Message: ${record.message}`,
    `Tank Size: ${record.tankSizeGallons ?? ""}`,
    `Sale Role: ${record.roleInSale ?? ""}`,
    `Realtor Company: ${record.realtorCompany ?? ""}`,
    `Event Type: ${record.eventType ?? ""}`,
    `Unit Count: ${record.unitCount ?? ""}`,
  ].join("\n");
}

let etherealAccountPromise: Promise<nodemailer.TestAccount> | null = null;

async function getEtherealAccount() {
  if (!etherealAccountPromise) {
    etherealAccountPromise = nodemailer.createTestAccount();
  }
  return etherealAccountPromise;
}

export async function sendSubmissionNotification(record: SubmissionRecord): Promise<DeliveryResult> {
  const subject = renderSubject(record);
  const text = renderText(record);

  try {
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
