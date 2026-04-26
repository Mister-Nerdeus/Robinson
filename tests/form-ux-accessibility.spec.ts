import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

function read(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function run() {
  const routePages = [
    "src/app/contact/page.tsx",
    "src/app/services/septic-cleaning/page.tsx",
    "src/app/services/well-septic-evaluations/page.tsx",
    "src/app/services/portable-toilets/page.tsx",
    "src/app/services/commercial/page.tsx",
  ];
  for (const page of routePages) {
    assert.ok(fs.existsSync(path.join(process.cwd(), page)), `missing core lane page: ${page}`);
  }

  const requestForm = read("src/components/forms/RequestForm.tsx");
  assert.ok(requestForm.includes("onFocusCapture"), "form keyboard focus flow must be tracked at form root");
  assert.ok(requestForm.includes("aria-live=\"polite\""), "success/error updates must be announced to assistive tech");
  assert.ok(requestForm.includes("WizardActions"), "multi-step navigation controls must stay explicit");

  const field = read("src/components/forms/FormField.tsx");
  assert.ok(field.includes("htmlFor={fieldId}"), "labels must map to controls");
  assert.ok(field.includes("aria-describedby"), "helper/error text must be associated with controls");

  const errorState = read("src/components/forms/FormErrorState.tsx");
  assert.ok(errorState.includes("aria-live=\"assertive\""), "error panel must announce failed submissions");

  const successState = read("src/components/forms/SubmissionSuccessPanel.tsx");
  assert.ok(successState.includes("aria-live=\"polite\""), "success panel must announce completion state");

  const screenshotSet = [
    "docs/screenshots/contact-desktop-1440.png",
    "docs/screenshots/contact-mobile-390.png",
    "docs/screenshots/septic-cleaning-desktop-1440.png",
    "docs/screenshots/septic-cleaning-mobile-390.png",
    "docs/screenshots/realtors-desktop-1440.png",
    "docs/screenshots/realtors-mobile-390.png",
    "docs/screenshots/portable-toilets-desktop-1440.png",
    "docs/screenshots/portable-toilets-mobile-390.png",
    "docs/screenshots/issue-83-94-commercial-desktop-1440.png",
    "docs/screenshots/issue-83-94-commercial-mobile-390.png",
  ];
  for (const screenshot of screenshotSet) {
    assert.ok(fs.existsSync(path.join(process.cwd(), screenshot)), `missing screenshot proof: ${screenshot}`);
  }

  const checklist = read("docs/form-ux-accessibility-checklist.md");
  assert.ok(checklist.includes("Keyboard flow"), "checklist must include keyboard flow verification");
  assert.ok(checklist.includes("Error state"), "checklist must include error-state verification");
  assert.ok(checklist.includes("Success state"), "checklist must include success-state verification");

  console.log("[form-ux-accessibility] lane semantics, state announcements, and screenshot checklist verified");
}

run();
