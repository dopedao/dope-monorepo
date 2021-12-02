/* eslint-disable @next/next/no-img-element */
import { media } from 'styles/mixins';
import { useEffect, useMemo, useState } from 'react';
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
  const [isLoading, setLoading] = useState(true);
  const [fetchedHustlerConfig, setHustlerConfig] = useState<Partial<HustlerCustomization>>({});
  const hustlerContract = useHustler();
  const hustlerData = JSON.parse(
    Buffer.from(hustler!.data.replace('data:application/json;base64,', ''), 'base64').toString(),
  );

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const metadata = await hustlerContract.metadata(hustler!.id);
        console.log({ metadata });
        const name = metadata['name'];
        const sex = hustlerData?.attributes[1].value.toLowerCase();
        const dopeId = hustler?.id;
        const body = hustlerData?.image;
        // const facialHair =
        // const hair =
        // const zoomWindow =
        const textColor = `#${metadata['color'].slice(2, -2)}`;
        const bgColor = `#${metadata['background'].slice(2, -2)}`;
        // const bodyParts: [BigNumber, BigNumber, BigNumber, BigNumber] = [
        //   hustlerData.sex == 'male' ? BigNumber.from(0) : BigNumber.from(1),
        //   BigNumber.from(hustlerData.body),
        //   BigNumber.from(hustlerData.hair),
        //   hustlerData.sex == 'male' ? BigNumber.from(hustlerData.facialHair) : BigNumber.from(0),
        // ];

        // let bitoptions = 0;

        // if (name) {
        //   // title
        //   bitoptions += 10;
        //   // name
        //   bitoptions += 100;
        // }

        // const options =
        //   '0x' +
        //   parseInt('' + bitoptions, 2)
        //     .toString(16)
        //     .padStart(4, '0');

        // let bitmask = 11110110;
        // if (setname.length > 0) {
        //   bitmask += 1;
        // }

        // if (zoomWindow[0].gt(0) || zoomWindow[0].gt(1) || zoomWindow[0].gt(2) || zoomWindow[0].gt(3)) {
        //   bitmask += 1000;
        // }

        // const mask =
        //   '0x' +
        //   parseInt('' + bitmask, 2)
        //     .toString(16)
        //     .padStart(4, '0');

        setHustlerConfig({
          name,
          dopeId,
          sex,
          textColor,
          bgColor,
          body,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        }),
      ),
    [
      fetchedHustlerConfig.bgColor,
      fetchedHustlerConfig.dopeId,
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
      <ConfigureHustler config={hustlerConfig} makeVarConfig={makeVarConfig} />
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
        <ContentLoading />
      ) : (
        <HustlerEdit hustler={data.hustler} />
      )}
    </AppWindow>
  );
};

export default Hustlers;
