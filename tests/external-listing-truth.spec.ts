import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { company } from "../src/config/company";
import { publicBusinessFacts } from "../src/content/businessFacts";

function read(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function normalizeText(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function run() {
  const contract = company.externalListingContract;

  assert.equal(contract.canonicalFacts.publicName, company.publicBrand, "external listing name must map to canonical public brand");
  assert.equal(contract.canonicalFacts.legalName, company.legalName, "external listing legal name must map to canonical legal name");
  assert.equal(contract.canonicalFacts.primaryPhone, publicBusinessFacts.primaryServiceLine, "external listing phone must map to canonical public phone");
  assert.equal(
    `${contract.canonicalFacts.streetAddress}, ${contract.canonicalFacts.cityStateZip}`,
    `${company.address.line1}, ${company.address.city}, ${company.address.state} ${company.address.postalCode}`,
    "external listing address must map to canonical address",
  );

  const matrix = read("docs/external-footprint-matrix.md").toLowerCase();
  const normalizedMatrix = normalizeText(matrix);
  const checklist = read("docs/external-listing-sync-checklist.md").toLowerCase();
  const citationAudit = read("docs/citation-audit.md").toLowerCase();

  for (const surface of contract.knownSurfaces) {
    const normalizedSurface = normalizeText(surface.surface);
    assert.ok(
      normalizedMatrix.includes(normalizedSurface),
      `matrix missing surface: ${surface.surface}`,
    );
    assert.ok(matrix.includes(surface.status), `matrix missing status mapping for: ${surface.surface}`);
  }

  for (const legacyFact of contract.legacyFactsTracked) {
    assert.ok(matrix.includes(legacyFact.toLowerCase()), `matrix missing tracked legacy fact: ${legacyFact}`);
    assert.ok(citationAudit.includes(legacyFact.toLowerCase()), `citation audit missing tracked legacy fact: ${legacyFact}`);
  }

  assert.ok(checklist.includes("no provisional/unverified facts"), "listing checklist must block provisional fact publishing");
  assert.ok(citationAudit.includes("retired-suppress"), "citation audit must explicitly track retired/suppressed records");

  console.log("[external-listing-truth] canonical listing mapping and platform matrix safeguards verified");
}

run();
