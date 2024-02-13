import { Box, Button, Flex, HStack, Stack } from '@chakra-ui/react';
import { useDrugQuery } from 'generated/graphql';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import Container from './Container';
import ContainerFooter from './ContainerFooter';
import ContainerHeader from './ContainerHeader';
import DrugQuantityGauge from './DrugQuantityGauge';
import { buildIconSVG } from 'utils/svg-builder';
import { css } from '@emotion/react';
import { RYO_ITEM_IDS, useLocationOwnedContract } from 'hooks/contracts/roll-your-own';
import { useStarknetCall } from '@starknet-react/core';
import { BigNumberish, toBN } from 'starknet/dist/utils/number';
import { BuyOrSell, useRollYourOwn } from '../context';

const Buy = () => {
  const router = useRouter();
  const { drugId } = router.query;

  const ryoItemId = RYO_ITEM_IDS[Number(drugId)];

  const { money, ownedItems, updateTurn } = useRollYourOwn();
  const [buyQuantity, setBuyQuantity] = useState(0);

  const { data: drugData } = useDrugQuery(
    {
      id: drugId as string,
    },
    {
      enabled: !!drugId,
    },
  );

  const drug = useMemo(() => {
    if (!drugData?.items.edges) return;

    const [drugItem] = drugData.items.edges;

    if (!drugItem?.node) return;

    return drugItem.node;
  }, [drugData]);

  const { contract } = useLocationOwnedContract();
  const { data: marketStateData } = useStarknetCall({
    contract,
    method: 'check_market_state',
    args: ['1', ryoItemId.toString()],
  });

  const [itemQuantity, moneyQuantity] = useMemo(() => {
    if (!marketStateData) return [undefined, undefined];

    const [itemQuantity, moneyQuantity]: BigNumberish[] = marketStateData;

    return [toBN(itemQuantity), toBN(moneyQuantity)];
  }, [marketStateData]);
  const cost = useMemo(() => {
    if (!itemQuantity || !moneyQuantity) return;

    return moneyQuantity.div(itemQuantity.sub(toBN(1)));
  }, [itemQuantity, moneyQuantity]);
  const userOwnedQuantity = ownedItems[ryoItemId - 1];
  const buyAmount = cost ? toBN(buyQuantity).mul(cost) : toBN(0);

  const fillPercentage = useMemo(() => {
    const p1 = money ? buyAmount.muln(100).div(money) : toBN(0);
    const p2 = itemQuantity ? toBN(buyQuantity * 100).div(itemQuantity) : toBN(0);

    return p1 > p2 ? p1.toNumber() : p2.toNumber();
  }, [buyAmount, money, buyQuantity, itemQuantity]);

  const handleBuy = () => {
    updateTurn({
      buyOrSell: BuyOrSell.Buy,
      itemId: ryoItemId,
      amountToGive: buyQuantity,
    });

    router.push('/roll-your-own/1/location/brooklyn/travel');
  };

  const rle = drug?.rles?.male ? drug?.rles?.male : drug?.base?.rles?.male;

  return (
    <Box>
      <Container>
        <ContainerHeader>
          <span>BUY</span>
        </ContainerHeader>

        {rle && (
          <Box
            css={css`
              display: flex;
              justify-content: center;
              width: 100%;
              height: 100%;
              overflow: hidden;
            }`}
            dangerouslySetInnerHTML={{ __html: buildIconSVG([rle]) }}
          />
        )}
        <ContainerFooter>
          <Flex justify="space-between">
            <HStack>
              <span>{drug?.name}</span>
              <Box background="#434345" borderRadius="full" py={0.5} px={2}>
                <span>${cost?.toString()}</span>
              </Box>
            </HStack>
            <HStack>
              <Box>{userOwnedQuantity?.toString()}</Box>
              <Box color="#22B617">+ {buyQuantity}</Box>
            </HStack>
          </Flex>
        </ContainerFooter>
      </Container>
      <Stack>
        <Box textAlign="center">
          Buy ({buyQuantity}) for ${buyAmount.toString()}
        </Box>
        <DrugQuantityGauge
          fillPercentage={fillPercentage}
          gaugeColor="#22B617"
          shouldDisableDecrease={buyQuantity === 0}
          shouldDisableIncrease={fillPercentage >= 100}
          onClickDecrease={() => setBuyQuantity(prev => prev - 1)}
          onClickIncrease={() => setBuyQuantity(prev => prev + 1)}
        />
      </Stack>
      <Flex justify="center" mt={10}>
        <Button isDisabled={buyQuantity === 0} variant="primary" onClick={handleBuy}>
          Buy ({buyQuantity})
        </Button>
      </Flex>
    </Box>
  );
};

export default Buy;
