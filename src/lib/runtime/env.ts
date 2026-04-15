import { company } from "@/config/company";

export type RuntimeMode = "local" | "demo" | "production";

export type DeploymentProvenance = {
  commitSha: string;
  ref: string;
  buildTimestampUtc: string;
};

function parseBool(value: string | undefined, fallback = false): boolean {
  if (value === undefined) return fallback;
  const normalized = value.trim().toLowerCase();
  return normalized === "1" || normalized === "true" || normalized === "yes" || normalized === "on";
}

function readRuntimeMode(): RuntimeMode {
  const mode = process.env.RUNTIME_MODE?.trim().toLowerCase();
  if (mode === "production" || mode === "demo" || mode === "local") {
    return mode;
  }
  if (parseBool(process.env.LOCAL_ONLY_MODE, true)) {
    return "local";
  }
  return "production";
}

function normalizeUrl(value: string): string {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export function getRuntimeEnv() {
  const mode = readRuntimeMode();
  const localOnlyMode = parseBool(process.env.LOCAL_ONLY_MODE, mode !== "production");
  const allowAdminOutsideLocalMode = parseBool(process.env.ALLOW_ADMIN_OUTSIDE_LOCAL_MODE, false);
  const enableAdminSubmissionsReview = parseBool(process.env.ENABLE_ADMIN_SUBMISSIONS_REVIEW, false);
  const reviewSurfacesVisible = parseBool(process.env.REVIEW_SURFACES_VISIBLE, mode !== "production");
  const siteUrl = normalizeUrl(process.env.SITE_URL || "http://localhost:4850");
  const deploymentStampVisible = parseBool(process.env.DEPLOYMENT_STAMP_VISIBLE, mode === "demo");
  const seoAllowIndexing = parseBool(process.env.SEO_ALLOW_INDEXING, mode === "production");

  const deploymentProvenance: DeploymentProvenance = {
    commitSha: (process.env.DEPLOY_COMMIT_SHA || "").trim(),
    ref: (process.env.DEPLOY_REF || "").trim(),
    buildTimestampUtc: (process.env.DEPLOY_BUILD_TIME_UTC || "").trim(),
  };

  return {
    mode,
    localOnlyMode,
    allowAdminOutsideLocalMode,
    enableAdminSubmissionsReview,
    reviewSurfacesVisible,
    siteUrl,
    deploymentStampVisible,
    seoAllowIndexing,
    deploymentProvenance,
    companyPublicBrand: company.publicBrand,
  };
}

export function isPublicRuntime(): boolean {
  return getRuntimeEnv().mode === "production";
}

export function isAdminReviewEnabled(): boolean {
  const env = getRuntimeEnv();
  if (!env.enableAdminSubmissionsReview) {
    return false;
  }
  return env.localOnlyMode || env.allowAdminOutsideLocalMode;
}

export function shouldRenderDeploymentStamp(): boolean {
  const env = getRuntimeEnv();
  if (env.mode === "production") {
    return false;
  }
  return env.reviewSurfacesVisible && env.deploymentStampVisible;
}

export function validateDeploymentProvenanceForRuntime() {
  if (!shouldRenderDeploymentStamp()) {
    return;
  }

  const env = getRuntimeEnv();
  const missing: string[] = [];
  if (!env.deploymentProvenance.commitSha) missing.push("DEPLOY_COMMIT_SHA");
  if (!env.deploymentProvenance.ref) missing.push("DEPLOY_REF");
  if (!env.deploymentProvenance.buildTimestampUtc) missing.push("DEPLOY_BUILD_TIME_UTC");

  if (missing.length > 0) {
    throw new Error(
      `Deployment provenance is required when deployment stamp is visible. Missing: ${missing.join(", ")}`,
    );
  }
}

export function validateRuntimeIdentityForRender() {
  const env = getRuntimeEnv();

  if (env.mode === "production") {
    if (env.reviewSurfacesVisible) {
      throw new Error("Production runtime must set REVIEW_SURFACES_VISIBLE=false.");
    }
    if (env.deploymentStampVisible) {
      throw new Error("Production runtime must set DEPLOYMENT_STAMP_VISIBLE=false.");
    }
  }

  if (env.mode === "production" && !env.seoAllowIndexing) {
    throw new Error("Production runtime must set SEO_ALLOW_INDEXING=true.");
  }

  if (env.mode !== "production" && env.seoAllowIndexing) {
    throw new Error("Non-production runtime must set SEO_ALLOW_INDEXING=false.");
  }

  validateDeploymentProvenanceForRuntime();
}

export function canonicalUrl(path = "/"): string {
  const env = getRuntimeEnv();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${env.siteUrl}${normalizedPath}`;
}