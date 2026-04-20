import { NextResponse } from "next/server";
import { createSubmission, getSubmissions } from "@/lib/forms/actions";
import { submissionSchema } from "@/lib/forms/schema";
import { enforceAbuseProtection } from "@/lib/forms/abuseProtection";
import { hasValidReviewAccessCookie, isAdminReviewEnabled } from "@/lib/runtime/env";

export async function GET(request: Request) {
  if (!isAdminReviewEnabled()) {
    return NextResponse.json({ error: "admin-review-blocked" }, { status: 403 });
  }

  const cookieHeader = request.headers.get("cookie") || undefined;
  if (!hasValidReviewAccessCookie(cookieHeader)) {
    return NextResponse.json({ error: "admin-auth-required" }, { status: 401 });
  }

  const rows = await getSubmissions();
  return NextResponse.json({ rows });
}

export async function POST(request: Request) {
  const body = await request.json();
  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  const ip = forwarded.split(",")[0]?.trim() || "unknown";
  const userAgent = request.headers.get("user-agent") ?? "unknown";

  const abuse = await enforceAbuseProtection({
    ip,
    userAgent,
    honeypot: body.companyWebsite,
    fullName: body.fullName,
    message: body.message,
  });

  if (!abuse.allowed) {
    return NextResponse.json({ error: abuse.error }, { status: abuse.status });
  }

  const parsed = submissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { record, delivery } = await createSubmission(parsed.data);
  return NextResponse.json({ ok: true, id: record.id, delivery }, { status: 201 });
}
