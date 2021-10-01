import { FormControl, FormLabel, Input, Select, Switch } from '@chakra-ui/react';
import styled from '@emotion/styled';

const Container = styled.div`
  height: 52px;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  z-index: 100;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  gap: 16px;
  input,
  select {
    border-collapse: collapse;
    height: 32px;
    border-radius: 0;
    border: 1px solid #000;
  }
`;

interface Props {
  handleSearchChange({ target: HTMLInputElement }: { target: any }): void;
}

const MarketFilterBar = ({ handleSearchChange }: Props) => {
  return (
    <Container>
      <Input
        placeholder="Search…"
        size="sm"
        variant="filterBar"
        maxWidth="256px"
        onChange={handleSearchChange}
      />
      <Select size="sm" variant="filterBar" maxWidth="256px" defaultValue="All">
        <option disabled>Sale Status…</option>
        <option>All</option>
        <option disabled>Buy Now</option>
        <option disabled>Auction</option>
        {/* <option>Never Sold</option> */}
      </Select>
      <Select size="sm" variant="filterBar" maxWidth="256px" defaultValue="Top Rank">
        <option disabled>Sort By…</option>
        <option>Top Rank</option>
        <option disabled>Most Affordable</option>
        <option disabled>Most Expensive</option>
        <option disabled>Highest Last Sale</option>
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
