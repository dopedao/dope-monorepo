import { useContext, ChangeEvent } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {
  OrderDirection,
  SearchOrderField,
  SearchType,
  useInfiniteSearchDopeQuery,
} from 'generated/graphql';
import { HStack, Button } from '@chakra-ui/react';
import DopeCard from 'features/dope/components/DopeCard';
import LoadingState from 'features/swap-meet/components/LoadingState';
import EmptyState from 'features/swap-meet/components/EmptyState';
import Container from 'features/swap-meet/components/Container';
import LoadingBlock from 'components/LoadingBlock';
import { SearchFilterContext } from 'components/SearchFilter';

export type FILTERS = 'All' | 'Has Unclaimed $PAPER' | 'For Sale' | 'Has Unclaimed Gear';

const MarketList = () => {
  const { search, order, filter, view } = useContext(SearchFilterContext);

  const [searchValue, setSearchValue] = search;
  const [orderBy, setOrderBy] = order;
  const [filterBy, setFilterBy] = filter;
  const [viewCompactCards, setViewCompactCards] = view;

  const handleFilter = () => {
    switch (filterBy) {
      case 'All':
        return {};
      case 'For Sale':
        return { saleActive: true };
      case 'Has Unclaimed $PAPER':
        return { claimed: false };
      case 'Has Unclaimed Gear':
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
      query: searchValue,
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

  const isLoading = searchStatus === 'loading';
  return (
    <>
      <HStack
        margin="0"
        gridGap={1}
        width="100%"
        justifyContent="start"
        padding="16px"
        background="white"
        borderBottom="2px solid black"
      >
        <a href="https://dope-wars.notion.site/dope-wars/Dope-Wiki-e237166bd7e6457babc964d1724befb2#d97ecd4b61ef4189964cd67f230c91c5" target="wiki">
          <Button>DOPE NFT FAQ</Button>
        </a>
      </HStack>
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
