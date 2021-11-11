import { media } from 'styles/mixins';
import { useState } from 'react';
import { useWalletQuery } from 'src/generated/graphql';
import { useWeb3React } from '@web3-react/core';
import AppWindow from 'components/AppWindow';
import Head from 'components/Head';
import LoadingBlock from 'components/LoadingBlock';
import LootCard from 'components/loot/LootCard';
import LootTable from 'components/loot/LootTable';
import NoLootCard from 'components/loot/NoLootCard';
import styled from '@emotion/styled';

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  // Mobile screens stack, 16px gap
  flex-flow: column nowrap;
  gap: 16px;
  & > div {
    flex: 1;
    overflow-y: auto;
  }
  & > div:last-child {
    flex: 2;
  }
  // Screen > Tablet display items side by side
  ${media.tablet`
    flex-flow: row nowrap;
    & > div:last-child {
      flex: 1;
    } 
  `}
`;

const AuthenticatedContent = ({ id }: { id: string }) => {
  const { data, loading } = useWalletQuery({
    variables: { id: id.toLowerCase() },
  });
  const [selected, setSelected] = useState(0);

  if (loading) {
    return (
      <Container>
        <LoadingBlock />
        <LoadingBlock />
      </Container>
    );
  } else if (!data?.wallet?.bags || data.wallet.bags.length === 0) {
    return <NoLootCard />;
  } else {
    return (
      <Container>
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
      </Container>
    );
  }
};

export default function LootWindow() {
  const { account } = useWeb3React();
  return (
    <AppWindow requiresWalletConnection={true}>
      <Head />
      {/* eslint-disable-next-line */}
      <AuthenticatedContent id={account!} />
    </AppWindow>
  );
}
