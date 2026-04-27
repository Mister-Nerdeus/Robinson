import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const outputPath = path.join(process.cwd(), "docs", "verification", "public-route-performance.json");
const baseUrlArg = process.argv.find((arg) => arg.startsWith("--baseUrl="));
const baseUrl = (baseUrlArg ? baseUrlArg.split("=")[1] : process.env.BASE_URL || "http://127.0.0.1:4850").replace(/\/$/, "");
const useSynthetic = process.argv.includes("--synthetic");
const forceSyntheticFailure = process.argv.includes("--synthetic-fail");

const budgetsByRoute = {
  "/": { lcpMs: 3200, fcpMs: 3200, ttfbMs: 1000 },
  "/contact": { lcpMs: 2500, fcpMs: 1700, ttfbMs: 900 },
  "/services/septic-cleaning": { lcpMs: 2800, fcpMs: 1800, ttfbMs: 1000 },
};

const routes = Object.keys(budgetsByRoute);

async function waitForServer(timeoutMs = 45000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(baseUrl);
      if (res.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 800));
  }
  throw new Error(`Performance audit could not reach ${baseUrl}`);
}

async function measureRoutes() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 3,
  });
  await context.addInitScript(() => {
    window.__robinsonPerf = { lcpMs: 0 };
    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const last = entries[entries.length - 1];
      if (last) {
        window.__robinsonPerf.lcpMs = last.startTime;
      }
    });
    observer.observe({ type: "largest-contentful-paint", buffered: true });
  });

  const page = await context.newPage();
  const results = [];

  for (const route of routes) {
    await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);

    const metrics = await page.evaluate(() => {
      const nav = performance.getEntriesByType("navigation")[0];
      const fcp = performance.getEntriesByName("first-contentful-paint")[0];
      const lcpFromObserver = window.__robinsonPerf?.lcpMs ?? 0;
      const fcpMs = fcp ? fcp.startTime : 0;
      const lcpMs = lcpFromObserver > 0 ? lcpFromObserver : fcpMs;
      const ttfbMs = nav ? nav.responseStart : 0;
      return {
        lcpMs: Number(lcpMs.toFixed(2)),
        fcpMs: Number(fcpMs.toFixed(2)),
        ttfbMs: Number(ttfbMs.toFixed(2)),
        lcpFallbackToFcp: lcpFromObserver <= 0,
      };
    });

    results.push({ route, ...metrics });
  }

  await context.close();
  await browser.close();
  return results;
}

function syntheticResults() {
  const passRows = [
    { route: "/", lcpMs: 1710, fcpMs: 1110, ttfbMs: 520, lcpFallbackToFcp: false },
    { route: "/contact", lcpMs: 1620, fcpMs: 1020, ttfbMs: 510, lcpFallbackToFcp: false },
    { route: "/services/septic-cleaning", lcpMs: 1900, fcpMs: 1210, ttfbMs: 560, lcpFallbackToFcp: false },
  ];
  if (!forceSyntheticFailure) {
    return passRows;
  }
  return passRows.map((row) =>
    row.route === "/contact" ? { ...row, lcpMs: budgetsByRoute["/contact"].lcpMs + 250 } : row,
  );
}

function buildArtifact(measuredRoutes) {
  const evaluatedRoutes = measuredRoutes.map((row) => {
    const budget = budgetsByRoute[row.route];
    const checks = {
      lcp: row.lcpMs <= budget.lcpMs,
      fcp: row.fcpMs <= budget.fcpMs,
      ttfb: row.ttfbMs <= budget.ttfbMs,
    };
    return {
      route: row.route,
      budget,
      measured: {
        lcpMs: row.lcpMs,
        fcpMs: row.fcpMs,
        ttfbMs: row.ttfbMs,
        lcpFallbackToFcp: row.lcpFallbackToFcp,
      },
      checks,
      pass: checks.lcp && checks.fcp && checks.ttfb,
    };
  });

  return {
    artifactVersion: "public-route-performance-v1",
    measuredAtUtc: new Date().toISOString(),
    measurementMode: useSynthetic ? "synthetic" : "playwright-local",
    baseUrl,
    routeCount: evaluatedRoutes.length,
    routes: evaluatedRoutes,
    failedRoutes: evaluatedRoutes.filter((entry) => !entry.pass).map((entry) => entry.route),
  };
}

async function run() {
  const measuredRoutes = useSynthetic
    ? syntheticResults()
    : (await waitForServer(), await measureRoutes());

  const artifact = buildArtifact(measuredRoutes);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(artifact, null, 2), "utf8");
  console.log(`[public-route-performance] wrote ${outputPath}`);

  if (artifact.failedRoutes.length > 0) {
    console.error(`[public-route-performance] budget failures: ${artifact.failedRoutes.join(", ")}`);
    process.exit(1);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
