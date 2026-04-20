"use client";

import { useMemo, useState } from "react";
import type { SubmissionType } from "@/lib/forms/types";
import { RequestForm } from "@/components/forms/RequestForm";
import { contactRoutes } from "@/content/contactRoutes";
import { trackEvent } from "@/lib/analytics/client";
import { analyticsEvents } from "@/lib/analytics/events";

type ContactIntakeRouterProps = {
  initialLane?: SubmissionType | null;
};

type FormLane = {
  id: string;
  title: string;
  taskLabel: string;
  summary: string;
  eventName: string;
  type: SubmissionType;
};

const lanes: FormLane[] = [
  {
    id: "emergency-septic",
    title: "Emergency septic help",
    taskLabel: "I need emergency septic help now",
    summary: "Urgent warning signs and dispatch-ready septic details.",
    eventName: "contact_form_lane_emergency_septic",
    type: "septic-service",
  },
  {
    id: "routine-pumping",
    title: "Routine septic pumping",
    taskLabel: "I need routine septic pumping",
    summary: "Scheduled septic pumping and maintenance details.",
    eventName: "contact_form_lane_routine_pumping",
    type: "septic-service",
  },
  {
    id: "realtor-evaluation",
    title: "Home-sale / Realtor evaluation",
    taskLabel: "I need a home-sale or Realtor evaluation",
    summary: "Deadline and transaction-specific evaluation intake.",
    eventName: "contact_form_lane_realtor_evaluation",
    type: "evaluation",
  },
  {
    id: "portable-toilet-rental",
    title: "Portable toilet rental",
    taskLabel: "I need portable toilet rental",
    summary: "Quote-ready rental intake with unit and duration details.",
    eventName: "contact_form_lane_portable_rental",
    type: "rental",
  },
  {
    id: "commercial-support",
    title: "Commercial support",
    taskLabel: "I need commercial support",
    summary: "Commercial service intake for facility and operation context.",
    eventName: "contact_form_lane_commercial",
    type: "commercial-service",
  },
];

const formTitleByType: Record<SubmissionType, string> = {
  general: "General Contact Request",
  "septic-service": "Septic Service Request",
  evaluation: "Well and Septic Evaluation Request",
  rental: "Portable Rental Request",
  "commercial-service": "Commercial Service Request",
};

export function ContactIntakeRouter({ initialLane = null }: ContactIntakeRouterProps) {
  const [selectedLane, setSelectedLane] = useState<FormLane | null>(() => {
    if (!initialLane) {
      return lanes[0];
    }

    return lanes.find((lane) => lane.type === initialLane) ?? lanes[0];
  });

  const selectedType = selectedLane?.type ?? "septic-service";

  const selectedRouteContract = useMemo(
    () =>
      contactRoutes.find((route) => route.submissionType === selectedType) ??
      contactRoutes[0],
    [selectedType],
  );

  return (
    <div className="grid gap-5">
      <div className="rounded-xl border border-[#d8c1c1] bg-[#fff8f7] p-4 sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand)]">
          Form lane router
        </p>
        <div className="mt-3.5 grid gap-2.5 sm:grid-cols-2">
          {lanes.map((lane) => {
            const active = lane.id === selectedLane?.id;
            return (
              <button
                key={lane.id}
                type="button"
                onClick={() => {
                  setSelectedLane(lane);
                  void trackEvent({
                    event: analyticsEvents.routerLaneSelect,
                    lane: lane.id,
                    submissionType: lane.type,
                    metadata: { eventName: lane.eventName },
                  });
                }}
                className={`rounded-lg border px-3.5 py-3.5 text-left transition ${
                  active
                    ? "border-[var(--brand)] bg-[#fff1ef]"
                    : "border-[#dcc9c9] bg-white hover:border-[#cab4b4]"
                }`}
              >
                <p className="text-sm font-semibold text-slate-900">{lane.title}</p>
                <p className="mt-1 text-xs text-slate-700">{lane.taskLabel}</p>
                <p className="mt-1 text-xs text-slate-600">{lane.summary}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-lg border border-[#ead9d9] bg-[#fffdfc] px-3.5 py-2.5 text-sm text-slate-700">
        Active route contract: <strong>{selectedRouteContract.title}</strong>.
        <span className="ml-1">Primary action label: {selectedRouteContract.ctaLabel}.</span>
      </div>

      <div className="rounded-xl border border-[#e4dbc9] bg-[#fffdf7] p-3 sm:p-4">
        <RequestForm key={selectedLane?.id ?? selectedType} type={selectedType} title={formTitleByType[selectedType]} />
      </div>
    </div>
  );
}
