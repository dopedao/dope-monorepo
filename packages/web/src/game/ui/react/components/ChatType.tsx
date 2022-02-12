import { InputGroup, InputRightElement, Button, Input, ChakraProvider } from '@chakra-ui/react';
import { ComponentManager } from 'phaser3-react/src/manager';
import React from 'react';
import { FormEvent } from 'react';
import theme from 'ui/styles/theme';

interface Props {
  manager: ComponentManager;
  precedentMessages: string[];
}

export default function ChatType(props: Props) {
  const [inputText, setInputText] = React.useState('');

  let state = React.useRef({
    i: -1,
  });

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
      <div
        style={{
          position: 'absolute',
          width: '30%',
          left: '1%',
          bottom: '1vh',
        }}
      >
        <InputGroup size="md">
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
      </div>
    </ChakraProvider>
  );
}
