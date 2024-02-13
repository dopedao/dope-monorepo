import { createContext, ReactNode, Reducer, useReducer } from 'react';
import HustlerReducer, { INITIAL_STATE } from 'features/hustlers/hustlerReducer';
import type { DispatchHustler, HustlerState, HustlerActions } from 'features/hustlers/types';

type HustlerProviderProps = {
  children: ReactNode;
  initialHustlerData?: HustlerState;
};

export const HustlerContext = createContext<HustlerState | undefined>(undefined);
export const HustlerDispatchContext = createContext<DispatchHustler | undefined>(undefined);

const HustlerProvider = ({ children, initialHustlerData }: HustlerProviderProps) => {
  const [hustler, dispatchHustler] = useReducer<Reducer<HustlerState, HustlerActions>>(
    HustlerReducer,
    initialHustlerData || INITIAL_STATE,
  );
  return (
    <HustlerContext.Provider value={hustler}>
      <HustlerDispatchContext.Provider value={dispatchHustler}>
        {children}
      </HustlerDispatchContext.Provider>
    </HustlerContext.Provider>
  );
};

export default HustlerProvider;
