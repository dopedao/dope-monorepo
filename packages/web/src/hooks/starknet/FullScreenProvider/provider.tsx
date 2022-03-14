import React from 'react';
import { useStarknet } from '../StarknetProvider';
import { FullScreenContext } from './context';

interface FullScreenProviderProps {
  children: React.ReactNode;
}

export function FullScreenProvider({ children }: FullScreenProviderProps): JSX.Element {
  const [isFullScreen, setIsFullScreen] = React.useState(false);

  return <FullScreenContext.Provider value={{isFullScreen, setIsFullScreen}} children={children} />;
}
