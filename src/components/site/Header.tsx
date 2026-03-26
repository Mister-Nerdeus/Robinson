"use client";

import { useState } from "react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <div className="grid gap-4 md:gap-3">
            <div className="flex items-start justify-between gap-3 md:hidden">
              <Link
                href="/"
                className="grid min-w-0 flex-1 gap-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/branding/logo-legacy-clean.png"
                    alt="Robinson Septic Cleaning logo"
                    width={220}
                    height={88}
                    className="h-auto w-[132px] shrink-0"
                    priority
                  />
                  <div className="min-w-0">
                    <p className="font-display text-[1.2rem] leading-none text-[var(--brand)]">
                      {company.publicBrand}
                    </p>
                    <p className="mt-2 text-[0.92rem] leading-6 text-slate-700">
                      24/7 emergency septic service, pumping, evaluations, rentals, and commercial support.
                    </p>
                  </div>
                </div>
              </Link>

              <button
                type="button"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-site-nav"
                onClick={() => setMobileMenuOpen((open) => !open)}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#d6c9c9] bg-[#fff7f7] text-[var(--brand)]"
              >
                <span className="sr-only">Toggle navigation</span>
                <div className="flex flex-col gap-1.5">
                  <span className="block h-0.5 w-5 bg-current" />
                  <span className="block h-0.5 w-5 bg-current" />
                  <span className="block h-0.5 w-5 bg-current" />
                </div>
              </button>
            </div>

            <Link href="/" className="hidden gap-3 md:grid md:grid-cols-[auto,minmax(0,1fr)] md:items-center">
              <div>
                <Image
                  src="/branding/logo-legacy-clean.png"
                  alt="Robinson Septic Cleaning logo"
                  width={220}
                  height={88}
                  className="h-auto w-[165px] shrink-0 lg:w-[220px]"
                  priority
                />
              </div>

              <div className="min-w-0">
                <p className="font-display text-[1.5rem] leading-none text-[var(--brand)] lg:text-[2rem]">
                  {company.publicBrand}
                </p>
                <p className="mt-2 max-w-[34rem] text-[0.98rem] leading-7 text-slate-700">
                  24/7 emergency septic service, pumping, evaluations, rentals, and commercial support.
                </p>
              </div>
            </Link>

            <div
              id="mobile-site-nav"
              className={`${mobileMenuOpen ? "grid" : "hidden"} gap-3 rounded-2xl border border-[#d6c9c9] bg-[#fffaf9] p-3 md:hidden`}
            >
              <div className="grid grid-cols-1 gap-2">
                <a
                  href={`tel:${company.primaryPhone}`}
                  onClick={() => {
                    void trackEvent({
                      event: analyticsEvents.callCtaClick,
                      metadata: { location: "header-primary-mobile" },
                    });
                    setMobileMenuOpen(false);
                  }}
                  className="rounded-xl bg-[var(--brand)] px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Emergency or Service Call
                </a>

                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl border border-[var(--brand)] px-4 py-3 text-center text-sm font-semibold text-[var(--brand)]"
                >
                  Request Service Online
                </Link>
              </div>

              <p className="mx-auto w-fit rounded-full bg-[#fff2f2] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--brand)]">
                {company.trustHeadline}
              </p>

              <nav className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl border border-[#d6c9c9] bg-white px-3 py-3 text-center text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          <div className="hidden md:flex md:flex-col md:gap-3 lg:items-end">
            <p className="mx-auto w-fit rounded-full bg-[#fff2f2] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--brand)] lg:mx-0">
              {company.trustHeadline}
            </p>

            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:flex">
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

        <nav className="mt-4 hidden flex-wrap gap-3 text-sm md:flex">
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
