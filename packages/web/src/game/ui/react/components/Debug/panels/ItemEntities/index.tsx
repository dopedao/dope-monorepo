import { Accordion, AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel, Text } from "@chakra-ui/react"
import ItemEntity from "game/entities/ItemEntity"
import Position from "../../components/Position"

const ItemEntitiesPanel = (props: {itemEntities: ItemEntity[]}) => {
    return (
        <Box>
            <Box style={{
                paddingLeft: '1rem',
            }}>
                <Text>
                    {props.itemEntities.length}
                </Text>
            </Box>
            <Accordion>
                {
                    props.itemEntities.map((itemEntity, i) => {
                        return <AccordionItem key={i}>
                            <h2>
                                <AccordionButton>
                                    <Box flex='1' textAlign='left'>
                                        #{i}: {itemEntity.name}
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Position object={itemEntity}/>
                            </AccordionPanel>
                        </AccordionItem>
                    })
                }
            </Accordion>
        </Box>
    )
}

export default ItemEntitiesPanel;