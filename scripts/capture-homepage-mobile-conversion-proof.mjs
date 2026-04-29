import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
const { homepageContract } = await import(new URL("../src/content/homepageContract.ts", import.meta.url).href);

const baseUrl = (process.env.BASE_URL || "http://127.0.0.1:3011").replace(/\/$/, "");
const outputPath = path.join(process.cwd(), homepageContract.mobileConversion.artifactPath);

async function waitForUrl(url, timeoutMs = 45000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error(`Homepage mobile conversion proof could not reach ${url}`);
}

async function evaluateState(page, stateId) {
  return page.evaluate((state) => {
    const readRect = (selector) => {
      const el = document.querySelector(selector);
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden" || rect.width <= 0 || rect.height <= 0) return null;
      return {
        top: Number(rect.top.toFixed(2)),
        bottom: Number(rect.bottom.toFixed(2)),
        left: Number(rect.left.toFixed(2)),
        right: Number(rect.right.toFixed(2)),
      };
    };

    const headerRect = readRect("header[data-site-header='true']");
    const railRect = readRect("[data-mobile-action-rail]");
    const heroCallRect = readRect("[data-homepage-cta-surface='hero-call']");
    const heroRequestRect = readRect("[data-homepage-cta-surface='hero-request']");
    const chooserRect = readRect("[data-homepage-band='chooser']");
    const trustRect = readRect("[data-homepage-band='trust']");
    const realtorRect = readRect("[data-homepage-band='realtor']");
    const finalRect = readRect("[data-homepage-band='final-cta']");
    const finalButtonRect = readRect("[data-homepage-cta-surface='final-request']");
    const visibleHeaderCtas = Array.from(document.querySelectorAll("[data-homepage-cta-surface^='header-']")).filter((node) => {
      const rect = node.getBoundingClientRect();
      const style = getComputedStyle(node);
      return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
    }).length;

    const heroClearancePx =
      railRect && heroRequestRect ? Number((railRect.top - heroRequestRect.bottom).toFixed(2)) : null;
    const finalClearancePx =
      railRect && finalButtonRect ? Number((railRect.top - finalButtonRect.bottom).toFixed(2)) : null;

    const checksByState = {
      "first-viewport": {
        stickyHeaderVisible: Boolean(headerRect),
        mobileRailVisible: Boolean(railRect),
        heroCallVisible: Boolean(heroCallRect),
        heroRequestVisible: Boolean(heroRequestRect),
        noHeaderCompetition: visibleHeaderCtas === 0,
        heroClearance: (heroClearancePx ?? -1) >= 12,
      },
      midpage: {
        stickyHeaderVisible: Boolean(headerRect),
        mobileRailVisible: Boolean(railRect),
        chooserVisible: Boolean(chooserRect),
        trustVisible: Boolean(trustRect),
        noHeaderCompetition: visibleHeaderCtas === 0,
      },
      "final-cta": {
        stickyHeaderVisible: Boolean(headerRect),
        mobileRailVisible: Boolean(railRect),
        finalBandVisible: Boolean(finalRect),
        finalButtonVisible: Boolean(finalButtonRect),
        finalClearance: (finalClearancePx ?? -1) >= 12,
        noHeaderCompetition: visibleHeaderCtas === 0,
      },
    };

    const checks = checksByState[state];

    return {
      state,
      measurements: {
        headerRect,
        railRect,
        heroCallRect,
        heroRequestRect,
        chooserRect,
        trustRect,
        realtorRect,
        finalRect,
        finalButtonRect,
        heroClearancePx,
        finalClearancePx,
        visibleHeaderCtas,
      },
      checks,
      pass: Object.values(checks).every(Boolean),
    };
  }, stateId);
}

async function run() {
  await waitForUrl(baseUrl);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  Object.values(homepageContract.mobileConversion.screenshots).forEach((relativePath) => {
    fs.mkdirSync(path.dirname(path.join(process.cwd(), relativePath)), { recursive: true });
  });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: homepageContract.mobileConversion.viewport,
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 3,
  });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });

  const states = [];

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(250);
  states.push(await evaluateState(page, "first-viewport"));
  await page.screenshot({
    path: path.join(process.cwd(), homepageContract.mobileConversion.screenshots.firstViewport),
    fullPage: false,
  });

  await page.locator("[data-homepage-band='trust']").scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy(0, -120));
  await page.waitForTimeout(250);
  states.push(await evaluateState(page, "midpage"));
  await page.screenshot({
    path: path.join(process.cwd(), homepageContract.mobileConversion.screenshots.midpage),
    fullPage: false,
  });

  await page.locator("[data-homepage-band='final-cta']").scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy(0, -80));
  await page.waitForTimeout(250);
  states.push(await evaluateState(page, "final-cta"));
  await page.screenshot({
    path: path.join(process.cwd(), homepageContract.mobileConversion.screenshots.finalCta),
    fullPage: false,
  });

  await context.close();
  await browser.close();

  const artifact = {
    artifactVersion: homepageContract.mobileConversion.version,
    measuredAtUtc: new Date().toISOString(),
    baseUrl,
    viewport: homepageContract.mobileConversion.viewport,
    screenshots: homepageContract.mobileConversion.screenshots,
    states,
    failingStates: states.filter((state) => !state.pass).map((state) => state.state),
    pass: states.every((state) => state.pass),
  };

  fs.writeFileSync(outputPath, JSON.stringify(artifact, null, 2), "utf8");
  console.log(`[homepage-mobile-conversion] wrote ${outputPath}`);

  if (!artifact.pass) {
    console.error(`[homepage-mobile-conversion] failures: ${artifact.failingStates.join(", ")}`);
    process.exit(1);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
