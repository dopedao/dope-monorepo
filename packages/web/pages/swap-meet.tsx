import { Bag } from '../src/generated/graphql';
import { DopeDB } from '../components/WrappedApolloProvider';
import { useReactiveVar } from '@apollo/client';
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
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  > .lootCard {
    max-height: 550px;
  }
`;

const handleSearchChange = ({ target }: { target: HTMLInputElement }) => {
  const searchPhrase = target.value;
  console.log(searchPhrase);
  // TODO: Actually search items…
};

const ContentLoading = (
  <Container>
    <LoadingBlock key={1} />
    <LoadingBlock key={2} />
    <LoadingBlock key={3} />
    <LoadingBlock key={4} />
  </Container>
);

const ContentEmpty = (
  <Container>
    <h2>No loot available in the market.</h2>
  </Container>
);

function sortByRank(a: Bag, b: Bag) {
  return a.rank - b.rank;
}

const MarketList = () => {
  const dopeItems = useReactiveVar(DopeDB);

  const cardsToShow = dopeItems.sort(sortByRank).slice(0,50);
  console.log('Rendering MarketList');

  return (
    <>
      <MarketFilterBar handleSearchChange={handleSearchChange} />
      <Container>
        {cardsToShow.map(bag => (
          <LootCard key={`loot-card_${bag.id}`} bag={bag} footer="for-marketplace" />
        ))}
      </Container>
    </>
  );
};

export default function Market() {
  return (
    <AppWindow padBody={false}>
      <Head title={title} />
      <MarketList />
    </AppWindow>
  );
}
