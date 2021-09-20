import '../styles/reset.css';

import type { AppProps } from 'next/app';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';

import DesktopIconList from '../components/DesktopIconList';
import theme from '../styles/theme';
import GlobalStyles from '../styles/GlobalStyles';
import client from '../common/apollo';

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

export default function CreateDopeApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <ApolloProvider client={client}>
        <ChakraProvider theme={theme}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <main>
              <DesktopIconList />
              <Component {...pageProps} />
            </main>
          </Web3ReactProvider>
        </ChakraProvider>
      </ApolloProvider>
    </>
  );
}
