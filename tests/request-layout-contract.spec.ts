import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

function read(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function run() {
  const serviceRouteFiles = [
    "src/app/services/septic-cleaning/page.tsx",
    "src/app/services/well-septic-evaluations/page.tsx",
    "src/app/services/portable-toilets/page.tsx",
    "src/app/services/commercial/page.tsx",
  ];

  for (const file of serviceRouteFiles) {
    const source = read(file);
    assert.ok(
      source.includes("ServiceRequestPageTemplate"),
      `${file} must use shared ServiceRequestPageTemplate`,
    );
  }

  const contactSource = read("src/app/contact/page.tsx");
  assert.ok(
    contactSource.includes("RequestPageLayout"),
    "Contact page must use RequestPageLayout",
  );
  assert.ok(
    contactSource.includes('routeId="/contact"'),
    "Contact page must declare routeId /contact",
  );

  const templateSource = read("src/components/site/ServiceRequestPageTemplate.tsx");
  assert.ok(
    templateSource.includes("RequestPageLayout"),
    "ServiceRequestPageTemplate must compose RequestPageLayout",
  );
  assert.ok(
    templateSource.includes("routeId={entry.route}"),
    "ServiceRequestPageTemplate must bind routeId from template entry",
  );

  const templateContentSource = read("src/content/serviceTemplates.ts");
  const expectedRoutes = [
    "/services/septic-cleaning",
    "/services/well-septic-evaluations",
    "/services/portable-toilets",
    "/services/commercial",
  ];
  for (const routeId of expectedRoutes) {
    assert.ok(
      templateContentSource.includes(`route: "${routeId}"`),
      `service template content must include route ${routeId}`,
    );
  }

  const globalsCss = read("src/app/globals.css");
  assert.ok(
    globalsCss.includes(".request-page-form"),
    "Global styles must include request-page-form styling",
  );
  assert.ok(
    globalsCss.includes(".request-page-post-form"),
    "Global styles must include request-page-post-form zone styling",
  );

  console.log("[request-layout-contract] request-heavy routes use shared RequestPageLayout contract");
}

run();
