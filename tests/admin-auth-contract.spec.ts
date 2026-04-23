import assert from "node:assert";
import { NextRequest } from "next/server";
import { middleware } from "../src/middleware";
import { GET } from "../src/app/api/submissions/route";

async function run() {
  process.env.ENABLE_ADMIN_SUBMISSIONS_REVIEW = "true";
  process.env.ADMIN_OWNER_TOKEN = "owner-auth-contract-token-012345";
  process.env.ADMIN_OPS_TOKEN = "ops-auth-contract-token-012345";
  process.env.ADMIN_SESSION_COOKIE_NAME = "robinson_admin_session";
  process.env.LOCAL_ONLY_MODE = "false";
  process.env.RUNTIME_MODE = "production";

  const adminPageAnonymous = middleware(new NextRequest("http://localhost/admin/submissions"));
  assert.equal(adminPageAnonymous.status, 401, "anonymous admin page request must be blocked");

  const adminPageAuthed = middleware(
    new NextRequest("http://localhost/admin/submissions", {
      headers: {
        cookie: "robinson_admin_session=owner-auth-contract-token-012345",
      },
    }),
  );
  assert.equal(adminPageAuthed.status, 200, "owner cookie should pass admin page gate");

  const apiAnonymous = await GET(new Request("http://localhost/api/submissions"));
  assert.equal(apiAnonymous.status, 401, "anonymous submissions api request must be blocked");

  const apiOwner = await GET(
    new Request("http://localhost/api/submissions", {
      headers: {
        cookie: "robinson_admin_session=owner-auth-contract-token-012345",
      },
    }),
  );
  assert.equal(apiOwner.status, 200, "authenticated owner request should succeed");

  const apiOps = await GET(
    new Request("http://localhost/api/submissions", {
      headers: {
        authorization: "Bearer ops-auth-contract-token-012345",
      },
    }),
  );
  assert.equal(apiOps.status, 200, "authenticated ops request should succeed");

  console.log("[admin-auth] anonymous blocked and owner/ops allowed");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
