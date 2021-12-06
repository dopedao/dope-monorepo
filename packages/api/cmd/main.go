package main

import (
	"log"
	"net/http"

	"entgo.io/ent/dialect/sql"

	"entgo.io/ent/dialect"
	"github.com/dopedao/dope-monorepo/packages/api"

	_ "github.com/mattn/go-sqlite3"
)

func main() {
	db, err := sql.Open(dialect.SQLite, "file:dopewars.db?cache=shared&_fk=1")
	if err != nil {
		log.Fatal("Connecting to db.") //nolint:gocritic
	}

	srv, err := api.NewServer(db)
	if err != nil {
		log.Fatal("Creating server.") //nolint:gocritic
	}

	server := &http.Server{Addr: ":8081", Handler: srv}

	log.Println("listening on :8081")
	if err := server.ListenAndServe(); err != nil {
		log.Fatal("http server terminated", err)
	}
}
