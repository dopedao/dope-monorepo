/* eslint-disable @next/next/no-img-element */
import { media } from 'styles/mixins';
import { Maybe, useHustlerQuery } from 'src/generated/graphql';
import { useOptimismClient } from 'components/EthereumApolloProvider';
import { useWeb3React } from '@web3-react/core';
import { makeVar, useReactiveVar } from '@apollo/client';
import { getRandomHustler, HustlerCustomization, HustlerSex } from 'src/HustlerConfig';
import AppWindow from 'components/AppWindow';
import DopeWarsExeNav from 'components/DopeWarsExeNav';
import Head from 'components/Head';
import LoadingBlock from 'components/LoadingBlock';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import ConfigureHustler from 'features/hustlers/components/ConfigureHustler';
import { useHustler, useFetchMetadata } from 'hooks/contracts';
import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';

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

const ContentLoading = (
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
  const [isLoading, setLoading] = useState(false);
  const [fetchedHustlerConfig, setHustlerConfig] = useState<Partial<HustlerCustomization>>({});
  const hustlerContract = useHustler();
  const hustlerData = JSON.parse(
    Buffer.from(hustler!.data.replace('data:application/json;base64,', ''), 'base64').toString(),
  );

  const fetchMetadata = useFetchMetadata();

  useEffect(() => {
    if (!hustler) {
      return;
    }

    const fetch = async () => {
      const metadata = await fetchMetadata(BigNumber.from(hustler.id));

      if (!metadata) {
        // error occured
        return;
      }

      setHustlerConfig({
        name: metadata.name,
        dopeId: hustler.id,
        sex: metadata.body[0].eq(0),
        textColor: `#${metadata.color.slice(2, -2)}`,
        bgColor: `#${metadata.background.slice(2, -2)}`,
        body: metadata.body[1],
        hair: metadata.body[2],
        facialHair: metadata.body[3],
      });
    };

    fetch();
  }, [hustler]);

  const hustlerConfig = useReactiveVar(makeVar(getRandomHustler({})));

  return isLoading ? (
    ContentLoading
  ) : (
    <>
      {console.log({ fetchedHustlerConfig })}
      <ConfigureHustler
        config={{
          ...hustlerConfig,
          renderName: !!fetchedHustlerConfig.name,
          dopeId: fetchedHustlerConfig.dopeId || hustlerConfig.dopeId,
          sex: fetchedHustlerConfig.sex || hustlerConfig.sex,
          name: fetchedHustlerConfig.name || hustlerConfig.name,
          textColor: fetchedHustlerConfig.textColor || hustlerConfig.textColor,
          bgColor: fetchedHustlerConfig.bgColor || hustlerConfig.bgColor,
        }}
      />
    </>
  );
};

const Hustlers = () => {
  const router = useRouter();
  const { account } = useWeb3React();
  const client = useOptimismClient();
  const { data, loading } = useHustlerQuery({
    client,
    variables: { id: String(router.query.id) },
    skip: !router.query.id || !account,
  });

  return (
    <AppWindow padBody={false} navbar={<DopeWarsExeNav />}>
      <Head title="Your Hustler Squad" />
      {loading || !data?.hustler?.data || !data?.hustler?.data.length ? (
        ContentLoading
      ) : (
        <HustlerEdit hustler={data.hustler} />
      )}
    </AppWindow>
  );
};

export default Hustlers;
