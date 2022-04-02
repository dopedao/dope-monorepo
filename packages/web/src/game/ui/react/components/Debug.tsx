/* eslint-disable react/no-children-prop */
import { Accordion, Slider, Text, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, ChakraProvider, Container, Input, InputGroup, InputLeftAddon, Tab, TabList, TabPanel, TabPanels, Tabs, HStack, Checkbox, Button, NumberInputField, Flex, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputStepper, SliderFilledTrack, SliderThumb, SliderTrack, VStack } from "@chakra-ui/react";
import DesktopWindow from "components/DesktopWindow";
import Citizen from "game/entities/citizen/Citizen";
import Hustler from "game/entities/Hustler";
import ItemEntity from "game/entities/ItemEntity";
import Player from "game/entities/player/Player";
import { ComponentManager } from "phaser3-react/src/manager";
import { useEffect, useReducer, useState } from "react";
import theme from "ui/styles/theme";

interface DebugData {
    manager: ComponentManager;
    player: Player;
    // other players (hustlers) & citizens
    hustlers: Hustler[];
    itemEntities: ItemEntity[];
    lights: Phaser.GameObjects.LightsManager;
}

const PositionComponent = (props: {object: any}) => {
    const [x, setX] = useState(props.object.x);
    const [y, setY] = useState(props.object.y);

    useEffect(() => {
        if (x)
            props.object.x = x;
        if (y)
            props.object.y = y;
    }, [x, y]);

    return (
        // <VStack>
        <div>
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
        </div>
        // </VStack>
    )
}

const PlayerPanel = (props: {player: Player}) => {
    const player = props.player;

    return (
        <Accordion>
            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box flex='1' textAlign='left'>
                        Basic info
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <InputGroup size="sm">
                        <InputLeftAddon children='Name' />
                        <Input onChange={(e) => player.name = e.target.value} placeholder={player.name} />
                    </InputGroup>
                    <div>
                        <PositionComponent object={player} />
                    </div>
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box flex='1' textAlign='left'>
                        Quests
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    {player.questManager.quests.map((quest, i) => {
                        <Text>
                            {quest.name}: {quest.description}
                        </Text>
                    })}
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}

const HustlersPanel = (props: { hustlers: Hustler[] }) => {
    const hustlers = props.hustlers;

    return (
        <Accordion allowToggle>
            {hustlers.map((hustler, i) => 
                <AccordionItem key={i}>
                    <h2>
                        <AccordionButton>
                            <Box flex='1' textAlign='left'>
                                {hustler.name}: {hustler.hustlerId ?? 'No Hustler'}
                                <br/>
                                Citizen: {hustler instanceof Citizen ? '✅' : '❌'}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <InputGroup size="sm">
                            <InputLeftAddon children='Name' />
                            <Input onChange={(e) => hustler.name = e.target.value} placeholder={hustler.name} />
                        </InputGroup>
                        <div>
                        <PositionComponent object={hustler} />
                        </div>
                        <br />
                        <Accordion allowToggle>
                            {hustler instanceof Citizen ? <div>
                                <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box flex='1' textAlign='left'>
                                            Path
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                        Repeat path:
                                        <Checkbox defaultChecked={hustler.repeatPath} onChange={(e) => hustler.repeatPath = e.target.checked} />
                                        <br />
                                        Follow path:
                                        <Checkbox defaultChecked={hustler.shouldFollowPath} onChange={(e) => hustler.shouldFollowPath = e.target.checked} />
                                        <br />
                                        <br />
                                        {
                                            hustler.path.map((p, i) => 
                                                <div key={i}>
                                                    PathPoint #{i}
                                                    <PositionComponent object={p.position} />
                                                    <br />
                                                </div>
                                            )
                                        }
                                </AccordionPanel>
                            </AccordionItem>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box flex='1' textAlign='left'>
                                            Conversations
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                        {
                                            hustler.conversations.map((c, i) => 
                                                <div key={i}>
                                                    <Accordion>
                                                        {
                                                            c.texts.map((t, i) =>
                                                                <AccordionItem key={i}>
                                                                    <h2>
                                                                        <AccordionButton>
                                                                            <Box flex='1' textAlign='left'>
                                                                                {t.text}
                                                                            </Box>
                                                                            <AccordionIcon />
                                                                        </AccordionButton>
                                                                    </h2>
                                                                    <AccordionPanel pb={4}>
                                                                        <InputGroup size="sm">
                                                                            <InputLeftAddon children='Text' />
                                                                            <Input onChange={(e) => t.text = e.target.value} placeholder={t.text} />
                                                                        </InputGroup>
                                                                        <Text>
                                                                            Choices
                                                                        </Text>
                                                                        {
                                                                            t.choices ? t.choices.map((c, i) =>
                                                                                <div key={i}>
                                                                                    <InputGroup size="sm">
                                                                                        <InputLeftAddon children='Text' />
                                                                                        <Input onChange={(e) => (t.choices!)[i] = e.target.value} placeholder={c} />
                                                                                    </InputGroup>
                                                                                </div>
                                                                            ) : undefined
                                                                        }
                                                                    </AccordionPanel>
                                                                </AccordionItem>
                                                            )
                                                        }
                                                    </Accordion>
                                                </div>
                                            )
                                        }
                                </AccordionPanel>
                            </AccordionItem>
                            </div> : undefined}
                        </Accordion>
                    </AccordionPanel>
                </AccordionItem>
            )}
        </Accordion>
        
    )
}

const LightsPanel = (props: { player: Player, lights: Phaser.GameObjects.LightsManager }) => {
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    
    const player = props.player;
    const lights = props.lights;

    return (
        <>
            <div style={{
                paddingLeft: '1rem',
            }}>
                Enabled: <Checkbox onChange={(e) => lights.active = e.target.checked} defaultChecked={lights.active}/>
                <br/>
                Number of lights: {lights.getLightCount()}
                <br/>
                Ambient color:
                <input 
                    type="color" 
                    onChange={(e) => {
                        const value = e.target.value;
                        const color = value.substring(1);
                        const r = parseInt(color.substring(0, 2), 16) / 255;
                        const g = parseInt(color.substring(2, 4), 16) / 255;
                        const b = parseInt(color.substring(4, 6), 16) / 255;
                        lights.ambientColor.set(r, g, b);
                    }}
                    value={'#' + 
                        (lights.ambientColor.r * 255).toString(16) + 
                        (lights.ambientColor.g * 255).toString(16) + 
                        (lights.ambientColor.b * 255).toString(16)}
                />
                <br/>
                <Button onClick={(e) => {
                    lights.addLight(player.x, player.y);
                    forceUpdate();
                }}>
                    Add light
                </Button>
            </div>
            <br/>
            <Accordion defaultIndex={0}>
                {
                    lights.lights.slice().reverse().map((light, i) => {
                        return <AccordionItem key={i}>
                            <h2>
                                <AccordionButton>
                                    <Box flex='1' textAlign='left'>
                                        Light: {light.x} {light.y}
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <PositionComponent object={light}/>
                                <InputGroup size="sm">
                                    <InputLeftAddon children='Radius' />
                                    <Input onChange={(e) => light.radius = Number.parseInt(e.target.value) ?? 0} placeholder={light.radius.toString()} />
                                </InputGroup>
                                <InputGroup size="sm">
                                    <InputLeftAddon children='Intensity' />
                                    <Input onChange={(e) => light.intensity = Number.parseInt(e.target.value) ?? 0} placeholder={light.intensity.toString()} />
                                </InputGroup>
                                <br/>
                                Visible: <Checkbox onChange={(e) => light.visible = e.target.checked} defaultChecked={light.visible}/>
                                <div>
                                    Color:
                                    <input 
                                        type="color" 
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            const color = value.substring(1);
                                            const r = parseInt(color.substring(0, 2), 16) / 255;
                                            const g = parseInt(color.substring(2, 4), 16) / 255;
                                            const b = parseInt(color.substring(4, 6), 16) / 255;
                                            light.color.set(r, g, b);
                                        }}
                                        value={'#' + 
                                            (light.color.r * 255).toString(16) + 
                                            (light.color.g * 255).toString(16) + 
                                            (light.color.b * 255).toString(16)}
                                    />
                                </div>
                                <br/>
                                <Button variant="cny" onClick={(e) => {
                                    lights.removeLight(light);
                                    forceUpdate();
                                }}>
                                    Remove light
                                </Button>
                            </AccordionPanel>
                        </AccordionItem>
                    })
                }
            </Accordion>
        </>
    )
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
                <div style={{
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
                                <p>world</p>
                            </TabPanel>
                            <TabPanel>
                                <HustlersPanel hustlers={props.hustlers} />
                            </TabPanel>
                            <TabPanel>
                                <p>item entities</p>
                            </TabPanel>
                            <TabPanel>
                                <LightsPanel player={props.player} lights={props.lights} />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
            </Container>
        </ChakraProvider>
    )
}