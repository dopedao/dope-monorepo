package api

import (
	"context"
	"net/http"

	"entgo.io/ent/dialect/sql"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/rs/cors"

	"github.com/dopedao/dope-monorepo/packages/api/ent"
	"github.com/dopedao/dope-monorepo/packages/api/ent/migrate"
	"github.com/dopedao/dope-monorepo/packages/api/graph"
)

func NewServer(db *sql.Driver) (http.Handler, error) {
	client := ent.NewClient(ent.Driver(db))

	// Run the auto migration tool.
	if err := client.Schema.Create(context.Background(), migrate.WithGlobalUniqueID(true)); err != nil {
		return nil, err
	}

	srv := handler.NewDefaultServer(graph.NewSchema(client))

	r := http.NewServeMux()
	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(200)
		_, _ = w.Write([]byte(`{"success":true}`))
	})
	r.Handle("/playground", playground.Handler("GraphQL playground", "/query"))
	r.Handle("/query", srv)

	for _, c := range configs {
		engine := NewEngine(client, c)
		go engine.Sync(context.Background())
	}

	return cors.Default().Handler(r), nil
}
