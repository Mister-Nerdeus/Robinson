import assert from "node:assert";
import { readFileSync } from "node:fs";
import path from "node:path";
import { afterSubmitByLane } from "../src/content/afterSubmit";

function run() {
  const messages = new Set(Object.values(afterSubmitByLane).map((entry) => entry.successMessage));
  assert.equal(messages.size, 5, "each submission lane must have distinct success messaging");

  assert.match(
    afterSubmitByLane["septic-service"].successMessage,
    /dispatch/i,
    "septic lane success copy should reinforce dispatch context",
  );
  assert.match(
    afterSubmitByLane.evaluation.followUpExpectation,
    /1-3 business days/i,
    "evaluation lane should keep timing guidance",
  );

  const successPanelPath = path.join(process.cwd(), "src", "components", "forms", "SubmissionSuccessPanel.tsx");
  const successPanelSource = readFileSync(successPanelPath, "utf8");

  assert.match(
    successPanelSource,
    /tank count, lid exposure, and urgency/i,
    "septic lane must include quote-shaping guidance for tank count/lids/urgency",
  );
  assert.match(
    successPanelSource,
    /1-3 business days/i,
    "realtor/evaluation lane must include timing guidance",
  );
  assert.match(
    successPanelSource,
    /Unit count, rental duration/i,
    "rental lane must include unit and duration guidance",
  );

  console.log("[lane-conversion] lane-specific success and quote-shaping guidance verified");
}

run();
