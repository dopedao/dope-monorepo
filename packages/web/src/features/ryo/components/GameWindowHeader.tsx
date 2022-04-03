import { Flex, HStack } from "@chakra-ui/react"
import { ReactNode } from "react"

export const GameWindowHeaderHustlerProfile = () => {
  return (
    <HStack>
      <span>Avatar</span>
      <span>Username</span>
    </HStack>
  )
}

export const GameWindowHeaderAchievements = () => {
  return (
    <HStack>
      <span>CASH</span>
      <span>$0</span>
    </HStack>
  )
}

const GameWindowHeader = ({
  children,
}: { children: ReactNode }) => {
  return (
    <Flex
      color="white"
      justify="space-between"
      pt={3}
      px={3}
    >
      {children}
    </Flex>
  )
}

export default GameWindowHeader
