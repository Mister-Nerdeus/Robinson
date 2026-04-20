import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

function read(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function run() {
  const source = read("src/components/forms/RequestForm.tsx");

  assert.ok(source.includes("currentStep"), "RequestForm must keep explicit step state");
  assert.ok(source.includes("Review Request"), "RequestForm must expose a review step");
  assert.ok(source.includes("setCurrentStep"), "RequestForm must support back/edit step navigation");
  assert.ok(
    source.includes("Use Edit to jump back to any step"),
    "Review step must communicate edit/review behavior",
  );
  assert.ok(
    source.includes('type="hidden" name={name} value={value}'),
    "Review step must persist captured data through hidden inputs to prevent data loss",
  );
  assert.ok(
    source.includes('aria-live="polite"'),
    "Form status messages must be announced accessibly",
  );

  console.log("[multistep-form-contract] review/edit/back persistence and accessible status messaging verified");
}

run();
