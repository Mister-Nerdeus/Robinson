import type { Metadata } from "next";
import { Section } from "@/components/site/Section";
import { privacyContent } from "@/content/privacy";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata(
  privacyContent.title,
  "How Robinson handles contact and service-intake form details.",
  "/privacy",
);

export default function PrivacyPage() {
  return (
    <Section title={privacyContent.title}>
      <div className="grid gap-5">
        <p className="text-slate-800">{privacyContent.intro}</p>
        <div className="grid gap-4">
          {privacyContent.sections.map((section) => (
            <article key={section.heading} className="rounded-xl border border-[#d8c1c1] bg-[var(--surface)] p-4">
              <h2 className="font-display text-2xl text-[var(--brand)]">{section.heading}</h2>
              <p className="mt-2 text-slate-800">{section.body}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
