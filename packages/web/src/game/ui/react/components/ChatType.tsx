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

  const messageTooLongRef = React.useRef<HTMLButtonElement>(null);
  const newMessageRef = React.useRef<HTMLButtonElement>(null);
  const messagesListRef = React.useRef<HTMLUListElement>(null);

  let state = React.useRef({
    i: -1,
  });

  useEffect(() => {
    props.manager.events.on('chat_message', (message: DisplayMessage) => {
      setMessages(m => [...m, message]);
      const lastMessageEl = messagesListRef.current?.lastElementChild as HTMLLIElement;
      if (newMessageRef.current && lastMessageEl && 
        lastMessageEl?.parentElement?.parentElement && !isVisible(lastMessageEl, lastMessageEl?.parentElement?.parentElement)) 
        setUnreadMessages(u => u + 1);
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
              {messages.map((message, i) => <ListItem key={i}>
                  <Text style={{
                    color: 'white',
                  }}>
                    {message.author}: {message.message}
                  </Text>
              </ListItem>)}
            </List>
          </div>
          <Spacer />
          <Center>
            <Button 
                  ref={messageTooLongRef} 
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
              ref={newMessageRef} 
              style={{
                marginTop: '-10%',
              }}
              variant="primary" 
              hidden={unreadMessages === 0} 
              onClick={() => {
                setUnreadMessages(0);
                if (newMessageRef.current) (newMessageRef.current as any).hidden = true;
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
