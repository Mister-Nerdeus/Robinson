import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/site/Section";
import { RequestSupportBlocks } from "@/components/site/RequestSupportBlocks";
import { RealtorEvaluationFlow } from "@/components/forms/RealtorEvaluationFlow";
import { buildMetadata } from "@/lib/seo/metadata";
import { servicesContent } from "@/content/services";
import { realtorFaqSubset } from "@/content/faqs";
import { company } from "@/config/company";
import { TaskPageLayout } from "@/components/layout/TaskPageLayout";

export const metadata: Metadata = buildMetadata(
  "Realtor Resources",
  "Deadline-first well and septic evaluation workflow for Realtors, buyers, and sellers.",
  "/realtors",
);

export default function RealtorsPage() {
  const callHref = `tel:+1${company.primaryPhone.replace(/\\D/g, "")}`;

  return (
    <Section title="Realtor Resources" layout="task">
      <div className="mb-5 rounded-2xl border border-[#d8c1c1] bg-[#fff1ef] p-5 text-slate-900">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">Transaction workflow lane</p>
        <h2 className="mt-2 font-display text-3xl text-[var(--brand)]">Closing-date first evaluation intake.</h2>
        <p className="mt-3 text-sm sm:text-base">Built for buyer/seller/Realtor coordination with explicit deadline and access fields.</p>
      </div>
      <TaskPageLayout
        route="/realtors"
        primary={
          <div className="grid gap-5">
            <p className="text-slate-800">
              Realtor lane follow-up expectations differ from routine pumping requests: deadline pressure and transaction coordination are prioritized.
            </p>
            <RealtorEvaluationFlow />
          </div>
        }
        support={
          <div className="grid gap-5">
            <div className="grid gap-4 rounded-2xl border border-[#d8c1c1] bg-[#fffdfb] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand)]">Transaction pressure support</p>
              <h3 className="font-display text-2xl text-[var(--brand)]">Need immediate timeline clarity?</h3>
              <p className="text-sm text-slate-700">Call first when closing windows are tight, then submit structured intake to include all transaction context.</p>
              <a className="inline-flex min-h-11 w-fit items-center rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white" href={callHref}>
                Call {company.primaryPhone}
              </a>
              <p className="text-xs text-slate-600">Routine Realtor workflow target: 1-3 business day follow-up for non-emergency evaluation requests.</p>
            </div>
            <div className="overflow-hidden rounded-xl border border-[#d3c0c0] bg-[var(--surface)] shadow-sm">
              <Image src="/images/enhanced/tech_evaluation_ai_enhanced.jpg" alt="Robinson team member on site during a property-service visit" width={1000} height={780} className="h-[220px] w-full object-cover" />
            </div>
            <RequestSupportBlocks
              reasons={servicesContent.evaluations.reasonsToCall}
              whatToHaveReady={servicesContent.evaluations.whatToHaveReady}
              nextSteps={servicesContent.evaluations.nextSteps}
              responseExpectation={servicesContent.evaluations.responseExpectation}
              noteTitle="Realtor coordination note"
              noteBody="Include transaction participants and callback order so updates reach the right people quickly."
            />
            <div className="grid gap-2 rounded-md bg-[#f5eded] p-3 text-sm">
              <p className="font-semibold text-[var(--brand)]">Realtor FAQ quick hits</p>
              {realtorFaqSubset.map((item) => (
                <p key={item.question}><strong>{item.question}</strong> {item.answer}</p>
              ))}
            </div>
            <div className="rounded-md bg-[#f5eded] p-3 text-sm">
              Looking for the main service page? <Link className="font-semibold underline" href="/services/well-septic-evaluations">Open Well &amp; Septic Evaluations</Link>
            </div>
          </div>
        }
      />
    </Section>
  );
}
