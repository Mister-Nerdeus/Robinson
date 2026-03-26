import { cn } from "@/lib/utils";

export function Section({ title, children, className }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("section-pad", className)}>
      <div className="container">
        {title ? <h2 className="mb-4 font-display text-3xl text-[var(--brand)]">{title}</h2> : null}
        {children}
      </div>
    </section>
  );
}
