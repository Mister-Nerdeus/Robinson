import { company } from "@/config/company";
import Link from "next/link";
import Image from "next/image";
import { footerFastPathLinks } from "@/content/navigation";
import { TrackedPhoneLink } from "@/components/site/TrackedPhoneLink";
import { publishedLocations } from "@/content/locations";
import { serviceAreaContent } from "@/content/serviceArea";

export function Footer() {
  const primaryLocation = publishedLocations[0];

  return (
    <footer className="mt-10 border-t border-[#e2d6d6] bg-[#f7f2f1]">
      <div className="container grid gap-6 py-9 md:grid-cols-[1.25fr,0.75fr]">
        <div>
          <Image
            src="/branding/logo-legacy-clean.png"
            alt={`${company.publicBrand} logo`}
            width={220}
            height={88}
            className="h-auto w-[180px]"
          />
          <p className="mt-3 inline-flex rounded-full bg-[var(--brand)] px-3 py-1 text-sm font-semibold text-white">{company.emergencyService.claim}</p>
          <div className="mt-4 grid gap-1 text-sm">
            <p className="font-semibold">
              Call for service:{" "}
              <TrackedPhoneLink
                href={`tel:${company.primaryPhone}`}
                label={company.primaryPhone}
                location="footer-primary"
                className="underline"
              />
            </p>
            <p>Additional office line: {company.secondaryPhone}</p>
            <p>{primaryLocation.streetAddress}</p>
            <p>
              {primaryLocation.city}, {primaryLocation.state} {primaryLocation.postalCode}
            </p>
            <p className="text-xs text-slate-600">Location status: {primaryLocation.status}</p>
            <p>{company.serviceHours}</p>
          </div>
          <div className="mt-4 rounded-lg border border-[#e7dddd] bg-[#fcf8f7] px-3 py-2 text-xs text-slate-700">
            <p className="font-semibold text-slate-900">Coverage snapshot</p>
            <p className="mt-1">{serviceAreaContent.summary}</p>
            <p className="mt-1">{serviceAreaContent.expansionNote}</p>
          </div>
        </div>
        <div className="rounded-xl border border-[#e3d8d8] bg-[#faf6f5] p-4">
          <h2 className="font-display text-base text-[var(--brand)]">Fast Request Paths</h2>
          <p className="mt-1 text-xs text-slate-600">Keep this as secondary navigation after the active form flow.</p>
          <div className="mt-3 grid gap-2 text-sm text-slate-700">
            {footerFastPathLinks.map((link) => (
              <Link key={link.href} className="inline-flex w-fit underline decoration-[#b57f7f]/70 underline-offset-2" href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
