import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const manifestPath = path.join(
  process.cwd(),
  "docs",
  "screenshots",
  "homepage-ux-evidence-manifest.json",
);

const screenshotEntries = [
  { route: "/", viewport: "desktop-1440", artifactPath: "docs/screenshots/home-desktop-1440.png" },
  { route: "/", viewport: "mobile-390", artifactPath: "docs/screenshots/home-mobile-390.png" },
  { route: "/", viewport: "desktop-1440-header", artifactPath: "docs/screenshots/header-desktop-1440.png" },
  { route: "/", viewport: "desktop-1440-footer", artifactPath: "docs/screenshots/home-footer-desktop-1440.png" },
  { route: "/contact", viewport: "mobile-390", artifactPath: "docs/screenshots/contact-mobile-390.png" },
  { route: "/services/septic-cleaning", viewport: "mobile-390", artifactPath: "docs/screenshots/septic-cleaning-mobile-390.png" },
  { route: "/faq", viewport: "mobile-390", artifactPath: "docs/screenshots/issue-83-94-faq-mobile-390.png" },
];

const contractReferences = [
  "docs/homepage-apple-ux-gate.md",
  "docs/public-cta-contract.md",
  "docs/homepage-copy-contract.md",
  "docs/homepage-grid-contract.md",
  "docs/homepage-ia-contract.md",
  "docs/header-action-hierarchy-contract.md",
  "docs/footer-surface-contract.md",
  "docs/mobile-action-rail-contract.md",
];

function shell(command) {
  return execSync(command, { encoding: "utf8" }).trim();
}

function getGitProvenance() {
  try {
    const commit = shell("git rev-parse HEAD");
    const branch = shell("git rev-parse --abbrev-ref HEAD");
    const dirty = shell("git status --porcelain").length > 0;
    return { commit, branch, dirty };
  } catch {
    return { commit: "unknown", branch: "unknown", dirty: true };
  }
}

function run() {
  const missingScreens = screenshotEntries.filter(
    (entry) => !fs.existsSync(path.join(process.cwd(), entry.artifactPath)),
  );
  if (missingScreens.length > 0) {
    throw new Error(
      `Missing screenshot evidence files: ${missingScreens.map((entry) => entry.artifactPath).join(", ")}`,
    );
  }

  const missingContracts = contractReferences.filter(
    (entry) => !fs.existsSync(path.join(process.cwd(), entry)),
  );
  if (missingContracts.length > 0) {
    throw new Error(`Missing contract references: ${missingContracts.join(", ")}`);
  }

  const now = new Date().toISOString();
  const git = getGitProvenance();

  const manifest = {
    manifestVersion: "homepage-ux-evidence-v1",
    issueBatch: "254-259",
    generatedAtUtc: now,
    captureMethod: "playwright-local",
    provenance: {
      sourceCommit: git.commit,
      sourceBranch: git.branch,
      worktreeDirty: git.dirty,
    },
    contractReferences,
    entries: screenshotEntries.map((entry) => ({
      ...entry,
      capturedAtUtc: now,
      captureScript: "scripts/capture-screenshots.mjs",
    })),
  };

  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
  console.log(`[homepage-ux-evidence-manifest] wrote ${manifestPath}`);
}

run();
