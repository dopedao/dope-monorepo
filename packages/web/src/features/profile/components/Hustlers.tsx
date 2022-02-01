import { FC, useMemo } from "react"
import { Stack, Image, HStack, Button } from "@chakra-ui/react"
import { useWeb3React } from "@web3-react/core";

import PanelBody from "components/PanelBody";
import { Hustler, HustlerType, useInfiniteProfileHustlersQuery } from "generated/graphql";

import ItemCount from "./ItemCount";
import ProfileCardHeader from "./ProfileCardHeader";
import ProfileCard from "./ProfileCard";
import SectionContent from "./SectionContent";
import SectionHeader from "./SectionHeader";
import CardContainer from "./CardContainer";
import LoadingBlock from "components/LoadingBlock";

type ProfileHustler = Pick<Hustler, "id" | "name" | "svg" | "title" | "type">

type HustlerData = {
  hustlers: ProfileHustler[]
  totalCount: number
}

const formatType = (type: HustlerType): string => {
  if (type === HustlerType.OriginalGangsta) return "OG"

  return "Hustler"
}

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
  })

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
        <HStack>
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
                    {svg && <Image borderRadius="md" src={svg} />}
                    <Stack mt={4}>
                      <span>Name: {name}</span>
                      <span>Title: {title}</span>
                    </Stack>
                  </PanelBody>
                </ProfileCard>
              )
            })}
            {isFetching && hustlerData.hustlers.length && <LoadingBlock maxRows={1} />}
            {hasNextPage && <Button onClick={() => fetchNextPage()}>Load more</Button>}
          </CardContainer>
        ) : (
          <span>This wallet does not have any Hustlers</span>
        )}
      </SectionContent>
    </>
  )
}

export default Hustlers
