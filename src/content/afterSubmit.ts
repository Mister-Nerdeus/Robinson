import type { SubmissionType } from "@/lib/forms/types";

type AfterSubmitContract = {
  heading: string;
  reviewOwner: string;
  priorityRule: string;
  followUpExpectation: string;
  successMessage: string;
};

export const afterSubmitByLane: Record<SubmissionType, AfterSubmitContract> = {
  general: {
    heading: "After you submit",
    reviewOwner: "Office intake reviews general requests.",
    priorityRule: "Urgent safety/service concerns are escalated to dispatch.",
    followUpExpectation: "General lane follow-up is usually the next business day.",
    successMessage: "Request submitted. Office intake will review and follow up using your preferred contact details.",
  },
  "septic-service": {
    heading: "After you submit",
    reviewOwner: "Dispatch or intake reviews septic requests for routing and equipment prep.",
    priorityRule: "Active emergency symptoms remain call-first and are prioritized above routine pumping.",
    followUpExpectation: "Routine septic follow-up is scheduled by field capacity and route sequence.",
    successMessage: "Septic request submitted. Dispatch intake will review your details and follow up with scheduling or next triage steps.",
  },
  evaluation: {
    heading: "After you submit",
    reviewOwner: "Evaluation coordination reviews transaction details and access contacts.",
    priorityRule: "Deadline pressure is prioritized by closing and contingency windows.",
    followUpExpectation: "Non-emergency evaluation follow-up target is 1-3 business days.",
    successMessage: "Evaluation request submitted. The transaction lane team will review and follow up with scheduling coordination.",
  },
  rental: {
    heading: "After you submit",
    reviewOwner: "Rental coordination reviews quantity, duration, and delivery constraints.",
    priorityRule: "Near-term event/project dates are prioritized by availability and route capacity.",
    followUpExpectation: "Rental follow-up includes availability confirmation and next quote details.",
    successMessage: "Rental request submitted. Robinson will confirm availability and follow up with next quote/scheduling steps.",
  },
  "commercial-service": {
    heading: "After you submit",
    reviewOwner: "Commercial dispatch intake reviews facility details and service type.",
    priorityRule: "Operational risk and urgency determine call-back and scheduling priority.",
    followUpExpectation: "Follow-up includes service window planning and any required site coordination.",
    successMessage: "Commercial request submitted. Commercial dispatch intake will review and follow up with service planning details.",
  },
};
