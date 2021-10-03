import { useReactiveVar } from '@apollo/client';
import { useEffect, useMemo, useState } from 'react';
import AppWindow from '../components/AppWindow';
import DopeDatabase, {
  filterItemsBySearchString,
  PickedBag,
  DopeDbCacheReactive,
} from '../common/DopeDatabase';
import Head from '../components/Head';
import InfiniteScroll from 'react-infinite-scroller';
import LoadingBlock from '../components/LoadingBlock';
import LootCard from '../components/loot/LootCard';
import MarketFilterBar from '../components/MarketFilterBar';
import styled from '@emotion/styled';

const title = 'Dope Wars Market';

const Container = styled.div`
  // Important the immediate parent container for InfiniteScroll
  // is scrollable so it works properly.
  height: 100%;
  overflow-y: scroll;
  //
  padding: 32px;
  padding-top: 76px;
  .lootGrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    grid-column-gap: 16px;
    grid-row-gap: 16px;
  }
  > .lootCard {
    max-height: 550px;
  }
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

const MarketList = () => {
  const dopeDb = useReactiveVar(DopeDbCacheReactive) as DopeDatabase;
  const sortedItems = dopeDb.itemsSortedByRank();
  const [searchInputValue, setSearchInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const filteredSortedItems = useMemo(
    () => filterItemsBySearchString(sortedItems, searchInputValue),
    [searchInputValue],
  );

  const [visibleItems, setVisibleItems] = useState(filteredSortedItems.slice(0, itemsVisible));

  useEffect(() => {
    itemsVisible = PAGE_SIZE;
    setVisibleItems(filteredSortedItems.slice(0, itemsVisible));
    setIsTyping(false);
  }, [searchInputValue]);

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
        searchChangeCallback={(value: string) => setSearchInputValue(value)}
        searchIsTypingCallback={() => setIsTyping(true)}
      />
      { isTyping && ContentLoading }
      { (!isTyping && visibleItems.length > 0) &&
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
              />
            ))}
          </InfiniteScroll>
        </Container>
      }
      { (!isTyping && visibleItems.length === 0) && ContentEmpty }
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
