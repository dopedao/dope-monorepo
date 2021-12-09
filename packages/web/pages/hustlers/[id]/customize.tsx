/* eslint-disable @next/next/no-img-element */
import { media } from 'styles/mixins';
import { useEffect, useMemo, useState } from 'react';
import { BigNumber } from 'ethers';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useWeb3React } from '@web3-react/core';
import { makeVar, useReactiveVar } from '@apollo/client';
import { Maybe, useHustlerQuery, useWalletQuery } from 'src/generated/graphql';
import { getRandomHustler, HustlerCustomization } from 'src/HustlerConfig';
import { useOptimismClient } from 'components/EthereumApolloProvider';
import AppWindow from 'components/AppWindow';
import DopeWarsExeNav from 'components/DopeWarsExeNav';
import Head from 'components/Head';
import LoadingBlock from 'components/LoadingBlock';
import ConfigureHustler from 'features/hustlers/components/ConfigureHustler';
import { useFetchMetadata } from 'hooks/contracts';
import { useSwitchOptimism } from 'hooks/web3';

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
    <LoadingBlock />
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

const Hustlers = () => {
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
  useSwitchOptimism();

  return (
    <AppWindow padBody={false} navbar={<DopeWarsExeNav />}>
      <Head title="Your Hustler Squad" />
      {walletLoading || loading || !data?.hustler?.data || !data?.hustler?.data.length ? (
        <ContentLoading />
      ) : (
        <HustlerEdit hustler={data.hustler} />
      )}
    </AppWindow>
  );
};

export default Hustlers;
