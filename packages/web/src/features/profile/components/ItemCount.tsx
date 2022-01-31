import { FC } from "react"
import { Box } from "@chakra-ui/react"

type ItemCountProps = {
  count: number
}

const ItemCount: FC<ItemCountProps> = ({
  count,
}) => {
  return (
    <Box
      background="black"
      borderRadius="full"
      color="white"
      boxSize={6}
    >
      {count}
    </Box>
  )
}

export default ItemCount
