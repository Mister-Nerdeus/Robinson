import { serviceAreaContent } from "@/content/serviceArea";

export function ServiceAreaBlock() {
  return (
    <section className="rounded-xl border border-[#c8c1b1] bg-[var(--surface)] p-4">
      <h3 className="font-display text-2xl text-[var(--brand)]">Service Area</h3>
      <p className="mt-2">{serviceAreaContent.summary}</p>
      <p className="mt-2 text-sm font-semibold">Core areas: {serviceAreaContent.coreAreas.join(", ")}</p>
      <p className="mt-1 text-sm">{serviceAreaContent.expansionNote}</p>
    </section>
  );
}
