import { Stack, Image, Text, Wrap, WrapItem, HStack } from "@chakra-ui/react"
import { FC, useMemo } from "react"
import { ProfileHustler } from "../types"
import PanelBody from "components/PanelBody";
import { HustlerType, useProfileHustlersQuery } from "generated/graphql";
import { useWeb3React } from "@web3-react/core";
import SectionHeader from "./SectionHeader";
import ItemCount from "./ItemCount";
import SectionContent from "./SectionContent";
import ProfileCardHeader from "./ProfileCardHeader";
import ProfileCard from "./ProfileCard";

const formatType = (type: HustlerType): string => {
  if (type === HustlerType.OriginalGangsta) return "OG"

  return "Hustler"
}

const HustlersWrapper: FC = () => {
  const { account } = useWeb3React()

  const { data, isFetching } = useProfileHustlersQuery({
    where: {
      id: account,
    },
  })

  const hustlers = useMemo(() => {
    if (!data?.wallets.edges) return []

    return data.wallets.edges?.reduce((result, edge) => {
      if (!edge?.node?.hustlers) return result

      const { hustlers } = edge.node

      return [...result, ...hustlers]
    }, [] as ProfileHustler[])
  }, [data])

  return (
    <>
      <SectionHeader>
        <HStack>
          <span>Hustlers</span>
          <ItemCount count={hustlers.length} />
        </HStack>
      </SectionHeader>
      <SectionContent isFetching={isFetching} minH={isFetching ? 200 : 0}>
        {hustlers.length ? (
          <Wrap>
            {hustlers.map(({ id, name, svg, title, type }) => {
              const formattedType = formatType(type)

              return (
                <WrapItem key={id}>
                  <ProfileCard>
                    <ProfileCardHeader>
                      {formattedType} #{id}
                    </ProfileCardHeader>
                    <PanelBody>
                      {svg && <Image borderRadius="md" src={svg} />}
                      <Stack mt={4}>
                        <Text p={0}>Name: {name}</Text>
                        <Text p={0}>Title: {title}</Text>
                      </Stack>
                    </PanelBody>
                  </ProfileCard>
                </WrapItem>
              )
            })}
          </Wrap>
        ) : (
          <span>This wallet does not have any Hustlers</span>
        )}
      </SectionContent>
    </>
  )
}

export default HustlersWrapper
