import { company } from "@/config/company";
import Link from "next/link";
import Image from "next/image";
import { serviceAreaContent } from "@/content/serviceArea";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-[#cdb7b7] bg-[#f4eeee]">
      <div className="container grid gap-6 py-8 md:grid-cols-[1.1fr,1fr]">
        <div>
          <Image
            src="/branding/logo-legacy-clean.png"
            alt="Robinson Septic Cleaning logo"
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
        </div>
        <div>
          <h2 className="font-display text-lg text-[var(--brand)]">Service Area and Fast Request Paths</h2>
          <p className="mt-2 text-sm">{serviceAreaContent.summary}</p>
          <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2 text-sm">
            <Link className="underline" href="/services/septic-cleaning">
              Emergency Septic Service
            </Link>
            <Link className="underline" href="/services/well-septic-evaluations">
              Evaluations
            </Link>
            <Link className="underline" href="/services/portable-toilets">
              Rentals
            </Link>
            <Link className="underline" href="/services/commercial">
              Commercial Support
            </Link>
            <Link className="underline" href="/realtors">
              Realtor Resources
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
