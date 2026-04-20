import Link from "next/link";

type EmptyStateProps = {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
};

export function EmptyState({ title, description, actionHref, actionLabel }: EmptyStateProps) {
  return (
    <section className="rounded-xl border border-[#d8c1c1] bg-[#fff8f7] p-5 text-sm text-slate-700">
      <h2 className="font-display text-2xl text-[var(--brand)]">{title}</h2>
      <p className="mt-2">{description}</p>
      {actionHref && actionLabel ? (
        <Link href={actionHref} className="mt-3 inline-flex min-h-11 items-center rounded-md bg-[var(--brand)] px-4 py-2 font-semibold text-white">
          {actionLabel}
        </Link>
      ) : null}
    </section>
  );
}
