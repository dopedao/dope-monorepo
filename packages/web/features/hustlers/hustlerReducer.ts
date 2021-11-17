import type { HustlerState, HustlerActions } from 'features/hustlers/types';

export const INITIAL_STATE: HustlerState = {
  currentStep: 0,
};

const HustlerReducer = (hustler: typeof INITIAL_STATE, action: HustlerActions): HustlerState => {
  switch (action.type) {
    case 'GO_TO_STEP':
      return {
        ...hustler,
        currentStep: action.currentStep,
      };
    case 'CLEAR':
      return INITIAL_STATE;
    default:
      throw new Error();
  }
};

export default HustlerReducer;
