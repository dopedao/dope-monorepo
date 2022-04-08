import { Center, ChakraProvider, Container, Heading, VStack, Text, IconButton, AlertIcon, Button, SimpleGrid, HStack, Spacer, PopoverTrigger, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverFooter } from "@chakra-ui/react";
import { ComponentManager } from "phaser3-react/src/manager";
import theme from "ui/styles/theme";
import { useEffect } from "react";
import GameScene from "game/scenes/Game";
import React from "react";
import ControlsManager from "game/utils/ControlsManager";
import { ethers } from "ethers";

const keyCodeToChar: {[key: number]: string} = {8:"Backspace",9:"Tab",13:"Enter",16:"Shift",17:"Ctrl",18:"Alt",19:"Pause/Break",20:"Caps Lock",27:"Esc",32:"Space",33:"Page Up",34:"Page Down",35:"End",36:"Home",37:"Left",38:"Up",39:"Right",40:"Down",45:"Insert",46:"Delete",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",65:"A",66:"B",67:"C",68:"D",69:"E",70:"F",71:"G",72:"H",73:"I",74:"J",75:"K",76:"L",77:"M",78:"N",79:"O",80:"P",81:"Q",82:"R",83:"S",84:"T",85:"U",86:"V",87:"W",88:"X",89:"Y",90:"Z",91:"Windows",93:"Right Click",96:"Numpad 0",97:"Numpad 1",98:"Numpad 2",99:"Numpad 3",100:"Numpad 4",101:"Numpad 5",102:"Numpad 6",103:"Numpad 7",104:"Numpad 8",105:"Numpad 9",106:"Numpad *",107:"Numpad +",109:"Numpad -",110:"Numpad .",111:"Numpad /",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"Num Lock",145:"Scroll Lock",182:"My Computer",183:"My Calculator",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"};

interface Props {
    game: GameScene;
    manager: ComponentManager;
}

const Key = (props: {keyName: string, keyCode: number, selectedKey?: number, onSelect: (key?: number) => void}) => {
    return (
        <HStack>
            <Text>
                {props.keyName}
            </Text>
            <Spacer />
            <Button
                // backgroundColor="green"
                onClick={() => props.onSelect(props.selectedKey === props.keyCode ? undefined : props.keyCode)}
                variant="primary"
            >
                {props.selectedKey === props.keyCode ? 'Type a key' : keyCodeToChar[props.keyCode]}
            </Button>
        </HStack>
    )
}

const Controls = () => {
    const [, forceUpdate] = React.useReducer((i) => i + 1, 0);
    const [ selectedKey, setSelectedKey ] = React.useState<number>();
    const controlsManager = ControlsManager.getInstance();
    
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (!selectedKey) return;
            
            controlsManager.setKey(selectedKey, e.keyCode);
            setSelectedKey(undefined);
            forceUpdate();
            console.log(selectedKey);
        }

        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
        }
    }, [selectedKey]);

    return (
        <div>
            <Text fontSize="2xl" paddingBottom="0px">
                Player
            </Text>
            <SimpleGrid columns={2} spacing={5} paddingBottom="2">
                {
                    Object.keys(controlsManager.playerKeys).map((key, i) => 
                        <Key key={i} keyName={key.charAt(0).toUpperCase() + key.slice(1)} keyCode={(controlsManager.playerKeys as any)[key]} selectedKey={selectedKey} onSelect={setSelectedKey} />)
                }
            </SimpleGrid>
            <Text fontSize="2xl" paddingBottom="0px">
                Misc
            </Text>
            <SimpleGrid columns={2} spacing={5}>
                <Key keyName="Chat" keyCode={controlsManager.chatKey} selectedKey={selectedKey} onSelect={setSelectedKey} />
                <Key keyName="Settings" keyCode={controlsManager.settingsKey} selectedKey={selectedKey} onSelect={setSelectedKey} />
            </SimpleGrid>
        </div>
    )
}

const Hustlers = () => {
    const [hustlers, setHustlers] = React.useState<any>();

    useEffect(() => {
        if (!(window.ethereum as any)?.selectedAddress) return;

        fetch(`https://api.dopewars.gg/wallets/${ethers.utils.getAddress(
            (window.ethereum as any).selectedAddress,
          )}/hustlers`).then(res => res.json()).then(res => setHustlers(res));
    }, []);
    
    return (
        <div>
            <SimpleGrid columns={2} spacing={5} paddingBottom="8">
                {
                    hustlers?.map((hustler: any, i: number) =>
                        <VStack key={i}>
                            <Text paddingBottom="0px">
                                {hustler.id} {hustler.name ? " - " + hustler.name : ""}
                            </Text>
                            <object width="70%" type="image/svg+xml" data={hustler.svg} />
                            { localStorage.getItem(`gameSelectedHustler_${(window.ethereum as any).selectedAddress}`) !== hustler.id ? <Popover>
                                <PopoverTrigger>
                                    <Button variant="primary">
                                        Set as selected hustler
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverHeader>Are you sure?</PopoverHeader>
                                    <PopoverBody>The game needs to be reloaded in order to modify your selected hustler</PopoverBody>
                                    <PopoverFooter>
                                        <Button variant="primary" onClick={() => {
                                            localStorage.setItem(`gameSelectedHustler_${(window.ethereum as any).selectedAddress}`, hustler.id);
                                            window.location.reload();
                                        }}>
                                            Confirm
                                        </Button>
                                    </PopoverFooter>
                                </PopoverContent>
                            </Popover> : undefined }
                        </VStack>
                    )
                }
            </SimpleGrid>
            <Center>
                <a href="/inventory">
                    <Button variant="primary">
                        Details
                    </Button>
                </a>
            </Center>
        </div>
    )
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