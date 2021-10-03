import { media } from '../styles/mixins';
import { useAllUnclaimedBagsQuery } from '../src/generated/graphql';
import { useEffect, useMemo, useState } from 'react';
import { useReactiveVar } from '@apollo/client';
import AppWindow from '../components/AppWindow';
import Head from '../components/Head';
import InfiniteScroll from 'react-infinite-scroller';
import LoadingBlock from '../components/LoadingBlock';
import LootCard from '../components/loot/LootCard';
import MarketFilterBar from '../components/MarketFilterBar';
import styled from '@emotion/styled';
import DopeDatabase, {
  compareByHighestLastSale,
  compareByMostAffordable,
  compareByMostExpensive,
  compareByRank,
  DopeDbCacheReactive,
  filterItemsBySearchString,
  testForUnclaimedPaper,
  testForSale,
  PickedBag,
} from '../common/DopeDatabase';

const title = 'Dope Wars Market';

// To prevent all 8k items from showing at once and overloading
// the DOM we fake loading more using infinite scroll.
//
// Could have used a virtual window, but those implementations
// were too complicated and didn't render well with this CSS layout.
//
// The infinite scroll approach will fit better with
// returning DOPE + Stockpile items via API at some point in the future.
const PAGE_SIZE = 24;
let itemsVisible = PAGE_SIZE;

const Container = styled.div`
  // Important the immediate parent container for InfiniteScroll
  // is scrollable so it works properly.
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  //
  padding: 64px 8px;
  .lootGrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    grid-column-gap: 16px;
    grid-row-gap: 16px;
  }
  .lootCard {
    max-height: 500px;
  }
  .lootCard.compact {
    max-height: 225px;
  }
  ${media.tablet`
    padding: 76px 32px;
  `}
`;
const ContentLoading = (
  <Container>
    <LoadingBlock />
  </Container>
);
const ContentEmpty = (
  <Container>
    <h2>Can't find what you're looking for…</h2>
  </Container>
);

// Values here are set in MarketFilterBar.
// TODO: DRY this up…
const getItemComparisonFunction = (key: string) => {
  console.log(`Sorting: ${key}`);
  switch (key) {
    case 'Most Affordable':
      return compareByMostAffordable;
    case 'Most Expensive':
      return compareByMostExpensive;
    case 'Highest Last Sale':
      return compareByHighestLastSale;
    default:
      return compareByRank;
  }
};
const getStatusTestFunction = (key: string) => {
  console.log(`Filter for: ${key}`);
  switch (key) {
    case 'Has Unclaimed $PAPER':
      return testForUnclaimedPaper;
    case 'For Sale':
      return testForSale;
    default:
      return () => true;
  }
};

const MarketList = () => {
  const [searchInputValue, setSearchInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sortByKey, setSortByKey] = useState('');
  const [statusKey, setStatusKey] = useState('');
  const [viewCompactCards, setViewCompactCards] = useState(false);
  const dopeDb = useReactiveVar(DopeDbCacheReactive) as DopeDatabase;

  // Loads unclaimed $paper status from The Graph,
  // then updates items in reactive var cache.
  const { data: dataBags } = useAllUnclaimedBagsQuery();
  if (dataBags && dataBags.page_1) {
    dopeDb.updateHasPaperFromQuery(dataBags);
    DopeDbCacheReactive(dopeDb);
  }

  const filteredSortedItems = useMemo(() => {
    const sortedItems = dopeDb.items.sort(getItemComparisonFunction(sortByKey));
    const filteredItems = sortedItems.filter(getStatusTestFunction(statusKey));
    return filterItemsBySearchString(filteredItems, searchInputValue);
  }, [searchInputValue, sortByKey, statusKey]);

  const [visibleItems, setVisibleItems] = useState(filteredSortedItems.slice(0, itemsVisible));

  // Search text change
  useEffect(() => {
    itemsVisible = PAGE_SIZE;
    setVisibleItems(filteredSortedItems.slice(0, itemsVisible));
    setIsTyping(false);
  }, [searchInputValue, sortByKey, statusKey]);

  // Increasing itemsVisible simply increases the window size
  // into the cached data we render in window.
  const loadNextPage = (page: number) => {
    itemsVisible = (page + 1) * PAGE_SIZE;
    console.log(`page: ${page}\nitemsVisible: ${itemsVisible}`);
    setVisibleItems(filteredSortedItems.slice(0, itemsVisible));
  };

  return (
    <>
      <MarketFilterBar
        searchCallback={(value: string) => setSearchInputValue(value)}
        sortByCallback={(key: string) => setSortByKey(key)}
        statusCallback={(key: string) => setStatusKey(key)}
        compactViewCallback={(toggle: boolean) => setViewCompactCards(toggle)}
        searchIsTypingCallback={() => setIsTyping(true)}
      />
      {isTyping && ContentLoading}
      {!isTyping && visibleItems.length > 0 && (
        <Container>
          <InfiniteScroll
            pageStart={0}
            loadMore={loadNextPage}
            hasMore={filteredSortedItems.length > visibleItems.length}
            loader={<LoadingBlock key={`loader_${itemsVisible}`} />}
            useWindow={false}
            className="lootGrid"
          >
            {visibleItems.map((bag: PickedBag) => (
              <LootCard
                key={`loot-card_${bag.id}`}
                bag={bag}
                footer="for-marketplace"
                searchText={searchInputValue}
                className={viewCompactCards ? 'compact' : ''}
              />
            ))}
          </InfiniteScroll>
        </Container>
      )}
      {!isTyping && visibleItems.length === 0 && ContentEmpty}
    </>
  );
};

export default function Market() {
  return (
    <AppWindow padBody={false} scrollable={false}>
      <Head title={title} />
      <MarketList />
    </AppWindow>
  );
}
