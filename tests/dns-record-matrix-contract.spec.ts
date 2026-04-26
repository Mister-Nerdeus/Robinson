import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

function read(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function run() {
  const matrixPath = "docs/dns-record-matrix-net.md";
  const guardPath = "docs/dns-collision-guard.md";
  const goLivePath = "docs/cloudflare-go-live-contract.md";

  for (const doc of [matrixPath, guardPath, goLivePath]) {
    assert.ok(fs.existsSync(path.join(process.cwd(), doc)), `missing dns matrix artifact: ${doc}`);
  }

  const matrix = read(matrixPath).toLowerCase();
  const guard = read(guardPath).toLowerCase();

  assert.ok(matrix.includes("one spf") || matrix.includes("only one spf"), "matrix must require one spf policy only");
  assert.ok(matrix.includes("mx") && matrix.includes("priority"), "matrix must document mx ownership/priorities");
  assert.ok(matrix.includes("railway") && matrix.includes("microsoft 365"), "matrix must include railway and microsoft 365 ownership");
  assert.ok(matrix.includes("legacy-remove") && matrix.includes("legacy-verify"), "matrix must status-mark legacy records");

  assert.ok(guard.includes("collision rules"), "collision guard must define explicit collision rules");
  assert.ok(guard.includes("spf"), "collision guard must include spf rule");
  assert.ok(guard.includes("mx"), "collision guard must include mx rule");

  console.log("[dns-record-matrix-contract] dns matrix and collision guard verified");
}

run();
