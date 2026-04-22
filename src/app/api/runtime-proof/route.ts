import { headers } from "next/headers";
import { NextResponse } from "next/server";
import {
  getRuntimeEnv,
  hasValidReviewAccessCookie,
  isAdminReviewEnabled,
  isRuntimeProofHostAllowed,
} from "@/lib/runtime/env";
import {
  REQUEST_LAYOUT_ROUTE_IDS,
  REQUEST_LAYOUT_CONTRACT_VERSION,
} from "@/config/requestLayoutContract";

export async function GET() {
  const env = getRuntimeEnv();
  if (env.mode === "production") {
    return NextResponse.json({ error: "not-found" }, { status: 404 });
  }

  if (!isAdminReviewEnabled()) {
    return NextResponse.json({ error: "admin-review-blocked" }, { status: 403 });
  }

  const requestHeaders = await headers();
  const host = requestHeaders.get("host") || "unknown-host";
  if (!isRuntimeProofHostAllowed(host)) {
    return NextResponse.json({ error: "not-found" }, { status: 404 });
  }
  const cookieHeader = requestHeaders.get("cookie") || undefined;
  if (!hasValidReviewAccessCookie(cookieHeader)) {
    return NextResponse.json({ error: "admin-auth-required" }, { status: 401 });
  }

  const baseProof = {
    proofVersion: "v1",
    generatedAtUtc: new Date().toISOString(),
    host,
    branchIntent: env.branchIntent,
    mode: env.mode,
    siteUrl: env.siteUrl,
    seoAllowIndexing: env.seoAllowIndexing,
    requestLayoutContractVersion: env.requestLayoutContractVersion,
    requestLayoutContractVersionExpected: REQUEST_LAYOUT_CONTRACT_VERSION,
    requestLayoutRoutes: REQUEST_LAYOUT_ROUTE_IDS,
  };

  return NextResponse.json({
    ...baseProof,
    proofLevel: "develop",
    adminReviewEnabled: isAdminReviewEnabled(),
    adminAuthCookieValid: hasValidReviewAccessCookie(cookieHeader),
    reviewSurfacesVisible: env.reviewSurfacesVisible,
    deploymentStampVisible: env.deploymentStampVisible,
    deploymentProvenance: env.deploymentProvenance,
  });
}
