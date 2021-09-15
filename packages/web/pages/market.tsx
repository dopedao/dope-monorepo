import { GetStaticProps } from 'next';

import Head from '../components/head';
import { PageWrapper } from '../styles/components';

import { AuctionsList } from '../components/AuctionsList';

import { FetchStaticData, MediaFetchAgent, NetworkIDs } from '@zoralabs/nft-hooks';
import { ReserveAuctionPartialFragment } from '@zoralabs/nft-hooks/dist/graph-queries/zora-graph-types';
import { TokenWithAuctionFragment } from '@zoralabs/nft-hooks/dist/graph-queries/zora-indexer-types';

export type ZoraToken = {
  nft: {
    tokenData: TokenWithAuctionFragment;
    auctionData: ReserveAuctionPartialFragment | undefined;
  };
};

export default function Market({ tokens }: { tokens: ZoraToken[] }) {
  return (
    <PageWrapper>
      <Head />
      <AuctionsList tokens={tokens} />
    </PageWrapper>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const fetchAgent = new MediaFetchAgent(process.env.NEXT_PUBLIC_NETWORK_ID as NetworkIDs);
  const tokens = await FetchStaticData.fetchZoraIndexerList(fetchAgent, {
    curatorAddress: process.env.NEXT_PUBLIC_CURATORS_ID as string,
    collectionAddress: process.env.NEXT_PUBLIC_TARGET_CONTRACT_ADDRESS as string,
    limit: 100,
    offset: 0,
  });

  return {
    props: {
      tokens,
    },
    revalidate: 60,
  };
};
