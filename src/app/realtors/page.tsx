import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/site/Section";
import { RequestForm } from "@/components/forms/RequestForm";
import { RequestPageLayout } from "@/components/site/RequestPageLayout";
import { RequestSupportBlocks } from "@/components/site/RequestSupportBlocks";
import { buildMetadata } from "@/lib/seo/metadata";
import { servicesContent } from "@/content/services";
import { company } from "@/config/company";

export const metadata: Metadata = buildMetadata(
  "Realtor Resources",
  "Well and septic evaluation requests for Realtors, buyers, and sellers with deadline-focused scheduling details.",
  "/realtors",
);

export default function RealtorsPage() {
  const callHref = `tel:+1${company.primaryPhone.replace(/\D/g, "")}`;

  return (
    <Section title="Realtor Resources">
      <div className="mb-5 rounded-2xl border border-[#d8c1c1] bg-[#fff1ef] p-5 text-slate-900">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">Deadline-aware evaluation support</p>
        <h2 className="mt-2 font-display text-3xl text-[var(--brand)]">Keep buyers, sellers, and agents aligned.</h2>
        <p className="mt-3 text-sm sm:text-base">Use this request to share transaction details, access instructions, and timing priorities in one message.</p>
      </div>
      <RequestPageLayout
        routeId="/realtors"
        topPrimary={
          <div className="grid gap-5">
            <p className="text-slate-800">
              Robinson works with local real-estate teams that need evaluations coordinated quickly and clearly during active transactions.
            </p>
            <div className="overflow-hidden rounded-xl border border-[#d3c0c0] bg-[var(--surface)] shadow-sm">
              <Image src="/images/enhanced/tech_evaluation_ai_enhanced.jpg" alt="Robinson team member on site during a property-service visit" width={1000} height={780} className="h-[320px] w-full object-cover" />
            </div>
            <ul className="grid gap-2 rounded-2xl border border-[#ead6d6] bg-[#fff8f7] p-4 text-sm leading-8 text-slate-700">
              <li>• Built for buyers, sellers, and Realtors with active deadlines.</li>
              <li>• Captures property and access details before callback.</li>
              <li>• Keeps communication organized across all transaction contacts.</li>
              <li>• Supports faster scheduling decisions when timing is tight.</li>
            </ul>
            <RequestSupportBlocks
              reasons={servicesContent.evaluations.reasonsToCall}
              whatToHaveReady={servicesContent.evaluations.whatToHaveReady}
              nextSteps={servicesContent.evaluations.nextSteps}
              responseExpectation={servicesContent.evaluations.responseExpectation}
              noteTitle="Realtor coordination note"
              noteBody="Include transaction participants and best contact sequence in one request so scheduling updates reach the right people quickly."
            />
            <div className="rounded-md bg-[#f5eded] p-3 text-sm">
              Looking for the main service page? <Link className="font-semibold underline" href="/services/well-septic-evaluations">Open Well &amp; Septic Evaluations</Link>
            </div>
          </div>
        }
        topSecondary={
          <div className="grid gap-4 rounded-2xl border border-[#d8c1c1] bg-[#fffdfb] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand)]">Transaction pressure support</p>
            <h3 className="font-display text-2xl text-[var(--brand)]">Need timeline clarity right away?</h3>
            <p className="text-sm text-slate-700">Call first when closing windows are tight, then submit the full intake below to lock in property and access context.</p>
            <a className="inline-flex w-fit rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white" href={callHref}>
              Call {company.primaryPhone}
            </a>
            <p className="text-xs text-slate-600">The grouped evaluation lane keeps buyer, seller, and Realtor context aligned in one request.</p>
          </div>
        }
        form={<RequestForm type="evaluation" title="Request Realtor / Home-Sale Evaluation" />}
      />
    </Section>
  );
}
