// This file manages dependencies for GCP App Engine deployment of our API
//
// Google App Engine only supports up to Go 1.16 currently.
//
// For more information please see documentation on GCP
// https://cloud.google.com/appengine/docs/standard/go/specifying-dependencies

module github.com/dopedao/dope-monorepo

go 1.16

require (
	entgo.io/contrib v0.2.0
	entgo.io/ent v0.9.2-0.20211220092907-4d01a56b8de7
	github.com/99designs/gqlgen v0.14.0
	github.com/ethereum/go-ethereum v1.10.13
	github.com/hashicorp/go-multierror v1.1.1
	github.com/hashicorp/go-retryablehttp v0.7.0
	github.com/lib/pq v1.10.4
	github.com/pkg/errors v0.9.1
	github.com/rs/cors v1.8.0
	github.com/rs/zerolog v1.26.0
	github.com/vektah/gqlparser/v2 v2.2.0
	github.com/vmihailenco/msgpack/v5 v5.0.0-beta.9
	github.com/withtally/synceth v0.0.11
)

require (
	cloud.google.com/go/secretmanager v1.0.0
	cloud.google.com/go/storage v1.20.0
	github.com/google/uuid v1.3.0
	github.com/gorilla/handlers v1.5.1
	github.com/gorilla/mux v1.8.0
	github.com/gorilla/sessions v1.2.1
	github.com/gorilla/websocket v1.4.2
	github.com/jiulongw/siwe-go v0.0.0-20220218031631-8d1130da4d8f
	github.com/miguelmota/go-solidity-sha3 v0.1.1
	github.com/spf13/pflag v1.0.5
	github.com/yfuruyama/crzerolog v0.3.0
	google.golang.org/api v0.66.0
	google.golang.org/genproto v0.0.0-20220201184016-50beb8ab5c44
)

replace entgo.io/contrib => github.com/tarrencev/contrib v0.0.0-20220114171150-7eb36888a822
