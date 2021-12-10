import { useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Center,
  SimpleGrid,
  Input,
} from '@chakra-ui/react';

interface ColorPickerProps {
  colors: string[];
  selectedColor?: string;
  changeCallback?(value: string): void;
}

const ColorPicker = ({ colors, selectedColor, changeCallback }: ColorPickerProps) => {
  const [color, setColor] = useState(selectedColor ?? colors[0]);

  const handleColorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleColorChange(e.target.value);
  };

  const handleColorChange = (color: string) => {
    setColor(color);
    if (typeof changeCallback === 'function') changeCallback(color);
  };

  return (
    <>
      <Popover variant="picker">
        <PopoverTrigger>
          <Button
            aria-label={color}
            background={color}
            height="64px"
            width="64px"
            padding={0}
            minWidth="unset"
            borderRadius={3}
          ></Button>
        </PopoverTrigger>
        <PopoverContent width="196px">
          <PopoverArrow bg={color} />
          <PopoverCloseButton color="white" />
          <PopoverHeader
            height="100px"
            backgroundColor={color}
            borderTopLeftRadius={5}
            borderTopRightRadius={5}
            color="white"
          >
            <Center height="100%">{color}</Center>
          </PopoverHeader>
          <PopoverBody height="96px">
            <SimpleGrid columns={5} spacing={2}>
              {colors.map(c => (
                <Button
                  key={c}
                  aria-label={c}
                  background={c}
                  height="32px"
                  width="32px"
                  padding={0}
                  minWidth="unset"
                  borderRadius={3}
                  _hover={{ background: c }}
                  onClick={() => {
                    handleColorChange(c);
                  }}
                ></Button>
              ))}
            </SimpleGrid>
            <Input
              borderRadius={3}
              marginTop={3}
              placeholder="red.100"
              size="sm"
              value={color}
              onChange={handleColorInputChange}
            />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ColorPicker;
