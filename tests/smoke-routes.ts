import fs from "node:fs";
import path from "node:path";
import assert from "node:assert";
import { submissionSchema } from "../src/lib/forms/schema";
import { createSubmission, getSubmissions } from "../src/lib/forms/actions";
import { GET } from "../src/app/api/submissions/route";

async function run() {
  const requiredRoutes = [
    "src/app/page.tsx",
    "src/app/services/page.tsx",
    "src/app/contact/page.tsx",
    "src/app/services/septic-cleaning/page.tsx",
    "src/app/admin/submissions/page.tsx",
  ];

  for (const route of requiredRoutes) {
    const full = path.join(process.cwd(), route);
    assert.ok(fs.existsSync(full), `Missing route file: ${route}`);
  }

  const payload = {
    type: "septic-service",
    fullName: "Smoke Test",
    phone: "555-0100",
    email: "smoke@example.com",
    streetAddress: "100 Test Lane",
    city: "Pierson",
    zip: "49339",
    state: "MI",
    preferredDate: "2026-03-26",
    urgency: "urgent",
    message: "Smoke path submission",
    tankSizeGallons: "1000",
    tankCount: "1",
    lidsExposed: "yes",
    tankLocationKnown: "yes",
    problemSigns: ["slow-drains"],
    additionalWarningDetails: "Kitchen line drains slowly first.",
    accessIssues: ["none"],
    existingCustomer: "unsure",
    propertyUsage: "residential",
    systemPumpedBefore: "unsure",
  };

  const parsed = submissionSchema.safeParse(payload);
  assert.ok(parsed.success, "Schema should validate sample submission");
  const created = await createSubmission(parsed.data);
  assert.ok(created.delivery, "Submission should include delivery result");
  const rows = await getSubmissions();
  assert.ok(rows.length > 0, "Submission storage should contain at least one record");

  process.env.RUNTIME_MODE = "demo";
  process.env.LOCAL_ONLY_MODE = "false";
  process.env.ENABLE_ADMIN_SUBMISSIONS_REVIEW = "true";
  process.env.ALLOW_ADMIN_OUTSIDE_LOCAL_MODE = "true";
  process.env.REVIEW_ACCESS_COOKIE_NAME = "robinson_review_access";
  process.env.REVIEW_ACCESS_KEY = "smoke-review-access-secret";

  const blocked = await GET(new Request("http://localhost/api/submissions"));
  assert.equal(blocked.status, 401, "Admin GET must be blocked without review access cookie");

  const open = await GET(
    new Request("http://localhost/api/submissions", {
      headers: {
        cookie: "robinson_review_access=smoke-review-access-secret",
      },
    }),
  );
  assert.equal(open.status, 200, "Admin GET must open with valid review access cookie");

  console.log("[smoke] routes and submission path pass");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
