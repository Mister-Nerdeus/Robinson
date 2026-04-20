import type { SubmissionRecord } from "@/lib/forms/types";

export function renderCustomerAcknowledgementTemplate(record: SubmissionRecord) {
  return {
    subject: "Robinson request received",
    text: [
      `Thanks ${record.fullName},`,
      "",
      "Robinson received your request.",
      `Lane: ${record.type}`,
      `Received at: ${record.createdAt}`,
      "",
      "If this is an active emergency septic issue, call now for fastest dispatch.",
      "For routine requests, a follow-up will be made based on urgency and scheduling load.",
    ].join("\n"),
  };
}
