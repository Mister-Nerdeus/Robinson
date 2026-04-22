import type { SubmissionType } from "@/lib/forms/types";

export type ServiceTemplateSlots = {
  headline: string;
  summary: string;
  includedItems: string[];
  pricingFactors?: string[];
  proofPoints: string[];
  faqSubset: Array<{ question: string; answer: string }>;
  primaryCta: { label: string };
  secondaryCta?: { href: string; label: string };
};

export type ServiceTemplateEntry = {
  id: "septic-cleaning" | "well-septic-evaluations" | "portable-toilets" | "commercial";
  route: `/services/${"septic-cleaning" | "well-septic-evaluations" | "portable-toilets" | "commercial"}`;
  pageTitle: string;
  schemaName: string;
  schemaDescription: string;
  metadataTitle: string;
  metadataDescription: string;
  formType: SubmissionType;
  formTitle: string;
  serviceContentKey: "septicCleaning" | "evaluations" | "portableToilets" | "commercial";
  heroEyebrow: string;
  slots: ServiceTemplateSlots;
  media: Array<{ src: string; alt: string }>;
  status: "verified" | "marketing" | "pending_verification";
};

export const serviceTemplateEntries: ServiceTemplateEntry[] = [
  {
    id: "septic-cleaning",
    route: "/services/septic-cleaning",
    pageTitle: "Septic Tank Cleaning",
    schemaName: "Septic Tank Cleaning",
    schemaDescription:
      "Residential and commercial septic pumping with 24/7 emergency service, access planning, and routine scheduling support.",
    metadataTitle: "Septic Tank Cleaning",
    metadataDescription:
      "24/7 emergency septic pumping, routine cleaning, and fast scheduling support.",
    formType: "septic-service",
    formTitle: "Request Septic Service",
    serviceContentKey: "septicCleaning",
    heroEyebrow: "24/7 Emergency Service",
    status: "verified",
    slots: {
      headline: "Call immediately when septic problems are active.",
      summary:
        "For urgent backups or overdue routine pumping, Robinson gives you one direct request path with clear next steps.",
      includedItems: [
        "24/7 emergency septic response",
        "Routine residential and commercial pumping",
        "Tank location and access-note review",
      ],
      pricingFactors: [
        "Tank count and tank size",
        "How easy lids and tank locations are to access",
        "Whether locating or prep work is needed before pumping",
        "Emergency timing versus routine scheduled service",
      ],
      proofPoints: [
        "Built for call-first dispatch during active backups.",
        "Structured intake reduces callback delay on urgent jobs.",
        "Works for homeowners, rentals, and commercial properties.",
      ],
      faqSubset: [
        {
          question: "What warning signs mean I should call now?",
          answer:
            "Call immediately for sewage backups, pooling wastewater, strong septic odors, or sudden drain and toilet issues.",
        },
        {
          question: "What details should I include in a service request?",
          answer:
            "Include address, best callback number, tank or cleanout location if known, and any gate, pet, or occupancy notes.",
        },
      ],
      primaryCta: { label: "Call Emergency Dispatch" },
      secondaryCta: { href: "/contact?lane=septic-service", label: "Open Septic Service Lane" },
    },
    media: [
      {
        src: "/images/enhanced/truck_closeup_ai_enhanced.jpg",
        alt: "Robinson septic tanker and hose setup on route",
      },
      {
        src: "/images/enhanced/truck_full_ai_enhanced.jpg",
        alt: "Robinson septic truck at a residential property",
      },
    ],
  },
  {
    id: "well-septic-evaluations",
    route: "/services/well-septic-evaluations",
    pageTitle: "Well & Septic Evaluations",
    schemaName: "Well and Septic Evaluations",
    schemaDescription:
      "Home-sale well and septic evaluations for buyers, sellers, and local Realtors.",
    metadataTitle: "Well and Septic Evaluations",
    metadataDescription:
      "Deadline-aware evaluation requests for buyers, sellers, and Realtor workflows.",
    formType: "evaluation",
    formTitle: "Request Evaluation / Realtor Service",
    serviceContentKey: "evaluations",
    heroEyebrow: "Real-estate priority service",
    status: "verified",
    slots: {
      headline: "Keep your closing timeline moving.",
      summary:
        "This request flow is built for buyers, sellers, and Realtors who need clear communication and fast coordination.",
      includedItems: [
        "Purpose-built for home-sale transactions",
        "Works for buyers, sellers, and Realtors",
        "Captures access and timeline details up front",
      ],
      proofPoints: [
        "Reduces back-and-forth during closing pressure.",
        "Supports multi-party coordination across the transaction.",
        "Captures role and occupancy context before callback.",
      ],
      faqSubset: [
        {
          question: "How should Realtors submit evaluation requests?",
          answer:
            "Use the Realtor evaluation request form and include property details, transaction contacts, and timing priorities so scheduling can be coordinated quickly.",
        },
        {
          question: "What details should I include in a service request?",
          answer:
            "Include address, best callback number, tank or cleanout location if known, and any gate, pet, or occupancy notes.",
        },
      ],
      primaryCta: { label: "Call Evaluation Coordination" },
      secondaryCta: { href: "/contact?lane=evaluation", label: "Open Evaluation Lane" },
    },
    media: [
      {
        src: "/images/enhanced/tech_evaluation_ai_enhanced.jpg",
        alt: "Robinson team member handling a residential property visit",
      },
    ],
  },
  {
    id: "portable-toilets",
    route: "/services/portable-toilets",
    pageTitle: "Portable Toilet Rentals",
    schemaName: "Portable Toilet Rentals",
    schemaDescription:
      "Portable toilet rental and maintenance planning for events, homes, businesses, schools, and job sites.",
    metadataTitle: "Portable Toilet Rentals",
    metadataDescription:
      "Portable toilet rentals for events, homes, businesses, schools, and job sites.",
    formType: "rental",
    formTitle: "Request Portable Toilet Rental",
    serviceContentKey: "portableToilets",
    heroEyebrow: "Events and site support",
    status: "verified",
    slots: {
      headline: "Portable rental service that is easy to schedule.",
      summary:
        "Send delivery dates, unit counts, and site instructions in one request for faster quoting and planning.",
      includedItems: [
        "Delivery and pickup planning",
        "Daily, weekend, weekly, and monthly options",
        "Routine pumping and cleaning for longer rentals",
      ],
      proofPoints: [
        "Built for event and project logistics.",
        "Structured intake captures unit and service cadence details.",
        "Coverage confirmation is tied to routing and schedule checks.",
      ],
      faqSubset: [
        {
          question: "Can portable toilet rentals include regular maintenance?",
          answer:
            "Yes. Longer rentals can include scheduled pumping and cleaning based on event or project needs.",
        },
      ],
      primaryCta: { label: "Call Rental Availability" },
      secondaryCta: { href: "/contact?lane=rental", label: "Open Rental Lane" },
    },
    media: [
      {
        src: "/images/enhanced/portable_toilet_single_ai_enhanced.jpg",
        alt: "Single Robinson portable toilet on location",
      },
      {
        src: "/images/enhanced/portable_toilets_group_ai_enhanced.jpg",
        alt: "Multiple Robinson portable toilet units staged together",
      },
    ],
  },
  {
    id: "commercial",
    route: "/services/commercial",
    pageTitle: "Commercial Services",
    schemaName: "Commercial Services",
    schemaDescription:
      "Commercial septic support including grease trap cleaning and lift pump service.",
    metadataTitle: "Commercial Services",
    metadataDescription:
      "Commercial septic support including grease trap cleaning and lift pump service.",
    formType: "commercial-service",
    formTitle: "Request Commercial Service",
    serviceContentKey: "commercial",
    heroEyebrow: "Commercial septic support",
    status: "verified",
    slots: {
      headline: "Keep facilities and operations running.",
      summary:
        "Grease trap and lift pump issues can become urgent quickly. Send site details and service needs in one request.",
      includedItems: [
        "Grease trap cleaning for exterior and interior systems",
        "Lift pump replacement and service",
        "Recurring and one-time commercial scheduling",
      ],
      proofPoints: [
        "Designed for operationally sensitive sites.",
        "Captures facility type and access window before callback.",
        "Supports recurring and one-off commercial routing.",
      ],
      faqSubset: [
        {
          question: "What details should I include in a service request?",
          answer:
            "Include address, best callback number, tank or cleanout location if known, and any gate, pet, or occupancy notes.",
        },
      ],
      primaryCta: { label: "Call Commercial Dispatch" },
      secondaryCta: { href: "/contact?lane=commercial-service", label: "Open Commercial Lane" },
    },
    media: [
      {
        src: "/current/grease-01-tmb.jpg",
        alt: "Grease trap related field work and service context",
      },
      {
        src: "/images/enhanced/truck_closeup_ai_enhanced.jpg",
        alt: "Robinson support truck staged for commercial or route work",
      },
    ],
  },
];

export function getServiceTemplateEntry(id: ServiceTemplateEntry["id"]): ServiceTemplateEntry {
  const entry = serviceTemplateEntries.find((item) => item.id === id);
  if (!entry) {
    throw new Error(`Missing service template entry for ${id}`);
  }
  return entry;
}
