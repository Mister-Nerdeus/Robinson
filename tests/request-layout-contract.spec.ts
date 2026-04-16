import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

function read(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function run() {
  const routeFiles: Array<{ file: string; routeId: string }> = [
    { file: "src/app/services/septic-cleaning/page.tsx", routeId: "/services/septic-cleaning" },
    { file: "src/app/services/well-septic-evaluations/page.tsx", routeId: "/services/well-septic-evaluations" },
    { file: "src/app/services/portable-toilets/page.tsx", routeId: "/services/portable-toilets" },
    { file: "src/app/services/commercial/page.tsx", routeId: "/services/commercial" },
    { file: "src/app/contact/page.tsx", routeId: "/contact" },
  ];

  for (const route of routeFiles) {
    const source = read(route.file);
    assert.ok(
      source.includes("RequestPageLayout"),
      `${route.file} must use RequestPageLayout`,
    );
    assert.ok(
      source.includes(`routeId="${route.routeId}"`),
      `${route.file} must declare routeId ${route.routeId}`,
    );
  }

  const globalsCss = read("src/app/globals.css");
  assert.ok(
    globalsCss.includes(".request-page-form"),
    "Global styles must include request-page-form styling",
  );
  assert.ok(
    globalsCss.includes(".request-page-post-form"),
    "Global styles must include request-page-post-form zone styling",
  );

  console.log("[request-layout-contract] request-heavy routes use shared RequestPageLayout contract");
}

run();
