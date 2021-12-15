import { css } from '@emotion/react';
import { useWeb3React } from '@web3-react/core';
import { useCallback } from 'react';
import { Button } from '@chakra-ui/react';
import Dialog from './Dialog';

type DisconnectWalletProps = {
  onClose: () => void;
};

const DisconnectWallet = ({ onClose }: DisconnectWalletProps) => {
  const { account } = useWeb3React();
  const { deactivate } = useWeb3React();

  const onClickDisconnect = useCallback(() => {
    deactivate();
    onClose();
  }, [deactivate, onClose]);

  return (
    <Dialog onClose={onClose} icon="ethereum">
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 16px;
        `}
      >
        <h4>You Are Connected to DOPEWARS.EXE</h4>
        <div
          css={css`
            font-size: 12px;
          `}
        >
          {account && account.slice(0, 8)}...{account && account.slice(-8)}
        </div>
        <Button
          css={css`
            cursor: pointer;
          `}
          onClick={onClickDisconnect}
        >
          Disconnect ETH Wallet
        </Button>
      </div>
    </Dialog>
  );
};

export default DisconnectWallet;
