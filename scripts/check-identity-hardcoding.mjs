import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const scanRoots = ["src/app", "src/components"];
const fileExtensions = new Set([".ts", ".tsx"]);

const forbiddenLiterals = [
  "Robinson Septic Cleaning",
  "Robinson Septic Tank Cleaning",
  "Robinson Septic Tank Cleaning LLC",
  "(616) 636-5565",
  "(616) 887-2060",
  "(231) 937-8383",
  "1565 N Dagget Rd",
  "Pierson, MI 49339",
];

function walk(dir, acc) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, acc);
      continue;
    }
    if (fileExtensions.has(path.extname(entry.name))) {
      acc.push(full);
    }
  }
}

const files = [];
for (const root of scanRoots) {
  const fullRoot = path.join(rootDir, root);
  if (fs.existsSync(fullRoot)) {
    walk(fullRoot, files);
  }
}

const violations = [];
for (const file of files) {
  const source = fs.readFileSync(file, "utf8");
  for (const forbidden of forbiddenLiterals) {
    if (source.includes(forbidden)) {
      violations.push({
        file: path.relative(rootDir, file).replace(/\\/g, "/"),
        forbidden,
      });
    }
  }
}

if (violations.length > 0) {
  console.error("Identity hardcoding contract failed.");
  for (const violation of violations) {
    console.error(`- ${violation.file}: "${violation.forbidden}"`);
  }
  console.error("Use src/config/company.ts or src/content/* modules for identity data.");
  process.exit(1);
}

console.log("Identity hardcoding contract passed.");
