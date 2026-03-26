import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

const filePath = path.join(process.cwd(), "data", "abuse-log.ndjson");

export async function logAbuse(entry: Record<string, unknown>) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await appendFile(filePath, `${JSON.stringify(entry)}\n`, "utf8");
}
