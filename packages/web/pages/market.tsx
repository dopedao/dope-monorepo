import { media } from '../styles/mixins';
import { useBagsQuery } from '../src/generated/graphql';
import { useState } from 'react';
import AppWindow from '../components/AppWindow';
import Head from '../components/Head';
import LoadingBlock from '../components/LoadingBlock';
import LootCard from '../components/loot/LootCard';
import MarketFilterBar from '../components/MarketFilterBar';
import styled from '@emotion/styled';

const title = 'Dope Wars Market';

const Container = styled.div`
  height: 100%;
  padding: 32px;
  padding-top: 76px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  ${media.tablet`
    grid-template-columns: repeat(2, 1fr);
  `}
  ${media.laptop`
    grid-template-columns: repeat(3, 1fr);
  `}
  ${media.desktop`
    grid-template-columns: repeat(3, 1fr);
  `}
  > .lootCard {
  }
`;

const handleSearchKey = ({ target }: { target: HTMLInputElement }) => {
  const searchPhrase = target.value;
  console.log(searchPhrase);
}

const ContentLoading = (
  <Container><LoadingBlock /></Container>
)
;
const ContentEmpty = (
  <Container>
    <h2>No loot available in the market.</h2>
  </Container>
);

const MarketList = () => {
  const { data, loading, error } = useBagsQuery({
    variables: { first: 10, skip: 0 },
  });
  
  if (loading) {
    return ContentLoading;
  } else if (!data?.bags || data.bags.length === 0) {
    return ContentEmpty;
  } else {
    console.log(data.bags.length);
    return (
      <>
        <MarketFilterBar handleSearchKey={handleSearchKey} />
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

export default function Market() {

  return (
    <AppWindow padBody={false}>
      <Head title={title} />
      <MarketList />
    </AppWindow>
  );
}
