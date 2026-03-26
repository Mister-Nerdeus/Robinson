import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { SubmissionRecord } from "@/lib/forms/types";

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

export async function listSubmissions(): Promise<SubmissionRecord[]> {
  await ensureFile();
  const raw = await readFile(dataFile, "utf8");
  const parsed = JSON.parse(raw) as SubmissionRecord[];
  return parsed.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function saveSubmission(record: SubmissionRecord): Promise<void> {
  const existing = await listSubmissions();
  existing.unshift(record);
  await writeFile(dataFile, JSON.stringify(existing, null, 2), "utf8");
}
