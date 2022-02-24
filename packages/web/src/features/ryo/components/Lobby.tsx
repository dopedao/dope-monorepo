import {
  Flex,
  Button,
  Stack,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBoolean,
} from '@chakra-ui/react';
import { NavLink } from 'components/NavLink';
import Layout from './Layout';
import Container from './Container';
import ContainerHeader from './ContainerHeader';

const Lobby = () => {
  return (
    <Layout>
      <Stack>
        <Flex
          align="center"
          border="2px"
          borderRadius="md"
          height={160}
          justify="center"
        >
          RYO
        </Flex>
        <Container>
          <ContainerHeader>
            Lobby
          </ContainerHeader>
          <Table size="sm" color="white">
            <Thead>
              <Tr>
                <Th>Starts</Th>
                <Th isNumeric>Players</Th>
              </Tr>
            </Thead>
            <Tbody>
              {[0, 1, 2].map((match) => (
                <MatchRow key={match} />
              ))}
            </Tbody>
          </Table>
        </Container>
      </Stack>
    </Layout>
  )
};

export default Lobby;

const MatchRow = () => {
  const [isExpanded, setIsExpanded] = useBoolean();

  const CELL_PROPS = {
    borderBottom: isExpanded ? 'none' : 'inherit',
  };

  const background = isExpanded ? '#434345' : 'inherit';

  return (
    <>
      <Tr background={background} cursor="pointer" onClick={() => setIsExpanded.toggle()}>
        <Td {...CELL_PROPS}>
          30 min
        </Td>
        <Td isNumeric {...CELL_PROPS}>
          16
        </Td>
      </Tr>
      {isExpanded && (
        <Tr background={background}>
          <Td colSpan={2}>
            <NavLink href={`/roll-your-own/1`}>
              <Button color="black" w="full">View</Button>
            </NavLink>
          </Td>
        </Tr>
      )}
    </>
  )
}
