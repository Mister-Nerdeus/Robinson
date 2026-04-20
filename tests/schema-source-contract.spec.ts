import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

function read(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function run() {
  const source = read("src/lib/seo/schema.ts");

  assert.ok(
    source.includes('import { company } from "@/config/company";'),
    "Schema source must map local business fields from canonical company profile",
  );
  assert.ok(
    source.includes('import { faqContent } from "@/content/faq";'),
    "FAQ schema must map from canonical FAQ content module",
  );
  assert.ok(
    source.includes("name: company.publicBrand"),
    "Schema business name must come from company profile",
  );
  assert.ok(
    source.includes("streetAddress: company.address.line1"),
    "Schema address must come from canonical company profile",
  );

  const disallowed = ["aggregateRating", "ratingValue", "reviewCount", '"@type": "Review"'];
  for (const token of disallowed) {
    assert.ok(
      !source.includes(token),
      `Schema must not include unverifiable ratings/review data (${token})`,
    );
  }

  console.log("[schema-source-contract] schema fields trace to canonical modules and exclude unverifiable ratings");
}

run();
