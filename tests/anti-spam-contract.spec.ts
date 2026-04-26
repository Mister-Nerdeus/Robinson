import assert from "node:assert";

async function run() {
  process.env.RATE_LIMIT_MODE = "memory";
  process.env.RATE_LIMIT_MAX = "100";
  process.env.RATE_LIMIT_WINDOW_MS = "60000";
  process.env.ABUSE_CHALLENGE_MODE = "shadow";
  process.env.ABUSE_TRUSTED_IPS = "";
  process.env.ABUSE_TRUSTED_EMAILS = "";

  const { enforceAbuseProtection } = await import("../src/lib/forms/abuseProtection");

  const accepted = await enforceAbuseProtection({
    ip: "198.51.100.10",
    userAgent: "contract-agent",
    fullName: "Valid Customer",
    email: "valid@example.com",
    message: "Need septic service with access details",
    submissionType: "septic-service",
  });
  assert.equal(accepted.allowed, true, "legitimate submissions must remain submittable");

  const blockedHoneypot = await enforceAbuseProtection({
    ip: "198.51.100.11",
    userAgent: "contract-agent",
    honeypot: "https://spam.example",
    fullName: "Spam Bot",
    email: "spam@example.com",
    message: "spam message",
    submissionType: "general",
  });
  assert.equal(blockedHoneypot.allowed, false, "honeypot trap must block abusive submissions");

  process.env.ABUSE_CHALLENGE_MODE = "required";
  const challenged = await enforceAbuseProtection({
    ip: "198.51.100.12",
    userAgent: "contract-agent",
    fullName: "Call us now!!!!!",
    email: "suspicious@example.com",
    message: "Need SEO SEO SEO",
    submissionType: "general",
  });
  assert.equal(challenged.allowed, false, "suspicious traffic should be challenge-blocked when required");
  assert.equal(challenged.abuseOutcome, "challenged", "challenge outcome should be explicit");

  const challengePassed = await enforceAbuseProtection({
    ip: "198.51.100.13",
    userAgent: "contract-agent",
    fullName: "Call us now!!!!!",
    email: "suspicious@example.com",
    message: "Need SEO SEO SEO",
    submissionType: "general",
    challengeToken: "token-accepted",
  });
  assert.equal(challengePassed.allowed, true, "challenge token should allow suspicious submission path");

  process.env.ABUSE_TRUSTED_EMAILS = "owner-approved@example.com";
  const trustedOverride = await enforceAbuseProtection({
    ip: "198.51.100.14",
    userAgent: "contract-agent",
    fullName: "x",
    email: "owner-approved@example.com",
    message: "https://spam-link.example",
    submissionType: "commercial-service",
  });
  assert.equal(trustedOverride.allowed, true, "trusted overrides should preserve owner/staff workflows");
  assert.equal(trustedOverride.abuseOutcome, "allowed-trusted", "trusted override outcome must be explicit");

  console.log("[anti-spam-contract] layered abuse controls and graceful legit flow verified");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
