import { Flex, HStack } from "@chakra-ui/react"

const GameWindowHeader = () => {
  return (
    <Flex
      color="white"
      justify="space-between"
      p={4}
    >
      <HStack>
        <span>Avatar</span>
        <span>Username</span>
      </HStack>
      <HStack>
        <span>CASH</span>
        <span>$0</span>
      </HStack>
    </Flex>
  )
}

export default GameWindowHeader
