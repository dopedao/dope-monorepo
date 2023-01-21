module github.com/dopedao/dope-monorepo/packages/api

go 1.18

require (
	cloud.google.com/go/secretmanager v1.8.0
	cloud.google.com/go/storage v1.27.0
	entgo.io/contrib v0.2.0
	entgo.io/ent v0.10.1
	github.com/99designs/gqlgen v0.17.22
	github.com/ethereum/go-ethereum v1.10.26
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
	github.com/vektah/gqlparser/v2 v2.5.1
	github.com/vmihailenco/msgpack/v5 v5.3.5
	github.com/withtally/synceth v0.0.14
	github.com/yfuruyama/crzerolog v0.3.0
	google.golang.org/api v0.99.0
	google.golang.org/genproto v0.0.0-20221014173430-6e2ab493f96b
)

require (
	ariga.io/atlas v0.3.7-0.20220303204946-787354f533c3 // indirect
	cloud.google.com/go v0.104.0 // indirect
	cloud.google.com/go/compute v1.10.0 // indirect
	cloud.google.com/go/iam v0.5.0 // indirect
	github.com/Masterminds/semver/v3 v3.2.0 // indirect
	github.com/agext/levenshtein v1.2.1 // indirect
	github.com/agnivade/levenshtein v1.1.1 // indirect
	github.com/antlr/antlr4/runtime/Go/antlr v1.4.10 // indirect
	github.com/apparentlymart/go-textseg/v13 v13.0.0 // indirect
	github.com/btcsuite/btcd/btcec/v2 v2.3.2 // indirect
	github.com/cespare/xxhash/v2 v2.1.2 // indirect
	github.com/cpuguy83/go-md2man/v2 v2.0.2 // indirect
	github.com/deckarep/golang-set v1.8.0 // indirect
	github.com/decred/dcrd/dcrec/secp256k1/v4 v4.1.0 // indirect
	github.com/dgryski/go-rendezvous v0.0.0-20200823014737-9f7001d12a5f // indirect
	github.com/go-ole/go-ole v1.2.6 // indirect
	github.com/go-openapi/inflect v0.19.0 // indirect
	github.com/go-stack/stack v1.8.1 // indirect
	github.com/golang/groupcache v0.0.0-20210331224755-41bb18bfe9da // indirect
	github.com/golang/protobuf v1.5.2 // indirect
	github.com/google/go-cmp v0.5.9 // indirect
	github.com/googleapis/enterprise-certificate-proxy v0.2.0 // indirect
	github.com/googleapis/gax-go/v2 v2.6.0 // indirect
	github.com/gorilla/securecookie v1.1.1 // indirect
	github.com/graphql-go/graphql v0.7.10-0.20210411022516-8a92e977c10b // indirect
	github.com/hashicorp/errwrap v1.1.0 // indirect
	github.com/hashicorp/go-cleanhttp v0.5.1 // indirect
	github.com/hashicorp/golang-lru v0.5.5-0.20210104140557-80c98217689d // indirect
	github.com/hashicorp/hcl/v2 v2.10.0 // indirect
	github.com/mitchellh/go-wordwrap v0.0.0-20150314170334-ad45545899c7 // indirect
	github.com/mitchellh/mapstructure v1.5.0 // indirect
	github.com/rjeczalik/notify v0.9.3 // indirect
	github.com/russross/blackfriday/v2 v2.1.0 // indirect
	github.com/shibukawa/configdir v0.0.0-20170330084843-e180dbdc8da0 // indirect
	github.com/shirou/gopsutil v3.21.11+incompatible // indirect
	github.com/tklauser/go-sysconf v0.3.11 // indirect
	github.com/tklauser/numcpus v0.6.0 // indirect
	github.com/urfave/cli/v2 v2.23.7 // indirect
	github.com/vmihailenco/tagparser/v2 v2.0.0 // indirect
	github.com/xrash/smetrics v0.0.0-20201216005158-039620a65673 // indirect
	github.com/yusufpapurcu/wmi v1.2.2 // indirect
	github.com/zclconf/go-cty v1.8.0 // indirect
	go.opencensus.io v0.23.0 // indirect
	golang.org/x/crypto v0.5.0 // indirect
	golang.org/x/mod v0.7.0 // indirect
	golang.org/x/net v0.5.0 // indirect
	golang.org/x/oauth2 v0.0.0-20221006150949-b44042a4b9c1 // indirect
	golang.org/x/sys v0.4.0 // indirect
	golang.org/x/text v0.6.0 // indirect
	golang.org/x/tools v0.5.0 // indirect
	golang.org/x/xerrors v0.0.0-20220907171357-04be3eba64a2 // indirect
	google.golang.org/appengine v1.6.7 // indirect
	google.golang.org/grpc v1.50.1 // indirect
	google.golang.org/protobuf v1.28.1 // indirect
	gopkg.in/natefinch/npipe.v2 v2.0.0-20160621034901-c1b8fa8bdcce // indirect
	gopkg.in/yaml.v3 v3.0.1 // indirect
)

require (
	cloud.google.com/go/bigquery v1.43.0
	github.com/btcsuite/btcd v0.22.0-beta // indirect
	github.com/go-redis/redis/v8 v8.11.5
	github.com/markbates/grift v1.5.0
)

// replace entgo.io/contrib => github.com/tarrencev/contrib v0.0.0-20220114171150-7eb36888a822
