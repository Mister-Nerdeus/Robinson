import Link from "next/link";

export function Hero({ heading, subheading, ctaHref, ctaLabel }: { heading: string; subheading: string; ctaHref: string; ctaLabel: string }) {
  return (
    <section className="section-pad">
      <div className="container rounded-2xl border border-[#b9b09d] bg-[var(--surface)] p-8 shadow-sm">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">Local v1 Lead Shell</p>
        <h1 className="font-display text-4xl leading-tight text-[var(--brand)] md:text-5xl">{heading}</h1>
        <p className="mt-4 max-w-2xl text-lg">{subheading}</p>
        <Link href={ctaHref} className="mt-6 inline-block rounded-md bg-[var(--brand-accent)] px-5 py-3 font-semibold text-[#1a140d]">
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
