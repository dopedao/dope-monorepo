package graph

import (
	"github.com/99designs/gqlgen/graphql"
	"github.com/dopedao/dope-monorepo/packages/api/internal/ent"
	"github.com/dopedao/dope-monorepo/packages/api/internal/graph/generated"
)

type Resolver struct{ client *ent.Client }

// NECESSARY FOR GQLGEN TO WORK WITH ENT + Graphiql playground
func NewSchema(client *ent.Client) graphql.ExecutableSchema {
	return generated.NewExecutableSchema(generated.Config{
		Resolvers: &Resolver{client},
	})
}
