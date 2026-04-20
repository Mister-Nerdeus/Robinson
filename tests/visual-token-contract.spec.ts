import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

function read(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function run() {
  const globals = read("src/app/globals.css");
  const requiredTokens = [
    "--font-display",
    "--font-body",
    "--space-section-y",
    "--space-card-pad",
    "--radius-section",
    "--radius-card",
    "--shadow-card",
  ];

  for (const token of requiredTokens) {
    assert.ok(globals.includes(token), `Missing visual token: ${token}`);
  }

  assert.ok(globals.includes(".surface-card"), "Globals must define surface-card tokenized primitive");
  assert.ok(globals.includes(".surface-section"), "Globals must define surface-section tokenized primitive");

  const requestForm = read("src/components/forms/RequestForm.tsx");
  assert.ok(
    requestForm.includes("rounded-[var(--radius-section)]"),
    "Request form shell must consume radius token",
  );
  assert.ok(
    requestForm.includes("p-[var(--space-card-pad)]"),
    "Request form cards must consume spacing token",
  );

  console.log("[visual-token-contract] typography/spacing/radius/shadow token primitives are enforced");
}

run();
