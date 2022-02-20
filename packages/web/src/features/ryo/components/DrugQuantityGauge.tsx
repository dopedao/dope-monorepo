import { BackgroundProps, Box, Button, HStack } from "@chakra-ui/react"

const DrugQuantityGauge = ({
  gaugeColor,
}: {
  gaugeColor: BackgroundProps["background"]
}) => {
  return (
    <HStack justify="space-evenly">
      <Button>
        -
      </Button>
      <Box
        background={gaugeColor}
        border="3px solid black"
        h={5}
        w={200}
      />
      <Button>
        +
      </Button>
    </HStack>
  )
}

export default DrugQuantityGauge
