import { evaluateSpam } from "@/lib/forms/antiSpam";
import { checkRateLimit } from "@/lib/rate-limit";
import { logAbuse } from "@/lib/forms/abuseLog";

export type AbuseProtectionInput = {
  ip: string;
  userAgent: string;
  honeypot?: string;
  fullName?: string;
  message?: string;
  email?: string;
  submissionType?: string;
  challengeToken?: string;
};

export type AbuseProtectionResult = {
  allowed: boolean;
  status?: number;
  error?: string;
  abuseOutcome?:
    | "challenged"
    | "shadow-allowed"
    | "allowed-after-challenge"
    | "allowed-trusted";
  flags?: string[];
};

type ChallengeMode = "off" | "shadow" | "required";

function readChallengeMode(): ChallengeMode {
  const mode = (process.env.ABUSE_CHALLENGE_MODE || "shadow").trim().toLowerCase();
  if (mode === "off" || mode === "required") return mode;
  return "shadow";
}

function parseCsv(value: string | undefined): string[] {
  return (value || "")
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);
}

function isTrustedOverride(input: AbuseProtectionInput): boolean {
  const trustedIps = parseCsv(process.env.ABUSE_TRUSTED_IPS);
  const trustedEmails = parseCsv(process.env.ABUSE_TRUSTED_EMAILS);
  const email = (input.email || "").trim().toLowerCase();
  const ip = (input.ip || "").trim().toLowerCase();
  return trustedIps.includes(ip) || (email.length > 0 && trustedEmails.includes(email));
}

export async function enforceAbuseProtection(input: AbuseProtectionInput): Promise<AbuseProtectionResult> {
  const trustedOverride = isTrustedOverride(input);
  const challengeMode = readChallengeMode();
  const max = Number(process.env.RATE_LIMIT_MAX ?? "8");
  const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS ?? String(15 * 60 * 1000));
  const rate = await checkRateLimit(`submissions:${input.ip}`, max, windowMs);

  if (!rate.allowed && !trustedOverride) {
    await logAbuse({
      ts: new Date().toISOString(),
      reason: "rate-limit",
      outcome: "blocked",
      control: "rate-limit",
      lane: input.submissionType || "unknown",
      ip: input.ip,
      userAgent: input.userAgent,
      email: input.email,
    });

    return { allowed: false as const, status: 429, error: "Too many requests. Please retry shortly." };
  }

  const spam = evaluateSpam({
    honeypot: input.honeypot,
    fullName: input.fullName,
    message: input.message,
  });

  if (!spam.allowed && !trustedOverride) {
    await logAbuse({
      ts: new Date().toISOString(),
      reason: spam.reason,
      outcome: "blocked",
      control: "heuristic",
      lane: input.submissionType || "unknown",
      flags: spam.flags,
      ip: input.ip,
      userAgent: input.userAgent,
      email: input.email,
    });
    return { allowed: false as const, status: 400, error: "Submission blocked by abuse controls." };
  }

  const challengeToken = (input.challengeToken || "").trim();
  const challengeSatisfied = challengeToken.length >= 8;
  if (spam.suspicious && !trustedOverride) {
    const entry = {
      ts: new Date().toISOString(),
      reason: "suspicious-traffic",
      control: "challenge",
      lane: input.submissionType || "unknown",
      flags: spam.flags,
      ip: input.ip,
      userAgent: input.userAgent,
      email: input.email,
    };
    if (challengeMode === "required" && !challengeSatisfied) {
      await logAbuse({ ...entry, outcome: "challenged" });
      return {
        allowed: false as const,
        status: 403,
        error: "Additional verification required for this submission.",
        abuseOutcome: "challenged",
      };
    }
    await logAbuse({
      ...entry,
      outcome: challengeMode === "off" ? "allowed" : challengeSatisfied ? "allowed-after-challenge" : "shadow-allowed",
    });
    return {
      allowed: true as const,
      abuseOutcome: challengeSatisfied ? "allowed-after-challenge" : "shadow-allowed",
      flags: spam.flags,
    };
  }

  if (trustedOverride) {
    await logAbuse({
      ts: new Date().toISOString(),
      reason: "trusted-override",
      outcome: "allowed-trusted",
      control: "override",
      lane: input.submissionType || "unknown",
      ip: input.ip,
      userAgent: input.userAgent,
      email: input.email,
    });
    return { allowed: true as const, abuseOutcome: "allowed-trusted" };
  }

  return { allowed: true as const };
}
