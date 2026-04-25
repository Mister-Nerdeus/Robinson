import { readFile } from "node:fs/promises";
import path from "node:path";
import type { SubmissionRecord } from "../src/lib/forms/types";
import { saveSubmission } from "../src/lib/submissions/repository";

async function run() {
  const sourcePath = process.argv[2]
    ? path.resolve(process.argv[2])
    : path.join(process.cwd(), "data", "submissions.json");

  const raw = await readFile(sourcePath, "utf8");
  const rows = JSON.parse(raw) as SubmissionRecord[];

  for (const row of rows) {
    const normalized: SubmissionRecord = {
      ...row,
      triageUpdatedAt: row.triageUpdatedAt || row.createdAt || new Date().toISOString(),
      triageUpdatedBy: row.triageUpdatedBy || "legacy-json-import",
      serviceLane: row.serviceLane || row.type,
      attributionSource: row.attributionSource || "unknown",
      attributionPath: row.attributionPath || "",
      attributionReferrer: row.attributionReferrer || "",
      correlationId: row.correlationId || `legacy-${row.id}`,
      internalNote: row.internalNote || "",
      lifecycleState: row.lifecycleState || "new",
    };
    await saveSubmission(normalized);
  }

  console.log(`[import-submissions-json] imported ${rows.length} row(s) from ${sourcePath}`);
}

run().catch((error) => {
  console.error("[import-submissions-json] failed", error);
  process.exit(1);
});
