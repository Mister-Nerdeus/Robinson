"use client";

import { useMemo, useRef, useState } from "react";
import type { SubmissionType } from "@/lib/forms/types";
import { RequestForm } from "@/components/forms/RequestForm";
import { contactRoutes } from "@/content/contactRoutes";
import type { ContactLaneId } from "@/content/contactRoutes";
import { trackEvent } from "@/lib/analytics/client";
import { analyticsEvents } from "@/lib/analytics/events";
import { scrollAndFocus } from "@/lib/ui/scrollAndFocus";

type ContactIntakeRouterProps = {
  initialLane?: SubmissionType | null;
};

type FormLane = {
  id: ContactLaneId;
  title: string;
  taskLabel: string;
  summary: string;
  eventName: string;
  type: SubmissionType;
};

const lanes: FormLane[] = contactRoutes.map((route) => ({
  id: route.id,
  title: route.title,
  taskLabel: route.userTaskLabel,
  summary: route.description,
  eventName: route.eventName,
  type: route.submissionType,
}));

const formTitleByType: Record<SubmissionType, string> = {
  general: "General Contact Request",
  "septic-service": "Septic Service Request",
  evaluation: "Well and Septic Evaluation Request",
  rental: "Portable Rental Request",
  "commercial-service": "Commercial Service Request",
};

export function ContactIntakeRouter({ initialLane = null }: ContactIntakeRouterProps) {
  const wizardHostRef = useRef<HTMLDivElement | null>(null);
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

  function focusWizardHeading() {
    const heading = wizardHostRef.current?.querySelector<HTMLElement>("[data-wizard-step-heading]");
    scrollAndFocus(heading, { behavior: "smooth", delayMs: 140 });
  }

  function anchorToWizard() {
    focusWizardHeading();
  }

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
                  requestAnimationFrame(() => {
                    requestAnimationFrame(anchorToWizard);
                  });
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

      <div ref={wizardHostRef} id="request-wizard" className="wizard-scroll-anchor">
        <RequestForm key={selectedLane?.id ?? selectedType} type={selectedType} title={formTitleByType[selectedType]} />
      </div>
    </div>
  );
}
