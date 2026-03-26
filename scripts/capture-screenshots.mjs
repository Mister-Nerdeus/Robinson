import { chromium, devices } from "playwright";
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";

const outDir = "docs/screenshots";
const base = "http://127.0.0.1:4850";

async function waitForServer(timeoutMs = 45000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const res = await fetch(base);
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 800));
  }
  throw new Error("Server did not become ready");
}

async function main() {
  await mkdir(outDir, { recursive: true });

  const server = spawn("npm.cmd", ["run", "dev"], {
    stdio: "ignore",
    shell: true,
  });

  try {
    await waitForServer();
    const browser = await chromium.launch();

    const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const mobile = await browser.newContext({ ...devices["iPhone 13"] });

    const desktopPages = [
      ["/", "home-desktop.png"],
      ["/services", "services-desktop.png"],
      ["/contact", "contact-desktop.png"],
      ["/services/septic-cleaning", "septic-form-desktop.png"],
      ["/admin/submissions", "admin-gated-desktop.png"],
    ];

    for (const [route, file] of desktopPages) {
      const page = await desktop.newPage();
      await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
      await page.screenshot({ path: `${outDir}/${file}`, fullPage: true });
      await page.close();
    }

    const mobilePages = [
      ["/", "home-mobile.png"],
      ["/contact", "contact-mobile.png"],
      ["/services/portable-toilets", "portable-form-mobile.png"],
    ];

    for (const [route, file] of mobilePages) {
      const page = await mobile.newPage();
      await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
      await page.screenshot({ path: `${outDir}/${file}`, fullPage: true });
      await page.close();
    }

    await desktop.close();
    await mobile.close();
    await browser.close();
    console.log("screenshot capture complete");
  } finally {
    server.kill();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
