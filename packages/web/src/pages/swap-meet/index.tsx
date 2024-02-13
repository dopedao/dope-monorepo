import Head from 'components/Head';
import { useState, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Button, Image } from '@chakra-ui/react';
import Link from 'next/link';

import {
  OrderDirection,
  SearchOrderField,
  SearchSearchType,
  useInfiniteSearchQuery,
} from 'generated/graphql';
import Container from 'features/swap-meet/components/Container';
import DopeCard from 'features/dope/components/DopeCard';
import EmptyState from 'features/swap-meet/components/EmptyState';
import LoadingBlock from 'components/LoadingBlock';
import LoadingState from 'features/swap-meet/components/LoadingState';
import { SwapMeetContainer } from 'features/swap-meet/components/SwapMeetContainer';
import FilterBar, { FILTER_KEYS, FilterKeyType } from 'features/swap-meet/components/FilterBar';
import { isTouchDevice } from 'utils/utils';
import { REFETCH_INTERVAL } from 'utils/constants';

export const handleFilter = (filterBy: FilterKeyType) => {
  switch (filterBy) {
    case 'All':
      return {};
    case 'For Sale':
      return { salePriceGT: 0, salePriceNEQ: null };
    // case 'Has Unclaimed $PAPER':
    //   return { claimed: false };
    case 'Has Unclaimed Gear':
      return { opened: false };
    default:
      return {};
  }
};

// Need to exclude stuff not for sale (price zero)
// if we've sorted by sale price.
export const handleSort = (orderBy: SearchOrderField) => {
  switch (orderBy) {
    case SearchOrderField.SalePrice:
      return { salePriceGT: 0, salePriceNEQ: null };
    default:
      return {};
  }
};

const DopeList = () => {
  const filterKeys = FILTER_KEYS.Dope;
  const [searchValue, setSearchValue] = useState('');
  const [orderBy, setOrderBy] = useState<SearchOrderField>(SearchOrderField.SalePrice);
  const [orderDirection, setOrderDirection] = useState<OrderDirection>(OrderDirection.Desc);
  const [filterBy, setFilterBy] = useState<FilterKeyType>(filterKeys[1]);
  const [viewCompactCards, setViewCompactCards] = useState(isTouchDevice());

  const {
    data: searchResult,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteSearchQuery(
    {
      first: 25,
      orderBy: {
        field: orderBy,
        direction: orderDirection,
      },
      where: {
        type: SearchSearchType.Dope,
        banned: false,
        ...handleFilter(filterBy),
        ...handleSort(orderBy),
      },
      query: searchValue,
    },
    {
      queryKey: ['swap-meet-dope', searchValue, orderBy, orderDirection, filterBy],
      initialPageParam: { after: null },
      getNextPageParam: lastPage => {
        if (lastPage.search.pageInfo.hasNextPage) {
          return { after: lastPage.search.pageInfo.endCursor };
        }
        return null;
      },
      refetchInterval: REFETCH_INTERVAL,
    },
  );

  const iconPath = '/images/icon';
  const icon = viewCompactCards ? 'expand' : 'collapse';

  return (
    <>
      <FilterBar
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        orderDirection={orderDirection}
        setOrderDirection={setOrderDirection}
        filterKeys={filterKeys}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        setSearchValue={setSearchValue}
      >
        <Button
          className="toggleButton"
          onClick={() => setViewCompactCards(prevState => !prevState)}
        >
          <Image alt="toggle" src={`${iconPath}/${icon}.svg`} />
        </Button>
        <Link
          href="https://dope-wars.notion.site/dope-wars/Dope-Wiki-e237166bd7e6457babc964d1724befb2#d97ecd4b61ef4189964cd67f230c91c5"
          target="wiki"
        >
          <Button fontSize="xs">DOPE NFT FAQ</Button>
        </Link>
      </FilterBar>
      {isLoading ? (
        <LoadingState />
      ) : !searchResult?.pages.length ? (
        <EmptyState />
      ) : (
        <Container>
          <InfiniteScroll
            loadMore={() => fetchNextPage()}
            hasMore={hasNextPage}
            loader={<LoadingBlock maxRows={5} key="loading-block" />}
            useWindow={false}
            className="cardGrid"
          >
            {searchResult?.pages.map(group =>
              group.search.edges?.map(searchResult => {
                if (searchResult?.node?.dope) {
                  return (
                    <DopeCard
                      key={searchResult.node.dope.id}
                      dope={searchResult.node.dope}
                      buttonBar="for-marketplace"
                      isExpanded={!viewCompactCards}
                      showCollapse
                    />
                  );
                }
              }),
            )}
          </InfiniteScroll>
        </Container>
      )}
    </>
  );
};

const SwapMeet = () => (
  <SwapMeetContainer>
    <Head title="SWAP MEET" />
    <DopeList />
  </SwapMeetContainer>
);

export default SwapMeet;
