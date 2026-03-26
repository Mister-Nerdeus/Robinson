export type DeliveryResult = {
  ok: boolean;
  channel: "smtp" | "ethereal" | "log";
  messageId?: string;
  previewUrl?: string;
  error?: string;
};
