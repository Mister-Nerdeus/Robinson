import { useMemo, useState } from "react";

type UseWizardOptions = {
  totalSteps: number;
  initialStep?: number;
};

export function useWizard({ totalSteps, initialStep = 0 }: UseWizardOptions) {
  const maxStepIndex = Math.max(0, totalSteps - 1);
  const [currentStep, setCurrentStep] = useState(() => Math.min(Math.max(initialStep, 0), maxStepIndex));

  const boundedStep = Math.min(Math.max(currentStep, 0), maxStepIndex);
  const isFirstStep = boundedStep === 0;
  const isLastStep = boundedStep === maxStepIndex;

  const controls = useMemo(
    () => ({
      goToStep: (step: number) => setCurrentStep(Math.min(Math.max(step, 0), maxStepIndex)),
      goNext: () => setCurrentStep((step) => Math.min(step + 1, maxStepIndex)),
      goBack: () => setCurrentStep((step) => Math.max(step - 1, 0)),
    }),
    [maxStepIndex],
  );

  return {
    currentStep: boundedStep,
    setCurrentStep,
    isFirstStep,
    isLastStep,
    maxStepIndex,
    ...controls,
  };
}
