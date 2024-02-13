import { Accordion, AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel, Text } from "@chakra-ui/react"
import GameScene from "game/scenes/Game";
import { LDtkMapPack } from "game/world/LDtkParser"
import Position from "../../components/Position"

const WorldPanel = (props: {map: LDtkMapPack}) => {
    const gameScene = props.map.displayLayers[0].scene as GameScene;

    return (
        <Box>
            <Box style={{
                paddingLeft: '1rem',
            }}>
                <Text>
                    Day color:
                    <input 
                        type="color" 
                        onChange={(e) => {
                            const value = e.target.value;
                            const color = value.substring(1);
                            const r = parseInt(color.substring(0, 2), 16);
                            const g = parseInt(color.substring(2, 4), 16);
                            const b = parseInt(color.substring(4, 6), 16);
                            
                            gameScene.dayColor = [r, g, b];
                        }}
                        defaultValue={'#' + 
                            gameScene.dayColor[0].toString(16) + 
                            gameScene.dayColor[1].toString(16) + 
                            gameScene.dayColor[2].toString(16)}
                    />
                    <br/>
                    Night color:
                    <input 
                        type="color" 
                        onChange={(e) => {
                            const value = e.target.value;
                            const color = value.substring(1);
                            const r = parseInt(color.substring(0, 2), 16);
                            const g = parseInt(color.substring(2, 4), 16);
                            const b = parseInt(color.substring(4, 6), 16);
 
                            gameScene.nightColor = [r, g, b];
                        }}
                        defaultValue={'#' + 
                            gameScene.nightColor[0].toString(16) + 
                            gameScene.nightColor[1].toString(16) + 
                            gameScene.nightColor[2].toString(16)}
                    />
                    <br/>
                    <br/>
                    Display Layers: {props.map.displayLayers.length}
                    <br/>
                    IntGrid Layers: {props.map.intGridLayers.length}
                    <br/>
                    Entities: {props.map.entities.length}
                </Text>
            </Box>
            <Accordion>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex='1' textAlign='left'>
                                Display Layers
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex='1' textAlign='left'>
                                Collide layer
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex='1' textAlign='left'>
                                IntGrid Layers
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex='1' textAlign='left'>
                                Entities
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <Accordion>
                            {
                                props.map.entities.map((entity, i) => {
                                    return <AccordionItem key={i}>
                                        <h2>
                                            <AccordionButton>
                                                <Box flex='1' textAlign='left'>
                                                    #{i}: {entity.name}
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={4}>
                                            <Position object={entity}/>
                                        </AccordionPanel>
                                    </AccordionItem>
                                })
                            }
                        </Accordion>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>

        </Box>
    )
}

export default WorldPanel;