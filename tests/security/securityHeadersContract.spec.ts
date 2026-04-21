import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

function read(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function run() {
  const nextConfig = read("next.config.mjs");
  const expectedHeaders = [
    "Content-Security-Policy",
    "Referrer-Policy",
    "X-Content-Type-Options",
    "X-Frame-Options",
    "Permissions-Policy",
    "Strict-Transport-Security",
  ];

  for (const header of expectedHeaders) {
    assert.ok(
      nextConfig.includes(header),
      `next.config.mjs must include ${header} header`,
    );
  }

  assert.ok(
    nextConfig.includes('source: "/:path*"'),
    "Security headers must apply across all public routes",
  );

  console.log("[security-headers-contract] CSP and core browser-security headers configured");
}

run();
