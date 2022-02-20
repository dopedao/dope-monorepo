import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  useBoolean,
  Link,
} from '@chakra-ui/react'
import { NavLink } from 'components/NavLink'
import { useDrugsQuery } from 'generated/graphql'
import { useMemo } from 'react'

type Drug = {
  name: string
  cost: number
  quantity: number
}

const Drugs = () => {
  const { data } = useDrugsQuery()

  const drugs = useMemo(() => {
    if (!data?.items.edges) return []

    return data.items.edges.reduce((result, edge) => {
      if (!edge || !edge.node) return result

      const { node } = edge

      return [
        ...result,
        {
          name: node?.name,
          cost: 10,
          quantity: 1,
        },
      ]
    }, [] as Drug[])
  }, [data])

  return (
    <Box p={10}>
      <Table size='sm' color="white">
        <Thead>
          <Tr>
            <Th>Product</Th>
            <Th isNumeric>Cost</Th>
            <Th isNumeric>Quantity</Th>
          </Tr>
        </Thead>
        <Tbody>
          {drugs.map((drug) => (
            <DrugRow
              key={drug.name}
              drug={drug}
            />
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default Drugs

const DrugRow = ({
  drug,
}: {
  drug: Drug
}) => {
  const [isExpanded, setIsExpanded] = useBoolean()

  const CELL_PROPS = {
    borderBottom: isExpanded ? "none" : "inherit",
  }

  const background = isExpanded ? "#434345" : "inherit"

  return (
    <>
      <Tr
        background={background}
        cursor="pointer" onClick={() => setIsExpanded.toggle()}>
        <Td {...CELL_PROPS}>{drug.name}</Td>
        <Td isNumeric {...CELL_PROPS}>{drug.cost}</Td>
        <Td isNumeric {...CELL_PROPS}>{drug.quantity}</Td>
      </Tr>
      {isExpanded && (
        <Tr background={background}>
          <Td>
            <NavLink href="/roll-your-own/buy">
              <Button color="black">
                Buy
              </Button>
            </NavLink>
          </Td>
          <Td />
          <Td>
            <NavLink href="/roll-your-own/sell">
              <Button color="black">
                SELL
              </Button>
            </NavLink>
          </Td>
        </Tr>
      )}
    </>
  )
}
