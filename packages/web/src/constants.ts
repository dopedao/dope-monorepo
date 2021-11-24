export const NUM_DOPE_TOKENS = 8000;
export const NETWORK = {
  1: {
    name: 'Mainnet',
    rpcUrl: '',
    etherscan: '',
    contracts: {
      dope: '0x8707276df042e89669d69a177d3da7dc78bd8723',
      paper: '0x7ae1d57b58fa6411f32948314badd83583ee0e8c',
      initiator: '0x7aa8e897d712CFB9C7cb6B37634A1C4d21181c8B',
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
