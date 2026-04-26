import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

async function run() {
  process.env.RUNTIME_MODE = "production";
  process.env.NOTIFICATION_MODE = "resend";
  process.env.NOTIFICATION_SENDING_DOMAIN_POLICY = "dedicated-subdomain";
  process.env.NOTIFICATION_SENDING_ROOT_DOMAIN = "robinsonseptic.com";
  process.env.NOTIFICATION_SENDING_SUBDOMAIN = "notify";
  process.env.NOTIFICATION_PROVIDER_SENDING_DOMAIN = "";
  process.env.NOTIFICATION_DNS_VERIFIED = "true";
  process.env.NOTIFICATION_DNS_SPF_VERIFIED = "true";
  process.env.NOTIFICATION_DNS_DKIM_VERIFIED = "true";
  process.env.NOTIFICATION_DNS_DMARC_POSTURE = "monitor";

  const { notificationConfig, getSendingDomainReadiness } = await import("../src/config/notifications");

  assert.equal(notificationConfig.sendingDomain.policy, "dedicated-subdomain");
  assert.equal(notificationConfig.sendingDomain.effectiveDomain, "notify.robinsonseptic.com");

  const readiness = getSendingDomainReadiness("production");
  assert.equal(readiness.requiresVerifiedDns, true, "production provider sends must require verified DNS");
  assert.equal(readiness.ready, true, `sending domain readiness should pass: ${readiness.reasons.join(", ")}`);

  const contractDoc = fs.readFileSync(path.join(process.cwd(), "docs/email-domain-contract.md"), "utf8");
  assert.ok(contractDoc.includes("SPF"), "sending-domain contract must include SPF requirement");
  assert.ok(contractDoc.includes("DKIM"), "sending-domain contract must include DKIM requirement");
  assert.ok(contractDoc.toLowerCase().includes("recommended"), "sending-domain contract must document DMARC posture recommendation");

  console.log("[email-domain-readiness] production sending-domain policy and DNS contract verified");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
