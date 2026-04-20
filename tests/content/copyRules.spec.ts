import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const bannedPhrases = [
  "contact us for anything",
  "learn more",
  "click here",
  "best-in-class",
  "world class",
];

const contentDir = path.join(process.cwd(), "src", "content");
const files = fs.readdirSync(contentDir).filter((file) => file.endsWith(".ts"));

for (const file of files) {
  const body = fs.readFileSync(path.join(contentDir, file), "utf8").toLowerCase();
  for (const phrase of bannedPhrases) {
    assert.ok(!body.includes(phrase), `Banned phrase '${phrase}' found in ${file}`);
  }
}

console.log("copy rules contract ok");
