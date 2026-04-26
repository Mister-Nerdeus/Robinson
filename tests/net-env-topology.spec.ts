import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

function read(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function mustNotContainCom(relativePath: string) {
  const content = read(relativePath);
  assert.ok(!content.includes("robinsonseptic.com"), `${relativePath} must not contain stale .com production values`);
}

function run() {
  const docs = [
    "docs/net-deployment-env-matrix.md",
    "docs/runtime-security-contract.md",
    "docs/production-cutover-checklist.md",
  ];
  for (const doc of docs) {
    assert.ok(fs.existsSync(path.join(process.cwd(), doc)), `missing net env topology artifact: ${doc}`);
  }

  mustNotContainCom(".env.example");
  mustNotContainCom(".env.main.example");
  mustNotContainCom(".env.develop.example");

  const mainEnv = read(".env.main.example");
  const developEnv = read(".env.develop.example");
  const matrix = read("docs/net-deployment-env-matrix.md");

  assert.ok(mainEnv.includes("SITE_URL=https://robinsonseptic.net"), "main env SITE_URL must use canonical .net host");
  assert.ok(
    developEnv.includes("SITE_URL=https://develop.robinsonseptic.net"),
    "develop env SITE_URL must use develop .net host",
  );
  assert.ok(matrix.includes("GoDaddy") && matrix.includes("Cloudflare") && matrix.includes("Railway") && matrix.includes("Microsoft 365"), "env matrix must align with real deployment stack");

  console.log("[net-env-topology] env examples and runtime topology alignment verified");
}

run();
