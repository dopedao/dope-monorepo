import { Center, ChakraProvider, Container, Heading, VStack, Text, IconButton, AlertIcon, Button, SimpleGrid, HStack, Spacer, PopoverTrigger, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverFooter, Spinner } from "@chakra-ui/react";
import { ComponentManager } from "phaser3-react/src/manager";
import theme from "ui/styles/theme";
import { useCallback, useEffect } from "react";
import GameScene from "game/scenes/Game";
import React from "react";
import ControlsManager from "game/utils/ControlsManager";
import { ethers } from "ethers";
import Hustlers from "./Hustlers";
import Controls from "./Controls";
import Music from "./Music";


interface Props {
    game: GameScene;
    manager: ComponentManager;
}

const SettingsPages = (props: Props): {[key: string]: React.FunctionComponent} => {
    return {
        Hustlers: Hustlers,
        Music: () => <Music musicManager={props.game.musicManager} />,
        Controls: Controls,
    };
}

export default function Settings(props: Props) {
    const pages = SettingsPages(props);
    const [ openedPage, setOpenedPage ] = React.useState<{
        name: string,
        component: React.FunctionComponent,
    }>();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                if (openedPage) {
                    setOpenedPage(undefined);
                } else {
                    props.manager.events.emit('close');
                }
            }
        }

        document.addEventListener('keyup', handleKeyDown);

        return () => {
            document.removeEventListener('keyup', handleKeyDown);
        }
    }, [openedPage, props.manager.events]);

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
                            Object.keys(pages).map((page) => {
                                return (
                                    <Button
                                        key={page}
                                        onClick={() => setOpenedPage({
                                            name: page, component: pages[page]
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