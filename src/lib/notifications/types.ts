export type DeliveryResult = {
  ok: boolean;
  channel: "smtp" | "ethereal" | "log" | "resend";
  messageId?: string;
  previewUrl?: string;
  error?: string;
  state: "pending" | "sent" | "failed" | "retrying" | "abandoned";
  attempts?: number;
  dedupeKey?: string;
  deduped?: boolean;
};
