import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  submissionLifecycleStates,
  type SubmissionLifecycleState,
  type SubmissionRecord,
} from "@/lib/forms/types";

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "submissions.json");

async function ensureFile() {
  await mkdir(dataDir, { recursive: true });
  try {
    await readFile(dataFile, "utf8");
  } catch {
    await writeFile(dataFile, "[]", "utf8");
  }
}

function normalizeRecord(record: SubmissionRecord): SubmissionRecord {
  const fallbackState: SubmissionLifecycleState = "new";
  const rawState = (record as { lifecycleState?: string }).lifecycleState;
  const lifecycleState =
    submissionLifecycleStates.find((state) => state === rawState) ?? fallbackState;

  return {
    ...record,
    lifecycleState,
    internalNote: (record as { internalNote?: string }).internalNote?.trim() ?? "",
    triageUpdatedAt:
      (record as { triageUpdatedAt?: string }).triageUpdatedAt || record.createdAt,
  };
}

export async function listSubmissions(): Promise<SubmissionRecord[]> {
  await ensureFile();
  const raw = await readFile(dataFile, "utf8");
  const parsed = JSON.parse(raw) as SubmissionRecord[];
  return parsed
    .map((row) => normalizeRecord(row))
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function saveSubmission(record: SubmissionRecord): Promise<void> {
  const existing = await listSubmissions();
  existing.unshift(normalizeRecord(record));
  await writeFile(dataFile, JSON.stringify(existing, null, 2), "utf8");
}

export async function updateSubmissionTriageById(
  id: string,
  lifecycleState: SubmissionLifecycleState,
  internalNote: string,
): Promise<boolean> {
  const existing = await listSubmissions();
  const next = existing.map((row) => {
    if (row.id !== id) {
      return row;
    }

    return {
      ...row,
      lifecycleState,
      internalNote: internalNote.trim(),
      triageUpdatedAt: new Date().toISOString(),
    };
  });

  const changed = next.some((row, index) => {
    const prev = existing[index];
    return row.id === id && (row.lifecycleState !== prev.lifecycleState || row.internalNote !== prev.internalNote);
  });

  if (!changed) {
    return false;
  }

  await writeFile(dataFile, JSON.stringify(next, null, 2), "utf8");
  return true;
}