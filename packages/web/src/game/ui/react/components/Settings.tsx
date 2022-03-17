import { Center, ChakraProvider, Container, Heading, VStack, Text, IconButton, AlertIcon, Button } from "@chakra-ui/react";
import { ComponentManager } from "phaser3-react/src/manager";
import theme from "ui/styles/theme";
import { useEffect } from "react";

export default function Settings(props: { manager: ComponentManager }) {

    const handleKeyDown = (e: KeyboardEvent) => {
        console.log(e);
        if (e.key === "Escape")
            props.manager.events.emit('close');
    }

    useEffect(() => {
        document.addEventListener('keyup', handleKeyDown);

        return () => {
            document.removeEventListener('keyup', handleKeyDown);
        }
    })

    return (
        <ChakraProvider theme={theme}>
            <Center style={{
                height: "100vh",
                backdropFilter: "brightness(0.2)",
            }}>
                <Container style={{
                    backgroundColor: "rgba(255,255,255,0.7)",
                    padding: "1rem",
                    borderRadius: "7px",
                }}>
                    <VStack>
                        <Heading>
                            Settings
                        </Heading>
                        <Button 
                            variant="primary"
                            style={{
                                width: "100%",
                            }}
                        >
                            Hustlers
                        </Button>
                        <Button 
                            variant="primary"
                            style={{
                                width: "100%",
                            }}
                        >
                            Controls
                        </Button>
                        <Button 
                            variant="primary"
                            backgroundColor="red"
                            style={{
                                width: "100%",
                            }}
                        >
                            Log out
                        </Button>
                    </VStack>
                </Container>
            </Center>
        </ChakraProvider>
    );
}