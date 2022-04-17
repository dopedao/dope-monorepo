import { number } from "starknet";

export type HustlerActions =
  | { type: 'SET_QUICK_BUY' }
  | { type: 'GO_TO_CUSTOMIZE_STEP' }
  | { type: 'GO_TO_CONFIGURE_STEP' }
  | { type: 'GO_TO_APPROVE_STEP' }
  | { type: 'GO_TO_FINALIZE_STEP' }
  | { type: 'COMPLETE' }
  | { type: 'CLEAR' };

export type HustlerState = {
  currentStep: number;
  isCustomizeDone: boolean;
  isQuickBuy: boolean;
  isApprovalDone: boolean;
  isFinalizeDone: boolean;
};

export type DispatchHustler = (action: HustlerActions) => void;
