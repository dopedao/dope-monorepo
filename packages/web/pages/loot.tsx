import { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { useWeb3React } from '@web3-react/core';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import rare from 'dope-metrics/output/rare.json';

import { useWalletQuery } from '../src/generated/graphql';

import Head from '../components/head';
import LootCard from '../components/LootCard';
import AppWindow from '../components/AppWindow';

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
  data: { id: string }[];
  selected: number;
  onSelect: (i: number) => void;
}) => {
  const [sort, setSort] = useState('id');

  const items = useMemo(
    () =>
      data
        .map(({ id }, idx) => ({
          id,
          rank: rareById[id].rarest,
          percentile: ((1 - rareById[id].rarest / 8000) * 100).toFixed(1),
          idx,
        }))
        .sort((a, b) => {
          switch (sort) {
            case 'id':
              return a.id < b.id ? -1 : 1;
            case 'rank':
              return a.rank < b.rank ? -1 : 1;
            case 'percentile':
              return a.percentile > b.percentile ? -1 : 1;
            default:
              return a.id > b.id ? -1 : 1;
          }
        }),
    [data, sort],
  );

  return (
    <div className={className}>
      <Table variant="dope">
        <Thead>
          <Tr>
            <Th onClick={() => setSort('id')}>Dope ID</Th>
            <Th onClick={() => setSort('rank')}>Rank</Th>
            <Th onClick={() => setSort('percentile')}>Percentile</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map(({ id, rank, percentile, idx }) => (
            <Tr
              className={selected === idx ? 'selected' : ''}
              key={id}
              onClick={() => onSelect(idx)}
            >
              <Td>{id}</Td>
              <Td>{rank}</Td>
              <Td>{percentile}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

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
  const { data } = useWalletQuery({
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
      {/* eslint-disable-next-line */}
      <Authenticated id={account!} />
    </AppWindow>
  );
}
