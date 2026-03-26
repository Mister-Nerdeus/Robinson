export function FaqPreview({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2">
      {items.map((item) => (
        <li key={item} className="rounded-md bg-[var(--surface)] p-3">
          {item}
        </li>
      ))}
    </ul>
  );
}
