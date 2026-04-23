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
    "lane-router",
    "conversion-proof",
    "faq-preview",
    "final-cta",
  ] as const,
  hero: {
    eyebrow: "24/7 Emergency Service • Family owned and operated since 1979",
    heading: "Need septic help now, or a scheduled service lane?",
    subheading:
      "Emergency calls stay call-first. Routine pumping, evaluations, rentals, and commercial support all have direct task-entry lanes below.",
    ctaHref: "/contact",
    ctaLabel: "Open All Request Lanes",
  },
  lanes: [
    {
      id: "emergency-septic",
      title: "Emergency septic service",
      userProblem: "Backup, overflow, alarm, or strong sewage odor right now.",
      laneValue: "Fast call-first dispatch triage, then structured details to speed arrival prep.",
      href: "/contact?lane=septic-service",
      ctaLabel: "Call + Open Emergency Lane",
      emphasis: "high",
    },
    {
      id: "routine-pumping",
      title: "Routine pumping",
      userProblem: "System is due for pumping before it turns into a failure call.",
      laneValue: "Schedule preventive service with location and access context captured up front.",
      href: "/contact?lane=septic-service",
      ctaLabel: "Start Routine Pumping",
    },
    {
      id: "evaluation",
      title: "Well and septic evaluations",
      userProblem: "A buyer, seller, or Realtor deadline is approaching.",
      laneValue: "Deadline-aware intake captures transaction role, access contacts, and timing pressure.",
      href: "/contact?lane=evaluation",
      ctaLabel: "Start Evaluation Request",
    },
    {
      id: "rental",
      title: "Portable toilet rentals",
      userProblem: "You need restroom units for an event, project, or jobsite.",
      laneValue: "Quote-ready lane captures count, duration, cadence, and delivery access details.",
      href: "/contact?lane=rental",
      ctaLabel: "Start Rental Request",
    },
    {
      id: "commercial",
      title: "Commercial support",
      userProblem: "Facility operations need grease trap, lift pump, or septic support.",
      laneValue: "Commercial intake routes service type, facility context, and on-site coordination details.",
      href: "/contact?lane=commercial-service",
      ctaLabel: "Start Commercial Request",
    },
  ] satisfies HomeLaneCard[],
  conversionProof: {
    title: "Why West Michigan teams choose Robinson",
    body:
      "Trust signals and lane value are combined in one section so customers can validate fit quickly, then take a lane-specific action.",
    highlights: [
      "Family owned and operated since 1979.",
      "24/7 emergency septic response remains call-first.",
      "Five active lanes route emergency, routine, evaluation, rental, and commercial users without guesswork.",
      "Realtor/evaluation workflow captures deadline and access context early.",
    ],
    ctaHref: "/realtors",
    ctaLabel: "Open Deadline-First Realtor Lane",
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
