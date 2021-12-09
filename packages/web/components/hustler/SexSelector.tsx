import { Flex, Radio, RadioGroup, Spacer } from '@chakra-ui/react';
import { HustlerInitConfig, HustlerSex } from 'src/HustlerConfig';
import PanelBody from 'components/PanelBody';
import PanelContainer from 'components/PanelContainer';
import PanelTitleBar from 'components/PanelTitleBar';
import { ConfigureHustlerProps } from 'features/hustlers/components/ConfigureHustler';

const SexSelector = ({ config, makeVarConfig }: ConfigureHustlerProps) => (
  <PanelContainer>
    <PanelTitleBar>Sex</PanelTitleBar>
    <PanelBody>
      <RadioGroup
        onChange={value => {
          makeVarConfig
            ? makeVarConfig({ ...config, sex: value as HustlerSex })
            : HustlerInitConfig({ ...config, sex: value as HustlerSex });
        }}
        value={config.sex}
      >
        <Flex>
          <Spacer />
          <Radio value="male">Male</Radio>
          <Spacer />
          <Radio value="female">Female</Radio>
          <Spacer />
        </Flex>
      </RadioGroup>
    </PanelBody>
  </PanelContainer>
);

export default SexSelector;
