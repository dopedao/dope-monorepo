# dope-api

The Dope Wars api consists of a golang service that exposes a graphql endpoint. The goal is to provide a unified endpoint for blockchain data (ethereum, optimism, starknet), user data (signed messages + offchain data), and ingame assets (composite hustler illustrations, sprites, ect) that will enable people to easily build on top of the dopewars ecosystem.

## Quick Start

## Env

These instructions assume you will have the power to deploy to Google Cloud, where the Dope Wars back-end services are hosted.

🚧 TODO: We might want to tweak these instructions for normal, local development

If you want to deploy you need to have this file:  `~/.config/gcloud/application_default_credentials.json`

If you don't have it do the following:

- install the gcloud cli
- run `gcloud auth application default-login`

### MAC/LINUX

- run `./bin/setenv`
- add the complete path of application_default_credentials.json (or press enter for default)
- press enter to accept default ports
- press `y` at the last prompt after validating the output to save them (your old .env will be backed up)
- refer to "WINDOWS MANUAL SET UP" if the inputs are not correct or empty

### WINDOWS MANUAL SET UP

- create a ".env" file in repo/packages/api
- add the following variables with the correct path and ports :

```
GCLOUD_CRED_PATH=PATH\TO\YOUR\gcloud\application_default_credentials.json

GAME_SERVER_PORT=6060

WEB_API_PORT=7070
```

### Frontend

🚧 TODO: We probably want to code these into the app using an env variable.

Set the URLs in `packages\web\src\game\constants\NetworkConfig.ts` as follows:

```js
wsUri: process.env.GAME_WS_URL ?? "ws://localhost:6060/game/ws",

authUri: process.env.GAME_AUTH_URL ?? "http://localhost:6060/authentication",
```

## FRONTEND

> Make sure you are at the projects root

- install dependencies : `yarn`
- run `yarn web:dev` to start the webserver
- go to <http://localhost:3000>

## GAME SERVER

- run `docker-compose up db game web` in repo/packages/api
- go to <http://localhost:3000/game>

## TOOLS

- start container with interactive shell : `docker-compose run [service-name] sh`
    > Example: `docker-compose run game sh`

- access a running container with sh : `docker exec -it [container-hash] /bin/sh`
    > Example: `docker exec -it a782349aad34d /bin/bash`

    > You can get the hash from `docker ps`

## TROUBLE SHOOTING

### COMPILE DAEMON

- Whenever you apply (or try) a fix make sure to rebuild the image with `--build`
    > Example: `docker-compose up --build game`

- possible compileDaemon fix for docker not finding the exec:

 `go install -mod=mod` instead of `go get` in `packages/api/Dockerfile.hotreload`
 > Linked issue: <https://github.com/githubnemo/CompileDaemon/issues/45#issuecomment-1218054581>

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
