# dope-api

The Dope Wars api consists of a golang service that exposes a graphql endpoint. The goal is to provide a unified endpoint for blockchain data (ethereum, optimism, starknet), user data (signed messages + offchain data), and ingame assets (composite hustler illustrations, sprites, ect) that will enable people to easily build on top of the dopewars ecosystem.

## Quick Start

Install golang and run the api from the repo root:

```bash
# Launch a runtime instance
bin/shell
# Launch a local postgres instance
sh -c "bin/pgdev"

# Launch the api service
cd packages/api
go run cmd/main.go
```

The server is exposed on `:8000` and you can visit the playground at `http://localhost:8000/playground`.

## Architecture

The service is a golang microservice which uses [gqlgen](https://github.com/99designs/gqlgen) to generate a graphql api. The graphql api is bound automatically to the db model which is managed by [ent.go](https://github.com/ent/ent). Smart contract bindings and event handlers are generated from abis using [ethgen](https://github.com/withtally/synceth).

You can learn more about the graphql <> db auto binding [here](https://entgo.io/docs/tutorial-todo-gql).

### Adding a smart contract

To generate new smart contract bindings, add the abi to `packages/api/contracts/abis` and run `go generate ./...`.

### Updating the schema

Modify the schema in `packages/api/ent/schema` and run `go generate ./...`

### Deploying the API

The Dope Wars API runs on Google Cloud Platform. To deploy, do the following…

```
gcloud app deploy --appyaml app.mainnet.indexer.yaml
```

There are two services, the indexer; and the API. The Dope Wars API auto-scales, and the indexer uses a single instance.