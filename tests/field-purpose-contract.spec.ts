import assert from "node:assert";
import {
  commercialServiceSchema,
  generalContactSchema,
  portableToiletRentalSchema,
  septicServiceSchema,
  wellSepticEvaluationSchema,
} from "../src/lib/forms/schema";
import { fieldPurposeMap } from "../src/lib/forms/fieldPurposeMap";

function keysOfShape(schema: { shape: Record<string, unknown> }) {
  return Object.keys(schema.shape);
}

function run() {
  const schemaFieldsByType = {
    general: keysOfShape(generalContactSchema),
    "septic-service": keysOfShape(septicServiceSchema),
    evaluation: keysOfShape(wellSepticEvaluationSchema),
    rental: keysOfShape(portableToiletRentalSchema),
    "commercial-service": keysOfShape(commercialServiceSchema),
  } as const;

  for (const [type, fields] of Object.entries(schemaFieldsByType)) {
    const purposeKeys = new Set(Object.keys(fieldPurposeMap[type as keyof typeof fieldPurposeMap]));
    for (const field of fields) {
      assert.ok(
        purposeKeys.has(field),
        `Missing field-use purpose mapping for ${type}.${field}`,
      );
      const purpose = fieldPurposeMap[type as keyof typeof fieldPurposeMap][field];
      assert.ok(
        purpose.trim().length >= 12,
        `Field-use purpose mapping too short for ${type}.${field}`,
      );
    }
  }

  console.log("[field-purpose-contract] every schema field has documented operational purpose");
}

run();
