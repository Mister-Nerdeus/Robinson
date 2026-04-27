import { spawnSync } from "node:child_process";

const shouldSyntheticFail =
  process.argv.includes("--synthetic-fail") ||
  process.env.HOMEPAGE_UX_GATE_FORCE_FAIL === "1";

if (shouldSyntheticFail) {
  console.error("[homepage-apple-ux-gate] synthetic failure mode triggered");
  process.exit(1);
}

const result = spawnSync("npx", ["tsx", "tests/homepage-apple-ux-contract.spec.ts"], {
  stdio: "inherit",
  shell: process.platform === "win32",
});

process.exit(result.status ?? 1);
