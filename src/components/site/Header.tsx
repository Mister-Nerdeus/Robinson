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
      <div className="bg-[var(--brand)] text-white">
        <div className="container flex flex-col gap-2 py-2 text-sm font-semibold sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center sm:text-left">{company.emergencyService.claim}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:justify-end sm:gap-4">
            <a
              href={`tel:${company.primaryPhone}`}
              onClick={() => {
                void trackEvent({
                  event: analyticsEvents.callCtaClick,
                  metadata: { location: "header-emergency-bar" },
                });
              }}
              className="underline underline-offset-2"
            >
              Call {company.primaryPhone}
            </a>
            {company.secondaryPhone ? <span className="text-white/85">Office {company.secondaryPhone}</span> : null}
          </div>
        </div>
      </div>

      <div className="container py-3">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr),auto] lg:items-center">
          <Link href="/" className="grid gap-3 sm:grid-cols-[auto,minmax(0,1fr)] sm:items-center">
            <div className="mx-auto sm:mx-0">
              <Image
                src="/branding/logo-legacy-clean.png"
                alt="Robinson Septic Cleaning logo"
                width={220}
                height={88}
                className="h-auto w-[150px] shrink-0 sm:w-[185px] lg:w-[220px]"
                priority
              />
            </div>

            <div className="min-w-0 text-center sm:text-left">
              <p className="font-display text-[1.55rem] leading-none text-[var(--brand)] sm:text-[1.7rem] lg:text-[2rem]">
                {company.publicBrand}
              </p>
              <p className="mt-2 text-[0.98rem] leading-7 text-slate-700 sm:max-w-[34rem]">
                24/7 emergency septic service, pumping, evaluations, rentals, and commercial support.
              </p>
            </div>
          </Link>

          <div className="flex flex-col gap-3 lg:items-end">
            <p className="mx-auto w-fit rounded-full bg-[#fff2f2] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--brand)] lg:mx-0">
              {company.trustHeadline}
            </p>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:flex">
              <a
                href={`tel:${company.primaryPhone}`}
                onClick={() => {
                  void trackEvent({
                    event: analyticsEvents.callCtaClick,
                    metadata: { location: "header-primary" },
                  });
                }}
                className="rounded-md bg-[var(--brand)] px-4 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90"
              >
                Emergency or Service Call
              </a>

              <Link
                href="/contact"
                className="rounded-md border border-[var(--brand)] px-4 py-3 text-center text-sm font-semibold text-[var(--brand)]"
              >
                Request Service Online
              </Link>
            </div>

            <p className="hidden max-w-[29rem] text-right text-xs leading-6 text-slate-700 lg:block">
              Residential, commercial, real-estate evaluations, portable toilets, grease traps, and lift pumps.
            </p>
          </div>
        </div>

        <nav className="mt-4 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-[#d6c9c9] bg-[#fff7f7] px-3 py-2 text-center text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
