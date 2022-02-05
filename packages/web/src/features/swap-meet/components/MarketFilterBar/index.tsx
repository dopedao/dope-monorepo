/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';
import { Input, Select } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { SearchOrderField } from 'generated/graphql';
import { Container } from './styles';
import { FILTERS } from 'features/swap-meet/modules/MarketList';
import useQueryParam from 'hooks/use-query-param';
import { useDebounce } from 'usehooks-ts';

const statusKeys = ['All', 'For Sale', 'Has Unclaimed Gear', 'Has Unclaimed $PAPER'];

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
  setSearchValue: Dispatch<SetStateAction<string>>;
};

const MarketFilterBar = ({
  setViewCompactCards,
  setOrderBy,
  orderBy,
  setFilterBy,
  filterBy,
  compactSwitchOn,
  setSearchValue,
}: MarketFilterBarProps) => {
  const [sortBy, setSortBy] = useQueryParam('sort_by', sortKeys[0].value);
  const [status, setStatus] = useQueryParam('status', statusKeys[0]);
  const [searchValueParm, setSearchValueParam] = useQueryParam('q', '');

  const debouncedSearchValue = useDebounce<string>(searchValueParm, 250);

  useEffect(() => {
    setSearchValue(debouncedSearchValue);
  }, [debouncedSearchValue, setSearchValue]);

  useEffect(() => {
    setFilterBy(status as FILTERS);
    setOrderBy(sortBy as SearchOrderField);
  }, [sortBy, setOrderBy, status, setFilterBy]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValueParam(value);
    setSearchValue(value);
  };

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setStatus(value);
    setFilterBy(status as FILTERS);
  };

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSortBy(value);
    setFilterBy(value as FILTERS);
  };

  const iconPath = '/images/icon';
  const icon = compactSwitchOn ? 'expand' : 'collapse';

  return (
    <Container>
      <div>
        <Input
          className="search"
          placeholder="Search…"
          size="sm"
          variant="filterBar"
          onChange={handleSearchChange}
          value={searchValueParm}
        />
      </div>
      <div>
        <Select
          className="status"
          size="sm"
          variant="filterBar"
          onChange={handleStatusChange}
          value={filterBy}
        >
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
      <div className="toggleButton" onClick={() => setViewCompactCards(prevState => !prevState)}>
        <img alt="toggle" src={`${iconPath}/${icon}.svg`} />
      </div>
    </Container>
  );
};
export default MarketFilterBar;
