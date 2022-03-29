import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { useStarknet, useStarknetInvoke } from "@starknet-react/core"
import { NavLink } from "components/NavLink"
import { useUserRegistryContract } from "hooks/contracts/roll-your-own"
import { useMemo } from "react"
import Container from "./Container"
import ContainerFooter from "./ContainerFooter"
import ContainerHeader from "./ContainerHeader"
import Layout from "./Layout"

const MatchDetails = () => {
  const { account } = useStarknet();
  const registry = useUserRegistryContract();

  const isRegistered = useMemo(
    () => registry?.call('get_user_info', { user_id: account! }),
    [account, registry],
  );

  const { invoke, data, loading, error } = useStarknetInvoke({
    contract: registry,
    method: 'register_user',
  });

  return (
    <Layout>
      <Container>
        <ContainerHeader>
          Lobby
        </ContainerHeader>
        <Table size="sm" color="white">
          <Tbody>
            {[0, 1, 2].map((match, index) => (
              <PlayerRow key={match} rowIndex={index} />
            ))}
          </Tbody>
        </Table>
      </Container>
      {isRegistered ? (
        <NavLink href="/roll-your-own/1/location/brooklyn" passHref>
          <Button variant="primary">Play</Button>
        </NavLink>
      ) : (
        <Button
          variant="primary"
          onClick={() =>
            invoke({
              args: { user_id: account, data: '84622096520155505419920978765481155' },
            })
          }
        >
          Join
        </Button>
      )}
    </Layout>
  )
}

export default MatchDetails

const PlayerRow = ({ rowIndex }: {
  rowIndex: number
}) => {
  return (
    <Tr>
      <Td>
        {rowIndex}
      </Td>
      <Td>
        (hustler name)
      </Td>
    </Tr>
  )
}
