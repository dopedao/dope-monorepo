import { css } from '@emotion/react';
import Dialog from '../Dialog';
import Head from '../Head';
import { Box } from '@chakra-ui/react';
import { useAccount } from 'wagmi';
import React from 'react';
import { NoSSR } from 'components/NoSSR';
import AccountDetails from './AccountDetails';
import ConnectWallet from './ConnectWallet';

type Props = {
  onClose?: () => void;
};

const Account = ({ onClose }: Props) => {
  const { isConnected } = useAccount();

  return (
    <>
      <Head title="Connect your ETH wallet" />
      <Dialog onClose={onClose}>
        <Box
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
          <NoSSR>{isConnected ? <AccountDetails /> : <ConnectWallet />}</NoSSR>
        </Box>
      </Dialog>
    </>
  );
};

export default Account;
