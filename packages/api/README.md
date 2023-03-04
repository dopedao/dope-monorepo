# dope-api

The Dope Wars api consists of multiple golang services that expose graphql endpoints. The goal is to provide a unified endpoint for blockchain data (ethereum, optimism, starknet), user data (signed messages + offchain data), and ingame assets (composite hustler illustrations, sprites, ect) that will enable people to easily build on top of the dopewars ecosystem.

## Quick Start

## ENV FILE

To ensure the API is running locally you must have access to Google Cloud, with a Firebase project attached for Game Server Authentication. Firebase projects exist as a subset of a Google Cloud project resource. If you want to deploy manually, you must also have access to a Google Cloud project that can push to App Engine and Cloud Run.

DopeWars.gg is hosted on Google Cloud using a variety of services including Cloud SQL and App Engine at the time of this writing. For access to any of these you must have a _Service Account_ with the proper permissions. To learn more about Service Account Keys including how to download the JSON file for yours, [visit this documentation on Google Cloud](https://cloud.google.com/iam/docs/creating-managing-service-account-keys).

### Service Account Key Basics

- Install the gcloud cli
- Run `gcloud auth application default-login`
- Find your gCloud API Service Account Key [https://console.cloud.google.com/apis/credentials]
- Ensure that Service Account has access to Firebase Authentication ([https://console.firebase.google.com/]->Project settings->ServiceAccounts)

### MAC/LINUX

- run `./bin/setenv`
- add the complete path of application_default_credentials.json (or press enter for default)
- add the gCloud API key
- press enter to accept default ports
- press `y` at the last prompt after validating the output to save them (your old .env will be backed up)
- refer to "WINDOWS MANUAL SET UP" if the inputs are not correct or empty

### WINDOWS MANUAL SET UP

- create a ".env" file in repo/packages/api
- add the following variables with the correct path and ports :

```env
GOOGLE_APPLICATION_CREDENTIALS=PATH\TO\YOUR\gcloud\application_default_credentials.json
GAME_SERVER_PORT=6060
FIREBASE_API_KEY=firebase-web-api-key-for-making-requests-from-server
WEB_API_PORT=7070
```

## FRONTEND

> Make sure you are at the projects root

- Install dependencies : `yarn`
- Run `yarn web:dev` to start the webserver
- Go to <http://localhost:3000>

## BACK END

- Run `docker-compose up --build` in repo/packages/api
- Go to <http://localhost:3000/game> to verify the game is up

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

```bash
# Mac OS X commands
brew install --cask google-cloud-sdk
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your-service-account-creds.json"
$env:GOOGLE_APPLICATION_CREDENTIALS="C:\Users\username\Downloads\service-account-file.json" on windows
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
