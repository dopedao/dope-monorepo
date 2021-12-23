// Code generated by entc, DO NOT EDIT.

package ent

import (
	"time"

	"github.com/dopedao/dope-monorepo/packages/api/ent/asset"
	"github.com/dopedao/dope-monorepo/packages/api/ent/dope"
	"github.com/dopedao/dope-monorepo/packages/api/ent/event"
	"github.com/dopedao/dope-monorepo/packages/api/ent/hustler"
	"github.com/dopedao/dope-monorepo/packages/api/ent/schema"
	"github.com/dopedao/dope-monorepo/packages/api/ent/wallet"
	"github.com/dopedao/dope-monorepo/packages/api/ent/walletitems"
)

// The init function reads all schema descriptors with runtime code
// (default values, validators, hooks and policies) and stitches it
// to their package variables.
func init() {
	assetFields := schema.Asset{}.Fields()
	_ = assetFields
	// assetDescAmount is the schema descriptor for amount field.
	assetDescAmount := assetFields[4].Descriptor()
	// asset.DefaultAmount holds the default value on creation for the amount field.
	asset.DefaultAmount = assetDescAmount.Default.(func() schema.BigInt)
	// assetDescAssetId is the schema descriptor for assetId field.
	assetDescAssetId := assetFields[5].Descriptor()
	// asset.DefaultAssetId holds the default value on creation for the assetId field.
	asset.DefaultAssetId = assetDescAssetId.Default.(func() schema.BigInt)
	dopeFields := schema.Dope{}.Fields()
	_ = dopeFields
	// dopeDescClaimed is the schema descriptor for claimed field.
	dopeDescClaimed := dopeFields[1].Descriptor()
	// dope.DefaultClaimed holds the default value on creation for the claimed field.
	dope.DefaultClaimed = dopeDescClaimed.Default.(bool)
	// dopeDescOpened is the schema descriptor for opened field.
	dopeDescOpened := dopeFields[2].Descriptor()
	// dope.DefaultOpened holds the default value on creation for the opened field.
	dope.DefaultOpened = dopeDescOpened.Default.(bool)
	eventFields := schema.Event{}.Fields()
	_ = eventFields
	// eventDescCreatedAt is the schema descriptor for created_at field.
	eventDescCreatedAt := eventFields[4].Descriptor()
	// event.DefaultCreatedAt holds the default value on creation for the created_at field.
	event.DefaultCreatedAt = eventDescCreatedAt.Default.(func() time.Time)
	// eventDescUpdatedAt is the schema descriptor for updated_at field.
	eventDescUpdatedAt := eventFields[5].Descriptor()
	// event.DefaultUpdatedAt holds the default value on creation for the updated_at field.
	event.DefaultUpdatedAt = eventDescUpdatedAt.Default.(func() time.Time)
	// event.UpdateDefaultUpdatedAt holds the default value on update for the updated_at field.
	event.UpdateDefaultUpdatedAt = eventDescUpdatedAt.UpdateDefault.(func() time.Time)
	hustlerFields := schema.Hustler{}.Fields()
	_ = hustlerFields
	// hustlerDescViewbox is the schema descriptor for viewbox field.
	hustlerDescViewbox := hustlerFields[8].Descriptor()
	// hustler.DefaultViewbox holds the default value on creation for the viewbox field.
	hustler.DefaultViewbox = hustlerDescViewbox.Default.([]int)
	// hustlerDescOrder is the schema descriptor for order field.
	hustlerDescOrder := hustlerFields[9].Descriptor()
	// hustler.DefaultOrder holds the default value on creation for the order field.
	hustler.DefaultOrder = hustlerDescOrder.Default.([]int)
	// hustlerDescCreatedAt is the schema descriptor for created_at field.
	hustlerDescCreatedAt := hustlerFields[11].Descriptor()
	// hustler.DefaultCreatedAt holds the default value on creation for the created_at field.
	hustler.DefaultCreatedAt = hustlerDescCreatedAt.Default.(func() time.Time)
	walletFields := schema.Wallet{}.Fields()
	_ = walletFields
	// walletDescPaper is the schema descriptor for paper field.
	walletDescPaper := walletFields[1].Descriptor()
	// wallet.DefaultPaper holds the default value on creation for the paper field.
	wallet.DefaultPaper = walletDescPaper.Default.(func() schema.BigInt)
	// walletDescCreatedAt is the schema descriptor for created_at field.
	walletDescCreatedAt := walletFields[2].Descriptor()
	// wallet.DefaultCreatedAt holds the default value on creation for the created_at field.
	wallet.DefaultCreatedAt = walletDescCreatedAt.Default.(func() time.Time)
	walletitemsFields := schema.WalletItems{}.Fields()
	_ = walletitemsFields
	// walletitemsDescBalance is the schema descriptor for balance field.
	walletitemsDescBalance := walletitemsFields[1].Descriptor()
	// walletitems.DefaultBalance holds the default value on creation for the balance field.
	walletitems.DefaultBalance = walletitemsDescBalance.Default.(func() schema.BigInt)
}
