import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { homepageContract } from "../src/content/homepageContract";
import { homeContent } from "../src/content/home";
import { trustContent } from "../src/content/trust";

function countCaseInsensitive(haystack: string, needle: string) {
  return haystack.toLowerCase().split(needle.toLowerCase()).length - 1;
}

function run() {
  assert.equal(
    homepageContract.messageCompression.sectionJobs.length,
    homepageContract.sectionOrder.length,
    "Every homepage section must have exactly one assigned job",
  );

  const publicCopy = [
    homeContent.hero.eyebrow,
    homeContent.hero.heading,
    homeContent.hero.subheading,
    homeContent.chooserHeading,
    ...homeContent.lanes.flatMap((lane) => [lane.title, lane.userProblem, lane.laneValue, lane.ctaLabel]),
    homeContent.trustBand.title,
    homeContent.trustBand.body,
    ...trustContent.points,
    homeContent.realtorBand.title,
    homeContent.realtorBand.body,
    ...homeContent.realtorBand.highlights,
    ...homeContent.faqPreview.flatMap((item) => [item.question, item.answer]),
    homeContent.finalCta.heading,
  ].join("\n");

  for (const blocked of homepageContract.messageCompression.bannedWorkflowTerms) {
    assert.equal(
      publicCopy.toLowerCase().includes(blocked.toLowerCase()),
      false,
      `Homepage public copy must not drift into workflow narration with '${blocked}'`,
    );
  }

  for (const cap of homepageContract.messageCompression.repeatedPhraseCaps) {
    assert.ok(
      countCaseInsensitive(publicCopy, cap.phrase) <= cap.maxOccurrences,
      `Repeated homepage phrase '${cap.phrase}' exceeds cap ${cap.maxOccurrences}`,
    );
  }

  assert.notEqual(homeContent.trustBand.title, homeContent.realtorBand.title, "Trust and Realtor proof must stay as separate sections");

  const pageSource = fs.readFileSync(path.join(process.cwd(), "src/app/page.tsx"), "utf8");
  assert.ok(!pageSource.includes("trustContent.trustStatement"), "Homepage page render must not re-introduce extra trust narration");

  console.log("[homepage-message-compression-contract] one-job and anti-repetition rules verified");
}

run();
