import assert from "node:assert/strict";
import fs from "node:fs";

assert.ok(fs.existsSync("docs/PUBLIC_ROUTE_QA_MATRIX.md"), "PUBLIC_ROUTE_QA_MATRIX.md is required");

const screenshotsDir = "docs/screenshots";
assert.ok(fs.existsSync(screenshotsDir), "docs/screenshots directory is required");

console.log("visual evidence contract ok");
