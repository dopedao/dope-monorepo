import {
  FormLabel,
  Box,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import { MAX_HAIR, MAX_FACIAL_HAIR } from 'utils/HustlerConfig';
import { ConfigureHustlerProps } from 'features/hustlers/components/ConfigureHustler';

const HairSelector = ({ config, setHustlerConfig }: ConfigureHustlerProps) => {
  const isMale = config.sex == 'male';

  return (
    <div>
      <Flex gridGap={4}>
        <Box width={isMale ? '50%' : '100%'} borderBottom="1px solid #EFEFEF" paddingBottom="16px">
          <FormLabel htmlFor="hair" color="blackAlpha.900" fontSize="14px">
            Hair
          </FormLabel>
          <NumberInput
            name="hair"
            defaultValue={0}
            min={0}
            max={MAX_HAIR}
            onChange={value => setHustlerConfig({ ...config, hair: parseInt(value) })}
            value={config.hair}
            color="blackAlpha.900"
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
        {/* Only render Facial Hair for Males  */}
        {isMale && (
          <Box width="50%" borderBottom="1px solid #EFEFEF" paddingBottom="16px">
            <FormLabel htmlFor="facial_hair" color="blackAlpha.900" fontSize="14px">
              Facial Hair
            </FormLabel>
            <NumberInput
              name="facial_hair"
              defaultValue={0}
              min={0}
              max={MAX_FACIAL_HAIR}
              onChange={value => setHustlerConfig({ ...config, facialHair: parseInt(value) })}
              value={config.facialHair}
              color="blackAlpha.900"
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
        )}
      </Flex>
    </div>
  );
};

export default HairSelector;
