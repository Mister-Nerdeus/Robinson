import { publicLocations } from "@/content/locations";

export function LocationCard() {
  return (
    <section className="rounded-xl border border-[#d8c1c1] bg-white p-4">
      <h3 className="font-display text-xl text-[var(--brand)]">Public Locations</h3>
      <div className="mt-3 grid gap-3">
        {publicLocations
          .filter((location) => location.publicFacing)
          .map((location) => {
            const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${location.streetAddress}, ${location.city}, ${location.state} ${location.postalCode}`,
            )}`;

            return (
              <article key={location.id} className="rounded-lg border border-[#e1d4d4] bg-[#fffdfb] p-3 text-sm">
                <p className="font-semibold">{location.label}</p>
                <p>{location.streetAddress}</p>
                <p>
                  {location.city}, {location.state} {location.postalCode}
                </p>
                <p className="mt-1 text-xs text-slate-600">Publication status: {location.status}</p>
                {location.mapEligible ? (
                  <a
                    className="mt-2 inline-flex min-h-11 items-center rounded-md border border-[var(--brand)] px-3 py-2 text-xs font-semibold text-[var(--brand)]"
                    href={mapsHref}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Directions
                  </a>
                ) : null}
              </article>
            );
          })}
      </div>
    </section>
  );
}
