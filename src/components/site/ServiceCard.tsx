"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics/client";
import { analyticsEvents } from "@/lib/analytics/events";

export function ServiceCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <article className="rounded-xl border border-[#c7beaa] bg-[var(--surface)] p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <h3 className="font-display text-2xl text-[var(--brand)]">{title}</h3>
      <p className="mt-2 text-base text-slate-800">{description}</p>
      <Link
        className="mt-4 inline-block text-sm font-semibold underline"
        href={href}
        onClick={() => {
          void trackEvent({ event: analyticsEvents.laneClick, lane: title });
        }}
      >
        Learn more
      </Link>
    </article>
  );
}
