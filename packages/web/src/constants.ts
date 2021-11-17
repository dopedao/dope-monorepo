export const NUM_DOPE_TOKENS = 8000;
export const NETWORK = {
  1: {
    contracts: {
      dope: '0x8707276df042e89669d69a177d3da7dc78bd8723',
      paper: '0x7ae1d57b58fa6411f32948314badd83583ee0e8c',
      initiator: '0xd48055cbd433d93F1Aa000dfCd6EC36F39C0FDB6'
    },
    rpc: 'https://eth-mainnet.alchemyapi.io/v2/4YF7OoE2seG3X12m9bfIJdiRv2zwUaAx',
    subgraph: 'https://api.studio.thegraph.com/query/7708/dope-wars/v0.0.9',
  },
  10: {
    contracts: {
      controller: '0xd48055cbd433d93F1Aa000dfCd6EC36F39C0FDB6',
      swapmeet: '0xB3cCb05742bDbd51Daa24f036FC5489f5ca0f38c',
      hustlers: '0xE9DACD8118917e3A0522f45c191C6abe88d271B0',
    },
    rpc: 'https://opt-mainnet.g.alchemy.com/v2/k8J6YaoTtJVIs4ZxTo26zIPfBiCveX2m',
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
  42: {
    contracts: {
      dope: '0xd2761Ee62d8772343070A5dE02C436F788EdF60a',
      paper: '0x781B575CA559263eb232B854195D6dC0AB720105',
      initiator: '0x8eC7EFeB566a4f0f83A2AC17856378761f9546fB',
    },
    rpc: 'https://eth-kovan.alchemyapi.io/v2/UloBYQ33fXVpI0WFONXO-CgTl4uy93T6',
    subgraph: 'https://api.studio.thegraph.com/query/7708/dope-wars/v0.1.18-rinkeby',
  },
  69: {
    contracts: {
      controller: '0x7E99DE44232C88df11D14af078be64b38236FA3A',
      swapmeet: '0x781A6002A4221c0E52fC283D285b703890024C97',
      hustlers: '0x577d9c7FF9B506d7305194698b4103a3fE3532f0',
    },
    rpc: 'https://opt-kovan.g.alchemy.com/v2/GAJJKOHOzfVI1jmgOf2OcL--sj4Yyedg',
  },
};

export const HUSTLER_MINT_TIME = new Date(2021, 10, 20, 12);
