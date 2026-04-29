import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { homepageContract } from "../src/content/homepageContract";
import { publicCta } from "../src/content/cta";
import { homeContent } from "../src/content/home";

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
  const laneCardSource = read("src/components/home/LaneTaskCard.tsx");

  const urgentSurfaces = homepageContract.ctaLadder.surfaces.filter((entry) => entry.role === "urgent-call");
  assert.ok(urgentSurfaces.every((entry) => entry.label === publicCta.global.call.label), "Urgent CTA surfaces must stay in the call family");

  const requestSurfaces = homepageContract.ctaLadder.surfaces.filter((entry) => entry.role === "global-request");
  assert.ok(requestSurfaces.every((entry) => entry.label === publicCta.global.request.label), "Global request surfaces must stay in the request family");

  assert.equal(
    homeContent.realtorBand.ctaLabel,
    publicCta.routeSpecific.realtorBand,
    "Realtor CTA must stay distinct from generic evaluation and request labels",
  );

  assertOrder(pageSource, 'data-homepage-cta-surface="hero-call"', 'data-homepage-cta-surface="hero-request"', "Hero CTA order must keep emergency call first");
  assertOrder(headerSource, 'data-homepage-cta-surface="header-call"', 'data-homepage-cta-surface="header-request"', "Header CTA order must keep emergency call first");
  assertOrder(railSource, 'data-homepage-cta-surface="mobile-rail-call"', 'data-homepage-cta-surface="mobile-rail-request"', "Mobile rail CTA order must keep emergency call first");

  const routeSpecificLabels = new Set(homeContent.lanes.map((lane) => lane.ctaLabel));
  assert.deepEqual(
    routeSpecificLabels,
    new Set([
      publicCta.routeSpecific.emergencySeptic,
      publicCta.routeSpecific.routinePumping,
      publicCta.routeSpecific.evaluation,
      publicCta.routeSpecific.rental,
      publicCta.routeSpecific.commercial,
    ]),
    "Chooser cards must keep intent-specific CTA labels",
  );

  const surfaceSource = [pageSource, headerSource, railSource, laneCardSource, JSON.stringify(homeContent)].join("\n").toLowerCase();
  for (const blocked of homepageContract.ctaLadder.bannedGenericLabels) {
    assert.equal(surfaceSource.includes(blocked.toLowerCase()), false, `Homepage CTA surfaces must block generic label '${blocked}'`);
  }

  console.log("[homepage-cta-ladder-contract] CTA priority and labels verified");
}

run();
