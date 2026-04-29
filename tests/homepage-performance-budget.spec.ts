import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { homepageContract } from "../src/content/homepageContract";

function run() {
  const artifactPath = path.join(process.cwd(), homepageContract.performance.artifactPath);
  assert.ok(fs.existsSync(artifactPath), "Homepage performance artifact must exist");

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.equal(artifact.artifactVersion, homepageContract.performance.version, "Homepage performance artifact version must stay explicit");
  assert.equal(artifact.measurementMode, "playwright-local", "Homepage performance audit must stay local and reproducible");
  assert.equal(artifact.heroMediaMode, homepageContract.performance.heroMediaMode, "Homepage performance artifact must record static hero media mode");
  assert.ok(Array.isArray(artifact.results) && artifact.results.length === 2, "Homepage performance artifact must include mobile and desktop results");
  assert.deepEqual(artifact.failedModes, [], "Homepage performance artifact must not report failing modes");
  assert.equal(artifact.pass, true, "Homepage performance artifact must pass overall");

  for (const mode of ["mobile", "desktop"] as const) {
    const result = artifact.results.find((entry: { mode: string }) => entry.mode === mode);
    assert.ok(result, `Homepage performance artifact missing ${mode} result`);
    assert.equal(typeof result.pass, "boolean", `${mode} result must include pass/fail`);
    assert.equal(result.pass, true, `${mode} result must pass`);
    assert.equal(result.checks.lcp, true, `${mode} LCP must pass budget`);
    assert.equal(result.checks.fcp, true, `${mode} FCP must pass budget`);
    assert.equal(result.checks.ttfb, true, `${mode} TTFB must pass budget`);
    assert.equal(result.checks.heroHeadingVisible, true, `${mode} hero heading must remain visible in the first viewport`);
    assert.equal(result.checks.heroCallVisible, true, `${mode} hero call CTA must remain visible in the first viewport`);
    assert.equal(result.checks.heroRequestVisible, true, `${mode} hero request CTA must remain visible in the first viewport`);
  }

  const pageSource = fs.readFileSync(path.join(process.cwd(), "src/app/page.tsx"), "utf8");
  assert.ok(pageSource.includes("HeroMedia"), "Homepage performance contract requires static hero media");
  assert.ok(!pageSource.includes("HomeSlideshow"), "Homepage performance contract forbids slideshow hero without contract change");

  console.log("[homepage-performance-budget] homepage performance and first-viewport conversion verified");
}

run();
