import { BackgroundProps, Box, Button, HStack } from '@chakra-ui/react';
import { number } from 'starknet';

const DrugQuantityGauge = ({
  gaugeColor,
  fillPercentage,
  shouldDisableDecrease,
  shouldDisableIncrease,
  onClickDecrease,
  onClickIncrease,
}: {
  gaugeColor: BackgroundProps['background'];
  fillPercentage?: number;
  shouldDisableDecrease: boolean;
  shouldDisableIncrease: boolean;
  onClickDecrease: () => void;
  onClickIncrease: () => void;
}) => {
  return (
    <HStack justify="space-evenly">
      <Button isDisabled={shouldDisableDecrease} fontSize="3xl" onClick={onClickDecrease}>
        -
      </Button>
      <Box border="3px solid black" h={5} w={200}>
        <Box background={gaugeColor} h="full" w={`${fillPercentage}%`} />
      </Box>
      <Button isDisabled={shouldDisableIncrease} fontSize="3xl" onClick={onClickIncrease}>
        +
      </Button>
    </HStack>
  );
};

export default DrugQuantityGauge;
