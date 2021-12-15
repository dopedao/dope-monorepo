export type HustlerActions =
  | { type: 'GO_TO_CUSTOMIZE_STEP' }
  | { type: 'GO_TO_CONFIGURE_STEP' }
  | { type: 'GO_TO_APPROVE_STEP' }
  | { type: 'GO_TO_FINALIZE_STEP' }
  | { type: 'COMPLETE' }
  | { type: 'CLEAR' };

export type HustlerState = {
  currentStep: number;
  isCustomizeDone: boolean;
  isApprovalDone: boolean;
  isFinalizeDone: boolean;
};

export type DispatchHustler = (action: HustlerActions) => void;
