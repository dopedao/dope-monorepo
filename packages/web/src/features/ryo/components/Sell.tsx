import { Box, Button, Flex, HStack, Stack } from "@chakra-ui/react"
import { css } from "@emotion/react"
import { useDrugQuery } from "generated/graphql"
import { useRouter } from "next/router"
import { useMemo, useState } from "react"
import { buildIconSVG } from "utils/svg-builder"
import Container from "./Container"
import ContainerFooter from "./ContainerFooter"
import ContainerHeader from "./ContainerHeader"
import DrugQuantityGauge from "./DrugQuantityGauge"

const Sell = () => {
  const router = useRouter()
  const { drugId } = router.query

  const { data } = useDrugQuery({
    id: drugId as string,
  }, {
    enabled: !!drugId,
  })

  const drug = useMemo(() => {
    if (!data?.items.edges) return

    const [drugItem] = data.items.edges

    if (!drugItem?.node) return

    return drugItem.node
  }, [data])

  const rle = drug?.rles?.male ? drug?.rles?.male : drug?.base?.rles?.male;

  const currentAmount = 10
  const cash = 100
  const cost = 10

  const [sellAmount, setSellAmount] = useState(0)

  const totalSale = sellAmount * cost
  const fillPercentage = totalSale / cash * 100

  return (
    <Box>
      <Container>
        <ContainerHeader>
          <span>Sell</span>
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
              <Box color="#FF2828">
                - {sellAmount}
              </Box>
            </HStack>
          </Flex>
        </ContainerFooter>
      </Container>
      <Stack>
        <Box textAlign="center">
          Sell ({sellAmount}) for ${totalSale}
        </Box>
        <DrugQuantityGauge
          fillPercentage={fillPercentage}
          gaugeColor="#FF2828"
          shouldDisableDecrease={sellAmount === 0}
          shouldDisableIncrease={sellAmount >= currentAmount}
          onClickDecrease={() => setSellAmount(prev => prev - 1)}
          onClickIncrease={() => setSellAmount(prev => prev + 1)}
        />
      </Stack>
      <Flex justify="center" mt={10}>
        <Button variant="primary">Sell ({sellAmount})</Button>
      </Flex>
    </Box>
  )
}

export default Sell
