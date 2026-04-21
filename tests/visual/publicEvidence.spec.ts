import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

assert.ok(fs.existsSync("docs/PUBLIC_ROUTE_QA_MATRIX.md"), "PUBLIC_ROUTE_QA_MATRIX.md is required");

const screenshotsDir = "docs/screenshots";
assert.ok(fs.existsSync(screenshotsDir), "docs/screenshots directory is required");

const compositionDir = path.join(screenshotsDir, "issues-143-152");
assert.ok(
  fs.existsSync(compositionDir),
  "issues-143-152 desktop composition evidence directory is required",
);

const requiredCompositionScreens = [
  "septic-cleaning-desktop-1280.png",
  "septic-cleaning-desktop-1440.png",
  "contact-desktop-1280.png",
  "contact-desktop-1440.png",
  "well-septic-evaluations-desktop-1280.png",
  "portable-toilets-desktop-1280.png",
  "composition-audit.json",
];

for (const filename of requiredCompositionScreens) {
  const absolute = path.join(compositionDir, filename);
  assert.ok(fs.existsSync(absolute), `Missing required composition artifact: ${filename}`);
}

console.log("visual evidence contract ok");
