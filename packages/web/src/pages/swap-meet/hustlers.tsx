import { Box, Button, HStack, Image } from '@chakra-ui/react';
import { css } from '@emotion/react';
import {
  OrderDirection,
  useInfiniteSearchQuery,
  SearchOrderField,
  SearchSearchType,
  SearchWhereInput,
  HustlerHustlerType,
} from 'generated/graphql';
import { SwapMeetContainer } from 'features/swap-meet/components/SwapMeetContainer';
import Head from 'components/Head';
import HustlerProfileCard from 'features/hustlers/components/HustlerProfileCard';
import InfiniteScroll from 'react-infinite-scroller';
import { useState } from 'react';
import Link from 'next/link';
import LoadingBlock from 'components/LoadingBlock';
import LoadingState from 'features/swap-meet/components/LoadingState';
import FilterBar, { FILTER_KEYS, FilterKeyType } from 'features/swap-meet/components/FilterBar';
import styled from '@emotion/styled';
import Container from 'features/swap-meet/components/Container';
import { REFETCH_INTERVAL } from 'utils/constants';

const SwapMeetHustlers = () => {
  const filterKeys = FILTER_KEYS.Hustlers;
  const [searchValue, setSearchValue] = useState<string>('');
  const [orderBy, setOrderBy] = useState<SearchOrderField>(SearchOrderField.SalePrice);
  const [orderDirection, setOrderDirection] = useState<OrderDirection>(OrderDirection.Asc);
  const [filterBy, setFilterBy] = useState<FilterKeyType>(filterKeys[1]);

  const handleFilter = (): SearchWhereInput => {
    switch (filterBy) {
      case 'All':
        return {};
      case 'For Sale':
        return { salePriceGT: 0, salePriceNEQ: null };
      case 'OG':
        return { hasHustlerWith: [{ type: HustlerHustlerType.OriginalGangsta }] };
      default:
        return {};
    }
  };

  // Need to exclude stuff not for sale (price zero)
  // if we've sorted by sale price.
  const handleSort = () => {
    switch (orderBy) {
      case SearchOrderField.SalePrice:
        return { salePriceGT: 0, salePriceNEQ: null };
      default:
        return {};
    }
  };

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
        type: SearchSearchType.Hustler,
        banned: false,
        ...handleFilter(),
        ...handleSort(),
      },
      query: searchValue,
    },
    {
      queryKey: ['swap-meet-hustlers', searchValue, orderBy, orderDirection, filterBy],
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

  // console.log(orderDirection);

  return (
    <SwapMeetContainer>
      <Head title="Hustlers" />
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
        <Link href="/hustlers/mint" passHref>
          <Button variant="primary" fontSize="xs">
            Mint a Hustler
          </Button>
        </Link>
        <Link
          href="https://dope-wars.notion.site/dope-wars/Dope-Wiki-e237166bd7e6457babc964d1724befb2#d491a70fab074062b7b3248d6d09c06a"
          target="wiki"
        >
          <Button fontSize="xs">Hustler FAQ</Button>
        </Link>
      </FilterBar>

      {isLoading ? (
        <LoadingState />
      ) : (
        searchResult && (
          <Container>
            <InfiniteScroll
              loadMore={() => fetchNextPage()}
              hasMore={hasNextPage}
              loader={<LoadingBlock maxRows={5} key="loading-block-2" />}
              useWindow={false}
              className="cardGrid"
            >
              {searchResult?.pages.map(group =>
                group.search.edges?.map(searchResult => {
                  if (searchResult?.node?.hustler) {
                    const h = searchResult.node.hustler;
                    if (!h.svg) return null;
                    return <HustlerProfileCard key={h.id} hustler={h} />;
                  }
                }),
              )}
            </InfiniteScroll>
          </Container>
        )
      )}
    </SwapMeetContainer>
  );
};

export default SwapMeetHustlers;
