import * as React from 'react';
import { type PublicClient, getPublicClient } from '@wagmi/core';
import { FallbackProvider, JsonRpcProvider } from 'ethers';
import { type HttpTransport } from 'viem';
// for signers
import { type WalletClient, getWalletClient } from '@wagmi/core';
import { BrowserProvider, JsonRpcSigner } from 'ethers';

// This code should only temporarily exist, until
// ethers.js is removed from the project in favor of viem.
//
// ethers was used originally before we moved to wagmi/viem,
// which is a bit more modern, easy to use, and required for
// Reservoir-kit implementation.
//
// This provider allows us to still use the Typechain created
// contract methods which have been tested, and are still
// functional, while we transition to viem.
export function publicClientToProvider(publicClient: PublicClient) {
  const { chain, transport } = publicClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  if (transport.type === 'fallback') {
    const providers = (transport.transports as ReturnType<HttpTransport>[]).map(
      ({ value }) => new JsonRpcProvider(value?.url, network),
    );
    if (providers.length === 1) return providers[0];
    return new FallbackProvider(providers);
  }
  return new JsonRpcProvider(transport.url, network);
}

/** Action to convert a viem Public Client to an ethers.js Provider. */
export function getEthersProvider({ chainId }: { chainId?: number } = {}) {
  const publicClient = getPublicClient({ chainId });
  return publicClientToProvider(publicClient);
}

export function walletClientToSigner(walletClient: WalletClient) {
  const { account, chain, transport } = walletClient;
  const network = {
    chainId: chain?.id || 0,
    name: chain?.name || 'unknown',
    ensAddress: chain?.contracts?.ensRegistry?.address,
  };
  const provider = new BrowserProvider(transport, network);
  const signer = new JsonRpcSigner(provider, account.address);
  return signer;
}

/** Action to convert a viem Wallet Client to an ethers.js Signer. */
export async function getEthersSigner({ chainId }: { chainId?: number } = {}) {
  const walletClient = await getWalletClient({ chainId });
  if (!walletClient) return undefined;
  return walletClientToSigner(walletClient);
}

export type Web3Provider = JsonRpcProvider | FallbackProvider;
