import { GetStaticProps } from 'next';

import { FetchStaticData, MediaFetchAgent, NetworkIDs } from '@zoralabs/nft-hooks';
import { ReserveAuctionPartialFragment } from '@zoralabs/nft-hooks/dist/graph-queries/zora-graph-types';
import { TokenWithAuctionFragment } from '@zoralabs/nft-hooks/dist/graph-queries/zora-indexer-types';

import AppWindow from '../components/AppWindow';
import Head from '../components/head';
import { AuctionsList } from '../components/AuctionsList';


export type ZoraToken = {
  nft: {
    tokenData: TokenWithAuctionFragment;
    auctionData: ReserveAuctionPartialFragment | undefined;
  };
};

export const getStaticProps: GetStaticProps = async () => {
  const fetchAgent = new MediaFetchAgent(process.env.NEXT_PUBLIC_NETWORK_ID as NetworkIDs);
  const tokens = await FetchStaticData.fetchZoraIndexerList(fetchAgent, {
    curatorAddress: process.env.NEXT_PUBLIC_CURATORS_ID as string,
    collectionAddress: process.env.NEXT_PUBLIC_DOPE_CONTRACT_ADDRESS as string,
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


export default function Market({ tokens }: { tokens: ZoraToken[] }) {
  return (
    <AppWindow>
      <Head />
      <AuctionsList tokens={tokens} />
    </AppWindow>
  );
}
