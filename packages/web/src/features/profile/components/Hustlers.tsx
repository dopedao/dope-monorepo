import { FC, useMemo } from "react"
import { Stack, Image, HStack, Button } from "@chakra-ui/react"
import { AspectRatio } from '@chakra-ui/layout';
import { useWeb3React } from "@web3-react/core";
import Link from 'next/link';

import PanelBody from "components/PanelBody";
import { Hustler, HustlerType, useInfiniteProfileHustlersQuery } from "generated/graphql";

import ItemCount from "./ItemCount";
import ProfileCardHeader from "./ProfileCardHeader";
import ProfileCard from "./ProfileCard";
import SectionContent from "./SectionContent";
import SectionHeader from "./SectionHeader";
import CardContainer from "./CardContainer";
import LoadingBlock from "components/LoadingBlock";
import PanelFooter from 'components/PanelFooter';

type ProfileHustler = Pick<Hustler, 'id' | 'name' | 'svg' | 'title' | 'type'>;

type HustlerData = {
  hustlers: ProfileHustler[]
  totalCount: number
}

const formatType = (type: HustlerType): string => {
  if (type === HustlerType.OriginalGangsta) return 'OG';

  return 'Hustler';
};

const HustlerFooter = ({ id }: { id: string }) => (
  <PanelFooter>
    <Link href={`/hustlers/${id}/customize`} passHref>
      <Button variant="primary">Customize</Button>
    </Link>
  </PanelFooter>
);

const Hustlers: FC = () => {
  const { account } = useWeb3React()

  const { data, hasNextPage, isFetching, fetchNextPage } = useInfiniteProfileHustlersQuery({
    where: {
      hasWalletWith: [{
        id: account,
      }],
    },
    first: 50,
  }, {
    getNextPageParam: lastPage => {
      if (lastPage.hustlers.pageInfo.hasNextPage) {
        return {
          after: lastPage.hustlers.pageInfo.endCursor,
        };
      }
      return false;
    },
  });

  const hustlerData: HustlerData = useMemo(() => {
    const defaultValue = { hustlers: [], totalCount: 0 }

    if (!data?.pages) return defaultValue

    return data.pages.reduce((result, page) => {
      if (!page.hustlers.edges) return result

      const { totalCount } = page.hustlers

      return {
        totalCount,
        hustlers: [
          ...result.hustlers,
          ...page.hustlers.edges.reduce((result, edge) => {
            if (!edge?.node) return result

            return [...result, edge.node]
          }, [] as ProfileHustler[])
        ]
      }
    }, defaultValue as HustlerData)
  }, [data])

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
              const formattedType = formatType(type)

              return (
                <ProfileCard key={id}>
                  <ProfileCardHeader>
                    {formattedType} #{id}
                  </ProfileCardHeader>
                  <PanelBody>
                    {svg && 
                      <AspectRatio ratio={1}>
                        <Image alt="The hustler" borderRadius="md" src={svg} />
                      </AspectRatio>
                    }
                    <Stack mt={4}>
                      <span>Name: {name}</span>
                      <span>
                        { title ? `Title: ${title}` : '\u00A0' }
                      </span>
                    </Stack>
                  </PanelBody>
                  <HustlerFooter id={id} />
                </ProfileCard>
              );
            })}
            {isFetching && hustlerData.hustlers.length && <LoadingBlock maxRows={1} />}
            {hasNextPage && <Button onClick={() => fetchNextPage()}>Load more</Button>}
          </CardContainer>
        ) : (
          <span>This wallet does not have any Hustlers</span>
        )}
      </SectionContent>
    </>
  );
};

export default Hustlers
