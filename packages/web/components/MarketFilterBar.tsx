import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { FormControl, FormLabel, Input, Select, Switch } from '@chakra-ui/react';
import { media } from '../styles/mixins';
import { useDebounce } from 'usehooks-ts';

import styled from '@emotion/styled';

const Container = styled.div`
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  z-index: 100;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  gap: 8px;

  ${media.tablet`
    height: 52px;
    flex-flow: row nowrap;
    gap: 16px;
  `}

  input,
  select {
    border-collapse: collapse;
    height: 32px;
    border-radius: 0;
    border: 1px solid #000;
    white-space: nowrap;
  }
`;

interface Props {
  searchCallback(value: string): void;
  sortByCallback(value: string): void;
  statusCallback(value: string): void;
  compactViewCallback(toggle: boolean): void;
  searchIsTypingCallback(): void;
}

const MarketFilterBar = ({
  searchCallback,
  searchIsTypingCallback,
  sortByCallback,
  statusCallback,
  compactViewCallback,
}: Props) => {
  const [searchInputValue, setSearchInputValue] = useState<string>('');

  // Debounce hook lets us fill search string on type, but not do anything
  // until debounced value gets changed.
  const debouncedSearchInputValue = useDebounce<string>(searchInputValue, 150);

  useEffect(() => {
    searchCallback(debouncedSearchInputValue);
  }, [debouncedSearchInputValue]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchInputValue(value);
    searchIsTypingCallback();
  };

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    // console.log(`Status: ${value}`);
    statusCallback(value);
  };

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    // console.log(`Sort By: ${value}`);
    sortByCallback(value);
  };

  const handleViewToggle = (event: ChangeEvent<HTMLInputElement>) => {
    const toggle = event.target.checked;
    // console.log(toggle);
    compactViewCallback(toggle);
  };

  return (
    <Container>
      <Input placeholder="Search…" size="sm" variant="filterBar" onChange={handleSearchChange} />
      <Select size="sm" variant="filterBar" defaultValue="All" onChange={handleStatusChange}>
        <option disabled>Status…</option>
        <option>All</option>
        <option>Has Unclaimed $PAPER</option>
        <option>For Sale</option>
      </Select>
      <Select size="sm" variant="filterBar" defaultValue="Top Rank" onChange={handleSortChange}>
        <option disabled>Sort By…</option>
        <option>Top Rank</option>
        <option>Most Affordable</option>
        <option>Most Expensive</option>
        <option>Highest Last Sale</option>
      </Select>
      <FormControl display="flex" alignItems="center" width="auto">
        <FormLabel htmlFor="compact-view" mb="0" color="#fff" fontSize="sm">
          Compact
        </FormLabel>
        <Switch id="compact-view" onChange={handleViewToggle} />
      </FormControl>
    </Container>
  );
};
export default MarketFilterBar;
