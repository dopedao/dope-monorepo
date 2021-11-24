/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, useEffect, useState } from 'react';
import { Input, Select } from '@chakra-ui/react';
import { media } from 'styles/mixins';
import { useDebounce } from 'usehooks-ts';
import { css } from '@emotion/react';
import useQueryParam from 'src/use-query-param';
import styled from '@emotion/styled';

export const statusKeys = ['All', 'Has Unclaimed $PAPER', 'For Sale', 'Ready To Unpack'];

export const sortKeys = ['Top Rank', 'Most Affordable', 'Highest Last Sale'];

const Container = styled.div`
  padding: 8px;
  background-color: #878783;
  border-bottom: 1px solid #434345;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 8px;

  > * {
    flex: 1 1 25%;
  }
  div:first-of-type {
    flex: 1 1 100%;
  }

  ${media.tablet`
    height: 52px;
    flex-flow: row nowrap;
    gap: 16px;
    > * {
      flex: 1;
    }
    div:first-of-type {
      flex: 1;
    }
  `}

  input,
  select,
  div.toggleButton {
    border-collapse: collapse;
    height: 32px;
    border-radius: 0;
    border: 1px solid #000;
    white-space: nowrap;
  }
`;

interface Props {
  compactViewCallback(toggle: boolean): void;
  searchCallback(value: string): void;
  searchIsTypingCallback(): void;
  sortByCallback(value: string): void;
  statusCallback(value: string): void;
  compactSwitchOn: boolean;
}

const MarketFilterBar = ({
  compactViewCallback,
  searchCallback,
  searchIsTypingCallback,
  compactSwitchOn,
  sortByCallback,
  statusCallback,
}: Props) => {
  const [sortBy, setSortBy] = useQueryParam('sort_by', sortKeys[0]);
  const [status, setStatus] = useQueryParam('status', statusKeys[0]);
  const [searchValue, setSearchValue] = useQueryParam('q', '');

  // Debounce hook lets us fill search string on type, but not do anything
  // until debounced value gets changed.
  const debouncedSearchValue = useDebounce<string>(searchValue, 250);

  useEffect(() => {
    searchCallback(debouncedSearchValue);
  }, [debouncedSearchValue, searchCallback]);

  useEffect(() => {
    console.log('Setting initial states on Swap Meet from query params');
    statusCallback(status);
    sortByCallback(sortBy);
  }, [sortBy, sortByCallback, status, statusCallback]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    searchIsTypingCallback();
  };

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setStatus(value);
    statusCallback(value);
  };

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSortBy(value);
    sortByCallback(value);
  };

  const ToggleButton = () => {
    const iconPath = '/images/icon';
    const icon = compactSwitchOn ? 'expand' : 'collapse';
    return (
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
        onClick={() => compactViewCallback(!compactSwitchOn)}
      >
        <img alt="toggle" src={`${iconPath}/${icon}.svg`} />
      </div>
    );
  };

  return (
    <Container>
      <div>
        <Input
          placeholder="Search…"
          size="sm"
          variant="filterBar"
          onChange={handleSearchChange}
          value={searchValue}
        />
      </div>
      <div>
        <Select size="sm" variant="filterBar" onChange={handleStatusChange} value={status}>
          <option disabled>Status…</option>
          {statusKeys.map((value, index) => (
            <option key={`${value}-${index}`}>{value}</option>
          ))}
        </Select>
      </div>
      <div>
        <Select size="sm" variant="filterBar" onChange={handleSortChange} value={sortBy}>
          <option disabled>Sort By…</option>
          {sortKeys.map((value, index) => (
            <option key={`${value}-${index}`}>{value}</option>
          ))}
        </Select>
      </div>
      <ToggleButton />
    </Container>
  );
};
export default MarketFilterBar;
