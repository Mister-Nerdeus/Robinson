"use client";

import Link from "next/link";
import { contactRoutes } from "@/content/contactRoutes";
import { trackEvent } from "@/lib/analytics/client";
import { analyticsEvents } from "@/lib/analytics/events";

export function RequestRouter() {
  return (
    <section className="rounded-xl border border-[#d8c1c1] bg-[#fff8f7] p-4 sm:p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand)]">Pick your service lane</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {contactRoutes.map((route) => (
          <article key={route.id} className="rounded-lg border border-[#dcc9c9] bg-white p-4">
            <h3 className="text-sm font-semibold text-slate-900">{route.title}</h3>
            <p className="mt-1 text-xs text-slate-700">{route.description}</p>
            <Link
              href={route.href}
              onClick={() => {
                void trackEvent({
                  event: analyticsEvents.routerLaneSelect,
                  lane: route.id,
                  submissionType: route.submissionType,
                  metadata: { eventName: route.eventName },
                });
              }}
              className="mt-3 inline-flex min-h-11 items-center rounded-md bg-[var(--brand)] px-3 py-2 text-xs font-semibold text-white"
            >
              {route.ctaLabel}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
