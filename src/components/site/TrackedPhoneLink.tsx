"use client";

import { trackEvent } from "@/lib/analytics/client";
import { analyticsEvents } from "@/lib/analytics/events";

type TrackedPhoneLinkProps = {
  href: string;
  label: string;
  location: string;
  className?: string;
};

export function TrackedPhoneLink({ href, label, location, className }: TrackedPhoneLinkProps) {
  return (
    <a
      href={href}
      onClick={() => {
        void trackEvent({ event: analyticsEvents.callCtaClick, metadata: { location } });
      }}
      className={className}
    >
      {label}
    </a>
  );
}
