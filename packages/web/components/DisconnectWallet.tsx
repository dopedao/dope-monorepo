import { css } from "@emotion/react";
import { useWeb3React } from "@web3-react/core";
import { useCallback } from "react";
import { Button } from '@chakra-ui/react';
import Dialog from "./Dialog"

import Ethereum from "../svg/Ethereum";

type DisconnectWalletProps = {
  onClose: () => void;
}

const DisconnectWallet = ({
  onClose,
}: DisconnectWalletProps) => {
  const { deactivate } = useWeb3React();

  const onClickDisconnect = useCallback(() => {
    deactivate();
    onClose();
  }, [deactivate, onClose]);

  return (
    <Dialog onClose={onClose}>
      <div css={css`
        display: flex;
        gap: 30px;
      `}>
        <Ethereum />
        <div css={css`
          display: flex;
          flex-direction: column;
          gap: 25px;
          font-size: 14px;
        `}>
          <div>You Are Connected to DOPEWARS.EXE</div>
          <button css={css`cursor: pointer;`} onClick={onClickDisconnect}>Disconnect ETH Wallet</button>
        </div>
      </div>
    </Dialog>
  );
};

export default DisconnectWallet;
