import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TaskPageLayoutProps = {
  route: string;
  primary: ReactNode;
  support?: ReactNode;
  className?: string;
};

export function TaskPageLayout({ route, primary, support, className }: TaskPageLayoutProps) {
  return (
    <div
      className={cn("task-page-layout", className)}
      data-task-page-layout="task-surface"
      data-task-page-route={route}
      data-task-page-columns={support ? "primary-with-support-rail" : "primary-only"}
    >
      <div className="task-page-primary">{primary}</div>
      {support ? <aside className="task-page-support">{support}</aside> : null}
    </div>
  );
}
