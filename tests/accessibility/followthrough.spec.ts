import assert from "node:assert/strict";
import fs from "node:fs";

const routerFile = "src/components/contact/RequestRouter.tsx";
const formFile = "src/components/forms/RequestForm.tsx";

assert.ok(fs.existsSync(routerFile), "RequestRouter is required");
assert.ok(fs.existsSync(formFile), "RequestForm is required");

const formBody = fs.readFileSync(formFile, "utf8");
assert.ok(formBody.includes("aria-live"), "RequestForm must include aria-live status messaging");
assert.ok(formBody.includes("fieldAutocompleteMap"), "RequestForm must map common fields to autocomplete purposes");
assert.ok(formBody.includes("errorText"), "RequestForm must pass field-level error text");

const fieldBody = fs.readFileSync("src/components/forms/FormField.tsx", "utf8");
assert.ok(fieldBody.includes("aria-describedby"), "FormField must expose aria-describedby");
assert.ok(fieldBody.includes("autoComplete"), "FormField must support autocomplete");
assert.ok(fieldBody.includes("aria-invalid"), "FormField must expose aria-invalid for error state");

console.log("accessibility follow-through contract ok");
