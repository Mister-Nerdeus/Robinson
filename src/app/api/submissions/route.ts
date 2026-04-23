import { NextResponse } from "next/server";
import { GET as formsGet, POST as formsPost } from "@/app/api/forms/route";
import { submissionLifecycleStates } from "@/lib/forms/types";
import { updateSubmissionTriageById } from "@/lib/submissions/repository";
import { resolveAdminIdentity } from "@/lib/auth";
import { logStructuredEvent, correlationIdFromRequest } from "@/lib/observability";

export async function GET(request: Request) {
  return formsGet(request);
}

export async function POST(request: Request) {
  return formsPost(request);
}

export async function PATCH(request: Request) {
  const identity = resolveAdminIdentity(request);
  if (!identity.authenticated || (identity.role !== "owner" && identity.role !== "ops")) {
    return NextResponse.json({ error: "admin-auth-required" }, { status: 401 });
  }

  const correlationId = correlationIdFromRequest(request);
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
