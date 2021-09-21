
import '../styles/reset.css';

import { ReactNode, useMemo } from 'react';
import type { AppProps } from 'next/app';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { ApolloClient, InMemoryCache } from '@apollo/client';

import theme from '../styles/theme';
import GlobalStyles from '../styles/GlobalStyles';
import { NETWORK } from '../common/constants';
import LoadingIndicator from '../components/LoadingIndicator';
import DesktopIconList from '../components/DesktopIconList';

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function getClient(uri: string) {
  return new ApolloClient({
    uri,
    cache: new InMemoryCache(),
  });
}

const WrappedApolloProvider = ({ children }: { children: ReactNode }) => {
  const { chainId } = useWeb3React();

  const uri = useMemo(
    () => (chainId ? NETWORK[chainId as 1 | 4].subgraph : NETWORK[1].subgraph),
    [chainId],
  );

  return <ApolloProvider client={getClient(uri)}>{children}</ApolloProvider>;
};

export default function CreateDopeApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <ChakraProvider theme={theme}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <WrappedApolloProvider>
            <main>
              <LoadingIndicator />
              <DesktopIconList />
              <Component {...pageProps} />
            </main>
          </WrappedApolloProvider>
        </Web3ReactProvider>
      </ChakraProvider>
    </>
  );
}