import { publicBusinessFacts } from "@/content/businessFacts";

export function LocationCard() {
  const primaryAddress = publicBusinessFacts.primaryAddress;
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${primaryAddress.line1}, ${primaryAddress.city}, ${primaryAddress.state} ${primaryAddress.postalCode}`,
  )}`;

  return (
    <section className="rounded-xl border border-[#d8c1c1] bg-white p-4">
      <h3 className="font-display text-xl text-[var(--brand)]">Public Location</h3>
      <div className="mt-3 grid gap-3">
        <article className="rounded-lg border border-[#e1d4d4] bg-[#fffdfb] p-3 text-sm">
          <p className="font-semibold">Pierson Office</p>
          <p>{primaryAddress.line1}</p>
          <p>
            {primaryAddress.city}, {primaryAddress.state} {primaryAddress.postalCode}
          </p>
          <a
            className="mt-2 inline-flex min-h-11 items-center rounded-md border border-[var(--brand)] px-3 py-2 text-xs font-semibold text-[var(--brand)]"
            href={mapsHref}
            target="_blank"
            rel="noreferrer"
          >
            Directions
          </a>
        </article>
      </div>
    </section>
  );
}
