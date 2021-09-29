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

const handleSearchChange = ({ target }: { target: HTMLInputElement }) => {
  const searchPhrase = target.value;
  console.log(searchPhrase);
  // TODO: Actually search items…
};

const ContentLoading = (
  <Container>
    <LoadingBlock />
    <LoadingBlock />
    <LoadingBlock />
    <LoadingBlock />
  </Container>
);

const ContentEmpty = (
  <Container>
    <h2>No loot available in the market.</h2>
  </Container>
);

const MarketList = () => {
  const { data, loading, error } = useBagsQuery({
    variables: { first: 10, last_id: '0' },
  });

  if (loading) return ContentLoading;
  if (!data?.bags || data.bags.length === 0) return ContentEmpty;

  return (
    <>
      <MarketFilterBar handleSearchChange={handleSearchChange} />
      <Container>
        {data.bags.map(bag => (
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
