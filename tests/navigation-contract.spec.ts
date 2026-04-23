import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { footerFastPathLinks, getHeaderNavLinks, primaryNavLinks } from "../src/content/navigation";

function read(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

function run() {
  const headerSource = read("src/components/site/Header.tsx");
  assert.ok(
    headerSource.includes('from "@/content/navigation"'),
    "Header must import shared navigation content contract",
  );
  const navMapUses = headerSource.match(/navLinks\.map/g)?.length ?? 0;
  assert.ok(
    navMapUses >= 1,
    "Header desktop nav must render shared nav links",
  );
  assert.ok(
    headerSource.includes("getHeaderNavLinks"),
    "Header must resolve nav links from canonical shared route source",
  );
  const mobileNavSource = read("src/components/site/MobileNav.tsx");
  assert.ok(
    mobileNavSource.includes("links.map"),
    "MobileNav must render the shared nav links set",
  );

  const footerSource = read("src/components/site/Footer.tsx");
  assert.ok(
    footerSource.includes("footerFastPathLinks.map"),
    "Footer must render fast paths from shared nav contract",
  );
  assert.ok(
    footerSource.includes("data-secondary-route-links"),
    "Footer must expose secondary route links marker for non-task routes",
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
  assert.deepStrictEqual(
    getHeaderNavLinks("task").map((item) => item.href),
    ["/services", "/contact", "/faq"],
    "Task header nav route source must stay canonical",
  );

  console.log("[navigation-contract] shared nav contract is used across desktop/mobile/footer");
}

run();
