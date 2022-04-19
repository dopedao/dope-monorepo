import { Accordion, AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel, Text } from "@chakra-ui/react"
import { LDtkMapPack } from "game/world/LDtkParser"
import Position from "../../components/Position"

const WorldPanel = (props: {map: LDtkMapPack}) => {
    return (
        <div>
            <div style={{
                paddingLeft: '1rem',
            }}>
                <Text>
                    Display Layers: {props.map.displayLayers.length}
                    <br/>
                    IntGrid Layers: {props.map.intGridLayers.length}
                    <br/>
                    Entities: {props.map.entities.length}
                </Text>
            </div>
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

        </div>
    )
}

export default WorldPanel;