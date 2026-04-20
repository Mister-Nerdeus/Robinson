"use client";

import { company } from "@/config/company";
import { trackEvent } from "@/lib/analytics/client";
import { analyticsEvents } from "@/lib/analytics/events";

export function PrimaryCallBand() {
  const href = `tel:+1${company.primaryPhone.replace(/\\D/g, "")}`;

  return (
    <section className="rounded-2xl border border-[#d8c1c1] bg-[var(--brand)] p-5 text-white">
      <p className="text-xs font-semibold uppercase tracking-[0.16em]">Emergency Septic Lane</p>
      <h2 className="mt-2 font-display text-2xl">Need emergency septic help right now?</h2>
      <p className="mt-2 text-sm text-white/90">
        Active backup, alarm, overflow, or immediate septic failure: call dispatch first.
      </p>
      <a
        href={href}
        onClick={() => {
          void trackEvent({
            event: analyticsEvents.callCtaClick,
            metadata: { location: "contact-primary-call-band", lane: "emergency-septic" },
          });
        }}
        className="mt-3 inline-flex min-h-11 items-center rounded-md bg-white px-4 py-3 text-sm font-semibold text-[var(--brand)]"
      >
        Call {company.primaryPhone}
      </a>
    </section>
  );
}
