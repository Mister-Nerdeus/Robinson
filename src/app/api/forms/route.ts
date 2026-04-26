import { NextResponse } from "next/server";
import { createSubmission, getSubmissions } from "@/lib/forms/actions";
import { submissionSchema } from "@/lib/forms/schema";
import { enforceAbuseProtection } from "@/lib/forms/abuseProtection";
import { getRuntimeEnv } from "@/lib/runtime/env";
import { hasConfiguredAdminTokens, resolveAdminIdentity } from "@/lib/auth";
import {
  correlationIdFromRequest,
  inferAttributionSource,
  logStructuredEvent,
} from "@/lib/observability";

export async function GET(request: Request) {
  const runtime = getRuntimeEnv();
  if (!runtime.enableAdminSubmissionsReview) {
    return NextResponse.json({ error: "admin-review-blocked" }, { status: 403 });
  }
  if (!hasConfiguredAdminTokens()) {
    return NextResponse.json({ error: "admin-auth-not-configured" }, { status: 503 });
  }
  const identity = resolveAdminIdentity(request);
  if (!identity.authenticated || (identity.role !== "owner" && identity.role !== "ops")) {
    return NextResponse.json({ error: "admin-auth-required" }, { status: 401 });
  }

  const rows = await getSubmissions();
  return NextResponse.json({ rows });
}

export async function POST(request: Request) {
  const correlationId = correlationIdFromRequest(request);
  const body = await request.json();
  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  const ip = forwarded.split(",")[0]?.trim() || "unknown";
  const userAgent = request.headers.get("user-agent") ?? "unknown";
  const pathname = new URL(request.url).pathname;

  const abuse = await enforceAbuseProtection({
    ip,
    userAgent,
    honeypot: body.companyWebsite,
    fullName: body.fullName,
    message: body.message,
  });

  if (!abuse.allowed) {
    await logStructuredEvent({
      eventType: "abuse.blocked",
      level: "warn",
      correlationId,
      requestPath: pathname,
      status: abuse.status,
      details: { ip, userAgent, reason: abuse.error, payload: body },
    });
    return NextResponse.json({ error: abuse.error, correlationId }, { status: abuse.status });
  }

  const parsed = submissionSchema.safeParse(body);
  if (!parsed.success) {
    await logStructuredEvent({
      eventType: "submission.rejected",
      level: "warn",
      correlationId,
      requestPath: pathname,
      status: 400,
      details: { reason: "validation-failed", issues: parsed.error.flatten(), payload: body },
    });
    return NextResponse.json({ error: parsed.error.flatten(), correlationId }, { status: 400 });
  }

  try {
    const { record, delivery } = await createSubmission(parsed.data, {
      source: inferAttributionSource(request),
      path: new URL(request.url).pathname,
      referrer: request.headers.get("referer") || "",
      correlationId,
    });

    await logStructuredEvent({
      eventType: "submission.accepted",
      level: "info",
      correlationId,
      requestPath: pathname,
      submissionId: record.id,
      lane: record.type,
      status: 201,
      details: {
        attributionSource: record.attributionSource,
        attributionReferrer: record.attributionReferrer,
        routing: record.routing,
        deliveryState: delivery.internal.state,
      },
    });

    return NextResponse.json(
      { ok: true, id: record.id, delivery, correlationId },
      { status: 201, headers: { "x-correlation-id": correlationId } },
    );
  } catch (error) {
    await logStructuredEvent({
      eventType: "submission.rejected",
      level: "error",
      correlationId,
      requestPath: pathname,
      status: 500,
      details: {
        reason: "persistence-failed",
        error: error instanceof Error ? error.message : String(error),
        payload: parsed.data,
      },
    });

    return NextResponse.json(
      { error: "submission-unavailable", correlationId },
      { status: 500, headers: { "x-correlation-id": correlationId } },
    );
  }
}
