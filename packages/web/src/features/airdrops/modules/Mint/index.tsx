import { useCallback, useState } from 'react';
import { useAccount } from 'wagmi';

import { useHongbao } from 'hooks/contracts';

const Mint = () => {
  const [value, setValue] = useState(0);
  const hongbao = useHongbao();
  const { address: account } = useAccount();

  const mint = useCallback(() => {
    hongbao.mint({ value });
  }, [hongbao, value]);

  return <>{account && <button onClick={mint}>Mint</button>}</>;
};

export default Mint;
