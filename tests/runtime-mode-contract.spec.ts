import assert from "node:assert";
import {
  hasValidReviewAccessCookie,
  isAdminReviewEnabled,
  shouldRenderOperatorProofChrome,
  shouldRenderDeploymentStamp,
  validateDeploymentProvenanceForRuntime,
  validateRuntimeIdentityForRender,
} from "../src/lib/runtime/env";

function run() {
  process.env.RUNTIME_MODE = "demo";
  process.env.LOCAL_ONLY_MODE = "false";
  process.env.ENABLE_ADMIN_SUBMISSIONS_REVIEW = "true";
  process.env.ALLOW_ADMIN_OUTSIDE_LOCAL_MODE = "true";
  process.env.REVIEW_SURFACES_VISIBLE = "true";
  process.env.ADMIN_SESSION_COOKIE_NAME = "robinson_admin_session";
  process.env.ADMIN_OWNER_TOKEN = "";
  process.env.ADMIN_OPS_TOKEN = "";

  assert.equal(
    isAdminReviewEnabled(),
    false,
    "admin review must remain blocked without owner/ops tokens",
  );

  process.env.ADMIN_OWNER_TOKEN = "replace-with-long-random-owner-token";
  assert.equal(
    isAdminReviewEnabled(),
    false,
    "admin review must remain blocked with placeholder-shaped owner/ops tokens",
  );
  assert.throws(
    () => validateRuntimeIdentityForRender(),
    /owner token is too weak or placeholder-shaped/,
    "demo runtime must reject placeholder-shaped admin tokens when review is enabled",
  );

  process.env.ADMIN_OWNER_TOKEN = "demo-owner-access-token-012345";
  assert.equal(isAdminReviewEnabled(), true, "admin review opens only with policy + auth token");
  assert.equal(
    hasValidReviewAccessCookie("robinson_admin_session=demo-owner-access-token-012345"),
    true,
    "session cookie must validate when correct",
  );
  assert.equal(
    hasValidReviewAccessCookie("robinson_admin_session=wrong"),
    false,
    "session cookie must fail when wrong",
  );
  assert.equal(
    shouldRenderOperatorProofChrome(undefined, ""),
    false,
    "demo proof chrome stays hidden without explicit operator cookie",
  );
  assert.equal(
    shouldRenderOperatorProofChrome(undefined, "demo-owner-access-token-012345"),
    true,
    "demo proof chrome appears only with explicit operator cookie",
  );

  process.env.DEPLOYMENT_STAMP_VISIBLE = "true";
  process.env.DEPLOY_COMMIT_SHA = "";
  process.env.DEPLOY_REF = "";
  process.env.DEPLOY_BUILD_TIME_UTC = "";

  assert.equal(shouldRenderDeploymentStamp(), true, "demo review surface should render provenance stamp when enabled");

  assert.throws(
    () => validateDeploymentProvenanceForRuntime(),
    /Missing: DEPLOY_COMMIT_SHA, DEPLOY_REF, DEPLOY_BUILD_TIME_UTC/,
    "provenance validation must fail when stamp is visible and fields are missing",
  );

  process.env.DEPLOY_COMMIT_SHA = "abcdef123456";
  process.env.DEPLOY_REF = "refs/heads/develop";
  process.env.DEPLOY_BUILD_TIME_UTC = "2026-04-15T12:00:00Z";
  process.env.SEO_ALLOW_INDEXING = "false";

  assert.doesNotThrow(
    () => validateRuntimeIdentityForRender(),
    "demo runtime identity should pass when review visibility, access control, and provenance are complete",
  );

  process.env.RUNTIME_MODE = "production";
  process.env.REVIEW_SURFACES_VISIBLE = "false";
  process.env.DEPLOYMENT_STAMP_VISIBLE = "false";
  process.env.ENABLE_ADMIN_SUBMISSIONS_REVIEW = "false";
  process.env.SEO_ALLOW_INDEXING = "true";

  assert.equal(shouldRenderDeploymentStamp(), false, "production must not render deployment stamp");

  assert.doesNotThrow(
    () => validateRuntimeIdentityForRender(),
    "production runtime identity should pass with public-safe settings",
  );

  process.env.ENABLE_ADMIN_SUBMISSIONS_REVIEW = "true";
  assert.throws(
    () => validateRuntimeIdentityForRender(),
    /ENABLE_ADMIN_SUBMISSIONS_REVIEW=false/,
    "production must reject admin review surface enablement",
  );

  console.log("[runtime] mode, access-control, and provenance guards pass");
}

run();
