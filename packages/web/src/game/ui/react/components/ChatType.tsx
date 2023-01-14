import { InputGroup, InputRightElement, Button, Input, ChakraProvider, Container, Stack, Center, Spacer, Text, List, ListItem, AbsoluteCenter, HStack, IconButton } from '@chakra-ui/react';
import { Hustler } from '@dopewars/contracts';
import { DataTypes, NetworkEvents } from 'game/handlers/network/types';
import { ComponentManager } from 'phaser3-react/src/manager';
import Toast from 'phaser3-rex-plugins/templates/ui/toast/Toast';
import React, { useEffect, KeyboardEvent } from 'react';
import { FormEvent } from 'react';
import theme from 'ui/styles/theme';

interface Props {
  manager: ComponentManager;
  chatMessageBoxes?: Array<Toast>;
  precedentMessages: string[];
  messagesStore: DataTypes[NetworkEvents.SERVER_PLAYER_CHAT_MESSAGE][];
}

// check if element is inside of container rect
const isVisible = (ele: HTMLElement, container: HTMLElement) => {
  const { bottom, height, top } = ele.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  return top <= containerRect.top ? containerRect.top - top <= height : bottom - containerRect.bottom <= height;
};

export default function ChatType(props: Props) {
  const [ unreadMessages, setUnreadMessages ] = React.useState(0);
  const [ inputText, setInputText ] = React.useState('');
  const [ messages, setMessages ] = React.useState(props.messagesStore);
  const [ canSendMessage, setCanSendMessage ] = React.useState((props.chatMessageBoxes?.length ?? 0) < 3);

  const messagesListRef = React.useRef<HTMLUListElement>(null);

  let state = React.useRef({
    i: -1,
  });

  useEffect(() => {
    props.manager.events.on('chat_message', (message: DataTypes[NetworkEvents.SERVER_PLAYER_CHAT_MESSAGE]) => {
      setMessages(m => [...m, message]);
      const lastMessageEl = messagesListRef.current?.lastElementChild as HTMLLIElement;
      if (lastMessageEl && 
        lastMessageEl?.parentElement?.parentElement && !isVisible(lastMessageEl, lastMessageEl?.parentElement?.parentElement)) 
        setUnreadMessages(u => u + 1);
    });

    // constantly check chatMessageBoxes size and if it's less than 3, set canSendMessage to true
    const interval = setInterval(() => setCanSendMessage((props.chatMessageBoxes?.length ?? 0) < 3));
    return () => clearInterval(interval);
  }, [props.chatMessageBoxes?.length, props.manager.events]);

  const handleInputKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && canSendMessage) handleSubmit(inputText);
    else if (e.key === 'Escape')
      // send "nothing", chat will get closed & message will not get sent
      handleSubmit('');
    else if (e.key === 'ArrowUp') {
      state.current.i = ++state.current.i % props.precedentMessages.length;
      const precedentMessage = props.precedentMessages[state.current.i];
      if (precedentMessage) setInputText(precedentMessage);
    } else if (e.key === 'ArrowDown') {
      // rolling window, wrap around
      state.current.i = --state.current.i % props.precedentMessages.length;
      if (state.current.i < 0) state.current.i = props.precedentMessages.length - 1;

      const precedentMessage = props.precedentMessages[state.current.i];
      if (precedentMessage) setInputText(precedentMessage);
    }
  };

  const handleSubmit = (content: string) => {
    if (content.length > 150)
      return;

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
        }}
      >
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
              <Text style={{
                color: 'blueviolet',
              }}>
                Welcome to the Dopeverse!
              </Text>
              {messages.map((message, i) => 
              <ListItem key={i}>
                  <HStack style={{
                    opacity: '0.8'
                  }}>
                    <Text style={{
                      color: "white",
                      width: '80%',
                    }}>
                      {message.author}: <span style={{color: message.color}}>{message.message}</span>
                    </Text>
                    <Spacer />
                    <Text style={{
                      color: 'grey',
                      fontSize: '0.6rem',
                    }}>
                      {new Date(message.timestamp).toLocaleString()}
                    </Text>
                  </HStack>
                </ListItem>
              )}
            </List>
          </div>
          <Spacer />
          <Center>
            <Button 
                  style={{
                    marginRight: '1%',
                    marginTop: '-10%'
                  }}
                  variant="primary"
                  backgroundColor="red.600"
                  hidden={inputText.length <= 150} 
                  onClick={() => setInputText(inputText.substring(0, 150))}
                >
                ❌ Message too long
            </Button>
            <Button 
              style={{
                marginTop: '-10%',
              }}
              variant="primary" 
              hidden={unreadMessages === 0} 
              onClick={(e) => {
                setUnreadMessages(0);
                e.currentTarget.hidden = true;
                if (messagesListRef.current)
                  (messagesListRef.current as HTMLOListElement).lastElementChild?.scrollIntoView({
                    behavior: 'smooth',
                  });
              }}
            >
              ⬇️ New message ({unreadMessages})
            </Button>
          </Center>
          <Center>
            <InputGroup width="90%" size="md">
              <Input
                autoFocus={true}
                focusBorderColor="white"
                onFocus={() => {
                  props.manager.events.emit('enableInputs');
                }}
                onBlur={() => {
                  props.manager.events.emit('disableInputs');
                }}
                pr="4.5rem"
                placeholder="Message"
                _placeholder={{ color: '#b8b8b8' }}
                textColor="#f5f5f5"
                value={inputText}
                onChange={({ target }) => setInputText(target.value)}
                onKeyDown={handleInputKey}
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                }}
              />
              <InputRightElement width="4.5rem" style={{ paddingRight: '2%' }}>
                <Button h="1.75rem" size="sm" disabled={!canSendMessage || inputText.length > 150} onClick={() => handleSubmit(inputText)}>
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
