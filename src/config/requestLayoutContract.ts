export const REQUEST_LAYOUT_CONTRACT_VERSION = "request-desktop-modes-v5";

export const REQUEST_LAYOUT_MODES = [
  "supportRail",
  "formDominant",
  "fullWidthSupport",
] as const;
export type RequestLayoutMode = (typeof REQUEST_LAYOUT_MODES)[number];

export const REQUEST_LAYOUT_DESKTOP_TOKENS = {
  outerTaskPageMaxWidth: "1720px",
  supportBandPrimaryMaxWidth: "1200px",
  supportRailMaxWidth: "408px",
  wizardShellMaxWidth: "980px",
  desktopGutter: "2.25rem",
} as const;

export const REQUEST_LAYOUT_ROUTE_IDS = [
  "/services/septic-cleaning",
  "/services/well-septic-evaluations",
  "/services/portable-toilets",
  "/services/commercial",
  "/contact",
  "/realtors",
] as const;

export type RequestLayoutRouteId = (typeof REQUEST_LAYOUT_ROUTE_IDS)[number];

export type RequestRouteSectionModes = {
  top: RequestLayoutMode;
  form: RequestLayoutMode;
  postForm?: RequestLayoutMode;
};

export const REQUEST_ROUTE_SECTION_MODES: Record<RequestLayoutRouteId, RequestRouteSectionModes> = {
  "/services/septic-cleaning": {
    top: "supportRail",
    form: "formDominant",
    postForm: "fullWidthSupport",
  },
  "/services/well-septic-evaluations": {
    top: "supportRail",
    form: "formDominant",
    postForm: "fullWidthSupport",
  },
  "/services/portable-toilets": {
    top: "supportRail",
    form: "formDominant",
  },
  "/services/commercial": {
    top: "supportRail",
    form: "formDominant",
  },
  "/contact": {
    top: "supportRail",
    form: "formDominant",
    postForm: "fullWidthSupport",
  },
  "/realtors": {
    top: "supportRail",
    form: "formDominant",
    postForm: "fullWidthSupport",
  },
};
