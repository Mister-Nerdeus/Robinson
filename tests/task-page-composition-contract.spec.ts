import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

function read(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function run() {
  const modeRoutes = [
    "src/app/contact/page.tsx",
    "src/app/realtors/page.tsx",
    "src/app/services/portable-toilets/page.tsx",
    "src/app/services/commercial/page.tsx",
  ];

  for (const file of modeRoutes) {
    const source = read(file);
    assert.ok(
      source.includes('mode="support-rail"'),
      `${file} must declare support-rail mode explicitly`,
    );
    assert.ok(
      source.includes('mode="full-width"'),
      `${file} must declare full-width mode explicitly`,
    );
    assert.ok(
      source.includes('primaryClassName="task-page-form-shell"'),
      `${file} must bind full-width form-shell class for desktop composition`,
    );
  }

  const requestLayoutSource = read("src/components/site/RequestPageLayout.tsx");
  assert.ok(
    requestLayoutSource.includes("data-request-layout-modes"),
    "RequestPageLayout must publish layout mode inventory marker",
  );
  assert.ok(
    requestLayoutSource.includes("data-request-layout-geometry=\"explicit-section-modes\""),
    "RequestPageLayout must expose explicit section mode geometry marker",
  );

  console.log("[task-page-composition-contract] route mode declarations and request geometry markers pass");
}

run();
