import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import {
  RUNTIME_SECURITY_CONTRACT_VERSION,
  validateRuntimeIdentityForRender,
} from "../src/lib/runtime/env";

function read(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function run() {
  const nextConfig = read("next.config.mjs");
  const runtimeContract = read("docs/runtime-security-contract.md").toLowerCase();
  const secretsPolicy = read("docs/secrets-and-env-policy.md").toLowerCase();
  const footerSource = read("src/components/site/Footer.tsx");
  const adminSource = read("src/app/admin/submissions/page.tsx");
  const dockerfile = read("Dockerfile");
  const composeFiles = [
    read("compose.yaml"),
    read("compose.test.yaml"),
    read("docker-compose.yml"),
  ].join("\n");

  const expectedHeaders = [
    "Content-Security-Policy",
    "Referrer-Policy",
    "X-Content-Type-Options",
    "X-Frame-Options",
    "Permissions-Policy",
    "Strict-Transport-Security",
  ];

  for (const header of expectedHeaders) {
    assert.ok(nextConfig.includes(header), `missing production security header: ${header}`);
  }

  assert.ok(runtimeContract.includes("enable_admin_submissions_review=false"), "runtime security contract must lock admin review in production");
  assert.ok(runtimeContract.includes("enable_local_dev_admin_bypass=false"), "runtime security contract must lock local bypass in production");
  assert.ok(secretsPolicy.includes("never hardcode secrets"), "secrets policy must block hardcoded secrets");
  assert.ok(!dockerfile.includes("ARG ADMIN_OWNER_TOKEN"), "admin tokens must not be accepted as Docker build args");
  assert.ok(!dockerfile.includes("ARG SMTP_PASS"), "SMTP password must not be accepted as Docker build args");
  assert.ok(!dockerfile.includes("ARG RESEND_API_KEY"), "Resend API key must not be accepted as Docker build args");
  assert.ok(!composeFiles.includes("ADMIN_OWNER_TOKEN:"), "compose build args must not pass admin tokens");
  assert.ok(!composeFiles.includes("SMTP_PASS:"), "compose build args must not pass SMTP password");
  assert.ok(!composeFiles.includes("RESEND_API_KEY:"), "compose build args must not pass Resend API key");
  assert.ok(footerSource.includes("publicBusinessFacts.businessName"), "footer must source business name from canonical public facts");
  assert.ok(!adminSource.includes("Runtime mode:"), "admin page copy should not expose runtime diagnostics");

  process.env.RUNTIME_MODE = "production";
  process.env.LOCAL_ONLY_MODE = "false";
  process.env.REVIEW_SURFACES_VISIBLE = "false";
  process.env.DEPLOYMENT_STAMP_VISIBLE = "false";
  process.env.ENABLE_ADMIN_SUBMISSIONS_REVIEW = "false";
  process.env.ENABLE_LOCAL_DEV_ADMIN_BYPASS = "false";
  process.env.SEO_ALLOW_INDEXING = "true";
  process.env.REQUEST_LAYOUT_CONTRACT_VERSION = "request-desktop-modes-v5";
  process.env.RUNTIME_SECURITY_CONTRACT_VERSION = RUNTIME_SECURITY_CONTRACT_VERSION;
  process.env.ADMIN_OWNER_TOKEN = "";
  process.env.ADMIN_OPS_TOKEN = "";
  process.env.REVIEW_ACCESS_KEY = "";

  assert.doesNotThrow(() => validateRuntimeIdentityForRender(), "production runtime should pass with hardened settings");

  process.env.ENABLE_LOCAL_DEV_ADMIN_BYPASS = "true";
  assert.throws(
    () => validateRuntimeIdentityForRender(),
    /ENABLE_LOCAL_DEV_ADMIN_BYPASS=false/,
    "production runtime must reject local bypass",
  );

  process.env.ENABLE_LOCAL_DEV_ADMIN_BYPASS = "false";
  process.env.ADMIN_OWNER_TOKEN = "local-owner-token-0123456789";
  assert.throws(
    () => validateRuntimeIdentityForRender(),
    /owner token is too weak or placeholder-shaped/,
    "production runtime must reject placeholder-shaped admin tokens",
  );

  console.log("[public-mode-hardening] runtime security contract and leakage guards verified");
}

run();
