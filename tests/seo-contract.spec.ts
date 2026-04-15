import assert from "node:assert";
import sitemap from "../src/app/sitemap";
import robots from "../src/app/robots";
import { buildMetadata } from "../src/lib/seo/metadata";

function run() {
  process.env.SITE_URL = "https://demo.robinsonseptic.com";
  process.env.SEO_ALLOW_INDEXING = "false";

  const map = sitemap();
  assert.ok(map.length > 0, "sitemap should include entries");
  map.forEach((entry) => {
    assert.ok(entry.url.startsWith("https://demo.robinsonseptic.com"), `sitemap entry must use configured site url: ${entry.url}`);
    assert.ok(!entry.url.includes("localhost"), `sitemap must not leak localhost: ${entry.url}`);
  });

  const meta = buildMetadata("Test", "Description", "/services/septic-cleaning");
  assert.equal(
    meta.alternates?.canonical,
    "https://demo.robinsonseptic.com/services/septic-cleaning",
    "canonical should use SITE_URL",
  );

  const robotsDoc = robots();
  const firstRule = Array.isArray(robotsDoc.rules) ? robotsDoc.rules[0] : robotsDoc.rules;
  assert.equal(firstRule.disallow, "/", "demo/local mode should allow noindex contract");

  process.env.SEO_ALLOW_INDEXING = "true";
  const robotsPublic = robots();
  const publicRule = Array.isArray(robotsPublic.rules) ? robotsPublic.rules[0] : robotsPublic.rules;
  assert.equal(publicRule.allow, "/", "public mode should allow crawling when explicitly enabled");

  console.log("[seo] runtime SEO contract passes");
}

run();
