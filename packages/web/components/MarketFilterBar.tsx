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
  searchIsTypingCallback(): void;
}

const MarketFilterBar = ({ searchCallback, searchIsTypingCallback, sortByCallback }: Props) => {
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

  const handleSaleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    console.log(`Status: ${value}`);
  };

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    console.log(`Sort By: ${value}`);
    sortByCallback(value);
  };

  return (
    <Container>
      <Input
        placeholder="Search…"
        size="sm"
        variant="filterBar"
        onChange={handleSearchChange}
      />
      <Select 
        size="sm" 
        variant="filterBar" 
        defaultValue="All"
        onChange={handleSaleStatusChange}
      >
        <option disabled>Sale Status…</option>
        <option>All</option>
        <option>For Sale</option>
        {/* <option>Never Sold</option> */}
      </Select>
      <Select 
        size="sm" 
        variant="filterBar" 
        defaultValue="Top Rank"
        onChange={handleSortChange}
      >
        <option disabled>Sort By…</option>
        <option>Top Rank</option>
        <option>Most Affordable</option>
        <option>Most Expensive</option>
        <option>Highest Last Sale</option>
      </Select>
      {/* <FormControl display="flex" alignItems="center" width="auto">
        <FormLabel htmlFor="has-paper" mb="0" color="#fff" fontSize="sm">
          $PAPER
        </FormLabel>
        <Switch id="has-paper" />
      </FormControl> */}
    </Container>
  );
};
export default MarketFilterBar;
