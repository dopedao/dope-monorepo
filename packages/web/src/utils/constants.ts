export const NUM_DOPE_TOKENS = 8000;

export const ETH_CHAIN_ID = process.env.NEXT_PUBLIC_ETH_CHAIN_ID || '1';
export const OPT_CHAIN_ID = process.env.NEXT_PUBLIC_OPT_CHAIN_ID || '10';

export const REFETCH_INTERVAL = 30_000;

export const NETWORK = {
  1: {
    name: 'Mainnet',
    rpcUrl: '',
    etherscan: '',
    contracts: {
      dope: '0x8707276df042e89669d69a177d3da7dc78bd8723',
      paper: '0x7ae1d57b58fa6411f32948314badd83583ee0e8c',
      initiator: '0x7aa8e897d712CFB9C7cb6B37634A1C4d21181c8B',
      oneclick: '0xA92C2ae3E1CAa57B254f5675E77DC38f4e336E60',
    },
    rpc: 'https://eth-mainnet.alchemyapi.io/v2/Mq8Cx8urUvW9FNzv6NW87MYJQ9CnExlj',
    ws: 'wss://eth-mainnet.alchemyapi.io/v2/Mq8Cx8urUvW9FNzv6NW87MYJQ9CnExlj',
    subgraph: 'https://api.thegraph.com/subgraphs/name/tarrencev/dope-wars',
    currency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    chainId: 1,
  },
  10: {
    name: 'Optimistic Ethereum',
    rpcUrl: 'https://mainnet.optimism.io/',
    etherscan: 'https://optimistic.etherscan.io/',
    contracts: {
      controller: '0x124760902088dDBFEb8F27210D3B0C645a5c0A8B',
      swapmeet: '0x0E55e1913C50e015e0F60386ff56A4Bfb00D7110',
      hustlers: '0xDbfEaAe58B6dA8901a8a40ba0712bEB2EE18368E',
      components: '0xe03C4eb2a0a797766a5DB708172e04f6A970DC7f',
      paper: '0x00F932F0FE257456b32dedA4758922E56A4F4b42',
      hongbao: '0xc338e9135e5ace8dcc70e2b9d320a03a101f96ae',
    },
    rpc: 'https://opt-mainnet.g.alchemy.com/v2/m-suB_sgPaMFttpSJMU9QWo60c1yxnlG',
    ws: 'wss://opt-mainnet.g.alchemy.com/v2/m-suB_sgPaMFttpSJMU9QWo60c1yxnlG',
    subgraph: 'https://api.thegraph.com/subgraphs/name/tarrencev/dope-wars-optimism',
    currency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    chainId: 10,
  },
  42: {
    name: 'Kovan mainnet',
    rpcUrl: 'https://kovan.infura.io',
    etherscan: 'https://kovan.etherscan.io/',
    contracts: {
      dope: '0xd2761Ee62d8772343070A5dE02C436F788EdF60a',
      paper: '0x781B575CA559263eb232B854195D6dC0AB720105',
      initiator: '0x4013177b1593CFd68a49F5AD25FA0a9112b1e568',
      oneclick: '0xA92C2ae3E1CAa57B254f5675E77DC38f4e336E60',
    },
    rpc: 'https://eth-kovan.alchemyapi.io/v2/imTJSp6gKyrAIFPFrQRXy1lD087y3FN-',
    ws: 'wss://eth-kovan.alchemyapi.io/v2/imTJSp6gKyrAIFPFrQRXy1lD087y3FN-',
    subgraph: 'https://api.thegraph.com/subgraphs/name/tarrencev/dope-wars-kovan',
    currency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    chainId: 42,
  },
  69: {
    name: 'Optimistic Ethereum Testnet Kovan',
    rpcUrl: 'https://kovan.optimism.io/',
    etherscan: 'https://kovan-optimistic.etherscan.io/',
    contracts: {
      controller: '0x99A89AF659d5AF027b3d94BB0B169873b46d6351',
      swapmeet: '0x7144893df7456fB9678875aa09800d514685850F',
      hustlers: '0x5701ff301d67174d63B271cf321e3886d518370d',
      components: '0xA9d6Ef18457c4d87Ba77d5c22569c93a41b8f326',
      hongbao: '0x117216Ec403b337F80228bFBFF3F161d727Bc3bf',
      paper: '0x3F3Ef5f39a95F13c821E4a12AaE09c2446C72452',
    },
    rpc: 'https://opt-kovan.g.alchemy.com/v2/xk92V0tX0bnpMmUp7e6tetGWYgYxhHE9',
    ws: 'wss://opt-kovan.g.alchemy.com/v2/xk92V0tX0bnpMmUp7e6tetGWYgYxhHE9',
    subgraph: 'https://api.thegraph.com/subgraphs/name/tarrencev/dope-wars-kovan-optimism',
    currency: {
      name: 'Kovan Ether',
      symbol: 'KOR',
      decimals: 18,
    },
    chainId: 69,
  },
};

export const findChainIdAndContractKey = (contractAddress: string): { chainId: number; contractKey: string } => {
  for (const chainId in NETWORK) {
    const network = NETWORK[chainId as unknown as keyof typeof NETWORK];
    if (network.contracts) {
      for (const contractKey in network.contracts) {
        // Contract addresses can come back lowercase from various
        // sources like Alchemy or Reservoir.
        if ((network.contracts as { [key: string]: string })[contractKey].toLowerCase() === contractAddress.toLowerCase()) {
          return { chainId: Number(chainId), contractKey };
        }
      }
    }
  }
  return { chainId: 0, contractKey: '' };
}


// Set in .env.local in /packages/web
let apiUrl = '';
if (process.env.NEXT_PUBLIC_API_URL) {
  apiUrl = process.env.NEXT_PUBLIC_API_URL;
} else {
  console.error('NEXT_PUBLIC_API_URL not set in .env.local');
}
export const MAINNET_API_URL = apiUrl;
