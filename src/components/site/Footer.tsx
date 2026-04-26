"use client";

import { company } from "@/config/company";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { footerFastPathLinks } from "@/content/navigation";
import { TrackedPhoneLink } from "@/components/site/TrackedPhoneLink";
import { serviceAreaContent } from "@/content/serviceArea";
import { publicBusinessFacts } from "@/content/businessFacts";

export function Footer() {
  const pathname = usePathname();
  const hideSecondaryRouteLinks = Boolean(
    pathname &&
      (pathname === "/contact" ||
        pathname === "/realtors" ||
        pathname.startsWith("/services/")),
  );
  const primaryAddress = publicBusinessFacts.primaryAddress;
  const canonicalBusinessName = publicBusinessFacts.businessName;
  const emergencyLine = publicBusinessFacts.phoneSemantics.emergencyLine.number;
  const primaryLine = publicBusinessFacts.phoneSemantics.primaryServiceLine.number;
  const secondaryLine = publicBusinessFacts.phoneSemantics.secondaryOfficeLine.number;

  return (
    <footer className="mt-10 border-t border-[#ebe2e2] bg-[#f8f5f4]">
      <div className="container grid gap-6 py-9 md:grid-cols-[1.3fr,0.7fr]">
        <div>
          <Image
            src="/branding/logo-legacy-clean.png"
            alt={`${canonicalBusinessName} logo`}
            width={220}
            height={88}
            className="h-auto w-[180px]"
          />
          <p className="mt-3 inline-flex rounded-full bg-[var(--brand)] px-3 py-1 text-sm font-semibold text-white">{company.emergencyService.claim}</p>
          <div className="mt-4 grid gap-1 text-sm">
            <p className="font-semibold">
              Emergency dispatch: {" "}
              <TrackedPhoneLink
                href={`tel:${emergencyLine}`}
                label={emergencyLine}
                location="footer-emergency"
                className="underline"
              />
            </p>
            <p className="font-semibold">
              Primary service line: {" "}
              <TrackedPhoneLink
                href={`tel:${primaryLine}`}
                label={primaryLine}
                location="footer-primary"
                className="underline"
              />
            </p>
            <p className="text-xs text-slate-600">Secondary office line (non-dispatch): {secondaryLine}</p>
            <p>{primaryAddress.line1}</p>
            <p>
              {primaryAddress.city}, {primaryAddress.state} {primaryAddress.postalCode}
            </p>
            <p>Routine scheduling hours: {publicBusinessFacts.normalBusinessHours}</p>
            <p className="text-xs text-slate-600">{publicBusinessFacts.emergencyResponsePolicy}</p>
          </div>
          <div className="mt-4 rounded-lg border border-[#ece3e3] bg-[#fcfaf9] px-3 py-2 text-xs text-slate-700">
            <p className="font-semibold text-slate-900">Service-area snapshot</p>
            <p className="mt-1">{serviceAreaContent.summary}</p>
          </div>
        </div>
        {!hideSecondaryRouteLinks ? (
          <div
            className="rounded-xl border border-[#ece3e3] bg-[#fbf9f8] p-4"
            data-secondary-route-links="true"
          >
            <h2 className="font-display text-base text-[var(--brand)]">Route links (secondary)</h2>
            <p className="mt-1 text-xs text-slate-600">Useful global navigation after active task completion.</p>
            <div className="mt-3 grid gap-1.5 text-sm text-slate-700">
              {footerFastPathLinks.map((link) => (
                <Link key={link.href} className="inline-flex w-fit underline decoration-[#b8a0a0]/70 underline-offset-2" href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </footer>
  );
}
