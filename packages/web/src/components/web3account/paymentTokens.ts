import { PaymentToken } from '@reservoir0x/reservoir-sdk';

export type ePaymentToken = PaymentToken & {
  coinGeckoId?: string;
};

export const paymentTokens: { [chainId: number]: ePaymentToken[] } = {
  1: [
    {
      chainId: 1,
      address: '0x7ae1d57b58fa6411f32948314badd83583ee0e8c',
      symbol: 'PAPER',
      name: 'Dope Wars Paper',
      decimals: 18,
      coinGeckoId: 'dope-wars-paper',
    },
    {
      chainId: 1,
      address: '0x0000000000000000000000000000000000000000',
      symbol: 'ETH',
      name: 'ETH',
      decimals: 18,
    },
    {
      chainId: 1,
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      symbol: 'USDC',
      name: 'USDC',
      decimals: 6,
    },
    // {
    //   chainId: 1,
    //   address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    //   symbol: 'WETH',
    //   name: 'WETH',
    //   decimals: 18,
    // },
  ],
  10: [
    // Optimism
    {
      chainId: 10,
      address: '0x00F932F0FE257456b32dedA4758922E56A4F4b42',
      symbol: 'PAPER',
      name: 'Dope Wars Paper',
      decimals: 18,
      coinGeckoId: 'dope-wars-paper',
    },
    {
      chainId: 10,
      address: '0x0000000000000000000000000000000000000000',
      symbol: 'ETH',
      name: 'ETH',
      decimals: 18,
    },
    {
      chainId: 10,
      address: '0x4200000000000000000000000000000000000042',
      symbol: 'OP',
      name: 'OP',
      decimals: 18,
    },
    // {
    //   chainId: 10,
    //   address: '0x0b2c639c533813f4aa9d7837caf62653d097ff85',
    //   symbol: 'USDC',
    //   name: 'USDC',
    //   decimals: 6,
    // },
    // {
    //   chainId: 10,
    //   address: '0x4200000000000000000000000000000000000006',
    //   symbol: 'WETH',
    //   name: 'WETH',
    //   decimals: 18,
    // },
  ],
};
