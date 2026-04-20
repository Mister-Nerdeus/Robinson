import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

function read(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function run() {
  const source = read("src/app/page.tsx");

  assert.ok(
    source.includes(
      'data-homepage-structure="hero-primary-task-ctas-service-lanes-trust-realtor-faq-final-cta"',
    ),
    "Homepage must declare required section-order contract",
  );

  const orderMarkers = [
    "<Section>",
    'title="Primary task CTAs"',
    'title="Service lanes"',
    'title="Built on proven local trust"',
    "title={homeContent.realtorLane.title}",
    'title="Helpful questions before service"',
    "<CtaBand",
  ];

  const positions = orderMarkers.map((marker) => source.indexOf(marker));
  for (const [i, pos] of positions.entries()) {
    assert.ok(pos >= 0, `Homepage is missing required section marker: ${orderMarkers[i]}`);
    if (i > 0) {
      assert.ok(
        positions[i - 1] < pos,
        `Homepage marker order is invalid: ${orderMarkers[i - 1]} must come before ${orderMarkers[i]}`,
      );
    }
  }

  const genericCtas = ["Request Service", "Learn More", "Contact Us"];
  for (const generic of genericCtas) {
    assert.ok(!source.includes(`>${generic}<`), `Homepage CTA label must not be generic: ${generic}`);
  }

  console.log("[homepage-structure-contract] homepage order and CTA specificity verified");
}

run();
