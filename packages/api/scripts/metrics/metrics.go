package main

import (
	"context"
	"log"
	"sort"

	"entgo.io/ent/dialect"
	"entgo.io/ent/dialect/sql"
	"github.com/dopedao/dope-monorepo/packages/api/ent"
	"github.com/dopedao/dope-monorepo/packages/api/ent/item"

	_ "github.com/lib/pq"
)

func main() {
	ctx := context.Background()

	db, err := sql.Open(dialect.Postgres, "postgres://postgres:postgres@localhost:5432?sslmode=disable")
	if err != nil {
		log.Fatalf("Connecting to db: %+v", err) //nolint:gocritic
	}

	client := ent.NewClient(ent.Driver(db))

	// Run the auto migration tool.
	if err := client.Schema.Create(context.Background()); err != nil {
		log.Fatalf("Migrating db: %+v", err) //nolint:gocritic
	}

	dopes, err := client.Dope.Query().WithItems().All(ctx)
	if err != nil {
		log.Fatalf("Getting dopes: %+v", err)
	}

	occurences := map[string]int{}
	types := map[string]item.Type{}
	min := map[item.Type]int{}
	max := map[item.Type]int{}

	for _, dope := range dopes {
		for _, item := range dope.Edges.Items {
			occurences[item.ID] += 1
			types[item.ID] = item.Type
		}
	}

	for id, occurence := range occurences {
		typ := types[id]

		if min[typ] == 0 || occurence < min[typ] {
			min[typ] = occurence
		}

		if max[typ] == 0 || occurence > max[typ] {
			max[typ] = occurence
		}
	}

	for itemID, count := range occurences {
		client.Item.UpdateOneID(itemID).SetCount(count).SetScore(normalize(float64(count), float64(min[types[itemID]]), float64(max[types[itemID]]))).ExecX(ctx)
	}

	for _, dope := range dopes {
		score := 0.0
		for _, item := range dope.Edges.Items {
			score += normalize(float64(occurences[item.ID]), float64(min[types[item.ID]]), float64(max[types[item.ID]]))
		}
		score /= 9
		client.Dope.UpdateOneID(dope.ID).SetScore(score).ExecX(ctx)
	}

	dopes, err = client.Dope.Query().All(ctx)
	if err != nil {
		log.Fatalf("Getting dopes: %+v", err)
	}

	sort.Slice(dopes, func(i int, j int) bool {
		return dopes[i].Score < dopes[j].Score
	})

	for i, dope := range dopes {
		client.Dope.UpdateOneID(dope.ID).SetRank(i).ExecX(ctx)
	}
}

func normalize(x, min, max float64) float64 {
	return (x - min) / (max - min)
}
