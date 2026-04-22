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
    "src/app/services/commercial/page.tsx",
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
  assert.ok(
    templateSource.includes('postFormMode="full-width"'),
    "ServiceRequestPageTemplate must explicitly declare post-form layout mode",
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

  const layoutContractSource = read("src/config/requestLayoutContract.ts");
  assert.ok(
    layoutContractSource.includes('REQUEST_LAYOUT_CONTRACT_VERSION = "request-desktop-modes-v4"'),
    "Request layout contract version must be request-desktop-modes-v4",
  );
  assert.ok(
    layoutContractSource.includes("REQUEST_LAYOUT_DESKTOP_TOKENS"),
    "Request layout desktop tokens must be centralized in requestLayoutContract",
  );
  assert.ok(
    layoutContractSource.includes("supportRailMaxWidth"),
    "Request layout desktop tokens must include support-rail width",
  );
  assert.ok(
    layoutContractSource.includes("desktopGutter"),
    "Request layout desktop tokens must include desktop gutter",
  );

  const globalsCss = read("src/app/globals.css");
  assert.ok(
    globalsCss.includes(".task-page-layout"),
    "Global styles must include task-page-layout styling",
  );
  assert.ok(
    globalsCss.includes("--layout-request-max"),
    "Global styles must define request max-width token",
  );
  assert.ok(
    globalsCss.includes("--layout-form-shell-max"),
    "Global styles must define form-shell max-width token",
  );
  assert.ok(
    globalsCss.includes("--layout-task-max"),
    "Global styles must define task max-width token",
  );
  assert.ok(
    globalsCss.includes("--layout-support-rail-max"),
    "Global styles must define support-rail max-width token",
  );
  assert.ok(
    globalsCss.includes("--layout-task-gutter-lg"),
    "Global styles must define task desktop gutter token",
  );
  assert.ok(
    globalsCss.includes('data-task-page-layout-mode="support-rail"'),
    "Global styles must define support-rail mode behavior",
  );
  assert.ok(
    globalsCss.includes('data-task-page-layout-mode="full-width"'),
    "Global styles must define full-width mode behavior",
  );
  assert.ok(
    globalsCss.includes(".task-page-section-shell"),
    "Global styles must define a task-page to footer handoff shell",
  );

  console.log("[request-layout-contract] explicit desktop layout modes and request-form width contracts pass");
}

run();
