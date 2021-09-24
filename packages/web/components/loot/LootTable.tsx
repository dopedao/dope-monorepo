import { css } from '@emotion/react';
import { Table, Thead, Tbody, Tr, Th, Td, Tfoot } from '@chakra-ui/react';
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
  data: { id: string; claimed: boolean }[];
  selected: number;
  onSelect: (i: number) => void;
}) => {
  const [sort, setSort] = useState('id');

  const amountOfUnclaimedPaper = (): number => {
    const paperPerToken = 125000;
    let numberUnclaimed = 0;
    for (const item of data) {
      numberUnclaimed = item.claimed ? numberUnclaimed : numberUnclaimed + 1;
    }
    return numberUnclaimed * paperPerToken;
  };
  const formattedUnclaimedPaper = (): string => {
    const formatter = Intl.NumberFormat('en', { notation: 'compact' });
    return formatter.format(amountOfUnclaimedPaper());
  };

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
        <Tfoot>
          <Tr>
            <Th colSpan={3}>
              {items.length} DOPE {items.length > 1 ? 'Tokens' : 'Token'}
              <span
                css={css`
                  padding: 8px;
                  color: #a8a9ae;
                `}
              >
                /
              </span>
              {formattedUnclaimedPaper()} Unclaimed $PAPER
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </div>
  );
};

export default LootTable;
