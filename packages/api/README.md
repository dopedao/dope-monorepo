# dope-api

The Dope Wars api consists of a golang service that exposes a graphql endpoint. The goal is to provide a unified endpoint for blockchain data (ethereum, optimism, starknet), user data (signed messages + offchain data), and ingame assets (composite hustler illustrations, sprites, ect) that will enable people to easily build on top of the dopewars ecosystem.

## Quick Start

### Api

To run the api + everything necessary:
```docker-compose up api```

The server exposes the following endpoints:
`http://localhost:8080/playground`
`http://localhost:8080/verify`

### Game

To run the game server + everything necessary:
```docker-compose up game```

The server exposes the following endpoints:
`http://localhost:8080/game`

## Architecture

Our API service is written in golang which uses [gqlgen](https://github.com/99designs/gqlgen) to generate a graphql api. The graphql api is bound automatically to the db model which is managed by [ent.go](https://github.com/ent/ent). Smart contract bindings and event handlers are generated from abis using [ethgen](https://github.com/withtally/synceth).

You can learn more about the graphql <> db auto binding [here](https://entgo.io/docs/tutorial-todo-gql).

There are two services in this API, the indexer; and the API HTTP Server. The Dope Wars API auto-scales, and the indexer uses a single instance taking advantage of [App Engine manual scaling](https://cloud.google.com/appengine/docs/standard/go/how-instances-are-managed).

### Cron tasks & Jobs

Maintenance tasks to update information from the blockchain and external services are handled through HTTP endpoints exposed on our `jobs` service. Each is called from a `cron.yaml` file [as described here on GCP's docs](https://cloud.google.com/appengine/docs/standard/go/scheduling-jobs-with-cron-yaml). App Engine by default exposes these endpoints to the world. [After trying a number of ways to secure them](https://medium.com/google-cloud/gclb-app-engine-cron-and-cloud-scheduler-1df59a7963f) we went with the most simple – [protecting them using `login:admin`](https://cloud.google.com/appengine/docs/standard/java/config/cron-yaml#securing_urls_for_cron)

### Adding a smart contract

To generate new smart contract bindings, add the abi to `packages/api/internal/contracts/abis` and run `go generate ./...`.

### Updating the Database schema

The API uses ENT and Gqlgen to handle ORM and query duties. [You can learn more about using that combination of tools with go here.](https://betterprogramming.pub/implement-a-graphql-server-with-ent-and-gqlgen-in-go-8840f086b8a8)

Modify the schema in `packages/api/internal/ent/schema` and run `go generate ./...`

### Deploying the API

The Dope Wars API and Indexer run on Google Cloud Platform using App Engine in the "Standard" environment. The Game Server runs on GCP "Flexible" environment, which deploys via Dockerfile.

At the time of this writing, [App Engine Standard Environment only supports up to Go 1.16](https://cloud.google.com/appengine/docs/the-appengine-environments), so that should be the version you develop in.

#### Authenticating with `gcloud`

The `gcloud` command line tool is useful to do a number of things in deploying the API. You can install it and set it up like so (after obtaining a service account login from a project lead)

```shell
# Mac OS X commands
brew install --cask google-cloud-sdk
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your-service-account-creds.json"
gcloud auth login
gcloud config set account <your-account>
gcloud config set project dopewars-live
```

#### Run these commands to deploy

```bash
cd packages/api
gcloud app deploy --appyaml app.mainnet.api.yaml
gcloud app deploy --appyaml app.mainnet.indexer.yaml
gcloud app deploy --appyaml app.mainnet.game.yaml
gcloud app deploy --appyaml app.mainnet.jobs.yaml
```
