import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/site/Section";
import { ServiceAreaBlock } from "@/components/site/ServiceAreaBlock";
import { RequestPageLayout } from "@/components/site/RequestPageLayout";
import { RequestSupportBlocks } from "@/components/site/RequestSupportBlocks";
import { buildMetadata } from "@/lib/seo/metadata";
import { contactContent } from "@/content/contact";
import { ContactIntakeRouter } from "@/components/forms/ContactIntakeRouter";
import { company } from "@/config/company";
import type { SubmissionType } from "@/lib/forms/types";

export const metadata: Metadata = buildMetadata(
  "Contact",
  `Contact ${company.publicBrand} for 24/7 emergency septic service, evaluations, rentals, and commercial support.`,
  "/contact",
);

const contactLaneSet: ReadonlySet<SubmissionType> = new Set([
  "general",
  "septic-service",
  "evaluation",
  "rental",
  "commercial-service",
]);

type ContactPageProps = {
  searchParams?: Promise<{
    lane?: string | string[];
  }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const callHref = `tel:+1${company.primaryPhone.replace(/\D/g, "")}`;
  const resolvedSearchParams = (await searchParams) ?? {};
  const laneParam = resolvedSearchParams.lane;
  const requestedLane = Array.isArray(laneParam) ? laneParam[0] : laneParam;
  const initialLane =
    requestedLane && contactLaneSet.has(requestedLane as SubmissionType)
      ? (requestedLane as SubmissionType)
      : null;

  return (
    <Section title={contactContent.title}>
      <RequestPageLayout
        routeId="/contact"
        topPrimary={
          <div className="grid gap-5">
            <div className="rounded-2xl border border-[#d8c1c1] bg-[#fff1ef] p-5 text-slate-900">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
                Fastest path for urgent needs
              </p>
              <h2 className="mt-2 font-display text-3xl text-[var(--brand)]">
                Call Robinson for 24/7 emergency septic service.
              </h2>
              <p className="mt-3 text-sm sm:text-base">
                Choose the request lane that best matches your need. General contact stays available as a fallback.
              </p>
            </div>
            <p>{contactContent.intro}</p>
            <p className="text-sm text-slate-700">{contactContent.callout}</p>
            <p className="text-sm">{contactContent.responseNote}</p>

            <div className="overflow-hidden rounded-xl border border-[#d3c0c0]">
              <Image
                src="/images/enhanced/truck_full_ai_enhanced.jpg"
                alt="Robinson service truck ready for field dispatch"
                width={1200}
                height={720}
                className="h-[280px] w-full object-cover"
              />
            </div>

            <RequestSupportBlocks
              reasons={contactContent.commonReasonsToRequest}
              whatToHaveReady={contactContent.whatToHaveReady}
              nextSteps={contactContent.whatHappensNext}
              responseExpectation={contactContent.responseExpectation}
            />
          </div>
        }
        topSecondary={
          <div className="grid gap-4 rounded-2xl border border-[#d8c1c1] bg-[#fffdfb] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand)]">
              Call-first emergency lane
            </p>
            <h3 className="font-display text-2xl text-[var(--brand)]">Need immediate septic help?</h3>
            <p className="text-sm text-slate-700">Call now for emergency dispatch. Use form lanes below for full details and non-emergency coordination.</p>
            <a className="inline-flex min-h-11 w-fit items-center rounded-md bg-[var(--brand)] px-4 py-3 text-sm font-semibold text-white" href={callHref}>
              Call {company.primaryPhone}
            </a>
            <p className="text-xs text-slate-600">General lane keeps location optional until on-site service is relevant.</p>
          </div>
        }
        form={<ContactIntakeRouter initialLane={initialLane} />}
        postForm={<ServiceAreaBlock />}
      />
    </Section>
  );
}
