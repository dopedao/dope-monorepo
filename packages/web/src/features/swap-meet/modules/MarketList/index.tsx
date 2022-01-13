import { useState, ChangeEvent } from 'react';
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

export type FILTERS = 'All' | 'Has Unclaimed $PAPER' | 'For Sale' | 'Ready To Unpack';

const MarketList = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(searchValue, 500);
  const [orderBy, setOrderBy] = useState<SearchOrderField>(SearchOrderField.Greatness);
  const [filterBy, setFilterBy] = useState<FILTERS>('All');
  const [viewCompactCards, setViewCompactCards] = useState(isTouchDevice());

  const handleFilter = () => {
    switch (filterBy) {
      case 'All':
        return {
          saleActive: true,
          opened: true,
          claimed: true,
        };
      case 'For Sale':
        return { saleActive: true };
      case 'Has Unclaimed $PAPER':
        return { claimed: false };
      case 'Ready To Unpack':
        return { opened: false };
      default:
        return {};
    }
  };

  const {
    data: searchResult,
    isFetching: isSearchFetching,
    fetchNextPage: searchFetchNextPage,
    hasNextPage: searchHasNextPage,
    status: searchStatus,
  } = useInfiniteSearchDopeQuery(
    {
      first: 25,
      orderBy: {
        field: orderBy,
        direction:
          orderBy === SearchOrderField.SalePrice ? OrderDirection.Asc : OrderDirection.Desc,
      },
      where: handleFilter(),
      query: debouncedValue,
    },
    {
      getNextPageParam: lastPage => {
        if (lastPage.search.pageInfo.hasNextPage) {
          return {
            after: lastPage.search.pageInfo.endCursor
          }
        }
      },
    },
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const isLoading = isSearchFetching || searchStatus === 'loading'; // || !hasUpdateDopeDbWithPaper;

  return (
    <>
      <MarketFilterBar
        handleChange={handleChange}
        searchValue={searchValue}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        setViewCompactCards={setViewCompactCards}
        compactSwitchOn={viewCompactCards}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
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
                  first: 25,
                  after:
                    searchResult?.pages[searchResult.pages.length - 1].search.pageInfo.endCursor,
                  orderBy: {
                    direction:
                      orderBy === SearchOrderField.SalePrice
                        ? OrderDirection.Asc
                        : OrderDirection.Desc,
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
                    isExpanded={!viewCompactCards}
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
