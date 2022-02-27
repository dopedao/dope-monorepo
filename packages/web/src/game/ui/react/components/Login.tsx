import { ChakraProvider, Center, Spinner, Container, VStack, Heading, Text, List, ListIcon, ListItem, UnorderedList, Button, useToast, HStack, createStandaloneToast, UseToastOptions } from "@chakra-ui/react";
import Authenticator from "game/handlers/network/Authenticator";
import { ComponentManager } from "phaser3-react/src/manager";
import { useEffect, useState } from "react";
import theme from "ui/styles/theme";
import CheckIcon from "ui/svg/Check";

const toastStyle: UseToastOptions = {
    duration: 5000,
    position: "bottom-right",
    isClosable: true,
};

interface Props {
    manager: ComponentManager;
    authenticator: Authenticator;
}

export default function Login(props: Props) {
    const toast = createStandaloneToast(theme);

    const [ loading, setLoading ] = useState(false);
    const [ loggedIn, setLoggedIn ] = useState(false);

    useEffect(() => {
        props.manager.events.on('loggedIn', () => setLoading(true));
    }, []);

    const login = () => {
        props.authenticator.login()
            .then(() => {
                setLoggedIn(true)
                toast({
                    title: "Success",
                    description: "You have successfully logged in!",
                    status: "success",
                    ...toastStyle
                });
            })
            .catch((err) => {
                setLoggedIn(false);
                toast({
                    title: "Error " + err.code,
                    description: err.message,
                    status: "error",
                    ...toastStyle
                });
            });
    }

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
                <VStack>
                    <Heading>
                        Please login before accessing the game
                    </Heading>
                    <br />
                    <Text>
                        To login, you need to sign a message using your wallet provider. Our personal favorite is Metamask but you can use any other extension or wallet provider.
                    </Text>
                    <UnorderedList spacing={4} style={{
                        paddingLeft: "1rem",
                    }}>
                        <ListItem>
                            Click on this button to trigger the sign message
                            <br />
                            <Button variant="primary" onClick={login}>
                                Sign
                            </Button>
                        </ListItem>
                        <ListItem>Your wallet provider will popup a dialog and you will need to press `Confirm`</ListItem>
                        <ListItem>
                            Wait for this to show as logged in
                            <HStack style={{
                                paddingLeft: "1rem",
                                paddingRight: "1rem",
                            }}>
                                {loggedIn ? <CheckIcon /> : <Spinner color='red.500' />}
                                <Text style={{
                                    paddingTop: "1rem",
                                }}>{loggedIn ? 'Logged in' : 'Not logged in'}</Text>
                            </HStack>
                        </ListItem>
                        <ListItem>Press continue</ListItem>
                    </UnorderedList>
                    <Button 
                        disabled={!loggedIn}
                        onClick={() => props.manager.events.emit('loggedIn')}
                        style={{
                            position: "relative",
                            top: "30px"
                        }}
                        variant="primary"
                    >
                        Continue
                    </Button>
                </VStack>
                </Container>}
            </Center>
        </ChakraProvider>
    );
}