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
    eyebrow: "24/7 Emergency Service • Family owned and operated since 1979",
    heading: "Need septic help now or want to schedule service?",
    subheading:
      "Emergency calls stay call-first. You can also request pumping, evaluations, portable toilets, and commercial service below.",
    ctaHref: "/contact",
    ctaLabel: "Request Service",
  },
  lanes: [
    {
      id: "emergency-septic",
      title: "Emergency septic service",
      userProblem: "Backup, overflow, alarm, or strong sewage odor right now.",
      laneValue: "Call first for 24/7 dispatch, then share details so the crew arrives prepared.",
      href: "/contact?lane=septic-service",
      ctaLabel: "Call Emergency Service",
      emphasis: "high",
    },
    {
      id: "routine-pumping",
      title: "Routine pumping",
      userProblem: "System is due for pumping before it turns into a failure call.",
      laneValue: "Schedule preventive pumping with property and access details captured up front.",
      href: "/contact?lane=septic-service",
      ctaLabel: "Schedule Pumping",
    },
    {
      id: "evaluation",
      title: "Well and septic evaluations",
      userProblem: "A buyer, seller, or Realtor deadline is approaching.",
      laneValue: "Share deadline, role, and property access details for home-sale scheduling.",
      href: "/contact?lane=evaluation",
      ctaLabel: "Request Evaluation",
    },
    {
      id: "rental",
      title: "Portable toilet rentals",
      userProblem: "You need restroom units for an event, project, or jobsite.",
      laneValue: "Request units with quantity, duration, and delivery access details.",
      href: "/contact?lane=rental",
      ctaLabel: "Request Rentals",
    },
    {
      id: "commercial",
      title: "Commercial support",
      userProblem: "Facility operations need grease trap, lift pump, or septic support.",
      laneValue: "Request grease trap, lift pump, or septic support with site coordination details.",
      href: "/contact?lane=commercial-service",
      ctaLabel: "Get Commercial Help",
    },
  ] satisfies HomeLaneCard[],
  trustBand: {
    title: "Why West Michigan customers trust Robinson",
    body:
      "Family ownership, proven emergency response, and clear service communication are kept front and center.",
    highlights: [
      "Family owned and operated since 1979.",
      "24/7 emergency septic response remains call-first.",
      "One team supports emergency, routine, evaluations, rentals, and commercial service.",
      "Service area coverage is focused across West Michigan communities.",
    ],
  },
  realtorBand: {
    title: "Selling a home? Keep evaluation timing on track",
    body:
      "Realtor and home-sale requests are handled with deadline-first coordination so buyers, sellers, and agents get clear scheduling updates.",
    highlights: [
      "Closing timelines and preferred windows are captured immediately.",
      "Property access and contact handoff details are collected early.",
      "Coordination support stays clear for buyers, sellers, and agents.",
    ],
    ctaHref: "/realtors",
    ctaLabel: "View Realtor Services",
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
};
