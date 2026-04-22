import assert from "node:assert/strict";
import { businessFactRegistry, publicBusinessFactTable } from "@/content/businessFacts";

const requiredKeys = [
  "business_name",
  "primary_service_line",
  "additional_office_line",
  "primary_address",
];

for (const key of requiredKeys) {
  assert.ok(
    publicBusinessFactTable.some((fact) => fact.key === key),
    `Canonical public business fact is missing: ${key}`,
  );
}

const invalidPublicFacts = businessFactRegistry.filter(
  (fact) => fact.public && fact.status === "pending-verification",
);
assert.equal(
  invalidPublicFacts.length,
  0,
  "Pending-verification facts must not be marked public",
);

console.log("[business-facts-contract] canonical fact table and pending-verification isolation pass");
