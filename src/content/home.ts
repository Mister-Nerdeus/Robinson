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
    "trust-band",
    "realtor-evaluation-proof",
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
  trustBand: {
    title: "Built on proven local trust",
  },
  realtorProof: {
    title: "Realtor and evaluation confidence",
    body: "Realtor workflows stay transaction-ready with deadline capture, occupancy context, and explicit access coordination before scheduling.",
    points: [
      "Home-sale lane is separated from routine pumping to reduce routing mistakes.",
      "Evaluation requests capture role and deadline type in the first steps.",
      "Follow-up expectations stay explicit: non-emergency Realtor lane target is 1-3 business days.",
    ],
    ctaHref: "/realtors",
    ctaLabel: "Open Realtor Evaluation Lane",
  },
  trustPanel: {
    title: "Trusted across West Michigan",
    body:
      "Families, Realtors, and local businesses call Robinson because the team shows up prepared, communicates clearly, and stands behind the work.",
    highlights: [
      "Family owned and operated since 1979.",
      "24/7 emergency septic response remains call-first.",
      "Broad service mix across septic, evaluations, rentals, and commercial support.",
      "Realtor/evaluation workflow supports closing-date coordination.",
    ],
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
