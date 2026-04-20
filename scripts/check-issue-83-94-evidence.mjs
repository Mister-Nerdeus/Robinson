import fs from "node:fs";
import path from "node:path";

const requiredFiles = [
  "docs/issue-closeouts-83-94.md",
  "docs/mobile-control-audit.md",
  "docs/verification/mobile-control-audit.json",
  "docs/screenshots/issue-83-94-home-desktop-1440.png",
  "docs/screenshots/issue-83-94-contact-mobile-390.png",
];

const missing = requiredFiles.filter((relative) => !fs.existsSync(path.join(process.cwd(), relative)));

if (missing.length > 0) {
  console.error("Issue 83-94 evidence gate failed. Missing files:");
  for (const file of missing) {
    console.error(`- ${file}`);
  }
  process.exit(1);
}

console.log("Issue 83-94 evidence gate passed.");
