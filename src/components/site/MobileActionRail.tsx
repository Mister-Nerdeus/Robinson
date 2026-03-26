"use client";

import Link from "next/link";
import { company } from "@/config/company";
import { trackEvent } from "@/lib/analytics/client";
import { analyticsEvents } from "@/lib/analytics/events";

export function MobileActionRail() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#d1c3c3] bg-[var(--surface)]/95 p-2 shadow-[0_-4px_14px_rgba(0,0,0,0.12)] md:hidden">
      <div className="container grid grid-cols-2 gap-2">
        <a
          href={`tel:${company.primaryPhone}`}
          onClick={() => {
            void trackEvent({ event: analyticsEvents.callCtaClick, metadata: { location: "mobile-sticky-rail" } });
          }}
          className="rounded-md bg-[var(--brand)] px-3 py-3 text-center text-sm font-semibold text-white"
        >
          Call Now
        </a>
        <Link href="/contact" className="rounded-md border border-[var(--brand)] bg-white px-3 py-3 text-center text-sm font-semibold text-[var(--brand)]">
          Request Service
        </Link>
      </div>
    </div>
  );
}
