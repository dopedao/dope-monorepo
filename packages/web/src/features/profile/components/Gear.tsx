import { useMemo } from 'react';
import { Button, HStack, Text } from '@chakra-ui/react';
import { useAccount } from 'wagmi';
import { Item, Maybe, useInfiniteProfileGearQuery, WalletItems } from 'generated/graphql';
import CardContainer from './CardContainer';
import GearCard from './GearCard';
import ItemCount from './ItemCount';
import LoadingBlock from 'components/LoadingBlock';
import SectionContent from './SectionContent';
import SectionHeader from './SectionHeader';
import { REFETCH_INTERVAL } from 'utils/constants';
import Dialog from 'components/Dialog';

type ProfileItem = Pick<WalletItems, 'id' | 'balance'> & {
  item: Pick<Item, 'id' | 'count' | 'fullname' | 'name' | 'svg' | 'suffix' | 'type'> & {
    base?: Maybe<Pick<Item, 'svg'>>;
  };
};

type GearData = {
  walletItems: ProfileItem[];
  totalCount: number;
};

const GearWrapper = ({ searchValue }: { searchValue: string }) => {
  const { address: account } = useAccount();

  const { data, hasNextPage, isFetching, fetchNextPage } = useInfiniteProfileGearQuery(
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
        balanceGT: '0',
        hasItemWith: [
          {
            nameContains: searchValue,
          },
        ],
      },
      first: 100,
    },
    {
      queryKey: ['profile-gear', account, searchValue],
      initialPageParam: { after: null },
      getNextPageParam: lastPage => {
        if (lastPage.walletItems.pageInfo.hasNextPage) {
          return { after: lastPage.walletItems.pageInfo.endCursor };
        }
        return null;
      },
      // refresh faster since it's hard to invalidate this data
      // will update the ui faster and feel snappier
      refetchInterval: REFETCH_INTERVAL / 3,
    },
  );

  const gearData: GearData = useMemo(() => {
    const defaultValue = { walletItems: [], totalCount: 0 };

    if (!data?.pages) return defaultValue;

    return data.pages.reduce((result, page) => {
      if (!page.walletItems.edges) return result;

      const { totalCount } = page.walletItems;

      return {
        totalCount,
        walletItems: [
          ...result.walletItems,
          ...page.walletItems.edges.reduce((result, edge) => {
            if (!edge?.node) return result;
            return result.concat(edge.node as ProfileItem);
          }, [] as ProfileItem[]),
        ],
      };
    }, defaultValue as GearData);
  }, [data]);

  return (
    <>
      <SectionHeader>
        <HStack alignContent="center" justifyContent="space-between" width="100%" marginRight="8px">
          <span>Gear</span>
          <ItemCount count={gearData.totalCount} />
        </HStack>
      </SectionHeader>
      <SectionContent
        isFetching={isFetching && !gearData.walletItems.length}
        minH={isFetching ? 200 : 0}
      >
        {gearData.walletItems.length ? (
          <CardContainer>
            {gearData.walletItems
              .sort((a, b) => a.item.type.localeCompare(b.item.type))
              .map(walletItem => {
                return (
                  <GearCard
                    key={walletItem.id}
                    item={walletItem.item}
                    balance={walletItem.balance}
                    showEquipFooter
                  />
                );
              })}
            {isFetching && gearData.walletItems.length && <LoadingBlock maxRows={1} />}
            {hasNextPage && <Button onClick={() => fetchNextPage()}>Load more</Button>}
          </CardContainer>
        ) : (
          <Dialog backgroundCss="">
            <Text fontSize="medium">No GEAR in the connected wallet.</Text>
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

export default GearWrapper;
