import { FallbackProvider, JsonRpcProvider } from 'ethers';
import { useRef } from 'react';
import { getEthersProvider, Web3Provider } from './ethersProvider';

// Custom useProvider hook
type S = Web3Provider;
type P = {
  chainId?: number;
};

const useEthersProvider = ({ chainId }: P = {}) =>
  useRef<S>(getEthersProvider({ chainId })).current;

export default useEthersProvider;
