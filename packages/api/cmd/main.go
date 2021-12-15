package main

import (
	"context"
	"log"
	"net/http"
	"os"

	"entgo.io/ent/dialect/sql"

	"entgo.io/ent/dialect"
	"github.com/dopedao/dope-monorepo/packages/api"
	"github.com/dopedao/dope-monorepo/packages/api/common"
	"github.com/spf13/pflag"

	_ "github.com/lib/pq"
)

var listen = pflag.String("listen", "8080", "server listen port")
var pgConnstring = common.SecretEnv("PG_CONNSTR", "plaintext://postgres://postgres:postgres@localhost:5432?sslmode=disable")
var index = os.Getenv("INDEX")

func main() {
	pgConnstringSecret, err := pgConnstring.Value()
	if err != nil {
		log.Fatalf("Getting postgres connection string: %+v.", err) //nolint:gocritic
	}

	db, err := sql.Open(dialect.Postgres, pgConnstringSecret)
	if err != nil {
		log.Fatalf("Connecting to db: %+v", err) //nolint:gocritic
	}

	srv, err := api.NewServer(context.Background(), db, index == "true")
	if err != nil {
		log.Fatalf("Creating server: %+v", err) //nolint:gocritic
	}

	server := &http.Server{Addr: ":" + *listen, Handler: srv}

	log.Println("listening on :" + *listen)
	if err := server.ListenAndServe(); err != nil {
		log.Fatal("http server terminated", err)
	}
}
