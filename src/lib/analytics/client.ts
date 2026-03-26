"use client";

import type { AnalyticsPayload } from "./events";

export async function trackEvent(payload: AnalyticsPayload) {
  try {
    await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    // best-effort analytics
  }
}
