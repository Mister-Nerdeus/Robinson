import Image from "next/image";
import { Section } from "@/components/site/Section";
import { RequestForm } from "@/components/forms/RequestForm";
import { RequestPageLayout } from "@/components/site/RequestPageLayout";
import { RequestSupportBlocks } from "@/components/site/RequestSupportBlocks";
import type { ServiceTemplateEntry } from "@/content/serviceTemplates";
import { servicesContent } from "@/content/services";
import { publicBusinessFacts } from "@/content/businessFacts";
import { REQUEST_ROUTE_SECTION_MODES } from "@/config/requestLayoutContract";
import { JsonLd } from "@/lib/seo/JsonLd";
import { serviceSchema } from "@/lib/seo/schema";

type ServiceRequestPageTemplateProps = {
  entry: ServiceTemplateEntry;
};

function SepticPrepModule({
  reasons,
  ready,
  nextSteps,
}: {
  reasons: string[];
  ready: string[];
  nextSteps: string[];
}) {
  return (
    <div className="rounded-2xl border border-[#e4d3c7] bg-[#fffaf4] p-4" data-septic-prep-module="coherent-pre-form-v1">
      <h4 className="font-display text-xl text-[var(--brand)]">Before You Submit (Dispatch Prep)</h4>
      <p className="mt-2 text-sm text-slate-700">
        One quick prep block so dispatch can route the right truck and callback plan without extra back-and-forth.
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-700">Common reasons</p>
          <ul className="mt-1 grid gap-1 text-sm text-slate-700">
            {reasons.slice(0, 3).map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-700">Have ready</p>
          <ul className="mt-1 grid gap-1 text-sm text-slate-700">
            {ready.slice(0, 3).map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-700">What happens next</p>
          <ul className="mt-1 grid gap-1 text-sm text-slate-700">
            {nextSteps.slice(0, 2).map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function ServiceRequestPageTemplate({ entry }: ServiceRequestPageTemplateProps) {
  const primaryServiceLine = publicBusinessFacts.phoneSemantics.primaryServiceLine.number;
  const callHref = `tel:+1${primaryServiceLine.replace(/\D/g, "")}`;
  const content = servicesContent[entry.serviceContentKey];
  const isSepticRoute = entry.id === "septic-cleaning";
  const isEvaluationRoute = entry.id === "well-septic-evaluations";
  const sectionModes = REQUEST_ROUTE_SECTION_MODES[entry.route];

  return (
    <Section title={entry.pageTitle} layout="task">
      <div data-service-template-id={entry.id} data-service-template-slots="headline-summary-included-proof-faq-primary-optional-secondary">
        <JsonLd data={serviceSchema(entry.schemaName, entry.schemaDescription, entry.route)} />
        <div className="mb-5 rounded-2xl border border-[#d8c1c1] bg-[#fff1ef] p-5 text-slate-900">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">{entry.heroEyebrow}</p>
          <h2 className="mt-2 font-display text-3xl text-[var(--brand)]">{entry.slots.headline}</h2>
          <p className="mt-3 text-sm sm:text-base">{entry.slots.summary}</p>
        </div>
        <RequestPageLayout
          routeId={entry.route}
          topMode={sectionModes.top}
          formMode={sectionModes.form}
          topPrimary={
            <div className="grid gap-4">
              <p className="text-slate-800">{content.intro}</p>
              <div className={`grid gap-3 ${!isSepticRoute && entry.media.length > 1 ? "sm:grid-cols-2" : ""}`}>
                {(isSepticRoute ? entry.media.slice(0, 1) : entry.media).map((image) => (
                  <div key={image.src} className="overflow-hidden rounded-xl border border-[#d3c0c0]">
                    <Image src={image.src} alt={image.alt} width={1200} height={720} className="h-[220px] w-full object-cover" />
                  </div>
                ))}
              </div>
              {isSepticRoute ? (
                <div className="rounded-2xl border border-[#ead6d6] bg-[#fff8f7] p-4">
                  <h3 className="font-display text-xl text-[var(--brand)]">Urgent guidance first</h3>
                  <p className="mt-2 text-sm text-slate-700">
                    If backup, overflow, alarm, or strong odor is active, call first. Then complete the first editable step below to reduce callback delays.
                  </p>
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-[#ead6d6] bg-[#fff8f7] p-4">
                    <h3 className="font-display text-xl text-[var(--brand)]">What service includes</h3>
                    <ul className="mt-2 grid gap-2 text-sm text-slate-700">
                      {entry.slots.includedItems.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  {entry.slots.pricingFactors ? (
                    <div className="rounded-2xl border border-[#e6ddd0] bg-[#fffaf3] p-4">
                      <h3 className="font-display text-xl text-[var(--brand)]">Pricing factors</h3>
                      <ul className="mt-2 grid gap-2 text-sm text-slate-700">
                        {entry.slots.pricingFactors.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          }
          topSecondary={
            <div className="grid gap-4">
              <div className="grid gap-4 rounded-2xl border border-[#d8c1c1] bg-[#fffdfb] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand)]">Fastest first step</p>
                <h3 className="font-display text-2xl text-[var(--brand)]">{entry.slots.primaryCta.label}</h3>
                <p className="text-sm text-slate-700">
                  {isEvaluationRoute
                    ? "When closing windows are tight, call first for deadline triage, then submit transaction details in the evaluation workflow."
                    : "Call for immediate dispatch triage when symptoms are active, then complete the first editable step below."}
                </p>
                <a className="inline-flex min-h-11 w-fit items-center rounded-md bg-[var(--brand)] px-4 py-3 text-sm font-semibold text-white" href={callHref}>
                  Call {primaryServiceLine}
                </a>
              </div>
              {isSepticRoute ? (
                <SepticPrepModule
                  reasons={content.reasonsToCall}
                  ready={content.whatToHaveReady}
                  nextSteps={content.nextSteps}
                />
              ) : (
                <div className="rounded-2xl border border-[#e6ddd0] bg-[#fffaf3] p-4">
                  <h4 className="font-display text-xl text-[var(--brand)]">Before You Start (Quick)</h4>
                  <ul className="mt-2 grid gap-2 text-sm text-slate-700">
                    {content.whatToHaveReady.slice(0, 3).map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                  <details className="mt-3 text-xs text-slate-600">
                    <summary className="cursor-pointer font-semibold text-[var(--brand)]">More prep guidance</summary>
                    <p className="mt-2">{content.responseExpectation}</p>
                  </details>
                </div>
              )}
            </div>
          }
          form={<RequestForm type={entry.formType} title={entry.formTitle} />}
          postForm={
            <div className="grid gap-4">
              {isSepticRoute ? (
                <div className="rounded-2xl border border-[#d8c1c1] bg-[#fffdfb] p-4">
                  <h3 className="font-display text-2xl text-[var(--brand)]">What happens next</h3>
                  <ul className="mt-2 grid gap-2 text-sm text-slate-700">
                    {content.nextSteps.map((step) => (
                      <li key={step}>• {step}</li>
                    ))}
                  </ul>
                  <p className="mt-3 text-sm text-slate-700">{content.responseExpectation}</p>
                </div>
              ) : (
                <RequestSupportBlocks
                  reasons={content.reasonsToCall}
                  whatToHaveReady={content.whatToHaveReady}
                  nextSteps={content.nextSteps}
                  responseExpectation={content.responseExpectation}
                  variant="compact"
                />
              )}
            </div>
          }
          postFormMode={sectionModes.postForm ?? "fullWidthSupport"}
        />
      </div>
    </Section>
  );
}
