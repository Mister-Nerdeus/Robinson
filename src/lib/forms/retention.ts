import type { SubmissionRetentionSnapshot } from "@/lib/forms/types";

function parsePositiveInt(raw: string | undefined, fallback: number): number {
  const value = Number(raw || "");
  if (!Number.isFinite(value) || value <= 0) {
    return fallback;
  }
  return Math.floor(value);
}

export function getSubmissionRetentionDays(): number {
  return parsePositiveInt(process.env.SUBMISSION_RETENTION_DAYS, 365);
}

export function buildDefaultRetention(createdAtIso: string): SubmissionRetentionSnapshot {
  const retentionDays = getSubmissionRetentionDays();
  const createdAt = new Date(createdAtIso);
  const retainUntil = new Date(createdAt.getTime() + retentionDays * 24 * 60 * 60 * 1000).toISOString();

  return {
    category: "service-intake",
    retentionDays,
    retainUntil,
    dataState: "active",
  };
}

export function buildSuppressedRetention(current: SubmissionRetentionSnapshot | undefined, reason: string): SubmissionRetentionSnapshot {
  const now = new Date().toISOString();

  return {
    category: "service-intake",
    retentionDays: current?.retentionDays ?? getSubmissionRetentionDays(),
    retainUntil: current?.retainUntil ?? now,
    dataState: "suppressed",
    suppressedAt: now,
    suppressionReason: reason || "owner-request",
  };
}
