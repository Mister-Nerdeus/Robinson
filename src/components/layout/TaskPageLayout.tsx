import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { REQUEST_LAYOUT_DESKTOP_TOKENS } from "@/config/requestLayoutContract";

export type TaskPageLayoutMode = "supportRail" | "formDominant" | "fullWidthSupport";

type TaskPageLayoutProps = {
  route: string;
  mode: TaskPageLayoutMode;
  primary: ReactNode;
  support?: ReactNode;
  className?: string;
  primaryClassName?: string;
  supportClassName?: string;
};

export function TaskPageLayout({
  route,
  mode,
  primary,
  support,
  className,
  primaryClassName,
  supportClassName,
}: TaskPageLayoutProps) {
  const shouldRenderSupport = mode === "supportRail" && Boolean(support);

  return (
    <div
      className={cn("task-page-layout", className)}
      data-task-page-layout="task-surface"
      data-task-page-route={route}
      data-task-page-layout-mode={mode}
      data-task-page-columns={shouldRenderSupport ? "primary-with-support-rail" : "primary-only"}
      data-task-page-desktop-gutter={REQUEST_LAYOUT_DESKTOP_TOKENS.desktopGutter}
      data-task-page-desktop-rail={REQUEST_LAYOUT_DESKTOP_TOKENS.supportRailMaxWidth}
      data-task-page-desktop-support-band={REQUEST_LAYOUT_DESKTOP_TOKENS.supportBandPrimaryMaxWidth}
      data-task-page-desktop-wizard-shell={REQUEST_LAYOUT_DESKTOP_TOKENS.wizardShellMaxWidth}
      style={
        {
          "--task-page-desktop-gutter": REQUEST_LAYOUT_DESKTOP_TOKENS.desktopGutter,
          "--task-page-support-rail-max": REQUEST_LAYOUT_DESKTOP_TOKENS.supportRailMaxWidth,
          "--task-page-support-band-primary-max":
            REQUEST_LAYOUT_DESKTOP_TOKENS.supportBandPrimaryMaxWidth,
          "--task-page-wizard-shell-max": REQUEST_LAYOUT_DESKTOP_TOKENS.wizardShellMaxWidth,
        } as CSSProperties
      }
    >
      <div className={cn("task-page-primary", primaryClassName)}>{primary}</div>
      {shouldRenderSupport ? <aside className={cn("task-page-support", supportClassName)}>{support}</aside> : null}
    </div>
  );
}
