import { Section } from "@/components/site/Section";
import Link from "next/link";

export default function RealtorNestedPage() {
  return (
    <Section title="Realtor Evaluation Support">
      <div className="grid gap-4">
        <p className="text-slate-800">
          Robinson works with Realtors, buyers, and sellers who need well and septic evaluations scheduled as part of a
          home sale.
        </p>
        <p className="text-slate-700">
          Use the Realtor request form to send the property address, access notes, and contact details so the office
          can review the job and follow up with scheduling information.
        </p>
        <div className="rounded-md bg-[#f5eded] p-3">
          <Link className="font-semibold underline" href="/realtors">
            Open Realtor Resources
          </Link>
        </div>
      </div>
    </Section>
  );
}
