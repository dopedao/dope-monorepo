import { useBagsQuery } from '../src/generated/graphql';
import AppWindow from '../components/AppWindow';
import Head from '../components/Head';
import LootCard from '../components/loot/LootCard';
import LoadingBlock from '../components/LoadingBlock';
import styled from '@emotion/styled';

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

// list all items
//    - with opengraph?
//    -
// show scrollable lootcards in react-window
// pull opensea information

export default function Market() {
  const MarketList = () => {
    const { data, loading } = useBagsQuery({});

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
      return (
        <Container>
          {data.bags.map(bag => (
            <LootCard bag={bag} footer="for-marketplace" />
          ))}
        </Container>
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
