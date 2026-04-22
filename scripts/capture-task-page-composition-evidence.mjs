import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const baseUrl = process.env.BASE_URL ?? "http://localhost:3011";
const outDir = path.join(process.cwd(), "docs", "screenshots", "issues-163-172");
const beforeDir = path.join(process.cwd(), "docs", "screenshots", "issues-159-162");

const taskRoutes = [
  { slug: "septic-cleaning", path: "/services/septic-cleaning" },
  { slug: "contact", path: "/contact" },
  { slug: "well-septic-evaluations", path: "/services/well-septic-evaluations" },
  { slug: "portable-toilets", path: "/services/portable-toilets" },
  { slug: "commercial", path: "/services/commercial" },
  { slug: "realtors", path: "/realtors" },
];

const desktopViewports = [
  { width: 1280, height: 1800 },
  { width: 1440, height: 1900 },
];
const mobileViewport = { width: 390, height: 2200 };

function roundRect(rect) {
  return {
    x: Math.round(rect.x),
    y: Math.round(rect.y),
    width: Math.round(rect.width),
    height: Math.round(rect.height),
  };
}

async function capture() {
  await mkdir(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const matrix = [];
  const findings = [];

  for (const viewport of desktopViewports) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();

    for (const route of taskRoutes) {
      await page.goto(`${baseUrl}${route.path}`, { waitUntil: "networkidle" });

      const screenshotPath = path.join(
        outDir,
        `${route.slug}-desktop-${viewport.width}.png`,
      );
      await page.screenshot({ path: screenshotPath, fullPage: true });

      const metrics = await page.evaluate(() => {
        const taskLayouts = Array.from(
          document.querySelectorAll('[data-task-page-layout="task-surface"]'),
        );

        const sections = taskLayouts.map((layout) => {
          const mode = layout.getAttribute("data-task-page-layout-mode") ?? "unknown";
          const primary = layout.querySelector(".task-page-primary");
          const support = layout.querySelector(".task-page-support");

          const layoutRect = layout.getBoundingClientRect();
          const primaryRect = primary?.getBoundingClientRect();
          const supportRect = support?.getBoundingClientRect();

          return {
            mode,
            layout: roundRect(layoutRect),
            primary: primaryRect ? roundRect(primaryRect) : null,
            support: supportRect ? roundRect(supportRect) : null,
          };
        });

        return {
          viewport: { width: window.innerWidth, height: window.innerHeight },
          requestContract: document.documentElement.innerHTML.includes("data-request-layout-contract="),
          sections,
        };

        function roundRect(rect) {
          return {
            x: Math.round(rect.x),
            y: Math.round(rect.y),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          };
        }
      });

      const routeEntry = {
        route: route.path,
        viewportWidth: viewport.width,
        viewportHeight: viewport.height,
        ...metrics,
      };
      matrix.push(routeEntry);

      for (const section of metrics.sections) {
        if (section.mode === "supportRail") {
          if (!section.support) {
            findings.push(
              `[${route.path} @ ${viewport.width}] support-rail section missing support content`,
            );
          }
          if (section.primary && section.support) {
            const gapFromPrimaryToViewportRight =
              metrics.viewport.width - (section.primary.x + section.primary.width);
            if (gapFromPrimaryToViewportRight > 900) {
              findings.push(
                `[${route.path} @ ${viewport.width}] right-side void too large (${gapFromPrimaryToViewportRight}px)`,
              );
            }
            const rightRailHeightDelta = section.primary.height - section.support.height;
            if (rightRailHeightDelta > 260) {
              findings.push(
                `[${route.path} @ ${viewport.width}] support-rail height mismatch leaves right void (${rightRailHeightDelta}px)`,
              );
            }
          }
        }

        if (section.mode === "formDominant" && section.primary) {
          const minDominantWidth = Math.max(760, Math.floor(section.layout.width * 0.56));
          if (section.primary.width < minDominantWidth) {
            findings.push(
              `[${route.path} @ ${viewport.width}] form-dominant section is not dominant (${section.primary.width}px < ${minDominantWidth}px)`,
            );
          }
          if (section.support) {
            findings.push(
              `[${route.path} @ ${viewport.width}] form-dominant section rendered an unexpected support rail`,
            );
          }
        }
      }
    }

    await context.close();
  }

  const mobileContext = await browser.newContext({ viewport: mobileViewport });
  const mobilePage = await mobileContext.newPage();
  for (const route of taskRoutes) {
    await mobilePage.goto(`${baseUrl}${route.path}`, { waitUntil: "networkidle" });
    await mobilePage.screenshot({
      path: path.join(outDir, `${route.slug}-mobile-${mobileViewport.width}.png`),
      fullPage: true,
    });
  }
  await mobileContext.close();

  await browser.close();

  const payload = {
    capturedAtUtc: new Date().toISOString(),
    baseUrl,
    routes: taskRoutes.map((route) => route.path),
    desktopViewports,
    matrix,
    findings,
    passed: findings.length === 0,
  };

  await writeFile(
    path.join(outDir, "composition-audit.json"),
    `${JSON.stringify(payload, null, 2)}\n`,
    "utf8",
  );

  const beforeAfterMatrix = [];
  const missingBeforePairs = [];
  for (const route of taskRoutes) {
    for (const viewport of desktopViewports) {
      const filename = `${route.slug}-desktop-${viewport.width}.png`;
      const beforePath = path.join(beforeDir, filename);
      const afterPath = path.join(outDir, filename);
      const beforeExists = await exists(beforePath);
      if (!beforeExists) {
        missingBeforePairs.push(filename);
      }
      beforeAfterMatrix.push({
        route: route.path,
        viewport: `${viewport.width}w-desktop`,
        before: path.relative(process.cwd(), beforePath).replace(/\\/g, "/"),
        after: path.relative(process.cwd(), afterPath).replace(/\\/g, "/"),
        beforeExists,
      });
    }

    const mobileFilename = `${route.slug}-mobile-${mobileViewport.width}.png`;
    const beforeMobilePath = path.join(beforeDir, mobileFilename);
    const afterMobilePath = path.join(outDir, mobileFilename);
    const beforeMobileExists = await exists(beforeMobilePath);
    if (!beforeMobileExists) {
      missingBeforePairs.push(mobileFilename);
    }
    beforeAfterMatrix.push({
      route: route.path,
      viewport: `${mobileViewport.width}w-mobile`,
      before: path.relative(process.cwd(), beforeMobilePath).replace(/\\/g, "/"),
      after: path.relative(process.cwd(), afterMobilePath).replace(/\\/g, "/"),
      beforeExists: beforeMobileExists,
    });
  }

  await writeFile(
    path.join(outDir, "before-after-matrix.json"),
    `${JSON.stringify(
      {
        generatedAtUtc: new Date().toISOString(),
        beforeDirectory: path.relative(process.cwd(), beforeDir).replace(/\\/g, "/"),
        afterDirectory: path.relative(process.cwd(), outDir).replace(/\\/g, "/"),
        pairs: beforeAfterMatrix,
      },
      null,
      2,
    )}\n`,
    "utf8",
  );

  if (findings.length > 0 || missingBeforePairs.length > 0) {
    const failures = [
      ...findings,
      ...missingBeforePairs.map((name) => `Missing before screenshot pair in issues-159-162: ${name}`),
    ];
    throw new Error(`Composition audit failed:\n- ${failures.join("\n- ")}`);
  }

  console.log(`Task-page composition evidence captured in ${outDir}`);
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

capture().catch((error) => {
  console.error(error);
  process.exit(1);
});
