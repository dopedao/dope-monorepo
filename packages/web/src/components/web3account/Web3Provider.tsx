import { ReservoirKitProvider, darkTheme } from '@reservoir0x/reservoir-kit-ui';
import { reservoirChains } from '@reservoir0x/reservoir-sdk';

import {
  RainbowKitProvider,
  getDefaultWallets,
  darkTheme as rainbowTheme,
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

import ChainIdProvider from '../../providers/ChainIdProvider';
import { paymentTokens } from './paymentTokens';

import { base, mainnet, optimism } from 'wagmi/chains';
import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import ReservoirListingsProvider from 'providers/ReservoirListingsProvider';

// custom wallets
import {
  injectedWallet,
  coinbaseWallet,
  ledgerWallet,
  metaMaskWallet,
  phantomWallet,
  rabbyWallet,
  rainbowWallet,
  safeWallet,
  uniswapWallet,
  zerionWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';

// Wallet connect is disabled for now because of issues
// with the library and security ghosts that WC hasn't resolved
// and can't be configured away even with allow-listing domains
// and using latest version of the code.
// https://github.com/orgs/WalletConnect/discussions/3442
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '';
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, optimism, base],
  [publicProvider()],
  {
    stallTimeout: 1000,
    pollingInterval: 10_000,
  },
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains }),
      rabbyWallet({ chains }),
      rainbowWallet({ chains, projectId }),
      safeWallet({ chains }),
    ],
  },
  {
    groupName: 'Other',
    wallets: [
      coinbaseWallet({ appName: 'Dope Wars', chains }),
      uniswapWallet({ chains, projectId }),
      zerionWallet({ chains, projectId }),
      ledgerWallet({ chains, projectId }),
      phantomWallet({ chains }),
      metaMaskWallet({ chains, projectId }),
    ],
  },
]);

export const config = createConfig({
  autoConnect: true,
  connectors,
  webSocketPublicClient,
  publicClient,
});

// Reservoir theme needs to be customized
const rTheme = darkTheme({
  headlineFont: 'Sans Serif',
  font: 'Serif',
  primaryColor: '#323aa8',
  primaryHoverColor: '#252ea5',
});

interface Props {
  children: React.ReactNode;
}

export const Web3Provider = ({ children }: Props) => {
  return (
    <WagmiConfig config={config}>
      <ChainIdProvider>
        <ReservoirKitProvider
          theme={rTheme}
          options={{
            apiKey: '50cbad2f-21b3-5736-a337-12b754a6020e',
            chains: [
              {
                ...reservoirChains.mainnet,
                active: true,
                paymentTokens: paymentTokens[1].concat(paymentTokens[10][1]),
              },
              {
                ...reservoirChains.optimism,
                active: true,
                paymentTokens: paymentTokens[10].concat(paymentTokens[1][1]),
              },
            ],
            alwaysIncludeListingCurrency: true,
            disablePoweredByReservoir: true,
            normalizeRoyalties: false,
          }}
        >
          <RainbowKitProvider chains={chains} theme={rainbowTheme()}>
            <ReservoirListingsProvider>{children}</ReservoirListingsProvider>
          </RainbowKitProvider>
        </ReservoirKitProvider>
      </ChainIdProvider>
    </WagmiConfig>
  );
};
