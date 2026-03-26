"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics/client";
import { analyticsEvents } from "@/lib/analytics/events";

export function ServiceCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-[#c7beaa] bg-[var(--surface)] p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <h3 className="font-display text-[2rem] leading-tight text-[var(--brand)] lg:text-[1.8rem]">{title}</h3>
      <p className="mt-3 flex-1 text-base leading-8 text-slate-800">{description}</p>
      <Link
        className="mt-5 inline-flex w-fit items-center rounded-md border border-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-[var(--brand)] transition hover:bg-[#fff3f2]"
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
