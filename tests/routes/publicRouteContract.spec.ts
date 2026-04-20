import assert from "node:assert/strict";
import fs from "node:fs";

const requiredRoutes = [
  "src/app/page.tsx",
  "src/app/contact/page.tsx",
  "src/app/realtors/page.tsx",
  "src/app/services/portable-toilets/page.tsx",
  "src/app/services/commercial/page.tsx",
  "src/app/faq/page.tsx",
  "src/app/privacy/page.tsx",
  "src/app/terms/page.tsx",
  "src/app/accessibility/page.tsx",
];

for (const routeFile of requiredRoutes) {
  assert.ok(fs.existsSync(routeFile), `Missing required route file: ${routeFile}`);
}

console.log("public route contract ok");
