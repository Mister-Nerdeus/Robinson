import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getRuntimeEnv, hasValidReviewAccessCookie, isAdminReviewEnabled } from "@/lib/runtime/env";
import {
  REQUEST_LAYOUT_ROUTE_IDS,
  REQUEST_LAYOUT_CONTRACT_VERSION,
} from "@/config/requestLayoutContract";

export async function GET() {
  const env = getRuntimeEnv();
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") || "unknown-host";
  const cookieHeader = requestHeaders.get("cookie") || undefined;

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

  if (env.mode === "production") {
    return NextResponse.json({
      ...baseProof,
      proofLevel: "public",
      adminReviewEnabled: false,
      deploymentStampVisible: false,
    });
  }

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
