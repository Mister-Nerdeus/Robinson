import assert from "node:assert/strict";
import fs from "node:fs";

const routerFile = "src/components/contact/RequestRouter.tsx";
const formFile = "src/components/forms/RequestForm.tsx";

assert.ok(fs.existsSync(routerFile), "RequestRouter is required");
assert.ok(fs.existsSync(formFile), "RequestForm is required");

const formBody = fs.readFileSync(formFile, "utf8");
assert.ok(formBody.includes("aria-live"), "RequestForm must include aria-live status messaging");

console.log("accessibility follow-through contract ok");
