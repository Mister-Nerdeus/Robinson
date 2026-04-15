"use client";

import { useMemo, useState } from "react";
import type { SubmissionType } from "@/lib/forms/types";
import { RequestForm } from "@/components/forms/RequestForm";

type ContactLane = {
  type: SubmissionType;
  title: string;
  summary: string;
};

const lanes: ContactLane[] = [
  {
    type: "septic-service",
    title: "Septic service",
    summary: "Backups, odors, or pumping needs with tank and access details.",
  },
  {
    type: "evaluation",
    title: "Evaluation",
    summary: "Buyer/seller/Realtor requests with timeline and occupancy context.",
  },
  {
    type: "rental",
    title: "Portable rental",
    summary: "Event or jobsite rentals with unit count and service cadence.",
  },
  {
    type: "commercial-service",
    title: "Commercial",
    summary: "Facility and grease-trap/lift-pump service requests.",
  },
  {
    type: "general",
    title: "General contact",
    summary: "Fallback for questions that do not match a service lane yet.",
  },
];

const formTitleByType: Record<SubmissionType, string> = {
  general: "General Contact Request",
  "septic-service": "Septic Service Request",
  evaluation: "Well and Septic Evaluation Request",
  rental: "Portable Rental Request",
  "commercial-service": "Commercial Service Request",
};

export function ContactIntakeRouter() {
  const [selectedType, setSelectedType] = useState<SubmissionType>("septic-service");

  const selectedLane = useMemo(() => lanes.find((lane) => lane.type === selectedType), [selectedType]);

  return (
    <div className="grid gap-4">
      <div className="rounded-xl border border-[#d8c1c1] bg-[#fff8f7] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand)]">Choose your intake lane</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {lanes.map((lane) => {
            const active = lane.type === selectedType;
            return (
              <button
                key={lane.type}
                type="button"
                onClick={() => setSelectedType(lane.type)}
                className={`rounded-lg border px-3 py-3 text-left transition ${
                  active
                    ? "border-[var(--brand)] bg-[#fff1ef]"
                    : "border-[#dcc9c9] bg-white hover:border-[#cab4b4]"
                }`}
              >
                <p className="text-sm font-semibold text-slate-900">{lane.title}</p>
                <p className="mt-1 text-xs text-slate-700">{lane.summary}</p>
              </button>
            );
          })}
        </div>
      </div>

      {selectedLane ? (
        <div className="rounded-lg border border-[#ead9d9] bg-[#fffdfc] px-3 py-2 text-sm text-slate-700">
          Active lane: <strong>{selectedLane.title}</strong>. {selectedLane.summary}
        </div>
      ) : null}

      <RequestForm type={selectedType} title={formTitleByType[selectedType]} />
    </div>
  );
}