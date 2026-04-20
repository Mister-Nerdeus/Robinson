import { evaluateSpam } from "@/lib/forms/antiSpam";
import { checkRateLimit } from "@/lib/rate-limit/memory";
import { logAbuse } from "@/lib/forms/abuseLog";

export type AbuseProtectionInput = {
  ip: string;
  userAgent: string;
  honeypot?: string;
  fullName?: string;
  message?: string;
};

export async function enforceAbuseProtection(input: AbuseProtectionInput) {
  const max = Number(process.env.RATE_LIMIT_MAX ?? "8");
  const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS ?? String(15 * 60 * 1000));
  const rate = checkRateLimit(`submissions:${input.ip}`, max, windowMs);

  if (!rate.allowed) {
    await logAbuse({
      ts: new Date().toISOString(),
      reason: "rate-limit",
      ip: input.ip,
      userAgent: input.userAgent,
    });

    return { allowed: false as const, status: 429, error: "Too many requests. Please retry shortly." };
  }

  const spam = evaluateSpam({
    honeypot: input.honeypot,
    fullName: input.fullName,
    message: input.message,
  });

  if (!spam.allowed) {
    await logAbuse({
      ts: new Date().toISOString(),
      reason: spam.reason,
      ip: input.ip,
      userAgent: input.userAgent,
    });
    return { allowed: false as const, status: 400, error: "Submission blocked by abuse controls." };
  }

  return { allowed: true as const };
}
