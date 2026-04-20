export type NavItem = {
  href: string;
  label: string;
};

export const primaryNavLinks: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/realtors", label: "Realtors" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export const footerFastPathLinks: NavItem[] = [
  { href: "/services/septic-cleaning", label: "Emergency Septic Service" },
  { href: "/services/well-septic-evaluations", label: "Evaluations" },
  { href: "/services/portable-toilets", label: "Rentals" },
  { href: "/services/commercial", label: "Commercial Support" },
  { href: "/realtors", label: "Realtor Resources" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/accessibility", label: "Accessibility" },
];
