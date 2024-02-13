import { Box, Button, Center, ChakraProvider, VStack } from '@chakra-ui/react';
import DesktopWindow from 'components/DesktopWindow';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import theme from 'ui/styles/theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ globally default to 20 seconds
      staleTime: 1000 * 20,
    },
  },
});

export default function ConnectionLostWindow() {
  return (
    <QueryClientProvider client={queryClient}>
      <Box
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '45%',
          height: '60%',
        }}
      >
        <ChakraProvider theme={theme}>
          <DesktopWindow title="You've been disconnected">
            <Box style={{ backgroundColor: '#FF3F3F', height: '100%' }}>
              <VStack height="100%" align="center" justify="center" spacing="4">
                <h1
                  style={{
                    paddingBottom: '10%',
                  }}
                >
                  Connection lost
                </h1>
                <h2>Try reconnecting?</h2>
                <Button
                  backgroundColor="#5F5FFF"
                  color="white"
                  onClick={() => window.location.reload()}
                >
                  Reconnect
                </Button>
              </VStack>
            </Box>
          </DesktopWindow>
        </ChakraProvider>
      </Box>
    </QueryClientProvider>
  );
}
