import assert from "node:assert";
import { serviceTemplateEntries } from "../src/content/serviceTemplates";

function run() {
  assert.strictEqual(
    serviceTemplateEntries.length,
    4,
    "Core service pages must map to exactly four template entries",
  );

  for (const entry of serviceTemplateEntries) {
    assert.ok(entry.slots.headline.trim().length > 0, `${entry.id} missing slot: headline`);
    assert.ok(entry.slots.summary.trim().length > 0, `${entry.id} missing slot: summary`);
    assert.ok(entry.slots.includedItems.length > 0, `${entry.id} missing slot: included items`);
    assert.ok(entry.slots.proofPoints.length > 0, `${entry.id} missing slot: proof points`);
    assert.ok(entry.slots.faqSubset.length > 0, `${entry.id} missing slot: FAQ subset`);
    assert.ok(entry.slots.primaryCta.label.trim().length > 0, `${entry.id} missing slot: primary CTA`);
  }

  console.log("[service-template-contract] core services use required template slots");
}

run();
