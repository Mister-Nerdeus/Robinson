import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

const files = [
  "README.md",
  "docs/mailbox-contract.md",
  "docs/inbound-mail-ops-contract.md",
  "docs/email-domain-contract.md",
  "docs/deliverability-runbook.md",
  "docs/production-cutover-checklist.md",
  "docs/release-readiness-proof-pack.md",
  ".env.example",
  ".env.main.example",
  ".env.develop.example",
];

function run() {
  for (const relativePath of files) {
    const absolutePath = path.join(process.cwd(), relativePath);
    assert.ok(fs.existsSync(absolutePath), `required file missing: ${relativePath}`);

    const content = fs.readFileSync(absolutePath, "utf8");
    const lines = content.split(/\r?\n/);

    lines.forEach((line, index) => {
      if (!line.includes("robinsonseptic.com")) {
        return;
      }
      const lower = line.toLowerCase();
      const explicitlyNonCanonical =
        lower.includes("legacy") || lower.includes("retired") || lower.includes("internal-only");
      assert.ok(
        explicitlyNonCanonical,
        `${relativePath}:${index + 1} contains non-canonical .com reference without explicit legacy marker`,
      );
    });

    assert.ok(content.includes("robinsonseptic.net"), `${relativePath} must contain canonical .net truth`);
  }

  console.log("[net-domain-canonicality] .net canonical domain guard passed");
}

run();
