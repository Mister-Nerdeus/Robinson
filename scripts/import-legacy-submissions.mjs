import { spawnSync } from "node:child_process";

const args = process.argv.slice(2);
const result = spawnSync("npx", ["tsx", "scripts/import-legacy-submissions.ts", ...args], {
  stdio: "inherit",
  shell: true,
});

process.exit(result.status ?? 1);
