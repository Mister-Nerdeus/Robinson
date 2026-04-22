import { publicBusinessFacts } from "@/content/businessFacts";

export function ContactHero() {
  return (
    <section className="rounded-2xl border border-[#d8c1c1] bg-[#fff1ef] p-5 text-slate-900">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
        Contact Command Center
      </p>
      <h1 className="mt-2 font-display text-3xl text-[var(--brand)]">
        Route to the right service lane in one step.
      </h1>
      <p className="mt-3 text-sm sm:text-base">
        For urgent septic emergencies, call now. For routine pumping, evaluations, rentals, and commercial support,
        use the lane router below.
      </p>
      <p className="mt-2 text-sm text-slate-700">
        Primary dispatch line: <strong>{publicBusinessFacts.phoneSemantics.primaryServiceLine.number}</strong>
      </p>
    </section>
  );
}

