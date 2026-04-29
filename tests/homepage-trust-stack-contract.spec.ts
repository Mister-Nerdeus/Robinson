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
  const claims = homepageContract.trust.claims;
  assert.equal(claims.length, 5, "Homepage trust stack must stay concise and fixed to five verified claims");

  for (const claim of claims) {
    assert.equal(claim.classification, "verified-source", `Homepage trust claim ${claim.id} must stay verified-source only`);
    assert.ok(claim.sourceRefs.length > 0, `Homepage trust claim ${claim.id} must map to source evidence`);
  }

  assert.deepEqual(
    trustContent.points,
    claims.map((claim) => claim.statement),
    "Homepage trust bullets must render directly from the canonical trust stack",
  );

  const renderedTrustCopy = [
    homeContent.trustBand.title,
    homeContent.trustBand.body,
    ...trustContent.points,
    homeContent.realtorBand.title,
    homeContent.realtorBand.body,
  ].join("\n");

  for (const blocked of homepageContract.trust.blockedPatterns) {
    assert.equal(
      countCaseInsensitive(renderedTrustCopy, blocked),
      0,
      `Homepage trust surfaces must block legacy trust noise '${blocked}'`,
    );
  }

  const trustSource = fs.readFileSync(path.join(process.cwd(), "src/content/trust.ts"), "utf8");
  assert.ok(trustSource.includes("homepageTrustClaimSourceMap"), "Trust source map must remain codified in trust content");
  assert.ok(trustSource.includes("blockedHomepageTrustPatterns"), "Blocked homepage trust patterns must stay explicit");

  console.log("[homepage-trust-stack-contract] verified-source trust stack enforced");
}

run();
