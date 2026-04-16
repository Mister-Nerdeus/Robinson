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
  "Well and Septic Evaluations",
  "Deadline-aware evaluation requests for buyers, sellers, and Realtor workflows.",
  "/services/well-septic-evaluations",
);

export default function WellSepticEvaluationsPage() {
  const callHref = `tel:+1${company.primaryPhone.replace(/\D/g, "")}`;

  return (
    <Section title="Well & Septic Evaluations">
      <JsonLd
        data={serviceSchema(
          "Well and Septic Evaluations",
          "Home-sale well and septic evaluations for buyers, sellers, and local Realtors.",
          "/services/well-septic-evaluations",
        )}
      />
      <div className="mb-5 rounded-2xl border border-[#d8c1c1] bg-[#fff1ef] p-5 text-slate-900">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">Real-estate priority service</p>
        <h2 className="mt-2 font-display text-3xl text-[var(--brand)]">Keep your closing timeline moving.</h2>
        <p className="mt-3 text-sm sm:text-base">This request flow is built for buyers, sellers, and Realtors who need clear communication and fast coordination.</p>
      </div>
      <RequestPageLayout
        routeId="/services/well-septic-evaluations"
        topPrimary={
          <div className="grid gap-5">
            <p className="text-slate-800">{servicesContent.evaluations.intro}</p>
            <div className="overflow-hidden rounded-xl border border-[#d3c0c0]">
              <Image src="/images/enhanced/tech_evaluation_ai_enhanced.jpg" alt="Robinson team member handling a residential property visit" width={1200} height={720} className="h-[320px] w-full object-cover" />
            </div>
            <ul className="grid gap-2 rounded-2xl border border-[#ead6d6] bg-[#fff8f7] p-4 text-sm text-slate-700">
              {servicesContent.evaluations.bullets.map((bullet) => (
                <li key={bullet}>• {bullet}</li>
              ))}
            </ul>
            <RequestSupportBlocks
              reasons={servicesContent.evaluations.reasonsToCall}
              whatToHaveReady={servicesContent.evaluations.whatToHaveReady}
              nextSteps={servicesContent.evaluations.nextSteps}
              responseExpectation={servicesContent.evaluations.responseExpectation}
              noteTitle="Realtor workflow"
              noteBody="If you are coordinating for multiple stakeholders, include buyer/seller/agent contacts in one request so scheduling decisions stay aligned."
            />
          </div>
        }
        topSecondary={
          <div className="grid gap-4 rounded-2xl border border-[#d8c1c1] bg-[#fffdfb] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand)]">Timeline support</p>
            <h3 className="font-display text-2xl text-[var(--brand)]">Closing deadline pressure?</h3>
            <p className="text-sm text-slate-700">Call for same-day coordination when contract timelines are at risk, then submit the full request below.</p>
            <a className="inline-flex w-fit rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white" href={callHref}>
              Call {company.primaryPhone}
            </a>
            <Link className="inline-block text-sm font-semibold underline" href="/realtors">
              Open Realtor Resources
            </Link>
          </div>
        }
        form={<RequestForm type="evaluation" title="Request Evaluation / Realtor Service" />}
      />
    </Section>
  );
}
