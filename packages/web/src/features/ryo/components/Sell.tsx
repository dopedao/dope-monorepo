import { Box, Button, Flex, HStack, Stack } from "@chakra-ui/react"
import { css } from "@emotion/react"
import { useStarknetCall } from "@starknet-react/core"
import { useDrugQuery } from "generated/graphql"
import { RYO_ITEM_IDS, useLocationOwnedContract } from "hooks/contracts/roll-your-own"
import { useRouter } from "next/router"
import { useMemo, useState } from "react"
import { BigNumberish, toBN } from "starknet/dist/utils/number"
import { buildIconSVG } from "utils/svg-builder"
import { BuyOrSell, useRollYourOwn } from "../context"
import Container from "./Container"
import ContainerFooter from "./ContainerFooter"
import ContainerHeader from "./ContainerHeader"
import DrugQuantityGauge from "./DrugQuantityGauge"

const Sell = () => {
  const router = useRouter()
  const { drugId } = router.query

  const ryoItemId = RYO_ITEM_IDS[Number(drugId)]

  const { ownedItems, updateTurn } = useRollYourOwn()
  const [sellQuantity, setSellQuantity] = useState(0)

  const { data } = useDrugQuery({
    id: drugId as string,
  }, {
    enabled: !!drugId,
  })
  const { contract } = useLocationOwnedContract()
  const { data: marketStateData } = useStarknetCall({
    contract,
    method: "check_market_state",
    args: ["1", ryoItemId.toString()],
  })

  const drug = useMemo(() => {
    if (!data?.items.edges) return

    const [drugItem] = data.items.edges

    if (!drugItem?.node) return

    return drugItem.node
  }, [data])

  const [itemQuantity, moneyQuantity] = useMemo(
    () => {
      if (!marketStateData) return [undefined, undefined]

      const [itemQuantity, moneyQuantity]: BigNumberish[] = marketStateData

      return [toBN(itemQuantity), toBN(moneyQuantity)]
    },
    [marketStateData]
  )
  const cost = useMemo(
    () => {
      if (!itemQuantity || !moneyQuantity) return

      return moneyQuantity.div(itemQuantity.sub(toBN(1)))
    },
    [itemQuantity, moneyQuantity]
  )
  
  const userOwnedQuantity = ownedItems[ryoItemId - 1]
  const sellAmount = cost?.muln(sellQuantity)
  const fillPercentage = useMemo(() => {
    if (!userOwnedQuantity || userOwnedQuantity.isZero()) {
      return 0
    }

    return toBN(sellQuantity * 100).div(userOwnedQuantity).toNumber()
  }, [userOwnedQuantity, sellQuantity])

  const handleSell = () => {
    updateTurn({
      buyOrSell: BuyOrSell.Sell,
      itemId: ryoItemId,
      amountToGive: sellQuantity,
    })

    router.push("/roll-your-own/1/location/brooklyn/travel")
  }
  
  const rle = drug?.rles?.male ? drug?.rles?.male : drug?.base?.rles?.male;

  return (
    <Box>
      <Container>
        <ContainerHeader>
          <span>Sell</span>
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
              <Box
                background="#434345"
                borderRadius="full"
                py={0.5}
                px={2}
              >
                <span>${cost?.toString()}</span>
              </Box>
            </HStack>
            <HStack>
              <Box>
                {userOwnedQuantity?.toString()}
              </Box>
              <Box color="#FF2828">
                - {sellQuantity}
              </Box>
            </HStack>
          </Flex>
        </ContainerFooter>
      </Container>
      <Stack>
        <Box textAlign="center">
          Sell ({sellQuantity}) for ${sellAmount?.toString()}
        </Box>
        <DrugQuantityGauge
          fillPercentage={fillPercentage}
          gaugeColor="#FF2828"
          shouldDisableDecrease={sellQuantity === 0}
          shouldDisableIncrease={userOwnedQuantity?.lten(sellQuantity)}
          onClickDecrease={() => setSellQuantity(prev => prev - 1)}
          onClickIncrease={() => setSellQuantity(prev => prev + 1)}
        />
      </Stack>
      <Flex justify="center" mt={10}>
        <Button variant="primary" onClick={handleSell}>Sell ({sellQuantity})</Button>
      </Flex>
    </Box>
  )
}

export default Sell
