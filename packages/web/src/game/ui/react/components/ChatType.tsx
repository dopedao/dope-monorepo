import { InputGroup, InputRightElement, Button, Input, ChakraProvider, Container, Stack, Center, Spacer, Text, List, ListItem, AbsoluteCenter } from '@chakra-ui/react';
import { ComponentManager } from 'phaser3-react/src/manager';
import React, { useEffect } from 'react';
import { FormEvent } from 'react';
import theme from 'ui/styles/theme';

export interface DisplayMessage {
  author: string;
  message: string;
}

interface Props {
  manager: ComponentManager;
  precedentMessages: string[];
  messagesStore: DisplayMessage[];
}

export default function ChatType(props: Props) {
  const [inputText, setInputText] = React.useState('');
  const [messages, setMessages] = React.useState(props.messagesStore);

  const newMessageRef = React.useRef(null);
  const messagesListRef = React.useRef(null);

  let state = React.useRef({
    i: -1,
  });

  useEffect(() => {
    if (messagesListRef.current) (messagesListRef.current as any).scrollTo(0, (messagesListRef.current as any).scrollHeight);
    props.manager.events.on('chat_message', (message: DisplayMessage) => {
      setMessages([...messages, message]);
      if (newMessageRef.current) (newMessageRef.current as any).hidden = false;
    });
  }, []);

  const handleInputKey = (e: string) => {
    if (e === 'Enter') handleSubmit(inputText);
    else if (e === 'Escape')
      // send "nothing", chat will get closed & message will not get sent
      handleSubmit('');
    else if (e === 'ArrowUp') {
      state.current.i = ++state.current.i % props.precedentMessages.length;
      const precedentMessage = props.precedentMessages[state.current.i];
      if (precedentMessage) setInputText(precedentMessage);
    } else if (e === 'ArrowDown') {
      // rolling window, wrap around
      state.current.i = --state.current.i % props.precedentMessages.length;
      if (state.current.i < 0) state.current.i = props.precedentMessages.length - 1;

      const precedentMessage = props.precedentMessages[state.current.i];
      if (precedentMessage) setInputText(precedentMessage);
    }
  };

  const handleSubmit = (content: string) => {
    props.manager.events.emit('chat_submit', content);
  };

  return (
    <ChakraProvider theme={theme}>
      <Container 
      style={{
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: '0.5rem',
        boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.7)',
        height: '30%',
        width: '30%',
        left: "1%",
        bottom: "1%",
      }}>
        <Stack style={{
          paddingTop: '1rem',
          height: '95%',
        }}>
          <div style={{
            display: 'flex',
            overflow: 'auto',
            flexDirection: 'column-reverse',
            marginBottom: '-3%',
          }}>
            <List ref={messagesListRef} spacing={-2} style={{
            }}>
              {props.messagesStore.map((message, i) => <ListItem key={i}>
                  <Text style={{
                    color: 'white',
                  }}>
                    {message.author}: {message.message}
                  </Text>
              </ListItem>)}
            </List>
          </div>
          <Spacer />
          <Button ref={newMessageRef} variant="primary" hidden={true} onClick={() => {
              if (newMessageRef.current) (newMessageRef.current as any).hidden = true;
              if (messagesListRef.current)
                (messagesListRef.current as HTMLOListElement).lastElementChild?.scrollIntoView({
                  behavior: 'smooth',
                });
            }}>
              New message
          </Button>
          <Center>
            <InputGroup width="90%" size="md">
              <Input
                autoFocus={true}
                focusBorderColor="white"
                onBlur={({ target }) => target.focus()}
                pr="4.5rem"
                placeholder="Message"
                _placeholder={{ color: '#b8b8b8' }}
                textColor="#f5f5f5"
                value={inputText}
                onChange={({ target }) => setInputText(target.value)}
                onKeyDown={e => handleInputKey(e.key)}
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                }}
              />
              <InputRightElement width="4.5rem" style={{ paddingRight: '2%' }}>
                <Button h="1.75rem" size="sm" onClick={() => handleSubmit(inputText)}>
                  Send
                </Button>
              </InputRightElement>
            </InputGroup>
          </Center>
        </Stack>
      </Container>
    </ChakraProvider>
  );
}
