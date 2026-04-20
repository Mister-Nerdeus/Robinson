import Link from "next/link";

export function CtaBand({ heading, href, label }: { heading: string; href: string; label: string }) {
  return (
    <div className="rounded-2xl border border-[#d4abab] bg-gradient-to-r from-[#fff1ef] to-[#f8ddd6] p-5 shadow-sm">
      <p className="font-display text-2xl text-[var(--brand)]">{heading}</p>
      <Link href={href} className="mt-3 inline-flex min-h-11 items-center rounded-md bg-[var(--brand)] px-4 py-3 font-semibold text-white">
        {label}
      </Link>
    </div>
  );
}
