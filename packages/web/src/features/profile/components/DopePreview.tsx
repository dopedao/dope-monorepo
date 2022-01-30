import { FC, useMemo } from "react"
import { Box, Flex, Stack, Text } from "@chakra-ui/react"

import { Dope, Item, ItemTier } from "generated/graphql"

type DopePreviewDope = Pick<Dope, "id" | "rank"> & {
  items: Pick<Item, "id" | "tier">[]
}

type DopePreviewProps = {
  dope: DopePreviewDope
}

const TIER_LABELS = {
  [ItemTier.BlackMarket]: "BLACK MARKET",
  [ItemTier.Common]: "COMMON",
  [ItemTier.Custom]: "CUSTOM",
  [ItemTier.Rare]: "RARE",
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
    <Box background="black" p={4}>
      <Stack>
        <Text color="#fff" opacity={0.5}>( {dope.rank} / 8000 )</Text>
        {[
          ItemTier.BlackMarket,
          ItemTier.Custom,
          ItemTier.Rare,
          ItemTier.Common,
        ].map((tier) => (
          <Flex id={tier} justify="space-between">
            <Text color="#fff" opacity={0.5}>{TIER_LABELS[tier]}</Text>
            <Text color="#fff" opacity={0.5}>{tierCounts[tier]}</Text>
          </Flex>
        ))}
      </Stack>
    </Box>
  )
}

export default DopePreview
