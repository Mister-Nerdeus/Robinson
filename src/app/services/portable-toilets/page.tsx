import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/site/Section";
import { RequestForm } from "@/components/forms/RequestForm";
import { RequestPageLayout } from "@/components/site/RequestPageLayout";
import { RequestSupportBlocks } from "@/components/site/RequestSupportBlocks";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/lib/seo/JsonLd";
import { serviceSchema } from "@/lib/seo/schema";
import { servicesContent } from "@/content/services";
import { company } from "@/config/company";

export const metadata: Metadata = buildMetadata(
  "Portable Toilet Rentals",
  "Portable toilet rentals for events, homes, businesses, schools, and job sites.",
  "/services/portable-toilets",
);

export default function PortableToiletsPage() {
  const callHref = `tel:+1${company.primaryPhone.replace(/\D/g, "")}`;

  return (
    <Section title="Portable Toilet Rentals">
      <JsonLd
        data={serviceSchema(
          "Portable Toilet Rentals",
          "Portable toilet rental and maintenance planning for events, homes, businesses, schools, and job sites.",
          "/services/portable-toilets",
        )}
      />
      <div className="mb-5 rounded-2xl border border-[#d8c1c1] bg-[#fff1ef] p-5 text-slate-900">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">Events and site support</p>
        <h2 className="mt-2 font-display text-3xl text-[var(--brand)]">Portable rental service that is easy to schedule.</h2>
        <p className="mt-3 text-sm sm:text-base">Send delivery dates, unit counts, and site instructions in one request for faster quoting and planning.</p>
      </div>
      <RequestPageLayout
        topPrimary={
          <div className="grid gap-5">
            <p className="text-slate-800">{servicesContent.portableToilets.intro}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="overflow-hidden rounded-xl border border-[#d3c0c0]">
                <Image src="/images/enhanced/portable_toilet_single_ai_enhanced.jpg" alt="Single Robinson portable toilet on location" width={1000} height={720} className="h-[260px] w-full object-cover" />
              </div>
              <div className="overflow-hidden rounded-xl border border-[#d3c0c0]">
                <Image src="/images/enhanced/portable_toilets_group_ai_enhanced.jpg" alt="Multiple Robinson portable toilet units staged together" width={1000} height={720} className="h-[260px] w-full object-cover" />
              </div>
            </div>
            <ul className="grid gap-2 rounded-2xl border border-[#ead6d6] bg-[#fff8f7] p-4 text-sm text-slate-700">
              {servicesContent.portableToilets.bullets.map((bullet) => (
                <li key={bullet}>• {bullet}</li>
              ))}
            </ul>
            <RequestSupportBlocks
              reasons={servicesContent.portableToilets.reasonsToCall}
              whatToHaveReady={servicesContent.portableToilets.whatToHaveReady}
              nextSteps={servicesContent.portableToilets.nextSteps}
              responseExpectation={servicesContent.portableToilets.responseExpectation}
            />
          </div>
        }
        topSecondary={
          <div className="grid gap-4 rounded-2xl border border-[#d8c1c1] bg-[#fffdfb] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand)]">Delivery support</p>
            <h3 className="font-display text-2xl text-[var(--brand)]">Need a fast rental quote?</h3>
            <p className="text-sm text-slate-700">Call for immediate availability checks. Use the form below for quantity, duration, and placement details.</p>
            <a className="inline-flex w-fit rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white" href={callHref}>
              Call {company.primaryPhone}
            </a>
            <p className="text-xs text-slate-600">The grouped form helps Robinson quote accurately without repeat callback questions.</p>
          </div>
        }
        form={<RequestForm type="rental" title="Request Portable Toilet Rental" />}
      />
    </Section>
  );
}
