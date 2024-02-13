import {
  FormLabel,
  Box,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputStepper,
  Flex,
} from '@chakra-ui/react';
import { MAX_HAIR, MAX_FACIAL_HAIR } from 'utils/HustlerConfig';
import { ConfigureHustlerProps } from 'features/hustlers/components/ConfigureHustler';
import { Image } from '@chakra-ui/react';
import styled from '@emotion/styled';

const ImageWrapper = styled.div`
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  overflow: hidden;
  height: 60px;
  width: 60px;
`;

const HairSelector = ({ config, setHustlerConfig }: ConfigureHustlerProps) => {
  const isMale = config.sex === 'male';

  return (
    <Box>
      <Flex gridGap={4}>
        <Box width="100px" borderBottom="1px solid #EFEFEF" paddingBottom="16px">
          <FormLabel htmlFor="hair" color="blackAlpha.900" fontSize="14px">
            Hair
          </FormLabel>
          <NumberInput
            backgroundColor="#CCC"
            height="60px"
            maxWidth="90px"
            boxShadow="0 0 0 2px black"
            border="none"
            borderRadius="8px"
            name="hair"
            defaultValue={0}
            min={0}
            max={MAX_HAIR}
            onChange={value => setHustlerConfig({ ...config, hair: parseInt(value) })}
            value={config.hair}
            color="blackAlpha.900"
          >
            <ImageWrapper>
              <Image height="100%" width="100%" alt="hair" src="/images/config/hair.png" />
            </ImageWrapper>
            <NumberInputStepper borderLeft="2px solid black">
              <NumberIncrementStepper
                backgroundColor="#EFEFEF"
                boxShadow={`inset -1px -1px 0px rgba(0, 0, 0, 0.25), inset 1px 1px 0px rgba(255, 255, 255, 0.25);`}
                borderRight="1px solid #b3b3b3"
                borderBottom="2px solid #b3b3b3"
                height="30px"
              />
              <NumberDecrementStepper
                backgroundColor="#EFEFEF"
                boxShadow={`inset -1px -1px 0px rgba(0, 0, 0, 0.25), inset 1px 1px 0px rgba(255, 255, 255, 0.25);`}
                borderTop="2px solid black"
                borderRight="1px solid #b3b3b3"
                borderBottom="1px solid #b3b3b3"
                height="30px"
              />
            </NumberInputStepper>
          </NumberInput>
        </Box>
        {/* Only render Facial Hair for Males  */}
        {isMale && (
          <Box width="100px" borderBottom="1px solid #EFEFEF" paddingBottom="16px">
            <FormLabel htmlFor="facial_hair" color="blackAlpha.900" fontSize="14px">
              Facial Hair
            </FormLabel>
            <NumberInput
              backgroundColor="#CCC"
              height="60px"
              maxWidth="90px"
              boxShadow="0 0 0 2px black"
              border="none"
              borderRadius="8px"
              name="facial_hair"
              defaultValue={0}
              min={0}
              max={MAX_FACIAL_HAIR}
              onChange={value => setHustlerConfig({ ...config, facialHair: parseInt(value) })}
              value={config.facialHair}
              color="blackAlpha.900"
            >
              <ImageWrapper>
                <Image
                  height="100%"
                  width="100%"
                  alt="facial-hair"
                  src="/images/config/facial-hair.png"
                />
              </ImageWrapper>
              <NumberInputStepper>
                <NumberIncrementStepper
                  backgroundColor="#EFEFEF"
                  boxShadow={`inset -1px -1px 0px rgba(0, 0, 0, 0.25), inset 1px 1px 0px rgba(255, 255, 255, 0.25);`}
                  borderRight="1px solid #b3b3b3"
                  borderBottom="2px solid #b3b3b3"
                  height="30px"
                />
                <NumberDecrementStepper
                  backgroundColor="#EFEFEF"
                  boxShadow={`inset -1px -1px 0px rgba(0, 0, 0, 0.25), inset 1px 1px 0px rgba(255, 255, 255, 0.25);`}
                  borderTop="2px solid black"
                  borderRight="1px solid #b3b3b3"
                  borderBottom="1px solid #b3b3b3"
                  height="30px"
                />
              </NumberInputStepper>
            </NumberInput>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default HairSelector;
