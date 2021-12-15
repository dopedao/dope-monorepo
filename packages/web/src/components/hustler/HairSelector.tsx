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
import { HustlerInitConfig, MAX_HAIR, MAX_FACIAL_HAIR } from 'utils/HustlerConfig';
import { ConfigureHustlerProps } from 'features/hustlers/components/ConfigureHustler';
import Accordion from 'ui/components/Accordion';

const HairSelector = ({ config, makeVarConfig }: ConfigureHustlerProps) => {
  const isMale = config.sex == 'male';

  return (
    <Accordion title="Other">
      <Flex gridGap={4}>
        <Box width={isMale ? '50%' : '100%'}>
          <FormLabel htmlFor="hair" color="blackAlpha.900">
            Hair
          </FormLabel>
          <NumberInput
            name="hair"
            defaultValue={0}
            min={0}
            max={MAX_HAIR}
            onChange={value =>
              makeVarConfig
                ? makeVarConfig({ ...config, hair: parseInt(value) })
                : HustlerInitConfig({ ...config, hair: parseInt(value) })
            }
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
          <Box width="50%">
            <FormLabel htmlFor="facial_hair" color="blackAlpha.900">
              Facial Hair
            </FormLabel>
            <NumberInput
              name="facial_hair"
              defaultValue={0}
              min={0}
              max={MAX_FACIAL_HAIR}
              onChange={value =>
                makeVarConfig
                  ? makeVarConfig({ ...config, facialHair: parseInt(value) })
                  : HustlerInitConfig({ ...config, facialHair: parseInt(value) })
              }
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
    </Accordion>
  );
};

export default HairSelector;
