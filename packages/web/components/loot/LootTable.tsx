import { css } from '@emotion/react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import rare from 'dope-metrics/output/rare.json';

const rareById: { [name: string]: { rarest: number } } = Object.values(rare).reduce(
  (rareById, rare) => {
    return {
      ...rareById,
      [rare.lootId]: rare,
    };
  },
  {},
);

const LootTable = ({
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
    <div
      className={className}
      css={css`
        border: 2px solid #000;
        background-color: #fff;
        overflow: scroll;
      `}
    >
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

export default LootTable;
