import React, { useState } from "react";
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
  extendTheme,
  Input,
} from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Popover: {
      variants: {
        picker: {
          popper: {
            maxWidth: "unset",
            width: "unset"
          }
        }
      }
    }
  }
});

const ColorPicker = (colors: string[], selectedColor?: string) => {
  const [color, setColor] = useState(selectedColor ?? colors[0]);

  return <>
    <Popover variant="picker">
      <PopoverTrigger>
        <Button
          aria-label={color}
          background={color}
          height="22px"
          width="22px"
          padding={0}
          minWidth="unset"
          borderRadius={3}
        ></Button>
      </PopoverTrigger>
      <PopoverContent width="170px">
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
        <PopoverBody height="120px">
          <SimpleGrid columns={5} spacing={2}>
            {colors.map((c) => (
              <Button
                key={c}
                aria-label={c}
                background={c}
                height="22px"
                width="22px"
                padding={0}
                minWidth="unset"
                borderRadius={3}
                _hover={{ background: c }}
                onClick={() => {
                  setColor(c);
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
            onChange={(e) => {
              setColor(e.target.value);
            }}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  </>;
}

export default ColorPicker;
