import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const baseUrl = process.env.BASE_URL ?? "http://localhost:3011";
const outDir = path.join(process.cwd(), "docs", "screenshots");
fs.mkdirSync(outDir, { recursive: true });

const routes = [
  { path: "/", slug: "home" },
  { path: "/services", slug: "services" },
  { path: "/services/septic-cleaning", slug: "septic-cleaning" },
  { path: "/services/well-septic-evaluations", slug: "well-septic-evaluations" },
  { path: "/services/portable-toilets", slug: "portable-toilets" },
  { path: "/services/commercial", slug: "commercial" },
  { path: "/faq", slug: "faq" },
  { path: "/contact", slug: "contact" },
  { path: "/privacy", slug: "privacy" },
];

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 2200 } });

  for (const route of routes) {
    await page.goto(`${baseUrl}${route.path}`, { waitUntil: "networkidle" });
    await page.screenshot({
      path: path.join(outDir, `issue-83-94-${route.slug}-desktop-1440.png`),
      fullPage: true,
    });
  }

  await page.setViewportSize({ width: 390, height: 2200 });
  for (const route of routes) {
    await page.goto(`${baseUrl}${route.path}`, { waitUntil: "networkidle" });
    await page.screenshot({
      path: path.join(outDir, `issue-83-94-${route.slug}-mobile-390.png`),
      fullPage: true,
    });
  }

  await browser.close();
  console.log("Regression screenshots captured.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
