export type NotificationMode = "smtp" | "ethereal" | "log";

export const notificationConfig = {
  mode: (process.env.NOTIFICATION_MODE ?? "log") as NotificationMode,
  toEmail: process.env.NOTIFICATION_TO_EMAIL ?? "service@robinsonseptic.com",
  fromEmail: process.env.NOTIFICATION_FROM_EMAIL ?? "no-reply@robinsonseptic.com",
  smtp: {
    host: process.env.SMTP_HOST ?? "",
    port: Number(process.env.SMTP_PORT ?? "587"),
    user: process.env.SMTP_USER ?? "",
    pass: process.env.SMTP_PASS ?? "",
    secure: process.env.SMTP_SECURE === "true",
  },
};
