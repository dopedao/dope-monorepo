import 'ui/styles/reset.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';

import DesktopIconList from 'components/DesktopIconList';
import GlobalStyles from 'ui/styles/GlobalStyles';
import PageLoadingIndicator from 'components/PageLoadingIndicator';
import theme from 'ui/styles/theme';

// Error tracking and tracing from Sentry.io
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
Sentry.init({
  dsn: 'https://b8e63fda3aef4e8e8c96109550d5ae4c@o1012827.ingest.sentry.io/5978399',
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ globally default to 20 seconds
      staleTime: 1000 * 20,
    },
  },
});

export default function CreateDopeApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Web3ReactProvider getLibrary={getLibrary}>
              <main>
                <PageLoadingIndicator />
                <DesktopIconList />
                <Component {...pageProps} />
              </main>
            </Web3ReactProvider>
          </Hydrate>
        </QueryClientProvider>
      </ChakraProvider>
    </>
  );
}
