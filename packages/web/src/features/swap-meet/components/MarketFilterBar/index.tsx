/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Input, Select } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { SearchOrderField } from 'generated/graphql';
import { Container } from './styles';
import { FILTERS } from 'features/swap-meet/modules/MarketList';

const statusKeys = ['All', 'Has Unclaimed $PAPER', 'For Sale', 'Ready To Unpack'];

const sortKeys = [
  {
    label: 'Top Rank',
    value: SearchOrderField.Greatness,
  },
  {
    label: 'Most Affordable',
    value: SearchOrderField.SalePrice,
  },
  {
    label: 'Highest Last Sale',
    value: SearchOrderField.LastSalePrice,
  },
];

type MarketFilterBarProps = {
  setViewCompactCards: Dispatch<SetStateAction<boolean>>;
  setOrderBy: Dispatch<SetStateAction<SearchOrderField>>;
  orderBy: SearchOrderField;
  setFilterBy: Dispatch<SetStateAction<FILTERS>>;
  filterBy: FILTERS;
  compactSwitchOn: boolean;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
};

const MarketFilterBar = ({
  setViewCompactCards,
  compactSwitchOn,
  setOrderBy,
  orderBy,
  handleChange,
  searchValue,
  setFilterBy,
  filterBy,
}: MarketFilterBarProps) => {
  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setOrderBy(value as SearchOrderField);
  };

  const onFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setFilterBy(value as FILTERS);
  };

  const iconPath = '/images/icon';
  const icon = compactSwitchOn ? 'expand' : 'collapse';

  return (
    <Container>
      <div>
        <Input
          placeholder="Search…"
          size="sm"
          variant="filterBar"
          onChange={handleChange}
          value={searchValue}
        />
      </div>
      <div>
        <Select size="sm" variant="filterBar" onChange={onFilterChange} value={filterBy}>
          <option disabled>Status…</option>
          {statusKeys.map((value, index) => (
            <option key={`${value}-${index}`}>{value}</option>
          ))}
        </Select>
      </div>
      <div>
        <Select size="sm" variant="filterBar" onChange={handleSortChange} value={orderBy}>
          <option disabled>Sort By…</option>
          {sortKeys.map(({ label, value }, index) => (
            <option key={`${value}-${index}`} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </div>
      <div
        className="toggleButton"
        css={css`
          min-width: 32px;
          max-width: 32px;
          height: 32px;
          cursor: pointer;
          cursor: hand;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: var(--gray);
          border-radius: 2px !important;
          box-shadow: 'inset -1px -1px 0px rgba(0, 0, 0, 0.25), inset 1px 1px 0px rgba(255, 255, 255, 0.25)';
        `}
        onClick={() => setViewCompactCards(prevState => !prevState)}
      >
        <img alt="toggle" src={`${iconPath}/${icon}.svg`} />
      </div>
    </Container>
  );
};
export default MarketFilterBar;
