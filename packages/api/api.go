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
	WITH dope_agg AS (
		SELECT
			df.id,
			array_agg(df.fullname) AS fullnames,
			sum(
				CASE WHEN df.greatness = 20 THEN
					4
				WHEN df.greatness = 19 THEN
					3
				WHEN df.greatness > 14 THEN
					2
				ELSE
					1
				END) AS greatness,
			df.sale_active AS sale_active,
			df.last_sale_price AS last_sale_price,
			df.sale_price AS sale_price,
			opened,
			claimed
		FROM (
			SELECT
				d.dope_id AS id,
				coalesce((trim(BOTH ' ' FROM (' ' || coalesce(i.name_prefix,
								'') || ' ' || coalesce(i.name_suffix,
								'') || ' ' || coalesce(i.name,
								'') || ' ' || coalesce(i.suffix,
								'') || ' ' || coalesce(
								CASE WHEN i. "augmented" THEN
									'+1'
								END,
								'')))),
				'') AS fullname,
				greatness,
				opened,
				claimed,
				l.active AS sale_active,
				l.active_amount AS sale_price,
				l.last_amount AS last_sale_price
			FROM
				dope_items d
				INNER JOIN items i ON d.item_id = i.id
				INNER JOIN (
					SELECT
						dope.id AS id,
						dope.opened AS opened,
						dope.claimed AS claimed,
						coalesce(ali.active,
							FALSE) AS active,
						a.amount AS last_amount,
						alia.amount AS active_amount
					FROM
						dopes dope
						LEFT JOIN listings li ON dope.listing_dope_lastsales = li.id
						LEFT JOIN amounts a ON dope.listing_dope_lastsales = a.listing_inputs
						LEFT JOIN listings ali ON dope.id = ali.dope_listings
							AND ali.active = TRUE
					LEFT JOIN amounts alia ON ali.id = alia.listing_inputs) l ON d.dope_id = l.id) df
		GROUP BY
			df.id,
			df.sale_active,
			df.sale_price,
			df.last_sale_price,
			df.opened,
			df.claimed
)
	SELECT
		concat('dope_',
			id) AS id,
		greatness,
		sale_active AS sale_active,
		sale_price AS sale_price,
		last_sale_price AS last_sale_price,
		opened,
		claimed,
		TEXT 'DOPE' AS TYPE,
		id AS dope_index,
		NULL AS item_index,
		NULL AS hustler_index,
		(to_tsvector('english',
				coalesce(fullnames [0],
					'')) || to_tsvector('english',
				coalesce(fullnames [1],
					'')) || to_tsvector('english',
				coalesce(fullnames [2],
					'')) || to_tsvector('english',
				coalesce(fullnames [3],
					'')) || to_tsvector('english',
				coalesce(fullnames [4],
					'')) || to_tsvector('english',
				coalesce(fullnames [5],
					'')) || to_tsvector('english',
				coalesce(fullnames [6],
					'')) || to_tsvector('english',
				coalesce(fullnames [7],
					''))) AS tsv_document
	FROM
		dope_agg
	UNION
	SELECT
		concat('item_',
			id) AS id,
		CASE WHEN greatness = 20 THEN
			4
		WHEN greatness = 19 THEN
			3
		WHEN greatness > 14 THEN
			2
		ELSE
			1
		END AS greatness,
		FALSE AS sale_active,
		NULL AS sale_price,
		NULL AS last_sale_price,
		FALSE AS opened,
		FALSE AS claimed,
		'ITEM' AS TYPE,
		NULL AS dope_index,
		id AS item_index,
		NULL AS hustler_index,
		(to_tsvector('english',
				coalesce((trim(BOTH ' ' FROM (' ' || coalesce(name_prefix,
								'') || ' ' || coalesce(name_suffix,
								'') || ' ' || coalesce(name,
								'') || ' ' || coalesce(suffix,
								'') || ' ' || coalesce(
								CASE WHEN "augmented" THEN
									'+1'
								END,
								'')))),
				''))) AS tsv_document
	FROM
		items
)
UNION (WITH hustler_agg AS (
		SELECT
			df.id,
			array_agg(df.fullname) AS fullnames,
			df.title,
			df.name,
			sum(
				CASE WHEN df.greatness = 20 THEN
					4
				WHEN df.greatness = 19 THEN
					3
				WHEN df.greatness > 14 THEN
					2
				ELSE
					1
				END) AS greatness
		FROM (
			SELECT
				h.id AS id,
				coalesce((trim(BOTH ' ' FROM (' ' || coalesce(i.name_prefix,
								'') || ' ' || coalesce(i.name_suffix,
								'') || ' ' || coalesce(i.name,
								'') || ' ' || coalesce(i.suffix,
								'') || ' ' || coalesce(
								CASE WHEN i. "augmented" THEN
									'+1'
								END,
								'')))),
				'') AS fullname,
				greatness,
				h.name,
				h.title AS title
			FROM
				hustlers h
			LEFT JOIN items i ON h.item_hustler_feet = i.id
				OR h.item_hustler_drugs = i.id
				OR h.item_hustler_hands = i.id
				OR h.item_hustler_necks = i.id
				OR h.item_hustler_rings = i.id
				OR h.item_hustler_waists = i.id
				OR h.item_hustler_clothes = i.id
				OR h.item_hustler_weapons = i.id
				OR h.item_hustler_vehicles = i.id
				OR h.item_hustler_accessories = i.id) df
		GROUP BY
			df.id,
			title,
			df.name
)
	SELECT
		concat('hustler_',
			id) AS id,
		greatness,
		FALSE AS sale_active,
		NULL AS sale_price,
		NULL AS last_sale_price,
		FALSE AS opened,
		FALSE AS claimed,
		'HUSTLER' AS TYPE,
		NULL AS dope_index,
		NULL AS item_index,
		id AS hustler_index,
		(to_tsvector('english',
				coalesce(fullnames [0],
					'')) || to_tsvector('english',
				coalesce(fullnames [1],
					'')) || to_tsvector('english',
				coalesce(fullnames [2],
					'')) || to_tsvector('english',
				coalesce(fullnames [3],
					'')) || to_tsvector('english',
				coalesce(fullnames [4],
					'')) || to_tsvector('english',
				coalesce(fullnames [5],
					'')) || to_tsvector('english',
				coalesce(fullnames [6],
					'')) || to_tsvector('english',
				coalesce(fullnames [7],
					'')) || to_tsvector('english',
				coalesce(name,
					'')) || to_tsvector('english',
				coalesce(title,
					''))) AS tsv_document
	FROM
		hustler_agg
);

CREATE UNIQUE INDEX search_index_pk ON search_index using btree(id);
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
					engine := engine.NewEthereum(ctx, client, c)
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
