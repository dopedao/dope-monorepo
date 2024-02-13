import { useCallback, useMemo } from 'react';
import { useAccount } from 'wagmi';
import { getProof } from 'utils/merkleproof';
import config from 'config'; // Airdrop config

import { useHongbao } from 'hooks/contracts';

const MerkleClaim = () => {
  const hongbao = useHongbao();
  //   const { address: account } = useAccount()

  let account = '0x016C8780e5ccB32E5CAA342a926794cE64d9C364';

  const amount = useMemo(() => config.airdrop[account!].toString(), [account]);
  const claim = useCallback(() => {
    const proof = getProof(account!, amount);
    hongbao.claim(amount, proof);
  }, [hongbao, account, amount]);

  return (
    <>
      {account && account in config.airdrop ? (
        <>
          You can claim {config.airdrop[account!].toString()}
          <button onClick={claim}>Claim</button>
        </>
      ) : (
        'You cant claim'
      )}
    </>
  );
};

export default MerkleClaim;
