import { Flex, Radio, RadioGroup, Spacer } from '@chakra-ui/react';
import { HustlerSex } from 'utils/HustlerConfig';
import { ConfigureHustlerProps } from 'features/hustlers/components/ConfigureHustler';
import Accordion from 'ui/components/Accordion';

const SexSelector = ({ config, setHustlerConfig }: ConfigureHustlerProps) => (
  <Accordion title="Sex">
    <RadioGroup
      onChange={value => setHustlerConfig({ ...config, sex: value as HustlerSex })}
      value={config.sex}
      color="blackAlpha.900"
    >
      <Flex>
        <Spacer />
        <Radio value="male">Male</Radio>
        <Spacer />
        <Radio value="female">Female</Radio>
        <Spacer />
      </Flex>
    </RadioGroup>
  </Accordion>
);

export default SexSelector;
