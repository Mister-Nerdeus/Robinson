export type DeliveryResult = {
  ok: boolean;
  channel: "smtp" | "ethereal" | "log" | "resend";
  messageId?: string;
  previewUrl?: string;
  error?: string;
};
