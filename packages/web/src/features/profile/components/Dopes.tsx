import { FC, useMemo } from "react"
import { HStack } from "@chakra-ui/react"
import { useWeb3React } from "@web3-react/core";

import DopeCard from "features/dope/components/DopeCard";

import { Dope, Item, useProfileDopesQuery } from "generated/graphql"

import CardContainer from "./CardContainer";
import SectionContent from "./SectionContent";
import SectionHeader from "./SectionHeader";
import ItemCount from "./ItemCount";

type ProfileDope = Pick<Dope, "id" | "claimed" | "opened" | "rank" | "score"> & {
  items: Pick<Item, "id" | "fullname" | "type" | "name" | "tier" | "greatness" | "count">[]
}

const Dopes: FC = () => {
  const { account } = useWeb3React()

  const { data, isFetching } = useProfileDopesQuery({
    where: {
      id: account,
    },
  })

  const dopes = useMemo(() => {
    if (!data?.wallets.edges) return []

    return data.wallets.edges?.reduce((result, edge) => {
      if (!edge?.node?.dopes) return result

      const { dopes } = edge.node

      return [...result, ...dopes]
    }, [] as ProfileDope[])
  }, [data])

  return (
    <>
      <SectionHeader>
        <HStack>
          <span>Dopes</span>
          <ItemCount count={dopes.length} />
        </HStack>
      </SectionHeader>
      <SectionContent isFetching={isFetching} minH={isFetching ? 200 : 0}>
        {dopes.length ? (
          <CardContainer>
            {dopes.map((dope) => (
              <DopeCard key={dope.id} buttonBar="for-owner" dope={dope} />)
            )}
          </CardContainer>
        ) : (
          <span>This wallet does not have any Dope</span>
        )}
      </SectionContent>
    </>
  )
}

export default Dopes
