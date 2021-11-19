export const NUM_DOPE_TOKENS = 8000;
export const NETWORK = {
  1: {
    contracts: {
      dope: '0x8707276df042e89669d69a177d3da7dc78bd8723',
      paper: '0x7ae1d57b58fa6411f32948314badd83583ee0e8c',
      initiator: '0xd48055cbd433d93F1Aa000dfCd6EC36F39C0FDB6',
    },
    rpc: 'https://eth-mainnet.alchemyapi.io/v2/Mq8Cx8urUvW9FNzv6NW87MYJQ9CnExlj',
    ws: 'wss://eth-mainnet.alchemyapi.io/v2/Mq8Cx8urUvW9FNzv6NW87MYJQ9CnExlj',
    subgraph: 'https://api.thegraph.com/subgraphs/name/tarrencev/dope-wars',
  },
  10: {
    contracts: {
      controller: '0xd48055cbd433d93F1Aa000dfCd6EC36F39C0FDB6',
      swapmeet: '0xB3cCb05742bDbd51Daa24f036FC5489f5ca0f38c',
      hustlers: '0xE9DACD8118917e3A0522f45c191C6abe88d271B0',
    },
    rpc: 'https://opt-mainnet.g.alchemy.com/v2/m-suB_sgPaMFttpSJMU9QWo60c1yxnlG',
    ws: 'wss://opt-mainnet.g.alchemy.com/v2/m-suB_sgPaMFttpSJMU9QWo60c1yxnlG',
    subgraph: 'https://api.thegraph.com/subgraphs/name/tarrencev/dope-wars-optimism',
  },
  42: {
    contracts: {
      dope: '0xd2761Ee62d8772343070A5dE02C436F788EdF60a',
      paper: '0x781B575CA559263eb232B854195D6dC0AB720105',
      initiator: '0x812D76C65bc80599cb778Ba3AecEf1a4AC197ae3',
    },
    rpc: 'https://eth-kovan.alchemyapi.io/v2/imTJSp6gKyrAIFPFrQRXy1lD087y3FN-',
    ws: 'wss://eth-kovan.alchemyapi.io/v2/imTJSp6gKyrAIFPFrQRXy1lD087y3FN-',
    subgraph: 'https://api.thegraph.com/subgraphs/name/tarrencev/dope-wars-kovan',
  },
  69: {
    contracts: {
      controller: '0x560ac3bB6b0bCF669a2a18e33c7538394EA35fF2',
      swapmeet: '0x293f20F4ACeEE50B9a9273C3133A132DE0108e99',
      hustlers: '0x079BE497471CDB22324c6448bf8486024633D262',
    },
    rpc: 'https://opt-kovan.g.alchemy.com/v2/xk92V0tX0bnpMmUp7e6tetGWYgYxhHE9',
    ws: 'wss://opt-kovan.g.alchemy.com/v2/xk92V0tX0bnpMmUp7e6tetGWYgYxhHE9',
    subgraph: 'https://api.thegraph.com/subgraphs/name/tarrencev/dope-wars-kovan-optimism',
  },
};
