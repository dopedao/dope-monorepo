import { Box } from '@chakra-ui/layout';
import { RadioProps } from '@chakra-ui/radio';
import { useRadio } from '@chakra-ui/radio';

const SELECTOR_SIZE = '48px';
interface ChipRadioProps extends RadioProps {
  color: string;
}

const PanelColorChipRadio = (props: ChipRadioProps) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label" flex="1">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderRadius="4px"
        border="2px solid black"
        boxShadow="0"
        bg={props.color}
        height={SELECTOR_SIZE}
        _checked={{
          boxShadow: '0 0 0 2px black',
        }}
        _focus={{
          boxShadow: '0 0 0 2px black',
        }}
      >
        &nbsp;
      </Box>
    </Box>
  );
};

export default PanelColorChipRadio;
