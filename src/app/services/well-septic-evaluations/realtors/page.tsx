import { Section } from "@/components/site/Section";
import Link from "next/link";

export default function RealtorNestedPage() {
  return (
    <Section title="Realtor Evaluation Support">
      <div className="grid gap-4">
        <p className="text-slate-800">Robinson supports Realtors, buyers, and sellers who need well and septic evaluations scheduled during active transactions.</p>
        <p className="text-slate-700">Submit property location, access details, contact roles, and timeline priorities so the team can coordinate scheduling quickly.</p>
        <div className="rounded-md bg-[#f5eded] p-3">
          <Link className="font-semibold underline" href="/realtors">
            Open Realtor Resources
          </Link>
        </div>
      </div>
    </Section>
  );
}
