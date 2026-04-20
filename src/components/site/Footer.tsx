import { company } from "@/config/company";
import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import { serviceAreaContent } from "@/content/serviceArea";
import { DeploymentStamp } from "@/components/site/DeploymentStamp";
import { footerFastPathLinks } from "@/content/navigation";
import {
  getRuntimeEnv,
  isAdminReviewEnabled,
  shouldRenderOperatorProofChrome,
} from "@/lib/runtime/env";

export async function Footer() {
  const runtime = getRuntimeEnv();
  const adminOpen = isAdminReviewEnabled();
  const cookieStore = await cookies();
  const reviewCookieValue = cookieStore.get(runtime.reviewAccessCookieName)?.value;
  const showReview = shouldRenderOperatorProofChrome(undefined, reviewCookieValue);

  return (
    <footer className="mt-12 border-t border-[#cdb7b7] bg-[#f4eeee]">
      <div className="container grid gap-6 py-8 md:grid-cols-[1.1fr,1fr]">
        <div>
          <Image
            src="/branding/logo-legacy-clean.png"
            alt={`${company.publicBrand} logo`}
            width={220}
            height={88}
            className="h-auto w-[180px]"
          />
          <p className="mt-3 inline-flex rounded-full bg-[var(--brand)] px-3 py-1 text-sm font-semibold text-white">{company.emergencyService.claim}</p>
          <p className="mt-3 max-w-xl text-sm text-slate-700">Residential and commercial septic cleaning, home-sale evaluations, portable toilet rentals, grease trap cleaning, and lift pump service across West Michigan.</p>
          <div className="mt-4 grid gap-1 text-sm">
            <p className="font-semibold">Call for service: {company.primaryPhone}</p>
            <p>Additional office line: {company.secondaryPhone}</p>
            <p>{company.address.line1}</p>
            <p>
              {company.address.city}, {company.address.state} {company.address.postalCode}
            </p>
            <p>{company.serviceHours}</p>
          </div>
          {showReview ? (
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-700">
              <span className="rounded-full border border-[#d3c0c0] bg-white px-2 py-1">Mode: {runtime.mode}</span>
              <span className="rounded-full border border-[#d3c0c0] bg-white px-2 py-1">Local-only: {runtime.localOnlyMode ? "on" : "off"}</span>
              <span className="rounded-full border border-[#d3c0c0] bg-white px-2 py-1">Admin review: {adminOpen ? "enabled" : "blocked"}</span>
            </div>
          ) : null}
          {showReview ? (
            <div className="mt-3">
              <DeploymentStamp />
            </div>
          ) : null}
        </div>
        <div>
          <h2 className="font-display text-lg text-[var(--brand)]">Service Area and Fast Request Paths</h2>
          <p className="mt-2 text-sm">{serviceAreaContent.summary}</p>
          <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-sm">
            {footerFastPathLinks.map((link) => (
              <Link key={link.href} className="underline" href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
