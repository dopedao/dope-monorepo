import { useContext } from 'react';
import { HustlerContext } from 'features/hustlers/HustlerProvider';

const useHustler = () => {
  const context = useContext(HustlerContext);

  if (context === undefined) {
    throw new Error('useHustler must be used within a HustlerProvider');
  }

  return context;
};

export default useHustler;
