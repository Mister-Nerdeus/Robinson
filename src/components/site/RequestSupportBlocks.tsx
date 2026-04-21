type RequestSupportBlocksProps = {
  reasons: string[];
  whatToHaveReady: string[];
  nextSteps: string[];
  responseExpectation: string;
  noteTitle?: string;
  noteBody?: string;
  variant?: "full" | "compact";
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
  variant = "full",
}: RequestSupportBlocksProps) {
  const compactReasons = reasons.slice(0, 3);
  const compactReady = whatToHaveReady.slice(0, 3);
  const compactNextSteps = nextSteps.slice(0, 2);

  return (
    <div className="grid gap-4">
      <div className={`grid gap-4 ${variant === "compact" ? "" : "sm:grid-cols-2"}`}>
        <div className="rounded-2xl border border-[#d8c1c1] bg-[var(--surface)] p-4">
          <h3 className="font-display text-xl text-[var(--brand)]">Common reasons</h3>
          <BulletList items={variant === "compact" ? compactReasons : reasons} />
        </div>
        <div className="rounded-2xl border border-[#d8c1c1] bg-[var(--surface)] p-4">
          <h3 className="font-display text-xl text-[var(--brand)]">What to have ready</h3>
          <BulletList items={variant === "compact" ? compactReady : whatToHaveReady} />
        </div>
      </div>

      <div className="rounded-2xl border border-[#d8c1c1] bg-[#fffdfb] p-4">
        <h3 className="font-display text-xl text-[var(--brand)]">What happens next</h3>
        <BulletList items={variant === "compact" ? compactNextSteps : nextSteps} />
        <p className="mt-3 text-sm text-slate-700">{responseExpectation}</p>
      </div>

      {variant === "compact" ? (
        <details className="rounded-2xl border border-[#e2d0c9] bg-[#fffaf6] p-4">
          <summary className="cursor-pointer list-none font-semibold text-[var(--brand)]">
            More preparation detail
          </summary>
          <div className="mt-3 grid gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">Additional reasons</p>
              <BulletList items={reasons.slice(compactReasons.length)} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Additional items to have ready</p>
              <BulletList items={whatToHaveReady.slice(compactReady.length)} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Full next steps</p>
              <BulletList items={nextSteps.slice(compactNextSteps.length)} />
            </div>
          </div>
        </details>
      ) : null}

      {noteTitle && noteBody ? (
        <div className="rounded-2xl border border-[#e2d0c9] bg-[#fffaf6] p-4">
          <h3 className="font-display text-xl text-[var(--brand)]">{noteTitle}</h3>
          <p className="mt-2 text-sm text-slate-700">{noteBody}</p>
        </div>
      ) : null}
    </div>
  );
}
