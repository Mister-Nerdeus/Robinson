export type AntiSpamInput = {
  honeypot?: string;
  message?: string;
  fullName?: string;
};

const spamPatterns = [/\bviagra\b/i, /\bcasino\b/i, /\bcrypto\b/i, /https?:\/\//i];

export function evaluateSpam(input: AntiSpamInput) {
  if (input.honeypot && input.honeypot.trim().length > 0) {
    return { allowed: false, reason: "honeypot-filled" };
  }

  if ((input.message ?? "").length > 2000) {
    return { allowed: false, reason: "message-too-long" };
  }

  if ((input.fullName ?? "").trim().length < 2) {
    return { allowed: false, reason: "name-too-short" };
  }

  const combined = `${input.fullName ?? ""} ${input.message ?? ""}`;
  for (const pattern of spamPatterns) {
    if (pattern.test(combined)) {
      return { allowed: false, reason: "blocked-pattern" };
    }
  }

  return { allowed: true };
}
