"use client";

import { company } from "@/config/company";
import Link from "next/link";
import Image from "next/image";
import { footerFastPathLinks } from "@/content/navigation";
import { TrackedPhoneLink } from "@/components/site/TrackedPhoneLink";
import { serviceAreaContent } from "@/content/serviceArea";
import { publicBusinessFacts } from "@/content/businessFacts";
import { buildFooterCallLabel } from "@/content/cta";

export function Footer() {
  const primaryAddress = publicBusinessFacts.primaryAddress;
  const canonicalBusinessName = publicBusinessFacts.businessName;
  const emergencyLine = publicBusinessFacts.phoneSemantics.emergencyLine.number;
  const primaryLine = publicBusinessFacts.phoneSemantics.primaryServiceLine.number;
  const secondaryLine = publicBusinessFacts.phoneSemantics.secondaryOfficeLine.number;
  const sharedPrimaryNumber = emergencyLine === primaryLine ? emergencyLine : primaryLine;

  return (
    <footer className="mt-10 border-t border-[#ebe2e2] bg-[#f8f5f4]" data-footer-surface="compact-contact-v1">
      <div className="container py-7">
        <div className="rounded-2xl border border-[#e6dddd] bg-[#fcf9f8] p-5 md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <Image
                src="/branding/logo-legacy-clean.png"
                alt={`${canonicalBusinessName} logo`}
                width={220}
                height={88}
                className="h-auto w-[160px]"
              />
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand)]">{company.emergencyService.claim}</p>
            </div>
            <TrackedPhoneLink
              href={`tel:${sharedPrimaryNumber}`}
              label={buildFooterCallLabel(sharedPrimaryNumber)}
              location="footer-primary"
              className="inline-flex min-h-11 items-center rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white"
            />
          </div>

          <div className="mt-4 grid gap-2 text-sm text-slate-700 md:grid-cols-2">
            <p>{canonicalBusinessName} serves West Michigan with emergency response and scheduled septic service.</p>
            <p>Routine scheduling hours: {publicBusinessFacts.normalBusinessHours}</p>
            <p>{serviceAreaContent.summary}</p>
            <p>
              {primaryAddress.line1}, {primaryAddress.city}, {primaryAddress.state} {primaryAddress.postalCode}
            </p>
            {secondaryLine ? <p className="text-slate-600">Office support line: {secondaryLine}</p> : null}
          </div>

          <div data-secondary-route-links="footer-fast-paths" className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-700">
            {footerFastPathLinks.map((link) => (
              <Link key={link.href} className="underline decoration-[#b8a0a0]/70 underline-offset-2" href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
