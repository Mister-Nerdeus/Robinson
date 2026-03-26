import { NextResponse } from "next/server";
import { logAnalyticsEvent } from "@/lib/analytics/server";
import type { AnalyticsPayload } from "@/lib/analytics/events";

export async function POST(request: Request) {
  const body = (await request.json()) as AnalyticsPayload;
  if (!body?.event) {
    return NextResponse.json({ error: "event required" }, { status: 400 });
  }

  await logAnalyticsEvent(body);
  return NextResponse.json({ ok: true });
}
