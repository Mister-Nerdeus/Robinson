import assert from "node:assert";
import { submissionTypes } from "../src/lib/forms/types";
import { assignTerritoryAndOffice, routingCoverageByLane } from "../src/lib/forms/routing";
import { company } from "../src/config/company";
import { serviceAreaContent } from "../src/content/serviceArea";
import fs from "node:fs";
import path from "node:path";

function run() {
  for (const lane of submissionTypes) {
    assert.ok(routingCoverageByLane[lane], `lane ${lane} must have an office assignment rule`);
  }

  const septicPierson = assignTerritoryAndOffice({
    type: "septic-service",
    city: "Pierson",
    zip: "49339",
  });
  assert.equal(septicPierson.territoryId, "montcalm-core", "Pierson should route to montcalm core territory");
  assert.equal(septicPierson.officeId, "septic-dispatch", "septic lane should route to septic dispatch office");

  const rentalGrandRapids = assignTerritoryAndOffice({
    type: "rental",
    city: "Grand Rapids",
    zip: "49503",
  });
  assert.equal(rentalGrandRapids.territoryId, "kent-core", "Grand Rapids should route to kent core territory");
  assert.equal(rentalGrandRapids.officeId, "rental-desk", "rental lane should route to rental desk");

  const fallbackGeneral = assignTerritoryAndOffice({
    type: "general",
    city: "Unknown City",
    zip: "00000",
  });
  assert.equal(fallbackGeneral.territoryId, "west-michigan-fallback", "unknown geographies should route to fallback territory");

  assert.equal(company.address.line1, "1565 N Dagget Rd", "public contact truth must remain canonical in company config");
  assert.ok(
    !serviceAreaContent.summary.toLowerCase().includes("dispatch") && !serviceAreaContent.summary.toLowerCase().includes("desk"),
    "internal routing labels must not leak into public service area copy",
  );

  const adminTableSource = fs.readFileSync(path.join(process.cwd(), "src/components/admin/SubmissionsTable.tsx"), "utf8");
  assert.ok(
    adminTableSource.includes("Routing:"),
    "admin review must render routing assignment metadata",
  );

  console.log("[territory-routing] lane coverage, geography routing, and admin visibility verified");
}

run();
