import { ServiceCard } from "@/components/site/ServiceCard";

export function LaneGrid({ lanes }: { lanes: Array<{ title: string; description: string; href: string }> }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {lanes.map((lane) => (
        <ServiceCard key={lane.title} {...lane} />
      ))}
    </div>
  );
}
