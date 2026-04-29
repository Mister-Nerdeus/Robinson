import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { homepageContract } from "../src/content/homepageContract";

function read(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function run() {
  const artifactPath = path.join(process.cwd(), homepageContract.mobileConversion.artifactPath);
  assert.ok(fs.existsSync(artifactPath), "Homepage mobile conversion artifact must exist");

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.equal(artifact.artifactVersion, homepageContract.mobileConversion.version, "Homepage mobile conversion artifact version must stay explicit");
  assert.deepEqual(artifact.failingStates, [], "Homepage mobile conversion artifact must not report failing states");
  assert.equal(artifact.pass, true, "Homepage mobile conversion artifact must pass overall");

  for (const screenshot of Object.values(homepageContract.mobileConversion.screenshots)) {
    assert.ok(fs.existsSync(path.join(process.cwd(), screenshot)), `Missing homepage mobile proof screenshot: ${screenshot}`);
  }

  for (const state of ["first-viewport", "midpage", "final-cta"]) {
    const row = artifact.states.find((entry: { state: string }) => entry.state === state);
    assert.ok(row, `Homepage mobile conversion artifact missing state ${state}`);
    assert.equal(row.pass, true, `Homepage mobile state ${state} must pass`);
  }

  const globalsCss = read("src/app/globals.css");
  assert.ok(globalsCss.includes("--mobile-action-rail-height"), "Global styles must keep the mobile rail height token");
  assert.ok(globalsCss.includes("env(safe-area-inset-bottom)"), "Global styles must keep safe-area handling");

  const layoutSource = read("src/app/layout.tsx");
  assert.ok(layoutSource.includes("site-shell"), "Layout must keep shared body padding contract for mobile rail");

  console.log("[homepage-mobile-conversion-contract] homepage mobile conversion proof verified");
}

run();
