import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const artifactPath = path.join(process.cwd(), "docs", "verification", "public-route-performance.json");

function run() {
  assert.ok(fs.existsSync(artifactPath), "Performance artifact must exist at docs/verification/public-route-performance.json");

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.equal(artifact.artifactVersion, "public-route-performance-v1", "Performance artifact version must stay explicit");
  assert.ok(typeof artifact.measuredAtUtc === "string" && artifact.measuredAtUtc.length > 0, "Performance artifact must include measuredAtUtc");
  assert.ok(["playwright-local", "synthetic"].includes(artifact.measurementMode), "Performance artifact must declare measurement mode");

  const requiredRoutes = ["/", "/contact", "/services/septic-cleaning"];
  assert.ok(Array.isArray(artifact.routes), "Performance artifact must include route measurements");
  for (const route of requiredRoutes) {
    const row = artifact.routes.find((entry: { route: string }) => entry.route === route);
    assert.ok(row, `Performance artifact missing route: ${route}`);
    assert.ok(row.budget, `Route ${route} must include budget`);
    assert.ok(row.measured, `Route ${route} must include measured values`);
    assert.equal(typeof row.pass, "boolean", `Route ${route} must include pass/fail evaluation`);
    assert.equal(typeof row.checks?.lcp, "boolean", `Route ${route} must include LCP check`);
    assert.equal(typeof row.checks?.fcp, "boolean", `Route ${route} must include FCP check`);
    assert.equal(typeof row.checks?.ttfb, "boolean", `Route ${route} must include TTFB check`);
  }

  assert.equal(Array.isArray(artifact.failedRoutes), true, "Performance artifact must include failedRoutes list");
  assert.equal(artifact.failedRoutes.length, 0, "Performance budgets must pass for governed public routes");

  const docSource = fs.readFileSync(path.join(process.cwd(), "docs", "PERFORMANCE_BUDGET_PUBLIC_ROUTES.md"), "utf8");
  assert.ok(docSource.includes("public-route-performance.json"), "Performance budget doc must reference artifact path");
  assert.ok(docSource.includes("scripts/audit-public-route-performance.mjs"), "Performance budget doc must reference audit script");

  console.log("[performance-budget-public-routes] artifact + budgets verified");
}

run();
