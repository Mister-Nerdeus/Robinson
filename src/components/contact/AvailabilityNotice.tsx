import { company } from "@/config/company";

export function AvailabilityNotice() {
  return (
    <section className="rounded-xl border border-[#dccfc2] bg-[#fffaf3] p-4 text-sm text-slate-800">
      <h3 className="font-display text-xl text-[var(--brand)]">Availability and Follow-up</h3>
      <ul className="mt-2 grid gap-1.5">
        <li>Emergency septic: call {company.primaryPhone} any time for fastest dispatch triage.</li>
        <li>Routine scheduling: submit lane requests online and Robinson follows up for scheduling confirmation.</li>
        <li>Office line behavior: if field teams are active, leave full callback details and route context.</li>
        <li>Form follow-up: lane submissions are reviewed with urgency-based callback priority.</li>
      </ul>
    </section>
  );
}
