import { Button, Center, ChakraProvider, Container, Heading, HStack, Select, Spacer, Spinner, Text, VStack } from "@chakra-ui/react";
import HustlerProfileCard from "components/hustler/HustlerProfileCard";
import RenderFromChain from "components/hustler/RenderFromChain";
import { ComponentManager } from "phaser3-react/src/manager";
import React, { useEffect, useState } from "react";
import theme from "ui/styles/theme";
import Image from "next/image";
import { CSSProperties } from "react";

interface Props {
  manager: ComponentManager;
  hustlerData: any;
}

const footerButtonsStyle: CSSProperties = {
    position: "relative",
    top: "30px"
};

const NoHustler = (props: Props) => {
    return (
        <VStack>
            <Heading>
                Hey, seems like it&apos;s your first time here! Let&apos;s get you up and running with the basics.
            </Heading>
            <br/>
            <Text paddingBottom="-16">
                Doesn&apos;t seem like you have a hustler, you don&apos;t necessarly need one to get into the game but you won&apos;t be able to do much without one. 
                You can either purchase one off the market by searching for an unbundled Dope, or mint yourself one but without any gear.
            </Text>
            <HStack width="100%">
                <Button variant="primary" width="32">
                    Quick buy
                </Button>
                <Button variant="cny" width="32">
                    Mint    
                </Button>
            </HStack>
            <br/>
            <Text>
                Once you have a hustler, you can directly use it and play with it in the game.
                You can also have multiple hustlers and collect gear!
            </Text>
            <HStack style={footerButtonsStyle}>
                <Button onClick={() => props.manager.events.emit('game')}>
                    DGAF
                </Button>
                <Button>
                    Next
                </Button>
            </HStack>
        </VStack>
    );
}

const HasHustler = (props: Props) => {
    const [ hustlerId, setHustlerId ] = useState(0);

    return (
        <VStack>
            <Heading>
                Hey, seems like it&apos;s your first time here! Let&apos;s get you up and running with the basics.
            </Heading>
            <br />
            <Text>
                Cool, you seem to already have a hustler, let&apos;s get you and your hustler set up.
            </Text>
            <Select onChange={(e) => setHustlerId(Number.parseInt(e.target.value))}>
                {props.hustlerData.map((hustler: any, i: number) => <option key={i} value={i}>{hustler.id}</option>)}
            </Select>
            <br />
            <img alt="" src={props.hustlerData[hustlerId].svg} />
            <HStack style={footerButtonsStyle}>
                <Button onClick={() => props.manager.events.emit('game')}>
                    DGAF
                </Button>
                <Button>
                    Next
                </Button>
            </HStack>
        </VStack>
    );
}

export default function IntroStepper(props: Props) {
    const [ loading, setLoading ] = useState(false);
    
    useEffect(() => {
        props.manager.events.on('game', () => setLoading(true));
    }, []);

    return (
        <ChakraProvider theme={theme}>
            <Center style={{
                height: "100vh",
                backdropFilter: "brightness(50%)",
            }}>
                {loading ? <Spinner size="xl" color="white" /> : <Container style={{
                    padding: "1rem",
                    borderStyle: "solid",
                    boxShadow: "0px 0px 15px rgba(0,0,0,1)",
                    borderColor: "black",
                    borderWidth: "0px",
                    backgroundColor: "white",
                    borderRadius: "7px",
                }}>
                {
                    props.hustlerData?.length > 0 ? 
                        <HasHustler 
                            manager={props.manager} 
                            hustlerData={props.hustlerData}
                        /> : 
                        <NoHustler 
                            manager={props.manager} 
                            hustlerData={props.hustlerData}
                        />
                }
                </Container>}
            </Center>
        </ChakraProvider>
    );
}