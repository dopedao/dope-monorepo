import { useState, ChangeEvent } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {
  OrderDirection,
  SearchOrderField,
  SearchType,
  useInfiniteSearchDopeQuery,
} from 'generated/graphql';
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
        return {};
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
      where: {
        type: SearchType.Dope,
        ...handleFilter(),
      },
      query: debouncedValue,
    },
    {
      getNextPageParam: lastPage => {
        if (!lastPage.search.pageInfo.hasNextPage) {
          return null;
        }

        return {
          after: lastPage.search.pageInfo.endCursor,
        };
      },
    },
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const isLoading = searchStatus === 'loading';
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
            loadMore={() => searchFetchNextPage()}
            hasMore={searchHasNextPage}
            loader={<LoadingBlock key="loading-block" />}
            useWindow={false}
            className="dopeGrid"
          >
            {searchResult?.pages.map(group =>
              group.search.edges?.map((dope: any) => {
                if (!dope || !dope.node) {
                  return null;
                }
                return (
                  <DopeCard
                    key={dope.node.id}
                    dope={dope.node}
                    buttonBar="for-marketplace"
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
