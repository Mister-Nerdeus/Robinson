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
  "Septic Tank Cleaning",
  "24/7 emergency septic pumping, routine cleaning, and fast scheduling support from Robinson Septic Cleaning.",
  "/services/septic-cleaning",
);

export default function SepticCleaningPage() {
  const callHref = `tel:+1${company.primaryPhone.replace(/\D/g, "")}`;

  return (
    <Section title="Septic Tank Cleaning">
      <JsonLd
        data={serviceSchema(
          "Septic Tank Cleaning",
          "Residential and commercial septic pumping with 24/7 emergency service, access planning, and routine scheduling support.",
          "/services/septic-cleaning",
        )}
      />
      <div className="mb-5 rounded-2xl border border-[#d8c1c1] bg-[#fff1ef] p-5 text-slate-900">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">24/7 Emergency Service</p>
        <h2 className="mt-2 font-display text-3xl text-[var(--brand)]">Call immediately when septic problems are active.</h2>
        <p className="mt-3 text-sm sm:text-base">For urgent backups or overdue routine pumping, Robinson gives you one direct request path with clear next steps.</p>
      </div>
      <RequestPageLayout
        topPrimary={
          <div className="grid gap-5">
            <p className="text-slate-800">{servicesContent.septicCleaning.intro}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="overflow-hidden rounded-xl border border-[#d3c0c0]">
                <Image src="/images/enhanced/truck_closeup_ai_enhanced.jpg" alt="Robinson septic tanker and hose setup on route" width={1000} height={640} className="h-[240px] w-full object-cover" />
              </div>
              <div className="overflow-hidden rounded-xl border border-[#d3c0c0]">
                <Image src="/images/enhanced/truck_full_ai_enhanced.jpg" alt="Robinson septic truck at a residential property" width={1000} height={640} className="h-[240px] w-full object-cover" />
              </div>
            </div>
            <ul className="grid gap-2 rounded-2xl border border-[#ead6d6] bg-[#fff8f7] p-4 text-sm text-slate-700">
              {servicesContent.septicCleaning.bullets.map((bullet) => (
                <li key={bullet}>• {bullet}</li>
              ))}
            </ul>
            <RequestSupportBlocks
              reasons={servicesContent.septicCleaning.reasonsToCall}
              whatToHaveReady={servicesContent.septicCleaning.whatToHaveReady}
              nextSteps={servicesContent.septicCleaning.nextSteps}
              responseExpectation={servicesContent.septicCleaning.responseExpectation}
            />
          </div>
        }
        topSecondary={
          <div className="grid gap-4 rounded-2xl border border-[#d8c1c1] bg-[#fffdfb] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand)]">Need dispatch now?</p>
            <h3 className="font-display text-2xl text-[var(--brand)]">Call first for active septic warnings.</h3>
            <p className="text-sm text-slate-700">Backups, alarms, or overflow conditions are prioritized fastest by phone.</p>
            <a className="inline-flex w-fit rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white" href={callHref}>
              Call {company.primaryPhone}
            </a>
            <p className="text-xs text-slate-600">After calling, submit the form below so dispatch has complete tank and access details.</p>
          </div>
        }
        form={<RequestForm type="septic-service" title="Request Septic Service" />}
      />
    </Section>
  );
}
