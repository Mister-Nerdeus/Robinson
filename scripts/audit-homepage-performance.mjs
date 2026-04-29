import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
const { homepageContract } = await import(new URL("../src/content/homepageContract.ts", import.meta.url).href);

const baseUrl = (process.env.BASE_URL || "http://127.0.0.1:3011").replace(/\/$/, "");
const outputPath = path.join(process.cwd(), homepageContract.performance.artifactPath);

async function waitForUrl(url, timeoutMs = 45000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error(`Homepage performance audit could not reach ${url}`);
}

async function measureMode(browser, mode, viewport, isMobile) {
  const context = await browser.newContext({
    viewport,
    isMobile,
    hasTouch: isMobile,
    deviceScaleFactor: isMobile ? 3 : 1,
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
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);

  const result = await page.evaluate(({ selectors, expectedRail }) => {
    const readVisible = (selector) => {
      const el = document.querySelector(selector);
      if (!el) return { exists: false, visible: false, rect: null };
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      const visible =
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        rect.width > 0 &&
        rect.height > 0 &&
        rect.top >= 0 &&
        rect.bottom <= window.innerHeight;
      return {
        exists: true,
        visible,
        rect: {
          top: Number(rect.top.toFixed(2)),
          bottom: Number(rect.bottom.toFixed(2)),
          left: Number(rect.left.toFixed(2)),
          right: Number(rect.right.toFixed(2)),
        },
      };
    };

    const nav = performance.getEntriesByType("navigation")[0];
    const fcp = performance.getEntriesByName("first-contentful-paint")[0];
    const lcpMs = window.__robinsonPerf?.lcpMs || fcp?.startTime || 0;
    const heroHeading = readVisible(selectors.heroHeading);
    const heroCall = readVisible(selectors.heroCall);
    const heroRequest = readVisible(selectors.heroRequest);
    const mobileRail = readVisible(selectors.mobileRail);
    const railTop = mobileRail.rect?.top ?? null;
    const clearancePx =
      railTop !== null && heroRequest.rect
        ? Number((railTop - heroRequest.rect.bottom).toFixed(2))
        : null;

    return {
      metrics: {
        lcpMs: Number(lcpMs.toFixed(2)),
        fcpMs: Number((fcp?.startTime || 0).toFixed(2)),
        ttfbMs: Number((nav?.responseStart || 0).toFixed(2)),
      },
      firstViewport: {
        heroHeadingVisible: heroHeading.visible,
        heroCallVisible: heroCall.visible,
        heroRequestVisible: heroRequest.visible,
        mobileRailVisible: mobileRail.visible,
        expectedRail,
        heroToRailClearancePx: clearancePx,
      },
    };
  }, {
    selectors: homepageContract.performance.firstViewportSelectors,
    expectedRail: isMobile,
  });

  await context.close();

  const thresholds = homepageContract.performance.thresholds[mode];
  const checks = {
    lcp: result.metrics.lcpMs <= thresholds.lcpMs,
    fcp: result.metrics.fcpMs <= thresholds.fcpMs,
    ttfb: result.metrics.ttfbMs <= thresholds.ttfbMs,
    heroHeadingVisible: result.firstViewport.heroHeadingVisible,
    heroCallVisible: result.firstViewport.heroCallVisible,
    heroRequestVisible: result.firstViewport.heroRequestVisible,
    railVisibility: isMobile ? result.firstViewport.mobileRailVisible : !result.firstViewport.mobileRailVisible,
    railClearance: isMobile ? (result.firstViewport.heroToRailClearancePx ?? -1) >= 12 : true,
  };

  return {
    mode,
    viewport,
    thresholds,
    measured: result.metrics,
    firstViewport: result.firstViewport,
    checks,
    pass: Object.values(checks).every(Boolean),
  };
}

async function run() {
  await waitForUrl(baseUrl);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const mobile = await measureMode(browser, "mobile", { width: 390, height: 844 }, true);
  const desktop = await measureMode(browser, "desktop", { width: 1440, height: 1400 }, false);
  await browser.close();

  const artifact = {
    artifactVersion: homepageContract.performance.version,
    measuredAtUtc: new Date().toISOString(),
    measurementMode: "playwright-local",
    baseUrl,
    heroMediaMode: homepageContract.performance.heroMediaMode,
    results: [mobile, desktop],
    failedModes: [mobile, desktop].filter((entry) => !entry.pass).map((entry) => entry.mode),
    pass: mobile.pass && desktop.pass,
  };

  fs.writeFileSync(outputPath, JSON.stringify(artifact, null, 2), "utf8");
  console.log(`[homepage-performance] wrote ${outputPath}`);

  if (!artifact.pass) {
    console.error(`[homepage-performance] budget failures: ${artifact.failedModes.join(", ")}`);
    process.exit(1);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
