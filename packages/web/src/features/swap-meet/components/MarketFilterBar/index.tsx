/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';
import { Stack, Button, Input, Image, Select } from '@chakra-ui/react';
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
  const [sortBy, setSortBy] = useQueryParam('sort_by', sortKeys[1].value);
  const [status, setStatus] = useQueryParam('status', statusKeys[2]);
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
    <Stack
      margin="0"
      gridGap={1}
      width="100%"
      padding="16px"
      background="white"
      borderBottom="2px solid black"
      direction={['column', 'column', 'row']}
    >
      <a href="https://dope-wars.notion.site/dope-wars/Dope-Wiki-e237166bd7e6457babc964d1724befb2#d97ecd4b61ef4189964cd67f230c91c5" target="wiki">
        <Button fontSize="xs">DOPE NFT FAQ</Button>
      </a>
      <Container>
        <div>
          <Input
            className="search"
            placeholder="Search…"
            size="sm"
            onChange={handleSearchChange}
            value={searchValueParm}
          />
        </div>
        <div>
          <Select
            className="status"
            size="sm"
            onChange={handleStatusChange}
            value={filterBy}
            fontSize="xs"
          >
            <option disabled>Status…</option>
            {statusKeys.map((value, index) => (
              <option key={`${value}-${index}`}>{value}</option>
            ))}
          </Select>
        </div>
        <div>
          <Select
            size="sm"
            fontSize="xs"
            onChange={handleSortChange}
            value={orderBy}
          >
            <option disabled>Sort By…</option>
            {sortKeys.map(({ label, value }, index) => (
              <option key={`${value}-${index}`} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </div>
        <Button 
          className="toggleButton" 
          onClick={() => setViewCompactCards(prevState => !prevState)}
        >
          <Image alt="toggle" src={`${iconPath}/${icon}.svg`} />
        </Button>
      </Container>
    </Stack>
  );
};
export default MarketFilterBar;
