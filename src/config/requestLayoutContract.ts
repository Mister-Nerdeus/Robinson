export const REQUEST_LAYOUT_CONTRACT_VERSION = "request-desktop-modes-v3";

export const REQUEST_LAYOUT_MODES = ["support-rail", "full-width"] as const;
export type RequestLayoutMode = (typeof REQUEST_LAYOUT_MODES)[number];

export const REQUEST_LAYOUT_ROUTE_IDS = [
  "/services/septic-cleaning",
  "/services/well-septic-evaluations",
  "/services/portable-toilets",
  "/services/commercial",
  "/contact",
  "/realtors",
] as const;

export type RequestLayoutRouteId = (typeof REQUEST_LAYOUT_ROUTE_IDS)[number];
