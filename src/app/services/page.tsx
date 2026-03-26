import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/site/Section";
import { servicesContent } from "@/content/services";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata(
  "Services",
  "Explore septic cleaning, evaluations, rentals, and commercial support lanes.",
  "/services",
);

const links = [
  { href: "/services/septic-cleaning", title: servicesContent.septicCleaning.title, text: servicesContent.septicCleaning.intro },
  { href: "/services/well-septic-evaluations", title: servicesContent.evaluations.title, text: servicesContent.evaluations.intro },
  { href: "/services/portable-toilets", title: servicesContent.portableToilets.title, text: servicesContent.portableToilets.intro },
  { href: "/services/commercial", title: servicesContent.commercial.title, text: servicesContent.commercial.intro },
];

export default function ServicesIndexPage() {
  return (
    <Section title="Services">
      <div className="grid gap-3">
        {links.map((item) => (
          <Link className="rounded-lg border border-[#c8c1b1] bg-[var(--surface)] p-4" key={item.href} href={item.href}>
            <h3 className="font-display text-2xl text-[var(--brand)]">{item.title}</h3>
            <p>{item.text}</p>
          </Link>
        ))}
      </div>
    </Section>
  );
}
