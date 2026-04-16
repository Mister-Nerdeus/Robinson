export const REQUEST_LAYOUT_CONTRACT_VERSION = "form-first-full-width-v2";

export const REQUEST_LAYOUT_ROUTE_IDS = [
  "/services/septic-cleaning",
  "/services/well-septic-evaluations",
  "/services/portable-toilets",
  "/services/commercial",
  "/contact",
  "/realtors",
] as const;

export type RequestLayoutRouteId = (typeof REQUEST_LAYOUT_ROUTE_IDS)[number];
