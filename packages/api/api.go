package api

import (
	"context"
	"fmt"
	"net/http"
	"strings"

	"entgo.io/ent/dialect/sql"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/rs/cors"

	"github.com/dopedao/dope-monorepo/packages/api/engine"
	"github.com/dopedao/dope-monorepo/packages/api/ent"
	"github.com/dopedao/dope-monorepo/packages/api/graph"
)

const ts_migation = `
ALTER TABLE items ADD COLUMN ts tsvector 
    GENERATED ALWAYS AS 
        (to_tsvector('english', coalesce((trim(both ' ' from (
     ' ' || coalesce(name_prefix, '') || 
     ' ' || coalesce(name_suffix, '') ||
     ' ' || coalesce(name, '') ||
     ' ' || coalesce(suffix, '') ||
     ' ' || coalesce(case when "augmented" then '+1' end, ''))
    )), ''))) STORED;

CREATE INDEX ts_idx ON items USING GIN (ts);
`

func NewServer(ctx context.Context, drv *sql.Driver, index bool, network string) (http.Handler, error) {
	client := ent.NewClient(ent.Driver(drv))

	if index {
		// Run the auto migration tool.
		if err := client.Schema.Create(ctx); err != nil {
			return nil, err
		}

		if _, err := drv.DB().Exec(ts_migation); err != nil {
			if !strings.Contains(err.Error(), "already exists") {
				return nil, fmt.Errorf("applying ts migration: %w", err)
			}
		}
	}

	srv := handler.NewDefaultServer(graph.NewSchema(client))

	r := http.NewServeMux()
	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(200)
		_, _ = w.Write([]byte(`{"success":true}`))
	})
	r.Handle("/playground", playground.Handler("GraphQL playground", "/query"))
	r.Handle("/query", srv)

	if index {
		ctx, cancel := context.WithCancel(ctx)

		started := false
		r.HandleFunc("/_ah/start", func(w http.ResponseWriter, r *http.Request) {
			if started {
				w.WriteHeader(200)
				_, _ = w.Write([]byte(`{"success":false}`))
				return
			}

			started = true
			for _, c := range configs[network] {
				switch c := c.(type) {
				case engine.EthConfig:
					engine := engine.NewEthereum(client, c)
					go engine.Sync(ctx)
				case engine.OpenseaConfig:
					opensea := engine.NewOpensea(client, c)
					go opensea.Sync(ctx)
				}
			}
			w.WriteHeader(200)
			_, _ = w.Write([]byte(`{"success":true}`))
		})

		r.HandleFunc("/_ah/stop", func(w http.ResponseWriter, r *http.Request) {
			cancel()
			w.WriteHeader(200)
			_, _ = w.Write([]byte(`{"success":true}`))
		})
	}

	return cors.Default().Handler(r), nil
}
