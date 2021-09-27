import { FormControl, FormLabel, Input, Select, Switch } from "@chakra-ui/react"
import styled from '@emotion/styled';

const Container = styled.div`
  height: 52px;
  padding: 8px;
  background-color: rgba(0,0,0,0.8);
  position: fixed;
  z-index: 100;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  gap: 16px;
  input, select {
    border-collapse: collapse;
    height: 32px;
    border-radius: 0;
    border: 1px solid #000;
  }
`;

interface Props {
  handleSearchKey(): void;
}

const MarketFilterBar = ({handleSearchKey}: Props) => {
  return (
    <Container>
        <Input 
        placeholder="Search for items" 
        size="sm" 
        variant="filterBar" 
        maxWidth="256px"
        onChange={handleSearchKey}
      />
      <Select 
        size="sm"
        variant="filterBar"
        maxWidth="256px"
      >
        <option selected disabled>Sale Status…</option>
        <option>All</option>
        <option>Buy Now</option>
        <option>Auction</option>
        <option>Never Sold</option>
      </Select>
      <Select 
        size="sm"
        variant="filterBar"
        maxWidth="256px"
      >
        <option selected disabled>Sort By…</option>
        <option>Most Affordable</option>
        <option>Most Rare</option>
        <option>Highest Last Sale</option>
      </Select>
      <FormControl display="flex" alignItems="center" width="auto">
        <FormLabel htmlFor="has-paper" mb="0" color="#fff" fontSize="sm">
          $PAPER
        </FormLabel>
        <Switch id="has-paper" />
      </FormControl>
    </Container>
  );

}
export default MarketFilterBar;