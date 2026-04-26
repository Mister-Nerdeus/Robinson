import { getSubmissionsDatabase } from "@/lib/db/sqlite";
import {
  submissionLifecycleStates,
  submissionTypes,
  type SubmissionDeliverySnapshot,
  type SubmissionLifecycleState,
  type SubmissionRecord,
  type SubmissionType,
} from "@/lib/forms/types";
import { buildSuppressedRetention } from "@/lib/forms/retention";

type SubmissionRow = {
  id: string;
  created_at: string;
  triage_updated_at: string;
  triage_updated_by: string;
  lifecycle_state: string;
  internal_note: string;
  submission_type: string;
  lane: string;
  attribution_source: string;
  attribution_path: string;
  attribution_referrer: string;
  correlation_id: string;
  payload_json: string;
};

export type SubmissionQuery = {
  type?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  source?: string;
};

export type SubmissionReportRow = {
  lane: SubmissionType;
  lifecycleState: SubmissionLifecycleState;
  attributionSource: string;
  count: number;
};

function normalizeType(value: string): SubmissionType {
  return submissionTypes.find((entry) => entry === value) ?? "general";
}

function normalizeLifecycleState(value: string): SubmissionLifecycleState {
  return submissionLifecycleStates.find((entry) => entry === value) ?? "new";
}

function fromRow(row: SubmissionRow): SubmissionRecord {
  const parsed = JSON.parse(row.payload_json) as SubmissionRecord;
  return {
    ...parsed,
    type: normalizeType(row.submission_type),
    serviceLane: normalizeType(row.lane),
    lifecycleState: normalizeLifecycleState(row.lifecycle_state),
    createdAt: row.created_at,
    triageUpdatedAt: row.triage_updated_at,
    triageUpdatedBy: row.triage_updated_by || "system",
    internalNote: row.internal_note,
    attributionSource:
      row.attribution_source === "direct" ||
      row.attribution_source === "organic" ||
      row.attribution_source === "referral" ||
      row.attribution_source === "campaign"
        ? row.attribution_source
        : "unknown",
    attributionPath: row.attribution_path || "",
    attributionReferrer: row.attribution_referrer || "",
    correlationId: row.correlation_id || "",
  } as SubmissionRecord;
}

function toRowRecord(record: SubmissionRecord): SubmissionRow {
  return {
    id: record.id,
    created_at: record.createdAt,
    triage_updated_at: record.triageUpdatedAt,
    triage_updated_by: record.triageUpdatedBy || "system",
    lifecycle_state: record.lifecycleState,
    internal_note: record.internalNote || "",
    submission_type: record.type,
    lane: record.serviceLane || record.type,
    attribution_source: record.attributionSource || "unknown",
    attribution_path: record.attributionPath || "",
    attribution_referrer: record.attributionReferrer || "",
    correlation_id: record.correlationId || "",
    payload_json: JSON.stringify(record),
  };
}

function queryRows(filters: SubmissionQuery = {}): SubmissionRow[] {
  const db = getSubmissionsDatabase();
  const clauses: string[] = [];
  const params: Record<string, string> = {};

  if (filters.type) {
    clauses.push("submission_type = $type");
    params.$type = filters.type;
  }
  if (filters.status) {
    clauses.push("lifecycle_state = $status");
    params.$status = filters.status;
  }
  if (filters.source) {
    clauses.push("attribution_source = $source");
    params.$source = filters.source;
  }
  if (filters.dateFrom) {
    clauses.push("created_at >= $dateFrom");
    params.$dateFrom = `${filters.dateFrom}T00:00:00.000Z`;
  }
  if (filters.dateTo) {
    clauses.push("created_at <= $dateTo");
    params.$dateTo = `${filters.dateTo}T23:59:59.999Z`;
  }

  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const statement = db.prepare(`
    SELECT
      id,
      created_at,
      triage_updated_at,
      triage_updated_by,
      lifecycle_state,
      internal_note,
      submission_type,
      lane,
      attribution_source,
      attribution_path,
      attribution_referrer,
      correlation_id,
      payload_json
    FROM submissions
    ${where}
    ORDER BY created_at DESC
  `);

  return statement.all(params) as SubmissionRow[];
}

export async function listSubmissions(filters: SubmissionQuery = {}): Promise<SubmissionRecord[]> {
  return queryRows(filters).map((row) => fromRow(row));
}

export async function getSubmissionById(id: string): Promise<SubmissionRecord | null> {
  const row = queryRows().find((entry) => entry.id === id);
  return row ? fromRow(row) : null;
}

export async function saveSubmission(record: SubmissionRecord): Promise<void> {
  const db = getSubmissionsDatabase();
  const row = toRowRecord(record);
  db.prepare(`
    INSERT INTO submissions (
      id,
      created_at,
      triage_updated_at,
      triage_updated_by,
      lifecycle_state,
      internal_note,
      submission_type,
      lane,
      attribution_source,
      attribution_path,
      attribution_referrer,
      correlation_id,
      payload_json,
      updated_at
    ) VALUES (
      $id,
      $created_at,
      $triage_updated_at,
      $triage_updated_by,
      $lifecycle_state,
      $internal_note,
      $submission_type,
      $lane,
      $attribution_source,
      $attribution_path,
      $attribution_referrer,
      $correlation_id,
      $payload_json,
      $updated_at
    )
    ON CONFLICT(id) DO UPDATE SET
      triage_updated_at = excluded.triage_updated_at,
      triage_updated_by = excluded.triage_updated_by,
      lifecycle_state = excluded.lifecycle_state,
      internal_note = excluded.internal_note,
      submission_type = excluded.submission_type,
      lane = excluded.lane,
      attribution_source = excluded.attribution_source,
      attribution_path = excluded.attribution_path,
      attribution_referrer = excluded.attribution_referrer,
      correlation_id = excluded.correlation_id,
      payload_json = excluded.payload_json,
      updated_at = excluded.updated_at
  `).run({ ...row, $updated_at: new Date().toISOString() });
}

export async function updateSubmissionDeliverySnapshot(
  id: string,
  snapshot: SubmissionDeliverySnapshot,
): Promise<boolean> {
  const existing = await getSubmissionById(id);
  if (!existing) {
    return false;
  }

  await saveSubmission({
    ...existing,
    delivery: snapshot,
  });

  return true;
}

function suppressRecordPayload(record: SubmissionRecord): SubmissionRecord {
  const now = new Date().toISOString();
  return {
    ...record,
    fullName: "[suppressed]",
    phone: "",
    email: "",
    streetAddress: "",
    city: "",
    zip: "",
    address: "",
    message: "[suppressed]",
    retention: buildSuppressedRetention(record.retention, "authenticated-owner-request"),
    triageUpdatedAt: now,
    triageUpdatedBy: "owner:suppression",
  };
}

export async function suppressSubmissionById(id: string): Promise<boolean> {
  const existing = await getSubmissionById(id);
  if (!existing) {
    return false;
  }

  await saveSubmission(suppressRecordPayload(existing));
  return true;
}

export async function updateSubmissionTriageById(
  id: string,
  lifecycleState: SubmissionLifecycleState,
  internalNote: string,
  actor = "owner",
): Promise<boolean> {
  const existing = queryRows().find((row) => row.id === id);
  if (!existing) {
    return false;
  }

  const parsed = fromRow(existing);
  const updated: SubmissionRecord = {
    ...parsed,
    lifecycleState,
    internalNote: internalNote.trim(),
    triageUpdatedAt: new Date().toISOString(),
    triageUpdatedBy: actor,
  };

  await saveSubmission(updated);
  return true;
}

export async function listSubmissionReport(filters: SubmissionQuery = {}): Promise<SubmissionReportRow[]> {
  const rows = await listSubmissions(filters);
  const bucket = new Map<string, SubmissionReportRow>();

  for (const row of rows) {
    const key = `${row.serviceLane}|${row.lifecycleState}|${row.attributionSource}`;
    const existing = bucket.get(key);
    if (existing) {
      existing.count += 1;
      continue;
    }

    bucket.set(key, {
      lane: row.serviceLane,
      lifecycleState: row.lifecycleState,
      attributionSource: row.attributionSource,
      count: 1,
    });
  }

  return Array.from(bucket.values()).sort((a, b) => b.count - a.count);
}
