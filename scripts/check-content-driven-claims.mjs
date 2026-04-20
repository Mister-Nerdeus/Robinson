import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const appDir = path.join(rootDir, "src", "app");

const forbiddenPageLocalClaims = [
  "Family owned and operated since 1979",
  "24/7 Emergency Service for urgent septic calls",
  "Member of the Michigan Septic Tank Association",
  "How often should I have my septic tanks pumped?",
  "What affects septic pumping price?",
  "What warning signs mean I should call now?",
  "What details should I include in a service request?",
  "Do I need to be home during septic service?",
  "How should Realtors submit evaluation requests?",
  "Can portable toilet rentals include regular maintenance?",
];

const requiredBindings = [
  { file: "src/app/page.tsx", token: "trustContent" },
  { file: "src/app/page.tsx", token: "homeContent.faqPreview" },
  { file: "src/app/faq/page.tsx", token: "faqContent.map" },
];

function walk(dir, acc) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, acc);
      continue;
    }
    if (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")) {
      acc.push(full);
    }
  }
}

const files = [];
walk(appDir, files);

const violations = [];
for (const file of files) {
  const source = fs.readFileSync(file, "utf8");
  for (const claim of forbiddenPageLocalClaims) {
    if (source.includes(claim)) {
      violations.push({
        file: path.relative(rootDir, file).replace(/\\/g, "/"),
        claim,
      });
    }
  }
}

for (const binding of requiredBindings) {
  const source = fs.readFileSync(path.join(rootDir, binding.file), "utf8");
  if (!source.includes(binding.token)) {
    violations.push({
      file: binding.file,
      claim: `missing required content binding: ${binding.token}`,
    });
  }
}

if (violations.length > 0) {
  console.error("Content-driven claims contract failed.");
  for (const violation of violations) {
    console.error(`- ${violation.file}: ${violation.claim}`);
  }
  console.error("Keep FAQ and trust claims in src/content modules, not page-local strings.");
  process.exit(1);
}

console.log("Content-driven claims contract passed.");
