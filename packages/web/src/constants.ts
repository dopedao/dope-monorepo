export const NUM_DOPE_TOKENS = 8000;
export const NETWORK = {
  1: {
    contracts: {
      dope: '0x8707276df042e89669d69a177d3da7dc78bd8723',
      paper: '0x7ae1d57b58fa6411f32948314badd83583ee0e8c',
      swapmeet: '0xd1A506727b8f4221B55C22b2B62B7BE6635E0569',
      hustlers: '0xED3259c562F7e7A0635db575FD524Dc9035c6ab3',
    },
    rpc: 'https://eth-mainnet.alchemyapi.io/v2/4YF7OoE2seG3X12m9bfIJdiRv2zwUaAx',
    subgraph: 'https://api.studio.thegraph.com/query/7708/dope-wars/v0.0.9',
  },
  4: {
    contracts: {
      dope: '0xEf879818335a10Db667810a9B668A8F537389194',
      paper: '0x7988fCA891B30cF8E23459B09b851F9d79B17215',
      swapmeet: '0x52aA7619E1eCEEbCBFF7d26C749488d6AD888516',
      hustlers: '0x7E9c72F6440A817d71Cc1441873Ef0747330922B',
    },
    rpc: 'https://eth-rinkeby.alchemyapi.io/v2/_UcVUJUlskxh3u6aDOeeUgAWkVk4FwZ4',
    subgraph: 'https://api.studio.thegraph.com/query/7708/dope-wars/v0.1.18-rinkeby',
  },
};
