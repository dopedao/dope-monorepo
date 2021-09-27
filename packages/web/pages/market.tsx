import { FormControl, FormLabel, Input, Select, Switch } from "@chakra-ui/react"
import { useBagsQuery } from '../src/generated/graphql';
import AppWindow from '../components/AppWindow';
import Head from '../components/Head';
import LoadingBlock from '../components/LoadingBlock';
import LootCard from '../components/loot/LootCard';
import styled from '@emotion/styled';

const title = 'Dope Wars Market';

const Container = styled.div`
  height: 100%;
  padding: 32px;
  padding-top: 76px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  > .lootCard {
  }
`;

const MarketFilterBar = styled.div`
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

// list all items
//    - with opengraph?
//    -
// show scrollable lootcards in react-window
// pull opensea information

export default function Market() {
  const MarketList = () => {
    const { data, loading, error } = useBagsQuery();

    const handleSearchKey = ({ target }: { target: HTMLInputElement }) => {
      const searchPhrase = target.value;
      console.log(searchPhrase);
    }

    if (loading) {
      return (
        <Container>
          <LoadingBlock />
        </Container>
      );
    } else if (!data?.bags || data.bags.length === 0) {
      return (
        <Container>
          <h2>No loot available in the market.</h2>
        </Container>
      );
    } else {
      console.log(data.bags.length);
      return (
        <>

          <MarketFilterBar>
            <Input 
              placeholder="Search for items" 
              size="sm" 
              variant="filterBar" 
              maxWidth="256px"
              onChange={handleSearchKey}
            />
            <Select 
              placeholder="Sale Status"
              size="sm"
              variant="filterBar"
              maxWidth="176px"
            >
              <option>Buy Now</option>
              <option>Auction</option>
              <option>Never Sold</option>
            </Select>
            <Select 
              placeholder="Sort By"
              size="sm"
              variant="filterBar"
              maxWidth="176px"
            >
              <option>Cheapest</option>
              <option>Highest Last Sale</option>
              <option>Most Rare</option>
            </Select>
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="has-paper" mb="0" color="#fff">
                $PAPER
              </FormLabel>
              <Switch id="has-paper" />
            </FormControl>
          </MarketFilterBar>

          <Container>
            {data.bags.map(bag => (
              <LootCard 
                key={`loot-card_${bag.id}`} 
                bag={bag} 
                footer="for-marketplace" 
              />
            ))}
          </Container>
        </>
      );
    }
  };

  return (
    <AppWindow padBody={false}>
      <Head title={title} />
      <MarketList />
    </AppWindow>
  );
}
