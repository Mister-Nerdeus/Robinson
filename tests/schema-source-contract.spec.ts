import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

function read(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function run() {
  const source = read("src/lib/seo/schema.ts");
  const faqRouteSource = read("src/app/faq/page.tsx");

  assert.ok(
    source.includes('import { company } from "@/config/company";'),
    "Schema source must map local business fields from canonical company profile",
  );
  assert.ok(
    source.includes('import { publicBusinessFacts } from "@/content/businessFacts";'),
    "Schema source must resolve customer-facing contact facts from canonical public business facts",
  );
  assert.ok(
    source.includes('import { faqContent } from "@/content/faq";'),
    "FAQ schema must map from canonical FAQ content module",
  );
  assert.ok(
    faqRouteSource.includes('import { faqContent } from "@/content/faq";') &&
      faqRouteSource.includes("{faqContent.map((item) => ("),
    "Visible FAQ route content must map directly from the same canonical FAQ content module",
  );
  assert.ok(
    source.includes("name: publicBusinessFacts.businessName"),
    "Schema business name must come from canonical public business facts",
  );
  assert.ok(
    source.includes("streetAddress: publicBusinessFacts.primaryAddress.line1"),
    "Schema address must come from canonical public business facts",
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
