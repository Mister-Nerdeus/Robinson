import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

function read(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function run() {
  const workflow = read(".github/workflows/public-gates.yml");
  assert.ok(
    workflow.includes("verify:deploy-manifest"),
    "CI must generate deploy manifest evidence",
  );
  assert.ok(
    workflow.includes("verify:request-route-parity"),
    "CI must run request-route parity verification",
  );
  assert.ok(
    workflow.includes("actions/upload-artifact"),
    "CI must upload parity and manifest artifacts",
  );

  const manifestScript = read("scripts/generate-deploy-manifest.mjs");
  assert.ok(
    manifestScript.includes("requestLayoutContractVersion"),
    "Deploy manifest must include request layout contract version",
  );
  assert.ok(
    manifestScript.includes("requestRoutes"),
    "Deploy manifest must include routed surfaces under gate",
  );

  const parityScript = read("scripts/verify-request-route-parity.mjs");
  assert.ok(
    parityScript.includes("max-manifest-age-minutes"),
    "Parity script must fail when deploy manifest is stale",
  );

  console.log("[deploy-traceability-contract] manifest + parity CI contract wiring pass");
}

run();
