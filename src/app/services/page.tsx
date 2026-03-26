import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/site/Section";
import { servicesContent } from "@/content/services";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata(
  "Services",
  "Explore Robinson 24/7 emergency septic service, evaluations, portable toilet rentals, grease trap cleaning, and lift pump service.",
  "/services",
);

const links = [
  { href: "/services/septic-cleaning", title: servicesContent.septicCleaning.title, text: servicesContent.septicCleaning.intro, bullets: servicesContent.septicCleaning.bullets, image: "/images/enhanced/truck_full_ai_enhanced.jpg", alt: "Robinson septic truck on a property service visit" },
  { href: "/services/well-septic-evaluations", title: servicesContent.evaluations.title, text: servicesContent.evaluations.intro, bullets: servicesContent.evaluations.bullets, image: "/images/enhanced/tech_evaluation_ai_enhanced.jpg", alt: "Robinson technician working on site during a property evaluation" },
  { href: "/services/portable-toilets", title: servicesContent.portableToilets.title, text: servicesContent.portableToilets.intro, bullets: servicesContent.portableToilets.bullets, image: "/images/enhanced/portable_toilets_group_ai_enhanced.jpg", alt: "Robinson portable toilet rental units ready for delivery" },
  { href: "/services/commercial", title: servicesContent.commercial.title, text: servicesContent.commercial.intro, bullets: servicesContent.commercial.bullets, image: "/images/enhanced/truck_closeup_ai_enhanced.jpg", alt: "Robinson commercial support and grease trap related field work" },
];

export default function ServicesIndexPage() {
  return (
    <Section title="Services">
      <div className="mb-5 rounded-2xl border border-[#d8c1c1] bg-[#fff7f6] p-5 text-slate-800">
        Robinson is built around the service lanes customers actually use: 24/7 emergency septic pumping, routine septic maintenance, home-sale evaluations, portable toilet rentals, grease trap cleaning, and lift pump support. Choose the lane that matches the job and send the details that help scheduling move faster.
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {links.map((item) => (
          <Link className="overflow-hidden rounded-2xl border border-[#d7c6c6] bg-[var(--surface)] shadow-sm transition hover:-translate-y-0.5" key={item.href} href={item.href}>
            <Image src={item.image} alt={item.alt} width={1000} height={620} className="h-[220px] w-full object-cover" />
            <div className="p-5">
              <h3 className="font-display text-2xl text-[var(--brand)]">{item.title}</h3>
              <p className="mt-2 text-slate-800">{item.text}</p>
              <ul className="mt-3 grid gap-1 text-sm text-slate-700">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>• {bullet}</li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
