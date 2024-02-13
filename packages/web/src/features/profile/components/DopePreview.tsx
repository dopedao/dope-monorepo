import { FC, useMemo } from 'react';
import { Box, Flex, HStack, Stack } from '@chakra-ui/react';

import { Dope, Item, ItemItemTier } from 'generated/graphql';

type DopePreviewDope = Pick<Dope, 'id' | 'rank'> & {
  items: Pick<Item, 'id' | 'tier'>[];
};

type DopePreviewProps = {
  dope: DopePreviewDope;
};

const TIER_META = {
  [ItemItemTier.BlackMarket]: {
    color: '#FEFC66',
    label: 'BLACK MARKET',
  },
  [ItemItemTier.Common]: {
    color: '#EC6F38',
    label: 'COMMON',
  },
  [ItemItemTier.Custom]: {
    color: '#4780F7',
    label: 'CUSTOM',
  },
  [ItemItemTier.Rare]: {
    color: '#FFFFFF',
    label: 'RARE',
  },
};

const DopePreview: FC<DopePreviewProps> = ({ dope }) => {
  const tierCounts = useMemo(() => {
    return dope.items.reduce(
      (result, item) => {
        const tier = item.tier ?? ItemItemTier.Common;
        return {
          ...result,
          [tier]: result[tier] + 1,
        };
      },
      {
        [ItemItemTier.BlackMarket]: 0,
        [ItemItemTier.Common]: 0,
        [ItemItemTier.Custom]: 0,
        [ItemItemTier.Rare]: 0,
      },
    );
  }, [dope]);

  return (
    <Box background="black" borderRadius="md" p={4}>
      <Stack color="gray">
        <span>( {dope.rank} / 8000 )</span>
        {[
          ItemItemTier.BlackMarket,
          ItemItemTier.Custom,
          ItemItemTier.Rare,
          ItemItemTier.Common,
        ].map(tier => {
          return (
            <Flex key={tier} justify="space-between">
              <HStack color={TIER_META[tier].color} spacing={2}>
                <span>●</span>
                <span>{tierCounts[tier]}</span>
              </HStack>
              <span>{TIER_META[tier].label}</span>
            </Flex>
          );
        })}
      </Stack>
    </Box>
  );
};

export default DopePreview;
