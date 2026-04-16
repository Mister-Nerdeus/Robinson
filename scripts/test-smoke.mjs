import assert from "node:assert";

const base = process.env.TEST_BASE_URL ?? "http://localhost:3001";

async function waitReady(timeoutMs = 90000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(base);
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 1500));
  }
  throw new Error("Stack did not become ready");
}

async function run() {
  await waitReady();

  const payload = {
    type: "general",
    fullName: "Docker Smoke",
    phone: "555-333-1111",
    email: "docker-smoke@example.com",
    topic: "general-question",
    serviceLocationInvolved: "no",
    urgency: "normal",
    preferredDate: "",
    streetAddress: "",
    city: "",
    zip: "",
    state: "MI",
    address: "",
    message: "Testing stack notification and persistence path",
    companyWebsite: "",
  };

  const submit = await fetch(`${base}/api/submissions`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": "198.51.100.20" },
    body: JSON.stringify(payload),
  });
  assert.equal(submit.status, 201, "submission should succeed");
  const submitBody = await submit.json();
  assert.equal(submitBody.ok, true, "submission response should be ok");
  assert.ok(submitBody.delivery, "delivery object should be present");

  const rowsRes = await fetch(`${base}/api/submissions`);
  assert.equal(rowsRes.status, 401, "admin submissions endpoint should require explicit review cookie");

  const rowsAuthorized = await fetch(`${base}/api/submissions`, {
    headers: {
      cookie: "robinson_review_access=test-review-access-secret",
    },
  });
  assert.equal(rowsAuthorized.status, 200, "admin submissions endpoint should open with review cookie");

  const rowsBody = await rowsAuthorized.json();
  assert.ok(Array.isArray(rowsBody.rows), "rows should be an array");
  assert.ok(rowsBody.rows.length > 0, "rows should contain the submitted record");

  console.log("[test-stack-smoke] pass");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
