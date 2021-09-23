import { css } from '@emotion/react';
import { media } from '../styles/mixins';
import { useCallback } from 'react';
import ConnectWalletSVG from '../svg/ConnectWallet';
import Dialog from '../components/Dialog';
import Head from './Head';
import useWeb3Provider from '../hooks/web3';

const ConnectWallet = () => {
  const { connect } = useWeb3Provider();

  const buttonProps = {
    className: 'button',
    css: css``,
  };

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
              ${media.tablet`
                width: 280px;
                height: 280px;
              `}
            }
          `}
        >
          <ConnectWalletSVG />
          <div>Please connect your Ethereum Wallet</div>
          <div
            css={css`
              width: 100%;
              display: flex;
              flex-direction: column;
              gap: 10px;
            `}
          >
            <button {...buttonProps} onClick={() => onClick('MetaMask')}>
              MetaMask
            </button>
            <button {...buttonProps} onClick={() => onClick('WalletConnect')}>
              WalletConnect
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ConnectWallet;
