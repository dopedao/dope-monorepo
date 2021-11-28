# dope-monorepo

DOPE DAO contains the web app for https://dopewars.gg and Solidity contracts for generating Hustlers based on `DOPE` NFT tokens and items.

## Testing

This is using the Kovan test network by default
You can [claim Loot tokens for that network using this contract](https://kovan.etherscan.io/address/0xd2761Ee62d8772343070A5dE02C436F788EdF60a#code)

* Switch MetaMask to the `Kovan Test Network`
* Ensure you have tokens in your wallet by [using the Paradigm faucet](https://faucet.paradigm.xyz/)
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
