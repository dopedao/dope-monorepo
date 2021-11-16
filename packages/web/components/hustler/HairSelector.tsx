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
import { HustlerInitConfig, HustlerSex, MAX_HAIR, MAX_FACIAL_HAIR } from 'src/HustlerConfig';
import { useReactiveVar } from '@apollo/client';
import PanelBody from '../PanelBody';
import PanelContainer from '../PanelContainer';
import PanelTitleBar from '../PanelTitleBar';

const HairSelector = () => {
  const hustlerConfig = useReactiveVar(HustlerInitConfig);
  const isMale = (hustlerConfig.sex == 'male');

  return (
    <PanelContainer>
      <PanelTitleBar>Other</PanelTitleBar>
      <PanelBody>
        <Flex gridGap={4}>
          <Box width={ isMale ? '50%' : '100%' }>
            <FormLabel htmlFor="hair">Hair</FormLabel>
            <NumberInput
              name="hair"
              defaultValue={0}
              min={0}
              max={MAX_HAIR}
              onChange={value => HustlerInitConfig({ ...hustlerConfig, hair: parseInt(value) })}
              value={hustlerConfig.hair}
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
                  HustlerInitConfig({ ...hustlerConfig, facialHair: parseInt(value) })
                }
                value={hustlerConfig.facialHair}
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
