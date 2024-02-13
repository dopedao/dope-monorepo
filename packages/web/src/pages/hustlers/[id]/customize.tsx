'use client';
//CUSTOMIZE
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Button } from '@chakra-ui/button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import { useHustlerQuery } from 'generated/graphql';
import { media } from 'ui/styles/mixins';
import { useIsOnOptimism } from 'hooks/web3';
import AppWindow from 'components/AppWindow';
import AppWindowNavBar from 'components/AppWindowNavBar';
import Head from 'components/Head';
import LoadingBlock from 'components/LoadingBlock';
import DialogSwitchNetwork from 'components/DialogSwitchNetwork';
import ArrowBack from 'ui/svg/ArrowBack';
import { NoSSR } from 'components/NoSSR';
import HustlerEdit from 'features/hustlers/components/HustlerEdit';
import { useOptimism } from 'hooks/web3';

const brickBackground = "#000000 url('/images/tile/brick-black.png') center/25% fixed";

const Container = styled.div`
  padding: 32px 16px;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  background: ${brickBackground};
  .hustlerGrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    grid-column-gap: 32px;
    grid-row-gap: 64px;
  }
  ${media.tablet`
    padding: 32px;
  `}
`;

const ContentLoading = () => (
  <Container>
    <LoadingBlock color="white" maxRows={10} />
  </Container>
);

const Nav = () => (
  <AppWindowNavBar>
    <Link href="/swap-meet/inventory?section=Hustlers" passHref>
      <Button variant="navBar">
        <ArrowBack size={16} color="white" />
        Your Hustlers
      </Button>
    </Link>
  </AppWindowNavBar>
);

const Hustlers = () => {
  useOptimism();
  const router = useRouter();

  const [showNetworkAlert, setShowNetworkAlert] = useState(false);
  const { address: account } = useAccount();

  const { data, isFetching } = useHustlerQuery(
    {
      where: {
        id: String(router.query.id),
      },
    },
    {
      enabled: !!account && router.isReady && !!String(router.query.id),
    },
  );

  const isConnectedToOptimism = useIsOnOptimism();

  useEffect(() => {
    const localNetworkAlert = localStorage.getItem('networkAlertCustomizeHustler');

    if (localNetworkAlert !== 'true') {
      setShowNetworkAlert(true);
    }
  }, []);

  return (
    <AppWindow padBody={false} navbar={<Nav />} requiresWalletConnection={true}>
      <Head title="Customize Hustler" />
      <NoSSR>
        {!isConnectedToOptimism && showNetworkAlert && (
          <DialogSwitchNetwork networkName="Optimism" />
        )}
        {isFetching || !data?.hustlers.edges?.[0]?.node || !router.isReady ? (
          <ContentLoading />
        ) : (
          <HustlerEdit data={data} />
        )}
      </NoSSR>
    </AppWindow>
  );
};

export default Hustlers;
