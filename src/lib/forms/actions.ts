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
import { sendSubmissionNotification } from "@/lib/notifications/send";

export async function createSubmission(input: SubmissionInput) {
  const parsed = submissionSchema.parse(input);
  const now = new Date().toISOString();
  const record: SubmissionRecord = {
    id: randomUUID(),
    createdAt: now,
    triageUpdatedAt: now,
    lifecycleState: "new",
    internalNote: "",
    ...parsed,
  };
  await saveSubmission(record);
  const delivery = await sendSubmissionNotification(record);
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