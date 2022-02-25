import { Box, Button, HStack, Image } from '@chakra-ui/react';
import { media } from 'ui/styles/mixins';
import { OrderDirection, useInfiniteAllHustlersQuery } from 'generated/graphql';
import AppWindow from 'components/AppWindow';
import DopeWarsExeNav from 'components/DopeWarsExeNav';
import Head from 'components/Head';
import HustlerProfileCard from 'components/hustler/HustlerProfileCard';
import InfiniteScroll from 'react-infinite-scroller';
import Link from 'next/link';
import LoadingBlock from 'components/LoadingBlock';
import LoadingState from 'features/swap-meet/components/LoadingState';
import styled from '@emotion/styled';

const Container = styled.div`
  .hustlerGrid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-column-gap: 16px;
    grid-row-gap: 16px;
  }
  padding: 16px;
`;

const SwapMeetHustlers = () => {
  const { data, fetchNextPage, hasNextPage, status } = useInfiniteAllHustlersQuery(
    {
      first: 18,
    },
    {
      getNextPageParam: lastPage => {
        if (lastPage.hustlers.pageInfo.hasNextPage) {
          return {
            first: lastPage.hustlers.pageInfo.endCursor,
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
      <Head title="Hustlers" />
      <HStack
        justifyContent="start"
        margin="0"
        gridGap={1}
        width="100%"
        padding="16px"
        background="white"
        borderBottom="2px solid black"
      >
        <Link href="/hustlers/quick-buy" passHref>
          <Button variant="primary" fontSize="xs">
            Mint a Hustler
          </Button>
        </Link>
        <a
          href="https://quixotic.io/collection/hustlers?attributes=attribute%3DClass%3AOriginal+Gangsta&query="
          target="quix"
        >
          <Button variant="primary" fontSize="xs">
            Buy an OG
          </Button>
        </a>
        <a
          href="https://dope-wars.notion.site/dope-wars/Dope-Wiki-e237166bd7e6457babc964d1724befb2#d491a70fab074062b7b3248d6d09c06a"
          target="wiki"
        >
          <Button fontSize="xs">Hustler FAQ</Button>
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
                      after: data?.pages[data.pages.length - 1].hustlers.pageInfo.endCursor,
                    },
                  })
                }
                hasMore={hasNextPage}
                loader={<LoadingBlock key="loading-block-2" />}
                useWindow={false}
                className="dopeGrid"
              >
                <div className="hustlerGrid">
                  {data?.pages.map(group =>
                    group.hustlers.edges!.map(hustler => {
                      if (!hustler?.node!.svg) return null;
                      return <HustlerProfileCard key={hustler.node.id} hustler={hustler.node} />;
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

export default SwapMeetHustlers;
