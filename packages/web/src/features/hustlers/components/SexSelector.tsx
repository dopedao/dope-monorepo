import { Flex, Radio, RadioGroup } from '@chakra-ui/react';
import { HustlerSex } from 'utils/HustlerConfig';
import { ConfigureHustlerProps } from 'features/hustlers/components/ConfigureHustler';
import styled from '@emotion/styled';
import { Box } from '@chakra-ui/react';

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 32px;
  font-size: var(--text-00);
  text-align: center;
  padding: 0;
  margin-bottom: 16px;
`;

const SexSelector = ({ config, setHustlerConfig }: ConfigureHustlerProps) => (
  <Box>
    <Header>
      <h4>Sex</h4>
    </Header>
    <RadioGroup
      borderBottom="1px solid #EFEFEF"
      paddingBottom="16px"
      onChange={value => setHustlerConfig({ ...config, sex: value as HustlerSex })}
      value={config.sex}
      color="blackAlpha.900"
    >
      <Flex justifyContent="flex-start" gap="32px">
        <Radio fontSize="14px !important" value="male">
          Male
        </Radio>
        <Radio fontSize="14px !important" value="female">
          Female
        </Radio>
      </Flex>
    </RadioGroup>
  </Box>
);

export default SexSelector;
