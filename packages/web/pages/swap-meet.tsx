import { Bag } from '../src/generated/graphql';
import { useReactiveVar } from '@apollo/client';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import AppWindow from '../components/AppWindow';
import DopeDatabase, { DopeDbCacheReactive } from '../common/DopeDatabase';
import Head from '../components/Head';
import InfiniteScroll from 'react-infinite-scroller';
import LoadingBlock from '../components/LoadingBlock';
import LootCard from '../components/loot/LootCard';
import MarketFilterBar from '../components/MarketFilterBar';
import styled from '@emotion/styled';

const title = 'Dope Wars Market';

const Container = styled.div`
  height: 100%;
  padding: 32px;
  padding-top: 76px;
  overflow-y: scroll;
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
let currentPageSize = PAGE_SIZE;

const filterItemsBySearchString = (items: Partial<Bag>[], searchString: string) => {
  if (searchString === '') return items;
  console.log(`filtering: ${searchString}`);
  const lowerSearchString = searchString.toLowerCase();
  const filteredItems = items.filter(
    obj => Object.keys(obj).some(
      key => obj[key as keyof Bag].toString().toLowerCase().includes(lowerSearchString)
    )
  );
  return filteredItems;
}

let renderCount = 0;

const MarketList = () => {
  console.log(`Rendering Swap Meet: ${renderCount++}`);
  const dopeDb = useReactiveVar(DopeDbCacheReactive) as DopeDatabase;
  const sortedItems = dopeDb.itemsSortedByRank();

  const [itemSearchString, setItemSearchString] = useState<string>('');
  // Debounce hook lets us fill search string on type, but not do anything
  // until debounced value gets changed.
  const debouncedItemSearchString = useDebounce<string>(itemSearchString, 300);
  const filteredSortedItems = useMemo(
    () => filterItemsBySearchString(sortedItems, debouncedItemSearchString),
    [debouncedItemSearchString]
  );

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setItemSearchString(value);
  };

  const [visibleItems, setVisibleItems] = useState(filteredSortedItems.slice(0, currentPageSize));


  useEffect(() => {
    currentPageSize = PAGE_SIZE;
    setVisibleItems(filteredSortedItems.slice(0, currentPageSize));
  }, [debouncedItemSearchString])

  // Increasing currentPageSize simply increases the window size
  // into the cached data we render in window.
  const loadNextPage = (page: number) => {
    console.log('Loading more Items');
    currentPageSize = (page + 1) * PAGE_SIZE;
    setVisibleItems(filteredSortedItems.slice(0, currentPageSize));
    console.log(currentPageSize);
  };

  return (
    <>
      <MarketFilterBar handleSearchChange={handleSearchChange} />
      { visibleItems.length === 0 && ContentEmpty }
      { visibleItems.length > 0 &&
        <Container>
          <InfiniteScroll
            pageStart={0}
            loadMore={loadNextPage}
            hasMore={sortedItems.length > visibleItems.length}
            loader={<LoadingBlock key={`loader_${currentPageSize}`} />}
            useWindow={false}
            className="lootGrid"
          >
            {visibleItems.map((bag: Partial<Bag>) => (
              <LootCard key={`loot-card_${bag.id}`} bag={bag} footer="for-marketplace" />
            ))}
          </InfiniteScroll>
        </Container>
      }
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
