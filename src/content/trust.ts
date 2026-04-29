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

export type TrustClaimClass =
  | "reviews"
  | "bbb"
  | "emergency"
  | "service-area"
  | "association"
  | "heritage";

export type TrustClaimStatus = "approved" | "owner-review-required" | "retired-internal-only";

export type TrustClaim = {
  id: string;
  class: TrustClaimClass;
  label: string;
  owner: "content" | "operations" | "owner" | "marketing";
  status: TrustClaimStatus;
  evidenceRef: string;
  ownerApprovalRef: string;
  notes: string;
  lastReviewed: string;
};

export type HomepageTrustClaim = {
  id: string;
  statement: string;
  classification: "verified-source";
  sourceRefs: string[];
  notes: string;
};

export const trustClaimRegistry: TrustClaim[] = [
  {
    id: "family-owned-1979",
    class: "heritage",
    label: "Family owned and operated since 1979",
    owner: "content",
    status: "approved",
    evidenceRef: "legacy-brand-pack",
    ownerApprovalRef: "owner-truth-dashboard:heritage",
    notes: "Core trust statement; approved and publishable.",
    lastReviewed: "2026-04-25",
  },
  {
    id: "emergency-call-first-24-7",
    class: "emergency",
    label: "24/7 emergency septic response is call-first",
    owner: "operations",
    status: "approved",
    evidenceRef: "dispatch-policy-call-first",
    ownerApprovalRef: "owner-truth-dashboard:emergency",
    notes: "Must remain explicitly separated from normal office scheduling hours.",
    lastReviewed: "2026-04-25",
  },
  {
    id: "service-lane-coverage",
    class: "service-area",
    label: "Residential, evaluation, rental, and commercial services are coordinated by one dispatch operation",
    owner: "operations",
    status: "approved",
    evidenceRef: "service-lane-contract",
    ownerApprovalRef: "owner-truth-dashboard:lane-coverage",
    notes: "Provider-neutral lane contract.",
    lastReviewed: "2026-04-25",
  },
  {
    id: "realtor-evaluation-support",
    class: "service-area",
    label: "Realtor and home-sale evaluation coordination support",
    owner: "operations",
    status: "approved",
    evidenceRef: "legacy-realtor-materials",
    ownerApprovalRef: "owner-truth-dashboard:realtor",
    notes: "Priority conversion lane with owner approval.",
    lastReviewed: "2026-04-25",
  },
  {
    id: "msta-membership-wording",
    class: "association",
    label: "Member of the Michigan Septic Tank Association",
    owner: "owner",
    status: "owner-review-required",
    evidenceRef: "legacy-association-assets",
    ownerApprovalRef: "pending-owner-approval",
    notes: "Do not publish as primary trust copy until explicitly reconfirmed.",
    lastReviewed: "2026-04-25",
  },
  {
    id: "bbb-accreditation-language",
    class: "bbb",
    label: "BBB accreditation claim",
    owner: "owner",
    status: "retired-internal-only",
    evidenceRef: "claim-registry:bbb-blocked",
    ownerApprovalRef: "blocked",
    notes: "Blocked from public content until independently verified and approved.",
    lastReviewed: "2026-04-25",
  },
  {
    id: "inflated-review-footprint",
    class: "reviews",
    label: "Large review-count claims",
    owner: "marketing",
    status: "retired-internal-only",
    evidenceRef: "claim-registry:review-footprint-blocked",
    ownerApprovalRef: "blocked",
    notes: "No public rendering without verifiable source and owner approval.",
    lastReviewed: "2026-04-25",
  },
];

function sourceTypeForClaimClass(claimClass: TrustClaimClass): TrustSource["sourceType"] {
  if (claimClass === "association") return "association";
  if (claimClass === "service-area" || claimClass === "emergency") return "first-party";
  if (claimClass === "heritage") return "legacy-pdf";
  return "business-record";
}

export const trustSignals: TrustSignal[] = trustClaimRegistry.map((claim) => ({
  id: claim.id,
  label: claim.label,
  owner: claim.owner,
  status:
    claim.status === "approved"
      ? "verified"
      : claim.status === "owner-review-required"
        ? "pending-verification"
        : "marketing",
  source: {
    id: claim.evidenceRef,
    sourceType: sourceTypeForClaimClass(claim.class),
    freshness: claim.status === "approved" ? "current" : "needs-review",
    lastReviewed: claim.lastReviewed,
  },
}));

export const trustGovernance = [
  {
    block: "Family-owned and founded messaging",
    decision: "keep",
    reason: "Source-backed and explicitly approved.",
  },
  {
    block: "Emergency responsiveness proof",
    decision: "keep",
    reason: "Approved call-first policy with 24/7 response wording.",
  },
  {
    block: "Association logo/membership promotion",
    decision: "update",
    reason: "Keep internal until owner re-approves public emphasis.",
  },
  {
    block: "BBB and inflated review claims",
    decision: "remove",
    reason: "Blocked classes remain retired-internal-only until evidence + owner approval.",
  },
];

const approvedPublicClaims = trustClaimRegistry.filter((claim) => claim.status === "approved");

export const homepageTrustStack: HomepageTrustClaim[] = [
  {
    id: "family-owned-operated",
    statement: "Family owned and operated.",
    classification: "verified-source",
    sourceRefs: ["company.claims.family_owned", "docs/business-truth/owner-truth-dashboard.md"],
    notes: "Core heritage proof kept concise on the homepage.",
  },
  {
    id: "founded-1979",
    statement: "Founded in 1979.",
    classification: "verified-source",
    sourceRefs: ["company.claims.founded_1979", "docs/final-copy-proof-map.md"],
    notes: "Separated from family-owned phrasing to reduce repetition.",
  },
  {
    id: "residential-commercial-service",
    statement: "Residential and commercial septic service.",
    classification: "verified-source",
    sourceRefs: ["company.claims.residential_commercial", "docs/final-copy-proof-map.md"],
    notes: "Broader service credibility stays scoped to publishable service facts.",
  },
  {
    id: "home-sale-evaluations",
    statement: "Well and septic evaluations for home sales.",
    classification: "verified-source",
    sourceRefs: ["company.claims.home_sale_evaluations", "docs/final-copy-proof-map.md"],
    notes: "Protects the Realtor lane as a verified premium service path.",
  },
  {
    id: "rentals-and-support-services",
    statement: "Portable toilet rentals, grease trap cleaning, and lift pump support.",
    classification: "verified-source",
    sourceRefs: [
      "company.claims.portable_toilet_rentals",
      "company.claims.grease_trap_cleaning",
      "company.claims.lift_pump_service",
      "docs/final-copy-proof-map.md",
    ],
    notes: "Represents broader support credibility without drifting into legacy filler.",
  },
];

export const homepageTrustClaimSourceMap = homepageTrustStack.map((claim) => ({
  claimId: claim.id,
  statement: claim.statement,
  sourceRefs: claim.sourceRefs,
  classification: claim.classification,
}));

export const blockedHomepageTrustPatterns = [
  "coupon",
  "discount",
  "facebook",
  "bbb",
  "association membership",
  "review count",
  "speed dial",
];

export const trustContent = {
  status: "verified" as const,
  pointsStatus: "verified" as const,
  points: homepageTrustStack.map((claim) => claim.statement),
  trustStatementStatus: "verified" as const,
  trustStatement:
    "The homepage trust section uses only verified longevity and service-scope facts.",
  sourcePolicy:
    "Every public trust claim must map to evidenceRef and ownerApprovalRef; blocked classes stay internal-only.",
};
