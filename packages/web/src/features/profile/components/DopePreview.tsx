import { FC, useMemo } from "react"
import { Box, Flex, HStack, Stack } from "@chakra-ui/react"

import { Dope, Item, ItemTier } from "generated/graphql"

type DopePreviewDope = Pick<Dope, "id" | "rank"> & {
  items: Pick<Item, "id" | "tier">[]
}

type DopePreviewProps = {
  dope: DopePreviewDope
}

const TIER_META = {
  [ItemTier.BlackMarket]: {
    color: "#FEFC66",
    label: "BLACK MARKET",
  },
  [ItemTier.Common]: {
    color: "#EC6F38",
    label: "COMMON",
  },
  [ItemTier.Custom]: {
    color: "#4780F7",
    label: "CUSTOM",
  },
  [ItemTier.Rare]: {
    color: "#FFFFFF",
    label: "RARE",
  },
}

const DopePreview: FC<DopePreviewProps> = ({
  dope,
}) => {
  const tierCounts = useMemo(() => {
    return dope.items.reduce((result, item) => {
      return {
        ...result,
        [item.tier]: result[item.tier] + 1,
      }
    }, {
      [ItemTier.BlackMarket]: 0,
      [ItemTier.Common]: 0,
      [ItemTier.Custom]: 0,
      [ItemTier.Rare]: 0,
    })
  }, [dope])

  return (
    <Box background="black" borderRadius="md" p={4}>
      <Stack color="gray">
        <span>( {dope.rank} / 8000 )</span>
        {[
          ItemTier.BlackMarket,
          ItemTier.Custom,
          ItemTier.Rare,
          ItemTier.Common,
        ].map((tier) => {
          return (
            <Flex key={tier} justify="space-between">
              <HStack color={TIER_META[tier].color} spacing={2}>
                <span>●</span>
                <span>{tierCounts[tier]}</span>
              </HStack>
              <span>{TIER_META[tier].label}</span>
            </Flex>
          )
        })}
      </Stack>
    </Box>
  )
}

export default DopePreview
