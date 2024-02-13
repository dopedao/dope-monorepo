import React from 'react';
import { Position } from 'components/DesktopWindow';

interface FullScreenProps {
  isFullScreen: boolean;
  setIsFullScreen: (fullScreen: boolean) => void;
  windowPosition?: Position;
  setWindowPosition?: (position: Position) => void;
}

export const FullScreenContext = React.createContext<FullScreenProps | undefined>(undefined);

export function useFullScreen() {
  return React.useContext(FullScreenContext);
}

interface Props {
  children: React.ReactNode;
}

export function FullScreenProvider({ children }: Props) {
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const [windowPosition, setWindowPosition] = React.useState<Position>();

  return (
    <FullScreenContext.Provider
      value={{ isFullScreen, setIsFullScreen, windowPosition, setWindowPosition }}
    >
      {children}
    </FullScreenContext.Provider>
  );
}
