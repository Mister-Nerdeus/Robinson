import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const artifactRelativePath = "docs/verification/mobile-action-rail-contract.json";
const requiredScreens = [
  "docs/screenshots/mobile-action-rail-home-390.png",
  "docs/screenshots/mobile-action-rail-contact-390.png",
  "docs/screenshots/mobile-action-rail-service-390.png",
];

function read(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function run() {
  const artifactPath = path.join(process.cwd(), artifactRelativePath);
  assert.ok(fs.existsSync(artifactPath), "Mobile action-rail contract artifact must exist");
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

  assert.equal(artifact.artifactVersion, "mobile-action-rail-contract-v1", "Artifact version must stay explicit");
  assert.ok(Array.isArray(artifact.routes), "Mobile action-rail artifact must include route results");
  assert.ok(artifact.routes.length >= 4, "Artifact must include homepage, contact, service, and non-form routes");
  assert.equal(Array.isArray(artifact.failingRoutes), true, "Artifact must expose failingRoutes");
  assert.equal(artifact.failingRoutes.length, 0, "Mobile action-rail contract must pass for governed routes");

  const requiredRoutes = ["/", "/contact", "/services/septic-cleaning", "/faq"];
  for (const route of requiredRoutes) {
    const row = artifact.routes.find((entry: { route: string }) => entry.route === route);
    assert.ok(row, `Missing mobile action-rail route evidence for ${route}`);
    assert.equal(typeof row.pass, "boolean", `Route ${route} must include pass/fail`);
    assert.equal(typeof row.screenshotPath, "string", `Route ${route} must include screenshot path`);
    assert.ok(fs.existsSync(path.join(process.cwd(), row.screenshotPath)), `Missing screenshot proof for ${route}: ${row.screenshotPath}`);
  }

  for (const screenshot of requiredScreens) {
    assert.ok(fs.existsSync(path.join(process.cwd(), screenshot)), `Required screenshot missing: ${screenshot}`);
  }

  const globalsCss = read("src/app/globals.css");
  assert.ok(
    globalsCss.includes("--mobile-action-rail-height"),
    "Global styles must define a shared mobile action-rail height token",
  );
  assert.ok(
    globalsCss.includes("env(safe-area-inset-bottom)"),
    "Global styles must include safe-area inset handling",
  );
  assert.ok(
    globalsCss.includes("body.site-shell"),
    "Global styles must implement shared site-shell padding contract",
  );

  const layout = read("src/app/layout.tsx");
  assert.ok(layout.includes('className="site-shell"'), "Layout must opt into shared site-shell padding contract");

  const rail = read("src/components/site/MobileActionRail.tsx");
  assert.ok(rail.includes("data-mobile-action-rail"), "Mobile action rail must expose contract marker");
  assert.ok(rail.includes("publicCta.global.call.label"), "Mobile action rail must keep canonical call CTA");
  assert.ok(rail.includes("publicCta.global.request.label"), "Mobile action rail must keep canonical request CTA");

  console.log("[mobile-action-rail-contract] overlap + safe-area contract verified");
}

run();
