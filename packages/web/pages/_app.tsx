import '../styles/reset.css';
import type { AppProps } from 'next/app';
import { NetworkIDs } from '@zoralabs/nft-hooks';
import { MediaConfiguration } from '@zoralabs/nft-components';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import LoadingIndicator from '../components/LoadingIndicator';
import DesktopIconList from '../components/DesktopIconList';
import theme from '../styles/theme';
import GlobalStyles from '../styles/GlobalStyles';
import client from '../utils/apollo';

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
            <MediaConfiguration networkId={process.env.NEXT_PUBLIC_NETWORK as NetworkIDs}>
              <main>
                <LoadingIndicator />
                <DesktopIconList />
                <Component {...pageProps} />
              </main>
            </MediaConfiguration>
          </Web3ReactProvider>
        </ChakraProvider>
      </ApolloProvider>
    </>
  );
}
