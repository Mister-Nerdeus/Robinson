type RequestSupportBlocksProps = {
  reasons: string[];
  whatToHaveReady: string[];
  nextSteps: string[];
  responseExpectation: string;
  noteTitle?: string;
  noteBody?: string;
};

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 grid gap-2 text-sm text-slate-700">
      {items.map((item) => (
        <li key={item}>• {item}</li>
      ))}
    </ul>
  );
}

export function RequestSupportBlocks({
  reasons,
  whatToHaveReady,
  nextSteps,
  responseExpectation,
  noteTitle,
  noteBody,
}: RequestSupportBlocksProps) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#d8c1c1] bg-[var(--surface)] p-5">
          <h3 className="font-display text-2xl text-[var(--brand)]">Common reasons to request</h3>
          <BulletList items={reasons} />
        </div>
        <div className="rounded-2xl border border-[#d8c1c1] bg-[var(--surface)] p-5">
          <h3 className="font-display text-2xl text-[var(--brand)]">What to have ready</h3>
          <BulletList items={whatToHaveReady} />
        </div>
      </div>

      <div className="rounded-2xl border border-[#d8c1c1] bg-[#fffdfb] p-4">
        <h3 className="font-display text-2xl text-[var(--brand)]">What happens next</h3>
        <BulletList items={nextSteps} />
        <p className="mt-3 text-sm text-slate-700">{responseExpectation}</p>
      </div>

      {noteTitle && noteBody ? (
        <div className="rounded-2xl border border-[#e2d0c9] bg-[#fffaf6] p-4">
          <h3 className="font-display text-xl text-[var(--brand)]">{noteTitle}</h3>
          <p className="mt-2 text-sm text-slate-700">{noteBody}</p>
        </div>
      ) : null}
    </div>
  );
}
