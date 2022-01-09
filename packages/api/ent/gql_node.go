// Code generated by entc, DO NOT EDIT.

package ent

import (
	"context"
	"encoding/json"
	"fmt"

	"entgo.io/contrib/entgql"
	"github.com/99designs/gqlgen/graphql"
	"github.com/dopedao/dope-monorepo/packages/api/ent/amount"
	"github.com/dopedao/dope-monorepo/packages/api/ent/bodypart"
	"github.com/dopedao/dope-monorepo/packages/api/ent/dope"
	"github.com/dopedao/dope-monorepo/packages/api/ent/event"
	"github.com/dopedao/dope-monorepo/packages/api/ent/hustler"
	"github.com/dopedao/dope-monorepo/packages/api/ent/item"
	"github.com/dopedao/dope-monorepo/packages/api/ent/listing"
	"github.com/dopedao/dope-monorepo/packages/api/ent/search"
	"github.com/dopedao/dope-monorepo/packages/api/ent/syncstate"
	"github.com/dopedao/dope-monorepo/packages/api/ent/wallet"
	"github.com/dopedao/dope-monorepo/packages/api/ent/walletitems"
	"github.com/hashicorp/go-multierror"
)

// Noder wraps the basic Node method.
type Noder interface {
	Node(context.Context) (*Node, error)
}

// Node in the graph.
type Node struct {
	ID     string   `json:"id,omitempty"`     // node id.
	Type   string   `json:"type,omitempty"`   // node type.
	Fields []*Field `json:"fields,omitempty"` // node fields.
	Edges  []*Edge  `json:"edges,omitempty"`  // node edges.
}

// Field of a node.
type Field struct {
	Type  string `json:"type,omitempty"`  // field type.
	Name  string `json:"name,omitempty"`  // field name (as in struct).
	Value string `json:"value,omitempty"` // stringified value.
}

// Edges between two nodes.
type Edge struct {
	Type string   `json:"type,omitempty"` // edge type.
	Name string   `json:"name,omitempty"` // edge name.
	IDs  []string `json:"ids,omitempty"`  // node ids (where this edge point to).
}

func (a *Amount) Node(ctx context.Context) (node *Node, err error) {
	node = &Node{
		ID:     a.ID,
		Type:   "Amount",
		Fields: make([]*Field, 3),
		Edges:  make([]*Edge, 2),
	}
	var buf []byte
	if buf, err = json.Marshal(a.Type); err != nil {
		return nil, err
	}
	node.Fields[0] = &Field{
		Type:  "amount.Type",
		Name:  "type",
		Value: string(buf),
	}
	if buf, err = json.Marshal(a.Amount); err != nil {
		return nil, err
	}
	node.Fields[1] = &Field{
		Type:  "schema.BigInt",
		Name:  "amount",
		Value: string(buf),
	}
	if buf, err = json.Marshal(a.AssetID); err != nil {
		return nil, err
	}
	node.Fields[2] = &Field{
		Type:  "schema.BigInt",
		Name:  "asset_id",
		Value: string(buf),
	}
	node.Edges[0] = &Edge{
		Type: "Listing",
		Name: "listing_input",
	}
	err = a.QueryListingInput().
		Select(listing.FieldID).
		Scan(ctx, &node.Edges[0].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[1] = &Edge{
		Type: "Listing",
		Name: "listing_output",
	}
	err = a.QueryListingOutput().
		Select(listing.FieldID).
		Scan(ctx, &node.Edges[1].IDs)
	if err != nil {
		return nil, err
	}
	return node, nil
}

func (bp *BodyPart) Node(ctx context.Context) (node *Node, err error) {
	node = &Node{
		ID:     bp.ID,
		Type:   "BodyPart",
		Fields: make([]*Field, 3),
		Edges:  make([]*Edge, 3),
	}
	var buf []byte
	if buf, err = json.Marshal(bp.Type); err != nil {
		return nil, err
	}
	node.Fields[0] = &Field{
		Type:  "bodypart.Type",
		Name:  "type",
		Value: string(buf),
	}
	if buf, err = json.Marshal(bp.Sex); err != nil {
		return nil, err
	}
	node.Fields[1] = &Field{
		Type:  "bodypart.Sex",
		Name:  "sex",
		Value: string(buf),
	}
	if buf, err = json.Marshal(bp.Rle); err != nil {
		return nil, err
	}
	node.Fields[2] = &Field{
		Type:  "string",
		Name:  "rle",
		Value: string(buf),
	}
	node.Edges[0] = &Edge{
		Type: "Hustler",
		Name: "hustler_bodies",
	}
	err = bp.QueryHustlerBodies().
		Select(hustler.FieldID).
		Scan(ctx, &node.Edges[0].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[1] = &Edge{
		Type: "Hustler",
		Name: "hustler_hairs",
	}
	err = bp.QueryHustlerHairs().
		Select(hustler.FieldID).
		Scan(ctx, &node.Edges[1].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[2] = &Edge{
		Type: "Hustler",
		Name: "hustler_beards",
	}
	err = bp.QueryHustlerBeards().
		Select(hustler.FieldID).
		Scan(ctx, &node.Edges[2].IDs)
	if err != nil {
		return nil, err
	}
	return node, nil
}

func (d *Dope) Node(ctx context.Context) (node *Node, err error) {
	node = &Node{
		ID:     d.ID,
		Type:   "Dope",
		Fields: make([]*Field, 5),
		Edges:  make([]*Edge, 5),
	}
	var buf []byte
	if buf, err = json.Marshal(d.Claimed); err != nil {
		return nil, err
	}
	node.Fields[0] = &Field{
		Type:  "bool",
		Name:  "claimed",
		Value: string(buf),
	}
	if buf, err = json.Marshal(d.Opened); err != nil {
		return nil, err
	}
	node.Fields[1] = &Field{
		Type:  "bool",
		Name:  "opened",
		Value: string(buf),
	}
	if buf, err = json.Marshal(d.Score); err != nil {
		return nil, err
	}
	node.Fields[2] = &Field{
		Type:  "int",
		Name:  "score",
		Value: string(buf),
	}
	if buf, err = json.Marshal(d.Rank); err != nil {
		return nil, err
	}
	node.Fields[3] = &Field{
		Type:  "int",
		Name:  "rank",
		Value: string(buf),
	}
	if buf, err = json.Marshal(d.Order); err != nil {
		return nil, err
	}
	node.Fields[4] = &Field{
		Type:  "int",
		Name:  "order",
		Value: string(buf),
	}
	node.Edges[0] = &Edge{
		Type: "Wallet",
		Name: "wallet",
	}
	err = d.QueryWallet().
		Select(wallet.FieldID).
		Scan(ctx, &node.Edges[0].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[1] = &Edge{
		Type: "Listing",
		Name: "last_sale",
	}
	err = d.QueryLastSale().
		Select(listing.FieldID).
		Scan(ctx, &node.Edges[1].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[2] = &Edge{
		Type: "Listing",
		Name: "listings",
	}
	err = d.QueryListings().
		Select(listing.FieldID).
		Scan(ctx, &node.Edges[2].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[3] = &Edge{
		Type: "Item",
		Name: "items",
	}
	err = d.QueryItems().
		Select(item.FieldID).
		Scan(ctx, &node.Edges[3].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[4] = &Edge{
		Type: "Search",
		Name: "index",
	}
	err = d.QueryIndex().
		Select(search.FieldID).
		Scan(ctx, &node.Edges[4].IDs)
	if err != nil {
		return nil, err
	}
	return node, nil
}

func (e *Event) Node(ctx context.Context) (node *Node, err error) {
	node = &Node{
		ID:     e.ID,
		Type:   "Event",
		Fields: make([]*Field, 5),
		Edges:  make([]*Edge, 0),
	}
	var buf []byte
	if buf, err = json.Marshal(e.Address); err != nil {
		return nil, err
	}
	node.Fields[0] = &Field{
		Type:  "common.Address",
		Name:  "address",
		Value: string(buf),
	}
	if buf, err = json.Marshal(e.Index); err != nil {
		return nil, err
	}
	node.Fields[1] = &Field{
		Type:  "uint64",
		Name:  "index",
		Value: string(buf),
	}
	if buf, err = json.Marshal(e.Hash); err != nil {
		return nil, err
	}
	node.Fields[2] = &Field{
		Type:  "common.Hash",
		Name:  "hash",
		Value: string(buf),
	}
	if buf, err = json.Marshal(e.CreatedAt); err != nil {
		return nil, err
	}
	node.Fields[3] = &Field{
		Type:  "time.Time",
		Name:  "created_at",
		Value: string(buf),
	}
	if buf, err = json.Marshal(e.UpdatedAt); err != nil {
		return nil, err
	}
	node.Fields[4] = &Field{
		Type:  "time.Time",
		Name:  "updated_at",
		Value: string(buf),
	}
	return node, nil
}

func (h *Hustler) Node(ctx context.Context) (node *Node, err error) {
	node = &Node{
		ID:     h.ID,
		Type:   "Hustler",
		Fields: make([]*Field, 11),
		Edges:  make([]*Edge, 15),
	}
	var buf []byte
	if buf, err = json.Marshal(h.Type); err != nil {
		return nil, err
	}
	node.Fields[0] = &Field{
		Type:  "hustler.Type",
		Name:  "type",
		Value: string(buf),
	}
	if buf, err = json.Marshal(h.Name); err != nil {
		return nil, err
	}
	node.Fields[1] = &Field{
		Type:  "string",
		Name:  "name",
		Value: string(buf),
	}
	if buf, err = json.Marshal(h.Title); err != nil {
		return nil, err
	}
	node.Fields[2] = &Field{
		Type:  "string",
		Name:  "title",
		Value: string(buf),
	}
	if buf, err = json.Marshal(h.Color); err != nil {
		return nil, err
	}
	node.Fields[3] = &Field{
		Type:  "string",
		Name:  "color",
		Value: string(buf),
	}
	if buf, err = json.Marshal(h.Background); err != nil {
		return nil, err
	}
	node.Fields[4] = &Field{
		Type:  "string",
		Name:  "background",
		Value: string(buf),
	}
	if buf, err = json.Marshal(h.Age); err != nil {
		return nil, err
	}
	node.Fields[5] = &Field{
		Type:  "uint64",
		Name:  "age",
		Value: string(buf),
	}
	if buf, err = json.Marshal(h.Sex); err != nil {
		return nil, err
	}
	node.Fields[6] = &Field{
		Type:  "hustler.Sex",
		Name:  "sex",
		Value: string(buf),
	}
	if buf, err = json.Marshal(h.Viewbox); err != nil {
		return nil, err
	}
	node.Fields[7] = &Field{
		Type:  "[]int",
		Name:  "viewbox",
		Value: string(buf),
	}
	if buf, err = json.Marshal(h.Order); err != nil {
		return nil, err
	}
	node.Fields[8] = &Field{
		Type:  "[]int",
		Name:  "order",
		Value: string(buf),
	}
	if buf, err = json.Marshal(h.Svg); err != nil {
		return nil, err
	}
	node.Fields[9] = &Field{
		Type:  "string",
		Name:  "svg",
		Value: string(buf),
	}
	if buf, err = json.Marshal(h.CreatedAt); err != nil {
		return nil, err
	}
	node.Fields[10] = &Field{
		Type:  "time.Time",
		Name:  "created_at",
		Value: string(buf),
	}
	node.Edges[0] = &Edge{
		Type: "Wallet",
		Name: "wallet",
	}
	err = h.QueryWallet().
		Select(wallet.FieldID).
		Scan(ctx, &node.Edges[0].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[1] = &Edge{
		Type: "Item",
		Name: "weapon",
	}
	err = h.QueryWeapon().
		Select(item.FieldID).
		Scan(ctx, &node.Edges[1].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[2] = &Edge{
		Type: "Item",
		Name: "clothes",
	}
	err = h.QueryClothes().
		Select(item.FieldID).
		Scan(ctx, &node.Edges[2].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[3] = &Edge{
		Type: "Item",
		Name: "vehicle",
	}
	err = h.QueryVehicle().
		Select(item.FieldID).
		Scan(ctx, &node.Edges[3].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[4] = &Edge{
		Type: "Item",
		Name: "waist",
	}
	err = h.QueryWaist().
		Select(item.FieldID).
		Scan(ctx, &node.Edges[4].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[5] = &Edge{
		Type: "Item",
		Name: "foot",
	}
	err = h.QueryFoot().
		Select(item.FieldID).
		Scan(ctx, &node.Edges[5].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[6] = &Edge{
		Type: "Item",
		Name: "hand",
	}
	err = h.QueryHand().
		Select(item.FieldID).
		Scan(ctx, &node.Edges[6].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[7] = &Edge{
		Type: "Item",
		Name: "drug",
	}
	err = h.QueryDrug().
		Select(item.FieldID).
		Scan(ctx, &node.Edges[7].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[8] = &Edge{
		Type: "Item",
		Name: "neck",
	}
	err = h.QueryNeck().
		Select(item.FieldID).
		Scan(ctx, &node.Edges[8].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[9] = &Edge{
		Type: "Item",
		Name: "ring",
	}
	err = h.QueryRing().
		Select(item.FieldID).
		Scan(ctx, &node.Edges[9].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[10] = &Edge{
		Type: "Item",
		Name: "accessory",
	}
	err = h.QueryAccessory().
		Select(item.FieldID).
		Scan(ctx, &node.Edges[10].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[11] = &Edge{
		Type: "BodyPart",
		Name: "body",
	}
	err = h.QueryBody().
		Select(bodypart.FieldID).
		Scan(ctx, &node.Edges[11].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[12] = &Edge{
		Type: "BodyPart",
		Name: "hair",
	}
	err = h.QueryHair().
		Select(bodypart.FieldID).
		Scan(ctx, &node.Edges[12].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[13] = &Edge{
		Type: "BodyPart",
		Name: "beard",
	}
	err = h.QueryBeard().
		Select(bodypart.FieldID).
		Scan(ctx, &node.Edges[13].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[14] = &Edge{
		Type: "Search",
		Name: "index",
	}
	err = h.QueryIndex().
		Select(search.FieldID).
		Scan(ctx, &node.Edges[14].IDs)
	if err != nil {
		return nil, err
	}
	return node, nil
}

func (i *Item) Node(ctx context.Context) (node *Node, err error) {
	node = &Node{
		ID:     i.ID,
		Type:   "Item",
		Fields: make([]*Field, 11),
		Edges:  make([]*Edge, 15),
	}
	var buf []byte
	if buf, err = json.Marshal(i.Type); err != nil {
		return nil, err
	}
	node.Fields[0] = &Field{
		Type:  "item.Type",
		Name:  "type",
		Value: string(buf),
	}
	if buf, err = json.Marshal(i.NamePrefix); err != nil {
		return nil, err
	}
	node.Fields[1] = &Field{
		Type:  "string",
		Name:  "name_prefix",
		Value: string(buf),
	}
	if buf, err = json.Marshal(i.NameSuffix); err != nil {
		return nil, err
	}
	node.Fields[2] = &Field{
		Type:  "string",
		Name:  "name_suffix",
		Value: string(buf),
	}
	if buf, err = json.Marshal(i.Name); err != nil {
		return nil, err
	}
	node.Fields[3] = &Field{
		Type:  "string",
		Name:  "name",
		Value: string(buf),
	}
	if buf, err = json.Marshal(i.Suffix); err != nil {
		return nil, err
	}
	node.Fields[4] = &Field{
		Type:  "string",
		Name:  "suffix",
		Value: string(buf),
	}
	if buf, err = json.Marshal(i.Augmented); err != nil {
		return nil, err
	}
	node.Fields[5] = &Field{
		Type:  "bool",
		Name:  "augmented",
		Value: string(buf),
	}
	if buf, err = json.Marshal(i.Count); err != nil {
		return nil, err
	}
	node.Fields[6] = &Field{
		Type:  "int",
		Name:  "count",
		Value: string(buf),
	}
	if buf, err = json.Marshal(i.Tier); err != nil {
		return nil, err
	}
	node.Fields[7] = &Field{
		Type:  "item.Tier",
		Name:  "tier",
		Value: string(buf),
	}
	if buf, err = json.Marshal(i.Greatness); err != nil {
		return nil, err
	}
	node.Fields[8] = &Field{
		Type:  "int",
		Name:  "greatness",
		Value: string(buf),
	}
	if buf, err = json.Marshal(i.Rles); err != nil {
		return nil, err
	}
	node.Fields[9] = &Field{
		Type:  "schema.RLEs",
		Name:  "rles",
		Value: string(buf),
	}
	if buf, err = json.Marshal(i.Svg); err != nil {
		return nil, err
	}
	node.Fields[10] = &Field{
		Type:  "string",
		Name:  "svg",
		Value: string(buf),
	}
	node.Edges[0] = &Edge{
		Type: "WalletItems",
		Name: "wallets",
	}
	err = i.QueryWallets().
		Select(walletitems.FieldID).
		Scan(ctx, &node.Edges[0].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[1] = &Edge{
		Type: "Dope",
		Name: "dopes",
	}
	err = i.QueryDopes().
		Select(dope.FieldID).
		Scan(ctx, &node.Edges[1].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[2] = &Edge{
		Type: "Hustler",
		Name: "hustler_weapons",
	}
	err = i.QueryHustlerWeapons().
		Select(hustler.FieldID).
		Scan(ctx, &node.Edges[2].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[3] = &Edge{
		Type: "Hustler",
		Name: "hustler_clothes",
	}
	err = i.QueryHustlerClothes().
		Select(hustler.FieldID).
		Scan(ctx, &node.Edges[3].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[4] = &Edge{
		Type: "Hustler",
		Name: "hustler_vehicles",
	}
	err = i.QueryHustlerVehicles().
		Select(hustler.FieldID).
		Scan(ctx, &node.Edges[4].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[5] = &Edge{
		Type: "Hustler",
		Name: "hustler_waists",
	}
	err = i.QueryHustlerWaists().
		Select(hustler.FieldID).
		Scan(ctx, &node.Edges[5].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[6] = &Edge{
		Type: "Hustler",
		Name: "hustler_feet",
	}
	err = i.QueryHustlerFeet().
		Select(hustler.FieldID).
		Scan(ctx, &node.Edges[6].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[7] = &Edge{
		Type: "Hustler",
		Name: "hustler_hands",
	}
	err = i.QueryHustlerHands().
		Select(hustler.FieldID).
		Scan(ctx, &node.Edges[7].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[8] = &Edge{
		Type: "Hustler",
		Name: "hustler_drugs",
	}
	err = i.QueryHustlerDrugs().
		Select(hustler.FieldID).
		Scan(ctx, &node.Edges[8].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[9] = &Edge{
		Type: "Hustler",
		Name: "hustler_necks",
	}
	err = i.QueryHustlerNecks().
		Select(hustler.FieldID).
		Scan(ctx, &node.Edges[9].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[10] = &Edge{
		Type: "Hustler",
		Name: "hustler_rings",
	}
	err = i.QueryHustlerRings().
		Select(hustler.FieldID).
		Scan(ctx, &node.Edges[10].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[11] = &Edge{
		Type: "Hustler",
		Name: "hustler_accessories",
	}
	err = i.QueryHustlerAccessories().
		Select(hustler.FieldID).
		Scan(ctx, &node.Edges[11].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[12] = &Edge{
		Type: "Item",
		Name: "base",
	}
	err = i.QueryBase().
		Select(item.FieldID).
		Scan(ctx, &node.Edges[12].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[13] = &Edge{
		Type: "Item",
		Name: "derivative",
	}
	err = i.QueryDerivative().
		Select(item.FieldID).
		Scan(ctx, &node.Edges[13].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[14] = &Edge{
		Type: "Search",
		Name: "index",
	}
	err = i.QueryIndex().
		Select(search.FieldID).
		Scan(ctx, &node.Edges[14].IDs)
	if err != nil {
		return nil, err
	}
	return node, nil
}

func (l *Listing) Node(ctx context.Context) (node *Node, err error) {
	node = &Node{
		ID:     l.ID,
		Type:   "Listing",
		Fields: make([]*Field, 2),
		Edges:  make([]*Edge, 4),
	}
	var buf []byte
	if buf, err = json.Marshal(l.Active); err != nil {
		return nil, err
	}
	node.Fields[0] = &Field{
		Type:  "bool",
		Name:  "active",
		Value: string(buf),
	}
	if buf, err = json.Marshal(l.Source); err != nil {
		return nil, err
	}
	node.Fields[1] = &Field{
		Type:  "listing.Source",
		Name:  "source",
		Value: string(buf),
	}
	node.Edges[0] = &Edge{
		Type: "Dope",
		Name: "dope",
	}
	err = l.QueryDope().
		Select(dope.FieldID).
		Scan(ctx, &node.Edges[0].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[1] = &Edge{
		Type: "Dope",
		Name: "dope_lastsales",
	}
	err = l.QueryDopeLastsales().
		Select(dope.FieldID).
		Scan(ctx, &node.Edges[1].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[2] = &Edge{
		Type: "Amount",
		Name: "inputs",
	}
	err = l.QueryInputs().
		Select(amount.FieldID).
		Scan(ctx, &node.Edges[2].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[3] = &Edge{
		Type: "Amount",
		Name: "outputs",
	}
	err = l.QueryOutputs().
		Select(amount.FieldID).
		Scan(ctx, &node.Edges[3].IDs)
	if err != nil {
		return nil, err
	}
	return node, nil
}

func (s *Search) Node(ctx context.Context) (node *Node, err error) {
	node = &Node{
		ID:     s.ID,
		Type:   "Search",
		Fields: make([]*Field, 5),
		Edges:  make([]*Edge, 3),
	}
	var buf []byte
	if buf, err = json.Marshal(s.Type); err != nil {
		return nil, err
	}
	node.Fields[0] = &Field{
		Type:  "search.Type",
		Name:  "type",
		Value: string(buf),
	}
	if buf, err = json.Marshal(s.Greatness); err != nil {
		return nil, err
	}
	node.Fields[1] = &Field{
		Type:  "int",
		Name:  "greatness",
		Value: string(buf),
	}
	if buf, err = json.Marshal(s.SaleActive); err != nil {
		return nil, err
	}
	node.Fields[2] = &Field{
		Type:  "bool",
		Name:  "sale_active",
		Value: string(buf),
	}
	if buf, err = json.Marshal(s.SalePrice); err != nil {
		return nil, err
	}
	node.Fields[3] = &Field{
		Type:  "schema.BigInt",
		Name:  "sale_price",
		Value: string(buf),
	}
	if buf, err = json.Marshal(s.LastSalePrice); err != nil {
		return nil, err
	}
	node.Fields[4] = &Field{
		Type:  "schema.BigInt",
		Name:  "last_sale_price",
		Value: string(buf),
	}
	node.Edges[0] = &Edge{
		Type: "Dope",
		Name: "dope",
	}
	err = s.QueryDope().
		Select(dope.FieldID).
		Scan(ctx, &node.Edges[0].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[1] = &Edge{
		Type: "Item",
		Name: "item",
	}
	err = s.QueryItem().
		Select(item.FieldID).
		Scan(ctx, &node.Edges[1].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[2] = &Edge{
		Type: "Hustler",
		Name: "hustler",
	}
	err = s.QueryHustler().
		Select(hustler.FieldID).
		Scan(ctx, &node.Edges[2].IDs)
	if err != nil {
		return nil, err
	}
	return node, nil
}

func (ss *SyncState) Node(ctx context.Context) (node *Node, err error) {
	node = &Node{
		ID:     ss.ID,
		Type:   "SyncState",
		Fields: make([]*Field, 1),
		Edges:  make([]*Edge, 0),
	}
	var buf []byte
	if buf, err = json.Marshal(ss.StartBlock); err != nil {
		return nil, err
	}
	node.Fields[0] = &Field{
		Type:  "uint64",
		Name:  "start_block",
		Value: string(buf),
	}
	return node, nil
}

func (w *Wallet) Node(ctx context.Context) (node *Node, err error) {
	node = &Node{
		ID:     w.ID,
		Type:   "Wallet",
		Fields: make([]*Field, 2),
		Edges:  make([]*Edge, 3),
	}
	var buf []byte
	if buf, err = json.Marshal(w.Paper); err != nil {
		return nil, err
	}
	node.Fields[0] = &Field{
		Type:  "schema.BigInt",
		Name:  "paper",
		Value: string(buf),
	}
	if buf, err = json.Marshal(w.CreatedAt); err != nil {
		return nil, err
	}
	node.Fields[1] = &Field{
		Type:  "time.Time",
		Name:  "created_at",
		Value: string(buf),
	}
	node.Edges[0] = &Edge{
		Type: "Dope",
		Name: "dopes",
	}
	err = w.QueryDopes().
		Select(dope.FieldID).
		Scan(ctx, &node.Edges[0].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[1] = &Edge{
		Type: "WalletItems",
		Name: "items",
	}
	err = w.QueryItems().
		Select(walletitems.FieldID).
		Scan(ctx, &node.Edges[1].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[2] = &Edge{
		Type: "Hustler",
		Name: "hustlers",
	}
	err = w.QueryHustlers().
		Select(hustler.FieldID).
		Scan(ctx, &node.Edges[2].IDs)
	if err != nil {
		return nil, err
	}
	return node, nil
}

func (wi *WalletItems) Node(ctx context.Context) (node *Node, err error) {
	node = &Node{
		ID:     wi.ID,
		Type:   "WalletItems",
		Fields: make([]*Field, 1),
		Edges:  make([]*Edge, 2),
	}
	var buf []byte
	if buf, err = json.Marshal(wi.Balance); err != nil {
		return nil, err
	}
	node.Fields[0] = &Field{
		Type:  "schema.BigInt",
		Name:  "balance",
		Value: string(buf),
	}
	node.Edges[0] = &Edge{
		Type: "Wallet",
		Name: "wallet",
	}
	err = wi.QueryWallet().
		Select(wallet.FieldID).
		Scan(ctx, &node.Edges[0].IDs)
	if err != nil {
		return nil, err
	}
	node.Edges[1] = &Edge{
		Type: "Item",
		Name: "item",
	}
	err = wi.QueryItem().
		Select(item.FieldID).
		Scan(ctx, &node.Edges[1].IDs)
	if err != nil {
		return nil, err
	}
	return node, nil
}

func (c *Client) Node(ctx context.Context, id string) (*Node, error) {
	n, err := c.Noder(ctx, id)
	if err != nil {
		return nil, err
	}
	return n.Node(ctx)
}

var errNodeInvalidID = &NotFoundError{"node"}

// NodeOption allows configuring the Noder execution using functional options.
type NodeOption func(*nodeOptions)

// WithNodeType sets the node Type resolver function (i.e. the table to query).
// If was not provided, the table will be derived from the universal-id
// configuration as described in: https://entgo.io/docs/migrate/#universal-ids.
func WithNodeType(f func(context.Context, string) (string, error)) NodeOption {
	return func(o *nodeOptions) {
		o.nodeType = f
	}
}

// WithFixedNodeType sets the Type of the node to a fixed value.
func WithFixedNodeType(t string) NodeOption {
	return WithNodeType(func(context.Context, string) (string, error) {
		return t, nil
	})
}

type nodeOptions struct {
	nodeType func(context.Context, string) (string, error)
}

func (c *Client) newNodeOpts(opts []NodeOption) *nodeOptions {
	nopts := &nodeOptions{}
	for _, opt := range opts {
		opt(nopts)
	}
	if nopts.nodeType == nil {
		nopts.nodeType = func(ctx context.Context, id string) (string, error) {
			return "", fmt.Errorf("cannot resolve noder (%v) without its type", id)
		}
	}
	return nopts
}

// Noder returns a Node by its id. If the NodeType was not provided, it will
// be derived from the id value according to the universal-id configuration.
//
//		c.Noder(ctx, id)
//		c.Noder(ctx, id, ent.WithNodeType(pet.Table))
//
func (c *Client) Noder(ctx context.Context, id string, opts ...NodeOption) (_ Noder, err error) {
	defer func() {
		if IsNotFound(err) {
			err = multierror.Append(err, entgql.ErrNodeNotFound(id))
		}
	}()
	table, err := c.newNodeOpts(opts).nodeType(ctx, id)
	if err != nil {
		return nil, err
	}
	return c.noder(ctx, table, id)
}

func (c *Client) noder(ctx context.Context, table string, id string) (Noder, error) {
	switch table {
	case amount.Table:
		n, err := c.Amount.Query().
			Where(amount.ID(id)).
			CollectFields(ctx, "Amount").
			Only(ctx)
		if err != nil {
			return nil, err
		}
		return n, nil
	case bodypart.Table:
		n, err := c.BodyPart.Query().
			Where(bodypart.ID(id)).
			CollectFields(ctx, "BodyPart").
			Only(ctx)
		if err != nil {
			return nil, err
		}
		return n, nil
	case dope.Table:
		n, err := c.Dope.Query().
			Where(dope.ID(id)).
			CollectFields(ctx, "Dope").
			Only(ctx)
		if err != nil {
			return nil, err
		}
		return n, nil
	case event.Table:
		n, err := c.Event.Query().
			Where(event.ID(id)).
			CollectFields(ctx, "Event").
			Only(ctx)
		if err != nil {
			return nil, err
		}
		return n, nil
	case hustler.Table:
		n, err := c.Hustler.Query().
			Where(hustler.ID(id)).
			CollectFields(ctx, "Hustler").
			Only(ctx)
		if err != nil {
			return nil, err
		}
		return n, nil
	case item.Table:
		n, err := c.Item.Query().
			Where(item.ID(id)).
			CollectFields(ctx, "Item").
			Only(ctx)
		if err != nil {
			return nil, err
		}
		return n, nil
	case listing.Table:
		n, err := c.Listing.Query().
			Where(listing.ID(id)).
			CollectFields(ctx, "Listing").
			Only(ctx)
		if err != nil {
			return nil, err
		}
		return n, nil
	case search.Table:
		n, err := c.Search.Query().
			Where(search.ID(id)).
			CollectFields(ctx, "Search").
			Only(ctx)
		if err != nil {
			return nil, err
		}
		return n, nil
	case syncstate.Table:
		n, err := c.SyncState.Query().
			Where(syncstate.ID(id)).
			CollectFields(ctx, "SyncState").
			Only(ctx)
		if err != nil {
			return nil, err
		}
		return n, nil
	case wallet.Table:
		n, err := c.Wallet.Query().
			Where(wallet.ID(id)).
			CollectFields(ctx, "Wallet").
			Only(ctx)
		if err != nil {
			return nil, err
		}
		return n, nil
	case walletitems.Table:
		n, err := c.WalletItems.Query().
			Where(walletitems.ID(id)).
			CollectFields(ctx, "WalletItems").
			Only(ctx)
		if err != nil {
			return nil, err
		}
		return n, nil
	default:
		return nil, fmt.Errorf("cannot resolve noder from table %q: %w", table, errNodeInvalidID)
	}
}

func (c *Client) Noders(ctx context.Context, ids []string, opts ...NodeOption) ([]Noder, error) {
	switch len(ids) {
	case 1:
		noder, err := c.Noder(ctx, ids[0], opts...)
		if err != nil {
			return nil, err
		}
		return []Noder{noder}, nil
	case 0:
		return []Noder{}, nil
	}

	noders := make([]Noder, len(ids))
	errors := make([]error, len(ids))
	tables := make(map[string][]string)
	id2idx := make(map[string][]int, len(ids))
	nopts := c.newNodeOpts(opts)
	for i, id := range ids {
		table, err := nopts.nodeType(ctx, id)
		if err != nil {
			errors[i] = err
			continue
		}
		tables[table] = append(tables[table], id)
		id2idx[id] = append(id2idx[id], i)
	}

	for table, ids := range tables {
		nodes, err := c.noders(ctx, table, ids)
		if err != nil {
			for _, id := range ids {
				for _, idx := range id2idx[id] {
					errors[idx] = err
				}
			}
		} else {
			for i, id := range ids {
				for _, idx := range id2idx[id] {
					noders[idx] = nodes[i]
				}
			}
		}
	}

	for i, id := range ids {
		if errors[i] == nil {
			if noders[i] != nil {
				continue
			}
			errors[i] = entgql.ErrNodeNotFound(id)
		} else if IsNotFound(errors[i]) {
			errors[i] = multierror.Append(errors[i], entgql.ErrNodeNotFound(id))
		}
		ctx := graphql.WithPathContext(ctx,
			graphql.NewPathWithIndex(i),
		)
		graphql.AddError(ctx, errors[i])
	}
	return noders, nil
}

func (c *Client) noders(ctx context.Context, table string, ids []string) ([]Noder, error) {
	noders := make([]Noder, len(ids))
	idmap := make(map[string][]*Noder, len(ids))
	for i, id := range ids {
		idmap[id] = append(idmap[id], &noders[i])
	}
	switch table {
	case amount.Table:
		nodes, err := c.Amount.Query().
			Where(amount.IDIn(ids...)).
			CollectFields(ctx, "Amount").
			All(ctx)
		if err != nil {
			return nil, err
		}
		for _, node := range nodes {
			for _, noder := range idmap[node.ID] {
				*noder = node
			}
		}
	case bodypart.Table:
		nodes, err := c.BodyPart.Query().
			Where(bodypart.IDIn(ids...)).
			CollectFields(ctx, "BodyPart").
			All(ctx)
		if err != nil {
			return nil, err
		}
		for _, node := range nodes {
			for _, noder := range idmap[node.ID] {
				*noder = node
			}
		}
	case dope.Table:
		nodes, err := c.Dope.Query().
			Where(dope.IDIn(ids...)).
			CollectFields(ctx, "Dope").
			All(ctx)
		if err != nil {
			return nil, err
		}
		for _, node := range nodes {
			for _, noder := range idmap[node.ID] {
				*noder = node
			}
		}
	case event.Table:
		nodes, err := c.Event.Query().
			Where(event.IDIn(ids...)).
			CollectFields(ctx, "Event").
			All(ctx)
		if err != nil {
			return nil, err
		}
		for _, node := range nodes {
			for _, noder := range idmap[node.ID] {
				*noder = node
			}
		}
	case hustler.Table:
		nodes, err := c.Hustler.Query().
			Where(hustler.IDIn(ids...)).
			CollectFields(ctx, "Hustler").
			All(ctx)
		if err != nil {
			return nil, err
		}
		for _, node := range nodes {
			for _, noder := range idmap[node.ID] {
				*noder = node
			}
		}
	case item.Table:
		nodes, err := c.Item.Query().
			Where(item.IDIn(ids...)).
			CollectFields(ctx, "Item").
			All(ctx)
		if err != nil {
			return nil, err
		}
		for _, node := range nodes {
			for _, noder := range idmap[node.ID] {
				*noder = node
			}
		}
	case listing.Table:
		nodes, err := c.Listing.Query().
			Where(listing.IDIn(ids...)).
			CollectFields(ctx, "Listing").
			All(ctx)
		if err != nil {
			return nil, err
		}
		for _, node := range nodes {
			for _, noder := range idmap[node.ID] {
				*noder = node
			}
		}
	case search.Table:
		nodes, err := c.Search.Query().
			Where(search.IDIn(ids...)).
			CollectFields(ctx, "Search").
			All(ctx)
		if err != nil {
			return nil, err
		}
		for _, node := range nodes {
			for _, noder := range idmap[node.ID] {
				*noder = node
			}
		}
	case syncstate.Table:
		nodes, err := c.SyncState.Query().
			Where(syncstate.IDIn(ids...)).
			CollectFields(ctx, "SyncState").
			All(ctx)
		if err != nil {
			return nil, err
		}
		for _, node := range nodes {
			for _, noder := range idmap[node.ID] {
				*noder = node
			}
		}
	case wallet.Table:
		nodes, err := c.Wallet.Query().
			Where(wallet.IDIn(ids...)).
			CollectFields(ctx, "Wallet").
			All(ctx)
		if err != nil {
			return nil, err
		}
		for _, node := range nodes {
			for _, noder := range idmap[node.ID] {
				*noder = node
			}
		}
	case walletitems.Table:
		nodes, err := c.WalletItems.Query().
			Where(walletitems.IDIn(ids...)).
			CollectFields(ctx, "WalletItems").
			All(ctx)
		if err != nil {
			return nil, err
		}
		for _, node := range nodes {
			for _, noder := range idmap[node.ID] {
				*noder = node
			}
		}
	default:
		return nil, fmt.Errorf("cannot resolve noders from table %q: %w", table, errNodeInvalidID)
	}
	return noders, nil
}
