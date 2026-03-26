import { NextResponse } from "next/server";
import { createSubmission, getSubmissions } from "@/lib/forms/actions";
import { submissionSchema } from "@/lib/forms/schema";
import { checkRateLimit } from "@/lib/rate-limit/memory";
import { evaluateSpam } from "@/lib/forms/antiSpam";
import { logAbuse } from "@/lib/forms/abuseLog";

export async function GET() {
  if (process.env.ENABLE_ADMIN_SUBMISSIONS_REVIEW !== "true") {
    return NextResponse.json({ error: "disabled" }, { status: 403 });
  }
  const rows = await getSubmissions();
  return NextResponse.json({ rows });
}

export async function POST(request: Request) {
  const body = await request.json();
  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  const ip = forwarded.split(",")[0]?.trim() || "unknown";
  const userAgent = request.headers.get("user-agent") ?? "unknown";
  const max = Number(process.env.RATE_LIMIT_MAX ?? "8");
  const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS ?? String(15 * 60 * 1000));
  const rate = checkRateLimit(`submissions:${ip}`, max, windowMs);

  if (!rate.allowed) {
    await logAbuse({ ts: new Date().toISOString(), reason: "rate-limit", ip, userAgent });
    return NextResponse.json({ error: "Too many requests. Please retry shortly." }, { status: 429 });
  }

  const spam = evaluateSpam({
    honeypot: body.companyWebsite,
    message: body.message,
    fullName: body.fullName,
  });
  if (!spam.allowed) {
    await logAbuse({ ts: new Date().toISOString(), reason: spam.reason, ip, userAgent });
    return NextResponse.json({ error: "Submission blocked by abuse controls." }, { status: 400 });
  }

  const parsed = submissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { record, delivery } = await createSubmission(parsed.data);
  return NextResponse.json({ ok: true, id: record.id, delivery }, { status: 201 });
}
