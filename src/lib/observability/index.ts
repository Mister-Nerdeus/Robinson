import { randomUUID, createHash } from "node:crypto";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

export type ObservabilityEventType =
  | "submission.accepted"
  | "submission.rejected"
  | "abuse.blocked"
  | "notification.success"
  | "notification.failure"
  | "admin.review_access.allowed"
  | "admin.review_access.denied"
  | "submission.triage_updated";

export type StructuredLogEvent = {
  eventType: ObservabilityEventType;
  level: "info" | "warn" | "error";
  timestamp: string;
  correlationId: string;
  requestPath: string;
  submissionId?: string;
  lane?: string;
  status?: number;
  details?: Record<string, unknown>;
};

const logPath = path.join(process.cwd(), "data", "observability.ndjson");

function hashValue(input: string): string {
  return createHash("sha256").update(input).digest("hex").slice(0, 16);
}

function redactValue(key: string, value: unknown): unknown {
  if (typeof value !== "string") {
    return value;
  }

  const lower = key.toLowerCase();
  if (lower.includes("email")) {
    return `redacted:email:${hashValue(value.toLowerCase())}`;
  }
  if (lower.includes("phone")) {
    return `redacted:phone:${hashValue(value.replace(/\D/g, ""))}`;
  }
  if (lower.includes("message") || lower.includes("note") || lower.includes("address")) {
    return `redacted:text:${hashValue(value)}`;
  }

  return value;
}

function redactObject(input: Record<string, unknown>): Record<string, unknown> {
  const output: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(input)) {
    if (Array.isArray(value)) {
      output[key] = value.map((entry) => redactValue(key, entry));
      continue;
    }

    if (value && typeof value === "object") {
      output[key] = redactObject(value as Record<string, unknown>);
      continue;
    }

    output[key] = redactValue(key, value);
  }

  return output;
}

export function correlationIdFromRequest(request: Request): string {
  const existing = (request.headers.get("x-correlation-id") || "").trim();
  return existing || randomUUID();
}

export function inferAttributionSource(request: Request): "direct" | "organic" | "referral" | "campaign" | "unknown" {
  const sourceHint = (request.headers.get("x-attribution-source") || "").trim().toLowerCase();
  if (sourceHint === "direct" || sourceHint === "organic" || sourceHint === "referral" || sourceHint === "campaign") {
    return sourceHint;
  }

  const referrer = (request.headers.get("referer") || "").toLowerCase();
  if (!referrer) {
    return "direct";
  }
  if (referrer.includes("google") || referrer.includes("bing") || referrer.includes("duckduckgo")) {
    return "organic";
  }
  if (referrer.includes("utm_")) {
    return "campaign";
  }
  return "referral";
}

export async function logStructuredEvent(event: Omit<StructuredLogEvent, "timestamp">): Promise<void> {
  const payload: StructuredLogEvent = {
    ...event,
    timestamp: new Date().toISOString(),
    details: event.details ? redactObject(event.details) : undefined,
  };

  await mkdir(path.dirname(logPath), { recursive: true });
  await appendFile(logPath, `${JSON.stringify(payload)}\n`, "utf8");

  if (payload.level === "error") {
    console.error("[observability]", JSON.stringify(payload));
  } else {
    console.log("[observability]", JSON.stringify(payload));
  }
}
