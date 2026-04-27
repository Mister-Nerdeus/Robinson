import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { publicCta, PUBLIC_CTA_CONTRACT_VERSION } from "../src/content/cta";
import { homeContent } from "../src/content/home";

function read(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function run() {
  assert.equal(PUBLIC_CTA_CONTRACT_VERSION, "public-cta-contract-v1", "CTA contract version must remain explicit");

  const pageSource = read("src/app/page.tsx");
  const headerSource = read("src/components/site/Header.tsx");
  const footerSource = read("src/components/site/Footer.tsx");
  const railSource = read("src/components/site/MobileActionRail.tsx");

  for (const source of [pageSource, headerSource, railSource]) {
    assert.ok(source.includes('from "@/content/cta"'), "Global CTA surfaces must import canonical CTA source");
    assert.ok(source.includes("publicCta"), "Global CTA surfaces must render CTA labels from canonical source");
  }
  assert.ok(footerSource.includes('from "@/content/cta"'), "Footer must import canonical CTA source");
  assert.ok(
    footerSource.includes("buildFooterCallLabel"),
    "Footer may use canonical CTA helper for number-specific call rendering",
  );

  assert.equal(
    homeContent.hero.ctaLabel,
    publicCta.global.request.label,
    "Hero request CTA must remain in canonical global request family",
  );
  assert.equal(
    homeContent.realtorBand.ctaLabel,
    publicCta.routeSpecific.realtorBand,
    "Realtor CTA must remain route-specific and contract-bound",
  );

  const laneCtas = new Set(homeContent.lanes.map((lane) => lane.ctaLabel));
  const expectedRouteSpecific = new Set([
    publicCta.routeSpecific.emergencySeptic,
    publicCta.routeSpecific.routinePumping,
    publicCta.routeSpecific.evaluation,
    publicCta.routeSpecific.rental,
    publicCta.routeSpecific.commercial,
  ]);
  assert.deepEqual(laneCtas, expectedRouteSpecific, "Homepage service chooser CTA set must stay canonical");

  const bannedGeneric = publicCta.bannedGenericLabels.map((label) => label.toLowerCase());
  const surfaceCopy = [pageSource, headerSource, railSource, JSON.stringify(homeContent)].join("\n").toLowerCase();
  for (const label of bannedGeneric) {
    assert.ok(!surfaceCopy.includes(`>${label}<`), `Generic CTA label '${label}' must not appear in governed surfaces`);
  }

  console.log("[public-cta-contract] canonical global + route CTA families verified");
}

run();
