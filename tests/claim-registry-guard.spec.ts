import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { trustClaimRegistry, trustContent } from "../src/content/trust";

function run() {
  const approved = trustClaimRegistry.filter((claim) => claim.status === "approved");
  assert.ok(approved.length > 0, "there must be approved claims for public trust surfaces");

  for (const claim of approved) {
    assert.ok(claim.evidenceRef.length > 0, `approved claim missing evidenceRef: ${claim.id}`);
    assert.ok(claim.ownerApprovalRef.length > 0, `approved claim missing ownerApprovalRef: ${claim.id}`);
  }

  const blockedClasses = new Set(["bbb", "reviews"]);
  const publicPoints = new Set(trustContent.points);
  for (const claim of trustClaimRegistry) {
    if (blockedClasses.has(claim.class) || claim.status !== "approved") {
      assert.ok(
        !publicPoints.has(claim.label),
        `blocked or unapproved claim leaked to public trust content: ${claim.id}`,
      );
    }
  }

  const registryDoc = fs.readFileSync(path.join(process.cwd(), "docs/claim-registry.md"), "utf8");
  assert.ok(registryDoc.includes("evidence_ref"), "claim registry doc must include evidence linkage");
  assert.ok(registryDoc.includes("owner_approval_ref"), "claim registry doc must include owner approval linkage");

  console.log("[claim-registry-guard] evidence-linked trust governance and blocked claim classes verified");
}

run();
