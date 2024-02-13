import React, { useEffect, useState } from 'react';
import { useChainId } from 'wagmi';

// Create a context with an initial value of undefined
export const ChainIdContext = React.createContext<number | undefined>(undefined);

const ChainIdProvider: React.FC = ({ children }) => {
  const chainId = useChainId();

  return <ChainIdContext.Provider value={chainId}>{children}</ChainIdContext.Provider>;
};

export default ChainIdProvider;
