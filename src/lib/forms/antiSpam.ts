export type AntiSpamInput = {
  honeypot?: string;
  message?: string;
  fullName?: string;
};

const spamPatterns = [/\bviagra\b/i, /\bcasino\b/i, /\bcrypto\b/i, /https?:\/\//i];
const suspiciousPatterns = [/(.)\1{7,}/i, /\bwhatsapp\b/i, /\btelegram\b/i, /\bseo\b/i];

export type AntiSpamResult = {
  allowed: boolean;
  reason?: string;
  suspicious: boolean;
  flags: string[];
};

export function evaluateSpam(input: AntiSpamInput): AntiSpamResult {
  const flags: string[] = [];

  if (input.honeypot && input.honeypot.trim().length > 0) {
    return { allowed: false, reason: "honeypot-filled", suspicious: true, flags: ["honeypot"] };
  }

  if ((input.message ?? "").length > 2000) {
    return { allowed: false, reason: "message-too-long", suspicious: true, flags: ["message-too-long"] };
  }

  if ((input.fullName ?? "").trim().length < 2) {
    return { allowed: false, reason: "name-too-short", suspicious: true, flags: ["name-too-short"] };
  }

  const combined = `${input.fullName ?? ""} ${input.message ?? ""}`;
  for (const pattern of spamPatterns) {
    if (pattern.test(combined)) {
      return { allowed: false, reason: "blocked-pattern", suspicious: true, flags: ["blocked-pattern"] };
    }
  }

  const urlCount = (combined.match(/https?:\/\//gi) || []).length;
  if (urlCount > 1) {
    flags.push("multiple-links");
  }

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(combined)) {
      flags.push("suspicious-pattern");
      break;
    }
  }

  if ((input.message ?? "").trim().length < 8) {
    flags.push("very-short-message");
  }

  return { allowed: true, suspicious: flags.length > 0, flags };
}
