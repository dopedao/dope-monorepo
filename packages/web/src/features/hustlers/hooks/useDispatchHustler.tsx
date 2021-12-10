import { useContext } from 'react';
import { HustlerDispatchContext } from 'features/hustlers/HustlerProvider';

const useDispatchHustler = () => {
  const context = useContext(HustlerDispatchContext);

  if (context === undefined) {
    throw new Error('useDispatchHustler must be used within a HustlerProvider');
  }

  return context;
};

export default useDispatchHustler;
