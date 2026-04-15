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
          className="rounded-2xl border border-[#ebe4df] bg-[var(--surface)] px-5 py-4 shadow-sm"
        >
          <h3 className="text-[1.34rem] font-semibold leading-tight text-slate-900 sm:text-[1.45rem]">{item.question}</h3>
          <p className="mt-2.5 text-[0.98rem] leading-7 text-slate-700">{item.answer}</p>
        </article>
      ))}
    </div>
  );
}