import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

function read(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function run() {
  const requestFormSource = read("src/components/forms/RequestForm.tsx");
  const schemaSource = read("src/lib/forms/schema.ts");
  const typeSource = read("src/lib/forms/types.ts");
  const notificationSource = read("src/lib/notifications/send.ts");

  assert.ok(
    requestFormSource.includes('fieldOrder: "checks-first"'),
    "Septic problem section must remain checks-first",
  );

  const checklistIndex = requestFormSource.indexOf('name: "problemSigns"');
  const freeformIndex = requestFormSource.indexOf('name: "additionalWarningDetails"');
  assert.ok(
    checklistIndex >= 0 && freeformIndex >= 0 && checklistIndex < freeformIndex,
    "Septic checklist should appear before freeform warning details in source order",
  );

  const tankCountEnum = 'z.enum(["1", "2", "3-plus", "unknown"])';
  assert.ok(schemaSource.includes(tankCountEnum), "Schema must enforce guided tankCount values");
  assert.ok(
    typeSource.includes('tankCount: "1" | "2" | "3-plus" | "unknown";'),
    "Types must enforce guided tankCount values",
  );
  assert.ok(
    notificationSource.includes("Tank Count: ${record.tankCount}"),
    "Notifications must include structured tankCount",
  );

  assert.ok(
    requestFormSource.includes('serviceLocationInvolved === "yes"') &&
      requestFormSource.includes('serviceLocationInvolved === "unsure"'),
    "General contact location reveal logic must stay conditional on yes/unsure",
  );
  assert.ok(
    requestFormSource.includes('fd.set("urgency", "normal")') &&
      requestFormSource.includes('name="urgency" value="normal"'),
    "General contact must default urgency for schema alignment while keeping lane lightweight",
  );

  console.log("[form-lane-contract] septic ordering, tankCount modeling, and general-lane adaptivity pass");
}

run();
