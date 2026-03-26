import fs from "node:fs";
import path from "node:path";

const targets = [path.join(process.cwd(), "src", "app"), path.join(process.cwd(), "src", "content")];
const blockedClaims = [
  /bbb accredited/i,
  /hundreds of reviews/i,
  /thousands of reviews/i,
];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    if (!/\.(ts|tsx)$/.test(entry.name)) return [];
    return [full];
  });
}

let fail = false;
for (const dir of targets) {
  if (!fs.existsSync(dir)) continue;
  for (const file of walk(dir)) {
    const text = fs.readFileSync(file, "utf8");
    for (const claim of blockedClaims) {
      if (claim.test(text)) {
        console.error(`[provisional-claims] blocked claim detected in ${path.relative(process.cwd(), file)}`);
        fail = true;
      }
    }
  }
}

if (fail) process.exit(1);
console.log("[provisional-claims] pass");
