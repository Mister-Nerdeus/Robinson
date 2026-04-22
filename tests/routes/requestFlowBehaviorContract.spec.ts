import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

function read(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function run() {
  const contactPage = read("src/app/contact/page.tsx");
  assert.ok(
    !contactPage.includes("ContactLaneGrid"),
    "Contact page must keep one canonical lane chooser and avoid duplicate lane widgets",
  );

  const routerSource = read("src/components/forms/ContactIntakeRouter.tsx");
  assert.ok(
    routerSource.includes("contactRoutes.map"),
    "Lane labels and analytics names must derive from the shared contact route contract",
  );
  assert.ok(
    routerSource.includes("scrollAndFocus"),
    "Lane selection must use measured scroll/focus choreography",
  );

  const requestFormSource = read("src/components/forms/RequestForm.tsx");
  assert.ok(
    requestFormSource.includes("scrollAndFocus"),
    "Step transitions must use measured scroll/focus choreography",
  );

  const headerSource = read("src/components/site/Header.tsx");
  assert.ok(
    headerSource.includes('data-site-header="true"'),
    "Header must expose measured sticky header marker",
  );
  assert.ok(
    headerSource.includes('data-site-header-mode={isTaskRoute ? "compact-task" : "marketing"}'),
    "Header must expose compact task header mode on request routes",
  );
  assert.ok(
    headerSource.includes('data-primary-nav="desktop"'),
    "Desktop header must expose a single primary nav marker",
  );

  const footerSource = read("src/components/site/Footer.tsx");
  assert.ok(
    !footerSource.includes("Mode:"),
    "Public footer must not show runtime mode badges",
  );
  assert.ok(
    !footerSource.includes("DeploymentStamp"),
    "Public footer must not show deployment provenance stamp",
  );

  const runtimeProofSource = read("src/app/api/runtime-proof/route.ts");
  assert.ok(
    runtimeProofSource.includes('return NextResponse.json({ error: "not-found" }, { status: 404 });'),
    "Runtime proof endpoint must not expose diagnostics on production hosts",
  );
  assert.ok(
    runtimeProofSource.includes('return NextResponse.json({ error: "admin-auth-required" }, { status: 401 });'),
    "Runtime proof endpoint must be gated by explicit review access",
  );

  console.log("[request-flow-behavior] lane/router/header/provenance behavior guards pass");
}

run();
