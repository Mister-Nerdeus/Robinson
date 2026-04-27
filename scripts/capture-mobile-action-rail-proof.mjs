import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const baseUrlArg = process.argv.find((arg) => arg.startsWith("--baseUrl="));
const baseUrl = (baseUrlArg ? baseUrlArg.split("=")[1] : process.env.BASE_URL || "http://127.0.0.1:4850").replace(/\/$/, "");
const forceSyntheticFailure = process.argv.includes("--synthetic-fail");

const routes = [
  { route: "/", slug: "home", kind: "homepage" },
  { route: "/contact", slug: "contact", kind: "form" },
  { route: "/services/septic-cleaning", slug: "service", kind: "form" },
  { route: "/faq", slug: "faq", kind: "non-form" },
];

const screenshotsDir = path.join(process.cwd(), "docs", "screenshots");
const artifactPath = path.join(process.cwd(), "docs", "verification", "mobile-action-rail-contract.json");

async function waitForServer(timeoutMs = 45000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(baseUrl);
      if (res.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 800));
  }
  throw new Error(`Mobile rail proof script could not reach ${baseUrl}`);
}

async function run() {
  await waitForServer();
  fs.mkdirSync(screenshotsDir, { recursive: true });
  fs.mkdirSync(path.dirname(artifactPath), { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 3,
  });
  const page = await context.newPage();

  const routeResults = [];

  for (const item of routes) {
    await page.goto(`${baseUrl}${item.route}`, { waitUntil: "networkidle" });
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }));
    await page.waitForTimeout(250);

    const result = await page.evaluate(({ item }) => {
      const rail = document.querySelector("[data-mobile-action-rail]");
      if (!rail) {
        return { route: item.route, kind: item.kind, pass: false, reason: "missing-mobile-action-rail" };
      }

      const reservedRailZonePx = 84;
      const documentBottomPx = document.documentElement.scrollHeight;
      const selectors = [
        "main form button[type='submit']",
        "main form button[data-primary-submit='true']",
        "main form button:last-of-type",
        "main a[href^='/contact']",
        "main a[href^='tel:']",
        "main a.rounded-md",
      ];

      const controls = [];
      for (const selector of selectors) {
        const nodes = Array.from(document.querySelectorAll(selector));
        for (const node of nodes) {
          const el = node;
          const style = getComputedStyle(el);
          if (style.display === "none" || style.visibility === "hidden") continue;
          const rect = el.getBoundingClientRect();
          if (rect.width <= 0 || rect.height <= 0) continue;
          const absoluteBottom = rect.bottom + window.scrollY;
          controls.push({
            selector,
            label: (el.textContent || el.getAttribute("aria-label") || selector).replace(/\s+/g, " ").trim().slice(0, 80),
            top: rect.top,
            bottom: rect.bottom,
            absoluteBottom,
          });
        }
      }

      controls.sort((a, b) => b.absoluteBottom - a.absoluteBottom);
      const candidate = controls[0] ?? null;
      const overlapPx = candidate
        ? Math.max(0, candidate.absoluteBottom - (documentBottomPx - reservedRailZonePx))
        : 0;

      return {
        route: item.route,
        kind: item.kind,
        pass: overlapPx <= 0,
        overlapPx: Number(overlapPx.toFixed(2)),
        documentBottomPx,
        reservedRailZonePx,
        candidate,
      };
    }, { item });

    const screenshotPath = path.join("docs", "screenshots", `mobile-action-rail-${item.slug}-390.png`);
    await page.screenshot({ path: path.join(process.cwd(), screenshotPath), fullPage: false });

    routeResults.push({
      ...result,
      screenshotPath,
    });
  }

  await context.close();
  await browser.close();

  if (forceSyntheticFailure) {
    const failIndex = routeResults.findIndex((entry) => entry.route === "/contact");
    if (failIndex >= 0) {
      routeResults[failIndex] = {
        ...routeResults[failIndex],
        pass: false,
        overlapPx: 12,
        reason: "synthetic-failure-mode",
      };
    }
  }

  const failingRoutes = routeResults.filter((entry) => !entry.pass).map((entry) => entry.route);
  const artifact = {
    artifactVersion: "mobile-action-rail-contract-v1",
    measuredAtUtc: new Date().toISOString(),
    baseUrl,
    routes: routeResults,
    failingRoutes,
  };

  fs.writeFileSync(artifactPath, JSON.stringify(artifact, null, 2), "utf8");
  console.log(`[mobile-action-rail-proof] wrote ${artifactPath}`);

  if (failingRoutes.length > 0) {
    console.error(`[mobile-action-rail-proof] failures: ${failingRoutes.join(", ")}`);
    process.exit(1);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
