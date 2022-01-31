import { FC } from "react"
import { Flex } from "@chakra-ui/react"

type ItemCountProps = {
  count: number
}

const ItemCount: FC<ItemCountProps> = ({
  count,
}) => {
  return (
    <Flex
      align="center"
      background="black"
      borderRadius="full"
      color="white"
      height={8}
      justify="center"
      width={8}
    >
      {count}
    </Flex>
  )
}

export default ItemCount
