import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const baseUrl = process.env.BASE_URL || "http://localhost:3001";
const outDir = process.env.OUTPUT_DIR || "docs/screenshots/live-proof-77-82/after-test";
const operatorCookieName = process.env.REVIEW_ACCESS_COOKIE_NAME || "robinson_review_access";
const operatorCookieValue = process.env.REVIEW_ACCESS_KEY || "test-review-access-secret";

const viewports = {
  canonical: { width: 1440, height: 900 },
  constrained: { width: 1180, height: 860 },
  tablet: { width: 1024, height: 1366 },
};

async function ensureServerReady(timeoutMs = 90000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) {
        return;
      }
    } catch {
      // retry
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error(`Target host did not become ready at ${baseUrl}`);
}

async function capture(page, route, fileName, fullPage = true) {
  await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
  await page.screenshot({ path: `${outDir}/${fileName}`, fullPage });
}

async function captureFooter(page, route, fileName) {
  await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${outDir}/${fileName}`, fullPage: false });
}

async function main() {
  await mkdir(outDir, { recursive: true });
  await ensureServerReady();

  const browser = await chromium.launch();

  for (const [label, viewport] of Object.entries(viewports)) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();

    await capture(page, "/", `${label}-home.png`);
    await capture(page, "/contact", `${label}-contact.png`);
    await capture(page, "/services/septic-cleaning", `${label}-septic.png`);
    await capture(page, "/contact?lane=general", `${label}-contact-general-lane.png`);
    await capture(page, "/contact?lane=septic-service", `${label}-contact-septic-lane.png`);

    await captureFooter(page, "/contact", `${label}-footer-shared-demo.png`);

    await page.close();
    await context.close();
  }

  const operatorContext = await browser.newContext({ viewport: viewports.canonical });
  await operatorContext.addCookies([
    {
      name: operatorCookieName,
      value: operatorCookieValue,
      url: baseUrl,
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
    },
  ]);
  const operatorPage = await operatorContext.newPage();
  await captureFooter(operatorPage, "/contact", "canonical-footer-operator-context.png");
  await operatorPage.close();
  await operatorContext.close();

  await browser.close();
  console.log(`Captured live proof screenshots to ${outDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
