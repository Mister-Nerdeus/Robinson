import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

function read(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function run() {
  const requiredDocs = [
    "docs/mailbox-contract.md",
    "docs/inbound-mail-ops-contract.md",
    "docs/m365-mailbox-decision-record.md",
    "docs/m365-provisioning-checklist-net.md",
  ];

  for (const doc of requiredDocs) {
    assert.ok(fs.existsSync(path.join(process.cwd(), doc)), `missing m365 mailbox artifact: ${doc}`);
  }

  const mailbox = read("docs/mailbox-contract.md");
  const inbound = read("docs/inbound-mail-ops-contract.md");
  const decision = read("docs/m365-mailbox-decision-record.md").toLowerCase();
  const provisioning = read("docs/m365-provisioning-checklist-net.md").toLowerCase();
  const mainEnv = read(".env.main.example");

  assert.ok(mailbox.includes("service@robinsonseptic.net"), "mailbox contract must use .net reply target");
  assert.ok(inbound.includes("service@robinsonseptic.net"), "inbound contract must use .net reply target");
  assert.ok(decision.includes("shared-mailbox-primary"), "decision record must explicitly define shared mailbox usage");
  assert.ok(decision.includes("cloudflare"), "decision record must document cloudflare dns ownership");
  assert.ok(provisioning.includes("cloudflare"), "provisioning checklist must document cloudflare dns responsibilities");
  assert.ok(provisioning.includes("alias"), "provisioning checklist must document alias usage");
  assert.ok(mainEnv.includes("NOTIFICATION_REPLY_TO_EMAIL=service@robinsonseptic.net"), "main env must align reply target");

  console.log("[m365-net-mailbox-contract] .net mailbox and workflow contract verified");
}

run();
