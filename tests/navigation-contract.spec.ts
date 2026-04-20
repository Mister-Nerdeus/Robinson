import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { footerFastPathLinks, primaryNavLinks } from "../src/content/navigation";

function read(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function run() {
  const headerSource = read("src/components/site/Header.tsx");
  assert.ok(
    headerSource.includes('from "@/content/navigation"'),
    "Header must import shared navigation content contract",
  );
  const navMapUses = headerSource.match(/primaryNavLinks\.map/g)?.length ?? 0;
  assert.ok(
    navMapUses >= 2,
    "Header must use shared primaryNavLinks for both mobile and desktop nav",
  );

  const footerSource = read("src/components/site/Footer.tsx");
  assert.ok(
    footerSource.includes("footerFastPathLinks.map"),
    "Footer must render fast paths from shared nav contract",
  );

  const primaryRoutes = primaryNavLinks.map((item) => item.href);
  const expectedPrimary = ["/", "/services", "/realtors", "/faq", "/contact"];
  assert.deepStrictEqual(
    primaryRoutes,
    expectedPrimary,
    "Primary navigation route hierarchy must stay canonical",
  );

  const footerRoutes = footerFastPathLinks.map((item) => item.href);
  assert.ok(
    footerRoutes.includes("/privacy"),
    "Footer fast path nav must include privacy route",
  );

  console.log("[navigation-contract] shared nav contract is used across desktop/mobile/footer");
}

run();
