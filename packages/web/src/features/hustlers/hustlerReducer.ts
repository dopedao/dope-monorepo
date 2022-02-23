import type { HustlerState, HustlerActions } from 'features/hustlers/types';

export const INITIAL_STATE: HustlerState = {
  currentStep: 0,
  isQuickBuy: false,
  isCustomizeDone: false,
  isApprovalDone: false,
  isFinalizeDone: false,
};

const HustlerReducer = (hustler: typeof INITIAL_STATE, action: HustlerActions): HustlerState => {
  switch (action.type) {
    case 'SET_QUICK_BUY':
      return {
        ...hustler,
        isQuickBuy: true,
      };
    case 'GO_TO_CUSTOMIZE_STEP':
      return {
        ...hustler,
        currentStep: 0,
      };
    case 'GO_TO_APPROVE_STEP':
      return {
        ...hustler,
        currentStep: 1,
        isCustomizeDone: true,
      };
    case 'GO_TO_FINALIZE_STEP':
      return {
        ...hustler,
        currentStep: 2,
        isCustomizeDone: true,
        isApprovalDone: true,
      };
    case 'COMPLETE':
      return {
        ...hustler,
        currentStep: 3,
        isCustomizeDone: true,
        isApprovalDone: true,
        isFinalizeDone: true,
      };
    case 'CLEAR':
      return INITIAL_STATE;
    default:
      throw new Error();
  }
};

export default HustlerReducer;
