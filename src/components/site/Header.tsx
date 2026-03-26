"use client";

import { company } from "@/config/company";
import Link from "next/link";
import Image from "next/image";
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
    <header className="sticky top-0 z-20 border-b border-[#b8a8a8] bg-[var(--surface)]/95 backdrop-blur">
      <div className="container py-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="flex items-center gap-4">
            <Image
              src="/branding/logo-legacy-clean.png"
              alt="Robinson Septic Cleaning legacy logo"
              width={220}
              height={88}
              className="h-auto w-[180px] sm:w-[220px]"
              priority
            />
            <div className="hidden min-w-0 sm:block">
              <p className="font-display text-xl leading-none text-[var(--brand)]">{company.publicBrand}</p>
              <p className="text-sm text-slate-700">{company.tagline}</p>
            </div>
          </Link>
          <div className="flex flex-col items-start gap-1 md:items-end">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">{company.trustHeadline}</p>
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
            <p className="text-xs text-slate-700">Residential, commercial, evaluations, rentals, and support service.</p>
          </div>
        </div>
        <nav className="mt-3 flex flex-wrap gap-3 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-[#d6c9c9] bg-[#fff7f7] px-3 py-1 font-semibold text-[var(--foreground)] transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
