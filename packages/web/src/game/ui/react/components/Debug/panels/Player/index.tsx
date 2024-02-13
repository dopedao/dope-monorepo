/* eslint-disable react/no-children-prop */
import { Accordion, AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel, InputGroup, InputLeftAddon, Input, Text } from "@chakra-ui/react";
import Player from "game/entities/player/Player";
import Position from "../../components/Position";

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
                    <Box>
                        <Position object={player} />
                    </Box>
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

export default PlayerPanel;