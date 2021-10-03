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
const PAGE_SIZE = 4;
let currentPageSize = PAGE_SIZE;
console.log ("INIT currentPageSize");

const MarketList = () => {
  console.log("MARKET LIST RENDER")

  const dopeDb = useReactiveVar(DopeDbCacheReactive) as DopeDatabase;
  const sortedItems = dopeDb.itemsSortedByRank();
  const [searchInputValue, setSearchInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const filteredSortedItems = useMemo(
    () => filterItemsBySearchString(sortedItems, searchInputValue),
    [searchInputValue],
  );

  const [visibleItems, setVisibleItems] = useState(filteredSortedItems.slice(0, currentPageSize));

  useEffect(() => {
    console.log("Using effect");
    currentPageSize = PAGE_SIZE;
    setVisibleItems(filteredSortedItems.slice(0, currentPageSize));
    setIsTyping(false);
  }, [searchInputValue]);


  const MarketListContent = () => {
    console.log("MARKET LIST CONTENT RENDER");
    // Increasing currentPageSize simply increases the window size
    // into the cached data we render in window.
    const loadNextPage = (page: number) => {
      console.log(`Loading more Items for page ${page}`);
      currentPageSize = (page + 1) * PAGE_SIZE;
      console.log(currentPageSize);
      setVisibleItems(filteredSortedItems.slice(0, currentPageSize));
    };
    
    if (isTyping) return ContentLoading;
    if (visibleItems.length > 0)
      return (
        <Container>
          <InfiniteScroll
            pageStart={0}
            loadMore={loadNextPage}
            hasMore={filteredSortedItems.length > visibleItems.length}
            loader={<LoadingBlock key={`loader_${currentPageSize}`} />}
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
      );

    return ContentEmpty;
  };

  return (
    <>
      <MarketFilterBar
        searchChangeCallback={(value: string) => setSearchInputValue(value)}
        searchIsTypingCallback={() => setIsTyping(true)}
      />
      <MarketListContent />
    </>
  );
};

export default function Market() {
  console.log("===== MARKET RENDER");
  return (
    <AppWindow padBody={false} scrollable={false}>
      <Head title={title} />
      <MarketList />
    </AppWindow>
  );
}
