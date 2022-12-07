import 'ui/styles/reset.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import { StarknetProvider } from '@starknet-react/core';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate } from 'react-query/hydration';
import GlobalStyles from 'ui/styles/GlobalStyles';
import PageLoadingIndicator from 'components/PageLoadingIndicator';
import theme from 'ui/styles/theme';
import RollYourOwnProvider from 'features/ryo/context';

import GoogleAnalytics from 'components/GoogleAnalytics';

// Error tracking and tracing from Sentry.io
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { FullScreenProvider } from 'hooks/FullScreenProvider';
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

export default function CreateDopeApp({ Component, pageProps, router }: AppProps) {
  const { pathname } = router;

  // Will probably want a better solution to conditionally
  // wrap components with providers when we have more of them.
  // This should be ok for now.
  const shouldIncludeRollYourOwn = pathname.includes('/roll-your-own');

  return (
    <>
      <GlobalStyles />
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          {/* Upgrading to Nextjs 12 threw this as error. Commenting out for now. */}
          {/* <Hydrate state={pageProps.dehydratedState}> */}
            <Web3ReactProvider getLibrary={getLibrary}>
              <StarknetProvider>
                <RollYourOwnProvider>
                  <FullScreenProvider>
                    <main>
                      <PageLoadingIndicator />
                      {shouldIncludeRollYourOwn ? (
                        <RollYourOwnProvider>
                          <Component {...pageProps} />
                        </RollYourOwnProvider>
                      ) : (
                        <Component {...pageProps} />
                      )}
                    </main>
                  </FullScreenProvider>
                </RollYourOwnProvider>
              </StarknetProvider>
            </Web3ReactProvider>
            {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
          {/* </Hydrate> */}
        </QueryClientProvider>
      </ChakraProvider>
    </>
  );
}
