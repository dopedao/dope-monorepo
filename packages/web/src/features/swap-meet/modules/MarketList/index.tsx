import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { OrderDirection, useInfiniteSearchDopeQuery } from 'generated/graphql';
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
  const [searchInputValue, setSearchValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [viewCompactCards, setViewCompactCards] = useState(isTouchDevice());

  // Loads unbundled from The Graph,
  // then updates items in reactive var cache.
  const {
    data: searchResult,
    isFetching: isSearchFetching,
    refetch,
    fetchNextPage: searchFetchNextPage,
    hasNextPage: searchHasNextPage,
    status: searchStatus,
  } = useInfiniteSearchDopeQuery(
    'first',
    {
      first: 100,
      orderBy: {
        direction: OrderDirection.Asc,
      },
      query: searchInputValue,
    },
    {
      getNextPageParam: lastPage => {
        if (lastPage.search.pageInfo.hasNextPage) {
          return lastPage.search.pageInfo.endCursor;
        }
        return false;
      },
    },
  );

  useEffect(() => {
    const searchFetch = async () => {
      if (searchInputValue) {
        await refetch();
        setIsTyping(false);
      }
    };

    searchFetch();
  }, [searchInputValue, refetch]);

  const isLoading = isSearchFetching || searchStatus === 'loading'; // || !hasUpdateDopeDbWithPaper;

  const handleSearch = async (value: string) => {
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
      ) : Boolean(!searchResult?.pages.length) ? (
        <EmptyState />
      ) : (
        <Container>
          <InfiniteScroll
            pageStart={0}
            loadMore={() =>
              searchFetchNextPage({
                pageParam: {
                  first: 100,
                  after:
                    searchResult?.pages[searchResult.pages.length - 1].search.pageInfo.endCursor,
                  orderBy: {
                    direction: OrderDirection.Asc,
                  },
                  query: searchInputValue,
                },
              })
            }
            hasMore={searchHasNextPage}
            loader={<LoadingBlock key="loading-block" />}
            useWindow={false}
            className="dopeGrid"
          >
            {searchResult?.pages.map(group =>
              group.search.edges!.map((dope: any) => {
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
