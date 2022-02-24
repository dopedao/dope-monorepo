import { Box, Button, Flex, HStack, Stack } from '@chakra-ui/react';
import { useDrugQuery } from 'generated/graphql';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import Container from './Container';
import ContainerFooter from './ContainerFooter';
import ContainerHeader from './ContainerHeader';
import DrugQuantityGauge from './DrugQuantityGauge';
import { buildIconSVG } from 'utils/svg-builder';
import { css } from '@emotion/react';
import { useDopeWarsContract } from 'hooks/contracts/roll-your-own';

const Buy = () => {
  const router = useRouter();
  const dopewars = useDopeWarsContract();
  const { drugId } = router.query;

  const { data } = useDrugQuery(
    {
      id: drugId as string,
    },
    {
      enabled: !!drugId,
    },
  );

  const drug = useMemo(() => {
    if (!data?.items.edges) return;

    const [drugItem] = data.items.edges;

    if (!drugItem?.node) return;

    return drugItem.node;
  }, [data]);

  const rle = drug?.rles?.male ? drug?.rles?.male : drug?.base?.rles?.male;

  const currentAmount = 0
  const cash = 100
  const cost = 10

  const [buyAmount, setBuyAmount] = useState(0)

  const totalPurchase = buyAmount * cost
  const fillPercentage = totalPurchase / cash * 100

  return (
    <Box>
      <Container>
        <ContainerHeader>
          <span>BUY</span>
        </ContainerHeader>

        {rle && (
          <div
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
              <Box
                background="#434345"
                borderRadius="full"
                py={0.5}
                px={2}
              >
                <span>${cost}</span>
              </Box>
            </HStack>
            <HStack>
              <Box>
                {currentAmount}
              </Box>
              <Box color="#22B617">
                + {buyAmount}
              </Box>
            </HStack>
          </Flex>
        </ContainerFooter>
      </Container>
      <Stack>
        <Box textAlign="center">
          Buy ({buyAmount}) for ${totalPurchase}
        </Box>
        <DrugQuantityGauge
          fillPercentage={fillPercentage}
          gaugeColor="#22B617"
          shouldDisableDecrease={buyAmount === 0}
          shouldDisableIncrease={totalPurchase >= cash}
          onClickDecrease={() => setBuyAmount(prev => prev - 1)}
          onClickIncrease={() => setBuyAmount(prev => prev + 1)}
        />
      </Stack>
      <Flex justify="center" mt={10}>
        <Button variant="primary">Buy ({buyAmount})</Button>
      </Flex>
    </Box>
  );
};

export default Buy;
