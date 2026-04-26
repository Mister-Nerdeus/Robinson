import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { company } from "../src/config/company";
import { publicBusinessFacts } from "../src/content/businessFacts";
import { localBusinessSchema } from "../src/lib/seo/schema";

function read(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function run() {
  assert.equal(
    publicBusinessFacts.normalBusinessHours,
    company.serviceHoursContract.normalBusinessHoursLabel,
    "public hours must map from canonical company hours contract",
  );
  assert.equal(
    publicBusinessFacts.emergencyResponsePolicy,
    company.serviceHoursContract.emergencyResponsePolicy,
    "public emergency policy must map from canonical company hours contract",
  );

  const schema = localBusinessSchema();
  assert.deepEqual(
    schema.openingHours,
    company.serviceHoursContract.openingHoursSchema,
    "schema openingHours must map from canonical company hours contract",
  );

  const footerSource = read("src/components/site/Footer.tsx");
  assert.ok(
    footerSource.includes("publicBusinessFacts.normalBusinessHours"),
    "footer must render canonical normal business hours",
  );
  assert.ok(
    footerSource.includes("publicBusinessFacts.emergencyResponsePolicy"),
    "footer must render canonical emergency response policy",
  );

  const contactSource = read("src/app/contact/page.tsx");
  assert.ok(
    contactSource.includes("company.serviceHoursContract.normalBusinessHoursLabel"),
    "contact page must reference canonical normal business-hours label",
  );

  const homeSource = read("src/app/page.tsx").toLowerCase();
  assert.ok(
    homeSource.includes("routine scheduling is mon-fri"),
    "CTA surface must explicitly qualify routine scheduling hours",
  );

  assert.ok(
    fs.existsSync(path.join(process.cwd(), "docs/public-hours-emergency-contract.md")),
    "public hours/emergency contract doc must exist",
  );

  console.log("[public-hours-truth] footer/contact/schema and canonical hours policy are aligned");
}

run();
