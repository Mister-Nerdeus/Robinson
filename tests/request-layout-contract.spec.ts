import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

function read(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function run() {
  const templatedServiceRouteFiles = [
    "src/app/services/septic-cleaning/page.tsx",
    "src/app/services/well-septic-evaluations/page.tsx",
  ];

  for (const file of templatedServiceRouteFiles) {
    const source = read(file);
    assert.ok(
      source.includes("ServiceRequestPageTemplate"),
      `${file} must use shared ServiceRequestPageTemplate`,
    );
  }

  const taskLayoutRouteFiles = [
    "src/app/contact/page.tsx",
    "src/app/realtors/page.tsx",
    "src/app/services/portable-toilets/page.tsx",
  ];

  for (const file of taskLayoutRouteFiles) {
    const source = read(file);
    assert.ok(source.includes("TaskPageLayout"), `${file} must use TaskPageLayout`);
  }

  const contactSource = read("src/app/contact/page.tsx");
  assert.ok(
    contactSource.includes('route="/contact"'),
    "Contact page must declare task route /contact",
  );
  assert.ok(
    contactSource.includes('layout="task"'),
    "Contact page must opt into task container width",
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
    globalsCss.includes(".task-page-layout"),
    "Global styles must include task-page-layout styling",
  );
  assert.ok(
    globalsCss.includes("--layout-task-max"),
    "Global styles must define task max-width token",
  );

  console.log("[request-layout-contract] task and templated request routes align to current layout contracts");
}

run();
