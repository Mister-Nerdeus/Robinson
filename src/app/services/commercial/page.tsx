import type { Metadata } from "next";
import Link from "next/link";
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
  "Commercial Services",
  "Commercial septic support including grease trap cleaning and lift pump service.",
  "/services/commercial",
);

export default function CommercialPage() {
  const callHref = `tel:+1${company.primaryPhone.replace(/\D/g, "")}`;

  return (
    <Section title="Commercial Services">
      <JsonLd
        data={serviceSchema(
          "Commercial Services",
          "Commercial septic support including grease trap cleaning and lift pump service.",
          "/services/commercial",
        )}
      />
      <div className="mb-5 rounded-2xl border border-[#d8c1c1] bg-[#fff1ef] p-5 text-slate-900">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">Commercial septic support</p>
        <h2 className="mt-2 font-display text-3xl text-[var(--brand)]">Keep facilities and operations running.</h2>
        <p className="mt-3 text-sm sm:text-base">Grease trap and lift pump issues can become urgent quickly. Send site details and service needs in one request.</p>
      </div>
      <RequestPageLayout
        topPrimary={
          <div className="grid gap-5">
            <p className="text-slate-800">{servicesContent.commercial.intro}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="overflow-hidden rounded-xl border border-[#d3c0c0]">
                <Image src="/current/grease-01-tmb.jpg" alt="Grease trap related field work and service context" width={1000} height={720} className="h-[240px] w-full object-cover" />
              </div>
              <div className="overflow-hidden rounded-xl border border-[#d3c0c0]">
                <Image src="/images/enhanced/truck_closeup_ai_enhanced.jpg" alt="Robinson support truck staged for commercial or route work" width={1000} height={720} className="h-[240px] w-full object-cover" />
              </div>
            </div>
            <ul className="grid gap-2 rounded-2xl border border-[#ead6d6] bg-[#fff8f7] p-4 text-sm text-slate-700">
              {servicesContent.commercial.bullets.map((bullet) => (
                <li key={bullet}>• {bullet}</li>
              ))}
            </ul>
            <RequestSupportBlocks
              reasons={servicesContent.commercial.reasonsToCall}
              whatToHaveReady={servicesContent.commercial.whatToHaveReady}
              nextSteps={servicesContent.commercial.nextSteps}
              responseExpectation={servicesContent.commercial.responseExpectation}
            />
          </div>
        }
        topSecondary={
          <div className="grid gap-4 rounded-2xl border border-[#d8c1c1] bg-[#fffdfb] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand)]">Operational urgency</p>
            <h3 className="font-display text-2xl text-[var(--brand)]">Facility downtime risk?</h3>
            <p className="text-sm text-slate-700">Call immediately for active commercial failure symptoms, then submit full lane details below for dispatch clarity.</p>
            <a className="inline-flex w-fit rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white" href={callHref}>
              Call {company.primaryPhone}
            </a>
            <Link className="inline-block text-sm font-semibold underline" href="/contact">
              Need a different lane? Open Contact
            </Link>
          </div>
        }
        form={<RequestForm type="commercial-service" title="Request Commercial Service" />}
      />
    </Section>
  );
}
