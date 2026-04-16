import { NextRequest, NextResponse } from "next/server";

function parseBool(value: string | undefined, fallback = false): boolean {
  if (value === undefined) return fallback;
  const normalized = value.trim().toLowerCase();
  return normalized === "1" || normalized === "true" || normalized === "yes" || normalized === "on";
}

function readMode(): "local" | "demo" | "production" {
  const mode = process.env.RUNTIME_MODE?.trim().toLowerCase();
  if (mode === "production" || mode === "demo" || mode === "local") {
    return mode;
  }
  if (parseBool(process.env.LOCAL_ONLY_MODE, true)) {
    return "local";
  }
  return "production";
}

function isAdminPolicyEnabled(): boolean {
  const mode = readMode();
  if (mode === "production") {
    return false;
  }

  const enabled = parseBool(process.env.ENABLE_ADMIN_SUBMISSIONS_REVIEW, false);
  if (!enabled) {
    return false;
  }

  const localOnly = parseBool(process.env.LOCAL_ONLY_MODE, true);
  const allowOutside = parseBool(process.env.ALLOW_ADMIN_OUTSIDE_LOCAL_MODE, false);
  if (!(localOnly || allowOutside)) {
    return false;
  }

  const key = (process.env.REVIEW_ACCESS_KEY || "").trim();
  return key.length >= 16;
}

function getAccessConfig() {
  return {
    key: (process.env.REVIEW_ACCESS_KEY || "").trim(),
    cookieName: (process.env.REVIEW_ACCESS_COOKIE_NAME || "robinson_review_access").trim(),
  };
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
  const { pathname, searchParams } = request.nextUrl;
  const isAdminPage = pathname.startsWith("/admin/submissions");
  const isAdminApiRead = pathname === "/api/submissions" && request.method === "GET";

  if (!isAdminPage && !isAdminApiRead) {
    return NextResponse.next();
  }

  if (readMode() === "production") {
    return unauthorized("Not found", 404);
  }

  if (!isAdminPolicyEnabled()) {
    return unauthorized("Admin review disabled by runtime policy.", 403);
  }

  const { key, cookieName } = getAccessConfig();
  const cookieValue = request.cookies.get(cookieName)?.value ?? "";

  if (cookieValue === key) {
    return NextResponse.next();
  }

  const accessParam = searchParams.get("review_access")?.trim() || "";
  if (isAdminPage && accessParam && accessParam === key) {
    const cleanUrl = request.nextUrl.clone();
    cleanUrl.searchParams.delete("review_access");

    const response = NextResponse.redirect(cleanUrl);
    response.cookies.set(cookieName, key, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });
    return response;
  }

  if (isAdminApiRead) {
    return NextResponse.json({ error: "admin-auth-required" }, { status: 401 });
  }

  return unauthorized("Admin access requires explicit review authorization.", 401);
}

export const config = {
  matcher: ["/admin/submissions/:path*", "/api/submissions"],
};