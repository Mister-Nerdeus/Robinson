import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

function read(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function readEnvValue(content: string, key: string): string {
  const line = content
    .split(/\r?\n/)
    .find((entry) => entry.startsWith(`${key}=`));
  return line ? line.slice(key.length + 1).trim() : "";
}

function run() {
  const topologyDoc = read("docs/railway-domain-topology-contract.md").toLowerCase();
  assert.ok(topologyDoc.includes("canonical public host"), "topology contract must define canonical host");
  assert.ok(topologyDoc.includes("redirect"), "topology contract must define redirect behavior");
  assert.ok(topologyDoc.includes("ssl/tls mode") && topologyDoc.includes("full"), "topology contract must include cloudflare ssl mode guidance");

  const canonicalHostMentions = (topologyDoc.match(/\n- canonical public host:/g) || []).length;
  assert.equal(canonicalHostMentions, 1, "exactly one canonical public host decision must be documented");

  const mainEnv = read(".env.main.example");
  const developEnv = read(".env.develop.example");

  assert.equal(readEnvValue(mainEnv, "SITE_URL"), "https://robinsonseptic.net", "main SITE_URL must match canonical host");
  assert.equal(
    readEnvValue(developEnv, "SITE_URL"),
    "https://develop.robinsonseptic.net",
    "develop SITE_URL must match review host",
  );

  console.log("[canonical-host-topology] canonical host and redirect topology verified");
}

run();
