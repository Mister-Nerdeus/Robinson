import { company } from "@/config/company";
import { REQUEST_LAYOUT_CONTRACT_VERSION } from "@/config/requestLayoutContract";

export type RuntimeMode = "local" | "demo" | "production";
export type BranchIntent = "main" | "develop" | "local";

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

function parseCookieValue(cookieHeader: string | undefined, name: string): string {
  if (!cookieHeader || !name) return "";
  const pairs = cookieHeader.split(";");
  for (const pair of pairs) {
    const [rawKey, ...rawValue] = pair.trim().split("=");
    if (rawKey === name) {
      return decodeURIComponent(rawValue.join("=") || "");
    }
  }
  return "";
}

function parseCsv(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);
}

export function getRuntimeEnv() {
  const mode = readRuntimeMode();
  const localOnlyMode = parseBool(process.env.LOCAL_ONLY_MODE, mode !== "production");
  const allowAdminOutsideLocalMode = parseBool(process.env.ALLOW_ADMIN_OUTSIDE_LOCAL_MODE, false);
  const enableAdminSubmissionsReview = parseBool(process.env.ENABLE_ADMIN_SUBMISSIONS_REVIEW, false);
  const reviewSurfacesVisible = parseBool(process.env.REVIEW_SURFACES_VISIBLE, mode !== "production");
  const reviewAccessKey = (process.env.REVIEW_ACCESS_KEY || "").trim();
  const reviewAccessCookieName = (process.env.REVIEW_ACCESS_COOKIE_NAME || "robinson_review_access").trim();
  const configuredReviewHosts = parseCsv(process.env.REVIEW_ALLOWED_HOSTS);
  const reviewAllowedHosts = configuredReviewHosts.length ? configuredReviewHosts : ["localhost", "127.0.0.1"];
  const siteUrl = normalizeUrl(process.env.SITE_URL || "http://localhost:4850");
  const deploymentStampVisible = parseBool(process.env.DEPLOYMENT_STAMP_VISIBLE, mode === "demo");
  const seoAllowIndexing = parseBool(process.env.SEO_ALLOW_INDEXING, mode === "production");

  const deploymentProvenance: DeploymentProvenance = {
    commitSha: (process.env.DEPLOY_COMMIT_SHA || "").trim(),
    ref: (process.env.DEPLOY_REF || "").trim(),
    buildTimestampUtc: (process.env.DEPLOY_BUILD_TIME_UTC || "").trim(),
  };
  const requestLayoutContractVersion =
    (process.env.REQUEST_LAYOUT_CONTRACT_VERSION || "").trim() ||
    REQUEST_LAYOUT_CONTRACT_VERSION;

  const branchIntent: BranchIntent =
    mode === "production" ? "main" : mode === "demo" ? "develop" : "local";

  return {
    mode,
    branchIntent,
    localOnlyMode,
    allowAdminOutsideLocalMode,
    enableAdminSubmissionsReview,
    reviewSurfacesVisible,
    reviewAccessKey,
    reviewAccessCookieName,
    reviewAllowedHosts,
    siteUrl,
    deploymentStampVisible,
    seoAllowIndexing,
    deploymentProvenance,
    requestLayoutContractVersion,
    companyPublicBrand: company.publicBrand,
  };
}

export function isPublicRuntime(): boolean {
  return getRuntimeEnv().mode === "production";
}

export function isReviewAccessConfigured(): boolean {
  return getRuntimeEnv().reviewAccessKey.length >= 16;
}

export function isAdminReviewEnabled(): boolean {
  const env = getRuntimeEnv();
  if (env.mode === "production") {
    return false;
  }
  if (!env.enableAdminSubmissionsReview) {
    return false;
  }
  if (!(env.localOnlyMode || env.allowAdminOutsideLocalMode)) {
    return false;
  }
  return isReviewAccessConfigured();
}

export function hasValidReviewAccessCookie(cookieHeader: string | undefined): boolean {
  const env = getRuntimeEnv();
  if (!isAdminReviewEnabled()) {
    return false;
  }

  const cookieValue = parseCookieValue(cookieHeader, env.reviewAccessCookieName);
  return cookieValue.length > 0 && cookieValue === env.reviewAccessKey;
}

export function isRuntimeProofHostAllowed(host: string | undefined): boolean {
  const env = getRuntimeEnv();
  const normalizedHost = (host || "").trim().toLowerCase().replace(/:\d+$/, "");
  if (!normalizedHost) return false;
  return env.reviewAllowedHosts.includes(normalizedHost);
}

export function hasValidReviewAccessValue(cookieValue: string | undefined): boolean {
  const env = getRuntimeEnv();
  if (!isAdminReviewEnabled()) {
    return false;
  }

  return Boolean(cookieValue && cookieValue === env.reviewAccessKey);
}

export function shouldRenderOperatorProofChrome(
  cookieHeader: string | undefined,
  cookieValueOverride?: string,
): boolean {
  const env = getRuntimeEnv();
  if (env.mode === "production" || !env.reviewSurfacesVisible) {
    return false;
  }

  if (cookieValueOverride !== undefined) {
    return hasValidReviewAccessValue(cookieValueOverride);
  }

  return hasValidReviewAccessCookie(cookieHeader);
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
    if (env.enableAdminSubmissionsReview) {
      throw new Error("Production runtime must set ENABLE_ADMIN_SUBMISSIONS_REVIEW=false.");
    }
  }

  if (env.mode !== "production" && env.enableAdminSubmissionsReview && !isReviewAccessConfigured()) {
    throw new Error(
      "Non-production admin review requires REVIEW_ACCESS_KEY with at least 16 characters.",
    );
  }

  if (env.mode === "production" && !env.seoAllowIndexing) {
    throw new Error("Production runtime must set SEO_ALLOW_INDEXING=true.");
  }

  if (env.mode !== "production" && env.seoAllowIndexing) {
    throw new Error("Non-production runtime must set SEO_ALLOW_INDEXING=false.");
  }

  validateDeploymentProvenanceForRuntime();

  if (env.requestLayoutContractVersion !== REQUEST_LAYOUT_CONTRACT_VERSION) {
    throw new Error(
      `REQUEST_LAYOUT_CONTRACT_VERSION mismatch. Expected ${REQUEST_LAYOUT_CONTRACT_VERSION}, received ${env.requestLayoutContractVersion}.`,
    );
  }
}

export function canonicalUrl(path = "/"): string {
  const env = getRuntimeEnv();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${env.siteUrl}${normalizedPath}`;
}
