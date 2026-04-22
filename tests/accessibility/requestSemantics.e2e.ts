import assert from "node:assert/strict";
import { chromium, type Page } from "playwright";

const baseUrl = (process.env.BASE_URL || "http://127.0.0.1:4850").replace(/\/$/, "");

async function assertAutocomplete(page: Page, selector: string, expected: string) {
  const value = await page.locator(selector).first().getAttribute("autocomplete");
  assert.equal(value, expected, `Expected ${selector} autocomplete=${expected}`);
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1600 } });

  await page.goto(`${baseUrl}/services/septic-cleaning`, { waitUntil: "networkidle" });

  await assertAutocomplete(page, 'input[name="fullName"]', "name");
  await assertAutocomplete(page, 'input[name="phone"]', "tel");
  await assertAutocomplete(page, 'input[name="email"]', "email");

  await page.getByRole("button", { name: "Next Step" }).first().click();

  for (const name of ["fullName", "phone", "email"]) {
    const control = page.locator(`input[name="${name}"]`).first();
    const id = await control.getAttribute("id");
    assert.ok(id, `${name} input must have explicit id`);
    const describedBy = await control.getAttribute("aria-describedby");
    assert.ok(describedBy, `${name} input must expose aria-describedby`);
    assert.ok(describedBy?.includes(`${id}-error`), `${name} aria-describedby must include error id`);
    const errorText = await page.locator(`#${id}-error`).textContent();
    assert.ok((errorText || "").toLowerCase().includes("required"), `${name} error text must indicate requirement`);
  }

  await page.locator('input[name="fullName"]').fill("Semantics Test");
  await page.locator('input[name="phone"]').fill("5550102");
  await page.locator('input[name="email"]').fill("semantics@example.com");
  await page.getByRole("button", { name: "Next Step" }).first().click();

  await assertAutocomplete(page, 'input[name="streetAddress"]', "address-line1");
  await assertAutocomplete(page, 'input[name="city"]', "address-level2");
  await assertAutocomplete(page, 'input[name="zip"]', "postal-code");

  const streetAddress = page.locator('input[name="streetAddress"]').first();
  const streetAddressId = await streetAddress.getAttribute("id");
  assert.ok(streetAddressId, "streetAddress input must have explicit id");
  const streetAddressDescribedBy = await streetAddress.getAttribute("aria-describedby");
  assert.ok(
    streetAddressDescribedBy?.includes(`${streetAddressId}-help`),
    "streetAddress aria-describedby must include helper text id",
  );

  await browser.close();
  console.log("[request-semantics-e2e] autocomplete and aria helper/error associations pass");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
