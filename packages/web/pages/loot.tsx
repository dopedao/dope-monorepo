import { useState } from 'react';
import { useWalletQuery } from '../src/generated/graphql';
import { useWeb3React } from '@web3-react/core';
import AppWindow from '../components/AppWindow';
import Head from '../components/Head';
import LoadingBlock from '../components/LoadingBlock';
import LootCard from '../components/loot/LootCard';
import LootTable from '../components/loot/LootTable';
import NoLootCard from '../components/loot/NoLootCard';
import StackedResponsiveContainer from '../components/StackedResponsiveContainer';
import DopeWarsExeNav from '../components/DopeWarsExeNav';

const AuthenticatedContent = ({ id }: { id: string }) => {
  const { data, loading } = useWalletQuery({
    variables: { id: id.toLowerCase() },
  });
  const [selected, setSelected] = useState(0);

  if (loading) {
    return (
      <StackedResponsiveContainer>
        <LoadingBlock />
        <LoadingBlock />
      </StackedResponsiveContainer>
    );
  } else if (!data?.wallet?.bags || data.wallet.bags.length === 0) {
    return <NoLootCard />;
  } else {
    return (
      <StackedResponsiveContainer>
        <LootTable
          data={data.wallet.bags.map(({ bundled, claimed, id, rank }) => ({
            bundled,
            claimed,
            id,
            rank,
          }))}
          selected={selected}
          onSelect={setSelected}
        />
        <LootCard bag={data.wallet.bags[selected]} footer="for-owner" />
      </StackedResponsiveContainer>
    );
  }
};

export default function LootWindow() {
  const { account } = useWeb3React();
  return (
    <AppWindow requiresWalletConnection={true} navbar={<DopeWarsExeNav />}>
      <Head />
      {/* eslint-disable-next-line */}
      <AuthenticatedContent id={account!} />
    </AppWindow>
  );
}
