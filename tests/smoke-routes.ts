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
    address: "Test Lane",
    preferredDate: "2026-03-26",
    message: "Smoke path submission",
    tankSizeGallons: "1200",
  };

  const parsed = submissionSchema.safeParse(payload);
  assert.ok(parsed.success, "Schema should validate sample submission");
  const created = await createSubmission(parsed.data);
  assert.ok(created.delivery, "Submission should include delivery result");
  const rows = await getSubmissions();
  assert.ok(rows.length > 0, "Submission storage should contain at least one record");

  process.env.ENABLE_ADMIN_SUBMISSIONS_REVIEW = "false";
  const blocked = await GET();
  assert.equal(blocked.status, 403, "Admin GET must be blocked when env flag is false");

  process.env.ENABLE_ADMIN_SUBMISSIONS_REVIEW = "true";
  const open = await GET();
  assert.equal(open.status, 200, "Admin GET must open when env flag is true");

  console.log("[smoke] routes and submission path pass");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});

