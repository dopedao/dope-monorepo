/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import styled from '@emotion/styled';
import { Button } from '@chakra-ui/button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Image } from '@chakra-ui/image';
import { useWeb3React } from '@web3-react/core';
import { CloseButton } from '@chakra-ui/close-button';
import { css } from '@emotion/react';
import { Hustler, useHustlerQuery, useWalletQuery } from 'generated/graphql';
import { getRandomHustler } from 'utils/HustlerConfig';
import { media } from 'ui/styles/mixins';
import { useFetchMetadata } from 'hooks/contracts';
import { useSwitchOptimism } from 'hooks/web3';
import AppWindow from 'components/AppWindow';
import AppWindowNavBar from 'components/AppWindowNavBar';
import Head from 'components/Head';
import LoadingBlock from 'components/LoadingBlock';
import StickyNote from 'components/StickyNote';
import ConfigureHustler from 'features/hustlers/components/ConfigureHustler';

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

type HustlerEditProps = {
  hustler: Hustler;
};

const HustlerEdit = ({ hustler }: HustlerEditProps) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [itemIds, setItemIds] = useState<BigNumber[]>();
  const [ogTitle, setOgTitle] = useState('');
  const [hustlerConfig, setHustlerConfig] = useState(getRandomHustler({}));

  const fetchMetadata = useFetchMetadata();

  useEffect(() => {
    const fetch = async () => {
      try {
        const metadata = await fetchMetadata(BigNumber.from(hustler.id));

        if (!metadata) {
          // error occured
          return;
        }

        setHustlerConfig(
          getRandomHustler({
            renderName: Boolean(hustler.name && hustler.name.length > 0),
            name: metadata.name,
            dopeId: hustler.id,
            sex: metadata.body[0].eq(0) ? 'male' : 'female',
            textColor: `#${metadata.color.slice(2, -2)}`,
            bgColor: `#${metadata.background.slice(2, -2).toUpperCase()}`,
            body: metadata.body[1],
            hair: metadata.body[2],
            facialHair: metadata.body[3],
          }),
        );
        setOgTitle(hustler.title || metadata.ogTitle);

        const fetchedItemIds = [
          metadata.vehicle,
          metadata.weapon,
          metadata.clothes,
          metadata.waist,
          metadata.foot,
          metadata.hand,
          metadata.drugs,
          metadata.neck,
          metadata.ring,
        ];

        setItemIds(fetchedItemIds);
        setLoading(false);
      } catch (error) {
        router.push('/404');
      }
    };

    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hustler]);

  return isLoading ? (
    <ContentLoading />
  ) : (
    <>
      <ConfigureHustler
        config={hustlerConfig}
        setHustlerConfig={setHustlerConfig}
        ogTitle={ogTitle}
        itemIds={itemIds}
        isCustomize
      />
    </>
  );
};

const Nav = () => (
  <AppWindowNavBar>
    <Link href="/hustlers" passHref>
      <Button variant="back">
        <Image src="/images/icon/arrow-back.svg" width="16px" alt="Arrow" />
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
  const { data, isFetching: loading } = useHustlerQuery(
    {
      where: {
        id: String(router.query.id),
      },
    },
    {
      enabled: !!account && router.isReady && !!String(router.query.id),
    },
  );
  useSwitchOptimism(chainId, account);

  useEffect(() => {
    const localNetworkAlert = localStorage.getItem('networkAlertCustomizeHustler');

    if (localNetworkAlert !== 'true') {
      setShowNetworkAlert(true);
    }
  }, []);

  const handleCloseAlert = () => {
    window.localStorage.setItem('networkAlertCustomizeHustler', 'false');
    setShowNetworkAlert(false);
  };

  return (
    <AppWindow padBody={false} navbar={<Nav />} requiresWalletConnection={true}>
      <Head title="Your Hustler Squad" />
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
              You should switch to Optimism network to customize your hustler.
            </p>{' '}
            <CloseButton onClick={handleCloseAlert} />
          </div>
        </StickyNote>
      )}
      {walletLoading || loading || !data?.hustlers.edges?.[0]?.node || !router.isReady ? (
        <ContentLoading />
      ) : (
        <HustlerEdit hustler={data.hustlers.edges[0].node} />
      )}
    </AppWindow>
  );
};

export default Hustlers;
