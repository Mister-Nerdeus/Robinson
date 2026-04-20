import type { ReactNode, RefObject } from "react";

type WizardContainerProps = {
  anchorId: string;
  headingId: string;
  headingRef: RefObject<HTMLHeadingElement | null>;
  title: string;
  helperText: string;
  currentStep: number;
  totalSteps: number;
  callout: ReactNode;
  children: ReactNode;
  desktopActions: ReactNode;
  mobileActions: ReactNode;
};

export function WizardContainer({
  anchorId,
  headingId,
  headingRef,
  title,
  helperText,
  currentStep,
  totalSteps,
  callout,
  children,
  desktopActions,
  mobileActions,
}: WizardContainerProps) {
  return (
    <div id={anchorId} className="wizard-scroll-anchor surface-section grid gap-7 rounded-[var(--radius-section)] border border-[#c8c1b1] bg-[var(--surface)] p-[var(--space-card-pad)] pb-28 sm:p-7 md:pb-7">
      <div className="grid gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--brand)]">
          Step {Math.min(currentStep + 1, totalSteps)} of {totalSteps}
        </p>
        <h3
          id={headingId}
          ref={headingRef}
          tabIndex={-1}
          data-wizard-step-heading
          className="font-display text-2xl text-[var(--brand)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2"
        >
          {title}
        </h3>
        <p className="text-sm text-slate-700">{helperText}</p>
      </div>
      {callout}
      {children}
      {desktopActions}
      {mobileActions}
    </div>
  );
}

type WizardMobileActionsProps = {
  backAction?: ReactNode;
  nextAction?: ReactNode;
};

export function WizardMobileActions({ backAction, nextAction }: WizardMobileActionsProps) {
  return (
    <div className="wizard-mobile-actions md:hidden">
      <div className="container container-task">
        <div className="rounded-xl border border-[#ddcfbf] bg-[#fffdf9] p-3 shadow-[0_-2px_18px_rgba(0,0,0,0.1)]">
          <div className="grid grid-cols-2 gap-2">
            {backAction ?? <div />}
            {nextAction ?? <div />}
          </div>
        </div>
      </div>
    </div>
  );
}
