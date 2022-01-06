package api

import (
	"context"
	"fmt"
	"net/http"
	"strings"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/schema"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/rs/cors"

	"github.com/dopedao/dope-monorepo/packages/api/engine"
	"github.com/dopedao/dope-monorepo/packages/api/ent"
	"github.com/dopedao/dope-monorepo/packages/api/graph"
)

const ts_migation = `
CREATE MATERIALIZED VIEW search_index AS (
	with dope_names as (
		select df.id, array_agg(distinct(df.fullname)) as fullnames from (
			select d.dope_id as id, coalesce((trim(both ' ' from (
			     ' ' || coalesce(i.name_prefix, '') ||
			     ' ' || coalesce(i.name_suffix, '') ||
			     ' ' || coalesce(i.name, '') ||
			     ' ' || coalesce(i.suffix, '') ||
			     ' ' || coalesce(case when i."augmented" then '+1' end, ''))
			    )), '') as fullname from dope_items d INNER join items i on d.item_id = i.id
		 ) df group by df.id
	) select concat('dope_', id) AS id, id as dope_index, null as item_index, null as hustler_index, 'DOPE' as type, (to_tsvector('english', coalesce(fullnames[0], '')) || to_tsvector('english', coalesce(fullnames[1], '')) || to_tsvector('english', coalesce(fullnames[2], '')) || to_tsvector('english', coalesce(fullnames[3], '')) || to_tsvector('english', coalesce(fullnames[4], '')) || to_tsvector('english', coalesce(fullnames[5], '')) || to_tsvector('english', coalesce(fullnames[6], '')) || to_tsvector('english', coalesce(fullnames[7], ''))) as tsv_document from dope_names
	union 
	select concat('item_', id) AS id, null as dope_index, id as item_index, null as hustler_index, 'ITEM' as type, (to_tsvector('english', coalesce((trim(both ' ' from (
	     ' ' || coalesce(name_prefix, '') ||
	     ' ' || coalesce(name_suffix, '') ||
	     ' ' || coalesce(name, '') ||
	     ' ' || coalesce(suffix, '') ||
	     ' ' || coalesce(case when "augmented" then '+1' end, ''))
	    )), ''))) as tsv_document from items
);

CREATE INDEX tsv_idx ON search_index USING GIN (tsv_document);
`

func NewServer(ctx context.Context, drv *sql.Driver, index bool, network string) (http.Handler, error) {
	client := ent.NewClient(ent.Driver(drv))

	if index {
		// Run the auto migration tool.
		if err := client.Schema.Create(ctx, schema.WithHooks(func(next schema.Creator) schema.Creator {
			return schema.CreateFunc(func(ctx context.Context, tables ...*schema.Table) error {
				var tables2 []*schema.Table
				for _, t := range tables {
					// Remove search_index since it is a materialized view
					if t.Name != "search_index" {
						tables2 = append(tables2, t)
					}
				}
				return next.Create(ctx, tables2...)
			})
		})); err != nil {
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
