import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

const logsDir = path.join(process.cwd(), "data");
const logsFile = path.join(logsDir, "notification-log.ndjson");

export async function appendNotificationLog(entry: Record<string, unknown>) {
  await mkdir(logsDir, { recursive: true });
  await appendFile(logsFile, `${JSON.stringify(entry)}\n`, "utf8");
}
