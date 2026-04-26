import assert from "node:assert";
import sitemap from "../src/app/sitemap";
import robots from "../src/app/robots";
import { buildMetadata } from "../src/lib/seo/metadata";

function readRobotsIndex(value: unknown) {
  if (typeof value === "object" && value !== null && "index" in value) {
    return Boolean((value as { index?: boolean }).index);
  }
  return undefined;
}

function run() {
  process.env.RUNTIME_MODE = "demo";
  process.env.SITE_URL = "https://develop.robinsonseptic.net";
  process.env.SEO_ALLOW_INDEXING = "false";

  const map = sitemap();
  assert.ok(map.length > 0, "sitemap should include entries");
  map.forEach((entry) => {
    assert.ok(entry.url.startsWith("https://develop.robinsonseptic.net"), `sitemap entry must use configured site url: ${entry.url}`);
    assert.ok(!entry.url.includes("localhost"), `sitemap must not leak localhost: ${entry.url}`);
  });

  const meta = buildMetadata("Test", "Description", "/services/septic-cleaning");
  assert.equal(
    meta.alternates?.canonical,
    "https://develop.robinsonseptic.net/services/septic-cleaning",
    "canonical should use SITE_URL",
  );

  assert.equal(readRobotsIndex(meta.robots), false, "develop/demo metadata should be noindex");

  const robotsDoc = robots();
  const firstRule = Array.isArray(robotsDoc.rules) ? robotsDoc.rules[0] : robotsDoc.rules;
  assert.equal(firstRule.disallow, "/", "demo/local mode should always be noindex");

  process.env.RUNTIME_MODE = "production";
  process.env.SITE_URL = "https://www.robinsonseptic.net";
  process.env.SEO_ALLOW_INDEXING = "true";

  const publicMeta = buildMetadata("Test", "Description", "/");
  assert.equal(readRobotsIndex(publicMeta.robots), true, "public metadata should allow indexing");

  const robotsPublic = robots();
  const publicRule = Array.isArray(robotsPublic.rules) ? robotsPublic.rules[0] : robotsPublic.rules;
  assert.equal(publicRule.allow, "/", "production mode should allow crawling");

  console.log("[seo] runtime SEO contract passes");
}

run();
