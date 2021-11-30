/* eslint-disable @next/next/no-img-element */
import { media } from 'styles/mixins';
import { Hustler, HustlerQuery, Maybe, useHustlerQuery } from 'src/generated/graphql';
import { useOptimismClient } from 'components/EthereumApolloProvider';
import { useWeb3React } from '@web3-react/core';
import { makeVar, useReactiveVar } from '@apollo/client';
import { BigNumber } from 'ethers';
import { getRandomHustler, HustlerInitConfig } from 'src/HustlerConfig';
import AppWindow from 'components/AppWindow';
import DopeWarsExeNav from 'components/DopeWarsExeNav';
import Head from 'components/Head';
import LoadingBlock from 'components/LoadingBlock';
// import RenderFromChain from 'components/hustler/RenderFromChain';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import ConfigureHustler from 'features/hustlers/components/ConfigureHustler';
import { useHustler } from 'hooks/contracts';

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
  const hustlerContract = useHustler();
  const hustlerData = JSON.parse(
    Buffer.from(hustler!.data.replace('data:application/json;base64,', ''), 'base64').toString(),
  );

  // const name = hustlerData?.name
  // const sex =
  // const dopeId = hustler?.id
  // const sex =
  // const bgColor =
  // const body =
  // const facialHair =
  // const hair =
  // const textColor =
  // const zoomWindow =

  const hustlerConfig = useReactiveVar(
    makeVar(
      getRandomHustler({
        renderName: !!hustlerData?.name,
        dopeId: hustler?.id,
        sex: hustlerData?.attributes[1].value.toLowerCase(),
        name: hustlerData?.name,
      }),
    ),
  );

  console.log({ hustlerData });

  // Ignore this for now
  hustlerContract.metadata(hustler!.id).then(test => {
    console.log({ test });
  });

  return <ConfigureHustler config={hustlerConfig} />;
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
