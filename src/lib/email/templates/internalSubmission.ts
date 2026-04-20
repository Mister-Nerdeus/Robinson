import type { SubmissionRecord } from "@/lib/forms/types";

export function renderInternalSubmissionTemplate(record: SubmissionRecord) {
  return {
    subject: `[${record.type}] New intake from ${record.fullName}`,
    text: [
      `Submission ID: ${record.id}`,
      `Created: ${record.createdAt}`,
      `Type: ${record.type}`,
      `Name: ${record.fullName}`,
      `Phone: ${record.phone}`,
      `Email: ${record.email}`,
      `Address: ${record.address || `${record.streetAddress}, ${record.city}, ${record.state} ${record.zip}`}`,
      `Urgency: ${record.urgency}`,
      `Message: ${record.message}`,
    ].join("\n"),
  };
}
