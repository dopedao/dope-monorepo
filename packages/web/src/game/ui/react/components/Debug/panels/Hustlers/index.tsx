/* eslint-disable react/no-children-prop */
import { Accordion, AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel, InputGroup, InputLeftAddon, Checkbox, Input, Text } from "@chakra-ui/react";
import Citizen from "game/entities/citizen/Citizen";
import Hustler from "game/entities/Hustler";
import Position from "../../components/Position";

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
                        <Position object={hustler} />
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
                                                    <Position object={p.position} />
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

export default HustlersPanel;