import { css } from '@emotion/react';
import { useCallback } from 'react';
import { Button } from '@chakra-ui/button';
import { useRouter } from 'next/router';
import ConnectWalletSVG from 'ui/svg/ConnectWallet';
import Dialog from 'components/Dialog';
import Head from './Head';
import useWeb3Provider from 'hooks/web3';

const ConnectWallet = () => {
  const { connect } = useWeb3Provider();
  const router = useRouter();

  const onClick = useCallback(
    async (w: 'MetaMask' | 'WalletConnect') => {
      try {
        await connect(w);
      } catch (error) {
        console.error(error);
      }
    },
    [connect],
  );

  return (
    <>
      <Head title="Connect your ETH wallet" />
      <Dialog>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 25px;
            svg {
              width: 140px;
              height: 140px;
            }
          `}
        >
          <ConnectWalletSVG />
          <h4>Connect Your Ethereum Wallet</h4>
          <div
            css={css`
              width: 100%;
              display: flex;
              flex-direction: column;
              gap: 16px;
            `}
          >
            <Button onClick={() => onClick('MetaMask')}>MetaMask</Button>
            <Button onClick={() => onClick('WalletConnect')} autoFocus>WalletConnect</Button>
            <Button onClick={() => router.back()} backgroundColor="black" color="white">Go Back</Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ConnectWallet;
