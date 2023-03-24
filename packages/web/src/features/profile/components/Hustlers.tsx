import { useMemo } from 'react';
import { Stack, Image, HStack, Button, Table, Tr, Td } from '@chakra-ui/react';
import { AspectRatio } from '@chakra-ui/layout';
import { useWeb3React } from '@web3-react/core';
import Link from 'next/link';

import PanelBody from 'components/PanelBody';
import { Hustler, HustlerType, useInfiniteProfileHustlersQuery } from 'generated/graphql';

import ItemCount from './ItemCount';
import ProfileCardHeader from './ProfileCardHeader';
import ProfileCard from './ProfileCard';
import SectionContent from './SectionContent';
import SectionHeader from './SectionHeader';
import CardContainer from './CardContainer';
import LoadingBlock from 'components/LoadingBlock';
import PanelFooter from 'components/PanelFooter';

type ProfileHustler = Pick<Hustler, 'id' | 'name' | 'svg' | 'title' | 'type'>;

type HustlerData = {
  hustlers: ProfileHustler[];
  totalCount: number;
};

const formatType = (type: HustlerType): string => {
  if (type === HustlerType.OriginalGangsta) return 'OG';

  return 'Hustler';
};

const HustlerFooter = ({ id }: { id: string }) => (
  <PanelFooter>
    <div></div>
    <Link href={`/hustlers/${id}`} passHref>
      <Button>Flex</Button>
    </Link>
    <Link href={`/hustlers/${id}/customize`} passHref>
      <Button variant="primary">Customize</Button>
    </Link>
  </PanelFooter>
);

const Hustlers = ({ searchValue }: { searchValue?: string | null }) => {
  const { account } = useWeb3React();

  // If we don't do this unnamed hustlers won't show up
  if (searchValue?.trim.length === 0) {
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
      getNextPageParam: lastPage => {
        if (lastPage.hustlers.pageInfo.hasNextPage) {
          return {
            after: lastPage.hustlers.pageInfo.endCursor,
          };
        }
        return false;
      },
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

            return [...result, edge.node];
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
            {hustlerData.hustlers.map(({ id, name, svg, title, type }) => {
              const formattedType = formatType(type);

              return (
                <ProfileCard key={id}>
                  <Link href={`/hustlers/${id}`} passHref>
                    <a>
                      <ProfileCardHeader>
                        <a>
                          {formattedType} #{id}
                        </a>
                      </ProfileCardHeader>
                      <PanelBody>
                        {svg && (
                          <AspectRatio ratio={1}>
                            <Image
                              alt={name || 'Hustler'}
                              borderRadius="md"
                              src={svg}
                              cursor="pointer"
                            />
                          </AspectRatio>
                        )}
                        <Table variant="small">
                          <Tr>
                            <Td>Name:</Td>
                            <Td>{name?.trim().length !== 0 ? name : `Hustler #${id}`}</Td>
                          </Tr>
                          {title && (
                            <Tr>
                              <Td>Title:</Td>
                              <Td>{title}</Td>
                            </Tr>
                          )}
                          {/* For spacing if no OG title */}
                          {!title && (
                            <Tr>
                              <Td colSpan={2}>&nbsp;</Td>
                            </Tr>
                          )}
                        </Table>
                      </PanelBody>
                    </a>
                  </Link>
                  <HustlerFooter id={id} />
                </ProfileCard>
              );
            })}
            {isFetching && hustlerData.hustlers.length && <LoadingBlock maxRows={1} />}
            {hasNextPage && <Button onClick={() => fetchNextPage()}>Load more</Button>}
          </CardContainer>
        ) : (
          <span>No Hustlers found</span>
        )}
      </SectionContent>
    </>
  );
};

export default Hustlers;
