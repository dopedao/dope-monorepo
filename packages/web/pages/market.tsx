import { Input } from "@chakra-ui/react"
import { useBagsQuery } from '../src/generated/graphql';
import AppWindow from '../components/AppWindow';
import Head from '../components/Head';
import LoadingBlock from '../components/LoadingBlock';
import LootCard from '../components/loot/LootCard';
import styled from '@emotion/styled';
import React from "react";

const title = 'Dope Wars Market';

const Container = styled.div`
  height: 100%;
  padding: 32px;
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
  width: 100%;
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
