//go:build ignore
// +build ignore

package main

import (
	"log"

	"entgo.io/contrib/entgql"
	"entgo.io/ent/entc"
	"entgo.io/ent/entc/gen"
	"entgo.io/ent/schema/field"
)

func main() {
	ex, err := entgql.NewExtension(
		entgql.WithWhereInputs(true),
		entgql.WithConfigPath("../gqlgen.yml"),
		entgql.WithSchemaGenerator(),
		entgql.WithSchemaPath("../graph/ent.graphql"),
	)
	if err != nil {
		log.Fatalf("creating entgql extension: %v", err)
	}
	opts := []entc.Option{
		entc.Extensions(ex),
	}
	if err := entc.Generate("./schema", &gen.Config{
		IDType: &field.TypeInfo{Type: field.TypeString},
		Features: []gen.Feature{
			gen.FeatureUpsert,
		},
	}, opts...); err != nil {
		log.Fatalf("running ent codegen: %v", err)
	}
}
