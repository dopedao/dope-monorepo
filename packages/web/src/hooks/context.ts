import React from 'react';

interface FullScreenProps {
  isFullScreen: boolean;
  setIsFullScreen: (fullScreen: boolean)=>void
}

export const FullScreenContext = React.createContext<FullScreenProps | undefined>(undefined);

export function useFullScreen() {
  return React.useContext(FullScreenContext);
}