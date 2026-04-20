import { cn } from "@/lib/utils";

type SectionProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  layout?: "marketing" | "task";
};

export function Section({ title, children, className, containerClassName, layout = "marketing" }: SectionProps) {
  return (
    <section className={cn("section-pad", className)}>
      <div className={cn("container", layout === "task" ? "container-task" : "container-marketing", containerClassName)}>
        {title ? <h2 className="mb-4 font-display text-3xl text-[var(--brand)]">{title}</h2> : null}
        {children}
      </div>
    </section>
  );
}
