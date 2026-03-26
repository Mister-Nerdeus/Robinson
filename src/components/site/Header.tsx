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
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/" className="flex min-w-0 items-center gap-3 sm:gap-4">
            <Image
              src="/branding/logo-legacy-clean.png"
              alt="Robinson Septic Cleaning logo"
              width={220}
              height={88}
              className="h-auto w-[150px] shrink-0 sm:w-[190px] lg:w-[220px]"
              priority
            />
            <div className="min-w-0">
              <p className="truncate font-display text-lg leading-none text-[var(--brand)] sm:text-xl">{company.publicBrand}</p>
              <p className="mt-1 text-sm leading-snug text-slate-700">Family owned and operated septic cleaning, evaluations, rentals, and support service.</p>
            </div>
          </Link>
          <div className="flex flex-col items-start gap-1 lg:items-end">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--brand)] sm:text-xs">{company.trustHeadline}</p>
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
        <nav className="mt-3 flex flex-wrap gap-2 text-sm sm:gap-3">
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
