import { useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useWeb3React } from '@web3-react/core';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import rare from 'dope-metrics/output/rare.json';

import { useWalletQuery } from '../src/generated/graphql';

import Head from '../components/head';
import LootCard from '../components/LootCard';
import AppWindow from '../components/AppWindow';

const Centered = styled.div`
  display: flex;
  justify-content: center;
`;

const rareById: { [name: string]: { rarest: number } } = Object.values(rare).reduce(
  (rareById, rare) => {
    return {
      ...rareById,
      [rare.lootId]: rare,
    };
  },
  {},
);

const DopeTable = ({
  className = '',
  data,
  selected,
  onSelect,
}: {
  className?: string;
  data: { id: string; unbundled: boolean; claimed: boolean }[];
  selected: number;
  onSelect: (i: number) => void;
}) => (
  <div className={className}>
    <Table variant="dope">
      <Thead>
        <Tr>
          <Th>Dope ID</Th>
          <Th>Rank</Th>
          <Th>Percentile</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map(({ id }, i) => (
          <Tr className={selected === i ? 'selected' : ''} key={id} onClick={() => onSelect(i)}>
            <Td>{id}</Td>
            <Td>{rareById[id].rarest}</Td>
            <Td>{((1 - rareById[id].rarest / 8000) * 100).toFixed(1)}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </div>
);

const StyledDopeTable = styled(DopeTable)`
  height: 640px;
  width: 380px;
  margin-right: 32px;
  border: 2px solid #000;
  background-color: #fff;
  overflow: scroll;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Authenticated = ({ id }: { id: string }) => {
  const { data, error, loading } = useWalletQuery({
    variables: { id: id.toLowerCase() },
  });
  const [selected, setSelected] = useState(0);

  if (!data?.wallet?.bags) {
    return <div>You got no bags homie</div>;
  }

  return (
    <Container>
      <StyledDopeTable
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
};

export default function LootWindow() {
  const { account } = useWeb3React();
  return (
    <AppWindow requiresWalletConnection={true}>
      <Head />
      <Authenticated id={account} />
    </AppWindow>
  );
}
