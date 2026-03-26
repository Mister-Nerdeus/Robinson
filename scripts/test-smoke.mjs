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
    type: "general-contact",
    fullName: "Docker Smoke",
    phone: "555-333-1111",
    email: "docker-smoke@example.com",
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
  assert.equal(rowsRes.status, 200, "admin submissions endpoint should be enabled in .env.test");
  const rowsBody = await rowsRes.json();
  assert.ok(Array.isArray(rowsBody.rows), "rows should be an array");
  assert.ok(rowsBody.rows.length > 0, "rows should contain the submitted record");

  console.log("[test-stack-smoke] pass");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
