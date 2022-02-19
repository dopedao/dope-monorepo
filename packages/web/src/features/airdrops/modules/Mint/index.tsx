import { useCallback, useState } from 'react';
import { useWeb3React } from '@web3-react/core';

import { useHongbao } from 'hooks/contracts';

const Mint = () => {
  const [value, setValue] = useState(0);
  const hongbao = useHongbao();
  const { account } = useWeb3React();

  const mint = useCallback(() => {
    hongbao.mint({ value });
  }, [hongbao, value]);

  return <>{account && <button onClick={mint}>Mint</button>}</>;
};

export default Mint;
