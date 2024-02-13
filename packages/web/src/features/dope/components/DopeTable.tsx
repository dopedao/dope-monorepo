import { useMemo, useState } from 'react';
import { css } from '@emotion/react';
import { Table, Thead, Tbody, Tr, Th, Td, Tfoot } from '@chakra-ui/react';
import { media } from 'ui/styles/mixins';
import PanelContainer from 'components/PanelContainer';
import PanelFooter from 'components/PanelFooter';
import Check from 'ui/svg/Check';
import { Dope } from 'generated/graphql';
import { Box } from '@chakra-ui/react';

type DopeTableProps = {
  className?: string;
  data: Pick<Dope, 'id' | 'claimed' | 'opened' | 'rank' | 'items'>[];
  selected: number;
  onSelect: (i: number) => void;
};

const DopeTable = ({ className = '', data, selected, onSelect }: DopeTableProps) => {
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
        .map(({ id, opened, claimed, rank }, idx) => ({
          id,
          rank,
          opened: opened ? (
            ''
          ) : (
            <Check
              css={css`
                display: inline;
              `}
            />
          ),
          claimed: claimed ? (
            ''
          ) : (
            <Check
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
            case 'rank': {
              const rankA = a.rank !== undefined ? a.rank : Number.MAX_VALUE;
              const rankB = b.rank !== undefined ? b.rank : Number.MAX_VALUE;
              return rankA !== null && rankB !== null ? (rankA < rankB ? -1 : 1) : 0;
            }
            default:
              return a.id > b.id ? -1 : 1;
          }
        }),
    [data, sort],
  );

  return (
    <PanelContainer
      className={className}
      css={css`
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
      <Box
        css={css`
          display: flex;
          min-height: 100%;
          flex-direction: column;
          // justify-content: space-around;
          // align-items: stretch;
        `}
      >
        <Table variant="dope">
          <colgroup>
            <col width="25%" />
            <col width="25%" />
            <col width="25%" />
            <col width="25%" />
          </colgroup>
          <Thead>
            <Tr>
              <Th onClick={() => setSort('id')}>Dope ID</Th>
              <Th onClick={() => setSort('rank')}>Rank</Th>
              <Th>Has Paper</Th>
              <Th>Has Gear</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map(({ id, rank, opened, claimed, idx }) => (
              <Tr
                className={selected === idx ? 'selected' : ''}
                key={id}
                onClick={() => onSelect(idx)}
              >
                <Td>{id}</Td>
                <Td>{rank}</Td>
                <Td>{claimed}</Td>
                <Td>{opened}</Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Th colSpan={4}>
              {items.length} DOPE {items.length > 1 ? 'Tokens' : 'Token'}
              <span
                className="separator"
                css={css`
                  padding: 8px;
                  color: rgb(168, 169, 174);
                `}
              >
                /
              </span>
              {formattedUnclaimedPaper()} Unclaimed $PAPER
            </Th>
          </Tfoot>
        </Table>
      </Box>
    </PanelContainer>
  );
};

export default DopeTable;
