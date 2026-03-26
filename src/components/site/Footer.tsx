import { company } from "@/config/company";
import Link from "next/link";
import { serviceAreaContent } from "@/content/serviceArea";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-[#c8c1b1] bg-[#ece7db]">
      <div className="container grid gap-4 py-8 md:grid-cols-2">
        <div>
          <h2 className="font-display text-lg text-[var(--brand)]">Contact</h2>
          <p>{company.publicBrand}</p>
          <p>{company.address.line1}</p>
          <p>
            {company.address.city}, {company.address.state} {company.address.postalCode}
          </p>
          <p>{company.primaryPhone}</p>
          <p>{company.email}</p>
        </div>
        <div>
          <h2 className="font-display text-lg text-[var(--brand)]">Service Area</h2>
          <p className="text-sm">
            {serviceAreaContent.summary}
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            <Link className="underline" href="/services">
              Services
            </Link>
            <Link className="underline" href="/realtors">
              Realtors
            </Link>
            <Link className="underline" href="/faq">
              FAQ
            </Link>
            <Link className="underline" href="/contact">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
