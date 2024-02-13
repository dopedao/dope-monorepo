/* eslint-disable react/no-children-prop */
import { Accordion, Slider, Text, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, ChakraProvider, Container, Input, InputGroup, InputLeftAddon, Tab, TabList, TabPanel, TabPanels, Tabs, HStack, Checkbox, Button, NumberInputField, Flex, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputStepper, SliderFilledTrack, SliderThumb, SliderTrack, VStack } from "@chakra-ui/react";
import DesktopWindow from "components/DesktopWindow";
import Citizen from "game/entities/citizen/Citizen";
import Hustler from "game/entities/Hustler";
import ItemEntity from "game/entities/ItemEntity";
import Player from "game/entities/player/Player";
import { LDtkMapPack } from "game/world/LDtkParser";
import { ComponentManager } from "phaser3-react/src/manager";
import { useEffect, useReducer, useState } from "react";
import theme from "ui/styles/theme";
import { PlayerPanel, WorldPanel, HustlersPanel, ItemEntitiesPanel, LightsPanel } from "./panels";


interface DebugData {
    manager: ComponentManager;
    player: Player;
    map: LDtkMapPack;
    // other players (hustlers) & citizens
    hustlers: Hustler[];
    itemEntities: ItemEntity[];
    lights: Phaser.GameObjects.LightsManager;
}

export default function Debug(props: DebugData) {
    const handleKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape')
        {
            props.manager.events.emit('close');
            e.stopPropagation();
        }
    }

    useEffect(() => {
        document.addEventListener('keyup', handleKey);

        return () => {
            document.removeEventListener('keyup', handleKey);
        }
    });

    return (
        <ChakraProvider theme={theme}>
            <Container style={{
                display: 'flex',
                overflow: 'auto',
                position: "absolute",
                top: "2%",
                right: "2%",
                width: "40%",
                height: "50%",
                backgroundColor: "rgba(255,255,255,0.8)",
                borderRadius: "10px",
            }}>
                <Box style={{
                    position: "relative",
                    padding: "1rem",
                }}>
                    <Tabs>
                        <TabList>
                            <Tab fontSize="0.8rem">Player</Tab>
                            <Tab fontSize="0.8rem">World</Tab>
                            <Tab fontSize="0.8rem">Hustlers</Tab>
                            <Tab fontSize="0.8rem">Item Entities</Tab>
                            <Tab fontSize="0.8rem">Lights</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <PlayerPanel player={props.player} />
                            </TabPanel>
                            <TabPanel>
                                <WorldPanel map={props.map} />
                            </TabPanel>
                            <TabPanel>
                                <HustlersPanel hustlers={props.hustlers} />
                            </TabPanel>
                            <TabPanel>
                                <ItemEntitiesPanel itemEntities={props.itemEntities} />
                            </TabPanel>
                            <TabPanel>
                                <LightsPanel player={props.player} lights={props.lights} />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Container>
        </ChakraProvider>
    )
}