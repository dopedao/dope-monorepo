import { useMemo, useState } from 'react';
import { css } from '@emotion/react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { media } from 'styles/mixins';
import PanelContainer from 'components/PanelContainer';
import Check from 'svg/Check';

type DopeTableProps = {
  className?: string;
  data: {
    id: string;
    claimed: boolean;
    opened: boolean;
    rank: number;
  }[];
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
            case 'rank':
              return a.rank < b.rank ? -1 : 1;
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
      <div
        css={css`
          display: flex;
          min-height: 100%;
          flex-direction: column;
          align-items: stretch;
        `}
      >
        <div
          css={css`
            flex-grow: 1;
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
                <Th>Paper</Th>
                <Th>Bundled</Th>
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
          </Table>
        </div>
        <div
          css={css`
            position: sticky;
            bottom: 0;
            cursor: pointer;
            background: rgb(222, 222, 221);
          `}
        >
          <div
            css={css`
              border-top: 2px solid rgb(0, 0, 0);
              height: 44px;
              padding: 10px 16px;
              text-align: center;
              vertical-align: middle;
              text-transform: uppercase;
              font-weight: 600;
              font-size: 0.9em;
            `}
          >
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
          </div>
        </div>
      </div>
    </PanelContainer>
  );
};

export default DopeTable;
