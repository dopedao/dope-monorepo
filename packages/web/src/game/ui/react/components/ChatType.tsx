import { InputGroup, InputRightElement, Button, Input, ChakraProvider } from "@chakra-ui/react";
import { ComponentManager } from "phaser3-react/src/manager";
import React from "react";
import { FormEvent } from "react";
import theme from 'ui/styles/theme';

export default function ChatType(props: {manager: ComponentManager})
{
    const [inputText, setInputText] = React.useState("");

    const handleInputKey = (e: string) => {
        if (e === 'Enter')
            handleSubmit(inputText);
        else if (e === 'Escape')
            // send "nothing", chat will get closed & message will not get sent
            handleSubmit("");
    }

    const handleSubmit = (content: string) => {
        props.manager.events.emit('chat_submit', content);
    };

    return (
        <ChakraProvider theme={theme}>
            <div style={{
                        position:"absolute",
                        width: "30%",
                        left: "1%",
                        bottom: "1vh",
                    }}>
                <InputGroup size='md'>
                    <Input
                        autoFocus={true}
                        focusBorderColor="white"
                        onBlur={({ target }) => target.focus()}
                        pr='4.5rem'
                        placeholder='Message'
                        value={inputText}
                        onChange={({ target }) => setInputText(target.value)}
                        onKeyDown={(e) => handleInputKey(e.key)}
                        // value={props.text}
                    />
                    <InputRightElement width='4.5rem' style={{paddingRight: "2%"}}>
                        <Button h='1.75rem' size='sm' onClick={() => handleSubmit(inputText)}>
                            Send
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </div>
        </ChakraProvider>
        
    );
}