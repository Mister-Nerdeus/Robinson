"use client";

import { useState } from "react";
import { company } from "@/config/company";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { compactTaskHeaderLinks, primaryNavLinks } from "@/content/navigation";
import { trackEvent } from "@/lib/analytics/client";
import { analyticsEvents } from "@/lib/analytics/events";
import { MobileNav } from "@/components/site/MobileNav";
import { publicBusinessFacts } from "@/content/businessFacts";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isTaskRoute = Boolean(
    pathname &&
      (pathname === "/contact" ||
        pathname === "/realtors" ||
        pathname.startsWith("/services/")),
  );
  const navLinks = isTaskRoute ? compactTaskHeaderLinks : primaryNavLinks;
  const emergencyLine = publicBusinessFacts.phoneSemantics.emergencyLine.number;

  return (
    <header
      data-site-header="true"
      data-site-header-mode={isTaskRoute ? "compact-task" : "marketing"}
      className="sticky top-0 z-30 border-b border-[#b8a8a8] bg-[var(--surface-strong)] shadow-[0_2px_10px_rgba(0,0,0,0.07)]"
    >
      {!isTaskRoute ? (
      <div className="bg-[var(--brand)] text-white">
        <div className="container flex items-center justify-between gap-3 py-1.5 text-xs font-semibold sm:text-sm">
          <p>{company.emergencyService.claim}</p>
          <a
            href={`tel:${emergencyLine}`}
            onClick={() => {
              void trackEvent({ event: analyticsEvents.callCtaClick, metadata: { location: "header-topbar" } });
            }}
            className="inline-flex min-h-11 items-center rounded-md px-3 underline underline-offset-2"
          >
            Call {emergencyLine}
          </a>
        </div>
      </div>
      ) : null}

      <div className={`container ${isTaskRoute ? "py-2" : "py-2.5"}`}>
        <div className="hidden items-center justify-between gap-6 md:flex">
          <Link href="/" className="flex items-center gap-4">
            <Image src="/branding/logo-legacy-clean.png" alt={`${company.publicBrand} logo`} width={220} height={88} className="h-auto w-[170px]" priority />
            <div>
              <p className={`font-display leading-none text-[var(--brand)] ${isTaskRoute ? "text-[1.35rem]" : "text-[1.6rem]"}`}>{company.publicBrand}</p>
              <p className={`text-slate-700 ${isTaskRoute ? "mt-0.5 text-xs" : "mt-1 text-sm"}`}>Family owned and operated since 1979</p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <nav data-primary-nav="desktop" className="mr-2 flex flex-wrap items-center gap-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="rounded-full border border-[#d6c9c9] bg-[#fff7f7] px-3 py-1.5 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--brand)] hover:text-[var(--brand)]">
                  {link.label}
                </Link>
              ))}
            </nav>
            <a
              href={`tel:${emergencyLine}`}
              onClick={() => {
                void trackEvent({ event: analyticsEvents.callCtaClick, metadata: { location: "header-primary" } });
              }}
              className="rounded-md bg-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-white"
            >
              {isTaskRoute ? "Emergency Call" : "Call Now"}
            </a>
            {!isTaskRoute ? (
              <Link href="/contact" className="rounded-md border border-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-[var(--brand)]">
                Request Service
              </Link>
            ) : null}
          </div>
        </div>

        <div className="md:hidden">
          <div className="flex items-center justify-between gap-2">
            <Link href="/" className="flex min-w-0 items-center gap-2.5" onClick={() => setMobileMenuOpen(false)}>
              <Image src="/branding/logo-legacy-clean.png" alt={`${company.publicBrand} logo`} width={220} height={88} className="h-auto w-[96px] shrink-0" priority />
              <div className="min-w-0">
                <p className="truncate font-display text-[1.02rem] leading-tight text-[var(--brand)]">{company.publicBrand}</p>
                <p className="text-[0.74rem] text-slate-700">{company.emergencyService.claim}</p>
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
              <div className="flex flex-col gap-1">
                <span className="block h-0.5 w-5 rounded bg-current" />
                <span className="block h-0.5 w-5 rounded bg-current" />
                <span className="block h-0.5 w-5 rounded bg-current" />
              </div>
            </button>
          </div>

          <MobileNav links={navLinks} open={mobileMenuOpen} onNavigate={() => setMobileMenuOpen(false)} />
        </div>

      </div>
    </header>
  );
}
