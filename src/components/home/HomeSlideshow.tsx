"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Slide = {
  src: string;
  alt: string;
  eyebrow?: string;
  title: string;
  description: string;
  href?: string;
  hrefLabel?: string;
};

export function HomeSlideshow({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="overflow-hidden rounded-[2rem] border border-[#d3c0c0] bg-[var(--surface)] shadow-sm">
      <div className="grid md:h-[520px] md:grid-cols-[1.08fr,0.92fr]">
        <div className="relative h-[300px] bg-[#ede3df] sm:h-[360px] md:h-[520px]">
          {slides.map((slide, slideIndex) => (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-opacity duration-700 ${
                slideIndex === index ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(max-width: 768px) 100vw, 56vw"
                className="object-cover"
                priority={slideIndex === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
            </div>
          ))}
        </div>

        <div className="flex h-[420px] flex-col justify-between gap-5 p-5 sm:h-[430px] sm:p-6 md:h-[520px] md:p-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--brand)] sm:text-xs">
              {slides[index].eyebrow ?? "Field-ready local service"}
            </p>

            <h2 className="mt-3 max-w-[11ch] font-display text-[2.65rem] leading-[0.92] text-[var(--brand)] sm:text-[3rem] md:text-[3.4rem]">
              {slides[index].title}
            </h2>

            <p className="mt-5 max-w-[30rem] text-base leading-8 text-slate-800 md:text-[1.02rem]">
              {slides[index].description}
            </p>
          </div>

          <div>
            <div className="min-h-[3.5rem]">
              {slides[index].href && slides[index].hrefLabel ? (
                <Link
                  href={slides[index].href!}
                  className="inline-flex items-center rounded-md border border-[var(--brand)] px-5 py-3 font-semibold text-[var(--brand)] transition hover:bg-[#fff3f2]"
                >
                  {slides[index].hrefLabel}
                </Link>
              ) : null}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {slides.map((slide, slideIndex) => (
                <button
                  key={slide.title}
                  type="button"
                  onClick={() => setIndex(slideIndex)}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                    slideIndex === index
                      ? "border-[var(--brand)] bg-[var(--brand)] text-white"
                      : "border-[#d5c6c2] bg-white text-slate-700 hover:border-[var(--brand)] hover:text-[var(--brand)]"
                  }`}
                  aria-label={`Show slide ${slideIndex + 1}: ${slide.title}`}
                >
                  {slideIndex + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
