export function FaqPreview({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li key={item} className="rounded-xl border border-[#ebe4df] bg-[var(--surface)] px-4 py-4 text-lg text-slate-900 shadow-sm">
          {item}
        </li>
      ))}
    </ul>
  );
}
