package schema

import (
	"encoding/json"

	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Listing holds the schema definition for the Listing entity.
type Listing struct {
	ent.Schema
}

// Fields of the Listing.
func (Listing) Fields() []ent.Field {
	return []ent.Field{
		field.String("id"),
		field.Bool("active"),
		field.Enum("source").
			Values("OPENSEA", "SWAPMEET").
			Immutable(),
		// Because we're stuck on Go 1.16 (using GCP App Engine Std)
		// we can't use generics to unmarshal polymorphic json stored in a single column.
		//
		// TODO: Replace this with something more elegant?
		// Do we really need to continue storing the old wyvern orders?
		// They were mostly for the "one-click" hustler contract
		// which doesn't work any longer :p
		//
		// Need to store multiple fields instead. yuck.
		// https://bytemeta.vip/repo/ent/ent/issues/2491
		field.JSON("wyvern_order", json.RawMessage{}).Optional(),
		field.JSON("seaport_order", json.RawMessage{}).Optional(),
	}
}

// Edges of the Listing.
func (Listing) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("dope", Dope.Type).Ref("listings").Unique().Annotations(entgql.Bind()),
		edge.To("dope_lastsales", Dope.Type).Unique().Annotations(entgql.Bind()),
		edge.To("inputs", Amount.Type).Annotations(entgql.Bind()),
		edge.To("outputs", Amount.Type).Annotations(entgql.Bind()),
	}
}
