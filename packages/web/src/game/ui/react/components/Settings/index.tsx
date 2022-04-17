import { Center, ChakraProvider, Container, Heading, VStack, Text, IconButton, AlertIcon, Button, SimpleGrid, HStack, Spacer, PopoverTrigger, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverFooter, Spinner } from "@chakra-ui/react";
import { ComponentManager } from "phaser3-react/src/manager";
import theme from "ui/styles/theme";
import { useEffect } from "react";
import GameScene from "game/scenes/Game";
import React from "react";
import ControlsManager from "game/utils/ControlsManager";
import { ethers } from "ethers";
import Hustlers from "./Hustlers";
import Controls from "./Controls";


interface Props {
    game: GameScene;
    manager: ComponentManager;
}

const SettingsPages: {[key: string]: React.FunctionComponent} = {
    Hustlers: Hustlers,
    Controls: Controls,
}

export default function Settings(props: Props) {
    const [ openedPage, setOpenedPage ] = React.useState<{
        name: string,
        component: React.FunctionComponent,
    }>();

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape")
            openedPage ? setOpenedPage(undefined) : props.manager.events.emit('close');
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
                backdropFilter: "brightness(0.3)",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
            }}>
                <Container style={{
                    backgroundColor: "rgba(255,255,255,0.7)",
                    padding: "1rem",
                    borderRadius: "7px",
                    maxHeight: "70%",
                    overflowY: "auto",
                    borderColor: "black",
                }}>
                    {
                        openedPage ? <div>
                            <Center>
                                <Heading>
                                    {openedPage.name}
                                </Heading>
                            </Center>
                            {<openedPage.component />}
                        </div> : <VStack>
                        <Heading>
                            Settings
                        </Heading>
                        <Button 
                            variant="primary" 
                            bgColor="grey" 
                            width="90%"
                            onClick={() => props.manager.events.emit('close')}
                        >
                            Resume
                        </Button>
                        {
                            Object.keys(SettingsPages).map((page) => {
                                return (
                                    <Button
                                        key={page}
                                        onClick={() => setOpenedPage({
                                            name: page, component: SettingsPages[page]
                                        })}
                                        variant="primary"
                                        style={{
                                            width: "90%"
                                        }}
                                    >
                                        {page}
                                    </Button>
                                )
                            })
                        }
                        <Button
                            onClick={() => props.manager.events.emit('disconnect')}
                            variant="primary"
                            backgroundColor="red"
                            style={{
                                width: "90%",
                            }}
                        >
                            Log out
                        </Button>
                    </VStack>
                    }
                </Container>
            </Center>
        </ChakraProvider>
    );
}