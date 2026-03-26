import assert from "node:assert";
import { evaluateSpam } from "../src/lib/forms/antiSpam";

const cases = [
  { name: "valid", input: { honeypot: "", fullName: "Alex Homeowner", message: "Need septic cleaning this week" }, allowed: true },
  { name: "honeypot", input: { honeypot: "https://bot.site", fullName: "Bot", message: "promo" }, allowed: false },
  { name: "pattern", input: { honeypot: "", fullName: "Spam", message: "visit http://spam.example now" }, allowed: false },
];

for (const item of cases) {
  const result = evaluateSpam(item.input);
  assert.equal(result.allowed, item.allowed, `${item.name} expected ${item.allowed}`);
  console.log(`${item.name}: ${result.allowed ? "allowed" : `blocked (${result.reason})`}`);
}

console.log("[abuse-matrix] pass");
