import { 
  Flex,
  Radio,
  RadioGroup,
  Spacer
} from '@chakra-ui/react';
import { HustlerInitConfig, HustlerSex } from '../../src/HustlerInitiation';
import { useReactiveVar } from '@apollo/client';
import PanelBody from '../PanelBody';
import PanelContainer from '../PanelContainer';
import PanelTitleBar from '../PanelTitleBar';

const SexSelector = () => {  
  const hustlerConfig = useReactiveVar(HustlerInitConfig);

  return (
    <PanelContainer>
      <PanelTitleBar>Sex</PanelTitleBar>
      <PanelBody>
        <RadioGroup 
          onChange={(value) => HustlerInitConfig({ ...hustlerConfig, sex: value as HustlerSex })}
          value={hustlerConfig.sex}
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
};

export default SexSelector;
