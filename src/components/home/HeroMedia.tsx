"use client";

import Image from "next/image";

type HeroMediaProps = {
  src: string;
  alt: string;
};

export function HeroMedia({ src, alt }: HeroMediaProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#d3c0c0] bg-[var(--surface)] shadow-sm">
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={780}
        className="h-[280px] w-full object-cover sm:h-[330px]"
        priority
      />
    </div>
  );
}
