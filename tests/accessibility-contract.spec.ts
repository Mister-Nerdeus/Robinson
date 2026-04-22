import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

function read(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function run() {
  const requiredRoutes = [
    "src/app/page.tsx",
    "src/app/services/page.tsx",
    "src/app/services/septic-cleaning/page.tsx",
    "src/app/services/well-septic-evaluations/page.tsx",
    "src/app/services/portable-toilets/page.tsx",
    "src/app/services/commercial/page.tsx",
    "src/app/faq/page.tsx",
    "src/app/contact/page.tsx",
    "src/app/privacy/page.tsx",
  ];

  for (const routeFile of requiredRoutes) {
    assert.ok(fs.existsSync(path.join(process.cwd(), routeFile)), `Missing accessibility audit route: ${routeFile}`);
  }

  const headerSource = read("src/components/site/Header.tsx");
  assert.ok(headerSource.includes('aria-controls="mobile-site-nav"'), "Mobile menu must expose aria-controls");
  assert.ok(headerSource.includes('aria-expanded={mobileMenuOpen}'), "Mobile menu must expose aria-expanded");

  const requestFormSource = read("src/components/forms/RequestForm.tsx");
  assert.ok(
    requestFormSource.includes('aria-live="polite"'),
    "Form status messages must announce accessibility state changes",
  );
  assert.ok(
    requestFormSource.includes('aria-atomic="true"'),
    "Form status announcement must be atomic for assistive technologies",
  );
  assert.ok(
    requestFormSource.includes("fieldAutocompleteMap"),
    "RequestForm must use shared autocomplete mapping",
  );

  const formFieldSource = read("src/components/forms/FormField.tsx");
  assert.ok(
    formFieldSource.includes("aria-describedby"),
    "FormField controls must associate helper/error text with aria-describedby",
  );
  assert.ok(
    formFieldSource.includes("htmlFor={fieldId}"),
    "FormField labels must be explicitly associated with controls",
  );

  console.log("[accessibility-contract] required routes and form/live-region accessibility baseline verified");
}

run();
