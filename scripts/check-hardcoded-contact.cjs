const fs = require("node:fs");
const path = require("node:path");

const targets = [path.join(process.cwd(), "src", "app"), path.join(process.cwd(), "src", "components")];
const forbiddenPatterns = [
  /\b\d{3}[-.)\s]?\d{3}[-.\s]?\d{4}\b/g,
  /\b\d+\s+[A-Za-z0-9.'\-\s]+\b(?:Street|St|Avenue|Ave|Road|Rd|Lane|Ln|Drive|Dr)\b/gi,
];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    if (!/\.(ts|tsx)$/.test(entry.name)) return [];
    return [full];
  });
}

let failed = false;
for (const dir of targets) {
  if (!fs.existsSync(dir)) continue;
  for (const file of walk(dir)) {
    const text = fs.readFileSync(file, "utf8");
    for (const pattern of forbiddenPatterns) {
      if (pattern.test(text)) {
        console.error(`[hardcoded-contact] forbidden pattern in ${path.relative(process.cwd(), file)}`);
        failed = true;
      }
    }
  }
}

if (failed) {
  process.exit(1);
}

console.log("[hardcoded-contact] pass");
