import {
  Flex,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Radio,
  RadioGroup,
  Spacer,
} from '@chakra-ui/react';
import { HustlerInitConfig, HustlerSex, MAX_HAIR, MAX_FACIAL_HAIR } from 'src/HustlerConfig';
import { useReactiveVar } from '@apollo/client';
import PanelBody from '../PanelBody';
import PanelContainer from '../PanelContainer';
import PanelTitleBar from '../PanelTitleBar';

const HairSelector = () => {
  const hustlerConfig = useReactiveVar(HustlerInitConfig);

  return (
    <PanelContainer>
      <PanelTitleBar>Other</PanelTitleBar>
      <PanelBody>
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
        {/* Only render Facial Hair for Males  */}
        {hustlerConfig.sex === 'male' && (
          <>
            <br />
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
          </>
        )}
      </PanelBody>
    </PanelContainer>
  );
};

export default HairSelector;
