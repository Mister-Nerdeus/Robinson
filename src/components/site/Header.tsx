"use client";

import { useState } from "react";
import { company } from "@/config/company";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getHeaderNavLinks } from "@/content/navigation";
import { trackEvent } from "@/lib/analytics/client";
import { analyticsEvents } from "@/lib/analytics/events";
import { MobileNav } from "@/components/site/MobileNav";
import { publicBusinessFacts } from "@/content/businessFacts";
import { publicCta } from "@/content/cta";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isTaskRoute = Boolean(
    pathname &&
      (pathname === "/contact" ||
        pathname === "/realtors" ||
        pathname.startsWith("/services/")),
  );
  const navLinks = getHeaderNavLinks(isTaskRoute ? "task" : "marketing");
  const emergencyLine = publicBusinessFacts.phoneSemantics.emergencyLine.number;

  return (
    <header
      data-site-header="true"
      data-site-header-mode={isTaskRoute ? "compact-task" : "marketing"}
      className="sticky top-0 z-30 border-b border-[#cec2c2] bg-[var(--surface-strong)] shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
    >
      {!isTaskRoute ? (
      <div className="border-b border-[#d7caca] bg-[#efe7e6] text-slate-800">
        <div className="container flex items-center justify-between gap-3 py-1.5 text-xs font-semibold sm:text-sm">
          <p>24/7 emergency call-first support</p>
          <a
            href={`tel:${emergencyLine}`}
            onClick={() => {
              void trackEvent({ event: analyticsEvents.callCtaClick, metadata: { location: "header-topbar" } });
            }}
            className="inline-flex min-h-11 items-center rounded-md px-3 text-[var(--brand)] underline underline-offset-2"
          >
            Call {emergencyLine}
          </a>
        </div>
      </div>
      ) : null}

      <div className={`container ${isTaskRoute ? "py-2" : "py-2"}`}>
        <div className="hidden items-center justify-between gap-6 md:flex">
          <Link href="/" className="flex items-center gap-3.5">
            <Image src="/branding/logo-legacy-clean.png" alt={`${company.publicBrand} logo`} width={220} height={88} className="h-auto w-[155px]" priority />
            <div>
              <p className={`font-display leading-none text-[var(--brand)] ${isTaskRoute ? "text-[1.25rem]" : "text-[1.4rem]"}`}>{company.publicBrand}</p>
              <p className={`text-slate-700 ${isTaskRoute ? "mt-0.5 text-xs" : "mt-1 text-xs"}`}>Family owned and operated since 1979</p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <nav data-primary-nav="desktop" className="mr-1 flex flex-wrap items-center gap-3">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm font-semibold text-slate-700 transition hover:text-[var(--brand)]">
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
              {publicCta.global.call.label}
            </a>
            {!isTaskRoute ? (
              <Link href="/contact" className="rounded-md border border-[#d3c3c3] bg-white px-4 py-2.5 text-sm font-semibold text-[var(--brand)]">
                {publicCta.global.request.label}
              </Link>
            ) : null}
          </div>
        </div>

        <div className="md:hidden">
          <div className="flex items-center justify-between gap-2">
            <Link href="/" className="flex min-w-0 items-center gap-2.5" onClick={() => setMobileMenuOpen(false)}>
              <Image src="/branding/logo-legacy-clean.png" alt={`${company.publicBrand} logo`} width={220} height={88} className="h-auto w-[90px] shrink-0" priority />
              <div className="min-w-0">
                <p className="truncate font-display text-[1.02rem] leading-tight text-[var(--brand)]">{company.publicBrand}</p>
                <p className="text-[0.74rem] text-slate-700">Call-first emergency support</p>
              </div>
            </Link>

            <button
              type="button"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-site-nav"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#d6c9c9] bg-[#fffaf9] text-[var(--brand)]"
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
