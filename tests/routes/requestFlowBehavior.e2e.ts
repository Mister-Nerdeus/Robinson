import assert from "node:assert/strict";
import { chromium } from "playwright";

const baseUrl = (process.env.BASE_URL || "http://localhost:4850").replace(/\/$/, "");

const requestRoutes = [
  "/services/septic-cleaning",
  "/services/well-septic-evaluations",
  "/services/portable-toilets",
  "/services/commercial",
  "/contact",
  "/realtors",
];

async function run() {
  const browser = await chromium.launch({ headless: true });
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 1800 } });
  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const desktopPage = await desktop.newPage();
  const mobilePage = await mobile.newPage();

  const leakagePattern = /(Mode:|Local-only:|Admin review:|Commit:|Build time|DEPLOY_|refs\/heads\/|runtime mode)/i;
  for (const route of requestRoutes) {
    const routePage = await desktop.newPage();
    await routePage.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
    const headerCount = await routePage.locator('header[data-site-header="true"]').count();
    assert.ok(headerCount >= 1, `request route must render the shared site header (${route})`);
    const desktopNavCount = await routePage.locator('header nav[data-primary-nav="desktop"]').count();
    assert.ok(desktopNavCount <= 1, `request route must not render duplicate desktop primary nav rows (${route})`);
    const text = await routePage.locator("body").innerText();
    assert.equal(
      leakagePattern.test(text),
      false,
      `request route must not leak runtime/deploy provenance text (${route})`,
    );
    const secondaryRouteLinks = await routePage.locator('[data-secondary-route-links="true"]').count();
    assert.equal(
      secondaryRouteLinks,
      0,
      `request route must not duplicate global route-list nav chrome (${route})`,
    );
    await routePage.close();
  }

  await desktopPage.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  const marketingSecondaryRouteLinks = await desktopPage.locator('[data-secondary-route-links="true"]').count();
  assert.ok(
    marketingSecondaryRouteLinks >= 1,
    "marketing routes should keep secondary route links available in footer",
  );

  await desktopPage.goto(`${baseUrl}/services/septic-cleaning`, { waitUntil: "networkidle" });
  const firstEditableDesktopTop = await readFirstEditableTop(desktopPage);
  assert.ok(
    firstEditableDesktopTop !== null && firstEditableDesktopTop < 1550,
    `septic first editable control must appear in early desktop scroll band (got ${firstEditableDesktopTop})`,
  );

  await desktopPage.locator('input[name="fullName"]').fill("Behavior Test");
  await desktopPage.locator('input[name="phone"]').fill("5550100");
  await desktopPage.locator('input[name="email"]').fill("behavior@example.com");
  await desktopPage.getByRole("button", { name: "Next Step" }).first().click();
  await desktopPage.waitForTimeout(350);
  const activeHeadingFocused = await desktopPage.evaluate(() => {
    const active = document.activeElement as HTMLElement | null;
    return active?.hasAttribute("data-wizard-step-heading") ?? false;
  });
  assert.equal(activeHeadingFocused, true, "step transition must restore focus to wizard heading");

  await desktopPage.goto(`${baseUrl}/contact`, { waitUntil: "networkidle" });
  const firstEditableContactDesktopTop = await readFirstEditableTop(desktopPage);
  assert.ok(
    firstEditableContactDesktopTop !== null && firstEditableContactDesktopTop < 1550,
    `contact first editable control must appear in early desktop scroll band (got ${firstEditableContactDesktopTop})`,
  );

  await desktopPage.getByRole("button", { name: /Septic Service/i }).first().click();
  await desktopPage.locator('input[name="fullName"]').fill("Contact Behavior");
  await desktopPage.locator('input[name="phone"]').fill("5550101");
  await desktopPage.locator('input[name="email"]').fill("contact-behavior@example.com");
  await desktopPage.getByRole("button", { name: "Next Step" }).first().click();
  await desktopPage.waitForTimeout(350);
  const contactHeadingFocused = await desktopPage.evaluate(() => {
    const active = document.activeElement as HTMLElement | null;
    return active?.hasAttribute("data-wizard-step-heading") ?? false;
  });
  assert.equal(contactHeadingFocused, true, "contact lane step transition must restore focus to wizard heading");

  await mobilePage.goto(`${baseUrl}/services/septic-cleaning`, { waitUntil: "networkidle" });
  const firstEditableMobileTop = await readFirstEditableTop(mobilePage);
  assert.ok(
    firstEditableMobileTop !== null && firstEditableMobileTop < 1850,
    `septic first editable control must appear in early mobile scroll band (got ${firstEditableMobileTop})`,
  );

  await mobilePage.goto(`${baseUrl}/contact`, { waitUntil: "networkidle" });
  const firstEditableContactMobileTop = await mobilePage.evaluate(() => {
    const el = document.querySelector("form input:not([type='hidden']), form select, form textarea");
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return Math.round(rect.top + window.scrollY);
  });
  assert.ok(
    firstEditableContactMobileTop !== null && firstEditableContactMobileTop < 1850,
    `contact first editable control must appear in early mobile scroll band (got ${firstEditableContactMobileTop})`,
  );

  await desktop.close();
  await mobile.close();
  await browser.close();

  console.log("[request-flow-behavior-e2e] nav singularity, provenance guard, early first-step, and focus continuity pass");
}

async function readFirstEditableTop(page: { evaluate: (fn: () => number | null) => Promise<number | null> }) {
  return page.evaluate(() => {
    const el = document.querySelector("form input:not([type='hidden']), form select, form textarea");
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return Math.round(rect.top + window.scrollY);
  });
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
