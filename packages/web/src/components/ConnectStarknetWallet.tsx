import { css } from '@emotion/react';
import { Button } from '@chakra-ui/button';
import ConnectWalletSVG from 'ui/svg/ConnectWallet';
import Dialog from 'components/Dialog';
import Head from './Head';
import { InjectedConnector, useStarknet } from '@starknet-react/core';

const ConnectStarknetWallet = () => {
  const { account, connect } = useStarknet();

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
          {' '}
          {/* {!hasStarknet && (
            <div>
              <a href="https://chrome.google.com/webstore/detail/argent-x-starknet-wallet/dlcobpjiigpikoobohmabehhmhfoodbb/">
                Get ArgentX wallet
              </a>
            </div>
          )}
          {hasStarknet && ( */}
            <>
              <ConnectWalletSVG />
              <h4>Connect Your Starknet Wallet</h4>
              <div
                css={css`
                  width: 100%;
                  display: flex;
                  flex-direction: column;
                  gap: 16px;
                `}
              >
                <Button onClick={() => connect(new InjectedConnector())}>ArgentX</Button>
              </div>
            </>
          {/* )} */}
        </div>
      </Dialog>
    </>
  );
};

export default ConnectStarknetWallet;
