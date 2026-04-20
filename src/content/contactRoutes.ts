export type ContactLaneId =
  | "emergency-septic"
  | "routine-pumping"
  | "realtor-evaluation"
  | "portable-toilet-rental"
  | "commercial-support";

export type ContactRoute = {
  id: ContactLaneId;
  title: string;
  userTaskLabel: string;
  description: string;
  href: string;
  ctaLabel: string;
  eventName: string;
  submissionType: "septic-service" | "evaluation" | "rental" | "commercial-service";
  callFirst: boolean;
};

export const contactRoutes: ContactRoute[] = [
  {
    id: "emergency-septic",
    title: "Emergency septic help",
    userTaskLabel: "I need emergency septic help now",
    description: "Backups, alarms, active overflow, or urgent septic failure symptoms.",
    href: "/contact?lane=septic-service",
    ctaLabel: "Emergency Septic Help",
    eventName: "contact_route_emergency_septic",
    submissionType: "septic-service",
    callFirst: true,
  },
  {
    id: "routine-pumping",
    title: "Routine septic pumping",
    userTaskLabel: "I need routine septic pumping",
    description: "Scheduled pumping, maintenance, and non-emergency septic service.",
    href: "/contact?lane=septic-service",
    ctaLabel: "Routine Pumping Request",
    eventName: "contact_route_routine_pumping",
    submissionType: "septic-service",
    callFirst: false,
  },
  {
    id: "realtor-evaluation",
    title: "Home-sale / Realtor evaluation",
    userTaskLabel: "I need a home-sale or Realtor evaluation",
    description: "Deadline-aware well and septic evaluation intake for active transactions.",
    href: "/realtors",
    ctaLabel: "Start Realtor Evaluation",
    eventName: "contact_route_realtor_evaluation",
    submissionType: "evaluation",
    callFirst: false,
  },
  {
    id: "portable-toilet-rental",
    title: "Portable toilet rental",
    userTaskLabel: "I need portable toilet rental",
    description: "Quote-ready rental intake for jobsites, events, and seasonal site support.",
    href: "/services/portable-toilets",
    ctaLabel: "Start Rental Quote",
    eventName: "contact_route_portable_rental",
    submissionType: "rental",
    callFirst: false,
  },
  {
    id: "commercial-support",
    title: "Commercial support",
    userTaskLabel: "I need commercial support",
    description: "Grease trap, lift pump, and commercial septic support intake.",
    href: "/services/commercial",
    ctaLabel: "Open Commercial Paths",
    eventName: "contact_route_commercial_support",
    submissionType: "commercial-service",
    callFirst: false,
  },
];

export const emergencyContactRoute = contactRoutes[0];
