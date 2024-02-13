import {
  Button,
  Center,
  ChakraProvider,
  Container,
  Heading,
  HStack,
  Select,
  Spacer,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import HustlerProfileCard from 'features/hustlers/components/HustlerProfileCard';
import RenderFromChain from 'features/hustlers/components/RenderFromChain';
import { ComponentManager } from 'phaser3-react/src/manager';
import React, { useEffect, useState } from 'react';
import theme from 'ui/styles/theme';
import { CSSProperties } from 'react';
import Link from 'next/link';

interface Props {
  manager: ComponentManager;
  hustlerData: any;
}

interface Page {
  heading: string;
  text: string;
  children?: React.ReactNode;
  onNext?: () => void;
}

const footerButtonsStyle: CSSProperties = {
  position: 'relative',
  top: '30px',
};

const NoHustler = (props: Props) => {
  const [page, setPage] = useState(0);

  const pages: Array<Page> = [
    {
      heading:
        "Hey, seems like it's your first time here! Let's get you up and running with the basics.",
      text: `Doesn't seem like you have a hustler, you don't necessarly need one to get into the game but you won't be able to do much without one. 
            You can either purchase one off the market by searching for an unbundled Dope, or mint yourself one but without any gear.`,
      children: (
        <>
          <HStack width="100%">
            <Link href="/swap-meet/hustlers" passHref>
              <Button variant="primary" width="32">
                Swap meet
              </Button>
            </Link>
            <Link href="/hustlers/mint" passHref>
              <Button variant="cny" width="32">
                Mint
              </Button>
            </Link>
          </HStack>
          <br />
          <Text>
            Once you have a hustler, you can directly use it and play with it in the game. You can
            also have multiple hustlers and collect gear!
          </Text>
        </>
      ),
    },
  ];

  const handleNext = () => {
    pages[page].onNext && pages[page].onNext!();
    if (page === pages.length - 1) {
      props.manager.events.emit('game');
      return;
    }

    setPage(page + 1);
  };

  return (
    <VStack>
      <Heading>{pages[page].heading}</Heading>
      <br />
      <Text paddingBottom="-16">{pages[page].text}</Text>
      {pages[page].children}
      <HStack style={footerButtonsStyle}>
        <Button onClick={() => props.manager.events.emit('game')}>
          {page === pages.length - 1 ? 'Finish' : 'DGAF'}
        </Button>
        {page < pages.length - 1 ? <Button onClick={handleNext}>Next</Button> : undefined}
      </HStack>
    </VStack>
  );
};

const HasHustler = (props: Props) => {
  const [page, setPage] = useState(0);
  const [hustlerIndex, setHustlerIndex] = useState(0);

  useEffect(() => {
    localStorage.setItem(
      `gameSelectedHustler_${(window.ethereum as any).selectedAddress}`,
      props.hustlerData[hustlerIndex].id,
    );
  }, [hustlerIndex, props.hustlerData]);

  const pages: Array<Page> = [
    {
      heading:
        "Hey, seems like it's your first time here! Let's get you up and running with the basics.",
      text: `Cool, you seem to already have a hustler, let's get you and your hustler set up.
            Which hustler do you wanna play with?`,
      children: (
        <>
          <Select onChange={e => setHustlerIndex(Number.parseInt(e.target.value))}>
            {props.hustlerData.map((hustler: any, i: number) => (
              <option key={i} value={i}>
                {hustler.id} {hustler.name ? ' - ' + hustler.name : ''}
              </option>
            ))}
          </Select>
          <br />
          <object type="image/svg+xml" data={props.hustlerData[hustlerIndex].svg} />
        </>
      ),
    },
    // {
    //     heading: "Where do you wanna start out your journey?",
    //     text: `There are many cities available in the game, you can visit 'em all whenever you want but you can
    //     choose one to start with.`
    // }
  ];

  const handleNext = () => {
    pages[page].onNext && pages[page].onNext!();
    if (page === pages.length - 1) {
      props.manager.events.emit('game');
      return;
    }

    setPage(page + 1);
  };

  return (
    <VStack>
      <Heading>{pages[page].heading}</Heading>
      <br />
      <Text>{pages[page].text}</Text>
      {pages[page].children}
      <HStack style={footerButtonsStyle}>
        <Button onClick={() => props.manager.events.emit('game')}>
          {page === pages.length - 1 ? 'Finish' : 'DGAF'}
        </Button>
        {page > 0 ? <Button onClick={() => setPage(page - 1)}>Go back</Button> : undefined}
        {page < pages.length - 1 ? <Button onClick={handleNext}>Next</Button> : undefined}
      </HStack>
    </VStack>
  );
};

export default function IntroStepper(props: Props) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    props.manager.events.on('game', () => setLoading(true));
  }, [props.manager.events]);

  return (
    <ChakraProvider theme={theme}>
      <Center
        style={{
          height: '100vh',
          backdropFilter: 'brightness(50%)',
        }}
      >
        {loading ? (
          <Spinner size="xl" color="white" />
        ) : (
          <Container
            style={{
              padding: '1rem',
              borderStyle: 'solid',
              boxShadow: '0px 0px 15px rgba(0,0,0,1)',
              borderColor: 'black',
              borderWidth: '0px',
              backgroundColor: 'white',
              borderRadius: '7px',
            }}
          >
            {props.hustlerData?.length > 0 ? (
              <HasHustler manager={props.manager} hustlerData={props.hustlerData} />
            ) : (
              <NoHustler manager={props.manager} hustlerData={props.hustlerData} />
            )}
          </Container>
        )}
      </Center>
    </ChakraProvider>
  );
}
