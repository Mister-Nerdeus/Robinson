import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { homeContent } from "../src/content/home";
import { publicCta } from "../src/content/cta";

function read(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function assertOrder(source: string, first: string, second: string, message: string) {
  const firstPos = source.indexOf(first);
  const secondPos = source.indexOf(second);
  assert.ok(firstPos >= 0, `Missing marker '${first}'`);
  assert.ok(secondPos >= 0, `Missing marker '${second}'`);
  assert.ok(firstPos < secondPos, message);
}

function run() {
  const pageSource = read("src/app/page.tsx");
  const headerSource = read("src/components/site/Header.tsx");
  const railSource = read("src/components/site/MobileActionRail.tsx");
  const footerSource = read("src/components/site/Footer.tsx");
  const laneGridSource = read("src/components/home/LaneGrid.tsx");
  const laneCardSource = read("src/components/home/LaneTaskCard.tsx");
  const layoutSource = read("src/app/layout.tsx");
  const homeSource = read("src/content/home.ts");

  assert.ok(
    pageSource.includes('data-homepage-structure="hero-services-trust-realtor-faq-final-cta"'),
    "Homepage must keep canonical section-order marker",
  );
  assertOrder(
    pageSource,
    "homeContent.trustBand.title",
    "homeContent.realtorBand.title",
    "Trust section must render before Realtor section",
  );
  assert.notEqual(
    homeContent.trustBand.title,
    homeContent.realtorBand.title,
    "Trust and Realtor IA surfaces must stay distinct",
  );

  assert.ok(
    pageSource.includes("HeroMedia"),
    "Homepage hero must use static HeroMedia contract",
  );
  assert.ok(
    !pageSource.includes("HomeSlideshow"),
    "Homepage hero stability gate forbids slideshow/carousel swap without contract update",
  );

  assert.ok(
    footerSource.includes('data-footer-surface="compact-contact-v1"'),
    "Footer must keep compact-footer contract marker",
  );
  assert.equal(layoutSource.match(/<Footer\s*\/>/g)?.length ?? 0, 1, "Layout must render one footer surface");

  const bannedJargon = ["task lane", "router", "secondary route links", "proof"];
  const renderedHomeCopy = JSON.stringify(homeContent).toLowerCase();
  for (const term of bannedJargon) {
    assert.ok(!renderedHomeCopy.includes(term), `Homepage public copy contains banned jargon term '${term}'`);
  }
  assert.ok(homeSource.includes("publicCta"), "Homepage copy source must bind to CTA contract source");

  assert.ok(laneGridSource.includes("md:grid-cols-2"), "Service chooser calmness requires 2-column medium breakpoint");
  assert.ok(laneGridSource.includes("xl:grid-cols-3"), "Service chooser calmness requires 3-column xl breakpoint");
  assert.ok(laneCardSource.includes("min-h-[21rem]"), "Service chooser cards must maintain calm minimum height");

  assertOrder(
    pageSource,
    "publicCta.global.call.label",
    "homeContent.hero.ctaLabel",
    "Hero CTA hierarchy must keep call-family action before request-family action",
  );
  assertOrder(
    headerSource,
    "publicCta.global.call.label",
    "publicCta.global.request.label",
    "Header CTA hierarchy must keep call-family action before request-family action",
  );
  assertOrder(
    railSource,
    "publicCta.global.call.label",
    "publicCta.global.request.label",
    "Mobile rail CTA hierarchy must keep call-family action before request-family action",
  );

  assert.equal(
    publicCta.global.call.label,
    "Call Emergency Dispatch",
    "Emergency call CTA label must remain the canonical dominant call-family action",
  );

  console.log("[homepage-apple-ux-contract] executable homepage UX contract checks pass");
}

run();
