"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { SubmissionType } from "@/lib/forms/types";
import { FormField } from "./FormField";
import { trackEvent } from "@/lib/analytics/client";
import { analyticsEvents } from "@/lib/analytics/events";
import { FormConfirmation } from "./FormConfirmation";
import { FormErrorState } from "./FormErrorState";
import { useWizard } from "@/hooks/useWizard";
import { WizardActions } from "./WizardActions";
import { WizardContainer, WizardMobileActions } from "./WizardContainer";
import { FormFieldGroup } from "./FormFieldGroup";
import { scrollAndFocus } from "@/lib/ui/scrollAndFocus";
import { fieldAutocompleteMap } from "@/lib/forms/schema";

type FormFieldConfig = {
  name: string;
  label: string;
  required?: boolean;
  type?: "text" | "email" | "date" | "tel" | "number" | "textarea";
  placeholder?: string;
  helpText?: string;
  options?: Array<{ value: string; label: string }>;
  min?: string;
  inputMode?: "text" | "numeric" | "decimal" | "tel" | "email";
  rows?: number;
  span?: "full" | "half";
  autoComplete?: string;
};

type CheckboxGroupConfig = {
  name: string;
  label: string;
  required?: boolean;
  helpText?: string;
  options: Array<{ value: string; label: string }>;
};

type FormSection = {
  id: string;
  title: string;
  description?: string;
  fields?: FormFieldConfig[];
  checkboxGroups?: CheckboxGroupConfig[];
  fieldOrder?: "fields-first" | "checks-first";
};

type Props = {
  type: SubmissionType;
  title: string;
};

const helperByType: Record<SubmissionType, string> = {
  general:
    "General fallback lane. For active emergencies, calling is fastest. Use this form for non-urgent questions or detailed follow-up requests.",
  "septic-service":
    "For active backups or overflows, call immediately. This form captures dispatch details that reduce callback delays.",
  evaluation:
    "Share sale role, timeline, and property access context so evaluation scheduling can match deadline pressure.",
  rental:
    "Include unit count, duration, and site setup details so rental staging and service cadence can be quoted correctly.",
  "commercial-service":
    "Use this intake for facility requests so dispatch has site location, service context, and on-site contact details.",
};

const submitLabelByType: Record<SubmissionType, string> = {
  general: "Send Request",
  "septic-service": "Request Septic Service",
  evaluation: "Request Evaluation",
  rental: "Request Rental Quote",
  "commercial-service": "Request Commercial Service",
};

const urgencyOptions = [
  { value: "normal", label: "Normal" },
  { value: "urgent", label: "Urgent (same/next day)" },
  { value: "emergency", label: "Emergency" },
];

const locationFieldsRequired: FormFieldConfig[] = [
  {
    name: "streetAddress",
    label: "Service Street Address",
    required: true,
    placeholder: "Street address",
    helpText: "Use the address where service should arrive.",
    span: "full",
    autoComplete: "address-line1",
  },
  {
    name: "city",
    label: "Service City",
    required: true,
    placeholder: "Pierson",
    helpText: "If mailing and service addresses differ, use the service location.",
    autoComplete: "address-level2",
  },
  {
    name: "zip",
    label: "Service ZIP",
    required: true,
    placeholder: "49339",
    inputMode: "numeric",
    helpText: "If unsure whether you are in the service area, still submit and Robinson will confirm.",
    autoComplete: "postal-code",
  },
];

const locationFieldsOptional: FormFieldConfig[] = [
  {
    name: "streetAddress",
    label: "Service Street Address",
    placeholder: "Street address",
    helpText: "Use the address where service should arrive if this request needs on-site service.",
    span: "full",
    autoComplete: "address-line1",
  },
  {
    name: "city",
    label: "Service City",
    placeholder: "Pierson",
    helpText: "If mailing and service addresses differ, use the service location.",
    autoComplete: "address-level2",
  },
  {
    name: "zip",
    label: "Service ZIP",
    placeholder: "49339",
    inputMode: "numeric",
    helpText: "If unsure whether you are in the service area, still submit and Robinson will confirm.",
    autoComplete: "postal-code",
  },
];

const sharedContactFields: FormFieldConfig[] = [
  { name: "fullName", label: "Full Name", required: true, autoComplete: "name" },
  { name: "phone", label: "Best Phone", type: "tel", required: true, autoComplete: "tel" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
];

const sharedSchedulingFields: FormFieldConfig[] = [
  { name: "preferredDate", label: "Preferred Date", type: "date" },
  {
    name: "preferredTime",
    label: "Preferred Time Window",
    options: [
      { value: "morning", label: "Morning" },
      { value: "midday", label: "Midday" },
      { value: "afternoon", label: "Afternoon" },
      { value: "evening", label: "Evening" },
      { value: "flexible", label: "Flexible" },
    ],
  },
  {
    name: "urgency",
    label: "Urgency",
    required: true,
    options: urgencyOptions,
  },
];

const laneSpecificSections: Record<SubmissionType, FormSection[]> = {
  general: [
    {
      id: "general-topic",
      title: "Request Type",
      fields: [
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
        {
          name: "serviceLocationInvolved",
          label: "Does this request involve on-site service?",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
            { value: "unsure", label: "Unsure" },
          ],
          helpText: "If yes, add structured location details below.",
        },
      ],
    },
  ],
  "septic-service": [
    {
      id: "septic-system",
      title: "System Details",
      fields: [
        {
          name: "tankSizeGallons",
          label: "Tank Size",
          required: true,
          helpText: "If unknown, choose Unknown.",
          options: [
            { value: "500", label: "500 gallons" },
            { value: "750", label: "750 gallons" },
            { value: "1000", label: "1000 gallons" },
            { value: "1250", label: "1250 gallons" },
            { value: "1500", label: "1500 gallons" },
            { value: "2000-plus", label: "2000+ gallons" },
            { value: "unknown", label: "Unknown" },
          ],
        },
        {
          name: "tankCount",
          label: "Tank Count",
          required: true,
          helpText: "If unknown, choose Unknown.",
          options: [
            { value: "1", label: "1" },
            { value: "2", label: "2" },
            { value: "3-plus", label: "3+" },
            { value: "unknown", label: "Unknown" },
          ],
        },
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
        {
          name: "tankLocationKnown",
          label: "Is tank location known?",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
            { value: "unsure", label: "Unsure (that is okay)" },
          ],
        },
      ],
    },
    {
      id: "septic-problem",
      title: "Problem Details",
      fieldOrder: "checks-first",
      checkboxGroups: [
        {
          name: "problemSigns",
          label: "What are you seeing?",
          required: true,
          helpText: "Select all that apply. If unsure what the issue is, choose Unknown and explain briefly below.",
          options: [
            { value: "sewage-backup", label: "Sewage backup" },
            { value: "toilet-wont-flush", label: "Toilet won't flush" },
            { value: "tub-sink-backup", label: "Tub/sink backup" },
            { value: "standing-water-yard", label: "Standing water in yard" },
            { value: "strong-odor", label: "Strong odor" },
            { value: "slow-drains", label: "Slow drains" },
            { value: "septic-alarm", label: "Septic alarm going off" },
            { value: "routine-pumping", label: "No active problem, routine pumping" },
            { value: "unknown", label: "Unknown" },
            { value: "other", label: "Other" },
          ],
        },
      ],
      fields: [
        {
          name: "additionalWarningDetails",
          label: "Additional warning details (optional)",
          type: "textarea",
          rows: 3,
          placeholder: "If needed, add details about when/where symptoms appear.",
          span: "full",
        },
      ],
    },
    {
      id: "septic-access",
      title: "Access & Scheduling",
      checkboxGroups: [
        {
          name: "accessIssues",
          label: "Access issues",
          required: true,
          helpText: "Select all that apply.",
          options: [
            { value: "gate", label: "Gate" },
            { value: "pets", label: "Pets" },
            { value: "snow", label: "Snow" },
            { value: "landscaping-obstacles", label: "Landscaping obstacles" },
            { value: "parked-vehicles", label: "Parked vehicles" },
            { value: "none", label: "None" },
            { value: "other", label: "Other" },
          ],
        },
      ],
      fields: [
        {
          name: "existingCustomer",
          label: "Existing customer?",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
            { value: "unsure", label: "Unsure (that is okay)" },
          ],
        },
        {
          name: "propertyUsage",
          label: "Residential or commercial?",
          required: true,
          options: [
            { value: "residential", label: "Residential" },
            { value: "commercial", label: "Commercial" },
            { value: "unsure", label: "Unsure (that is okay)" },
          ],
        },
        {
          name: "systemPumpedBefore",
          label: "System pumped before?",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
            { value: "unsure", label: "Unsure (that is okay)" },
          ],
        },
      ],
    },
  ],
  evaluation: [
    {
      id: "evaluation-details",
      title: "Evaluation Details",
      fields: [
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
            { value: "tenant-occupied", label: "Tenant occupied" },
            { value: "unknown", label: "Unknown" },
          ],
        },
        {
          name: "utilityOnStatus",
          label: "Utilities on?",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
            { value: "unknown", label: "Unknown" },
          ],
        },
        {
          name: "occupantPresent",
          label: "Occupant present during visit?",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
            { value: "unknown", label: "Unknown" },
          ],
        },
        {
          name: "propertyType",
          label: "Property Type",
          required: true,
          options: [
            { value: "single-family", label: "Single-family" },
            { value: "multi-family", label: "Multi-family" },
            { value: "vacant-land", label: "Vacant land" },
            { value: "other", label: "Other" },
          ],
        },
        {
          name: "accessInstructions",
          label: "Access instructions",
          type: "textarea",
          rows: 3,
          placeholder: "Gate code, lockbox notes, or access constraints.",
          span: "full",
        },
      ],
    },
  ],
  rental: [
    {
      id: "rental-details",
      title: "Rental Details",
      fields: [
        {
          name: "eventType",
          label: "Event / Jobsite Type",
          required: true,
          options: [
            { value: "construction", label: "Construction site" },
            { value: "residential-project", label: "Residential project" },
            { value: "public-event", label: "Public event" },
            { value: "private-event", label: "Private event" },
          ],
        },
        { name: "unitCount", label: "Unit Count", required: true, type: "number", min: "1" },
        {
          name: "rentalDuration",
          label: "Rental Duration",
          required: true,
          placeholder: "Example: 2 weeks",
        },
        {
          name: "serviceFrequency",
          label: "Service Frequency",
          required: true,
          options: [
            { value: "weekly", label: "Weekly" },
            { value: "twice-weekly", label: "Twice weekly" },
            { value: "event-only", label: "One-time event" },
          ],
        },
        {
          name: "siteType",
          label: "Site Conditions",
          required: true,
          options: [
            { value: "easy-truck-access", label: "Easy truck access" },
            { value: "limited-access", label: "Limited access" },
            { value: "requires-coordination", label: "Requires coordination" },
          ],
        },
        {
          name: "handwashStationNeeded",
          label: "Handwash station needed?",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ],
        },
        {
          name: "adaUnitNeeded",
          label: "ADA unit needed?",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ],
        },
        {
          name: "placementSurface",
          label: "Placement Surface",
          required: true,
          options: [
            { value: "grass", label: "Grass" },
            { value: "gravel", label: "Gravel" },
            { value: "pavement", label: "Pavement" },
            { value: "mixed", label: "Mixed" },
            { value: "unknown", label: "Unknown" },
          ],
        },
        {
          name: "siteAccessNotes",
          label: "Site access notes",
          type: "textarea",
          rows: 3,
          placeholder: "Delivery constraints or placement notes.",
          span: "full",
        },
      ],
    },
  ],
  "commercial-service": [
    {
      id: "commercial-details",
      title: "Commercial Service Details",
      fields: [
        { name: "facilityName", label: "Facility / Business Name", required: true },
        {
          name: "facilityType",
          label: "Facility Type",
          required: true,
          options: [
            { value: "restaurant", label: "Restaurant / Food service" },
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
            { value: "grease-trap", label: "Grease trap cleaning" },
            { value: "lift-pump", label: "Lift pump service" },
            { value: "septic-pumping", label: "Commercial septic pumping" },
            { value: "inspection", label: "Inspection / troubleshooting" },
          ],
        },
        {
          name: "greaseTrapCount",
          label: "Number of tanks / traps",
          required: true,
          type: "number",
          min: "1",
        },
        { name: "onSiteContact", label: "On-site Contact Name + Role", required: true, autoComplete: "name" },
        {
          name: "accessHours",
          label: "Access hours",
          placeholder: "Example: Mon-Fri 7am-4pm",
        },
        {
          name: "greaseTrapLocation",
          label: "Grease trap location",
          required: true,
          options: [
            { value: "indoor", label: "Indoor" },
            { value: "outdoor", label: "Outdoor" },
            { value: "mixed", label: "Mixed" },
            { value: "unknown", label: "Unknown" },
          ],
        },
        {
          name: "previousServiceHistoryKnown",
          label: "Previous service history known?",
          required: true,
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
            { value: "unknown", label: "Unknown" },
          ],
        },
        {
          name: "serviceUrgency",
          label: "Service urgency",
          required: true,
          options: urgencyOptions,
        },
      ],
    },
  ],
};

const multiValueNames = new Set(["problemSigns", "accessIssues"]);

const requiredCheckboxGroupsByType: Record<SubmissionType, string[]> = {
  general: [],
  "septic-service": ["problemSigns", "accessIssues"],
  evaluation: [],
  rental: [],
  "commercial-service": [],
};

function normalizePayload(formData: FormData) {
  const payload: Record<string, string | string[]> = {};

  for (const key of new Set(formData.keys())) {
    if (key === "companyWebsite") {
      continue;
    }

    if (multiValueNames.has(key)) {
      const values = formData
        .getAll(key)
        .map((value) => String(value).trim())
        .filter(Boolean);
      payload[key] = values;
      continue;
    }

    const value = formData.get(key);
    payload[key] = value == null ? "" : String(value).trim();
  }

  return payload;
}

function CheckboxGroup({
  config,
  selectedValues,
  errorText,
  onToggle,
}: {
  config: CheckboxGroupConfig;
  selectedValues: string[];
  errorText?: string;
  onToggle: (name: string, value: string, checked: boolean) => void;
}) {
  const groupId = `checkbox-group-${config.name}`;
  const helpId = config.helpText ? `${groupId}-help` : undefined;
  const errorId = errorText ? `${groupId}-error` : undefined;
  const describedBy = [helpId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <fieldset className="grid gap-3.5 rounded-md border border-[#d8cfc0] bg-[#fffdfa] p-4 sm:p-5" aria-describedby={describedBy}>
      <legend className="px-1 text-sm font-semibold text-slate-900">{config.label}</legend>
      {config.helpText ? <p id={helpId} className="text-xs text-slate-600">{config.helpText}</p> : null}
      {errorText ? (
        <p id={errorId} className="text-xs font-semibold text-[#8f0f1a]">
          {errorText}
        </p>
      ) : null}
      <div className="grid gap-3.5 2xl:grid-cols-2">
        {config.options.map((option) => (
          <label
            key={`${config.name}-${option.value}`}
            className="flex items-start gap-2.5 rounded-md border border-[#e3d8ca] bg-white px-3.5 py-3.5 text-sm leading-snug"
          >
            <input
              type="checkbox"
              name={config.name}
              value={option.value}
              className="mt-1 h-4 w-4 accent-[var(--brand)]"
              checked={selectedValues.includes(option.value)}
              onChange={(event) => onToggle(config.name, option.value, event.target.checked)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function RequestForm({ type, title }: Props) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [started, setStarted] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [multiValues, setMultiValues] = useState<Record<string, string[]>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const wizardRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const hasRenderedStepRef = useRef(false);

  const locationFields = type === "general" ? locationFieldsOptional : locationFieldsRequired;

  const sections = useMemo<FormSection[]>(() => {
    const baseShared: FormSection[] = [
      {
        id: "contact",
        title: "Contact",
        fields: sharedContactFields,
      },
      {
        id: "location",
        title: "Location",
        description:
          type === "general"
            ? "General contact stays location-light until on-site service is relevant."
            : "Use the service location where dispatch should arrive.",
        fields: locationFields,
      },
      {
        id: "scheduling",
        title: "Urgency & Scheduling",
        fields: sharedSchedulingFields,
      },
    ];

    if (type === "general") {
      return [
        baseShared[0],
        ...laneSpecificSections.general,
        baseShared[1],
      ];
    }

    return [...baseShared, ...laneSpecificSections[type]];
  }, [locationFields, type]);

  const serviceLocationInvolved = formValues.serviceLocationInvolved ?? "";
  const showGeneralLocationFields =
    type !== "general" ||
    serviceLocationInvolved === "yes" ||
    serviceLocationInvolved === "unsure";
  const notesStepIndex = sections.length;
  const reviewStepIndex = sections.length + 1;
  const totalSteps = sections.length + 2;
  const { currentStep, setCurrentStep, goBack, goNext } = useWizard({ totalSteps });
  const isReviewStep = currentStep === reviewStepIndex;

  useEffect(() => {
    void trackEvent({
      event: analyticsEvents.formStepView,
      submissionType: type,
      metadata: { step: currentStep + 1, totalSteps },
    });
  }, [currentStep, totalSteps, type]);

  useEffect(() => {
    if (!hasRenderedStepRef.current) {
      hasRenderedStepRef.current = true;
      return;
    }

    scrollAndFocus(headingRef.current, { behavior: "smooth", delayMs: 120 });
  }, [currentStep]);

  function setFieldValue(name: string, value: string) {
    setFormValues((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  function setMultiValue(name: string, value: string, checked: boolean) {
    setMultiValues((current) => {
      const existing = current[name] ?? [];
      if (checked) {
        if (existing.includes(value)) return current;
        return { ...current, [name]: [...existing, value] };
      }
      return { ...current, [name]: existing.filter((item) => item !== value) };
    });
    setFieldErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  function validateStep(stepIndex: number): boolean {
    const active = sections[stepIndex];
    if (!active) {
      if (stepIndex === notesStepIndex && !(formValues.message ?? "").trim()) {
        setFieldErrors((current) => ({ ...current, message: "Dispatch notes are required before review." }));
        return false;
      }
      return true;
    }

    const nextErrors: Record<string, string> = {};
    for (const field of active.fields ?? []) {
      if (!field.required) continue;
      const value = formValues[field.name] ?? "";
      if (!value.trim()) {
        nextErrors[field.name] = `${field.label} is required.`;
      }
    }

    for (const group of active.checkboxGroups ?? []) {
      if (!group.required) continue;
      const values = multiValues[group.name] ?? [];
      if (values.length === 0) {
        nextErrors[group.name] = `${group.label} is required.`;
      }
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors((current) => ({ ...current, ...nextErrors }));
      return false;
    }

    return true;
  }

  async function onSubmit(formData: FormData) {
    setStatus("submitting");
    await trackEvent({ event: analyticsEvents.formSubmit, submissionType: type });

    const requiredGroups = requiredCheckboxGroupsByType[type];
    for (const groupName of requiredGroups) {
      if (formData.getAll(groupName).length === 0) {
        setMessage("Please complete required checklist fields before submitting.");
        setStatus("error");
        await trackEvent({ event: analyticsEvents.formSubmitError, submissionType: type });
        return;
      }
    }

    if (type === "general" && serviceLocationInvolved === "no") {
      formData.set("streetAddress", "");
      formData.set("city", "");
      formData.set("zip", "");
    }

    const payload = normalizePayload(formData);

    if (type === "commercial-service" && typeof payload.serviceUrgency === "string" && !payload.urgency) {
      payload.urgency = payload.serviceUrgency;
    }

    try {
      const res = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json();
        setMessage(
          body?.error
            ? "Please review the required fields and submit again."
            : "Request could not be sent right now.",
        );
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

  const activeSection = sections[currentStep];

  const wizardStep = (() => {
    if (activeSection) {
      return (
        <section className="surface-card animate-[wizard-step-enter_240ms_ease-out] grid gap-6 rounded-[var(--radius-card)] border border-[#ddd4c5] bg-[#fffdf9] p-[var(--space-card-pad)] sm:p-6">
          <div>
            <h4 className="font-display text-xl text-[var(--brand)]">{activeSection.title}</h4>
            {activeSection.description ? <p className="mt-1 text-xs text-slate-600">{activeSection.description}</p> : null}
          </div>

          {type === "general" && activeSection.id === "location" && !showGeneralLocationFields ? (
            <p className="rounded-md border border-[#eadfce] bg-[#fff7f1] px-3 py-2 text-xs text-slate-700">
              Location fields appear when on-site service is marked <strong>Yes</strong> or <strong>Unsure</strong>.
            </p>
          ) : (
            <>
              {activeSection.fieldOrder === "checks-first"
                ? activeSection.checkboxGroups?.map((group) => (
                    <CheckboxGroup
                      key={group.name}
                      config={group}
                      selectedValues={multiValues[group.name] ?? []}
                      errorText={fieldErrors[group.name]}
                      onToggle={setMultiValue}
                    />
                  ))
                : null}

              {activeSection.fields ? (
                <FormFieldGroup>
                  {activeSection.fields.map((field) => (
                    <div key={field.name} className={field.span === "full" ? "lg:col-span-2" : "lg:col-span-1"}>
                      <FormField
                        name={field.name}
                        label={field.label}
                        type={field.type}
                        required={field.required}
                        placeholder={field.placeholder}
                        helpText={field.helpText}
                        options={field.options}
                        min={field.min}
                        inputMode={field.inputMode}
                        rows={field.rows}
                        autoComplete={field.autoComplete ?? fieldAutocompleteMap[field.name]}
                        errorText={fieldErrors[field.name]}
                        ariaInvalid={Boolean(fieldErrors[field.name])}
                        value={formValues[field.name] ?? ""}
                        onValueChange={setFieldValue}
                      />
                    </div>
                  ))}
                </FormFieldGroup>
              ) : null}

              {(activeSection.fieldOrder === undefined || activeSection.fieldOrder === "fields-first")
                ? activeSection.checkboxGroups?.map((group) => (
                    <CheckboxGroup
                      key={group.name}
                      config={group}
                      selectedValues={multiValues[group.name] ?? []}
                      errorText={fieldErrors[group.name]}
                      onToggle={setMultiValue}
                    />
                  ))
                : null}
            </>
          )}
        </section>
      );
    }

    if (currentStep === notesStepIndex) {
      return (
        <section className="surface-card animate-[wizard-step-enter_240ms_ease-out] grid gap-6 rounded-[var(--radius-card)] border border-[#ddd4c5] bg-[#fffdf9] p-[var(--space-card-pad)] sm:p-6">
          <h4 className="font-display text-xl text-[var(--brand)]">Notes</h4>
          <FormField
            name="message"
            label="Dispatch Notes / Request Details"
            required
            type="textarea"
            rows={5}
            placeholder="Share anything that will help dispatch or scheduling."
            helpText="Freeform details remain important for unusual site conditions or nuanced requests."
            errorText={fieldErrors.message}
            ariaInvalid={Boolean(fieldErrors.message)}
            value={formValues.message ?? ""}
            onValueChange={setFieldValue}
          />
        </section>
      );
    }

    return (
      <section className="surface-card animate-[wizard-step-enter_240ms_ease-out] grid gap-4 rounded-[var(--radius-card)] border border-[#ddd4c5] bg-[#fffdf9] p-[var(--space-card-pad)] sm:p-6">
        <h4 className="font-display text-xl text-[var(--brand)]">Review Request</h4>
        <p className="text-sm text-slate-700">
          Use Edit to jump back to any step. Entered values stay in place while you review.
        </p>
        <div className="grid gap-2">
          {sections.map((section, index) => (
            <div key={section.id} className="flex items-center justify-between rounded-md border border-[#e4d9cb] bg-white px-3 py-2">
              <p className="text-sm font-semibold text-slate-900">{section.title}</p>
              <button
                type="button"
                className="text-sm font-semibold text-[var(--brand)] underline"
                onClick={() => setCurrentStep(index)}
              >
                Edit
              </button>
            </div>
          ))}
          <div className="flex items-center justify-between rounded-md border border-[#e4d9cb] bg-white px-3 py-2">
            <p className="text-sm font-semibold text-slate-900">Notes</p>
            <button
              type="button"
              className="text-sm font-semibold text-[var(--brand)] underline"
              onClick={() => setCurrentStep(notesStepIndex)}
            >
              Edit
            </button>
          </div>
        </div>
      </section>
    );
  })();

  const backAction = currentStep > 0 ? (
    <button
      type="button"
      className="min-h-11 w-full rounded-md border border-[var(--brand)] px-4 py-3 font-semibold text-[var(--brand)] md:w-auto"
      onClick={goBack}
    >
      Back
    </button>
  ) : undefined;

  const nextAction = !isReviewStep ? (
    <button
      type="button"
      className="min-h-11 w-full rounded-md bg-[var(--brand)] px-4 py-3 font-semibold text-white md:w-auto"
      onClick={() => {
        if (validateStep(currentStep)) {
          goNext();
        }
      }}
    >
      {currentStep === notesStepIndex ? "Review Request" : "Next Step"}
    </button>
  ) : (
    <button
      disabled={status === "submitting"}
      className="min-h-11 w-full rounded-md bg-[var(--brand)] px-4 py-3 font-semibold text-white disabled:opacity-60 md:w-auto"
      type="submit"
    >
      {status === "submitting" ? "Submitting..." : submitLabelByType[type]}
    </button>
  );

  return (
    <form
      action={async (fd) => {
        fd.set("type", type);
        if (!fd.get("state")) {
          fd.set("state", "MI");
        }
        if (type === "general" && !fd.get("urgency")) {
          fd.set("urgency", "normal");
        }
        await onSubmit(fd);
      }}
      onFocusCapture={() => {
        if (!started) {
          setStarted(true);
          void trackEvent({ event: analyticsEvents.formStart, submissionType: type });
        }
      }}
      className="request-form-shell grid gap-7"
    >
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="state" value="MI" />
      {type === "general" ? <input type="hidden" name="urgency" value="normal" /> : null}
      <input type="text" name="companyWebsite" className="hidden" tabIndex={-1} autoComplete="off" />
      <WizardContainer
        anchorId="request-form-wizard"
        headingId={`wizard-heading-${type}`}
        headingRef={headingRef}
        title={title}
        helperText={helperByType[type]}
        currentStep={currentStep}
        totalSteps={totalSteps}
        callout={
          type === "general" ? (
            <p className="rounded-md border border-[#e6ded0] bg-[#fffaf3] px-3 py-2 text-xs text-slate-700">
              Lightweight contact lane for questions and follow-up requests. If this becomes urgent, call anytime.
            </p>
          ) : (
            <p className="rounded-md border border-[#efd6d6] bg-[#fff7f6] px-3 py-2 text-xs text-slate-700">
              Fastest for emergencies: call now, then submit details to speed dispatch prep.
            </p>
          )
        }
        desktopActions={<WizardActions backAction={backAction} nextAction={nextAction} />}
        mobileActions={<WizardMobileActions backAction={backAction} nextAction={nextAction} />}
      >
        <div ref={wizardRef} className="grid gap-6">
          {wizardStep}
        </div>
      </WizardContainer>

      {isReviewStep ? (
        <>
          {Object.entries(formValues).map(([name, value]) => (
            <input key={`review-${name}`} type="hidden" name={name} value={value} />
          ))}
          {Object.entries(multiValues).map(([name, values]) =>
            values.map((value) => (
              <input key={`review-${name}-${value}`} type="hidden" name={name} value={value} />
            )),
          )}
        </>
      ) : null}

      {message && status === "success" ? <FormConfirmation message={message} /> : null}
      {message && status === "error" ? <FormErrorState message={message} /> : null}
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {message}
      </p>
    </form>
  );
}
