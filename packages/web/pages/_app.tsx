import '../styles/reset.css';

import type { AppProps } from 'next/app';

import { NetworkIDs } from '@zoralabs/nft-hooks';
import { MediaConfiguration } from '@zoralabs/nft-components';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { ChakraProvider } from '@chakra-ui/react';

import { mediaConfigurationStyles } from '../styles/theme';
import GlobalStyles from '../styles/GlobalStyles';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

export default function CreateDopeApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <ChakraProvider>
        <Web3ReactProvider getLibrary={getLibrary}>
          <MediaConfiguration
            networkId={process.env.NEXT_PUBLIC_NETWORK as NetworkIDs}
            style={mediaConfigurationStyles}
          >
            <Header />
            <main>
              <Component {...pageProps} />
            </main>
            {/* <Footer /> */}
          </MediaConfiguration>
        </Web3ReactProvider>
      </ChakraProvider>
    </>
  );
}
