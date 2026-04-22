import { publicBusinessFacts } from "@/content/businessFacts";

export function AvailabilityNotice() {
  const emergencyLine = publicBusinessFacts.phoneSemantics.emergencyLine.number;
  const primaryLine = publicBusinessFacts.phoneSemantics.primaryServiceLine.number;
  const secondaryLine = publicBusinessFacts.phoneSemantics.secondaryOfficeLine.number;

  return (
    <section className="rounded-xl border border-[#dccfc2] bg-[#fffaf3] p-4 text-sm text-slate-800">
      <h3 className="font-display text-xl text-[var(--brand)]">Availability and Follow-up</h3>
      <ul className="mt-2 grid gap-1.5">
        <li>Emergency septic: call {emergencyLine} first for fastest dispatch triage.</li>
        <li>Primary service scheduling: use {primaryLine} or submit lane requests online for callback planning.</li>
        <li>Secondary office line ({secondaryLine}) is for office follow-up and non-dispatch support.</li>
        <li>Form submissions are reviewed with urgency-based callback priority.</li>
      </ul>
    </section>
  );
}
