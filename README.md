# dope-monorepo

Nouns DAO is a generative avatar art collective run by a group of crypto misfits.

## Contributing

If you're interested in contributing to Nouns DAO repos we're excited to have you. Please discuss any changes in `#developers` in [discord.gg/nouns](https://discord.gg/nouns) prior to contributing to reduce duplication of effort and in case there is any prior art that may be useful to you.

## Packages

### contracts

The [nouns contracts](packages/contracts) is the suite of Solidity contracts powering Nouns DAO.

### subgraph

In order to make retrieving more complex data from the auction history, [subgraph](packages/subgraph) contains subgraph manifests that are deployed onto [The Graph](https://thegraph.com).

### webapp

The [webapp](packages/webapp) is the frontend for interacting with Noun auctions as hosted at [nouns.wtf](https://nouns.wtf).

## Quickstart

### Install dependencies

```sh
yarn
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
