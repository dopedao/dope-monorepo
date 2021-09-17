import { GetStaticProps } from 'next';
import { useWeb3React } from '@web3-react/core';
import { FetchStaticData, MediaFetchAgent, NetworkIDs } from '@zoralabs/nft-hooks';

import Head from '../components/head';
import ConnectWallet from '../components/ConnectWallet';
import AppWindow from '../components/AppWindow';

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

export default function Hustler() {
  const { account } = useWeb3React();

  return (
    <AppWindow>
      <Head title="Hustler" />
      {account ? 'hustler' : <ConnectWallet />}
    </AppWindow>
  );
}
