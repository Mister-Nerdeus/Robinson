import assert from "node:assert";
import { company } from "../src/config/company";
import { publicBusinessFacts } from "../src/content/businessFacts";
import { localBusinessSchema } from "../src/lib/seo/schema";
import { footerFastPathLinks } from "../src/content/navigation";

function run() {
  assert.equal(
    publicBusinessFacts.businessName,
    company.publicBrand,
    "public business name must stay aligned with canonical company config",
  );
  assert.equal(
    publicBusinessFacts.legalName,
    company.legalName,
    "public legal name must stay aligned with canonical company config",
  );
  assert.equal(
    publicBusinessFacts.primaryAddress.line1,
    company.address.line1,
    "public primary address must stay aligned with canonical company config",
  );

  const schema = localBusinessSchema();
  assert.equal(schema.name, company.publicBrand, "schema name must match canonical business name");
  assert.equal(
    schema.address.streetAddress,
    company.address.line1,
    "schema street address must match canonical address",
  );
  assert.equal(schema.telephone, company.primaryPhone, "schema telephone must match canonical primary phone");

  const footerLinks = footerFastPathLinks.map((entry) => entry.href);
  assert.ok(footerLinks.includes("/privacy"), "privacy route must be linked from public footer links");
  assert.ok(footerLinks.includes("/terms"), "terms route must be linked from public footer links");

  console.log("[public-facts] canonical facts, schema output, and legal links are aligned");
}

run();
