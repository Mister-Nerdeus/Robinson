import assert from "node:assert";
import {
  isAdminReviewEnabled,
  shouldRenderDeploymentStamp,
  validateDeploymentProvenanceForRuntime,
  validateRuntimeIdentityForRender,
} from "../src/lib/runtime/env";

function run() {
  process.env.RUNTIME_MODE = "demo";
  process.env.LOCAL_ONLY_MODE = "false";
  process.env.ENABLE_ADMIN_SUBMISSIONS_REVIEW = "true";
  process.env.ALLOW_ADMIN_OUTSIDE_LOCAL_MODE = "false";
  process.env.REVIEW_SURFACES_VISIBLE = "true";
  assert.equal(isAdminReviewEnabled(), false, "admin review must be blocked outside local mode without explicit override");

  process.env.ALLOW_ADMIN_OUTSIDE_LOCAL_MODE = "true";
  assert.equal(isAdminReviewEnabled(), true, "admin review opens only with explicit override");

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
    "demo runtime identity should pass when review visibility and provenance are complete",
  );

  process.env.RUNTIME_MODE = "production";
  process.env.REVIEW_SURFACES_VISIBLE = "false";
  process.env.DEPLOYMENT_STAMP_VISIBLE = "false";
  process.env.SEO_ALLOW_INDEXING = "true";

  assert.equal(shouldRenderDeploymentStamp(), false, "production must not render deployment stamp");

  assert.doesNotThrow(
    () => validateRuntimeIdentityForRender(),
    "production runtime identity should pass with public-safe settings",
  );

  process.env.REVIEW_SURFACES_VISIBLE = "true";
  assert.throws(
    () => validateRuntimeIdentityForRender(),
    /REVIEW_SURFACES_VISIBLE=false/,
    "production must reject review-surface visibility",
  );

  console.log("[runtime] mode and provenance guards pass");
}

run();