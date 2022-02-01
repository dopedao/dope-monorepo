import { useMemo, useState, useEffect } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { CloseButton } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { useWalletQuery } from 'generated/graphql';
import { getRandomHustler } from 'utils/HustlerConfig';
import { useSwitchEthereum } from 'hooks/web3';
import AppWindow from 'components/AppWindow';
import Begin from 'features/hustlers/modules/Begin';
import HustlerProvider from 'features/hustlers/HustlerProvider';
import StickyNote from 'components/StickyNote';
import LoadingBlock from 'components/LoadingBlock';
import { media } from 'ui/styles/mixins';
import { useRouter } from 'next/router';

const FlexFiftyContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  // Mobile screens stack, 16px gap
  flex-flow: column nowrap;
  gap: 16px;
  // Makes containers stack on one full screen – no scroll
  & > div {
    flex: 1;
    overflow-y: auto;
  }
  & > div:last-child {
    flex: 2;
  }
  // Screen > Tablet display items side by side
  ${media.tablet`
  & > div {
    flex: 1;
    overflow-y: auto;
  }
  flex-flow: row nowrap;
    & > div:last-child {
      flex: 1;
    } 
  `}
`;

const Initiate = () => {
  const router = useRouter();
  const [showNetworkAlert, setShowNetworkAlert] = useState(false);
  const { account, chainId } = useWeb3React();
  const { isFetching: loading } = useWalletQuery(
    {
      where: { id: account },
    },
    {
      enabled: !account,
      onSuccess: data => {
        if (
          data?.wallets?.edges![0]?.node?.dopes &&
          data?.wallets?.edges![0]?.node?.dopes.length > 0
        ) {
          router.push(
            '/hustlers/[id]/initiate',
            `/hustlers/${data.wallets.edges[0].node.dopes[0].id}/initiate`,
          );
        }
      },
    },
  );
  useSwitchEthereum(chainId, account);

  useEffect(() => {
    const localNetworkAlert = localStorage.getItem('networkAlertInitiateHustler0');

    if (localNetworkAlert !== 'true') {
      setShowNetworkAlert(true);
    }
  }, []);

  const handleCloseAlert = () => {
    window.localStorage.setItem('networkAlertInitiateHustler0', 'false');
    setShowNetworkAlert(false);
  };

  const [hustlerConfig, setHustlerConfig] = useState(
    getRandomHustler({
      dopeId: '1',
    }),
  );

  return (
    <AppWindow requiresWalletConnection={true} scrollable={true}>
      <HustlerProvider>
        {account && chainId !== 1 && chainId !== 42 && showNetworkAlert && (
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
                You should switch to Main network to initiate your hustler.
              </p>{' '}
              <CloseButton onClick={handleCloseAlert} />
            </div>
          </StickyNote>
        )}
        {loading ? (
          <FlexFiftyContainer>
            <LoadingBlock />
            <LoadingBlock />
          </FlexFiftyContainer>
        ) : (
          <Begin hustlerConfig={hustlerConfig} setHustlerConfig={setHustlerConfig} />
        )}
      </HustlerProvider>
    </AppWindow>
  );
};

export default Initiate;
