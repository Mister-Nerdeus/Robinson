import assert from "node:assert/strict";
import { trustSignals } from "@/content/trust";

for (const signal of trustSignals) {
  assert.ok(signal.source.id.length > 0, `Missing source id for trust signal ${signal.id}`);
  assert.ok(signal.source.lastReviewed.length > 0, `Missing lastReviewed for trust signal ${signal.id}`);
  assert.ok(signal.owner.length > 0, `Missing owner for trust signal ${signal.id}`);
  assert.ok(
    ["verified", "marketing", "pending-verification"].includes(signal.status),
    `Unexpected status for trust signal ${signal.id}: ${signal.status}`,
  );
}

console.log("trust policy contract ok");
