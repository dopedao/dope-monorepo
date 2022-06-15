import { Box, Button, Table, Tbody, Td, Tr, useBoolean } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useRollYourOwn } from "../context"
import Container from "./Container"
import ContainerHeader from "./ContainerHeader"

const Travel = () => {
  const destinations = ["The Big Easy", "Atlanta", "Compton", "London"]

  return (
    <Box>
      <Container>
        <ContainerHeader>
          <span>Destination</span>
        </ContainerHeader>

        <Table size="sm" color="white">
        <Tbody>
          {destinations.map((destination) => (
            <DestinationRow key={destination} destination={destination} />
          ))}
        </Tbody>
      </Table>
      </Container>
    </Box>
  )
}

export default Travel

const DestinationRow = ({ destination }: { destination: string }) => {
  const router = useRouter()
  const { updateTurn } = useRollYourOwn()

  const [isExpanded, setIsExpanded] = useBoolean();

  const handleTravel = () => {
    updateTurn({
      locationId: 2,
    })

    router.push("/roll-your-own/1/location/brooklyn/summary")
  }

  const CELL_PROPS = {
    borderBottom: isExpanded ? 'none' : 'inherit',
  };
  const background = isExpanded ? '#434345' : 'inherit';

  return (
    <>
      <Tr background={background} cursor="pointer" onClick={() => setIsExpanded.toggle()}>
        <Td {...CELL_PROPS}>
          {destination}
        </Td>
      </Tr>
      {isExpanded && (
        <Tr background={background}>
          <Td colSpan={2}>
            <Button
              color="black"
              w="full"
              onClick={handleTravel}
            >
              Travel and end turn
            </Button>
          </Td>
        </Tr>
      )}
    </>
  );
};
