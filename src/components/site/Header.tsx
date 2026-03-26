"use client";

import { company } from "@/config/company";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics/client";
import { analyticsEvents } from "@/lib/analytics/events";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/realtors", label: "Realtors" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#c8c1b1] bg-[var(--surface)]/95 backdrop-blur">
      <div className="container py-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-display text-xl leading-none text-[var(--brand)]">{company.publicBrand}</p>
            <p className="text-sm">{company.tagline}</p>
          </div>
          <a
            href={`tel:${company.primaryPhone}`}
            onClick={() => {
              void trackEvent({
                event: analyticsEvents.callCtaClick,
                metadata: { location: "header" },
              });
            }}
            className="rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Call {company.primaryPhone}
          </a>
        </div>
        <nav className="mt-3 flex flex-wrap gap-3 text-sm">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="rounded bg-[#e6e0d2] px-3 py-1 font-semibold">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
