module github.com/dopedao/dope-monorepo/packages/api

go 1.16

require (
	cloud.google.com/go/secretmanager v1.8.0
	cloud.google.com/go/storage v1.27.0
	entgo.io/contrib v0.2.0
	entgo.io/ent v0.10.1
	github.com/99designs/gqlgen v0.17.3
	github.com/ethereum/go-ethereum v1.10.16
	github.com/google/uuid v1.3.0
	github.com/gorilla/mux v1.8.0
	github.com/gorilla/sessions v1.2.1
	github.com/gorilla/websocket v1.5.0
	github.com/hashicorp/go-multierror v1.1.1
	github.com/hashicorp/go-retryablehttp v0.7.1
	github.com/jiulongw/siwe-go v0.0.0-20220218031631-8d1130da4d8f
	github.com/lib/pq v1.10.4
	github.com/miguelmota/go-solidity-sha3 v0.1.1
	github.com/pkg/errors v0.9.1
	github.com/rs/cors v1.7.0
	github.com/rs/zerolog v1.26.1
	github.com/spf13/pflag v1.0.5
	github.com/vektah/gqlparser/v2 v2.4.2
	github.com/vmihailenco/msgpack/v5 v5.3.5
	github.com/withtally/synceth v0.0.14
	github.com/yfuruyama/crzerolog v0.3.0
	google.golang.org/api v0.99.0
	google.golang.org/genproto v0.0.0-20221014173430-6e2ab493f96b
)

require (
	cloud.google.com/go/bigquery v1.43.0
	github.com/btcsuite/btcd v0.22.0-beta // indirect
	github.com/go-redis/redis/v8 v8.11.5
	github.com/markbates/grift v1.5.0
	github.com/mattn/go-colorable v0.1.13 // indirect
)

// replace entgo.io/contrib => github.com/tarrencev/contrib v0.0.0-20220114171150-7eb36888a822
