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
    <header className="sticky top-0 z-30 border-b border-[#b8a8a8] bg-[var(--surface)]/95 backdrop-blur">
      <div className="bg-[var(--brand)] text-white">
        <div className="container flex items-center justify-between gap-3 py-1.5 text-xs font-semibold sm:text-sm">
          <p>{company.emergencyService.claim}</p>
          <a
            href={`tel:${company.primaryPhone}`}
            onClick={() => {
              void trackEvent({ event: analyticsEvents.callCtaClick, metadata: { location: "header-topbar" } });
            }}
            className="underline underline-offset-2"
          >
            Call {company.primaryPhone}
          </a>
        </div>
      </div>

      <div className="container py-2.5">
        <div className="hidden items-center justify-between gap-6 md:flex">
          <Link href="/" className="flex items-center gap-4">
            <Image src="/branding/logo-legacy-clean.png" alt="Robinson Septic Cleaning logo" width={220} height={88} className="h-auto w-[170px]" priority />
            <div>
              <p className="font-display text-[1.6rem] leading-none text-[var(--brand)]">{company.publicBrand}</p>
              <p className="mt-1 text-sm text-slate-700">Family owned and operated since 1979</p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${company.primaryPhone}`}
              onClick={() => {
                void trackEvent({ event: analyticsEvents.callCtaClick, metadata: { location: "header-primary" } });
              }}
              className="rounded-md bg-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-white"
            >
              Call Now
            </a>
            <Link href="/contact" className="rounded-md border border-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-[var(--brand)]">
              Request Service
            </Link>
          </div>
        </div>

        <div className="md:hidden">
          <div className="flex items-center justify-between gap-2">
            <Link href="/" className="flex min-w-0 items-center gap-2.5" onClick={() => setMobileMenuOpen(false)}>
              <Image src="/branding/logo-legacy-clean.png" alt="Robinson Septic Cleaning logo" width={220} height={88} className="h-auto w-[96px] shrink-0" priority />
              <div className="min-w-0">
                <p className="truncate font-display text-[1.02rem] leading-tight text-[var(--brand)]">Robinson Septic Cleaning</p>
                <p className="text-[0.74rem] text-slate-700">24/7 Emergency Service</p>
              </div>
            </Link>

            <button
              type="button"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-site-nav"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#d6c9c9] bg-[#fff7f7] text-[var(--brand)]"
            >
              <span className="sr-only">Toggle navigation</span>
              <div className="flex flex-col gap-1">
                <span className="block h-0.5 w-5 rounded bg-current" />
                <span className="block h-0.5 w-5 rounded bg-current" />
                <span className="block h-0.5 w-5 rounded bg-current" />
              </div>
            </button>
          </div>

          <div id="mobile-site-nav" className={`${mobileMenuOpen ? "mt-2 grid" : "hidden"} gap-2 rounded-xl border border-[#d6c9c9] bg-[#fffaf9] p-2.5 shadow-lg`}>
            <nav className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg border border-[#d6c9c9] bg-white px-3 py-2 text-center text-sm font-semibold text-[var(--foreground)]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <nav className="mt-3 hidden flex-wrap gap-2 text-sm md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-full border border-[#d6c9c9] bg-[#fff7f7] px-3 py-1.5 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--brand)] hover:text-[var(--brand)]">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
