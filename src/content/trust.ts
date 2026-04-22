export type TrustSource = {
  id: string;
  sourceType: "legacy-pdf" | "business-record" | "association" | "first-party";
  freshness: "current" | "needs-review";
  lastReviewed: string;
};

export type TrustSignal = {
  id: string;
  label: string;
  owner: "content" | "operations" | "owner" | "marketing";
  status: "verified" | "marketing" | "pending-verification";
  source: TrustSource;
};

export const trustSignals: TrustSignal[] = [
  {
    id: "family-owned-1979",
    label: "Family owned and operated since 1979",
    owner: "content",
    status: "verified",
    source: {
      id: "legacy-brand-pack",
      sourceType: "legacy-pdf",
      freshness: "current",
      lastReviewed: "2026-04-22",
    },
  },
  {
    id: "emergency-24-7",
    label: "24/7 Emergency Service",
    owner: "operations",
    status: "verified",
    source: {
      id: "legacy-homepage",
      sourceType: "legacy-pdf",
      freshness: "current",
      lastReviewed: "2026-04-22",
    },
  },
  {
    id: "broad-service-mix",
    label: "Residential, evaluation, rental, and commercial lanes in one dispatch operation",
    owner: "content",
    status: "verified",
    source: {
      id: "service-lane-contract",
      sourceType: "first-party",
      freshness: "needs-review",
      lastReviewed: "2026-04-22",
    },
  },
  {
    id: "realtor-support",
    label: "Realtor and home-sale evaluation workflow support",
    owner: "operations",
    status: "verified",
    source: {
      id: "legacy-realtor-materials",
      sourceType: "legacy-pdf",
      freshness: "current",
      lastReviewed: "2026-04-22",
    },
  },
  {
    id: "association-promo-language",
    label: "Association promotional language",
    owner: "owner",
    status: "pending-verification",
    source: {
      id: "legacy-association-assets",
      sourceType: "association",
      freshness: "needs-review",
      lastReviewed: "2026-04-22",
    },
  },
  {
    id: "legacy-social-prompt",
    label: "Legacy social trust prompt",
    owner: "marketing",
    status: "marketing",
    source: {
      id: "legacy-home-social",
      sourceType: "legacy-pdf",
      freshness: "needs-review",
      lastReviewed: "2026-04-22",
    },
  },
  {
    id: "legacy-coupon-trust",
    label: "Legacy coupon trust element",
    owner: "owner",
    status: "pending-verification",
    source: {
      id: "legacy-coupon-asset",
      sourceType: "legacy-pdf",
      freshness: "needs-review",
      lastReviewed: "2026-04-22",
    },
  },
];

export const trustGovernance = [
  {
    block: "Family-owned and founded messaging",
    decision: "keep",
    reason: "Source-backed and central to the current trust narrative.",
  },
  {
    block: "Emergency responsiveness proof",
    decision: "keep",
    reason: "Core customer decision signal and aligns to call-first routing.",
  },
  {
    block: "Association logo/membership promotion",
    decision: "update",
    reason: "Association facts may remain in verification docs but are no longer required as homepage primary trust copy.",
  },
  {
    block: "Facebook trust prompt",
    decision: "remove",
    reason: "Legacy social prompt does not strengthen current lane decisions.",
  },
  {
    block: "Coupon graphic trust/offer block",
    decision: "remove",
    reason: "Legacy offer terms are unverified and should not appear on customer routes.",
  },
];

export const trustContent = {
  status: "verified" as const,
  pointsStatus: "verified" as const,
  points: trustSignals.filter((signal) => signal.status === "verified").map((signal) => signal.label),
  trustStatementStatus: "marketing" as const,
  trustStatement:
    "Robinson keeps service promises concise: clear routing, realistic follow-up expectations, and lane-specific intake detail.",
  sourcePolicy: "No trust signal should publish without source metadata and freshness status.",
};
