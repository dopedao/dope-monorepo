import { css } from '@emotion/react';
import { media } from '../../styles/mixins';
import { Table, Thead, Tbody, Tr, Th, Td, Tfoot } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import CheckIcon from '../icons/Check';

interface Props {
  className?: string;
  data: { id: string; claimed: boolean; rank: number }[];
  selected: number;
  onSelect: (i: number) => void;
}

const LootTable = ({ className = '', data, selected, onSelect }: Props) => {
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
        .map(({ id, claimed, rank }, idx) => ({
          id,
          rank,
          claimed: claimed ? (
            ''
          ) : (
            <CheckIcon
              css={css`
                display: inline;
              `}
            />
          ),
          idx,
        }))
        .sort((a, b) => {
          switch (sort) {
            case 'id':
              return a.id < b.id ? -1 : 1;
            case 'rank':
              return a.rank < b.rank ? -1 : 1;
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
        tfoot th {
          // Screen > Tablet display items side by side
          span.separator {
            display: block;
            height: 0;
            margin: 0;
            padding: 0;
            overflow: hidden;
            ${media.tablet`
              display: inline;
              font-size: var(--text-00);
              height: auto;
              padding: 8px;
              color: #a8a9ae;
            `}
          }
        }
      `}
    >
      <Table variant="dope">
        <colgroup>
          <col width="25%" />
          <col width="25%" />
          {/* <col width="25%" /> */}
          <col width="25%" />
        </colgroup>
        <Thead>
          <Tr>
            <Th onClick={() => setSort('id')}>Dope ID</Th>
            <Th onClick={() => setSort('rank')}>Rank</Th>
            {/* <Th onClick={() => setSort('percentile')}>Percent</Th> */}
            <Th>Paper?</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map(({ id, rank, claimed, idx }) => (
            <Tr
              className={selected === idx ? 'selected' : ''}
              key={id}
              onClick={() => onSelect(idx)}
            >
              <Td>{id}</Td>
              <Td>{rank}</Td>
              <Td>{claimed}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th colSpan={3}>
              {items.length} DOPE {items.length > 1 ? 'Tokens' : 'Token'}
              <span className="separator">/</span>
              {formattedUnclaimedPaper()} Unclaimed $PAPER
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </div>
  );
};

export default LootTable;
