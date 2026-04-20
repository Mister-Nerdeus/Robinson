import assert from "node:assert/strict";
import { mediaManifest } from "@/content/media";

for (const asset of mediaManifest) {
  assert.ok(asset.id.length > 0, "Asset id required");
  assert.ok(asset.alt.length > 0, `Alt text missing for ${asset.id}`);
  assert.ok(asset.allowedRoutes.length > 0, `Route usage missing for ${asset.id}`);
}

console.log("media manifest contract ok");
