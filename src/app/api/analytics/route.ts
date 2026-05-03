import { NextResponse } from "next/server";
import { logAnalyticsEvent } from "@/lib/analytics/server";
import { analyticsEvents, type AnalyticsPayload } from "@/lib/analytics/events";
import { checkRateLimit } from "@/lib/rate-limit";

const maxAnalyticsBodyBytes = 4096;
const allowedEvents = new Set<string>(Object.values(analyticsEvents));

function readIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for") || "";
  return forwarded.split(",")[0]?.trim() || "unknown";
}

function validShortString(value: unknown, maxLength: number): value is string {
  return typeof value === "string" && value.length > 0 && value.length <= maxLength;
}

function parseAnalyticsPayload(raw: unknown): AnalyticsPayload | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return null;
  }

  const candidate = raw as Record<string, unknown>;
  if (!validShortString(candidate.event, 96) || !allowedEvents.has(candidate.event)) {
    return null;
  }

  const payload: AnalyticsPayload = {
    event: candidate.event as AnalyticsPayload["event"],
  };

  if (candidate.path !== undefined) {
    if (!validShortString(candidate.path, 256) || !candidate.path.startsWith("/")) {
      return null;
    }
    payload.path = candidate.path;
  }

  if (candidate.lane !== undefined) {
    if (!validShortString(candidate.lane, 96)) {
      return null;
    }
    payload.lane = candidate.lane;
  }

  if (candidate.submissionType !== undefined) {
    if (!validShortString(candidate.submissionType, 96)) {
      return null;
    }
    payload.submissionType = candidate.submissionType;
  }

  if (candidate.ts !== undefined) {
    if (!validShortString(candidate.ts, 64) || Number.isNaN(Date.parse(candidate.ts))) {
      return null;
    }
    payload.ts = candidate.ts;
  }

  if (candidate.metadata !== undefined) {
    if (!candidate.metadata || typeof candidate.metadata !== "object" || Array.isArray(candidate.metadata)) {
      return null;
    }

    const metadata: AnalyticsPayload["metadata"] = {};
    const entries = Object.entries(candidate.metadata as Record<string, unknown>);
    if (entries.length > 10) {
      return null;
    }

    for (const [key, value] of entries) {
      if (!/^[a-zA-Z0-9_.:-]{1,64}$/.test(key)) {
        return null;
      }
      if (
        value !== null &&
        typeof value !== "boolean" &&
        !(typeof value === "number" && Number.isFinite(value)) &&
        !(typeof value === "string" && value.length <= 256)
      ) {
        return null;
      }
      metadata[key] = value as string | number | boolean | null;
    }

    payload.metadata = metadata;
  }

  return payload;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(contentLength) && contentLength > maxAnalyticsBodyBytes) {
    return NextResponse.json({ error: "analytics-payload-too-large" }, { status: 413 });
  }

  const rate = await checkRateLimit(`analytics:${readIp(request)}`, 60, 60_000);
  if (!rate.allowed) {
    return NextResponse.json({ error: "analytics-rate-limited" }, { status: 429 });
  }

  const rawText = await request.text();
  if (rawText.length > maxAnalyticsBodyBytes) {
    return NextResponse.json({ error: "analytics-payload-too-large" }, { status: 413 });
  }

  let rawBody: unknown;
  try {
    rawBody = JSON.parse(rawText);
  } catch {
    return NextResponse.json({ error: "invalid-json" }, { status: 400 });
  }

  const body = parseAnalyticsPayload(rawBody);
  if (!body) {
    return NextResponse.json({ error: "invalid-analytics-event" }, { status: 400 });
  }

  await logAnalyticsEvent(body);
  return NextResponse.json({ ok: true });
}
