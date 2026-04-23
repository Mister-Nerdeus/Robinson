import type { NextRequest } from "next/server";

type AdminRole = "owner" | "ops";

export type AdminIdentity = {
  authenticated: boolean;
  role: AdminRole | null;
  principal: string | null;
  tokenSource: "bearer" | "cookie" | "local-dev-bypass" | null;
};

function parseBool(value: string | undefined, fallback = false): boolean {
  if (value === undefined) {
    return fallback;
  }

  const normalized = value.trim().toLowerCase();
  return normalized === "1" || normalized === "true" || normalized === "yes" || normalized === "on";
}

function localRuntimeEnabled(): boolean {
  const mode = (process.env.RUNTIME_MODE || "").trim().toLowerCase();
  if (mode === "local") {
    return true;
  }

  return parseBool(process.env.LOCAL_ONLY_MODE, true);
}

export function getAdminSessionCookieName(): string {
  return (process.env.ADMIN_SESSION_COOKIE_NAME || "robinson_admin_session").trim();
}

export function getAdminAuthConfig() {
  const ownerToken = (process.env.ADMIN_OWNER_TOKEN || "").trim();
  const opsToken = (process.env.ADMIN_OPS_TOKEN || "").trim();
  const allowLocalDevBypass = parseBool(process.env.ENABLE_LOCAL_DEV_ADMIN_BYPASS, false);

  return {
    ownerToken,
    opsToken,
    allowLocalDevBypass,
    cookieName: getAdminSessionCookieName(),
  };
}

function roleFromToken(token: string): AdminRole | null {
  const { ownerToken, opsToken } = getAdminAuthConfig();
  if (token && token === ownerToken) {
    return "owner";
  }
  if (token && token === opsToken) {
    return "ops";
  }
  return null;
}

function readBearerToken(authHeader: string | null): string {
  if (!authHeader) {
    return "";
  }
  const value = authHeader.trim();
  if (!value.toLowerCase().startsWith("bearer ")) {
    return "";
  }
  return value.slice(7).trim();
}

function readCookieValue(cookieHeader: string | null, cookieName: string): string {
  if (!cookieHeader || !cookieName) {
    return "";
  }

  const pairs = cookieHeader.split(";");
  for (const pair of pairs) {
    const [rawName, ...rawValue] = pair.trim().split("=");
    if (rawName === cookieName) {
      return decodeURIComponent(rawValue.join("=") || "");
    }
  }

  return "";
}

export function resolveAdminIdentity(request: Request): AdminIdentity {
  const config = getAdminAuthConfig();

  const bearerToken = readBearerToken(request.headers.get("authorization"));
  const bearerRole = roleFromToken(bearerToken);
  if (bearerRole) {
    return {
      authenticated: true,
      role: bearerRole,
      principal: `${bearerRole}:token`,
      tokenSource: "bearer",
    };
  }

  const cookieToken = readCookieValue(request.headers.get("cookie"), config.cookieName);
  const cookieRole = roleFromToken(cookieToken);
  if (cookieRole) {
    return {
      authenticated: true,
      role: cookieRole,
      principal: `${cookieRole}:cookie`,
      tokenSource: "cookie",
    };
  }

  if (config.allowLocalDevBypass && localRuntimeEnabled()) {
    return {
      authenticated: true,
      role: "owner",
      principal: "owner:local-dev-bypass",
      tokenSource: "local-dev-bypass",
    };
  }

  return {
    authenticated: false,
    role: null,
    principal: null,
    tokenSource: null,
  };
}

export function resolveAdminIdentityFromNextRequest(request: NextRequest): AdminIdentity {
  const config = getAdminAuthConfig();

  const bearerToken = readBearerToken(request.headers.get("authorization"));
  const bearerRole = roleFromToken(bearerToken);
  if (bearerRole) {
    return {
      authenticated: true,
      role: bearerRole,
      principal: `${bearerRole}:token`,
      tokenSource: "bearer",
    };
  }

  const cookieValue = request.cookies.get(config.cookieName)?.value || "";
  const cookieRole = roleFromToken(cookieValue);
  if (cookieRole) {
    return {
      authenticated: true,
      role: cookieRole,
      principal: `${cookieRole}:cookie`,
      tokenSource: "cookie",
    };
  }

  if (config.allowLocalDevBypass && localRuntimeEnabled()) {
    return {
      authenticated: true,
      role: "owner",
      principal: "owner:local-dev-bypass",
      tokenSource: "local-dev-bypass",
    };
  }

  return {
    authenticated: false,
    role: null,
    principal: null,
    tokenSource: null,
  };
}

export function roleFromAccessToken(accessToken: string): AdminRole | null {
  return roleFromToken(accessToken);
}

export function hasConfiguredAdminTokens(): boolean {
  const { ownerToken, opsToken } = getAdminAuthConfig();
  return ownerToken.length >= 16 || opsToken.length >= 16;
}
