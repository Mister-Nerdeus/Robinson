import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const manifestRelativePath = "docs/screenshots/homepage-ux-evidence-manifest.json";

function gitHead(): string {
  try {
    return execSync("git rev-parse HEAD", { encoding: "utf8" }).trim();
  } catch {
    return "unknown";
  }
}

function run() {
  const manifestAbsolutePath = path.join(process.cwd(), manifestRelativePath);
  assert.ok(fs.existsSync(manifestAbsolutePath), "Homepage UX evidence manifest must exist");

  const manifest = JSON.parse(fs.readFileSync(manifestAbsolutePath, "utf8"));
  assert.equal(manifest.manifestVersion, "homepage-ux-evidence-v1", "Manifest version must remain explicit");
  assert.equal(manifest.issueBatch, "254-259", "Manifest must bind evidence to issue batch 254-259");
  assert.equal(manifest.captureMethod, "playwright-local", "Manifest capture method must remain explicit");
  assert.ok(typeof manifest.generatedAtUtc === "string" && manifest.generatedAtUtc.length > 0, "Manifest must include generatedAtUtc");

  const now = Date.now();
  const generatedAt = Date.parse(manifest.generatedAtUtc);
  assert.ok(Number.isFinite(generatedAt), "Manifest generatedAtUtc must parse");
  const maxAgeMs = 1000 * 60 * 60 * 24 * 30;
  assert.ok(now - generatedAt <= maxAgeMs, "Manifest must be refreshed within the last 30 days");

  assert.ok(manifest.provenance, "Manifest must include provenance");
  assert.equal(manifest.provenance.sourceCommit, gitHead(), "Manifest must bind evidence to current source commit");
  assert.equal(typeof manifest.provenance.worktreeDirty, "boolean", "Manifest provenance must include worktree dirty flag");

  assert.ok(Array.isArray(manifest.contractReferences), "Manifest must include contract references");
  assert.ok(manifest.contractReferences.length >= 6, "Manifest must include homepage contract references");
  for (const contractPath of manifest.contractReferences) {
    assert.ok(fs.existsSync(path.join(process.cwd(), contractPath)), `Manifest contract ref must exist: ${contractPath}`);
  }

  assert.ok(Array.isArray(manifest.entries), "Manifest must include screenshot entries");
  assert.ok(manifest.entries.length >= 6, "Manifest must include homepage/public route evidence entries");
  for (const entry of manifest.entries) {
    assert.ok(typeof entry.route === "string" && entry.route.length > 0, "Manifest entry must include route");
    assert.ok(typeof entry.viewport === "string" && entry.viewport.length > 0, "Manifest entry must include viewport");
    assert.ok(typeof entry.artifactPath === "string" && entry.artifactPath.length > 0, "Manifest entry must include artifactPath");
    assert.ok(typeof entry.captureScript === "string" && entry.captureScript.length > 0, "Manifest entry must include captureScript");
    assert.ok(typeof entry.capturedAtUtc === "string" && entry.capturedAtUtc.length > 0, "Manifest entry must include capturedAtUtc");
    assert.ok(fs.existsSync(path.join(process.cwd(), entry.artifactPath)), `Manifest artifact missing: ${entry.artifactPath}`);
  }

  console.log("[homepage-evidence-manifest-contract] schema, freshness, and provenance binding verified");
}

run();
