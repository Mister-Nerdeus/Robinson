import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const baseUrl = process.env.BASE_URL ?? "http://localhost:3011";
const minHeight = 44;
const minWidth = 44;

const routes = [
  "/",
  "/services",
  "/services/septic-cleaning",
  "/services/well-septic-evaluations",
  "/services/portable-toilets",
  "/services/commercial",
  "/faq",
  "/contact",
  "/privacy",
];

const selectorGroups = [
  'header a[href^="tel:"]',
  'header button[aria-controls="mobile-site-nav"]',
  ".fixed a",
  "main form button",
  "main form input",
  "main form select",
  "main form textarea",
  "main a.rounded-md",
];

function safeText(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const results = [];

  for (const route of routes) {
    await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
    const measured = await page.evaluate(
      ({ selectorGroups, route }) => {
        const out = [];
        const seen = new Set();

        for (const selector of selectorGroups) {
          const nodes = Array.from(document.querySelectorAll(selector));
          for (const node of nodes) {
            const el = node;
            const rect = el.getBoundingClientRect();
            if (rect.width <= 0 || rect.height <= 0) continue;
            const label =
              el.getAttribute("aria-label") ||
              el.textContent ||
              el.getAttribute("name") ||
              el.getAttribute("id") ||
              selector;
            const key = `${selector}|${label}|${Math.round(rect.width)}|${Math.round(rect.height)}`;
            if (seen.has(key)) continue;
            seen.add(key);
            out.push({
              route,
              selector,
              label: label?.trim() || selector,
              width: Number(rect.width.toFixed(1)),
              height: Number(rect.height.toFixed(1)),
            });
          }
        }
        return out;
      },
      { selectorGroups, route },
    );

    results.push(...measured);
  }

  await browser.close();

  const rows = results.map((item) => ({
    ...item,
    pass: item.height >= minHeight && item.width >= minWidth,
  }));

  const failing = rows.filter((row) => !row.pass);
  const sampled = rows.slice(0, 120);

  const tableLines = [
    "# Mobile Control Audit",
    "",
    `Target minimum: ${minWidth}px x ${minHeight}px`,
    "",
    "| selector | route | min height | min width | pass/fail |",
    "| --- | --- | --- | --- | --- |",
    ...sampled.map(
      (row) =>
        `| \`${safeText(row.selector)} (${safeText(row.label).slice(0, 40)})\` | \`${row.route}\` | ${row.height}px | ${row.width}px | ${row.pass ? "PASS" : "FAIL"} |`,
    ),
  ];

  const docsDir = path.join(process.cwd(), "docs");
  const verificationDir = path.join(docsDir, "verification");
  fs.mkdirSync(verificationDir, { recursive: true });

  fs.writeFileSync(path.join(docsDir, "mobile-control-audit.md"), `${tableLines.join("\n")}\n`, "utf8");
  fs.writeFileSync(
    path.join(verificationDir, "mobile-control-audit.json"),
    JSON.stringify(
      {
        baseUrl,
        target: { minWidth, minHeight },
        checkedAtUtc: new Date().toISOString(),
        totalMeasured: rows.length,
        failingCount: failing.length,
        failing,
      },
      null,
      2,
    ),
    "utf8",
  );

  if (failing.length > 0) {
    console.error(`Control audit failed with ${failing.length} controls below ${minWidth}x${minHeight}.`);
    process.exit(1);
  }

  console.log("Control audit passed.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
