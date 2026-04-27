import type { HomeLaneCard } from "@/content/home";
import { LaneTaskCard } from "@/components/home/LaneTaskCard";

export function LaneGrid({ lanes }: { lanes: HomeLaneCard[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {lanes.map((lane) => (
        <div key={lane.id} className={lane.emphasis === "high" ? "md:col-span-2 xl:col-span-2" : "xl:col-span-1"}>
          <LaneTaskCard lane={lane} />
        </div>
      ))}
    </div>
  );
}
