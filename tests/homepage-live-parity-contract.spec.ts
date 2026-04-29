import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { homepageContract } from "../src/content/homepageContract";

function run() {
  const artifactPath = path.join(process.cwd(), homepageContract.liveParity.artifactPath);
  assert.ok(fs.existsSync(artifactPath), "Homepage live parity artifact must exist");

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.equal(artifact.artifactVersion, homepageContract.liveParity.version, "Live parity artifact version must stay explicit");
  assert.equal(artifact.contractVersion, homepageContract.version, "Live parity artifact must bind to homepage contract version");
  assert.ok(typeof artifact.measuredAtUtc === "string" && artifact.measuredAtUtc.length > 0, "Live parity artifact must include measuredAtUtc");

  for (const screenshot of Object.values(homepageContract.liveParity.screenshots)) {
    assert.ok(fs.existsSync(path.join(process.cwd(), screenshot)), `Missing homepage parity screenshot: ${screenshot}`);
  }

  for (const target of ["develop", "demo"] as const) {
    const result = artifact[target];
    assert.ok(result, `Homepage parity artifact must include ${target} result`);
    assert.equal(result.pass, true, `${target} homepage must satisfy the homepage contract`);
    assert.deepEqual(result.driftSignals, [], `${target} homepage must not expose legacy drift signals`);
    assert.equal(result.checks.heroHeading, true, `${target} hero heading must match contract`);
    assert.equal(result.checks.chooserHeading, true, `${target} chooser heading must match contract`);
    assert.equal(result.checks.trustBandPresent, true, `${target} trust band must be present`);
    assert.equal(result.checks.realtorBandPresent, true, `${target} Realtor band must be present`);
    assert.equal(result.checks.finalCtaHeading, true, `${target} final CTA wording must match contract`);
    assert.equal(result.checks.footerCompactness, true, `${target} footer compactness marker must match contract`);
  }

  assert.equal(artifact.parity.heroHeadingMatches, true, "Develop and demo hero headings must match");
  assert.equal(artifact.parity.chooserHeadingMatches, true, "Develop and demo chooser headings must match");
  assert.equal(artifact.parity.trustBandMatches, true, "Develop and demo trust band titles must match");
  assert.equal(artifact.parity.realtorBandMatches, true, "Develop and demo Realtor band titles must match");
  assert.equal(artifact.parity.finalCtaMatches, true, "Develop and demo final CTA wording must match");
  assert.equal(artifact.parity.footerMatches, true, "Develop and demo footer compactness markers must match");
  assert.equal(artifact.pass, true, "Homepage live parity artifact must pass overall");

  console.log("[homepage-live-parity-contract] develop/demo homepage parity verified");
}

run();
