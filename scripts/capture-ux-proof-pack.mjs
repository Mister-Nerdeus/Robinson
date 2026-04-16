import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:4850";
const outDir = process.env.OUTPUT_DIR || "docs/screenshots/ux-proof-58-64";
const operatorCookieName = process.env.REVIEW_ACCESS_COOKIE_NAME || "robinson_review_access";
const operatorCookieValue = process.env.REVIEW_ACCESS_KEY || "local-review-access-secret";

const viewports = {
  canonical: { width: 1440, height: 900 },
  constrained: { width: 1180, height: 860 },
  tablet: { width: 1024, height: 1366 },
};

async function ensureServer() {
  const started = Date.now();
  while (Date.now() - started < 45000) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {
      // retry
    }
    await new Promise((resolve) => setTimeout(resolve, 900));
  }
  throw new Error(`Server not reachable at ${baseUrl}`);
}

async function capturePage(context, route, filename, fullPage = true) {
  const page = await context.newPage();
  await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
  await page.screenshot({ path: `${outDir}/${filename}`, fullPage });
  await page.close();
}

async function captureContactStates(context, routePrefix) {
  const neutralPage = await context.newPage();
  await neutralPage.goto(`${baseUrl}/contact`, { waitUntil: "networkidle" });
  await neutralPage.screenshot({ path: `${outDir}/${routePrefix}-contact-neutral.png`, fullPage: true });
  await neutralPage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await neutralPage.waitForTimeout(250);
  await neutralPage.screenshot({
    path: `${outDir}/${routePrefix}-contact-footer-no-operator-proof.png`,
    fullPage: false,
  });
  await neutralPage.close();

  const generalPage = await context.newPage();
  await generalPage.goto(`${baseUrl}/contact`, { waitUntil: "networkidle" });
  await generalPage.evaluate(() => {
    const button = Array.from(document.querySelectorAll("button")).find((candidate) =>
      candidate.textContent?.toLowerCase().includes("general contact"),
    );
    button?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  await generalPage.waitForTimeout(600);
  await generalPage.screenshot({
    path: `${outDir}/${routePrefix}-contact-general-lane.png`,
    fullPage: true,
  });
  await generalPage.close();

  const septicPage = await context.newPage();
  await septicPage.goto(`${baseUrl}/contact`, { waitUntil: "networkidle" });
  await septicPage.evaluate(() => {
    const button = Array.from(document.querySelectorAll("button")).find((candidate) =>
      candidate.textContent?.toLowerCase().includes("septic service"),
    );
    button?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  await septicPage.waitForTimeout(600);
  await septicPage.screenshot({
    path: `${outDir}/${routePrefix}-contact-septic-lane.png`,
    fullPage: true,
  });
  await septicPage.close();
}

async function captureSepticProblemSequencing(context, routePrefix) {
  const page = await context.newPage();
  await page.goto(`${baseUrl}/services/septic-cleaning`, { waitUntil: "networkidle" });
  await page.waitForTimeout(350);
  await page.screenshot({
    path: `${outDir}/${routePrefix}-septic-problem-sequencing.png`,
    fullPage: true,
  });
  await page.close();
}

async function captureOperatorFooterState(context, routePrefix) {
  await context.addCookies([
    {
      name: operatorCookieName,
      value: operatorCookieValue,
      url: baseUrl,
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
    },
  ]);

  const page = await context.newPage();
  await page.goto(`${baseUrl}/contact`, { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${outDir}/${routePrefix}-contact-footer-operator-proof.png`, fullPage: false });
  await page.close();
}

async function main() {
  await mkdir(outDir, { recursive: true });
  await ensureServer();

  const browser = await chromium.launch();

  for (const [label, viewport] of Object.entries(viewports)) {
    const context = await browser.newContext({ viewport });
    await capturePage(context, "/services/septic-cleaning", `${label}-septic-route.png`);
    await capturePage(context, "/services/well-septic-evaluations", `${label}-evaluations-route.png`);
    await capturePage(context, "/services/portable-toilets", `${label}-rental-route.png`);
    await capturePage(context, "/services/commercial", `${label}-commercial-route.png`);
    await capturePage(context, "/contact", `${label}-contact-route.png`);
    await captureContactStates(context, label);
    await captureSepticProblemSequencing(context, label);
    await context.close();
  }

  const operatorContext = await browser.newContext({ viewport: viewports.canonical });
  await captureOperatorFooterState(operatorContext, "canonical");
  await operatorContext.close();

  await browser.close();
  console.log(`UX proof screenshots captured to ${outDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
