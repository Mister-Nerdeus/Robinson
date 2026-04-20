import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/site/Section";
import { RequestForm } from "@/components/forms/RequestForm";
import { RequestPageLayout } from "@/components/site/RequestPageLayout";
import { RequestSupportBlocks } from "@/components/site/RequestSupportBlocks";
import type { ServiceTemplateEntry } from "@/content/serviceTemplates";
import { servicesContent } from "@/content/services";
import { company } from "@/config/company";
import { JsonLd } from "@/lib/seo/JsonLd";
import { serviceSchema } from "@/lib/seo/schema";

type ServiceRequestPageTemplateProps = {
  entry: ServiceTemplateEntry;
};

export function ServiceRequestPageTemplate({ entry }: ServiceRequestPageTemplateProps) {
  const callHref = `tel:+1${company.primaryPhone.replace(/\D/g, "")}`;
  const content = servicesContent[entry.serviceContentKey];

  return (
    <Section title={entry.pageTitle}>
      <div data-service-template-id={entry.id} data-service-template-slots="headline-summary-included-proof-faq-primary-optional-secondary">
        <JsonLd data={serviceSchema(entry.schemaName, entry.schemaDescription, entry.route)} />
        <div className="mb-5 rounded-2xl border border-[#d8c1c1] bg-[#fff1ef] p-5 text-slate-900">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">{entry.heroEyebrow}</p>
          <h2 className="mt-2 font-display text-3xl text-[var(--brand)]">{entry.slots.headline}</h2>
          <p className="mt-3 text-sm sm:text-base">{entry.slots.summary}</p>
        </div>
        <RequestPageLayout
          routeId={entry.route}
          topPrimary={
          <div className="grid gap-5">
            <p className="text-slate-800">{content.intro}</p>
            <div className={`grid gap-3 ${entry.media.length > 1 ? "sm:grid-cols-2" : ""}`}>
              {entry.media.map((image) => (
                <div key={image.src} className="overflow-hidden rounded-xl border border-[#d3c0c0]">
                  <Image src={image.src} alt={image.alt} width={1200} height={720} className="h-[260px] w-full object-cover" />
                </div>
              ))}
            </div>
            <ul className="grid gap-2 rounded-2xl border border-[#ead6d6] bg-[#fff8f7] p-4 text-sm text-slate-700">
              {entry.slots.includedItems.map((bullet) => (
                <li key={bullet}>• {bullet}</li>
              ))}
            </ul>
            <ul className="grid gap-2 rounded-2xl border border-[#e6ded0] bg-[#fffaf3] p-4 text-sm text-slate-700">
              {entry.slots.proofPoints.map((point) => (
                <li key={point}>• {point}</li>
              ))}
            </ul>
            <RequestSupportBlocks
              reasons={content.reasonsToCall}
              whatToHaveReady={content.whatToHaveReady}
              nextSteps={content.nextSteps}
              responseExpectation={content.responseExpectation}
            />
            <div className="grid gap-3 rounded-2xl border border-[#ddd4c5] bg-[#fffdf9] p-4">
              <h3 className="font-display text-2xl text-[var(--brand)]">Related questions</h3>
              {entry.slots.faqSubset.map((item) => (
                <article key={item.question} className="rounded-lg border border-[#e6ddd0] bg-white p-3">
                  <h4 className="text-sm font-semibold text-slate-900">{item.question}</h4>
                  <p className="mt-1 text-sm text-slate-700">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
          }
          topSecondary={
          <div className="grid gap-4 rounded-2xl border border-[#d8c1c1] bg-[#fffdfb] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand)]">Fastest first step</p>
            <h3 className="font-display text-2xl text-[var(--brand)]">{entry.slots.primaryCta.label}</h3>
            <p className="text-sm text-slate-700">Call for immediate dispatch triage when symptoms are active, then submit the lane form below for complete routing details.</p>
            <a className="inline-flex min-h-11 w-fit items-center rounded-md bg-[var(--brand)] px-4 py-3 text-sm font-semibold text-white" href={callHref}>
              Call {company.primaryPhone}
            </a>
            {entry.slots.secondaryCta ? (
              <Link className="inline-block text-sm font-semibold underline" href={entry.slots.secondaryCta.href}>
                {entry.slots.secondaryCta.label}
              </Link>
            ) : null}
          </div>
          }
          form={<RequestForm type={entry.formType} title={entry.formTitle} />}
        />
      </div>
    </Section>
  );
}
