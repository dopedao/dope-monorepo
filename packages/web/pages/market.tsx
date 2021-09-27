import { media } from '../styles/mixins';

import { useBagsQuery } from '../src/generated/graphql';
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


// list all items
//    - with opengraph?
//    -
// show scrollable lootcards in react-window
// pull opensea information

export default function Market() {
  const MarketList = () => {
    const { data, loading, error } = useBagsQuery({
      variables: { first: 10, skip: 0 },
    });

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

  return (
    <AppWindow padBody={false}>
      <Head title={title} />
      <MarketList />
    </AppWindow>
  );
}
