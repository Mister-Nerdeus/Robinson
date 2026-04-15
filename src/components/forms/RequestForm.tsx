"use client";

import { useState } from "react";
import type { SubmissionType } from "@/lib/forms/types";
import { FormField } from "./FormField";
import { trackEvent } from "@/lib/analytics/client";
import { analyticsEvents } from "@/lib/analytics/events";

type FormFieldConfig = {
  name: string;
  label: string;
  required?: boolean;
  type?: "text" | "email" | "date" | "tel" | "number";
  placeholder?: string;
  helpText?: string;
  options?: Array<{ value: string; label: string }>;
  min?: string;
};

type Props = {
  type: SubmissionType;
  title: string;
};

const helperByType: Record<SubmissionType, string> = {
  general:
    "General fallback lane. For active emergencies, calling is fastest. Use this form for non-urgent questions or detailed follow-up requests.",
  "septic-service":
    "For active backups or overflows, call immediately. Include tank and site access details below to reduce dispatch follow-up.",
  evaluation:
    "Share sale role, timeline, and occupancy context so evaluation scheduling can match deadline pressure.",
  rental:
    "Include unit count, duration, and site type so rental staging and service cadence can be quoted correctly.",
  "commercial-service":
    "Use this intake for facility and business requests so dispatch has location context, service scope, and an on-site contact.",
};

const submitLabelByType: Record<SubmissionType, string> = {
  general: "Send Request",
  "septic-service": "Request Septic Service",
  evaluation: "Request Evaluation",
  rental: "Request Rental Quote",
  "commercial-service": "Request Commercial Service",
};

const laneSpecificFields: Record<SubmissionType, FormFieldConfig[]> = {
  general: [
    {
      name: "topic",
      label: "Request Topic",
      required: true,
      options: [
        { value: "general-question", label: "General Question" },
        { value: "billing", label: "Billing / Account" },
        { value: "schedule-followup", label: "Scheduling Follow-up" },
        { value: "other", label: "Other" },
      ],
    },
  ],
  "septic-service": [
    { name: "tankSizeGallons", label: "Tank Size (Gallons)", required: true },
    { name: "tankCount", label: "Tank Count", required: true, type: "number", min: "1" },
    {
      name: "lidsExposed",
      label: "Are tank lids exposed?",
      required: true,
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
        { value: "unknown", label: "Unknown" },
      ],
    },
    { name: "backupSigns", label: "Current Warning Signs", required: true, helpText: "Example: sewage backup, strong odors, pooling water." },
  ],
  evaluation: [
    {
      name: "roleInSale",
      label: "Your Role in Sale",
      required: true,
      options: [
        { value: "buyer", label: "Buyer" },
        { value: "seller", label: "Seller" },
        { value: "realtor", label: "Realtor" },
        { value: "other", label: "Other" },
      ],
    },
    { name: "brokerageOrCompany", label: "Brokerage / Company" },
    { name: "closingDate", label: "Closing Date", type: "date" },
    {
      name: "occupancyStatus",
      label: "Property Occupancy Status",
      required: true,
      options: [
        { value: "occupied", label: "Occupied" },
        { value: "vacant", label: "Vacant" },
        { value: "tenant-occupied", label: "Tenant Occupied" },
        { value: "unknown", label: "Unknown" },
      ],
    },
  ],
  rental: [
    {
      name: "eventType",
      label: "Event / Jobsite Type",
      required: true,
      options: [
        { value: "construction", label: "Construction Site" },
        { value: "residential-project", label: "Residential Project" },
        { value: "public-event", label: "Public Event" },
        { value: "private-event", label: "Private Event" },
      ],
    },
    { name: "unitCount", label: "Unit Count", required: true, type: "number", min: "1" },
    { name: "rentalDuration", label: "Rental Duration", required: true, placeholder: "Example: 2 weeks" },
    {
      name: "serviceFrequency",
      label: "Service Frequency",
      required: true,
      options: [
        { value: "weekly", label: "Weekly" },
        { value: "twice-weekly", label: "Twice Weekly" },
        { value: "event-only", label: "One-time Event" },
      ],
    },
    {
      name: "siteType",
      label: "Site Conditions",
      required: true,
      options: [
        { value: "easy-truck-access", label: "Easy Truck Access" },
        { value: "limited-access", label: "Limited Access" },
        { value: "requires-coordination", label: "Requires On-site Coordination" },
      ],
    },
  ],
  "commercial-service": [
    { name: "facilityName", label: "Facility / Business Name", required: true },
    {
      name: "facilityType",
      label: "Facility Type",
      required: true,
      options: [
        { value: "restaurant", label: "Restaurant / Food Service" },
        { value: "industrial", label: "Industrial" },
        { value: "retail", label: "Retail" },
        { value: "institutional", label: "Institutional / School" },
        { value: "other", label: "Other" },
      ],
    },
    {
      name: "serviceNeeded",
      label: "Service Needed",
      required: true,
      options: [
        { value: "grease-trap", label: "Grease Trap Cleaning" },
        { value: "lift-pump", label: "Lift Pump Service" },
        { value: "septic-pumping", label: "Commercial Septic Pumping" },
        { value: "inspection", label: "Inspection / Troubleshooting" },
      ],
    },
    { name: "greaseTrapCount", label: "Number of Tanks / Traps", required: true, type: "number", min: "1" },
    { name: "onSiteContact", label: "On-site Contact Name + Role", required: true },
  ],
};

const baseFields: FormFieldConfig[] = [
  { name: "fullName", label: "Full Name", required: true },
  { name: "phone", label: "Best Phone", type: "tel", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "address", label: "Service Address", required: true },
  { name: "preferredDate", label: "Preferred Date", type: "date" },
  {
    name: "urgency",
    label: "Urgency",
    required: true,
    options: [
      { value: "normal", label: "Normal" },
      { value: "urgent", label: "Urgent (same/next day)" },
      { value: "emergency", label: "Emergency" },
    ],
  },
];

export function RequestForm({ type, title }: Props) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [started, setStarted] = useState(false);

  async function onSubmit(formData: FormData) {
    setStatus("submitting");
    await trackEvent({ event: analyticsEvents.formSubmit, submissionType: type });
    const payload = Object.fromEntries(formData.entries());
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json();
        setMessage(body?.error ? "Please review the required fields and submit again." : "Request could not be sent right now.");
        setStatus("error");
        await trackEvent({ event: analyticsEvents.formSubmitError, submissionType: type });
        return;
      }
      setMessage("Request submitted successfully. Robinson can now review your details and follow up.");
      setStatus("success");
      await trackEvent({ event: analyticsEvents.formSubmitSuccess, submissionType: type });
    } catch {
      setMessage("Network error while submitting. Please call if your need is urgent.");
      setStatus("error");
      await trackEvent({ event: analyticsEvents.formSubmitError, submissionType: type });
    }
  }

  const fields = [...baseFields, ...laneSpecificFields[type]];

  return (
    <form
      action={async (fd) => {
        fd.set("type", type);
        await onSubmit(fd);
      }}
      onFocusCapture={() => {
        if (!started) {
          setStarted(true);
          void trackEvent({ event: analyticsEvents.formStart, submissionType: type });
        }
      }}
      className="grid gap-3 rounded-xl border border-[#c8c1b1] bg-[var(--surface)] p-4 shadow-sm sm:p-5"
    >
      <h3 className="font-display text-2xl text-[var(--brand)]">{title}</h3>
      <p className="text-sm text-slate-700">{helperByType[type]}</p>
      <p className="rounded-md border border-[#efd6d6] bg-[#fff7f6] px-3 py-2 text-xs text-slate-700">
        Fastest for emergencies: call now, then submit details to speed dispatch prep.
      </p>
      <input type="hidden" name="type" value={type} />
      <input type="text" name="companyWebsite" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid gap-3 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name} className="sm:col-span-1">
            <FormField
              name={field.name}
              label={field.label}
              type={field.type}
              required={field.required}
              placeholder={field.placeholder}
              helpText={field.helpText}
              options={field.options}
              min={field.min}
            />
          </div>
        ))}
      </div>

      <label className="grid gap-1 text-sm">
        <span className="font-semibold">Dispatch Notes / Request Details</span>
        <textarea className="min-h-28 rounded-md border border-[#bdb4a2] bg-white px-3 py-2" name="message" required />
      </label>

      <button disabled={status === "submitting"} className="rounded-md bg-[var(--brand)] px-4 py-3 font-semibold text-white disabled:opacity-60" type="submit">
        {status === "submitting" ? "Submitting..." : submitLabelByType[type]}
      </button>
      {message ? <p className="text-sm">{message}</p> : null}
    </form>
  );
}