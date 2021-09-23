import { media } from '../styles/mixins';
import { useState } from 'react';
import { useWalletQuery } from '../src/generated/graphql';
import { useWeb3React } from '@web3-react/core';
import AppWindow from '../components/AppWindow';
import Head from '../components/Head';
import LoadingBlock from '../components/LoadingBlock';
import LootCard from '../components/loot/LootCard';
import LootTable from '../components/loot/LootTable';
import NoLootCard from '../components/loot/NoLootCard';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  // Mobile screens stack, 16px gap
  flex-flow: column wrap;
  gap: 16px;
  & > div {
    flex-grow: 1;
    flex-basis: 50px;
  }
  // When stacked vertically, ensure LootCard is taller
  & > div:last-child {
    flex-grow: 2;
  }
  ${media.phone`
    // When stacked vertically, ensure LootCard is taller
    & > div:last-child {
      flex-grow: 2;
    }
  `}
  // Screen > Tablet display items side by side
  ${media.tablet`
    flex-flow: row nowrap;
    gap: 32px;
    & > div:last-child {
      flex-grow: 1;
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
  } else if (!data?.wallet?.bags) {
    return <NoLootCard />;
  } else {
    return (
      <Container>
        <LootTable
          data={data.wallet.bags.map(({ id, claimed }) => ({
            id,
            unbundled: false,
            claimed,
          }))}
          selected={selected}
          onSelect={setSelected}
        />
        <LootCard bag={data.wallet.bags[selected]} />
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
