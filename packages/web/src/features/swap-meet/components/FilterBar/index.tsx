/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';
import {
  Box,
  Stack,
  Button,
  InputGroup,
  InputRightElement,
  Input,
  Image,
  Select,
} from '@chakra-ui/react';
import { SearchOrderField, OrderDirection } from 'generated/graphql';
import { Container } from './styles';
import useQueryParam from 'hooks/useQueryParam';
import { useDebounce } from 'usehooks-ts';

export const FILTER_KEYS = {
  Dope: ['All', 'For Sale', 'Has Unclaimed Gear'],
  Hustlers: ['All', 'For Sale', 'OG'],
  Gear: [
    'All',
    'For Sale',
    'Weapon',
    'Vehicle',
    'Drugs',
    'Clothes',
    'Hand',
    'Waist',
    'Foot',
    'Neck',
    'Ring',
  ],
};
export type FilterKeyType = (typeof FILTER_KEYS)[keyof typeof FILTER_KEYS][number];
const allFilterKeys: FilterKeyType[] = Object.values(FILTER_KEYS).flatMap(keys => keys);

const splitChar = '-';

const sortKeys = [
  {
    label: 'Top Rank',
    value: `${SearchOrderField.Greatness}${splitChar}DESC`,
  },
  {
    label: 'Least Expensive',
    value: `${SearchOrderField.SalePrice}${splitChar}ASC`,
  },
  {
    label: 'Most Expensive',
    value: `${SearchOrderField.SalePrice}${splitChar}DESC`,
  },
];

const getSortFieldAndDirection = (v: string) => {
  const [field, direction] = v.split(splitChar);
  return [field, direction];
};

type DopeFilterBarProps = {
  setOrderBy: Dispatch<SetStateAction<SearchOrderField>>;
  orderBy: SearchOrderField;
  setOrderDirection: Dispatch<SetStateAction<OrderDirection>>;
  orderDirection: OrderDirection;
  setFilterBy: Dispatch<SetStateAction<FilterKeyType>>;
  filterBy: FilterKeyType;
  setSearchValue: Dispatch<SetStateAction<string>>;
  filterKeys: FilterKeyType[];
  children?: React.ReactNode;
};

const FilterBar = ({
  setOrderBy,
  orderBy,
  setOrderDirection,
  orderDirection,
  setFilterBy,
  filterBy,
  setSearchValue,
  filterKeys,
  children,
}: DopeFilterBarProps) => {
  const [field, direction] = getSortFieldAndDirection(sortKeys[1].value);
  const [sortBy, setSortBy] = useQueryParam('sort_by', field);
  const [sortDirection, setSortDirection] = useQueryParam('sort_direction', direction);

  const [status, setStatus] = useQueryParam('status', filterKeys[1]);
  const [searchValueParam, setSearchValueParam] = useQueryParam('q', '');

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValueParam(value);
    setSearchValue(value);
  };

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setStatus(value);
    setFilterBy(status as FilterKeyType);
  };

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    // ! isn't a char that should be in our strings so good to split on
    const [field, direction] = getSortFieldAndDirection(event.target.value);
    setFilterBy(field as FilterKeyType);
    setOrderBy(field as SearchOrderField);
    setOrderDirection(direction as OrderDirection);
  };

  // To map our settings here and bubble them up
  useEffect(() => {
    console.log(status, sortBy, sortDirection);
    setFilterBy(status as FilterKeyType);
    setOrderBy(sortBy as SearchOrderField);
    setOrderDirection(sortDirection as OrderDirection);
  }, [sortBy, setOrderBy, status, setFilterBy, setOrderDirection, sortDirection]);

  const debouncedSearchValue = useDebounce<string>(searchValueParam, 250);
  useEffect(() => {
    setSearchValue(debouncedSearchValue);
  }, [debouncedSearchValue, setSearchValue]);

  return (
    <Stack
      margin="0"
      spacing="8px"
      width="100%"
      padding="16px"
      background="white"
      borderBottom="2px solid black"
      direction={['column', 'column', 'row']}
      zIndex={100}
    >
      <Container>
        <InputGroup>
          <Input
            className="search"
            placeholder="Search…"
            size="sm"
            onChange={handleSearchChange}
            value={searchValueParam}
            _focus={{ boxShadow: '0' }}
          />
          {searchValueParam !== '' && (
            <InputRightElement height="100%">
              <Image
                width="16px"
                src="/images/icon/circle-clear-input.svg"
                alt="Search"
                onClick={() => setSearchValueParam('')}
                cursor="pointer"
              />
            </InputRightElement>
          )}
        </InputGroup>
        <Box>
          <Select
            className="status"
            size="sm"
            onChange={handleStatusChange}
            value={filterBy}
            fontSize="xs"
          >
            <option disabled>Status…</option>
            {filterKeys.map((value, index) => (
              <option key={value}>{value}</option>
            ))}
          </Select>
        </Box>
        <Box>
          <Select
            size="sm"
            fontSize="xs"
            onChange={handleSortChange}
            value={`${orderBy}${splitChar}${orderDirection}`}
          >
            <option disabled>Sort By…</option>
            {sortKeys.map(({ label, value }, index) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </Box>
      </Container>
      {/* allow for custom buttons passed in */}
      {children}
    </Stack>
  );
};
export default FilterBar;
