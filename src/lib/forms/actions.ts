import { randomUUID } from "node:crypto";
import { submissionSchema, type SubmissionInput } from "./schema";
import {
  submissionLifecycleStates,
  type SubmissionLifecycleState,
  type SubmissionRecord,
} from "./types";
import {
  saveSubmission,
  listSubmissions,
  updateSubmissionTriageById,
} from "@/lib/storage/submissions";
import { deliverSubmissionEmail } from "@/lib/email/provider";

export async function createSubmission(input: SubmissionInput) {
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
    lifecycleState: "new",
    internalNote: "",
    ...parsed,
    state,
    address,
    urgency: normalizedUrgency,
  };
  await saveSubmission(record);
  const delivery = await deliverSubmissionEmail(record);
  return { record, delivery };
}

export async function getSubmissions() {
  return listSubmissions();
}

export async function updateSubmissionTriage(formData: FormData) {
  "use server";

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

  await updateSubmissionTriageById(id, lifecycleState, internalNote);
}
