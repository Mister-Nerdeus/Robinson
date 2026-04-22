import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { REQUEST_LAYOUT_DESKTOP_TOKENS } from "@/config/requestLayoutContract";

export type TaskPageLayoutMode = "support-rail" | "full-width";

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
  const shouldRenderSupport = mode === "support-rail" && Boolean(support);

  return (
    <div
      className={cn("task-page-layout", className)}
      data-task-page-layout="task-surface"
      data-task-page-route={route}
      data-task-page-layout-mode={mode}
      data-task-page-columns={shouldRenderSupport ? "primary-with-support-rail" : "primary-only"}
      data-task-page-desktop-gutter={REQUEST_LAYOUT_DESKTOP_TOKENS.desktopGutter}
      data-task-page-desktop-rail={REQUEST_LAYOUT_DESKTOP_TOKENS.supportRailMaxWidth}
      data-task-page-desktop-form-shell={REQUEST_LAYOUT_DESKTOP_TOKENS.formShellMaxWidth}
      style={
        {
          "--task-page-desktop-gutter": REQUEST_LAYOUT_DESKTOP_TOKENS.desktopGutter,
          "--task-page-support-rail-max": REQUEST_LAYOUT_DESKTOP_TOKENS.supportRailMaxWidth,
          "--task-page-form-shell-max": REQUEST_LAYOUT_DESKTOP_TOKENS.formShellMaxWidth,
        } as CSSProperties
      }
    >
      <div className={cn("task-page-primary", primaryClassName)}>{primary}</div>
      {shouldRenderSupport ? <aside className={cn("task-page-support", supportClassName)}>{support}</aside> : null}
    </div>
  );
}
