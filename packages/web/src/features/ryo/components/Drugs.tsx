import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
} from '@chakra-ui/react'

const DRUGS = [
  {
    name: "Weed",
    cost: 10,
    quantity: 1,
  },
]

const Drugs = () => {
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
          {DRUGS.map((drug) => (
            <Tr key={drug.name}>
              <Td>{drug.name}</Td>
              <Td>{drug.cost}</Td>
              <Td>{drug.quantity}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default Drugs
