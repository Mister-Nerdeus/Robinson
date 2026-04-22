import type { Metadata } from "next";
import { Section } from "@/components/site/Section";
import { buildMetadata } from "@/lib/seo/metadata";
import { servicesContent } from "@/content/services";
import { PortableToiletFlow } from "@/components/forms/PortableToiletFlow";
import { TaskPageLayout } from "@/components/layout/TaskPageLayout";

export const metadata: Metadata = buildMetadata(
  "Portable Toilet Rentals",
  "Quote-ready rental workflow with unit count, duration, servicing, and access capture.",
  "/services/portable-toilets",
);

export default function PortableToiletsPage() {
  const portable = servicesContent.portableToilets;

  return (
    <Section title="Portable Toilet Rentals" layout="task">
      <div className="grid gap-5">
        <div className="rounded-2xl border border-[#d8c1c1] bg-[#fff1ef] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">Rental Workflow</p>
          <h2 className="mt-2 font-display text-3xl text-[var(--brand)]">Quote-ready intake for delivery and servicing.</h2>
          <p className="mt-3 text-sm text-slate-700">Capture unit count, duration, jobsite/event type, servicing expectations, and access notes in one request.</p>
        </div>
        <TaskPageLayout
          route="/services/portable-toilets"
          mode="supportRail"
          primary={
            <div className="rounded-xl border border-[#d8c1c1] bg-[#fff8f7] p-4">
              <p className="text-sm text-slate-700">
                Share delivery window, unit count, duration, and access notes before entering the quote step flow.
              </p>
            </div>
          }
          support={
            <div className="grid gap-4">
              <div className="rounded-xl border border-[#d8c1c1] bg-[#fffdfb] p-4">
                <h3 className="font-display text-xl text-[var(--brand)]">What happens next</h3>
                <ul className="mt-2 grid gap-2 text-sm text-slate-700">
                  {portable.bullets.map((item) => <li key={item}>• {item}</li>)}
                </ul>
              </div>
            </div>
          }
        />
        <TaskPageLayout
          route="/services/portable-toilets"
          mode="formDominant"
          primary={<PortableToiletFlow />}
          primaryClassName="task-page-form-shell"
        />
      </div>
    </Section>
  );
}
