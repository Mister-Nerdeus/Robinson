import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
const { homepageContract } = await import(new URL("../src/content/homepageContract.ts", import.meta.url).href);

const baseUrl = (process.env.BASE_URL || "http://127.0.0.1:3011").replace(/\/$/, "");
const liveUrl = (process.env.LIVE_URL || "https://robinson-demo.hearthcore.app").replace(/\/$/, "");
const outputPath = path.join(process.cwd(), homepageContract.liveParity.artifactPath);
const developScreenshotPath = path.join(process.cwd(), homepageContract.liveParity.screenshots.develop);
const demoScreenshotPath = path.join(process.cwd(), homepageContract.liveParity.screenshots.demo);

async function waitForUrl(url, timeoutMs = 45000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error(`Homepage parity audit could not reach ${url}`);
}

async function collectSnapshot(page, url, screenshotPath) {
  await page.goto(url, { waitUntil: "networkidle" });
  await page.screenshot({ path: screenshotPath, fullPage: true });

  return page.evaluate((requiredMarkers) => {
    const normalize = (value) => value?.replace(/\s+/g, " ").trim() ?? null;
    const headings = Array.from(document.querySelectorAll("h1, h2")).map((node) => normalize(node.textContent)).filter(Boolean);
    const bodyText = normalize(document.body.innerText) || "";
    const footerSurfaceMarker = document.querySelector("footer[data-footer-surface]")?.getAttribute("data-footer-surface") ?? null;
    const finalCtaText =
      normalize(document.querySelector("[data-homepage-final-cta-heading='true']")?.textContent) ||
      Array.from(document.querySelectorAll("p, h2"))
        .map((node) => normalize(node.textContent))
        .find((value) => value === requiredMarkers.finalCtaHeading) ||
      null;

    return {
      pageTitle: document.title,
      heroHeading: normalize(document.querySelector("[data-homepage-hero-heading='true']")?.textContent) || headings[0] || null,
      chooserHeading: headings.find((value) => value === requiredMarkers.chooserHeading) || null,
      trustBandTitle: headings.find((value) => value === requiredMarkers.trustBandTitle) || null,
      trustBandPresent:
        Boolean(document.querySelector("[data-homepage-band='trust']")) || headings.includes(requiredMarkers.trustBandTitle),
      realtorBandTitle: headings.find((value) => value === requiredMarkers.realtorBandTitle) || null,
      realtorBandPresent:
        Boolean(document.querySelector("[data-homepage-band='realtor']")) || headings.includes(requiredMarkers.realtorBandTitle),
      finalCtaHeading: finalCtaText,
      footerSurfaceMarker,
      headingOrder: headings,
      bodyText,
    };
  }, homepageContract.liveParity.requiredMarkers);
}

function evaluateSnapshot(label, snapshot, screenshotPath) {
  const requiredMarkers = homepageContract.liveParity.requiredMarkers;
  const lowerBody = snapshot.bodyText.toLowerCase();
  const driftSignals = homepageContract.liveParity.driftSignals.filter((signal) => lowerBody.includes(signal));
  const checks = {
    heroHeading: snapshot.heroHeading === requiredMarkers.heroHeading,
    chooserHeading: snapshot.chooserHeading === requiredMarkers.chooserHeading,
    trustBandPresent: snapshot.trustBandPresent,
    realtorBandPresent: snapshot.realtorBandPresent,
    finalCtaHeading: snapshot.finalCtaHeading === requiredMarkers.finalCtaHeading,
    footerCompactness: snapshot.footerSurfaceMarker === requiredMarkers.footerSurfaceMarker,
  };

  return {
    label,
    screenshotPath: path.relative(process.cwd(), screenshotPath).replace(/\\/g, "/"),
    actual: snapshot,
    checks,
    driftSignals,
    pass: Object.values(checks).every(Boolean) && driftSignals.length === 0,
  };
}

async function run() {
  await waitForUrl(baseUrl);
  await waitForUrl(liveUrl);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.mkdirSync(path.dirname(developScreenshotPath), { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1800 } });
  const page = await context.newPage();

  const developSnapshot = await collectSnapshot(page, `${baseUrl}/`, developScreenshotPath);
  const demoSnapshot = await collectSnapshot(page, `${liveUrl}/`, demoScreenshotPath);

  await context.close();
  await browser.close();

  const develop = evaluateSnapshot("develop", developSnapshot, developScreenshotPath);
  const demo = evaluateSnapshot("demo", demoSnapshot, demoScreenshotPath);
  const parity = {
    heroHeadingMatches: develop.actual.heroHeading === demo.actual.heroHeading,
    chooserHeadingMatches: develop.actual.chooserHeading === demo.actual.chooserHeading,
    trustBandMatches: develop.actual.trustBandTitle === demo.actual.trustBandTitle,
    realtorBandMatches: develop.actual.realtorBandTitle === demo.actual.realtorBandTitle,
    finalCtaMatches: develop.actual.finalCtaHeading === demo.actual.finalCtaHeading,
    footerMatches: develop.actual.footerSurfaceMarker === demo.actual.footerSurfaceMarker,
  };

  const artifact = {
    artifactVersion: homepageContract.liveParity.version,
    measuredAtUtc: new Date().toISOString(),
    contractVersion: homepageContract.version,
    baseUrl,
    liveUrl,
    develop,
    demo,
    parity,
    pass:
      develop.pass &&
      demo.pass &&
      Object.values(parity).every(Boolean),
  };

  fs.writeFileSync(outputPath, JSON.stringify(artifact, null, 2), "utf8");
  console.log(`[homepage-live-parity] wrote ${outputPath}`);

  if (!artifact.pass) {
    console.error("[homepage-live-parity] live homepage drift detected");
    process.exit(1);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
