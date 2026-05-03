import { company } from "@/config/company";
import { REQUEST_LAYOUT_CONTRACT_VERSION } from "@/config/requestLayoutContract";
import {
  getAdminSessionCookieName,
  hasConfiguredAdminTokens,
  resolveAdminIdentity,
} from "@/lib/auth";

export type RuntimeMode = "local" | "demo" | "production";
export type BranchIntent = "main" | "develop" | "local";
export const RUNTIME_SECURITY_CONTRACT_VERSION = "runtime-security-2026-04-v1";

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

function hasPlaceholderSecret(value: string): boolean {
  const normalized = value.trim().toLowerCase();
  if (!normalized) return false;
  return (
    normalized.includes("replace-with") ||
    normalized.includes("example") ||
    normalized.startsWith("local-") ||
    normalized.startsWith("test-")
  );
}

function hasNonProductionPlaceholderSecret(value: string): boolean {
  const normalized = value.trim().toLowerCase();
  if (!normalized) return false;
  return (
    normalized.includes("replace-with") ||
    normalized.includes("example") ||
    normalized.startsWith("local-")
  );
}

function isStrongNonProductionAdminToken(value: string): boolean {
  const normalized = value.trim();
  return normalized.length >= 24 && !hasNonProductionPlaceholderSecret(normalized);
}

export function getRuntimeEnv() {
  const mode = readRuntimeMode();
  const localOnlyMode = parseBool(process.env.LOCAL_ONLY_MODE, mode !== "production");
  const allowAdminOutsideLocalMode = parseBool(process.env.ALLOW_ADMIN_OUTSIDE_LOCAL_MODE, false);
  const enableAdminSubmissionsReview = parseBool(process.env.ENABLE_ADMIN_SUBMISSIONS_REVIEW, false);
  const reviewSurfacesVisible = parseBool(process.env.REVIEW_SURFACES_VISIBLE, mode !== "production");
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
  const runtimeSecurityContractVersion =
    (process.env.RUNTIME_SECURITY_CONTRACT_VERSION || "").trim() ||
    RUNTIME_SECURITY_CONTRACT_VERSION;

  const branchIntent: BranchIntent =
    mode === "production" ? "main" : mode === "demo" ? "develop" : "local";

  return {
    mode,
    branchIntent,
    localOnlyMode,
    allowAdminOutsideLocalMode,
    enableAdminSubmissionsReview,
    reviewSurfacesVisible,
    reviewAccessCookieName,
    reviewAllowedHosts,
    siteUrl,
    deploymentStampVisible,
    seoAllowIndexing,
    deploymentProvenance,
    requestLayoutContractVersion,
    runtimeSecurityContractVersion,
    companyPublicBrand: company.publicBrand,
  };
}

export function isPublicRuntime(): boolean {
  return getRuntimeEnv().mode === "production";
}

export function isReviewAccessConfigured(): boolean {
  return hasConfiguredAdminTokens();
}

export function isAdminReviewEnabled(): boolean {
  const env = getRuntimeEnv();
  if (!env.enableAdminSubmissionsReview) {
    return false;
  }
  if (!hasConfiguredAdminTokens()) {
    return false;
  }
  if (env.mode === "production" && env.localOnlyMode) {
    return false;
  }
  return true;
}

export function hasValidReviewAccessCookie(cookieHeader: string | undefined): boolean {
  if (!cookieHeader || !isAdminReviewEnabled()) {
    return false;
  }
  const request = new Request("http://localhost", { headers: { cookie: cookieHeader } });
  const identity = resolveAdminIdentity(request);
  return identity.authenticated;
}

export function isRuntimeProofHostAllowed(host: string | undefined): boolean {
  const env = getRuntimeEnv();
  const normalizedHost = (host || "").trim().toLowerCase().replace(/:\d+$/, "");
  if (!normalizedHost) return false;
  return env.reviewAllowedHosts.includes(normalizedHost);
}

export function hasValidReviewAccessValue(cookieValue: string | undefined): boolean {
  if (!cookieValue || !isAdminReviewEnabled()) {
    return false;
  }
  const cookieName = getAdminSessionCookieName();
  const cookieHeader = `${cookieName}=${encodeURIComponent(cookieValue)}`;
  return hasValidReviewAccessCookie(cookieHeader);
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
  const ownerToken = (process.env.ADMIN_OWNER_TOKEN || "").trim();
  const opsToken = (process.env.ADMIN_OPS_TOKEN || "").trim();
  const reviewAccessKey = (process.env.REVIEW_ACCESS_KEY || "").trim();
  const localBypassEnabled = parseBool(process.env.ENABLE_LOCAL_DEV_ADMIN_BYPASS, false);
  const configuredNonProductionAdminTokens = [
    { label: "owner", value: ownerToken },
    { label: "ops", value: opsToken },
  ].filter((entry) => entry.value.trim().length > 0);

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
    if (localBypassEnabled) {
      throw new Error("Production runtime must set ENABLE_LOCAL_DEV_ADMIN_BYPASS=false.");
    }
    if (reviewAccessKey) {
      throw new Error("Production runtime must leave REVIEW_ACCESS_KEY unset.");
    }
    if (ownerToken && (ownerToken.length < 24 || hasPlaceholderSecret(ownerToken))) {
      throw new Error("Production runtime owner token is too weak or placeholder-shaped.");
    }
    if (opsToken && (opsToken.length < 24 || hasPlaceholderSecret(opsToken))) {
      throw new Error("Production runtime ops token is too weak or placeholder-shaped.");
    }
  }

  if (env.mode !== "production" && env.enableAdminSubmissionsReview) {
    const weakTokens = configuredNonProductionAdminTokens.filter(
      (entry) => !isStrongNonProductionAdminToken(entry.value),
    );
    if (weakTokens.length > 0) {
      throw new Error(
        `Admin review ${weakTokens.map((entry) => entry.label).join("/")} token is too weak or placeholder-shaped.`,
      );
    }

    if (!isReviewAccessConfigured()) {
      throw new Error("Admin review requires configured owner/ops auth tokens.");
    }
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

  if (env.runtimeSecurityContractVersion !== RUNTIME_SECURITY_CONTRACT_VERSION) {
    throw new Error(
      `RUNTIME_SECURITY_CONTRACT_VERSION mismatch. Expected ${RUNTIME_SECURITY_CONTRACT_VERSION}, received ${env.runtimeSecurityContractVersion}.`,
    );
  }
}

export function canonicalUrl(path = "/"): string {
  const env = getRuntimeEnv();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${env.siteUrl}${normalizedPath}`;
}
