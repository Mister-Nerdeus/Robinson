import { publicCta } from "@/content/cta";

export type HomeLaneCard = {
  id: "emergency-septic" | "routine-pumping" | "evaluation" | "rental" | "commercial";
  title: string;
  userProblem: string;
  laneValue: string;
  href: string;
  ctaLabel: string;
  emphasis?: "high" | "standard";
};

export const homeContent = {
  sectionContract: [
    "hero",
    "service-grid",
    "trust-band",
    "realtor-band",
    "faq-preview",
    "final-cta",
  ] as const,
  hero: {
    eyebrow: "24/7 emergency septic service • Family owned and operated since 1979",
    heading: "Need septic service now or want to schedule ahead?",
    subheading:
      "Call right away for backups, alarms, and overflows. Use the service options below for pumping, home-sale evaluations, portable toilet rentals, and commercial support.",
    ctaHref: "/contact",
    ctaLabel: publicCta.global.request.label,
  },
  chooserHeading: "Choose your service",
  lanes: [
    {
      id: "emergency-septic",
      title: "Emergency septic service",
      userProblem: "Backup, overflow, alarm, or strong sewage odor right now.",
      laneValue: "Call first for urgent dispatch, then share property details so the crew arrives prepared.",
      href: "/contact?lane=septic-service",
      ctaLabel: publicCta.routeSpecific.emergencySeptic,
      emphasis: "high",
    },
    {
      id: "routine-pumping",
      title: "Routine pumping",
      userProblem: "System is due for pumping before it turns into a failure call.",
      laneValue: "Schedule preventive pumping with property location and access notes included up front.",
      href: "/contact?lane=septic-service",
      ctaLabel: publicCta.routeSpecific.routinePumping,
    },
    {
      id: "evaluation",
      title: "Well and septic evaluations",
      userProblem: "A buyer, seller, or Realtor deadline is approaching.",
      laneValue: "Share the deadline, role, and property access details needed for home-sale scheduling.",
      href: "/contact?lane=evaluation",
      ctaLabel: publicCta.routeSpecific.evaluation,
    },
    {
      id: "rental",
      title: "Portable toilet rentals",
      userProblem: "You need restroom units for an event, project, or jobsite.",
      laneValue: "Request units with quantity, timing, and delivery access details.",
      href: "/contact?lane=rental",
      ctaLabel: publicCta.routeSpecific.rental,
    },
    {
      id: "commercial",
      title: "Commercial support",
      userProblem: "Facility operations need grease trap, lift pump, or septic support.",
      laneValue: "Request grease trap, lift pump, or septic support with site coordination details.",
      href: "/contact?lane=commercial-service",
      ctaLabel: publicCta.routeSpecific.commercial,
    },
  ] satisfies HomeLaneCard[],
  trustBand: {
    title: "Why West Michigan trusts Robinson",
    body:
      "The homepage trust stack stays limited to verified facts about longevity, service scope, and the kinds of jobs Robinson handles every week.",
  },
  realtorBand: {
    title: "Selling a home? Keep evaluations on schedule",
    body:
      "Buyers, sellers, and Realtors can share deadlines, property access details, and contact handoffs before scheduling starts.",
    highlights: [
      "Home-sale requests stay separate from routine pumping so deadlines do not get buried.",
      "Property access, occupancy context, and contact handoffs are gathered before scheduling.",
      "Realtor communication stays centered on timing, not generic service copy.",
    ],
    ctaHref: "/realtors",
    ctaLabel: publicCta.routeSpecific.realtorBand,
  },
  faqPreview: [
    {
      question: "How often should a septic tank be pumped?",
      answer:
        "A common planning range is about every three years, but timing depends on tank size, household use, and system condition.",
    },
    {
      question: "What information helps scheduling?",
      answer:
        "Include property address, known tank location, gate or pet notes, and your preferred date so Robinson can schedule more efficiently.",
    },
    {
      question: "What signs mean I should call now?",
      answer:
        "Sewage backup, standing wastewater, strong odors, or sudden drain issues should be handled right away.",
    },
    {
      question: "Can rentals include ongoing service?",
      answer:
        "Yes. Portable rentals can include regular pumping and cleaning for longer projects and events.",
    },
  ],
  finalCta: {
    heading: "Need septic help now? Call for emergencies or request routine service.",
    href: "/contact",
    label: publicCta.global.request.label,
  },
};
