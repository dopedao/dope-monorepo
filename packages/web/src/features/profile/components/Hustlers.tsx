import { useMemo } from 'react';
import { HStack, Button, Text } from '@chakra-ui/react';
import { useAccount } from 'wagmi';
import { Hustler, HustlerHustlerType, useInfiniteProfileHustlersQuery } from 'generated/graphql';
import Dialog from 'components/Dialog';

import ItemCount from './ItemCount';
import SectionContent from './SectionContent';
import SectionHeader from './SectionHeader';
import CardContainer from './CardContainer';
import LoadingBlock from 'components/LoadingBlock';

import HustlerProfileCard from 'features/hustlers/components/HustlerProfileCard';

import { NETWORK, OPT_CHAIN_ID, REFETCH_INTERVAL } from 'utils/constants';
const chainId = parseInt(OPT_CHAIN_ID);
// @ts-ignore
const contractAddress = NETWORK[chainId].contracts.hustlers;

// type ProfileHustler = Pick<Hustler, 'id' | 'name' | 'svg' | 'title' | 'type' | 'bestAskPriceEth'>;

type ProfileHustler = Partial<Hustler>;

type HustlerData = {
  hustlers: ProfileHustler[];
  totalCount: number;
};

const Hustlers = ({ searchValue }: { searchValue?: string | null }) => {
  const { address: account } = useAccount();

  // If we don't do this unnamed hustlers won't show up
  if (searchValue?.trim().length === 0) {
    searchValue = null;
  }

  const { data, hasNextPage, isFetching, fetchNextPage } = useInfiniteProfileHustlersQuery(
    {
      where: {
        hasWalletWith: [
          {
            // Hack to get around the fact that the query is case sensitive
            // Hustler sync from Alchemy puts wallet addresses in DB lowercase,
            // while right from the chain is mixed-case.
            or: [{ id: account?.toLowerCase() }, { id: account }],
          },
        ],
        nameContains: searchValue,
      },
      first: 50,
    },
    {
      queryKey: ['profile-hustlers', account, searchValue],
      initialPageParam: { after: null },
      getNextPageParam: lastPage => {
        if (lastPage.hustlers.pageInfo.hasNextPage) {
          return { after: lastPage.hustlers.pageInfo.endCursor };
        }
        return null;
      },
      // refresh faster since it's hard to invalidate this data
      // will update the ui faster and feel snappier
      refetchInterval: REFETCH_INTERVAL / 3,
    },
  );

  const hustlerData: HustlerData = useMemo(() => {
    const defaultValue = { hustlers: [], totalCount: 0 };

    if (!data?.pages) return defaultValue;

    return data.pages.reduce((result, page) => {
      if (!page.hustlers.edges) return result;

      const { totalCount } = page.hustlers;

      return {
        totalCount,
        hustlers: [
          ...result.hustlers,
          ...page.hustlers.edges.reduce((result, edge) => {
            if (!edge?.node) return result;

            return result.concat(edge.node);
          }, [] as ProfileHustler[]),
        ],
      };
    }, defaultValue as HustlerData);
  }, [data]);

  return (
    <>
      <SectionHeader>
        <HStack alignContent="center" justifyContent="space-between" width="100%" marginRight="8px">
          <span>Hustlers</span>
          <ItemCount count={hustlerData.totalCount} />
        </HStack>
      </SectionHeader>
      <SectionContent
        isFetching={isFetching && !hustlerData.hustlers.length}
        minH={isFetching ? 200 : 0}
      >
        {hustlerData.hustlers.length ? (
          <CardContainer>
            {hustlerData.hustlers
              // listed items most expensive first, then by id
              .sort((a, b) => {
                if (a.bestAskPriceEth !== b.bestAskPriceEth) {
                  return (b.bestAskPriceEth ?? 0) - (a.bestAskPriceEth ?? 0);
                }
                return parseInt(a.id ?? '', 10) - parseInt(b.id ?? '', 10);
              })
              .map(hustler => {
                return <HustlerProfileCard key={hustler.id} hustler={hustler} showOwnerDetails />;
              })}
            {isFetching && hustlerData.hustlers.length && <LoadingBlock maxRows={1} />}
            {hasNextPage && <Button onClick={() => fetchNextPage()}>Load more</Button>}
          </CardContainer>
        ) : (
          <Dialog backgroundCss="">
            <Text fontSize="medium">No HUSTLERS in the connected wallet.</Text>
            <Text>
              If you&apos;ve recently transferred something it might take a few moments for it to
              show here.
            </Text>
          </Dialog>
        )}
      </SectionContent>
    </>
  );
};

export default Hustlers;
