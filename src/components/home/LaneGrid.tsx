import { ServiceCard } from "@/components/site/ServiceCard";

export function LaneGrid({ lanes }: { lanes: Array<{ title: string; description: string; href: string }> }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {lanes.map((lane) => (
        <ServiceCard key={lane.title} {...lane} />
      ))}
    </div>
  );
}
