import { readFile } from "node:fs/promises";
import path from "node:path";
import { saveSubmission } from "../src/lib/submissions/repository";
import type { SubmissionRecord } from "../src/lib/forms/types";

async function run() {
  const legacyPath = process.argv[2]
    ? path.resolve(process.argv[2])
    : path.join(process.cwd(), "data", "submissions.json");

  const raw = await readFile(legacyPath, "utf8");
  const rows = JSON.parse(raw) as SubmissionRecord[];

  for (const row of rows) {
    const now = row.triageUpdatedAt || row.createdAt || new Date().toISOString();
    const normalized: SubmissionRecord = {
      ...row,
      triageUpdatedAt: now,
      triageUpdatedBy: row.triageUpdatedBy || "legacy-import",
      serviceLane: row.serviceLane || row.type,
      attributionSource: row.attributionSource || "unknown",
      attributionPath: row.attributionPath || "",
      attributionReferrer: row.attributionReferrer || "",
      correlationId: row.correlationId || `legacy-${row.id}`,
    };
    await saveSubmission(normalized);
  }

  console.log(`[legacy-import] migrated ${rows.length} submission(s) from ${legacyPath}`);
}

run().catch((error) => {
  console.error("[legacy-import] failed", error);
  process.exit(1);
});
