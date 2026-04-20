import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type WizardActionsProps = {
  backAction?: ReactNode;
  nextAction?: ReactNode;
  className?: string;
};

export function WizardActions({ backAction, nextAction, className }: WizardActionsProps) {
  return (
    <div className={cn("hidden flex-wrap gap-3 md:flex", className)}>
      {backAction}
      {nextAction}
    </div>
  );
}
