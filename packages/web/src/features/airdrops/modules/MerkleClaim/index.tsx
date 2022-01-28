import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { css } from '@emotion/react';
import { CloseButton } from '@chakra-ui/close-button';
import { useSwitchOptimism } from 'hooks/web3';
import StickyNote from 'components/StickyNote';
import { getProof } from 'utils/merkleproof';
import config from 'config'; // Airdrop config

const MerkleClaim = () => {
  const [showNetworkAlert, setShowNetworkAlert] = useState(false);
  const { /*account,*/ chainId } = useWeb3React();

  let account = '0x016C8780e5ccB32E5CAA342a926794cE64d9C364';

  useSwitchOptimism(chainId, account);

  useEffect(() => {
    const localNetworkAlert = localStorage.getItem('networkAlertAirdropClaim');

    if (localNetworkAlert !== 'true') {
      setShowNetworkAlert(true);
    }
  }, []);

  const handleCloseAlert = () => {
    window.localStorage.setItem('networkAlertAirdropClaim', 'false');
    setShowNetworkAlert(false);
  };

  return (
    <>
      {account && chainId !== 10 && chainId !== 69 && showNetworkAlert && (
        <StickyNote>
          <div
            css={css`
              display: flex;
              align-items: center;
            `}
          >
            <p
              css={css`
                margin-right: 10px;
                padding-bottom: unset;
              `}
            >
              You should switch to Optimism to claim your airdrop.
            </p>{' '}
            <CloseButton onClick={handleCloseAlert} />
          </div>
        </StickyNote>
      )}
      {account && account in config.airdrop ? (
        <>
          You can claim {config.airdrop[account!].toString()}
          <button
            onClick={() => {
              console.log(getProof(account!, config.airdrop[account!].toString()));
            }}
          >
            Claim
          </button>
        </>
      ) : (
        'You cant claim'
      )}
    </>
  );
};

export default MerkleClaim;
