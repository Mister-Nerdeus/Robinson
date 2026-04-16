"use client";

import { useEffect, useMemo, useState } from "react";
import type { SubmissionType } from "@/lib/forms/types";
import { RequestForm } from "@/components/forms/RequestForm";

type ContactLane = {
  type: SubmissionType;
  title: string;
  summary: string;
  rationale: string;
};

const lanes: ContactLane[] = [
  {
    type: "septic-service",
    title: "Septic service",
    summary: "Backups, odors, or pumping needs with tank and access details.",
    rationale: "Dispatch-ready lane with structured septic system and symptom capture.",
  },
  {
    type: "evaluation",
    title: "Evaluation",
    summary: "Buyer/seller/Realtor requests with timeline and occupancy context.",
    rationale: "Structured property-sale lane for occupancy, utility, and access details.",
  },
  {
    type: "rental",
    title: "Portable rental",
    summary: "Event or jobsite rentals with unit count and service cadence.",
    rationale: "Structured rental lane for quantity, duration, and placement planning.",
  },
  {
    type: "commercial-service",
    title: "Commercial",
    summary: "Facility and grease-trap/lift-pump service requests.",
    rationale: "Operational lane for facility context and commercial service scope.",
  },
  {
    type: "general",
    title: "General contact",
    summary: "Fallback for questions that do not match a service lane yet.",
    rationale: "Lightweight fallback lane with optional location unless on-site service applies.",
  },
];

const formTitleByType: Record<SubmissionType, string> = {
  general: "General Contact Request",
  "septic-service": "Septic Service Request",
  evaluation: "Well and Septic Evaluation Request",
  rental: "Portable Rental Request",
  "commercial-service": "Commercial Service Request",
};

type ContactIntakeRouterProps = {
  initialLane?: SubmissionType | null;
};

export function ContactIntakeRouter({ initialLane = null }: ContactIntakeRouterProps) {
  const [selectedType, setSelectedType] = useState<SubmissionType | null>(initialLane);

  useEffect(() => {
    if (initialLane) {
      return;
    }

    const laneParam = new URLSearchParams(window.location.search).get("lane");
    if (!laneParam) {
      return;
    }

    const lane = lanes.find((candidate) => candidate.type === laneParam);
    if (lane) {
      setSelectedType(lane.type);
    }
  }, [initialLane]);

  const selectedLane = useMemo(
    () => lanes.find((lane) => lane.type === selectedType),
    [selectedType],
  );
  const isGeneralLane = selectedType === "general";

  return (
    <div className="grid gap-4">
      <div className="rounded-xl border border-[#d8c1c1] bg-[#fff8f7] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand)]">
          Choose your intake lane
        </p>
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
        <div
          className={`rounded-lg border px-3 py-2 text-sm text-slate-700 ${
            isGeneralLane
              ? "border-[#d9d0c0] bg-[#fffaf2]"
              : "border-[#ead9d9] bg-[#fffdfc]"
          }`}
        >
          Active lane: <strong>{selectedLane.title}</strong>. {selectedLane.summary}
          <p className="mt-1 text-xs text-slate-600">{selectedLane.rationale}</p>
        </div>
      ) : (
        <div className="rounded-lg border border-[#ead9d9] bg-[#fffdfc] px-3 py-2 text-sm text-slate-700">
          Select a lane to start the structured intake form. If unsure, choose <strong>General contact</strong>.
        </div>
      )}

      {selectedType ? (
        <div className={isGeneralLane ? "rounded-xl border border-[#e4dbc9] bg-[#fffdf7] p-2 sm:p-3" : ""}>
          <RequestForm key={selectedType} type={selectedType} title={formTitleByType[selectedType]} />
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-[#ccb8b8] bg-white px-4 py-6 text-sm text-slate-700">
          Form will appear after a lane is selected.
        </div>
      )}
    </div>
  );
}
