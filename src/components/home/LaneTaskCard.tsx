"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics/client";
import { analyticsEvents } from "@/lib/analytics/events";
import type { HomeLaneCard } from "@/content/home";

export function LaneTaskCard({ lane }: { lane: HomeLaneCard }) {
  const highEmphasis = lane.emphasis === "high";
  const heightClass = highEmphasis
    ? "min-h-[17.5rem] md:min-h-[14.5rem] xl:min-h-[13.75rem]"
    : "min-h-[16rem] md:min-h-[14.25rem] xl:min-h-[13.5rem]";

  return (
    <article
      className={`flex h-full ${heightClass} flex-col rounded-2xl border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
        highEmphasis ? "border-[var(--brand)] bg-[#fff4f1]" : "border-[#cfc3b2] bg-[#fffdfa]"
      }`}
      data-lane-card-id={lane.id}
      data-lane-card-emphasis={highEmphasis ? "high" : "standard"}
      data-lane-card-contract="problem-value-action"
    >
      <h3 className="font-display text-[1.55rem] leading-tight text-[var(--brand)]">{lane.title}</h3>
      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700">Your situation</p>
      <p className="mt-1 text-sm text-slate-800">{lane.userProblem}</p>
      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700">How we help</p>
      <p className="mt-1 flex-1 text-sm text-slate-800">{lane.laneValue}</p>
      <Link
        className={`mt-4 inline-flex min-h-11 w-fit items-center rounded-md px-4 py-3 text-sm font-semibold transition ${
          highEmphasis
            ? "bg-[var(--brand)] text-white hover:opacity-95"
            : "border border-[var(--brand)] text-[var(--brand)] hover:bg-[#fff3f2]"
        }`}
        data-cta-family="route-specific-service"
        data-homepage-cta-surface={`chooser-${lane.id}`}
        href={lane.href}
        onClick={() => {
          void trackEvent({ event: analyticsEvents.laneClick, lane: lane.title });
        }}
      >
        {lane.ctaLabel}
      </Link>
    </article>
  );
}
