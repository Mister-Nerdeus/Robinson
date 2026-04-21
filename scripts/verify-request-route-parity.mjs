import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROUTE_EXPECTATIONS = [
  { route: "/contact", marker: `data-task-page-route="/contact"` },
  { route: "/realtors", marker: `data-task-page-route="/realtors"` },
  { route: "/services/septic-cleaning", marker: `data-request-layout-route="/services/septic-cleaning"` },
  { route: "/services/well-septic-evaluations", marker: `data-request-layout-route="/services/well-septic-evaluations"` },
  { route: "/services/portable-toilets", marker: `data-task-page-route="/services/portable-toilets"` },
  { route: "/services/commercial", marker: `data-task-page-route="/services/commercial"` },
];

function parseArg(name, fallback = "") {
  const prefix = `${name}=`;
  const found = process.argv.find((arg) => arg.startsWith(prefix));
  if (!found) return fallback;
  return found.slice(prefix.length);
}

function parseTimestamp(value) {
  const timestamp = Date.parse(value);
  if (Number.isNaN(timestamp)) {
    throw new Error(`Invalid timestamp: ${value}`);
  }
  return timestamp;
}

async function fetchRoute(targetHost, route) {
  const url = `${targetHost}${route}`;
  const response = await fetch(url, {
    headers: {
      "cache-control": "no-cache, no-store, max-age=0",
      pragma: "no-cache",
    },
  });

  const body = await response.text();
  const cacheControl = response.headers.get("cache-control") || "";
  return {
    route,
    status: response.status,
    ok: response.ok,
    cacheControl,
    etag: response.headers.get("etag") || "",
    lastModified: response.headers.get("last-modified") || "",
    cfCacheStatus: response.headers.get("cf-cache-status") || "",
    body,
  };
}

async function main() {
  const targetHost = parseArg("--target", process.env.PARITY_TARGET_HOST || "http://localhost:4850").replace(/\/$/, "");
  const manifestPath = parseArg("--manifest", "artifacts/deploy-manifest.json");
  const outputPath = parseArg("--output", "artifacts/request-route-parity.json");
  const maxManifestAgeMinutes = Number.parseInt(parseArg("--max-manifest-age-minutes", "180"), 10);

  const absoluteManifestPath = path.isAbsolute(manifestPath)
    ? manifestPath
    : path.join(process.cwd(), manifestPath);
  const absoluteOutputPath = path.isAbsolute(outputPath)
    ? outputPath
    : path.join(process.cwd(), outputPath);

  const manifestRaw = await readFile(absoluteManifestPath, "utf8");
  const manifest = JSON.parse(manifestRaw);
  const manifestGeneratedAt = parseTimestamp(manifest.generatedAtUtc);
  const manifestAgeMinutes = (Date.now() - manifestGeneratedAt) / (1000 * 60);
  if (manifestAgeMinutes > maxManifestAgeMinutes) {
    throw new Error(`Deploy manifest is stale (${manifestAgeMinutes.toFixed(1)} minutes old)`);
  }

  const results = [];
  for (const expectation of ROUTE_EXPECTATIONS) {
    const fetched = await fetchRoute(targetHost, expectation.route);
    if (!fetched.ok) {
      throw new Error(`Route parity failed for ${expectation.route}: HTTP ${fetched.status}`);
    }
    if (!fetched.cacheControl.toLowerCase().includes("no-store")) {
      throw new Error(`Route parity failed for ${expectation.route}: cache-control missing no-store`);
    }
    if (!fetched.body.includes(expectation.marker)) {
      throw new Error(`Route parity failed for ${expectation.route}: missing marker ${expectation.marker}`);
    }
    results.push({
      route: expectation.route,
      status: fetched.status,
      cacheControl: fetched.cacheControl,
      cfCacheStatus: fetched.cfCacheStatus,
      etag: fetched.etag,
      lastModified: fetched.lastModified,
      marker: expectation.marker,
      result: "pass",
    });
  }

  const output = {
    generatedAtUtc: new Date().toISOString(),
    targetHost,
    deployManifest: {
      path: absoluteManifestPath,
      generatedAtUtc: manifest.generatedAtUtc,
      requestLayoutContractVersion: manifest.requestLayoutContractVersion,
      commit: manifest.commit,
      ref: manifest.ref,
      branch: manifest.branch,
    },
    routes: results,
  };

  await mkdir(path.dirname(absoluteOutputPath), { recursive: true });
  await writeFile(absoluteOutputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  process.stdout.write(`Request route parity report written to ${absoluteOutputPath}\n`);
}

main().catch((error) => {
  process.stderr.write(`verify-request-route-parity failed: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exit(1);
});
