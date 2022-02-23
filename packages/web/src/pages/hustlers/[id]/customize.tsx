//CUSTOMIZE
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Button } from '@chakra-ui/button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import { HustlerQuery, useHustlerQuery, useWalletQuery } from 'generated/graphql';
import { getRandomHustler, HustlerCustomization, ZOOM_WINDOWS } from 'utils/HustlerConfig';
import { media } from 'ui/styles/mixins';
import { useSwitchOptimism, useNetworkCheckOptimism } from 'hooks/web3';
import { useHustlerRles } from 'hooks/render';
import AppWindow from 'components/AppWindow';
import AppWindowNavBar from 'components/AppWindowNavBar';
import Head from 'components/Head';
import LoadingBlock from 'components/LoadingBlock';
import ConfigureHustler from 'features/hustlers/components/ConfigureHustler';
import DialogSwitchNetwork from 'components/DialogSwitchNetwork';
import ArrowBack from 'ui/svg/ArrowBack';

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

const HustlerEdit = ({ data }: { data: HustlerQuery }) => {
  const hustler = data?.hustlers.edges?.[0]?.node;

  const router = useRouter();
  const hustlerId = router.query.id;
  const [isLoading, setLoading] = useState(true);
  const [ogTitle, setOgTitle] = useState('');
  const [hustlerConfig, setHustlerConfig] = useState<HustlerCustomization>(getRandomHustler({}));

  const itemRles = useHustlerRles(hustler);

  useEffect(() => {
    if (!hustler) {
      // error occured
      return;
    }

    setHustlerConfig(
      getRandomHustler({
        renderName: Boolean(hustler.name && hustler.name.length > 0),
        name: hustler.name ? hustler.name : '',
        dopeId: hustler.id,
        sex: hustler.sex === 'MALE' ? 'male' : 'female',
        textColor: hustler.color ? '#' + hustler.color.slice(0, -2) : undefined,
        bgColor: hustler.background ? '#' + hustler.background.slice(0, -2) : undefined,
        body: hustler.body?.id ? parseInt(hustler.body.id.split('-')[2]) : undefined,
        hair: hustler.hair?.id ? parseInt(hustler.hair.id.split('-')[2]) : undefined,
        facialHair: hustler.beard?.id ? parseInt(hustler.beard.id.split('-')[2]) : undefined,
        zoomWindow: ZOOM_WINDOWS[2], 
        isVehicle: true
      }),
    );
    setOgTitle(hustler.title || '');
    setLoading(false);
  }, [hustler]);

  return isLoading ? (
    <ContentLoading />
  ) : (
    <>
      <ConfigureHustler
        config={hustlerConfig}
        setHustlerConfig={setHustlerConfig}
        ogTitle={ogTitle}
        itemRles={itemRles}
        hustlerId={hustlerId?.toString()}
        isCustomize
      />
    </>
  );
};

const Nav = () => (
  <AppWindowNavBar>
    <Link href="/inventory?section=Hustlers" passHref>
      <Button variant="navBar">
        <ArrowBack size={16} color="white" />
        Your Hustlers
      </Button>
    </Link>
  </AppWindowNavBar>
);

const Hustlers = () => {
  const router = useRouter();

  const [showNetworkAlert, setShowNetworkAlert] = useState(false);
  const { account, chainId } = useWeb3React();

  const { isFetching: walletLoading } = useWalletQuery(
    {
      where: {
        id: account,
      },
    },
    {
      enabled: !!account,
    },
  );
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

  const isConnectedToOptimism = useNetworkCheckOptimism();
  useSwitchOptimism(chainId, account);

  useEffect(() => {
    const localNetworkAlert = localStorage.getItem('networkAlertCustomizeHustler');

    if (localNetworkAlert !== 'true') {
      setShowNetworkAlert(true);
    }
  }, []);

  return (
    <AppWindow padBody={false} navbar={<Nav />} requiresWalletConnection={true}>
      <Head title="Customize Hustler" />
      {!isConnectedToOptimism && showNetworkAlert && (
        <DialogSwitchNetwork networkName="Optimism" />
      )}
      {walletLoading || isFetching || !data?.hustlers.edges?.[0]?.node || !router.isReady ? (
        <ContentLoading />
      ) : (
        <HustlerEdit data={data} />
      )}
    </AppWindow>
  );
};

export default Hustlers;
