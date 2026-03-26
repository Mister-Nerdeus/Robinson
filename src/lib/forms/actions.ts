import { randomUUID } from "node:crypto";
import { submissionSchema, type SubmissionInput } from "./schema";
import type { SubmissionRecord } from "./types";
import { saveSubmission, listSubmissions } from "@/lib/storage/submissions";
import { sendSubmissionNotification } from "@/lib/notifications/send";

export async function createSubmission(input: SubmissionInput) {
  const parsed = submissionSchema.parse(input);
  const record: SubmissionRecord = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...parsed,
  };
  await saveSubmission(record);
  const delivery = await sendSubmissionNotification(record);
  return { record, delivery };
}

export async function getSubmissions() {
  return listSubmissions();
}
