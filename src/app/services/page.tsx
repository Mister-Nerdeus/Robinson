import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/site/Section";
import { servicesContent } from "@/content/services";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata(
  "Services",
  "Explore Robinson septic cleaning, evaluations, portable toilet rentals, grease trap cleaning, and lift pump service.",
  "/services",
);

const links = [
  { href: "/services/septic-cleaning", title: servicesContent.septicCleaning.title, text: servicesContent.septicCleaning.intro, bullets: servicesContent.septicCleaning.bullets },
  { href: "/services/well-septic-evaluations", title: servicesContent.evaluations.title, text: servicesContent.evaluations.intro, bullets: servicesContent.evaluations.bullets },
  { href: "/services/portable-toilets", title: servicesContent.portableToilets.title, text: servicesContent.portableToilets.intro, bullets: servicesContent.portableToilets.bullets },
  { href: "/services/commercial", title: servicesContent.commercial.title, text: servicesContent.commercial.intro, bullets: servicesContent.commercial.bullets },
];

export default function ServicesIndexPage() {
  return (
    <Section title="Services">
      <div className="grid gap-4">
        {links.map((item) => (
          <Link className="rounded-2xl border border-[#d7c6c6] bg-[var(--surface)] p-5 shadow-sm" key={item.href} href={item.href}>
            <h3 className="font-display text-2xl text-[var(--brand)]">{item.title}</h3>
            <p className="mt-2 text-slate-800">{item.text}</p>
            <ul className="mt-3 grid gap-1 text-sm text-slate-700">
              {item.bullets.map((bullet) => (
                <li key={bullet}>• {bullet}</li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
    </Section>
  );
}
