/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useState } from 'react';
import { BigNumber } from 'ethers';
import styled from '@emotion/styled';
import { Button } from '@chakra-ui/button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Image } from '@chakra-ui/image';
import { makeVar, useReactiveVar } from '@apollo/client';
import { useWeb3React } from '@web3-react/core';
import { CloseButton } from '@chakra-ui/close-button';
import { css } from '@emotion/react';
import { Maybe, useHustlerQuery, useWalletQuery } from 'generated/graphql';
import { getRandomHustler, HustlerCustomization } from 'utils/HustlerConfig';
import { media } from 'styles/mixins';
import { useFetchMetadata } from 'hooks/contracts';
import { useSwitchOptimism } from 'hooks/web3';
import { useOptimismClient } from 'components/EthereumApolloProvider';
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
  hustler:
    | Maybe<{
        __typename?: 'Hustler' | undefined;
        id: string;
        data: string;
      }>
    | undefined;
};

const HustlerEdit = ({ hustler }: HustlerEditProps) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [itemIds, setItemIds] = useState<BigNumber[]>();
  const [fetchedHustlerConfig, setHustlerConfig] = useState<
    Partial<HustlerCustomization> & { ogTitle?: string }
  >({});

  const fetchMetadata = useFetchMetadata();

  useEffect(() => {
    if (!hustler) {
      setLoading(false);
      return;
    }

    const fetch = async () => {
      try {
        const metadata = await fetchMetadata(BigNumber.from(hustler.id));

        if (!metadata) {
          // error occured
          return;
        }

        setHustlerConfig({
          ogTitle: metadata.ogTitle,
          name: metadata.name,
          dopeId: hustler.id,
          sex: metadata.body[0].eq(0) ? 'male' : 'female',
          textColor: `#${metadata.color.slice(2, -2)}`,
          bgColor: `#${metadata.background.slice(2, -2).toUpperCase()}`,
          body: metadata.body[1],
          hair: metadata.body[2],
          facialHair: metadata.body[3],
        });

        const fetchedItemIds = [
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

  const makeVarConfig = useMemo(
    () =>
      makeVar(
        getRandomHustler({
          renderName: Boolean(fetchedHustlerConfig.name && fetchedHustlerConfig.name.length > 0),
          dopeId: fetchedHustlerConfig.dopeId,
          sex: fetchedHustlerConfig.sex,
          name: fetchedHustlerConfig.name,
          textColor: fetchedHustlerConfig.textColor,
          bgColor: fetchedHustlerConfig.bgColor,
          facialHair: fetchedHustlerConfig.facialHair,
          hair: fetchedHustlerConfig.hair,
          body: fetchedHustlerConfig.body,
        }),
      ),
    [
      fetchedHustlerConfig.bgColor,
      fetchedHustlerConfig.body,
      fetchedHustlerConfig.dopeId,
      fetchedHustlerConfig.facialHair,
      fetchedHustlerConfig.hair,
      fetchedHustlerConfig.name,
      fetchedHustlerConfig.sex,
      fetchedHustlerConfig.textColor,
    ],
  );

  const hustlerConfig = useReactiveVar(makeVarConfig);

  return isLoading ? (
    <ContentLoading />
  ) : (
    <>
      <ConfigureHustler
        config={hustlerConfig}
        makeVarConfig={makeVarConfig}
        ogTitle={fetchedHustlerConfig.ogTitle}
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
  const [showNetworkAlert, setShowNetworkAlert] = useState(false);
  const router = useRouter();
  const { account, chainId } = useWeb3React();
  const { loading: walletLoading } = useWalletQuery({
    variables: { id: account?.toLowerCase() || '' },
    skip: !account,
  });
  const client = useOptimismClient();
  const { data, loading } = useHustlerQuery({
    client,
    variables: { id: String(router.query.id) },
    skip: !router.query.id || !account,
  });
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
    <AppWindow padBody={false} navbar={<Nav />}>
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
      {walletLoading || loading || !data?.hustler?.data || !data?.hustler?.data.length ? (
        <ContentLoading />
      ) : (
        <HustlerEdit hustler={data.hustler} />
      )}
    </AppWindow>
  );
};

export default Hustlers;
