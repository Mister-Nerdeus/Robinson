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
      <div className="grid md:h-[500px] md:grid-cols-[1.08fr,0.92fr]">
        <div className="relative h-[280px] bg-[#ede3df] sm:h-[340px] md:h-[500px]">
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/5 to-transparent" />
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-between gap-5 p-5 sm:p-6 md:h-[500px] md:p-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--brand)] sm:text-xs">
              {slides[index].eyebrow ?? "Field-ready local service"}
            </p>

            <h2 className="mt-3 max-w-[15ch] font-display text-[1.6rem] leading-[1.03] text-[var(--brand)] sm:text-[1.9rem] md:text-[2.45rem]">
              {slides[index].title}
            </h2>

            <p className="mt-4 max-w-[31rem] text-[0.98rem] leading-7 text-slate-800 md:text-[1rem] md:leading-8">
              {slides[index].description}
            </p>
          </div>

          <div>
            <div>
              {slides[index].href && slides[index].hrefLabel ? (
                <Link
                  href={slides[index].href!}
                  className="inline-flex items-center rounded-md border border-[var(--brand)] px-5 py-3 text-sm font-semibold text-[var(--brand)] transition hover:bg-[#fff3f2] sm:text-base"
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
