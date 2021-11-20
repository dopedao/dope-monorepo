/* eslint-disable @next/next/no-img-element */
import { useWeb3React } from '@web3-react/core';
import styled from '@emotion/styled';
import { media } from 'styles/mixins';
import { useHustlersWalletQuery } from 'src/generated/graphql';
import AppWindow from 'components/AppWindow';
import Head from 'components/Head';
import DopeWarsExeNav from 'components/DopeWarsExeNav';
import { useOptimismClient } from 'components/EthereumApolloProvider';
import LoadingBlock from 'components/LoadingBlock';
import { css } from '@emotion/react';

const Container = styled.div`
  padding: 16px 8px;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  .hustlerGrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    grid-column-gap: 16px;
    grid-row-gap: 16px;
  }
  ${media.tablet`
    padding: 16px 32px;
  `}
`;

const ContentLoading = (
  <Container>
    <LoadingBlock />
  </Container>
);
const ContentEmpty = (
  <Container>
    <h2>{`Can't find what you're looking for…`}</h2>
  </Container>
);

const HustlerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(229, 232, 235);
  border-radius: 2px;
  position: relative;
  z-index: 2;
  overflow: hidden;
`;

type Metadata = {
  image: string;
  name?: string;
  description?: string;
  attributes?: {
    trait_type: string;
    value: string;
  }[];
};

type HustlerItemProps = {
  data: Metadata;
};

const HustlerItem = ({ data }: HustlerItemProps) => (
  <HustlerWrapper>
    <div
      css={css`
        min-height: inherit;
        height: 100%;
        width: 100%;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          min-height: inherit;
          width: 100%;
          position: relative;
          border-radius: inherit;
        `}
      >
        <div
          css={css`
            align-items: center;
            display: flex;
            justify-content: center;
            max-height: 100%;
            max-width: 100%;
            overflow: hidden;
            position: relative;
            height: 100%;
            width: 290px;
          `}
        >
          <img
            css={css`
              object-fit: contain;
              width: auto;
              height: auto;
              max-width: 100%;
              max-height: 100%;
              border-radius: 0px;
            `}
            src={data.image}
            alt={data.name}
          />
        </div>
      </div>
    </div>
    <div
      css={css`
        justify-content: space-between;
        display: flex;
        flex-direction: column;
        padding: 12px;
      `}
    >
      <h4
        css={css`
          margin: unset;
          padding: unset;
          color: #000;
          font-size: 16px;
        `}
      >
        {data.name}
      </h4>
      <p
        css={css`
          margin: unset;
          padding: unset;
          color: #1b1b1b;
          font-size: 12px;
        `}
      >
        {data.description}
      </p>
    </div>
  </HustlerWrapper>
);

const Hustler = () => {
  const { account } = useWeb3React();
  const client = useOptimismClient();
  const { data, loading } = useHustlersWalletQuery({
    client,
    variables: { id: account?.toLowerCase() || '' },
    skip: !account,
  });

  return (
    <AppWindow padBody={false} navbar={<DopeWarsExeNav />}>
      <Head title="Create Your Hustler" />
      {loading && ContentLoading}
      {!loading && data?.wallet?.hustlers && data?.wallet?.hustlers.length > 0 && (
        <Container>
          <div className="hustlerGrid">
            {data.wallet.hustlers.map(({ id, data }) => {
              let meta = data.replace('data:application/json;base64,', '');
              meta = Buffer.from(meta, 'base64').toString();
              const decoded = JSON.parse(meta);

              return <HustlerItem data={decoded} key={id} />;
            })}
          </div>
        </Container>
      )}
      {!loading && data?.wallet?.hustlers && data?.wallet?.hustlers.length === 0 && ContentEmpty}
    </AppWindow>
  );
};

export default Hustler;
