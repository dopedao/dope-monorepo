import { Box } from "@chakra-ui/react"
import { css } from "@emotion/react"
import { useDrugQuery } from "generated/graphql"
import { useRouter } from "next/router"
import { useMemo } from "react"
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
          <span>{drug?.name}</span>
        </ContainerFooter>
      </Container>
      <DrugQuantityGauge gaugeColor="#FF2828" />
    </Box>
  )
}

export default Sell
