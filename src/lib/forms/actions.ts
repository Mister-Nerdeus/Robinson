import { randomUUID } from "node:crypto";
import { submissionSchema, type SubmissionInput } from "./schema";
import { headers } from "next/headers";
import {
  submissionLifecycleStates,
  type SubmissionLifecycleState,
  type SubmissionRecord,
} from "./types";
import {
  saveSubmission,
  listSubmissions,
  suppressSubmissionById,
  updateSubmissionTriageById,
  updateSubmissionDeliverySnapshot,
} from "@/lib/submissions/repository";
import { deliverSubmissionEmail } from "@/lib/email/provider";
import { assignTerritoryAndOffice } from "@/lib/forms/routing";
import { buildDefaultRetention } from "@/lib/forms/retention";
import { resolveAdminIdentity } from "@/lib/auth";

export type SubmissionAttribution = {
  source?: "direct" | "organic" | "referral" | "campaign" | "unknown";
  path?: string;
  referrer?: string;
  correlationId?: string;
};

export async function createSubmission(input: SubmissionInput, attribution: SubmissionAttribution = {}) {
  const parsed = submissionSchema.parse(input);

  if (
    parsed.type === "general" &&
    parsed.serviceLocationInvolved === "yes" &&
    (!parsed.streetAddress || !parsed.city || !parsed.zip)
  ) {
    throw new Error("General requests with on-site service must include street, city, and ZIP.");
  }

  const now = new Date().toISOString();
  const state = parsed.state || "MI";
  const hasStructuredAddress = Boolean(parsed.streetAddress && parsed.city && parsed.zip);
  const address = hasStructuredAddress
    ? `${parsed.streetAddress}, ${parsed.city}, ${state} ${parsed.zip}`
    : parsed.address || "";
  const normalizedUrgency =
    parsed.type === "commercial-service" && parsed.serviceUrgency
      ? parsed.serviceUrgency
      : parsed.urgency;

  const record: SubmissionRecord = {
    id: randomUUID(),
    createdAt: now,
    triageUpdatedAt: now,
    triageUpdatedBy: "system",
    lifecycleState: "new",
    internalNote: "",
    serviceLane: parsed.type,
    attributionSource: attribution.source || "unknown",
    attributionPath: attribution.path || "",
    attributionReferrer: attribution.referrer || "",
    correlationId: attribution.correlationId || randomUUID(),
    routing: assignTerritoryAndOffice(parsed),
    retention: buildDefaultRetention(now),
    ...parsed,
    state,
    address,
    urgency: normalizedUrgency,
  };
  await saveSubmission(record);
  const delivery = await deliverSubmissionEmail(record);
  await updateSubmissionDeliverySnapshot(record.id, {
    state: delivery.internal.state,
    attempts: delivery.internal.attempts || 1,
    dedupeKey: delivery.internal.dedupeKey || `submission:${record.id}:internal`,
    channel: delivery.internal.channel,
    messageId: delivery.internal.messageId,
    lastError: delivery.internal.error,
    updatedAt: new Date().toISOString(),
  });
  return { record, delivery };
}

export async function getSubmissions() {
  return listSubmissions();
}

export async function updateSubmissionTriage(formData: FormData) {
  "use server";

  const requestHeaders = await headers();
  const identity = resolveAdminIdentity(
    new Request("http://localhost/admin/submissions", { headers: requestHeaders }),
  );
  if (!identity.authenticated || (identity.role !== "owner" && identity.role !== "ops")) {
    throw new Error("Admin authentication required.");
  }

  const id = String(formData.get("id") || "").trim();
  const status = String(formData.get("lifecycleState") || "").trim();
  const internalNote = String(formData.get("internalNote") || "");

  if (!id) {
    throw new Error("Missing submission id for triage update.");
  }

  const lifecycleState = submissionLifecycleStates.find(
    (value) => value === status,
  ) as SubmissionLifecycleState | undefined;

  if (!lifecycleState) {
    throw new Error("Invalid lifecycle state.");
  }

  await updateSubmissionTriageById(
    id,
    lifecycleState,
    internalNote,
    identity.principal || identity.role || "owner",
  );
}

export async function suppressSubmission(formData: FormData) {
  "use server";

  const requestHeaders = await headers();
  const identity = resolveAdminIdentity(
    new Request("http://localhost/admin/submissions", { headers: requestHeaders }),
  );
  if (!identity.authenticated || (identity.role !== "owner" && identity.role !== "ops")) {
    throw new Error("Admin authentication required.");
  }

  const id = String(formData.get("id") || "").trim();
  if (!id) {
    throw new Error("Missing submission id for suppression.");
  }

  const suppressed = await suppressSubmissionById(id);
  if (!suppressed) {
    throw new Error("Submission not found.");
  }
}
