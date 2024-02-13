import { JsonRpcSigner } from 'ethers';
import { useEffect, useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { getEthersSigner } from './ethersProvider';

type S = {
  isLoading: boolean;
  isFetched: boolean;
  data: JsonRpcSigner | null;
};
type P = {
  chainId?: number;
};
const useEthersSigner = ({ chainId: _chainId }: P = {}) => {
  const { address } = useAccount();
  const { chain } = useNetwork();

  const [s, setS] = useState<S>({
    isLoading: false,
  isFetched: false,
    data: null,
  });

  useEffect(() => {
    const getSigner = async () => {
      setS(x => ({ ...x, isLoading: true }));

      const signer = await getEthersSigner({ chainId: _chainId ?? chain?.id });

      setS(x => ({ ...x, isLoading: false, data: signer ?? null, isFetched: !!signer }));
    };

    if (address) {
      getSigner();
    }
  }, [address, _chainId, chain?.id]);

  return s;
};

export default useEthersSigner;
