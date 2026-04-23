import type { SubmissionType } from "@/lib/forms/types";

type Props = {
  lane: SubmissionType;
  message: string;
};

const laneDetails: Record<SubmissionType, { title: string; dispatchFactors: string; sla: string }> = {
  general: {
    title: "General Request Received",
    dispatchFactors: "Include location and service context in follow-up replies so intake can route without delay.",
    sla: "General follow-up usually lands the next business day.",
  },
  "septic-service": {
    title: "Septic Dispatch Intake Received",
    dispatchFactors:
      "Quote and dispatch prep are shaped by tank count, lid exposure, and urgency details.",
    sla: "Emergency symptoms remain call-first. Routine follow-up is scheduled by route capacity.",
  },
  evaluation: {
    title: "Evaluation Lane Request Received",
    dispatchFactors:
      "Deadline date, access contacts, and occupancy status determine scheduling priority and prep.",
    sla: "Evaluation coordination follows up in roughly 1-3 business days.",
  },
  rental: {
    title: "Rental Coordination Request Received",
    dispatchFactors:
      "Unit count, rental duration, and site access constraints drive availability and quote timing.",
    sla: "Rental coordination follows up with availability and next quote steps.",
  },
  "commercial-service": {
    title: "Commercial Service Request Received",
    dispatchFactors:
      "Facility context, service type, and urgency shape dispatch planning and sequencing.",
    sla: "Commercial intake follows up with service-window planning details.",
  },
};

export function SubmissionSuccessPanel({ lane, message }: Props) {
  const details = laneDetails[lane];

  return (
    <section className="rounded-md border border-[#cfe2cf] bg-[#f4fbf2] p-4 text-sm text-slate-800" aria-live="polite">
      <p className="font-semibold text-[#1f5d1f]">{details.title}</p>
      <p className="mt-1">{message}</p>
      <p className="mt-2"><span className="font-semibold">Quote/dispatch factors:</span> {details.dispatchFactors}</p>
      <p className="mt-1"><span className="font-semibold">Next-step timing:</span> {details.sla}</p>
    </section>
  );
}
