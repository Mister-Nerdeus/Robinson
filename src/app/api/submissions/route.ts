import { NextResponse } from "next/server";
import { POST as formsPost } from "@/app/api/forms/route";
import { submissionLifecycleStates } from "@/lib/forms/types";
import {
  listSubmissions,
  suppressSubmissionById,
  updateSubmissionTriageById,
} from "@/lib/submissions/repository";
import { resolveAdminIdentity } from "@/lib/auth";
import { logStructuredEvent, correlationIdFromRequest } from "@/lib/observability";

type ExportFormat = "json" | "csv";

function csvEscape(value: unknown) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

function toCsv(rows: Awaited<ReturnType<typeof listSubmissions>>) {
  const header = [
    "id",
    "createdAt",
    "type",
    "serviceLane",
    "lifecycleState",
    "fullName",
    "phone",
    "email",
    "address",
    "correlationId",
    "territory",
    "office",
    "deliveryState",
    "deliveryAttempts",
    "retentionState",
    "retainUntil",
  ];

  const lines = rows.map((row) =>
    [
      row.id,
      row.createdAt,
      row.type,
      row.serviceLane,
      row.lifecycleState,
      row.fullName,
      row.phone,
      row.email,
      row.address,
      row.correlationId,
      row.routing?.territoryId || "",
      row.routing?.officeId || "",
      row.delivery?.state || "",
      row.delivery?.attempts || "",
      row.retention?.dataState || "",
      row.retention?.retainUntil || "",
    ]
      .map(csvEscape)
      .join(","),
  );

  return [header.join(","), ...lines].join("\n");
}

async function authenticateAdmin(request: Request, correlationId: string) {
  const identity = resolveAdminIdentity(request);
  if (!identity.authenticated || (identity.role !== "owner" && identity.role !== "ops")) {
    await logStructuredEvent({
      eventType: "admin.review_access.denied",
      level: "warn",
      correlationId,
      requestPath: "/api/submissions",
      status: 401,
      details: {
        method: request.method,
      },
    });

    return null;
  }

  await logStructuredEvent({
    eventType: "admin.review_access.allowed",
    level: "info",
    correlationId,
    requestPath: "/api/submissions",
    status: 200,
    details: {
      method: request.method,
      role: identity.role,
      principal: identity.principal,
    },
  });

  return identity;
}

export async function GET(request: Request) {
  const correlationId = correlationIdFromRequest(request);
  const identity = await authenticateAdmin(request, correlationId);
  if (!identity) {
    return NextResponse.json({ error: "admin-auth-required", correlationId }, { status: 401 });
  }

  const url = new URL(request.url);
  const type = url.searchParams.get("type") || undefined;
  const status = url.searchParams.get("status") || undefined;
  const dateFrom = url.searchParams.get("dateFrom") || undefined;
  const dateTo = url.searchParams.get("dateTo") || undefined;
  const source = url.searchParams.get("source") || undefined;
  const exportFormatRaw = (url.searchParams.get("export") || "").trim().toLowerCase();
  const exportFormat = exportFormatRaw === "csv" || exportFormatRaw === "json"
    ? (exportFormatRaw as ExportFormat)
    : null;

  const rows = await listSubmissions({ type, status, dateFrom, dateTo, source });

  if (exportFormat === "csv") {
    return new NextResponse(toCsv(rows), {
      status: 200,
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "content-disposition": `attachment; filename=submissions-export-${new Date().toISOString().slice(0, 10)}.csv`,
        "x-correlation-id": correlationId,
      },
    });
  }

  if (exportFormat === "json") {
    return NextResponse.json({ rows, correlationId }, { status: 200, headers: { "x-correlation-id": correlationId } });
  }

  return NextResponse.json({ rows, correlationId }, { status: 200, headers: { "x-correlation-id": correlationId } });
}

export async function POST(request: Request) {
  return formsPost(request);
}

export async function PATCH(request: Request) {
  const correlationId = correlationIdFromRequest(request);
  const identity = await authenticateAdmin(request, correlationId);
  if (!identity) {
    return NextResponse.json({ error: "admin-auth-required", correlationId }, { status: 401 });
  }

  const body = await request.json();
  const id = String(body?.id || "").trim();
  const lifecycleState = String(body?.lifecycleState || "").trim();
  const internalNote = String(body?.internalNote || "");

  if (!id) {
    return NextResponse.json({ error: "missing-id", correlationId }, { status: 400 });
  }

  if (!submissionLifecycleStates.includes(lifecycleState as (typeof submissionLifecycleStates)[number])) {
    return NextResponse.json({ error: "invalid-lifecycle-state", correlationId }, { status: 400 });
  }

  const updated = await updateSubmissionTriageById(
    id,
    lifecycleState as (typeof submissionLifecycleStates)[number],
    internalNote,
    identity.principal || identity.role || "owner",
  );

  if (!updated) {
    return NextResponse.json({ error: "not-found", correlationId }, { status: 404 });
  }

  await logStructuredEvent({
    eventType: "submission.triage_updated",
    level: "info",
    correlationId,
    requestPath: "/api/submissions",
    submissionId: id,
    status: 200,
    details: {
      lifecycleState,
      actor: identity.principal,
    },
  });

  return NextResponse.json({ ok: true, correlationId });
}

export async function DELETE(request: Request) {
  const correlationId = correlationIdFromRequest(request);
  const identity = await authenticateAdmin(request, correlationId);
  if (!identity) {
    return NextResponse.json({ error: "admin-auth-required", correlationId }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const id = String(body?.id || "").trim();
  if (!id) {
    return NextResponse.json({ error: "missing-id", correlationId }, { status: 400 });
  }

  const suppressed = await suppressSubmissionById(id);
  if (!suppressed) {
    return NextResponse.json({ error: "not-found", correlationId }, { status: 404 });
  }

  await logStructuredEvent({
    eventType: "submission.rejected",
    level: "warn",
    correlationId,
    requestPath: "/api/submissions",
    submissionId: id,
    status: 200,
    details: {
      reason: "suppressed-by-authenticated-owner-ops",
      actor: identity.principal,
    },
  });

  return NextResponse.json({ ok: true, correlationId });
}
