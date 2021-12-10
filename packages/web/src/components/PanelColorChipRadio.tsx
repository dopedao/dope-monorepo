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
        borderWidth="1px"
        borderRadius="0"
        borderColor="#000000"
        boxShadow="0"
        outline="1px solid"
        outlineColor="#000000"
        bg={props.color}
        height={SELECTOR_SIZE}
        _checked={{
          borderWidth: '4px',
          borderColor: '#000000',
          outline: '4px solid',
          outlineColor: '#000000',
        }}
        _focus={{
          boxShadow: 'outline',
          borderColor: '#000000',
          outline: '4px solid',
          outlineColor: '#000000',
        }}
      >
        &nbsp;
      </Box>
    </Box>
  );
};

export default PanelColorChipRadio;
