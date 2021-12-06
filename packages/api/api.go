package api

import (
	"context"
	"net/http"
	"reflect"
	"time"

	"entgo.io/ent/dialect/sql"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/ethereum/go-ethereum/common"
	"github.com/rs/cors"

	"github.com/dopedao/dope-monorepo/packages/api/ent"
	"github.com/dopedao/dope-monorepo/packages/api/ent/migrate"
	"github.com/dopedao/dope-monorepo/packages/api/graph"
	"github.com/dopedao/dope-monorepo/packages/api/processors"
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

	eth := NewEngine(client, "https://eth-kovan.alchemyapi.io/v2/imTJSp6gKyrAIFPFrQRXy1lD087y3FN-", Config{
		Interval: time.Second * 5,
		Contracts: []Contract{{
			Address:    common.HexToAddress("0xd2761Ee62d8772343070A5dE02C436F788EdF60a"),
			StartBlock: 28278714,
			Interface:  reflect.TypeOf(processors.DopeProcessor{}),
		}},
	})

	go eth.Sync(context.Background())

	return cors.Default().Handler(r), nil
}
