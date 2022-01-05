import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {
  DopeOrderField,
  OrderDirection,
  useInfiniteDopesQuery,
  useSearchDopeQuery,
} from 'generated/graphql';
import { isTouchDevice } from 'utils/utils';
import DopeCard from 'components/dope/DopeCard';
import MarketFilterBar from 'components/MarketFilterBar';
// import DopeDatabase, {
//   compareByHighestLastSale,
//   compareByMostAffordable,
//   compareByMostExpensive,
//   compareByRank,
//   DopeDbCacheReactive,
//   filterItemsBySearchString,
//   testForUnclaimedPaper,
//   testForSale,
//   testForNotOpened,
// } from 'utils/DopeDatabase';
import LoadingState from 'features/swap-meet/components/LoadingState';
import EmptyState from 'features/swap-meet/components/EmptyState';
import Container from 'features/swap-meet/components/Container';
import LoadingBlock from 'components/LoadingBlock';

const MarketList = () => {
  // const [sortByKey, setSortByKey] = useState('');
  // const [statusKey, setStatusKey] = useState('');
  const [searchInputValue, setSearchValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [viewCompactCards, setViewCompactCards] = useState(isTouchDevice());
  // const dopeDb = useReactiveVar(DopeDbCacheReactive) as DopeDatabase;

  // const getItemComparisonFunction = (key: string) => {
  //   console.log(`Sorting: ${key}`);
  //   switch (key) {
  //     case 'Most Affordable':
  //       return compareByMostAffordable;
  //     case 'Most Expensive':
  //       return compareByMostExpensive;
  //     case 'Highest Last Sale':
  //       return compareByHighestLastSale;
  //     default:
  //       return compareByRank;
  //   }
  // };
  // const getStatusTestFunction = (key: string) => {
  //   console.log(`Filter for: ${key}`);
  //   switch (key) {
  //     case 'Has Unclaimed $PAPER':
  //       return testForUnclaimedPaper;
  //     case 'For Sale':
  //       return testForSale;
  //     case 'Ready To Unpack':
  //       return testForNotOpened;
  //     default:
  //       return () => true;
  //   }
  // };

  // Loads unclaimed $paper status from The Graph,
  // then updates items in reactive var cache.
  // opened: true
  // const { data: unclaimedDopes } = useDopesQuery({
  //   first: 100,
  //   orderBy: {
  //     field: DopeOrderField.Rank,
  //     direction: OrderDirection.Desc,
  //   },
  //   where: {
  //     opened: true,
  //   },
  // });
  // const [hasUpdateDopeDbWithPaper, setHasUpdateDopeDbWithPaper] = useState(false);
  // if (!hasUpdateDopeDbWithPaper && unclaimedDopes && unclaimedDopes.page_1) {
  //   dopeDb.updateHasPaperFromQuery(unclaimedDopes);
  //   console.log('PAPER');
  //   DopeDbCacheReactive(dopeDb);
  //   setHasUpdateDopeDbWithPaper(true);
  // }

  // Loads unbundled from The Graph,
  // then updates items in reactive var cache.
  // claimed: false
  // const [currentCursor, setCurrentCursor] = useState('');
  const {
    data: unclaimedDopes,
    fetchNextPage,
    hasNextPage,
    status,
  } = useInfiniteDopesQuery(
    'first',
    {
      first: 100,
      orderBy: {
        field: DopeOrderField.Rank,
        direction: OrderDirection.Asc,
      },
      where: {
        claimed: false,
      },
    },
    {
      getNextPageParam: lastPage => {
        if (lastPage.dopes.pageInfo.hasNextPage) {
          return lastPage.dopes.pageInfo.endCursor;
        }
        return false;
      },
    },
  );
  const {
    data: searchResult,
    isFetching: isSearchFetching,
    refetch,
  } = useSearchDopeQuery(
    {
      query: searchInputValue,
    },
    {
      enabled: !!searchInputValue,
    },
  );
  // const [hasUpdateDopeDbWithBundled, setHasUpdateDopeDbWithBundled] = useState(false);
  // if (!hasUpdateDopeDbWithBundled && openedDopes && openedDopes.page_1) {
  //   // dopeDb.updateOpenedDopesFromQuery(openedDopes);
  //   console.log('BUNDLED');
  //   DopeDbCacheReactive(dopeDb);
  //   setHasUpdateDopeDbWithBundled(true);
  // }

  // const filteredSortedItems = useMemo(() => {
  //   console.log('FILTERED ITEMS');
  //   console.log(`${statusKey} : ${sortByKey}`);
  //   const sortedItems = dopeDb.items.sort(getItemComparisonFunction(sortByKey));
  //   const filteredItems = sortedItems.filter(getStatusTestFunction(statusKey));
  //   return filterItemsBySearchString(filteredItems, searchInputValue);
  // }, [statusKey, sortByKey, dopeDb.items, searchInputValue]);

  // const [visibleItems, setVisibleItems] = useState(filteredSortedItems.slice(0, itemsVisible));

  // Search, sort, status change…
  useEffect(() => {
    const searchFetch = async () => {
      if (searchInputValue) {
        await refetch();
        setIsTyping(false);
      }
    };

    searchFetch();
  }, [searchInputValue, refetch]);

  // Increasing itemsVisible simply increases the window size
  // into the cached data we render in window.
  // const loadNextPage = (page: number) => {
  //   itemsVisible = (page + 1) * PAGE_SIZE;
  //   console.log(`page: ${page}\nitemsVisible: ${itemsVisible}`);
  //   setVisibleItems(filteredSortedItems.slice(0, itemsVisible));
  // };

  const isLoading = status === 'loading' || isSearchFetching; // || !hasUpdateDopeDbWithPaper;

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
    <>
      {/* @TODO: Re-enable when the fields are available from the API */}
      <MarketFilterBar
        searchCallback={(value: string) => handleSearch(value)}
        // sortByCallback={(key: string) => setSortByKey(key)}
        // statusCallback={(key: string) => setStatusKey(key)}
        compactViewCallback={(toggle: boolean) => setViewCompactCards(toggle)}
        compactSwitchOn={viewCompactCards}
        searchIsTypingCallback={() => setIsTyping(true)}
      />
      {isLoading ? (
        <LoadingState />
      ) : searchResult ? (
        searchResult.search.length <= 0 ? (
          <EmptyState />
        ) : (
          <Container>
            {searchResult.search.map((dope: any) => (
              <DopeCard
                key={dope.id}
                dope={dope}
                footer="for-marketplace"
                isExpanded={viewCompactCards ? false : true}
                showCollapse
              />
            ))}
          </Container>
        )
      ) : unclaimedDopes?.pages && unclaimedDopes.pages.length <= 0 ? (
        <EmptyState />
      ) : (
        <Container>
          <InfiniteScroll
            pageStart={0}
            loadMore={() =>
              fetchNextPage({
                pageParam: {
                  first: 100,
                  after:
                    unclaimedDopes?.pages[unclaimedDopes.pages.length - 1].dopes.pageInfo.endCursor,
                  orderBy: {
                    field: DopeOrderField.Id,
                    direction: OrderDirection.Asc,
                  },
                  where: {
                    claimed: false,
                  },
                },
              })
            }
            hasMore={hasNextPage}
            loader={<LoadingBlock key="loading-block" />}
            useWindow={false}
            className="dopeGrid"
          >
            {unclaimedDopes?.pages.map(group =>
              group.dopes.edges!.map(dope => {
                if (!dope || !dope.node) {
                  return null;
                }
                return (
                  <DopeCard
                    key={dope.node.id}
                    dope={dope.node}
                    footer="for-marketplace"
                    isExpanded={viewCompactCards ? false : true}
                    showCollapse
                  />
                );
              }),
            )}
          </InfiniteScroll>
        </Container>
      )}
    </>
  );
};

export default MarketList;
