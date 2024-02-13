import { css } from '@emotion/react';
import { Button } from '@chakra-ui/button';
import { useRouter } from 'next/router';
import ConnectWalletSVG from '../../ui/svg/ConnectWallet';
import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useConnectModal } from '@rainbow-me/rainbowkit';

const ConnectWallet = () => {
  const { openConnectModal } = useConnectModal();
  const router = useRouter();

  useEffect(() => {
    openConnectModal?.();
  }, [openConnectModal]);

  return (
    <>
      <ConnectWalletSVG />
      <h4>Connect Wallet To Continue</h4>
      <Box
        css={css`
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 16px;
        `}
      >
        <Button variant="primary" onClick={openConnectModal}>
          Connect Wallet
        </Button>
        <Button onClick={() => router.back()} backgroundColor="black" color="white">
          Go Back
        </Button>
      </Box>
    </>
  );
};

export default ConnectWallet;
