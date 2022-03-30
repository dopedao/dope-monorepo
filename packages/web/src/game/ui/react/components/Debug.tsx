/* eslint-disable react/no-children-prop */
import { Accordion, Text, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, ChakraProvider, Container, Input, InputGroup, InputLeftAddon, Tab, TabList, TabPanel, TabPanels, Tabs, HStack, Checkbox, Button } from "@chakra-ui/react";
import DesktopWindow from "components/DesktopWindow";
import Citizen from "game/entities/citizen/Citizen";
import Hustler from "game/entities/Hustler";
import ItemEntity from "game/entities/ItemEntity";
import Player from "game/entities/player/Player";
import { ComponentManager } from "phaser3-react/src/manager";
import { useEffect, useReducer } from "react";
import theme from "ui/styles/theme";

interface DebugData {
    manager: ComponentManager;
    player: Player;
    // other players (hustlers) & citizens
    hustlers: Hustler[];
    itemEntities: ItemEntity[];
    lights: Phaser.GameObjects.LightsManager;
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
                        <InputGroup size="sm">
                            <InputLeftAddon children='Position X' />
                            <Input onChange={(e) => player.x = Number.parseInt(e.target.value) ?? 0} placeholder={player.x.toString()} />
                        </InputGroup>
                        <InputGroup size="sm">
                            <InputLeftAddon children='Position Y' />
                            <Input onChange={(e) => player.y = Number.parseInt(e.target.value) ?? 0} placeholder={player.y.toString()} />
                        </InputGroup>
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
        <Accordion>
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
                            <InputGroup size="sm">
                                <InputLeftAddon children='Position X' />
                                <Input onChange={(e) => hustler.x = Number.parseInt(e.target.value) ?? 0} placeholder={hustler.x.toString()} />
                            </InputGroup>
                            <InputGroup size="sm">
                                <InputLeftAddon children='Position Y' />
                                <Input onChange={(e) => hustler.y = Number.parseInt(e.target.value) ?? 0} placeholder={hustler.y.toString()} />
                            </InputGroup>
                        </div>
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
                Enabled: <Checkbox defaultChecked={lights.active}/>
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
                <Button onClick={() => lights.addLight(player.x, player.y) && forceUpdate()}>
                    Add light
                </Button>
            </div>
            <br/>
            <Accordion style={{
                // display: 'flex',
                // overflow: 'auto',
            }}>
                {
                    lights.lights.map((light, i) => {
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
                                <InputGroup size="sm">
                                    <InputLeftAddon children='Position X' />
                                    <Input onChange={(e) => light.x = Number.parseInt(e.target.value) ?? 0} placeholder={light.x.toString()} />
                                </InputGroup>
                                <InputGroup size="sm">
                                    <InputLeftAddon children='Position Y' />
                                    <Input onChange={(e) => light.y = Number.parseInt(e.target.value) ?? 0} placeholder={light.y.toString()} />
                                </InputGroup>
                                <InputGroup size="sm">
                                    <InputLeftAddon children='Radius' />
                                    <Input onChange={(e) => light.radius = Number.parseInt(e.target.value) ?? 0} placeholder={light.radius.toString()} />
                                </InputGroup>
                                <InputGroup size="sm">
                                    <InputLeftAddon children='Intensity' />
                                    <Input onChange={(e) => light.intensity = Number.parseInt(e.target.value) ?? 0} placeholder={light.intensity.toString()} />
                                </InputGroup>
                                <br/>
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