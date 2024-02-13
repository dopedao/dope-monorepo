import { Box } from '@chakra-ui/react';
import { Button } from '@chakra-ui/button';
import { css } from '@emotion/react';
import { InjectedConnector, useStarknet } from '@starknet-react/core';
import ConnectWalletSVG from 'ui/svg/ConnectWallet';
import Dialog from 'components/Dialog';
import Head from './Head';

const ConnectStarknetWallet = () => {
  const { account, connect } = useStarknet();

  return (
    <>
      <Head title="Connect your ETH wallet" />
      <Dialog>
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
          {' '}
          {/* {!hasStarknet && (
            <Box>
              <a href="https://chrome.google.com/webstore/detail/argent-x-starknet-wallet/dlcobpjiigpikoobohmabehhmhfoodbb/">
                Get ArgentX wallet
              </a>
            </Box>
          )}
          {hasStarknet && ( */}
            <>
              <ConnectWalletSVG />
              <h4>Connect Your Starknet Wallet</h4>
              <Box
                css={css`
                  width: 100%;
                  display: flex;
                  flex-direction: column;
                  gap: 16px;
                `}
              >
                <Button onClick={() => connect(new InjectedConnector())}>ArgentX</Button>
              </Box>
            </>
          {/* )} */}
        </Box>
      </Dialog>
    </>
  );
};

export default ConnectStarknetWallet;
