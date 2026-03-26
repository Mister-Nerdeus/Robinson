export function TrustBand({ points }: { points: string[] }) {
  return (
    <div className="rounded-xl border border-[#c5d3bd] bg-[#e7efdf] p-5">
      <h3 className="font-display text-2xl text-[var(--brand)]">Local proof customers can trust</h3>
      <ul className="mt-3 list-disc pl-6">
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </div>
  );
}
