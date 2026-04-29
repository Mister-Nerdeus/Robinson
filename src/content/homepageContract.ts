import { publicCta } from "@/content/cta";
import { homeContent } from "@/content/home";
import {
  blockedHomepageTrustPatterns,
  homepageTrustClaimSourceMap,
  homepageTrustStack,
} from "@/content/trust";

export const HOMEPAGE_CONTRACT_VERSION = "homepage-contract-v2";
export const HOMEPAGE_LIVE_PARITY_CONTRACT_VERSION = "homepage-live-parity-v1";
export const HOMEPAGE_TRUST_STACK_CONTRACT_VERSION = "homepage-trust-stack-v1";
export const HOMEPAGE_CTA_LADDER_CONTRACT_VERSION = "homepage-cta-ladder-v1";
export const HOMEPAGE_MESSAGE_COMPRESSION_CONTRACT_VERSION = "homepage-message-compression-v1";
export const HOMEPAGE_PERFORMANCE_CONTRACT_VERSION = "homepage-performance-v1";
export const HOMEPAGE_MOBILE_CONVERSION_CONTRACT_VERSION = "homepage-mobile-conversion-v1";

export type HomepageCtaSurface =
  | "header-call"
  | "header-request"
  | "hero-call"
  | "hero-request"
  | "chooser-emergency-septic"
  | "chooser-routine-pumping"
  | "chooser-evaluation"
  | "chooser-rental"
  | "chooser-commercial"
  | "realtor-band"
  | "mobile-rail-call"
  | "mobile-rail-request"
  | "final-request";

export const homepageContract = {
  version: HOMEPAGE_CONTRACT_VERSION,
  sectionOrder: homeContent.sectionContract,
  liveParity: {
    version: HOMEPAGE_LIVE_PARITY_CONTRACT_VERSION,
    artifactPath: "docs/verification/homepage-live-parity.json",
    screenshots: {
      develop: "docs/screenshots/home-live-parity-develop-1440.png",
      demo: "docs/screenshots/home-live-parity-demo-1440.png",
    },
    requiredMarkers: {
      heroHeading: homeContent.hero.heading,
      chooserHeading: homeContent.chooserHeading,
      trustBandTitle: homeContent.trustBand.title,
      realtorBandTitle: homeContent.realtorBand.title,
      finalCtaHeading: homeContent.finalCta.heading,
      footerSurfaceMarker: "compact-contact-v1",
    },
    driftSignals: [
      "choose your task lane",
      "open all request lanes",
      "built on proven local trust",
      "route links (secondary)",
      "website coupon",
      "facebook and local visibility",
      "learn more",
      "workflow support",
      "lane is separated",
    ],
  },
  trust: {
    version: HOMEPAGE_TRUST_STACK_CONTRACT_VERSION,
    sectionTitle: homeContent.trustBand.title,
    intro: homeContent.trustBand.body,
    claims: homepageTrustStack,
    claimSourceMap: homepageTrustClaimSourceMap,
    blockedPatterns: blockedHomepageTrustPatterns,
  },
  ctaLadder: {
    version: HOMEPAGE_CTA_LADDER_CONTRACT_VERSION,
    bannedGenericLabels: publicCta.bannedGenericLabels,
    surfaces: [
      { surface: "header-call", priority: 1, role: "urgent-call", label: publicCta.global.call.label },
      { surface: "hero-call", priority: 1, role: "urgent-call", label: publicCta.global.call.label },
      { surface: "mobile-rail-call", priority: 1, role: "urgent-call", label: publicCta.global.call.label },
      { surface: "header-request", priority: 2, role: "global-request", label: publicCta.global.request.label },
      { surface: "hero-request", priority: 2, role: "global-request", label: publicCta.global.request.label },
      { surface: "mobile-rail-request", priority: 2, role: "global-request", label: publicCta.global.request.label },
      { surface: "chooser-emergency-septic", priority: 3, role: "route-specific", label: publicCta.routeSpecific.emergencySeptic },
      { surface: "chooser-routine-pumping", priority: 3, role: "route-specific", label: publicCta.routeSpecific.routinePumping },
      { surface: "chooser-evaluation", priority: 3, role: "route-specific", label: publicCta.routeSpecific.evaluation },
      { surface: "chooser-rental", priority: 3, role: "route-specific", label: publicCta.routeSpecific.rental },
      { surface: "chooser-commercial", priority: 3, role: "route-specific", label: publicCta.routeSpecific.commercial },
      { surface: "realtor-band", priority: 4, role: "premium-realtor", label: publicCta.routeSpecific.realtorBand },
      { surface: "final-request", priority: 5, role: "global-request", label: publicCta.global.request.label },
    ] as Array<{
      surface: HomepageCtaSurface;
      priority: number;
      role: "urgent-call" | "global-request" | "route-specific" | "premium-realtor";
      label: string;
    }>,
  },
  messageCompression: {
    version: HOMEPAGE_MESSAGE_COMPRESSION_CONTRACT_VERSION,
    sectionJobs: [
      { section: "hero", job: "Establish urgency and expose one call-first path plus one request path." },
      { section: "service-grid", job: "Help visitors self-sort into the right service route." },
      { section: "trust-band", job: "Prove longevity and service scope with verified facts only." },
      { section: "realtor-band", job: "Protect the home-sale evaluation lane as a distinct premium route." },
      { section: "faq-preview", job: "Answer a few pre-service questions without retelling the homepage." },
      { section: "final-cta", job: "Offer a last clear action without adding new proof copy." },
    ],
    bannedWorkflowTerms: ["workflow", "router", "triage", "intake", "task lane", "secondary route links"],
    repeatedPhraseCaps: [
      { phrase: "family owned and operated since 1979", maxOccurrences: 1 },
      { phrase: "choose your service", maxOccurrences: 1 },
      { phrase: "request service", maxOccurrences: 4 },
    ],
  },
  performance: {
    version: HOMEPAGE_PERFORMANCE_CONTRACT_VERSION,
    artifactPath: "docs/verification/homepage-performance.json",
    thresholds: {
      mobile: { lcpMs: 2500, fcpMs: 1800, ttfbMs: 1000 },
      desktop: { lcpMs: 2500, fcpMs: 1800, ttfbMs: 1000 },
    },
    firstViewportSelectors: {
      heroHeading: "[data-homepage-hero-heading='true']",
      heroCall: "[data-homepage-cta-surface='hero-call']",
      heroRequest: "[data-homepage-cta-surface='hero-request']",
      mobileRail: "[data-mobile-action-rail]",
    },
    heroMediaMode: "static-image",
  },
  mobileConversion: {
    version: HOMEPAGE_MOBILE_CONVERSION_CONTRACT_VERSION,
    artifactPath: "docs/verification/homepage-mobile-conversion.json",
    viewport: { width: 390, height: 844 },
    screenshots: {
      firstViewport: "docs/screenshots/home-mobile-first-viewport-390.png",
      midpage: "docs/screenshots/home-mobile-midpage-390.png",
      finalCta: "docs/screenshots/home-mobile-final-cta-390.png",
    },
    states: [
      {
        id: "first-viewport",
        description: "Sticky header, hero copy, hero CTA pair, and mobile rail all remain visible and usable.",
      },
      {
        id: "midpage",
        description: "Service chooser plus trust/realtor flow remains clear without CTA crowding.",
      },
      {
        id: "final-cta",
        description: "Final CTA remains reachable above the mobile rail and safe-area padding.",
      },
    ],
  },
} as const;
