import { mkdir, writeFile } from "node:fs/promises";
import { chromium, devices } from "playwright";

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:4850";
const outDir = process.env.OUTPUT_DIR || "docs/screenshots/issues-120-130";

async function waitForServer() {
  const timeoutMs = 60000;
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {
      // retry
    }
    await new Promise((resolve) => setTimeout(resolve, 750));
  }

  throw new Error(`Server did not start within ${timeoutMs}ms: ${baseUrl}`);
}

async function captureDesktopScreens(browser) {
  const matrix = [];
  const viewports = [
    { name: "desktop-1024", width: 1024, height: 900 },
    { name: "desktop-1440", width: 1440, height: 1000 },
  ];

  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport });
    const contactPage = await context.newPage();
    await contactPage.goto(`${baseUrl}/contact`, { waitUntil: "networkidle" });
    await contactPage.screenshot({ path: `${outDir}/${viewport.name}-contact.png`, fullPage: true });

    const metrics = await contactPage.evaluate(() => {
      const taskRoot = document.querySelector('[data-task-page-layout="task-surface"]');
      const main = document.querySelector(".task-page-primary");
      const rail = document.querySelector(".task-page-support");
      const wizard = document.getElementById("request-wizard");

      const rect = (el) => {
        if (!el) return null;
        const box = el.getBoundingClientRect();
        return { width: Math.round(box.width), height: Math.round(box.height), x: Math.round(box.x), y: Math.round(box.y) };
      };

      return {
        viewport: { width: window.innerWidth, height: window.innerHeight },
        taskRoot: rect(taskRoot),
        main: rect(main),
        rail: rect(rail),
        wizardSingleStepCards: document.querySelectorAll("#request-wizard .surface-card").length,
      };
    });

    matrix.push({ viewport: viewport.name, ...metrics });
    await context.close();
  }

  return matrix;
}

async function captureMobileWizardFlow(browser) {
  const context = await browser.newContext({
    ...devices["iPhone 13"],
  });

  const page = await context.newPage();
  await page.goto(`${baseUrl}/contact`, { waitUntil: "networkidle" });
  await page.screenshot({ path: `${outDir}/mobile-contact-initial.png`, fullPage: true });

  await page.getByRole("button", { name: "Portable toilet rental" }).click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${outDir}/mobile-contact-lane-selected.png`, fullPage: true });

  await page.evaluate(() => {
    const nextButton = Array.from(document.querySelectorAll("#request-wizard button")).find(
      (candidate) => candidate.textContent?.trim() === "Next Step",
    );
    nextButton?.click();
  });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${outDir}/mobile-contact-step-2.png`, fullPage: true });

  const mobileAudit = await page.evaluate(() => {
    const activeElement = document.activeElement;
    const heading = document.querySelector("[data-wizard-step-heading]");
    const sticky = document.querySelector(".wizard-mobile-actions");
    return {
      activeTag: activeElement?.tagName ?? null,
      activeText: activeElement?.textContent?.trim().slice(0, 80) ?? null,
      headingFocused: activeElement === heading,
      stickyActionsVisible: Boolean(sticky),
      renderedStepCards: document.querySelectorAll("#request-wizard .surface-card").length,
    };
  });

  await context.close();
  return mobileAudit;
}

async function captureRouteScreens(browser) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const routes = [
    ["/realtors", "desktop-1440-realtors.png"],
    ["/services/portable-toilets", "desktop-1440-portable-toilets.png"],
  ];

  for (const [route, filename] of routes) {
    const page = await context.newPage();
    await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
    await page.screenshot({ path: `${outDir}/${filename}`, fullPage: true });
    await page.close();
  }

  await context.close();
}

async function main() {
  await mkdir(outDir, { recursive: true });
  await waitForServer();

  const browser = await chromium.launch();
  const desktopMatrix = await captureDesktopScreens(browser);
  const mobileAudit = await captureMobileWizardFlow(browser);
  await captureRouteScreens(browser);
  await browser.close();

  await writeFile(
    `${outDir}/qa-matrix.json`,
    JSON.stringify(
      {
        capturedAt: new Date().toISOString(),
        baseUrl,
        desktopMatrix,
        mobileAudit,
      },
      null,
      2,
    ),
    "utf8",
  );

  console.log(`Issue 120-130 evidence captured in ${outDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
