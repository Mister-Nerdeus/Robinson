import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const outDir = "docs/screenshots";
const base = process.env.BASE_URL || "http://127.0.0.1:3001";

async function waitForServer(timeoutMs = 45000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const res = await fetch(base);
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 800));
  }
  throw new Error(`Server did not become ready at ${base}`);
}

async function capture(context, route, file, fullPage = true) {
  const page = await context.newPage();
  await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
  await page.screenshot({ path: `${outDir}/${file}`, fullPage });
  await page.close();
}

async function main() {
  await mkdir(outDir, { recursive: true });
  await waitForServer();

  const browser = await chromium.launch();

  const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const mobile390 = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 3 });
  const mobile360 = await browser.newContext({ viewport: { width: 360, height: 800 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2.5 });
  const mobile430 = await browser.newContext({ viewport: { width: 430, height: 932 }, isMobile: true, hasTouch: true, deviceScaleFactor: 3 });

  const routes = [
    ["/", "home"],
    ["/services", "services"],
    ["/services/septic-cleaning", "septic-cleaning"],
    ["/services/well-septic-evaluations", "evaluations"],
    ["/realtors", "realtors"],
    ["/services/portable-toilets", "portable-toilets"],
    ["/contact", "contact"],
  ];

  for (const [route, name] of routes) {
    await capture(desktop, route, `${name}-desktop-1440.png`);
    await capture(mobile390, route, `${name}-mobile-390.png`);
  }

  await capture(mobile360, "/", "home-mobile-360.png");
  await capture(mobile390, "/", "home-mobile-390.png");
  await capture(mobile430, "/", "home-mobile-430.png");

  await desktop.close();
  await mobile390.close();
  await mobile360.close();
  await mobile430.close();
  await browser.close();

  console.log(`screenshot capture complete from ${base}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
