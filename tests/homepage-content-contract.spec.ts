import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { homeContent } from "../src/content/home";
import { publicCta } from "../src/content/cta";

const bannedPublicTerms = ["task lane", "router", "secondary route links", "proof"];
const bannedGenericCtas = publicCta.bannedGenericLabels.map((label) => label.toLowerCase());

function read(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function run() {
  assert.equal(
    homeContent.hero.ctaLabel,
    publicCta.global.request.label,
    "Hero request CTA must come from canonical global request family",
  );

  assert.equal(homeContent.lanes.length, 5, "Homepage service chooser must keep five core service cards");

  for (const lane of homeContent.lanes) {
    const lowerCta = lane.ctaLabel.toLowerCase();
    for (const banned of bannedGenericCtas) {
      assert.notEqual(lowerCta, banned, `Lane CTA must not drift to generic label '${banned}'`);
    }
  }

  const renderedCopyFields = [
    homeContent.hero.heading,
    homeContent.hero.subheading,
    homeContent.trustBand.title,
    homeContent.trustBand.body,
    homeContent.realtorBand.title,
    homeContent.realtorBand.body,
    ...homeContent.lanes.flatMap((lane) => [lane.title, lane.userProblem, lane.laneValue, lane.ctaLabel]),
  ].join("\n").toLowerCase();

  for (const banned of bannedPublicTerms) {
    assert.ok(
      !renderedCopyFields.includes(banned),
      `Homepage content contract forbids public jargon '${banned}' in content-driven copy`,
    );
  }

  assert.notEqual(
    homeContent.trustBand.title,
    homeContent.realtorBand.title,
    "Trust and Realtor sections must remain distinct IA surfaces",
  );

  const homeSource = read("src/content/home.ts");
  assert.ok(
    homeSource.includes("publicCta"),
    "Homepage content source must consume canonical CTA contract values",
  );

  console.log("[homepage-content-contract] content-driven CTA + copy invariants verified");
}

run();
