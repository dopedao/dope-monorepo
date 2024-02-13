/* eslint-disable react/no-children-prop */
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  InputGroup,
  InputLeftAddon,
  Checkbox,
  Input,
  Text,
} from '@chakra-ui/react';
import Citizen from 'game/entities/citizen/Citizen';
import Hustler from 'game/entities/Hustler';
import Position from '../../components/Position';

const HustlersPanel = (props: { hustlers: Hustler[] }) => {
  const hustlers = props.hustlers;

  return (
    <Accordion allowToggle>
      {hustlers.map((hustler, i) => (
        <AccordionItem key={i}>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {hustler.name}: {hustler.hustlerId ?? 'No Hustler'}
                <br />
                Citizen: {hustler instanceof Citizen ? '✅' : '❌'}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <InputGroup size="sm">
              <InputLeftAddon children="Name" />
              <Input onChange={e => (hustler.name = e.target.value)} placeholder={hustler.name} />
            </InputGroup>
            <Box>
              <Position object={hustler} />
            </Box>
            <br />
            <Accordion allowToggle>
              {hustler instanceof Citizen ? (
                <Box>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          Path
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      Repeat path:
                      <Checkbox
                        defaultChecked={hustler.repeatPath}
                        onChange={e => (hustler.repeatPath = e.target.checked)}
                      />
                      <br />
                      Follow path:
                      <Checkbox
                        defaultChecked={hustler.shouldFollowPath}
                        onChange={e => (hustler.shouldFollowPath = e.target.checked)}
                      />
                      <br />
                      <br />
                      {hustler.path.map((p, i) => (
                        <Box key={i}>
                          PathPoint #{i}
                          <Position object={p.position} />
                          <br />
                        </Box>
                      ))}
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          Conversations
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      {hustler.conversations.map((c, i) => (
                        <Box key={i}>
                          <Accordion>
                            {c.texts.map((t, i) => (
                              <AccordionItem key={i}>
                                <h2>
                                  <AccordionButton>
                                    <Box flex="1" textAlign="left">
                                      {t.text}
                                    </Box>
                                    <AccordionIcon />
                                  </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                  <InputGroup size="sm">
                                    <InputLeftAddon children="Text" />
                                    <Input
                                      onChange={e => (t.text = e.target.value)}
                                      placeholder={t.text}
                                    />
                                  </InputGroup>
                                  <Text>Choices</Text>
                                  {/* TODO FIX …error where this is a string but map expects an array */}
                                  {/* {t.choices
                                    ? t.choices.map((c, i) => (
                                        <Box key={i}>
                                          <InputGroup size="sm">
                                            <InputLeftAddon children="Text" />
                                            <Input
                                              onChange={e => (t.choices![i] = e.target.value)}
                                              placeholder={c}
                                            />
                                          </InputGroup>
                                        </Box>
                                      ))
                                    : undefined} */}
                                </AccordionPanel>
                              </AccordionItem>
                            ))}
                          </Accordion>
                        </Box>
                      ))}
                    </AccordionPanel>
                  </AccordionItem>
                </Box>
              ) : undefined}
            </Accordion>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default HustlersPanel;
