import Link from "next/link";

type HeroProps = {
  eyebrow?: string;
  heading: string;
  subheading: string;
  ctaHref: string;
  ctaLabel: string;
  secondaryCtaHref?: string;
  secondaryCtaLabel?: string;
};

export function Hero({ eyebrow, heading, subheading, ctaHref, ctaLabel, secondaryCtaHref, secondaryCtaLabel }: HeroProps) {
  return (
    <section className="section-pad">
      <div className="container rounded-3xl border border-[#cdb3b3] bg-[var(--surface)] p-8 shadow-sm md:p-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">{eyebrow ?? "Robinson Septic Cleaning"}</p>
        <h1 className="font-display text-4xl leading-tight text-[var(--brand)] md:text-5xl">{heading}</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-800">{subheading}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={ctaHref} className="inline-block rounded-md bg-[var(--brand)] px-5 py-3 font-semibold text-white">
            {ctaLabel}
          </Link>
          {secondaryCtaHref && secondaryCtaLabel ? (
            <Link href={secondaryCtaHref} className="inline-block rounded-md border border-[var(--brand)] px-5 py-3 font-semibold text-[var(--brand)]">
              {secondaryCtaLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
