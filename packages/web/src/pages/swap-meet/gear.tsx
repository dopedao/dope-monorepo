import { Button, Box, HStack } from '@chakra-ui/react';
import { media } from 'ui/styles/mixins';
import { OrderDirection, ItemOrderField, useInfiniteAllItemsQuery } from 'generated/graphql';
import AppWindow from 'components/AppWindow';
import DopeWarsExeNav from 'components/DopeWarsExeNav';
import Head from 'components/Head';
import InfiniteScroll from 'react-infinite-scroller';
import LoadingBlock from 'components/LoadingBlock';
import LoadingState from 'features/swap-meet/components/LoadingState';
import styled from '@emotion/styled';
import GearCard from 'components/hustler/GearCard';

const Container = styled.div`
  .gearGrid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-column-gap: 16px;
    grid-row-gap: 16px;
  }
  padding: 16px;
`;

const SwapMeetGear = () => {
  const { data, fetchNextPage, hasNextPage, status } = useInfiniteAllItemsQuery(
    {
      first: 25,
      orderBy: {
        direction: OrderDirection.Desc,
        field: ItemOrderField.Greatness,
      },
    },
    {
      getNextPageParam: lastPage => {
        if (lastPage.items.pageInfo.hasNextPage) {
          return {
            first: lastPage.items.pageInfo.endCursor,
          };
        }
        return false;
      },
    },
  );
  const isLoading = status === 'loading';

  return (
    <AppWindow
      padBody={false}
      scrollable={true}
      height="90vh"
      navbar={<DopeWarsExeNav />}
      title="Swap Meet"
    >
      <Head title="Gear" />
      <HStack
        margin="0"
        gridGap={1}
        width="100%"
        justifyContent="start"
        padding="16px"
        background="white"
        borderBottom="2px solid black"
      >
        <a href="https://quixotic.io/collection/gear" target="quix">
          <Button variant="primary" fontSize="xs">
            Search Gear on Quixotic
          </Button>
        </a>
        <a
          href="https://dope-wars.notion.site/dope-wars/Dope-Wiki-e237166bd7e6457babc964d1724befb2#a3f12ba573254b0d87b6aeb6a1bfb603"
          target="wiki"
        >
          <Button fontSize="xs">Gear FAQ</Button>
        </a>
      </HStack>
      <Box>
        {isLoading ? (
          <LoadingState />
        ) : (
          data && (
            <Container>
              <InfiniteScroll
                pageStart={0}
                loadMore={() =>
                  fetchNextPage({
                    pageParam: {
                      first: 100,
                      after: data?.pages[data.pages.length - 1].items.pageInfo.endCursor,
                    },
                  })
                }
                hasMore={hasNextPage}
                loader={<LoadingBlock key="loading-block-2" />}
                useWindow={false}
                className="dopeGrid"
              >
                <div className="gearGrid">
                  {data?.pages.map(group =>
                    group.items.edges!.map(item => {
                      if (!item?.node?.id) return null;
                      return <GearCard key={item.node.id} gear={item.node} />;
                    }),
                  )}
                </div>
              </InfiniteScroll>
            </Container>
          )
        )}
      </Box>
    </AppWindow>
  );
};

export default SwapMeetGear;
