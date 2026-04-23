export type NavItem = {
  href: string;
  label: string;
};

export type HeaderNavContext = "marketing" | "task";

export const primaryNavLinks: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/realtors", label: "Realtors" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export const compactTaskHeaderLinks: NavItem[] = [
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
];

const headerNavByContext: Record<HeaderNavContext, NavItem[]> = {
  marketing: primaryNavLinks,
  task: compactTaskHeaderLinks,
};

export function getHeaderNavLinks(context: HeaderNavContext): NavItem[] {
  return headerNavByContext[context];
}

export const footerFastPathLinks: NavItem[] = [
  { href: "/services/septic-cleaning", label: "Septic Service Lane" },
  { href: "/services/well-septic-evaluations", label: "Evaluation Lane" },
  { href: "/services/portable-toilets", label: "Rental Lane" },
  { href: "/services/commercial", label: "Commercial Lane" },
  { href: "/realtors", label: "Realtor Resources" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/accessibility", label: "Accessibility" },
];
