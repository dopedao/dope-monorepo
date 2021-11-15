import { isTouchDevice } from 'src/utils';
import { media } from 'styles/mixins';
import { useAllUnclaimedBagsQuery, useWalletQuery } from 'src/generated/graphql';
import { useEffect, useMemo, useState } from 'react';
import { useReactiveVar } from '@apollo/client';
import DopeWarsExeNav from 'components/DopeWarsExeNav';
import AppWindow from 'components/AppWindow';
import Head from 'components/Head';
import InfiniteScroll from 'react-infinite-scroller';
import LoadingBlock from 'components/LoadingBlock';
import LootCard from 'components/loot/LootCard';
import MarketFilterBar from 'components/MarketFilterBar';
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
} from 'src/DopeDatabase';
import { useWeb3React } from '@web3-react/core';

const title = 'SWAP MEET';

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
  padding: 16px 8px;
  // Important the immediate parent container for InfiniteScroll
  // is scrollable so it works properly.
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  .lootGrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    grid-column-gap: 16px;
    grid-row-gap: 16px;
  }
  .lootCard {
    max-height: auto;
  }
  ${media.tablet`
    padding: 16px 32px;
  `}
`;
const ContentLoading = (
  <Container>
    <LoadingBlock />
  </Container>
);
const ContentEmpty = (
  <Container>
    <h2>{`Can't find what you're looking for…`}</h2>
  </Container>
);

const MarketList = () => {
  const [sortByKey, setSortByKey] = useState('');
  const [statusKey, setStatusKey] = useState('');
  const [searchInputValue, setSearchValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [viewCompactCards, setViewCompactCards] = useState(isTouchDevice());
  const dopeDb = useReactiveVar(DopeDbCacheReactive) as DopeDatabase;

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

  // Loads unclaimed $paper status from The Graph,
  // then updates items in reactive var cache.
  const { data: dataBags } = useAllUnclaimedBagsQuery();
  const [hasUpdateDopeDbWithPaper, setHasUpdateDopeDbWithPaper] = useState(false);
  if (!hasUpdateDopeDbWithPaper && dataBags && dataBags.page_1) {
    dopeDb.updateHasPaperFromQuery(dataBags);
    console.log('Updating reactive var');
    DopeDbCacheReactive(dopeDb);
    setHasUpdateDopeDbWithPaper(true);
  }

  const filteredSortedItems = useMemo(() => {
    console.log('FILTERED ITEMS');
    console.log(`${statusKey} : ${sortByKey}`);
    const sortedItems = dopeDb.items.sort(getItemComparisonFunction(sortByKey));
    const filteredItems = sortedItems.filter(getStatusTestFunction(statusKey));
    return filterItemsBySearchString(filteredItems, searchInputValue);
  }, [statusKey, sortByKey, dopeDb.items, searchInputValue]);

  const [visibleItems, setVisibleItems] = useState(filteredSortedItems.slice(0, itemsVisible));

  // Search, sort, status change…
  useEffect(() => {
    itemsVisible = PAGE_SIZE;
    setVisibleItems(filteredSortedItems.slice(0, itemsVisible));
    setIsTyping(false);
  }, [searchInputValue, sortByKey, statusKey, hasUpdateDopeDbWithPaper, filteredSortedItems]);

  // Increasing itemsVisible simply increases the window size
  // into the cached data we render in window.
  const loadNextPage = (page: number) => {
    itemsVisible = (page + 1) * PAGE_SIZE;
    console.log(`page: ${page}\nitemsVisible: ${itemsVisible}`);
    setVisibleItems(filteredSortedItems.slice(0, itemsVisible));
  };

  const isLoading = isTyping || !hasUpdateDopeDbWithPaper;

  return (
    <>
      <MarketFilterBar
        searchCallback={(value: string) => setSearchValue(value)}
        sortByCallback={(key: string) => setSortByKey(key)}
        statusCallback={(key: string) => setStatusKey(key)}
        compactViewCallback={(toggle: boolean) => setViewCompactCards(toggle)}
        compactSwitchOn={viewCompactCards}
        searchIsTypingCallback={() => setIsTyping(true)}
      />
      {isLoading && ContentLoading}
      {!isLoading && visibleItems.length > 0 && (
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
                key={`loot-card_${bag.id}_${viewCompactCards}`}
                bag={bag}
                footer="for-marketplace"
                isExpanded={viewCompactCards ? false : true}
                showCollapse={true}
              />
            ))}
          </InfiniteScroll>
        </Container>
      )}
      {!isLoading && visibleItems.length === 0 && ContentEmpty}
    </>
  );
};

const SwapMeet = () => {
  const { account } = useWeb3React();
  const { data, loading } = useWalletQuery({
    variables: { id: account?.toLowerCase() || '' },
    skip: !account,
  });

  return (
    <AppWindow
      padBody={false}
      scrollable={false}
      height="90vh"
      balance={data?.wallet?.paper}
      loadingBalance={loading}
      navbar={<DopeWarsExeNav />}
    >
      <Head title={title} />
      {loading ? (
        <Container>
          <LoadingBlock />
          <LoadingBlock />
        </Container>
      ) : (
        <MarketList />
      )}
    </AppWindow>
  );
};

export default SwapMeet;
