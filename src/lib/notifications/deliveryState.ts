import { getSubmissionsDatabase } from "@/lib/db/sqlite";
import type { SubmissionDeliveryState } from "@/lib/forms/types";

export type NotificationDeliveryRecord = {
  submissionId: string;
  dedupeKey: string;
  channel: "smtp" | "ethereal" | "log" | "resend";
  state: SubmissionDeliveryState;
  attemptCount: number;
  messageId: string;
  lastError: string;
  createdAt: string;
  updatedAt: string;
};

type NotificationDeliveryRow = {
  submission_id: string;
  dedupe_key: string;
  channel: "smtp" | "ethereal" | "log" | "resend";
  state: SubmissionDeliveryState;
  attempt_count: number;
  message_id: string;
  last_error: string;
  created_at: string;
  updated_at: string;
};

function toRecord(row: NotificationDeliveryRow): NotificationDeliveryRecord {
  return {
    submissionId: row.submission_id,
    dedupeKey: row.dedupe_key,
    channel: row.channel,
    state: row.state,
    attemptCount: row.attempt_count,
    messageId: row.message_id,
    lastError: row.last_error,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getNotificationDeliveryRecord(
  submissionId: string,
  dedupeKey: string,
): Promise<NotificationDeliveryRecord | null> {
  const db = getSubmissionsDatabase();
  const row = db
    .prepare(
      `SELECT submission_id, dedupe_key, channel, state, attempt_count, message_id, last_error, created_at, updated_at
       FROM notification_delivery
       WHERE submission_id = $submission_id AND dedupe_key = $dedupe_key`,
    )
    .get({ $submission_id: submissionId, $dedupe_key: dedupeKey }) as NotificationDeliveryRow | undefined;

  return row ? toRecord(row) : null;
}

export async function upsertNotificationDeliveryRecord(record: NotificationDeliveryRecord): Promise<void> {
  const db = getSubmissionsDatabase();
  db.prepare(
    `INSERT INTO notification_delivery (
      submission_id,
      dedupe_key,
      channel,
      state,
      attempt_count,
      message_id,
      last_error,
      created_at,
      updated_at
    ) VALUES (
      $submission_id,
      $dedupe_key,
      $channel,
      $state,
      $attempt_count,
      $message_id,
      $last_error,
      $created_at,
      $updated_at
    )
    ON CONFLICT(submission_id, dedupe_key) DO UPDATE SET
      channel = excluded.channel,
      state = excluded.state,
      attempt_count = excluded.attempt_count,
      message_id = excluded.message_id,
      last_error = excluded.last_error,
      updated_at = excluded.updated_at`,
  ).run({
    $submission_id: record.submissionId,
    $dedupe_key: record.dedupeKey,
    $channel: record.channel,
    $state: record.state,
    $attempt_count: record.attemptCount,
    $message_id: record.messageId,
    $last_error: record.lastError,
    $created_at: record.createdAt,
    $updated_at: record.updatedAt,
  });
}

export async function listNotificationDeliveryBySubmissionIds(
  submissionIds: string[],
): Promise<Map<string, NotificationDeliveryRecord>> {
  const map = new Map<string, NotificationDeliveryRecord>();
  if (submissionIds.length === 0) {
    return map;
  }

  const db = getSubmissionsDatabase();
  const placeholders = submissionIds.map((_, index) => `$id${index}`).join(", ");
  const params: Record<string, string> = {};
  submissionIds.forEach((value, index) => {
    params[`$id${index}`] = value;
  });

  const rows = db
    .prepare(
      `SELECT submission_id, dedupe_key, channel, state, attempt_count, message_id, last_error, created_at, updated_at
       FROM notification_delivery
       WHERE submission_id IN (${placeholders})
       ORDER BY updated_at DESC`,
    )
    .all(params) as NotificationDeliveryRow[];

  for (const row of rows) {
    if (!map.has(row.submission_id)) {
      map.set(row.submission_id, toRecord(row));
    }
  }

  return map;
}
