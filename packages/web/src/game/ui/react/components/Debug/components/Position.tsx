/* eslint-disable react/no-children-prop */
import { Flex, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Box } from '@chakra-ui/react';

const Position = (props: {object: any}) => {
    const [x, setX] = useState(props.object.x);
    const [y, setY] = useState(props.object.y);

    useEffect(() => {
        if (x)
            props.object.x = x;
        if (y)
            props.object.y = y;
    }, [props.object, x, y]);

    return (
        // <VStack>
        <Box>
            Position XY
            <Flex>
                <NumberInput maxW='100px' mr='2rem' value={x} onChange={(s, n) => setX(n)}>
                    <NumberInputField />
                    <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <Slider
                    flex='1'
                    focusThumbOnChange={false}
                    value={x}
                    onChange={(n) => setX(n)}
                >
                    <SliderTrack>
                    <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb fontSize='sm' boxSize='32px' children={Math.round(x)} />
                </Slider>
            </Flex>
            <Flex>
                <NumberInput maxW='100px' mr='2rem' value={y} onChange={(s, n) => setY(n)}>
                    <NumberInputField />
                    <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <Slider
                    flex='1'
                    focusThumbOnChange={false}
                    value={y}
                    onChange={(n) => setY(n)}
                >
                    <SliderTrack>
                    <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb fontSize='sm' boxSize='32px' children={Math.round(y)} />
                </Slider>
            </Flex>
        </Box>
        // </VStack>
    )
}

export default Position;