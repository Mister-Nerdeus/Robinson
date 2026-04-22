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
];

for (const filename of requiredCompositionScreens) {
  const absolute = path.join(compositionDir, filename);
  assert.ok(fs.existsSync(absolute), `Missing required composition artifact: ${filename}`);
}

console.log("visual evidence contract ok");
