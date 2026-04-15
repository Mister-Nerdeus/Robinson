export function TrustBand({ points }: { points: string[] }) {
  return (
    <div className="rounded-xl border border-[#c5d3bd] bg-[linear-gradient(145deg,#edf4e7,#e2edd8)] p-5">
      <h3 className="font-display text-[1.75rem] leading-tight text-[var(--brand)]">Local proof customers can trust</h3>
      <ul className="mt-3 grid gap-1.5 pl-5 text-sm text-slate-800">
        {points.map((point) => (
          <li key={point} className="list-disc">
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}