import { Box, Button, Link } from "@chakra-ui/react"
import { NavLink } from "components/NavLink"
import Container from "./Container"
import ContainerHeader from "./ContainerHeader"

const Buy = () => {
  return (
    <Box>
      <NavLink href="/roll-your-own">
        <Button>
          Back
        </Button>
      </NavLink>
      <Container>
        <ContainerHeader>
          <span color="white">BUY</span>
        </ContainerHeader>
      </Container>
    </Box>
  )
}

export default Buy
