import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/site/Section";
import { RequestForm } from "@/components/forms/RequestForm";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata(
  "Realtor Resources",
  "Well and septic evaluation requests for Realtors, buyers, and sellers with deadline-focused scheduling details.",
  "/realtors",
);

export default function RealtorsPage() {
  return (
    <Section title="Realtor Resources">
      <div className="mb-5 rounded-2xl border border-[#d8c1c1] bg-[#fff1ef] p-5 text-slate-900">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">Deadline-aware evaluation support</p>
        <h2 className="mt-2 font-display text-3xl text-[var(--brand)]">Keep buyers, sellers, and agents aligned.</h2>
        <p className="mt-3 text-sm sm:text-base">Use this request to share transaction details, access instructions, and timing priorities in one message.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1.1fr,0.9fr]">
        <div className="grid gap-4">
          <p className="text-slate-800">
            Robinson works with local real-estate teams that need evaluations coordinated quickly and clearly during active transactions.
          </p>

          <div className="rounded-2xl border border-[#d8c1c1] bg-[#fff7f6] p-4 text-sm leading-8 text-slate-800">
            Include the property address, occupancy status, lockbox or gate details, and contact roles so scheduling can be matched to contract timelines.
          </div>

          <ul className="grid gap-2 rounded-2xl border border-[#ead6d6] bg-[var(--surface)] p-4 text-sm leading-8 text-slate-700">
            <li>• Built for buyers, sellers, and Realtors with active deadlines.</li>
            <li>• Captures property and access details before callback.</li>
            <li>• Keeps communication organized across all transaction contacts.</li>
            <li>• Supports faster scheduling decisions when timing is tight.</li>
          </ul>

          <div className="rounded-md bg-[#f5eded] p-3 text-sm">
            Looking for the main service page? <Link className="font-semibold underline" href="/services/well-septic-evaluations">Open Well &amp; Septic Evaluations</Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#d3c0c0] bg-[var(--surface)] shadow-sm">
          <Image src="/images/enhanced/tech_evaluation_ai_enhanced.jpg" alt="Robinson team member on site during a property-service visit" width={1000} height={780} className="h-full min-h-[320px] w-full object-cover" />
        </div>
      </div>

      <div className="mt-6">
        <RequestForm
          type="well-septic-evaluation"
          title="Request Realtor / Home-Sale Evaluation"
          extraFields={[
            { name: "roleInSale", label: "Your Role (Realtor, Buyer, Seller)", required: true },
            { name: "realtorCompany", label: "Brokerage / Office" },
          ]}
        />
      </div>
    </Section>
  );
}
