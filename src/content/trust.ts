export type TrustSource = {
  id: string;
  sourceType: "legacy-pdf" | "business-record" | "association" | "first-party";
  freshness: "current" | "needs-review";
  lastReviewed: string;
};

export type TrustSignal = {
  id: string;
  label: string;
  status: "verified" | "pending";
  source: TrustSource;
};

export const trustSignals: TrustSignal[] = [
  {
    id: "family-owned-1979",
    label: "Family owned and operated since 1979",
    status: "verified",
    source: {
      id: "legacy-brand-pack",
      sourceType: "legacy-pdf",
      freshness: "current",
      lastReviewed: "2026-04-19",
    },
  },
  {
    id: "emergency-24-7",
    label: "24/7 Emergency Service",
    status: "verified",
    source: {
      id: "legacy-homepage",
      sourceType: "legacy-pdf",
      freshness: "current",
      lastReviewed: "2026-04-19",
    },
  },
  {
    id: "msta-membership",
    label: "Member of the Michigan Septic Tank Association",
    status: "verified",
    source: {
      id: "msta-logo-asset",
      sourceType: "association",
      freshness: "needs-review",
      lastReviewed: "2026-04-19",
    },
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
