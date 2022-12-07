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
import HustlerProfileCard from 'components/hustler/HustlerProfileCard';
import RenderFromChain from 'components/hustler/RenderFromChain';
import { ComponentManager } from 'phaser3-react/src/manager';
import React, { useEffect, useState } from 'react';
import theme from 'ui/styles/theme';
import Image from 'next/image';
import { CSSProperties } from 'react';
import Link from 'next/link';

interface Props {
  manager: ComponentManager;
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

const Stepper = (props: Props) => {
  const [page, setPage] = useState(0);
  const [hustlerIndex, setHustlerIndex] = useState(0);

  const pages: Array<Page> = [
    {
      heading: 'Welcome to Dope Wars!',
      text: '',
      children: (
        <>
          <Text>
            Welcome OG Hustlers to the beginnings of our Dope City Murderverse! What we have to show
            is the culmination of untiring efforts from our developers, artists, musicians, and YOU,
            our community. It represents the love for what we stand for, the values that we live by,
            and our unwillingness to waver from them. We are web3. We are hip-hop culture. We are
            free minds. We are from all walks of life that have come together for this unified
            purpose. We are hustlers. What does it represent for you?
          </Text>
          <Text>
            Thank you so much for your support. We felt it was completely necessary to invite you
            all to our first stress test of Dope City, where you can interact with other hustlers by
            chatting, flexing your gear, and figuring out how to stack PAPER. It is a glimpse into a
            world that has become entrenched in a battle for glory, a struggle for reputation, and a
            fight for leadership. Welcome to Dope Wars. How will the story unfold?
          </Text>
        </>
      ),
    },
    {
      heading: 'Message from the dev 🤓',
      text: '',
      children: (
        <>
          <Text>
            Thanks for joining us today everyone, it is with true joy and proudness that we&apos;re
            presenting you the current state of game!
          </Text>
          <Text>
            However, please note that this is not the final state of the game and that some parts
            are still unfinished and *buggy*, so please don&apos;t expect the best performance and
            accuracy. After all, this is still just **fun** stress test so don&apos;t be afraid to play
            around with the game and see what you can do (break)!
          </Text>
          <Text>Anyway, I&apos;m not gonna bother you anymore so yeah... have fun!</Text>
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

export default function EventWelcome(props: Props) {
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
            {<Stepper manager={props.manager} />}
          </Container>
        )}
      </Center>
    </ChakraProvider>
  );
}
