import {
  SimpleGrid,
  VStack,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Center,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import React, { useEffect } from 'react';
import Link from 'next/link';

const Hustlers = () => {
  const [hustlers, setHustlers] = React.useState<any>();

  useEffect(() => {
    if (!(window.ethereum as any)?.selectedAddress) return;

    fetch(
      `https://api.dopewars.gg/wallets/${ethers.utils.getAddress(
        (window.ethereum as any).selectedAddress,
      )}/hustlers`,
    )
      .then(res => res.json())
      .then(res => setHustlers(res));
  }, []);

  return (
    <div>
      {hustlers ? (
        <SimpleGrid columns={2} spacing={5} paddingBottom="8">
          {hustlers.map((hustler: any, i: number) => (
            <VStack key={i}>
              <Text paddingBottom="0px">
                {hustler.id} {hustler.name ? ' - ' + hustler.name : ''}
              </Text>
              <object width="70%" type="image/svg+xml" data={hustler.svg} />
              {localStorage.getItem(
                `gameSelectedHustler_${(window.ethereum as any).selectedAddress}`,
              ) !== hustler.id ? (
                <Popover>
                  <PopoverTrigger>
                    <Button variant="primary">Set as selected hustler</Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Are you sure?</PopoverHeader>
                    <PopoverBody>
                      The game needs to be reloaded in order to modify your selected hustler
                    </PopoverBody>
                    <PopoverFooter>
                      <Button
                        variant="primary"
                        onClick={() => {
                          localStorage.setItem(
                            `gameSelectedHustler_${(window.ethereum as any).selectedAddress}`,
                            hustler.id,
                          );
                          window.location.reload();
                        }}
                      >
                        Confirm
                      </Button>
                    </PopoverFooter>
                  </PopoverContent>
                </Popover>
              ) : undefined}
            </VStack>
          ))}
        </SimpleGrid>
      ) : (
        <Center padding="4">
          <Spinner size="lg" />
        </Center>
      )}
      <Center>
        <Link href={`/inventory`} passHref>
          <Button variant="primary">Details</Button>
        </Link>
      </Center>
    </div>
  );
};

export default Hustlers;
