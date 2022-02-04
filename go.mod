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
	cloud.google.com/go/storage v1.20.0 // indirect
	github.com/gorilla/mux v1.8.0
	github.com/miguelmota/go-solidity-sha3 v0.1.1
	github.com/spf13/pflag v1.0.5
	github.com/yfuruyama/crzerolog v0.3.0
	google.golang.org/api v0.66.0 // indirect
	google.golang.org/genproto v0.0.0-20220201184016-50beb8ab5c44
)

replace entgo.io/contrib => github.com/tarrencev/contrib v0.0.0-20220114171150-7eb36888a822
