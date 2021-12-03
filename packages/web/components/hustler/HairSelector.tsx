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
import { HustlerInitConfig, MAX_HAIR, MAX_FACIAL_HAIR } from 'src/HustlerConfig';
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import PanelTitleBar from 'components/PanelTitleBar';
import { ConfigureHustlerProps } from 'features/hustlers/components/ConfigureHustler';

const HairSelector = ({ config, makeVarConfig }: ConfigureHustlerProps) => {
  const isMale = config.sex == 'male';

  return (
    <PanelContainer>
      <PanelTitleBar>Other</PanelTitleBar>
      <PanelBody>
        <Flex gridGap={4}>
          <Box width={isMale ? '50%' : '100%'}>
            <FormLabel htmlFor="hair">Hair</FormLabel>
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
              <FormLabel htmlFor="facial_hair">Facial Hair</FormLabel>
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
      </PanelBody>
    </PanelContainer>
  );
};

export default HairSelector;
