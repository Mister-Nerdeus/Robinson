"use client";

import Link from "next/link";
import { publicBusinessFacts } from "@/content/businessFacts";
import { trackEvent } from "@/lib/analytics/client";
import { analyticsEvents } from "@/lib/analytics/events";
import { publicCta } from "@/content/cta";

export function MobileActionRail() {
  const primaryLine = publicBusinessFacts.phoneSemantics.primaryServiceLine.number;

  return (
    <div
      data-mobile-action-rail="global-v1"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[#d1c3c3] bg-[var(--surface)]/95 px-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-2 shadow-[0_-4px_14px_rgba(0,0,0,0.12)] md:hidden"
    >
      <div className="container grid grid-cols-2 gap-2">
        <a
          href={`tel:${primaryLine}`}
          onClick={() => {
            void trackEvent({ event: analyticsEvents.callCtaClick, metadata: { location: "mobile-sticky-rail" } });
          }}
          data-homepage-cta-surface="mobile-rail-call"
          className="rounded-md bg-[var(--brand)] px-3 py-3 text-center text-sm font-semibold text-white"
        >
          {publicCta.global.call.label}
        </a>
        <Link
          href="/contact"
          data-homepage-cta-surface="mobile-rail-request"
          className="rounded-md border border-[var(--brand)] bg-white px-3 py-3 text-center text-sm font-semibold text-[var(--brand)]"
        >
          {publicCta.global.request.label}
        </Link>
      </div>
    </div>
  );
}
