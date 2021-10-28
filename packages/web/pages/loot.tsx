import { media } from 'styles/mixins';
import { useState } from 'react';
import styled from '@emotion/styled';
import { useWeb3React } from '@web3-react/core';
import { useWalletQuery } from 'src/generated/graphql';
import AppWindow from 'components/AppWindow';
import Head from 'components/Head';
import LoadingBlock from 'components/LoadingBlock';
import LootCard from 'components/loot/LootCard';
import LootTable from 'components/loot/LootTable';
import NoLootCard from 'components/loot/NoLootCard';
import StackedResponsiveContainer from '../components/StackedResponsiveContainer';
import DopeWarsExeNav from '../components/DopeWarsExeNav';

export default function LootWindow() {
  const { account } = useWeb3React();
  const { data, loading } = useWalletQuery({
    variables: { id: account?.toLowerCase() || '' },
    skip: !account,
  });
  const [selected, setSelected] = useState(0);

  return (
    <AppWindow
      requiresWalletConnection={true}
      balance={data?.wallet?.paper}
      loadingBalance={loading}
      navbar={<DopeWarsExeNav />}
    >
      <Head />
      {loading ? (
        <StackedResponsiveContainer>
          <LoadingBlock />
          <LoadingBlock />
        </StackedResponsiveContainer>
      ) : !data?.wallet?.bags || data.wallet.bags.length === 0 ? (
        <NoLootCard />
      ) : (
        <StackedResponsiveContainer>
          <LootTable
            data={data.wallet.bags.map(({ id, claimed, rank }) => ({
              id,
              rank,
              claimed,
              unbundled: false,
            }))}
            selected={selected}
            onSelect={setSelected}
          />
          <LootCard bag={data.wallet.bags[selected]} footer="for-owner" />
        </StackedResponsiveContainer>
      )}
    </AppWindow>
  );
}
