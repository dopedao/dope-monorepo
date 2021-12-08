package main

import (
	"log"
	"net/http"

	"entgo.io/ent/dialect/sql"

	"entgo.io/ent/dialect"
	"github.com/dopedao/dope-monorepo/packages/api"

	_ "github.com/lib/pq"
)

func main() {
	db, err := sql.Open(dialect.Postgres, "postgres://postgres@127.0.0.1:5432/dopewars?sslmode=disable")
	if err != nil {
		log.Fatalf("Connecting to db: %+v", err) //nolint:gocritic
	}

	srv, err := api.NewServer(db)
	if err != nil {
		log.Fatalf("Creating server: %+v", err) //nolint:gocritic
	}

	server := &http.Server{Addr: ":8081", Handler: srv}

	log.Println("listening on :8081")
	if err := server.ListenAndServe(); err != nil {
		log.Fatal("http server terminated", err)
	}
}
