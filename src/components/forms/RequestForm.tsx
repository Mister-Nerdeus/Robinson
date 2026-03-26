"use client";

import { useState } from "react";
import type { SubmissionType } from "@/lib/forms/types";
import { FormField } from "./FormField";
import { trackEvent } from "@/lib/analytics/client";
import { analyticsEvents } from "@/lib/analytics/events";

type Props = {
  type: SubmissionType;
  title: string;
  extraFields?: Array<{ name: string; label: string; required?: boolean }>;
};

export function RequestForm({ type, title, extraFields = [] }: Props) {
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
        setMessage(body?.error ? "Validation failed. Review required fields." : "Request failed.");
        setStatus("error");
        await trackEvent({ event: analyticsEvents.formSubmitError, submissionType: type });
        return;
      }
      setMessage("Request submitted. Delivery notification status recorded.");
      setStatus("success");
      await trackEvent({ event: analyticsEvents.formSubmitSuccess, submissionType: type });
    } catch {
      setMessage("Network error while submitting.");
      setStatus("error");
      await trackEvent({ event: analyticsEvents.formSubmitError, submissionType: type });
    }
  }

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
      <input type="hidden" name="type" value={type} />
      <input type="text" name="companyWebsite" className="hidden" tabIndex={-1} autoComplete="off" />
      <FormField name="fullName" label="Full Name" required />
      <FormField name="phone" label="Phone" required />
      <FormField name="email" label="Email" type="email" required />
      <FormField name="address" label="Service Address" />
      <FormField name="preferredDate" label="Preferred Date" type="date" />
      {extraFields.map((field) => (
        <FormField key={field.name} name={field.name} label={field.label} required={field.required} />
      ))}
      <label className="grid gap-1 text-sm">
        <span className="font-semibold">Request Details</span>
        <textarea className="min-h-28 rounded-md border border-[#bdb4a2] bg-white px-3 py-2" name="message" required />
      </label>
      <button
        disabled={status === "submitting"}
        className="rounded-md bg-[var(--brand)] px-4 py-3 font-semibold text-white disabled:opacity-60"
        type="submit"
      >
        {status === "submitting" ? "Submitting..." : "Submit Request"}
      </button>
      {message ? <p className="text-sm">{message}</p> : null}
    </form>
  );
}
