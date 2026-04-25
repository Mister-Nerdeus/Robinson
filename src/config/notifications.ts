import type { SubmissionType } from "@/lib/forms/types";

export type NotificationMode = "smtp" | "ethereal" | "log" | "resend";
export type SmtpProfile = "generic" | "m365-exchange-online";

function normalizeMode(value: string | undefined): NotificationMode {
  const mode = (value || "log").trim().toLowerCase();
  if (mode === "smtp" || mode === "ethereal" || mode === "log" || mode === "resend") {
    return mode;
  }
  return "log";
}

function normalizeSmtpProfile(value: string | undefined): SmtpProfile {
  const profile = (value || "generic").trim().toLowerCase();
  if (profile === "m365-exchange-online") {
    return "m365-exchange-online";
  }
  return "generic";
}

function parseLaneRecipientMap(value: string | undefined): Partial<Record<SubmissionType, string>> {
  const raw = (value || "").trim();
  if (!raw) {
    return {};
  }

  const map: Partial<Record<SubmissionType, string>> = {};
  const entries = raw
    .split(/[;,]/)
    .map((entry) => entry.trim())
    .filter(Boolean);

  for (const entry of entries) {
    const [laneRaw, emailRaw] = entry.split(":");
    const lane = (laneRaw || "").trim() as SubmissionType;
    const email = (emailRaw || "").trim();
    if (!email) {
      continue;
    }

    if (
      lane === "general" ||
      lane === "septic-service" ||
      lane === "evaluation" ||
      lane === "rental" ||
      lane === "commercial-service"
    ) {
      map[lane] = email;
    }
  }

  return map;
}

function parseBool(value: string | undefined, fallback = false): boolean {
  if (value === undefined) {
    return fallback;
  }
  const normalized = value.trim().toLowerCase();
  return normalized === "1" || normalized === "true" || normalized === "yes" || normalized === "on";
}

const legacyToEmail = (process.env.NOTIFICATION_TO_EMAIL || "").trim();
const internalDefaultToEmail =
  (process.env.NOTIFICATION_INTERNAL_TO_EMAIL || legacyToEmail || "dispatch@robinsonseptic.local").trim();
const laneToRecipient = parseLaneRecipientMap(process.env.NOTIFICATION_LANE_TO_EMAIL_MAP);
const smtpProfile = normalizeSmtpProfile(process.env.SMTP_PROFILE);
const smtpHost = (process.env.SMTP_HOST || "").trim();

export const notificationConfig = {
  mode: normalizeMode(process.env.NOTIFICATION_MODE),
  internalDefaultToEmail,
  laneToRecipient,
  fromEmail: (process.env.NOTIFICATION_FROM_EMAIL || "no-reply@robinsonseptic.local").trim(),
  fromName: (process.env.NOTIFICATION_FROM_NAME || "Robinson Septic Intake").trim(),
  replyToEmail: (process.env.NOTIFICATION_REPLY_TO_EMAIL || "").trim(),
  subjectPrefix: (process.env.NOTIFICATION_SUBJECT_PREFIX || "").trim(),
  developSafeInboxPattern: (
    process.env.NOTIFICATION_DEVELOP_SAFE_INBOX_PATTERN ?? "develop|sandbox|test"
  ).trim(),
  smtp: {
    profile: smtpProfile,
    host: smtpHost || (smtpProfile === "m365-exchange-online" ? "smtp.office365.com" : ""),
    port: Number(process.env.SMTP_PORT ?? "587"),
    user: (process.env.SMTP_USER || "").trim(),
    pass: (process.env.SMTP_PASS || "").trim(),
    secure: parseBool(process.env.SMTP_SECURE, false),
  },
  resend: {
    apiKey: (process.env.RESEND_API_KEY || "").trim(),
    fromEmail: (process.env.RESEND_FROM_EMAIL || "").trim(),
  },
};

export function resolveInternalRecipient(lane: SubmissionType): string {
  return notificationConfig.laneToRecipient[lane] || notificationConfig.internalDefaultToEmail;
}
