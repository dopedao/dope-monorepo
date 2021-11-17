export type HustlerActions = { type: 'GO_TO_STEP'; currentStep: number } | { type: 'CLEAR' };

export type HustlerState = {
  currentStep: number;
};

export type DispatchHustler = (action: HustlerActions) => void;
