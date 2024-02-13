import { useMemo } from 'react';
import { Button, HStack, Text } from '@chakra-ui/react';
import { useAccount } from 'wagmi';
import { REFETCH_INTERVAL } from 'utils/constants';
import DopeCard from 'features/dope/components/DopeCard';
import Dialog from 'components/Dialog';

import {
  Dope,
  DopeOrder,
  DopeOrderField,
  Item,
  OrderDirection,
  useInfiniteProfileDopesQuery,
} from 'generated/graphql';

import CardContainer from './CardContainer';
import SectionContent from './SectionContent';
import SectionHeader from './SectionHeader';
import ItemCount from './ItemCount';
import LoadingBlock from 'components/LoadingBlock';

type ProfileDope = Pick<Dope, 'id' | 'claimed' | 'opened' | 'rank' | 'score'> & {
  items: Pick<
    Item,
    | 'id'
    | 'fullname'
    | 'type'
    | 'name'
    | 'tier'
    | 'greatness'
    | 'count'
    | 'suffix'
    | 'namePrefix'
    | 'nameSuffix'
  >[];
};

type DopeData = {
  dopes: ProfileDope[];
  totalCount: number;
};

const Dopes = ({ searchValue }: { searchValue: string }) => {
  const { address: account } = useAccount();
  const { data, hasNextPage, isFetching, fetchNextPage } = useInfiniteProfileDopesQuery(
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
        hasItemsWith: [
          {
            nameContains: searchValue,
          },
        ],
      },
      orderBy: {
        field: DopeOrderField.BestAskPrice,
        direction: OrderDirection.Asc,
      },
      first: 100,
    },
    {
      queryKey: ['profile-dopes', account, searchValue],
      initialPageParam: { after: null },
      getNextPageParam: lastPage => {
        if (lastPage.dopes.pageInfo.hasNextPage) {
          return { after: lastPage.dopes.pageInfo.endCursor };
        }
        return null;
      },
      // refresh faster since it's hard to invalidate this data
      // will update the ui faster and feel snappier
      refetchInterval: REFETCH_INTERVAL / 3,
    },
  );

  const dopeData: DopeData = useMemo(() => {
    const defaultValue = { dopes: [], totalCount: 0 };

    if (!data?.pages) return defaultValue;

    return data.pages.reduce((result, page) => {
      if (!page.dopes.edges) return result;

      const { totalCount } = page.dopes;

      return {
        totalCount,
        dopes: [
          ...result.dopes,
          ...page.dopes.edges.reduce((result, edge) => {
            if (!edge?.node) return result;
            return result.concat(edge.node as ProfileDope);
          }, [] as ProfileDope[]),
        ],
      };
    }, defaultValue as DopeData);
  }, [data]);

  return (
    <>
      <SectionHeader>
        <HStack alignContent="center" justifyContent="space-between" width="100%" marginRight="8px">
          <span>DOPE</span>
          <ItemCount count={dopeData.totalCount} />
        </HStack>
      </SectionHeader>
      <SectionContent isFetching={isFetching && !dopeData.dopes.length} minH={isFetching ? 200 : 0}>
        {dopeData.dopes.length ? (
          <>
            <CardContainer>
              {dopeData.dopes.map(dope => (
                <DopeCard key={dope.id} buttonBar="for-owner" dope={dope} />
              ))}
              {isFetching && dopeData.dopes && <LoadingBlock maxRows={1} />}
              {hasNextPage && <Button onClick={() => fetchNextPage()}>Load more</Button>}
            </CardContainer>
          </>
        ) : (
          <Dialog backgroundCss="">
            <Text fontSize="medium">No DOPE in the connected wallet.</Text>
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

export default Dopes;
