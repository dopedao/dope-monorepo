# dope-monorepo

This repo contains the web app for <https://dopewars.gg> and Solidity contracts for generating Hustlers based on `DOPE` NFT tokens and items.

## Packages

### api

The [API](packages/api) is written in Go and contains logic for indexing data from the blockchain, gathering sales information from the Reservoir API, and serving a GraphQL backend that provides information for the `web` service. More information about the API can be found in that directory's [README](packages/api/README.md).

### contracts

The [contracts](packages/contracts) is the suite of Solidity contracts.

### web

The [web](packages/web) is the frontend for interacting with the web app. More information exists in that [README](packages/web/README.md).

## Quickstart

### Install dependencies

```sh
pnpm
```

### Run webserver and api for development

```sh
pnpm dev
```

## Run web, api, and indexer for dev

```sh
pnpm dev_all
```

### Build all javascript packages

```sh
pnpm build
```

### Run Linter

```sh
pnpm lint
```

### Run Prettier

```sh
pnpm format
```

## Testing

This is using the Kovan test network by default
You can [claim Loot tokens for that network using this contract](https://kovan.etherscan.io/address/0xd2761Ee62d8772343070A5dE02C436F788EdF60a#code)

* Switch MetaMask to the `Kovan Test Network`
* Ensure you have tokens in your wallet by [using the Paradigm faucet](https://faucet.paradigm.xyz/)
* Claim tokens using the contract address above.
