import Link from "next/link";

type CommercialLane = {
  id: string;
  title: string;
  summary: string;
  href: string;
  ctaLabel: string;
};

const lanes: CommercialLane[] = [
  {
    id: "grease-trap",
    title: "Grease Trap Cleaning",
    summary: "Restaurant and facility grease trap cleaning with access-hour coordination.",
    href: "/services/commercial?work=grease-trap",
    ctaLabel: "Request Grease Trap Service",
  },
  {
    id: "lift-pump",
    title: "Lift Pump Service",
    summary: "Lift pump troubleshooting, service, and replacement routing.",
    href: "/services/commercial?work=lift-pump",
    ctaLabel: "Request Lift Pump Support",
  },
  {
    id: "commercial-septic",
    title: "Commercial Septic Service",
    summary: "General commercial septic pumping and facility support.",
    href: "/services/commercial?work=septic-pumping",
    ctaLabel: "Request Commercial Septic Service",
  },
  {
    id: "commercial-catch-all",
    title: "Not Sure Yet?",
    summary: "Use the catch-all commercial troubleshooting path when the exact system issue is still unclear.",
    href: "/services/commercial?work=catch-all",
    ctaLabel: "Open Commercial Troubleshooting",
  },
];

export function CommercialSupportGrid() {
  return (
    <section className="grid gap-3 md:grid-cols-2">
      {lanes.map((lane) => (
        <article key={lane.id} className="rounded-xl border border-[#d8c1c1] bg-[#fffdfb] p-4">
          <h3 className="font-display text-xl text-[var(--brand)]">{lane.title}</h3>
          <p className="mt-2 text-sm text-slate-700">{lane.summary}</p>
          <Link href={lane.href} className="mt-3 inline-flex min-h-11 items-center rounded-md bg-[var(--brand)] px-3 py-2 text-xs font-semibold text-white">
            {lane.ctaLabel}
          </Link>
        </article>
      ))}
    </section>
  );
}
