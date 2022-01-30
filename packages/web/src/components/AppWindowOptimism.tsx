import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { css } from '@emotion/react';
import { CloseButton } from '@chakra-ui/close-button';
import { useSwitchOptimism } from 'hooks/web3';
import StickyNote from 'components/StickyNote';
import AppWindow, { AppWindowProps } from './AppWindow';

const AppWindowOptimism = ({ children, ...rest }: AppWindowProps) => {
  const [showNetworkAlert, setShowNetworkAlert] = useState(false);
  const { account, chainId } = useWeb3React();

  useSwitchOptimism(chainId, account);

  useEffect(() => {
    const localNetworkAlert = localStorage.getItem('networkAlertOptimism');

    if (localNetworkAlert !== 'true') {
      setShowNetworkAlert(true);
    }
  }, []);

  const handleCloseAlert = () => {
    window.localStorage.setItem('networkAlertOptimism', 'false');
    setShowNetworkAlert(false);
  };

  return (
    <AppWindow {...rest}>
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
      {children}
    </AppWindow>
  );
};

export default AppWindowOptimism;
