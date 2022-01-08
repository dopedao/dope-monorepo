import { useState, useEffect, ChangeEvent } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { OrderDirection, SearchOrderField, useInfiniteSearchDopeQuery } from 'generated/graphql';
import { isTouchDevice } from 'utils/utils';
import DopeCard from 'features/dope/components/DopeCard';
import MarketFilterBar from 'features/swap-meet/components/MarketFilterBar';
import LoadingState from 'features/swap-meet/components/LoadingState';
import EmptyState from 'features/swap-meet/components/EmptyState';
import Container from 'features/swap-meet/components/Container';
import LoadingBlock from 'components/LoadingBlock';
import { useDebounce } from 'usehooks-ts';

const MarketList = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(searchValue, 500);
  const [orderBy, setOrderBy] = useState<SearchOrderField>(SearchOrderField.Greatness);

  const [viewCompactCards, setViewCompactCards] = useState(isTouchDevice());

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
      first: 50,
      orderBy: {
        field: orderBy,
        direction: OrderDirection.Asc,
      },
      where: {
        saleActive: true,
      },
      query: searchValue,
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    refetch();
  }, [debouncedValue]);

  const isLoading = isSearchFetching || searchStatus === 'loading'; // || !hasUpdateDopeDbWithPaper;

  return (
    <>
      <MarketFilterBar
        handleChange={handleChange}
        searchValue={searchValue}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        compactViewCallback={(toggle: boolean) => setViewCompactCards(toggle)}
        compactSwitchOn={viewCompactCards}
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
                  query: searchValue,
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
