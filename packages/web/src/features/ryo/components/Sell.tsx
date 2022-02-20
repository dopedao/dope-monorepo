import { Box, Button } from "@chakra-ui/react"
import { NavLink } from "components/NavLink"
import { useDrugQuery } from "generated/graphql"
import { useRouter } from "next/router"
import { useMemo } from "react"
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

  return (
    <Box>
      <NavLink href="/roll-your-own">
        <Button>
          Back
        </Button>
      </NavLink>
      <Container>
        <ContainerHeader>
          <span>Sell</span>
        </ContainerHeader>

        {/* DRUG svg goes here */}

        <ContainerFooter>
          <span>{drug?.name}</span>
        </ContainerFooter>
      </Container>
      <DrugQuantityGauge gaugeColor="#FF2828" />
    </Box>
  )
}

export default Sell
