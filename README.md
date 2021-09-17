# dope-monorepo

DOPE DAO contains the web app for https://dopewars.gg and Solidity contracts for generating Hustlers based on `DOPE` NFT tokens and items.

## Testing

This is using the Rinkeby test network by default
You can [claim Loot tokens for that network using this contract](https://rinkeby.etherscan.io/address/0xEf879818335a10Db667810a9B668A8F537389194#code)

* Switch MetaMask to the `Rinkeby Test Network`
* Ensure you have tokens in your wallet by visiting the [following the instructions here](https://teller.gitbook.io/teller-1/testing-guide/getting-testnet-tokens-rinkeby)
* Claim tokens using the contract address above.

## Packages

### contracts

The [contracts](packages/contracts) is the suite of Solidity contracts.

### web

The [web](packages/webapp) is the frontend for interacting with the web app.

## Quickstart

### Install dependencies

```sh
yarn
```

### Run webserver for development

```sh
yarn web:dev
```

### Build all packages

```sh
yarn build
```

### Run Linter

```sh
yarn lint
```

### Run Prettier

```sh
yarn format
```
