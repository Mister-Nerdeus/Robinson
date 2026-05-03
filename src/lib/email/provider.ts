import type { SubmissionRecord } from "@/lib/forms/types";
import { sendSubmissionNotification } from "@/lib/notifications/send";
import { renderCustomerAcknowledgementTemplate } from "@/lib/email/templates/customerAcknowledgement";
import { renderInternalSubmissionTemplate } from "@/lib/email/templates/internalSubmission";

export type EmailDeliverySummary = {
  internal: Awaited<ReturnType<typeof sendSubmissionNotification>>;
  customer: Awaited<ReturnType<typeof sendSubmissionNotification>>;
};

export async function deliverSubmissionEmail(record: SubmissionRecord): Promise<EmailDeliverySummary> {
  const internalTemplate = renderInternalSubmissionTemplate(record);
  const customerTemplate = renderCustomerAcknowledgementTemplate(record);

  const internal = await sendSubmissionNotification({
    ...record,
    message: `${record.message}\n\n--- internal template subject: ${internalTemplate.subject}`,
  });

  const customer = {
    ok: false,
    channel: "log",
    error: "Customer acknowledgement delivery is not configured.",
    state: "abandoned",
    attempts: 0,
    dedupeKey: `submission:${record.id}:customer-ack-v1`,
  } as const;

  void customerTemplate;

  return { internal, customer };
}
