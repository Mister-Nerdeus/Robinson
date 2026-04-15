import assert from "node:assert";
import {
  isAdminReviewEnabled,
  validateDeploymentProvenanceForRuntime,
} from "../src/lib/runtime/env";

function run() {
  process.env.LOCAL_ONLY_MODE = "false";
  process.env.ENABLE_ADMIN_SUBMISSIONS_REVIEW = "true";
  process.env.ALLOW_ADMIN_OUTSIDE_LOCAL_MODE = "false";
  assert.equal(isAdminReviewEnabled(), false, "admin review must be blocked outside local mode without explicit override");

  process.env.ALLOW_ADMIN_OUTSIDE_LOCAL_MODE = "true";
  assert.equal(isAdminReviewEnabled(), true, "admin review opens only with explicit override");

  process.env.DEPLOYMENT_STAMP_VISIBLE = "true";
  process.env.DEPLOY_COMMIT_SHA = "";
  process.env.DEPLOY_REF = "";
  process.env.DEPLOY_BUILD_TIME_UTC = "";

  assert.throws(
    () => validateDeploymentProvenanceForRuntime(),
    /Missing: DEPLOY_COMMIT_SHA, DEPLOY_REF, DEPLOY_BUILD_TIME_UTC/,
    "provenance validation must fail when stamp is visible and fields are missing",
  );

  process.env.DEPLOY_COMMIT_SHA = "abcdef123456";
  process.env.DEPLOY_REF = "refs/heads/main";
  process.env.DEPLOY_BUILD_TIME_UTC = "2026-04-15T12:00:00Z";

  assert.doesNotThrow(
    () => validateDeploymentProvenanceForRuntime(),
    "provenance validation should pass when all fields exist",
  );

  console.log("[runtime] mode and provenance guards pass");
}

run();
