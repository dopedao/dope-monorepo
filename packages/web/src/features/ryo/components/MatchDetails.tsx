import { Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { useStarknet, useStarknetInvoke, useStarknetCall } from "@starknet-react/core"
import { NavLink } from "components/NavLink"
import { useUserRegistryContract } from "hooks/contracts/roll-your-own"
import { useMemo } from "react"
import { BigNumberish } from "starknet/dist/utils/number"
import Container from "./Container"
import ContainerFooter from "./ContainerFooter"
import ContainerHeader from "./ContainerHeader"
import Layout from "./Layout"

const MatchDetails = () => {
  const { account } = useStarknet();
  const { contract } = useUserRegistryContract();

  const { data: userInfoData, loading: userInfoLoading, error: userInfoError } = useStarknetCall<(string | undefined)[]>({
    contract,
    method: "get_user_info",
    args: [account],
  })

  const isRegistered = useMemo(
    () => {
      if (!userInfoData) return false

      const [result]: BigNumberish[] = userInfoData

      return Boolean(Number(result.toString()))
    },
    [userInfoData]
  )

  const userRegistry = useUserRegistryContract()

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
            userRegistry.contract?.invoke("register_user", [account, '84622096520155505419920978765481155'])
              .then(console.log).catch((err) => console.log(err))
          }
        >
          Join
        </Button>
      )
      }
    </Layout >
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
