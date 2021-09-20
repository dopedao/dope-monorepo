import { css } from '@emotion/react';
import { useCallback } from 'react';

import ConnectWalletSVG from '../svg/ConnectWallet';
import Dialog from '../components/Dialog';

import useWeb3Provider from '../hooks/web3';

const ConnectWallet = () => {
  const { connect } = useWeb3Provider();

  const buttonProps = {
    className: 'button',
    css: css`
      font-size: var(--text-02);
    `,
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
    <Dialog>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 25px;
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
  );
};

export default ConnectWallet;
