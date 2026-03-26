import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import type { AnalyticsPayload } from "./events";

const filePath = path.join(process.cwd(), "data", "analytics-events.ndjson");

export async function logAnalyticsEvent(payload: AnalyticsPayload) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await appendFile(
    filePath,
    `${JSON.stringify({ ...payload, ts: payload.ts ?? new Date().toISOString() })}\n`,
    "utf8",
  );
}
