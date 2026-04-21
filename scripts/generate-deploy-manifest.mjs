import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { execSync } from "node:child_process";

const DEFAULT_ROUTES = [
  "/contact",
  "/realtors",
  "/services/septic-cleaning",
  "/services/well-septic-evaluations",
  "/services/portable-toilets",
  "/services/commercial",
];

function parseArg(name, fallback = "") {
  const prefix = `${name}=`;
  const found = process.argv.find((arg) => arg.startsWith(prefix));
  if (!found) return fallback;
  return found.slice(prefix.length);
}

async function readContractVersion() {
  const explicit = (process.env.REQUEST_LAYOUT_CONTRACT_VERSION || "").trim();
  if (explicit) return explicit;
  const filePath = path.join(process.cwd(), "src/config/requestLayoutContract.ts");
  const source = await readFile(filePath, "utf8");
  const match = source.match(/REQUEST_LAYOUT_CONTRACT_VERSION\s*=\s*"([^"]+)"/);
  if (!match) {
    throw new Error("Unable to resolve REQUEST_LAYOUT_CONTRACT_VERSION");
  }
  return match[1];
}

function safeGit(command, fallback = "") {
  try {
    return execSync(command, { stdio: ["ignore", "pipe", "ignore"] }).toString("utf8").trim();
  } catch {
    return fallback;
  }
}

async function main() {
  const outputPath = parseArg("--output", "artifacts/deploy-manifest.json");
  const runtimeMode = (process.env.RUNTIME_MODE || "local").trim();
  const branch = safeGit("git rev-parse --abbrev-ref HEAD", "unknown");
  const commit = (process.env.DEPLOY_COMMIT_SHA || "").trim() || safeGit("git rev-parse HEAD", "unknown");
  const ref = (process.env.DEPLOY_REF || "").trim() || safeGit("git symbolic-ref -q HEAD", branch);
  const buildTimestampUtc = (process.env.DEPLOY_BUILD_TIME_UTC || "").trim() || new Date().toISOString();
  const contractVersion = await readContractVersion();
  const manifest = {
    generatedAtUtc: new Date().toISOString(),
    runtimeMode,
    branch,
    ref,
    commit,
    buildTimestampUtc,
    requestLayoutContractVersion: contractVersion,
    requestRoutes: DEFAULT_ROUTES,
  };

  const absoluteOutput = path.isAbsolute(outputPath)
    ? outputPath
    : path.join(process.cwd(), outputPath);
  await mkdir(path.dirname(absoluteOutput), { recursive: true });
  await writeFile(absoluteOutput, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  process.stdout.write(`Deploy manifest written to ${absoluteOutput}\n`);
}

main().catch((error) => {
  process.stderr.write(`generate-deploy-manifest failed: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exit(1);
});
