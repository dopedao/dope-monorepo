import { Box, Button, Table, Tbody, Td, Tr } from "@chakra-ui/react"
import { useRollYourOwn } from "../context"
import Container from "./Container"
import ContainerHeader from "./ContainerHeader"

const Summary = () => {
  const { haveTurn } = useRollYourOwn()
  const actions = ["The Big Easy", "Atlanta", "Compton", "London"]

  return (
    <Box>
      <Container>
        <ContainerHeader>
          <span>Activity</span>
        </ContainerHeader>

        <Table size="sm" color="white">
          <Tbody>
            {actions.map((destination) => (
              <Tr key={destination} cursor="pointer">
                <Td>
                  {destination}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Container>
      <Button onClick={haveTurn}>Continue</Button>
    </Box>
  )
}

export default Summary
