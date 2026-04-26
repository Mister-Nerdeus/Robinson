import { appendFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

const filePath = path.join(process.cwd(), "data", "abuse-log.ndjson");

export type AbuseLogEntry = Record<string, unknown>;

export async function logAbuse(entry: AbuseLogEntry) {
  const sanitized = {
    ...entry,
    ipHash:
      typeof entry.ip === "string"
        ? createHash("sha256").update(entry.ip).digest("hex").slice(0, 12)
        : undefined,
    userAgentHash:
      typeof entry.userAgent === "string"
        ? createHash("sha256").update(entry.userAgent).digest("hex").slice(0, 12)
        : undefined,
    ip: undefined,
    userAgent: undefined,
    email: undefined,
    fullName: undefined,
    message: undefined,
  };

  await mkdir(path.dirname(filePath), { recursive: true });
  await appendFile(filePath, `${JSON.stringify(sanitized)}\n`, "utf8");
}
