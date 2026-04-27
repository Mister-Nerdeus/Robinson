export const PUBLIC_CTA_CONTRACT_VERSION = "public-cta-contract-v1";

export const publicCta = {
  global: {
    call: {
      familyId: "global-call",
      label: "Call Emergency Dispatch",
    },
    request: {
      familyId: "global-request",
      label: "Request Service",
    },
  },
  routeSpecific: {
    emergencySeptic: "Call Emergency Service",
    routinePumping: "Schedule Pumping",
    evaluation: "Request Evaluation",
    rental: "Request Rentals",
    commercial: "Get Commercial Help",
    realtorBand: "View Realtor Services",
  },
  bannedGenericLabels: ["Learn More", "Contact Us", "Click Here"],
} as const;

export function buildFooterCallLabel(phoneNumber: string): string {
  return `${publicCta.global.call.label} (${phoneNumber})`;
}
