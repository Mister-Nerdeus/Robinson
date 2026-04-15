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
  const siteUrl = normalizeUrl(process.env.SITE_URL || "http://localhost:4850");
  const deploymentStampVisible = parseBool(
    process.env.DEPLOYMENT_STAMP_VISIBLE,
    mode === "local" || mode === "demo",
  );
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
    siteUrl,
    deploymentStampVisible,
    seoAllowIndexing,
    deploymentProvenance,
    companyPublicBrand: company.publicBrand,
  };
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
  return env.deploymentStampVisible;
}

export function validateDeploymentProvenanceForRuntime() {
  const env = getRuntimeEnv();
  if (!env.deploymentStampVisible) {
    return;
  }

  const missing: string[] = [];
  if (!env.deploymentProvenance.commitSha) missing.push("DEPLOY_COMMIT_SHA");
  if (!env.deploymentProvenance.ref) missing.push("DEPLOY_REF");
  if (!env.deploymentProvenance.buildTimestampUtc) missing.push("DEPLOY_BUILD_TIME_UTC");

  if (missing.length > 0) {
    throw new Error(
      `Deployment provenance is required when DEPLOYMENT_STAMP_VISIBLE=true. Missing: ${missing.join(", ")}`,
    );
  }
}

export function canonicalUrl(path = "/"): string {
  const env = getRuntimeEnv();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${env.siteUrl}${normalizedPath}`;
}
