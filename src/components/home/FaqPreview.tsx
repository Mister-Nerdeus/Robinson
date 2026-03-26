type FaqPreviewItem = {
  question: string;
  answer: string;
};

export function FaqPreview({ items }: { items: FaqPreviewItem[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <article
          key={item.question}
          className="rounded-2xl border border-[#ebe4df] bg-[var(--surface)] px-5 py-5 shadow-sm"
        >
          <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">{item.question}</h3>
          <p className="mt-3 text-base leading-7 text-slate-700">{item.answer}</p>
        </article>
      ))}
    </div>
  );
}
