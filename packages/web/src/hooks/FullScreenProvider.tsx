import React from 'react';

interface FullScreenProps {
  isFullScreen: boolean;
  setIsFullScreen: (fullScreen: boolean) => void;
}

export const FullScreenContext = React.createContext<FullScreenProps | undefined>(undefined);

export function useFullScreen() {
  return React.useContext(FullScreenContext);
}

interface FullScreenProviderProps {
  children: React.ReactNode;
}

export function FullScreenProvider({ children }: FullScreenProviderProps): JSX.Element {
  const [isFullScreen, setIsFullScreen] = React.useState(false);

  return (
    <FullScreenContext.Provider value={{ isFullScreen, setIsFullScreen }}>
      {children}
    </FullScreenContext.Provider>
  );
}
