import 'ui/styles/reset.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import GlobalStyles from 'ui/styles/GlobalStyles';
import PageLoadingIndicator from 'components/PageLoadingIndicator';
import theme from 'ui/styles/theme';
import { FullScreenProvider } from 'providers/FullScreenProvider';
import { Web3Provider } from 'components/web3account/Web3Provider';
import CurrencyExchangeProvider from 'providers/CurrencyExchangeProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ globally default to 20 seconds
      staleTime: 1000 * 20,
    },
  },
});

export default function CreateDopeApp({ Component, router }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <CurrencyExchangeProvider>
            <Web3Provider>
              <FullScreenProvider>
                <main>
                  <PageLoadingIndicator />
                  <Component />
                </main>
              </FullScreenProvider>
            </Web3Provider>
          </CurrencyExchangeProvider>
          {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
      </ChakraProvider>
    </>
  );
}
