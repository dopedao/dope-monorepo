import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import {
  OrderDirection,
  useInfiniteSearchQuery,
  SearchOrderField,
  SearchSearchType,
  ItemItemType,
} from 'generated/graphql';
import { SwapMeetContainer } from 'features/swap-meet/components/SwapMeetContainer';
import Head from 'components/Head';
import InfiniteScroll from 'react-infinite-scroller';
import LoadingBlock from 'components/LoadingBlock';
import LoadingState from 'features/swap-meet/components/LoadingState';
import FilterBar, { FILTER_KEYS, FilterKeyType } from 'features/swap-meet/components/FilterBar';
import GearCard from 'features/gear/components/GearCard';
import { useState } from 'react';
import Container from 'features/swap-meet/components/Container';
import { REFETCH_INTERVAL } from 'utils/constants';
import SwapMeet from '.';

const SwapMeetGear = () => {
  const filterKeys = FILTER_KEYS.Gear;
  const [searchValue, setSearchValue] = useState<string>('');
  const [orderBy, setOrderBy] = useState<SearchOrderField>(SearchOrderField.SalePrice);
  const [orderDirection, setOrderDirection] = useState<OrderDirection>(OrderDirection.Asc);
  const [filterBy, setFilterBy] = useState<FilterKeyType>(filterKeys[1]);

  const handleFilter = () => {
    switch (filterBy) {
      case 'All':
        return {};
      case 'For Sale':
        return { salePriceGT: 0, salePriceNEQ: null };
      case 'Weapon':
        return { hasItemWith: [{ type: ItemItemType.Weapon }] };
      case 'Vehicle':
        return { hasItemWith: [{ type: ItemItemType.Vehicle }] };
      case 'Drugs':
        return { hasItemWith: [{ type: ItemItemType.Drugs }] };
      case 'Clothes':
        return { hasItemWith: [{ type: ItemItemType.Clothes }] };
      case 'Hand':
        return { hasItemWith: [{ type: ItemItemType.Hand }] };
      case 'Waist':
        return { hasItemWith: [{ type: ItemItemType.Waist }] };
      case 'Foot':
        return { hasItemWith: [{ type: ItemItemType.Foot }] };
      case 'Neck':
        return { hasItemWith: [{ type: ItemItemType.Neck }] };
      case 'Ring':
        return { hasItemWith: [{ type: ItemItemType.Ring }] };
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
        type: SearchSearchType.Item,
        banned: false,
        ...handleFilter(),
        ...handleSort(),
      },
      query: searchValue,
    },
    {
      queryKey: ['swap-meet-gear', searchValue, orderBy, orderDirection, filterBy],
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

  return (
    <SwapMeetContainer>
      <Head title="Gear" />
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
        <Link
          href="https://dope-wars.notion.site/dope-wars/Dope-Wiki-e237166bd7e6457babc964d1724befb2#a3f12ba573254b0d87b6aeb6a1bfb603"
          target="wiki"
        >
          <Button fontSize="xs">Gear FAQ</Button>
        </Link>
      </FilterBar>

      {isLoading ? (
        <LoadingState />
      ) : (
        // <LoadingState />
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
                  if (searchResult?.node?.item) {
                    return (
                      <GearCard key={searchResult.node.item.id} gear={searchResult.node.item} />
                    );
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

export default SwapMeetGear;
