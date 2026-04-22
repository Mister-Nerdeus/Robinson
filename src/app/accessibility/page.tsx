import type { Metadata } from "next";
import { Section } from "@/components/site/Section";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata("Accessibility", "Accessibility commitment and request support.", "/accessibility");

export default function AccessibilityPage() {
  return (
    <Section title="Accessibility" layout="marketing">
      <div className="grid gap-3 text-sm text-slate-700">
        <p>Robinson aims to keep routing, forms, and recovery states keyboard-usable and readable on mobile and desktop.</p>
        <p>If you encounter an accessibility issue, call the office so support can route your request directly.</p>
      </div>
    </Section>
  );
}
