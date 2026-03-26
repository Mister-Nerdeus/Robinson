import Link from "next/link";

export function CtaBand({ heading, href, label }: { heading: string; href: string; label: string }) {
  return (
    <div className="rounded-xl border border-[#d8a662] bg-[#f4d6ad] p-5">
      <p className="font-display text-2xl text-[#44290f]">{heading}</p>
      <Link href={href} className="mt-3 inline-block rounded-md bg-[#5a3310] px-4 py-2 font-semibold text-white">
        {label}
      </Link>
    </div>
  );
}
