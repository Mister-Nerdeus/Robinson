import { NextRequest, NextResponse } from "next/server";
import {
  getAdminAuthConfig,
  getAdminSessionCookieName,
  roleFromAccessToken,
  resolveAdminIdentityFromNextRequest,
} from "@/lib/auth";

function parseBool(value: string | undefined, fallback = false): boolean {
  if (value === undefined) {
    return fallback;
  }
  const normalized = value.trim().toLowerCase();
  return normalized === "1" || normalized === "true" || normalized === "yes" || normalized === "on";
}

function isAdminPolicyEnabled(): boolean {
  return parseBool(process.env.ENABLE_ADMIN_SUBMISSIONS_REVIEW, false);
}

function unauthorized(message: string, status = 401) {
  return new NextResponse(message, {
    status,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

export function middleware(request: NextRequest) {
  const canonicalHost = (process.env.CANONICAL_HOST || "").trim().toLowerCase();
  if (canonicalHost) {
    const host = request.nextUrl.host.toLowerCase();
    if (host !== canonicalHost) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.host = canonicalHost;
      redirectUrl.protocol = "https";
      return NextResponse.redirect(redirectUrl, 308);
    }
  }

  const { pathname, searchParams } = request.nextUrl;
  const isAdminPage = pathname.startsWith("/admin/submissions");
  const isAdminApi = (pathname === "/api/submissions" || pathname === "/api/forms") && request.method === "GET";
  const isRuntimeProofApi = pathname === "/api/runtime-proof" && request.method === "GET";

  if (!isAdminPage && !isAdminApi && !isRuntimeProofApi) {
    return NextResponse.next();
  }

  if (!isAdminPolicyEnabled()) {
    return unauthorized("Admin review disabled by runtime policy.", 403);
  }

  const identity = resolveAdminIdentityFromNextRequest(request);
  if (identity.authenticated) {
    return NextResponse.next();
  }

  const accessParam = searchParams.get("admin_access")?.trim() || "";
  const paramRole = roleFromAccessToken(accessParam);

  if (isAdminPage && paramRole) {
    const cleanUrl = request.nextUrl.clone();
    cleanUrl.searchParams.delete("admin_access");

    const response = NextResponse.redirect(cleanUrl);
    response.cookies.set(getAdminSessionCookieName(), accessParam, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });
    return response;
  }

  const config = getAdminAuthConfig();
  if (!config.ownerToken && !config.opsToken) {
    return NextResponse.json({ error: "admin-auth-not-configured" }, { status: 503 });
  }

  if (isAdminApi || isRuntimeProofApi) {
    return NextResponse.json({ error: "admin-auth-required" }, { status: 401 });
  }

  return unauthorized("Admin access requires authenticated owner/ops identity.", 401);
}

export const config = {
  matcher: ["/admin/submissions/:path*", "/api/submissions", "/api/forms", "/api/runtime-proof"],
};
