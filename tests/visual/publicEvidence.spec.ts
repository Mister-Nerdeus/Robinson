import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

assert.ok(fs.existsSync("docs/PUBLIC_ROUTE_QA_MATRIX.md"), "PUBLIC_ROUTE_QA_MATRIX.md is required");

const screenshotsDir = "docs/screenshots";
assert.ok(fs.existsSync(screenshotsDir), "docs/screenshots directory is required");

const compositionDir = path.join(screenshotsDir, "issues-163-172");
assert.ok(
  fs.existsSync(compositionDir),
  "issues-163-172 composition evidence directory is required",
);

const requiredCompositionScreens = [
  "septic-cleaning-desktop-1280.png",
  "septic-cleaning-desktop-1440.png",
  "contact-desktop-1280.png",
  "contact-desktop-1440.png",
  "well-septic-evaluations-desktop-1280.png",
  "well-septic-evaluations-desktop-1440.png",
  "portable-toilets-desktop-1280.png",
  "portable-toilets-desktop-1440.png",
  "commercial-desktop-1280.png",
  "commercial-desktop-1440.png",
  "realtors-desktop-1280.png",
  "realtors-desktop-1440.png",
  "septic-cleaning-mobile-390.png",
  "contact-mobile-390.png",
  "well-septic-evaluations-mobile-390.png",
  "portable-toilets-mobile-390.png",
  "commercial-mobile-390.png",
  "realtors-mobile-390.png",
  "composition-audit.json",
  "before-after-matrix.json",
];

for (const filename of requiredCompositionScreens) {
  const absolute = path.join(compositionDir, filename);
  assert.ok(fs.existsSync(absolute), `Missing required composition artifact: ${filename}`);
}

const matrixPath = path.join(compositionDir, "before-after-matrix.json");
const matrix = JSON.parse(fs.readFileSync(matrixPath, "utf8"));
assert.ok(Array.isArray(matrix.pairs), "before-after matrix must include pairs");
assert.ok(matrix.pairs.length >= 18, "before-after matrix must include desktop and mobile pairs for all task routes");

for (const pair of matrix.pairs) {
  assert.ok(typeof pair.route === "string" && pair.route.length > 0, "pair route must be present");
  assert.ok(typeof pair.viewport === "string" && pair.viewport.length > 0, "pair viewport must be present");
  const beforeAbsolute = path.join(process.cwd(), pair.before);
  const afterAbsolute = path.join(process.cwd(), pair.after);
  assert.ok(fs.existsSync(beforeAbsolute), `Missing before screenshot pair file: ${pair.before}`);
  assert.ok(fs.existsSync(afterAbsolute), `Missing after screenshot pair file: ${pair.after}`);
}

const batchDir = path.join(screenshotsDir, "issues-185-196");
assert.ok(
  fs.existsSync(batchDir),
  "issues-185-196 screenshot proof directory is required",
);

const requiredBatchScreens = [
  "home-desktop-1280.png",
  "home-desktop-1440.png",
  "home-mobile-390.png",
  "contact-desktop-1280.png",
  "contact-desktop-1440.png",
  "contact-mobile-390.png",
  "septic-cleaning-desktop-1280.png",
  "septic-cleaning-desktop-1440.png",
  "septic-cleaning-mobile-390.png",
  "well-septic-evaluations-desktop-1280.png",
  "well-septic-evaluations-desktop-1440.png",
  "well-septic-evaluations-mobile-390.png",
  "portable-toilets-desktop-1280.png",
  "portable-toilets-desktop-1440.png",
  "portable-toilets-mobile-390.png",
  "commercial-desktop-1280.png",
  "commercial-desktop-1440.png",
  "commercial-mobile-390.png",
];

for (const filename of requiredBatchScreens) {
  const absolute = path.join(batchDir, filename);
  assert.ok(fs.existsSync(absolute), `Missing required batch screenshot artifact: ${filename}`);
}

console.log("visual evidence contract ok");
