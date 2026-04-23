import path from "node:path";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const baseUrl = process.env.BASE_URL ?? "http://localhost:4850";
const outDir = path.join(process.cwd(), "docs", "screenshots", "issues-197-208");

const routes = [
  { slug: "home", path: "/" },
  { slug: "contact", path: "/contact" },
  { slug: "septic-cleaning", path: "/services/septic-cleaning" },
  { slug: "well-septic-evaluations", path: "/services/well-septic-evaluations" },
  { slug: "portable-toilets", path: "/services/portable-toilets" },
  { slug: "commercial", path: "/services/commercial" },
  { slug: "realtors", path: "/realtors" },
];

const desktopWidths = [1280, 1440];
const mobileWidth = 390;

async function waitForServer(timeoutMs = 60000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(baseUrl);
      if (res.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error(`Server did not become ready at ${baseUrl}`);
}

async function run() {
  await mkdir(outDir, { recursive: true });
  await waitForServer();

  const browser = await chromium.launch({ headless: true });

  for (const width of desktopWidths) {
    const context = await browser.newContext({ viewport: { width, height: 2200 } });
    const page = await context.newPage();
    for (const route of routes) {
      await page.goto(`${baseUrl}${route.path}`, { waitUntil: "networkidle" });
      await page.screenshot({
        path: path.join(outDir, `${route.slug}-desktop-${width}.png`),
        fullPage: true,
      });
    }
    await context.close();
  }

  const mobileContext = await browser.newContext({
    viewport: { width: mobileWidth, height: 2400 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 3,
  });
  const mobilePage = await mobileContext.newPage();
  for (const route of routes) {
    await mobilePage.goto(`${baseUrl}${route.path}`, { waitUntil: "networkidle" });
    await mobilePage.screenshot({
      path: path.join(outDir, `${route.slug}-mobile-${mobileWidth}.png`),
      fullPage: true,
    });
  }

  await mobileContext.close();
  await browser.close();
  console.log(`Issue 197-208 screenshots captured in ${outDir}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
